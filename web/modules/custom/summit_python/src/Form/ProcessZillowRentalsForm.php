<?php

namespace Drupal\summit_python\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\QueueInterface;
use Drupal\Core\Queue\QueueWorkerInterface;
use Drupal\Core\Queue\QueueWorkerManagerInterface;
use Drupal\Core\Queue\SuspendQueueException;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ProcessZillowRentalsForm.
 */
class ProcessZillowRentalsForm extends FormBase {

  /**
   * @var string
   */
  protected $queueWorkerPlugin = 'zillow_rentals_queue';

  /**
   * @var QueueFactory
   */
  protected $queueFactory;

  /**
   * @var QueueWorkerManagerInterface
   */
  protected $queueManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->queueFactory = $container->get('queue');
    $instance->queueManager = $container->get('plugin.manager.queue_worker');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'process_redfin_properties_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $queue = $this->queueFactory->get($this->queueWorkerPlugin);

    $menu = '<div><a href="/import/redfin/property">Crawl Redfin Property (force)</a></div>
      <div><a href="/queue/redfin_properties">Queue Redfin Properties</a></div>
      <div><a href="/queue/zillow_rentals">Queue Zillow Rentals</a></div>
      <div><a href="/process/redfin_properties">Process Redfin Properties</a></div>
      <div><a href="/process/zillow_rentals">Process Zillow Rentals</a></div>';

    $form['page'] = [
      '#type' => 'markup',
      '#markup' => $this->t($menu),
    ];

    $form['help'] = [
      '#type' => 'markup',
      '#markup' => $this->t('<div>This queue contains @number items.</div>',
        ['@number' => $queue->numberOfItems()]
      ),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Process Queue'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    foreach ($form_state->getValues() as $key => $value) {
      // @TODO: Validate fields.
    }
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * TODO: Add event subscriber? to watch progress?
   * https://www.drupal.org/docs/8/creating-custom-modules/subscribe-to-and-dispatch-events
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    /** @var QueueInterface $queue */
    $queue = $this->queueFactory->get($this->queueWorkerPlugin);
    /** @var QueueWorkerInterface $queue_worker */
    $queue_worker = $this->queueManager->createInstance($this->queueWorkerPlugin);

    while ($item = $queue->claimItem(5)) {
      try {
        $queue_worker->processItem($item);
        $queue->deleteItem($item);
//        \Drupal::logger('ProcessZillowRentalsForm')->info('Success');
      } catch (SuspendQueueException $e) {
        // If the worker indicates there is a problem with the whole queue,
        // release the item and skip to the next queue.
        $queue->releaseItem($item);
        \Drupal::logger('ProcessZillowRentalsForm')->error('Released');
        break;
      } catch (\Exception $e) {
        // In case of any other kind of exception, log it and leave the item
        // in the queue to be processed again later.
        \Drupal::logger('ProcessZillowRentalsForm')->error($e);
      }
    }


//    $crawlObj = new \stdClass();
//    $crawlObj->url = 'https://www.redfin.com/NC/Greensboro/5504-Eckerson-Rd-27405/home/94670190';
//    $crawlObj->queue = 'redfin_properties_queue';
//    $crawlObj->crawled = '1585079638';
//
//    $service = \Drupal::service('summit_python.process_redfin_property');
//    $service->crawlProperty($crawlObj, TRUE);

  }

}

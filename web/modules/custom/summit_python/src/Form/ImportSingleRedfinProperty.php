<?php

namespace Drupal\summit_python\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class ImportSingleRedfinProperty.
 */
class ImportSingleRedfinProperty extends FormBase {

  /**
   * Symfony\Component\DependencyInjection\ContainerAwareInterface definition.
   *
   * @var \Symfony\Component\DependencyInjection\ContainerAwareInterface
   */
  protected $queue;

  /**
   * Drupal\Core\Queue\QueueWorkerManagerInterface definition.
   *
   * @var \Drupal\Core\Queue\QueueWorkerManagerInterface
   */
  protected $pluginManagerQueueWorker;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $instance = parent::create($container);
    $instance->queue = $container->get('queue');
    $instance->pluginManagerQueueWorker = $container->get('plugin.manager.queue_worker');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'import_single_redfin_property';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $menu = '<div><a href="/import/redfin/property">Crawl Redfin Property (force)</a></div>
      <div><a href="/queue/redfin_properties">Queue Redfin Properties</a></div>
      <div><a href="/queue/zillow_rentals">Queue Zillow Rentals</a></div>
      <div><a href="/process/redfin_properties">Process Redfin Properties</a></div>
      <div><a href="/process/zillow_rentals">Process Zillow Rentals</a></div>';

    $form['page'] = [
      '#type' => 'markup',
      '#markup' => $this->t($menu),
    ];

    $form['url'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Crawl URL'),
      '#required' => TRUE,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Crawl Property'),
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
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $crawlObj = new \stdClass();
    $crawlObj->url = $form_state->getValue('url');
    $crawlObj->queue = 'redfin_properties_queue';
    $crawlObj->crawled = \Drupal::time()->getCurrentTime();

    $service = \Drupal::service('summit_python.process_redfin_property');

    try {
      $service->crawlProperty($crawlObj, TRUE);
    } catch (\Exception $exception) {
      \Drupal::messenger()->addMessage(print_r($body, TRUE), 'error');
    }

  }

}

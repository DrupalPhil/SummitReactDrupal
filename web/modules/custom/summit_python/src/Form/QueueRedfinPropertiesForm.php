<?php

namespace Drupal\summit_python\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class QueueRedfinPropertiesForm.
 */
class QueueRedfinPropertiesForm extends FormBase {

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
    $instance->pluginManagerQueueWorker = $container->get('plugin.manager.queue_worker');
    $instance->queue = $container->get('queue')->get('redfin_properties_queue');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'queue_redfin_properties_form';
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

    $form['help'] = [
      '#type' => 'markup',
      '#markup' => $this->t('<div>This queue contains @number items.</div>',
        ['@number' => $this->queue->numberOfItems()]
      ),
    ];

    $form['url'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Crawl URL'),
      '#default_value' => 'https://www.redfin.com/county/2040/NC/Forsyth-County/filter/property-type=house,min-lot-size=0.5-acre,mr=5:2047',
      '#required' => TRUE,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Build Queue')
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
    $propertyUrl = $form_state->getValue('url');

    // Run queue builder
    $service = \Drupal::service('summit_python.queue_redfin_properties');
    $service->queueFromUrl($propertyUrl);
  }

}

<?php

namespace Drupal\summit_python\Plugin\QueueWorker;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Drupal\Core\Queue\SuspendQueueException;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides base functionality for the Property URLs Queue Workers.
 */
abstract class PropertyQueueWorkerBase extends QueueWorkerBase {

  /**
   * {@inheritdoc}
   */
  public function processItem($item) {
    if (isset($item->data->queue) && isset($item->data->url)) {
      $crawlObj = $this->buildCrawlObj($item);
      switch ($crawlObj->queue) {
        case 'redfin_properties_queue':
          $service = \Drupal::service('summit_python.process_redfin_property');
          break;
        case 'zillow_rentals_queue':
          $service = \Drupal::service('summit_python.process_zillow_rental');
          break;
      }

      if ($service) {
        $service->crawlProperty($crawlObj);
      }
      else {
        throw new \Exception('Had trouble finding a service for this queue name.');
      }

    }
    else {
      $message = $this->t('Process error: Required data not found for queue item <pre>@response</pre>',
        ['@response' => print_r($item, TRUE)]
      );
      \Drupal::logger('PropertyQueueWorkerBase')->error($message);
      throw new \Exception($message);
    }
  }

  /**
   * Determine which queue worker to use based on queue
   *
   * @param object $item
   *
   * @return object $crawlObj
   */
  protected function buildCrawlObj($item) {
    $crawlObj = new \stdClass();
    $crawlObj->url = $item->data->url;
    $crawlObj->queue = $item->data->queue;
    $crawlObj->crawled = $item->created;

    return $crawlObj;
  }

}

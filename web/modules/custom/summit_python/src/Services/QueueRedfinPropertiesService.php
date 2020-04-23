<?php

namespace Drupal\summit_python\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Crawl Redfin Properties from map search url
 */
class QueueRedfinPropertiesService extends QueuePropertyServiceBase {

  /**
   * {@inheritdoc}
   */
  public function queueFromUrl($url) {
    $parts = parse_url($url);

    // If host is one of what we want
    if (array_key_exists('host', $parts) && $parts['host'] == 'www.redfin.com') {
      $this->spider = 'dailyRedfinProperties';
      $this->url = $url;
      $this->queue = 'redfin_properties_queue';

      $this->getScrapy();
    }

    // If no host is found, stop and throw error
    else {
      $this->logMessage('QueueRedfinPropertiesService', $parts);
    }
  }

}

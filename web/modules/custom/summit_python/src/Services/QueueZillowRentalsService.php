<?php

namespace Drupal\summit_python\Services;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Crawl Zillow Rentals from map search url
 */
class QueueZillowRentalsService extends QueuePropertyServiceBase {

  /**
   * {@inheritdoc}
   */
  public function queueFromUrl($url) {
    $parts = parse_url($url);

    // If host is one of what we want
    if (array_key_exists('host', $parts) && $parts['host'] == 'www.zillow.com') {
      $this->spider = 'dailyZillowRentals';
      $this->url = $url;
      $this->queue = 'zillow_rentals_queue';

      $this->getScrapy();
    }

    // If no host is found, stop and throw error
    else {
      $this->logMessage('QueueZillowRentalsService', $parts);
    }
  }

}

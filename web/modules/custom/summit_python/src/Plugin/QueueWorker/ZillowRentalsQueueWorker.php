<?php

namespace Drupal\summit_python\Plugin\QueueWorker;

/**
 * Queue Worker to crawl individual properties
 *
 * @QueueWorker(
 *   id = "zillow_rentals_queue",
 *   title = @Translation("Zillow Rentals Queue Worker"),
 * )
 */
class ZillowRentalsQueueWorker extends PropertyQueueWorkerBase {}

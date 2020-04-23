<?php

namespace Drupal\summit_python\Plugin\QueueWorker;

/**
 * Queue Worker to crawl individual properties.
 *
 * @QueueWorker(
 *   id = "redfin_properties_queue",
 *   title = @Translation("Redfin Properties Queue Worker"),
 * )
 */
class RedfinPropertiesQueueWorker extends PropertyQueueWorkerBase {}

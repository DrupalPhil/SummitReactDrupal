<?php

namespace Drupal\summit_python\Services;

/**
 * Class ProcessZillowRentalService.
 */
class ProcessZillowRentalService extends ProcessPropertyServiceBase {

  /**
   * {@inheritdoc}
   */
  function crawlProperty($crawlObj, $forceCrawl = FALSE) {

    if (isset($crawlObj->url) && isset($crawlObj->queue)) {
      $this->crawlObj = $crawlObj;
      $this->spider = 'zillowRental';

      if ($this->nodeExists()) {
        if ($this->isStale() || $forceCrawl) {
          $items = $this->getScrapy();
          $this->saveEntity($items);
        }
        else {
          // Clear Lease
          \Drupal::logger('ProcessZillowRentalService')
            ->notice("This URL doesn't need to be crawled (again) yet: " . $crawlObj->url);
          return;
        }
      }
      else {
        // Create node
        $items = $this->getScrapy();
        $this->saveEntity($items);
      }

    }
    else {
      $message = $this->t('Process error: Required data not found for queue item <pre>@response</pre>',
        ['@response' => print_r($crawlObj, TRUE)]
      );
      \Drupal::logger('ProcessZillowRentalService')->error($message);
      throw new \Exception($message);
    }
  }

  /**
   * {@inheritdoc}
   */
  function saveEntity($items) {

    foreach ($items as $key => $property) {

      if ($this->nodeExists()) {
        $node = $this->node;
      }
      else {
        $node = \Drupal\node\Entity\Node::create([
          'type' => 'property',
        ]);
      }

      // Structure of this comes from spider
      $node->title = $property->address;
      $node->field_address = $property->address;
      $node->field_bathrooms = $property->ba;
      $node->field_bedrooms = $property->bd;
      $node->field_square_feet = $property->sqft;
      $node->field_mls = $property->mls;
      $node->field_rent = $property->rent;
      $node->field_source_url = $this->crawlObj->url;
      $node->field_source = 'zillow';
      $node->field_listed_as = 'rental';
      $node->field_last_crawled = $this->crawlObj->crawled;

      // Save the entity
      $node->save();

      \Drupal::logger('ProcessZillowRentalService')
        ->info("Node saved. Node id: " . $node->id() . ' - ' . $property->address);

    }
  }

}

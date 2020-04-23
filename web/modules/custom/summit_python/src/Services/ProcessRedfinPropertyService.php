<?php

namespace Drupal\summit_python\Services;

/**
 * Class ProcessPropertyService.
 */
class ProcessRedfinPropertyService extends ProcessPropertyServiceBase {

  /**
   * {@inheritdoc}
   */
  function crawlProperty($crawlObj, $forceCrawl = FALSE) {

    if (isset($crawlObj->url) && isset($crawlObj->queue)) {
      $this->crawlObj = $crawlObj;
      $this->spider = 'redfinProperty';

      if ($this->nodeExists()) {
        if ($this->isStale() || $forceCrawl) {
          $items = $this->getScrapy();
          $this->saveEntity($items);
        }
        else {
          // Clear Lease
          \Drupal::logger('ProcessRedfinPropertyService')->notice("This URL doesn't need to be crawled (again) yet: " . $crawlObj->url);
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
      \Drupal::logger('ProcessRedfinPropertyService')->error($message);
      throw new \Exception($message);
    }
  }

  /**
   * {@inheritdoc}
   */
  function saveEntity($items) {

    foreach ($items as $key => $property) {
      $titleParts = explode(' | ', $property->title);
      $address = $titleParts[0];

      if ($this->nodeExists()) {
        $node = $this->node;
      }
      else {
        $node = \Drupal\node\Entity\Node::create([
          'type' => 'property'
        ]);
      }

      // Structure of this comes from spider
      $node->title = $address;
      $node->field_address = $address;

      $node->field_status = $property->listing_status;

      switch ($property->listing_status) {
        case 'Sold':
          $node->field_listed_as = 'Sold';
          break;
        case 'Active':
          $node->field_listed_as = 'Active';
          break;
      }

      $node->field_asking_price = $property->listed_price;
      $node->field_sold_price = $property->sold_price;
      $node->field_vendor_estimate = $property->estimate;

      $node->field_bathrooms = $property->ba;
      $node->field_bedrooms = $property->bd;
      // $node->/'field_square_feet' = $property->sqft;
      $node->field_mls = $property->keyDetails->mls;
      $node->field_source_url = $this->crawlObj->url;
      $node->field_source = 'redfin';
      $node->field_homeowners_insurance = $property->mortgageItems->homeownersinsurance;
      $node->field_property_taxes = $property->mortgageItems->propertytaxes;
      $node->field_last_crawled = $this->crawlObj->crawled;

      // Save the entity
      $node->save();

      \Drupal::logger('ProcessRedfinPropertyService')
        ->info("Node saved. Node id: " . $node->id() . ' - ' . $address);

    }
  }


}

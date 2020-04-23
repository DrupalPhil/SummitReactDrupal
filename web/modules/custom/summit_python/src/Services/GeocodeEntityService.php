<?php

namespace Drupal\summit_python\Services;

use Drupal\geocoder\GeocoderInterface;
use Drupal\node\NodeInterface;

/**
 * Class GeocodeEntityService.
 */
class GeocodeEntityService {

  /**
   * Drupal\geocoder\GeocoderInterface definition.
   *
   * @var \Drupal\geocoder\GeocoderInterface
   */
  protected $geocoder;

  /**
   * Constructs a new GeocodeEntityService object.
   */
  public function __construct(GeocoderInterface $geocoder) {
    $this->geocoder = $geocoder;
  }

  /**
   * Geocodes the address field and saves it
   *
   * @param NodeInterface $node
   *
   * @return NodeInterface
   */
  public function updateNode(NodeInterface $node) {

    if ($node->bundle() == 'property') {
      $node = $this->geocodeNode($node);
      $node->save();
      return $node;
    }
    else {
      $message = t('Node id @nid must be of type "Property"', ['@nid' => $node->id()]);
      throw new \Exception($message);
    }

  }

  /**
   * Adds the geocoded data to the entity then returns it
   *
   * @param NodeInterface $node
   * @param array $geocoded
   *
   * @return NodeInterface
   */
  public function geocodeNode(NodeInterface $node) {
    if ($address = $node->get('field_address')->value) {

      $geocoded = $this->geocodeAddress($address);

      $node->set('field_country', $geocoded->getCountry());
      $node->set('field_country_code', $geocoded->getCountryCode());
      $node->set('field_latitude', $geocoded->getLatitude());
      $node->set('field_longitude', $geocoded->getLongitude());
      $node->set('field_locality', $geocoded->getLocality());
      $node->set('field_postal_code', $geocoded->getPostalCode());
      $node->set('field_street_name', $geocoded->getStreetName());
      $node->set('field_street_number', $geocoded->getStreetNumber());

      return $node;

    }
    else {
      $message = t('Node ID: @nid is missing address', ['@nid' => $node->id()]);
      throw new \Exception($message);
    }
  }

  /**
   * Geocodes the address
   *
   * @param string $address
   *
   * @return \Geocoder\Model\Address
   */
  public function geocodeAddress(string $address) {
    $geocoded = $this->geocoder->geocode($address, ['googlemaps']);
    return $geocoded->first();
  }

}

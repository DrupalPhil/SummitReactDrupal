<?php

namespace Drupal\react\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the Example module.
 */
class ReactController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function content() {
    $element = [
      '#markup' => '
        <div id="propertyAnalysis">
          <div class="container">
            <div class="row">
              <div class="col text-center">
                Something went terribly wrong.
              </div>
            </div>
          </div>
        </div>
      ',
    ];

    $element['#attached']['library'][] = 'react/react_app_dev';

    return $element;
  }

}

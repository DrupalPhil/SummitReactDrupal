<?php

namespace Drupal\summit_python\Services;

use Drupal\Core\Config\ConfigFactory;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Psr\Http\Message\ResponseInterface;

/**
 * Class ScrapyService.
 */
class ScrapyService {

  /**
   * @var Client
   */
  protected $httpClient;

  /**
   * @var ConfigFactory
   */
  protected $configFactory;

  /**
   * Constructs a new ScrapyService object.
   */
  public function __construct(Client $httpClient, ConfigFactory $configFactory) {
    $this->httpClient = $httpClient;
    $this->configFactory = $configFactory;
  }

  /**
   * Runs Scrapy crawler via GET request
   *
   * TODO: Pull Python Crawl URL from config
   *
   * @param array $params
   *
   * @return ResponseInterface
   */
  public function getScrapy($params) {

    $options = [
      'query' => [
        'spider_name' => $params['spider'],
        'url' => $params['url'],
      ],
    ];

    $method = 'GET';
    $config = $this->configFactory->get('summit_python.settings');
    $endpoint = $config->get('python.endpoint');

    try {
      $response = $this->httpClient->request($method, $endpoint, $options);
    } catch (Exception $error) {
//      // First try to catch the GuzzleException. This indicates a failed response from the remote API.
//      $rawError = print_r($error, TRUE);
//      \Drupal::logger('Scrapy')->error($rawError);
//
//      // Get the original response
//      $response = $error->getResponse();
//
//      // Get the info returned from the remote server.
//      $response_info = $response->getBody()->getContents();
//      $decoded = json_decode($response_info);
//
//      // Log the error
//      $message = $this->t('API connection error. Error details are as follows:<pre>@response</pre>',
//        ['@response' => print_r($decoded, TRUE)]
//      );
//      \Drupal::logger('Scrapy')->error($message);
      \Drupal::logger('Scrapy')->error('Scrapy crawl failed. Check the python logs?');
      throw new \Exception('Scrapy crawl failed. Check the python logs?');
    }

    return $response;
  }

}

<?php

namespace Drupal\summit_python\Services;

use Drupal\Core\DependencyInjection\ServiceProviderBase;
use Drupal\Core\Queue\QueueFactory;
use Drupal\Core\Queue\QueueInterface;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;

/**
 * Class QueuePropertyServiceBase.
 *
 */
abstract class QueuePropertyServiceBase extends ServiceProviderBase {

  /**
   * @var Client
   */
  protected $http_client;

  /**
   * @var QueueFactory
   */
  protected $queueFactory;

  /**
   * The spider we'll be leveraging in this crawl
   *
   * @var String
   */
  protected $spider;

  /**
   * The url we anticipate crawling
   *
   * @var String
   */
  protected $url;

  /**
   * @param Client $http_client
   * @param QueueFactory $queue
   */
  public function __construct(Client $http_client, QueueFactory $queue) {
    $this->http_client = $http_client;
    $this->queueFactory = $queue;
  }

  /**
   * Initiates Scrapy crawler
   *
   * Sets the url and spider for crawler below
   */
  abstract function queueFromUrl($url);

  /**
   * Runs Scrapy crawler via GET request
   *
   */
  public function getScrapy() {
    $scrapyService = \Drupal::service('summit_python.scrapy');
    $response = $scrapyService->getScrapy([
      'spider' => $this->spider,
      'url' => $this->url,
    ]);

    $this->handleResponse($response);
  }

  /**
   * {@inheritdoc}
   */
  protected function handleResponse(Response $response) {
    $body = $response->getBody()->getContents();
    $json = json_decode($body);

    // Had trouble reaching python scrapyrt endpoint
    // Didn't even get a chance to crawl the property site
    if ($response->getStatusCode() != '200') {
      $message = t("Crawl Failed | Had trouble reaching python scrapyrt endpoint");
      \Drupal::logger('QueuePropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      return;
    }

    // 403 exists in results (custom python)
    if (array_key_exists('stats', $json) &&
      isset($json->stats->blocked_url_count) &&
      !empty($json->stats->blocked_url_count)) {
      $message = t("Crawl Failed | Found 'blocked_url_count' in the response. Response: <pre>@response</pre>",
        ['@response' => print_r($body, TRUE)]
      );
      \Drupal::logger('QueuePropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      return;
    }

    // Body returned is empty
    // Means Crawlera just gave up trying
    if (empty($body) || !array_key_exists('items', $json) || empty($json->items)) {
      $message = t("Crawl Failed | Body is empty, crawler failed or gave up. Response: <pre>@response</pre>",
        ['@response' => print_r($body, TRUE)]
      );
      \Drupal::logger('QueuePropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      return;
    }

    $message = t("Crawl Success | Scrapy seems to have successfully crawled. Response: <pre>@response</pre>",
      ['@response' => print_r($body, TRUE)]
    );
    \Drupal::logger('QueuePropertyServiceBase')->info($message);

    $this->queueProperties($json->items);
  }

  /**
   * Queue the properties for processing later
   *
   * @param array $items
   *    Simply URL and Processor/Queue (how to process it later) of properties
   */
  protected function queueProperties($items) {
    foreach ($items as $key => $item) {
      if ($item->url && $item->address) {
        $property = new \stdClass();
        $property->url = $item->url;
        $property->queue = $this->queue;

        /** @var QueueInterface $queue */
        $queue = $this->queueFactory->get($this->queue);
        $queue->createItem($property);
      }
    }
  }

  /**
   * Throw error
   *
   * @param string $message
   */
  protected function logMessage($channel, $parts) {
    $message = t("Something is wrong with your submission. So I stopped. Submission: <pre>@submission</pre>",
      ["@submission" => print_r($parts, TRUE)]
    );
    \Drupal::logger('QueueRedfinPropertiesService')->error($message);
    \Drupal::messenger()->addMessage($message, 'error');
  }

}

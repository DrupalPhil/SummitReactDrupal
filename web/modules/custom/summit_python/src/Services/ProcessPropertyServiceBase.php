<?php

namespace Drupal\summit_python\Services;

use Drupal\Core\DependencyInjection\ServiceProviderBase;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\ResponseInterface;

/**
 * Class ProcessPropertyServiceBase.
 *
 */
abstract class ProcessPropertyServiceBase extends ServiceProviderBase {

  /**
   * GuzzleHttp\ClientInterface definition.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $http_client;

  /**
   * @var object
   */
  protected $crawlObj;

  /**
   * @var string
   */
  public $spider;

  /**
   * @var \Drupal\node\Entity\Node
   */
  public $node;

  /**
   * Constructs a new ProcessPropertyServiceBase object.
   */
  public function __construct(ClientInterface $http_client) {
    $this->http_client = $http_client;
  }

  /**
   * Initiates Scrapy crawler
   *
   * @param object $crawlObj
   *    Includes Url, Queue, & Timestamp
   *
   * @param boolean $forceCrawl
   *    Whether or not to crawl the url even if not stale
   */
  abstract public function crawlProperty($crawlObj, $forceCrawl = FALSE);

  /**
   * Translates scrapy response interface to drupal entity interface
   *
   * If/When done, saves entity (here)
   */
  abstract public function saveEntity($items);

  /**
   * Runs Scrapy crawler via GET request
   *
   * @return \Drupal\summit_python\Services\json
   * @throws \Exception
   */
  public function getScrapy() {
    $scrapyService = \Drupal::service('summit_python.scrapy');

    $response = $scrapyService->getScrapy([
      'spider' => $this->spider,
      'url' => $this->crawlObj->url,
    ]);

    return $this->handleResponse($response);

  }

  /**
   * @param Response $response
   *
   * @return json $items
   * @throws \Exception
   */
  protected function handleResponse(Response $response) {
    $body = $response->getBody()->getContents();
    $json = json_decode($body);

    // Had trouble reaching python scrapyrt endpoint
    // Didn't even get a chance to crawl the property site
    if ($response->getStatusCode() != '200') {
      $message = t("Crawl Failed | Had trouble reaching python scrapyrt endpoint");
      \Drupal::logger('ProcessPropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      throw new \Exception($message);
    }

    // 403 exists in results (custom python)
    if (array_key_exists('stats', $json) &&
      isset($json->stats->blocked_url_count) &&
      !empty($json->stats->blocked_url_count)) {
      $message = t("Crawl Failed | Found 'blocked_url_count' in the response. Response: <pre>@response</pre>",
        ['@response' => print_r($body, TRUE)]
      );
      \Drupal::logger('ProcessPropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      throw new \Exception($message);
    }

    // Body returned is empty
    // Means Crawlera just gave up trying
    if (empty($body) || !array_key_exists('items', $json) || empty($json->items)) {
      $message = t("Crawl Failed | Body is empty, crawler failed or gave up. Response: <pre>@response</pre>",
        ['@response' => print_r($body, TRUE)]
      );
      \Drupal::logger('ProcessPropertyServiceBase')->error($message);
      \Drupal::messenger()->addMessage($message, 'error');
      throw new \Exception($message);
    }

    $message = t("Crawl Success | Scrapy seems to have successfully crawled. Response: <pre>@response</pre>",
      ['@response' => print_r($body, TRUE)]
    );
    \Drupal::logger('ProcessPropertyServiceBase')->info($message);

    return $json->items;
  }

  /**
   * Determine if the node exists based on the source url
   *
   * @return boolean
   */
  protected function nodeExists() {
    $query = \Drupal::entityQuery('node')
      ->condition('field_source_url', $this->crawlObj->url, 'CONTAINS');
    $nids = $query->execute();

    if (!empty($nids)) {
      $nid = reset($nids);
      $this->node = \Drupal\node\Entity\Node::load($nid);
    }

    return !empty($nids);
  }

  /**
   * Determine if the node needs to be recrawled or not
   *
   * @return boolean
   */
  protected function isStale() {
    if ($this->nodeExists()) {
      $lastCrawled = $this->node->field_last_crawled->value;
      $newCrawlDate = $this->crawlObj->crawled;
      $days = 0.5;
      $period = 86400 * $days;
      return $newCrawlDate - $lastCrawled > $period;
    }
    else {
      throw new \Exception("Node does not exist. Can't be stale.");
    }
  }

}

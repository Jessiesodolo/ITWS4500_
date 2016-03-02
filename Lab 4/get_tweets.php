<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '346335059-9x6o4cTBVoVqRc3c9YJNyQe8IzIYZv6YEyJvunF4',
    'oauth_access_token_secret' => 'snl86neVlbfHLLDpJt16xGFg3LiAwGGfxxKKs3d626OYJ',
    'consumer_key' => 'peB2aVjUJ1VvOkIaQBJGKjeev',
    'consumer_secret' => 'R6L4pHsTOv8v4FbF8zeCwSyEcvmCfVsyN0jk554geVcQhCw1Nd'
);

//  peB2aVjUJ1VvOkIaQBJGKjeev

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>

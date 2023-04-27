/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${tweet.user.avatars}" alt="User avatar">
            <h4 class="user-name">${tweet.user.name}</h4>
          </div>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <p class="tweet-text">${tweet.content.text}</p>
        <footer>
          <span class="tweet-timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="tweet-actions">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };
  
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };

  function loadTweets() {
    $.ajax({
        url: "http://localhost:8080/tweets",
        type: "GET",
        dataType: "json",
        success: function(data) {
          renderTweets(data);
        },
        error: function(error) {
          console.log("Error fetching tweets:", error);
        }
    });
  }
  
  $(document).ready(function() {
    loadTweets();
  });
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





$(document).ready(function () {

    $('#error-container').hide();


    const counter = document.querySelector('.counter');

    function updateCounter() {
        const tweetContent = $('#tweet-text').val();
        const remainingChars = 140 - tweetContent.length;
        counter.textContent = remainingChars;

        if (remainingChars < 0) {
            counter.classList.add('counter-red');
        } else {
            counter.classList.remove('counter-red');
        }
    }

    $('#tweet-text').on('input', updateCounter);

    const createTweetElement = function (tweet) {
        const $tweet = $(`
      <article class="tweet">
        <header>
        <div class="user-info">
            <img src="https://i.imgur.com/73hZDYK.png" alt="User Avatar">
            <h4 class="user-name">${tweet.user.name}</h4>
        </div>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <p class="tweet-text">${$("<div>").text(tweet.content.text).html()}</p>
        <footer>
          <span class="tweet-timestamp">${timeago().format(tweet.created_at)}</span>
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

    const loadTweets = function () {
        $.ajax('/tweets', { method: 'GET' })
            .then(function (tweets) {
                // clear the existing tweets on the page
                $('.tweets-container').empty();
                // render the new tweets
                for (const tweet of tweets) {
                    const $tweet = createTweetElement(tweet);
                    $('.tweets-container').prepend($tweet);
                }
            });
    };

    $('#new-tweet-form').on('submit', function (event) {
        event.preventDefault();
        $('#error-container').slideUp();
        const tweetContent = $('#tweet-text').val();

        // Validate tweet content
        if (!tweetContent) {
            $('#error-container').text('Please enter some text to tweet!').slideDown();
            return;
        }

        if (tweetContent.length > 140) {
            $('#counter').addClass('counter-red'); // add class to turn counter red
            const excessChars = tweetContent.length - 140;
            const errorText = `Tweet content exceeds maximum length of 140 characters by ${excessChars} character${excessChars !== 1 ? 's' : ''}!`;
            $('#error-container').text(errorText).slideDown();
            return;
        } else {
            $('#counter').removeClass('counter-red'); // remove class if content is within limit
        }

        // Submit the form data to the server
        $.ajax('/tweets', { method: 'POST', data: $(this).serialize() })
            .then(function () {
                // Clear the form and reset the character counter
                $('#tweet-text').val('');
                $('.counter').text('140');

                // Fetch the new tweet and add it to the page
                loadTweets();
            });
    });

    loadTweets();

});
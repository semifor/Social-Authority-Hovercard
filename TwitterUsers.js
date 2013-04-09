/*
 * A Chrome extension that does things on mouseover of Twitter links.
 */
function TwitterUsers()
{

  function init() {

    // Clear out old event namespace.
    $(document).off('.metrics');

    // Find all Twitter links and pass them to a handler.
    $('a').filter(
      function() {
        return $(this).attr('href').match(/https?:\/\/(www\.)?twitter.com\//);
      }
    ).each(handleEachUser);
  }

  function handleEachUser() {
    $(this).css("background-color", "#ede7d0");}
    $(this).on("mouseover.metrics", function() {});
  }

  init();

}

new TwitterUsers();


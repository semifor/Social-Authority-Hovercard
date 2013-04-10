/*
 * A Chrome extension that does things on mouseover of Twitter links.
 */

(function() {

  function TwitterUsers()
  {

    function init() {

      // Clear out old event namespace.
      $(document).off('.metrics');

      // Find all Twitter links and pass them to a handler.
      $('a').filter(
        function() {
          return $(this).attr('href')
            .match(/https?:\/\/(www\.)?twitter.com\//);
        }
      ).each(handleEachUser);
    }

    function handleEachUser() {

      $(this).css("background-color", "#ede7d0");

      $(this).on("mouseover.metrics", function() {
        console.log($(this).html());
        $(this).qtip({
          tip: {corner: true, method: 'polygon'},
          classes: 'ui-tooltip-blue ui-tooltip-bootstrap',
          position: {viewport: $(window)},
          hide: {event: "click mouseleave", inactive: 2000},
          content: {text: $(this).html()}
        });
      });
    }

    init();

  }

  new TwitterUsers();

})();

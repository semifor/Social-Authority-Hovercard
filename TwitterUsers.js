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
      ).each(eventifyUser);
    }

    function eventifyUser() {

      var trigger = $(this);

      var username = trigger.attr('href')
        .replace(/.*?twitter\.com\/(.*)/, "$1");

      trigger.css("background-color", "#ede7d0");

      trigger.on("mouseover", function() {
        $.ajax("https://api.followerwonk.com/social-authority?screen_name=" +
          username + ";AccessID=member-65c6f0bdee;Expires=TIMESTAMP;" +
          "Signature=0410f8972b16b2763ab2d91150e0a832")
            .done(
              function(json) {
                renderTip(json, trigger, username);
              }
            )
            .fail()
            .always();
      });
    }

    function renderTip(json, trigger, username) {
      var saScore = Math.round(json._embedded[0].social_authority);
      if (saScore > 0) {
        trigger.qtip({
          style: {
            tip: {
              corner: true, method: 'polygon'
            },
            classes: 'qtip-blue qtip-shadow qtip-rounded'
          },
          position: {
            viewport: $(window)
          },
          hide: {
            event: "click mouseleave",
            inactive: 2000,
            delay: 1000,
            distance: 125,
            fixed: true
          },
          content: {
            text: "<a href=\"http://followerwonk.com/social-authority\" " +
              "target=\"_blank\">Social Authority</a> of @" + username + ": " +
              saScore
          }
        });
        trigger.qtip('show');
      }
    }

    init();

  }

  new TwitterUsers();

})();



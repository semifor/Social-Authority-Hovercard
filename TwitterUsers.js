/*
 * A Chrome extension that does things on mouseover of Twitter links.
 */

(function() {

  function TwitterUsers()
  {

    var socialAuthorityFor = {};
    var apiID, apiSecret;

    function init() {

      chrome.extension.sendRequest({ 'sa-credentials': true }, function (response) {
        if ( response ) {
          apiID = response.apiID;
          apiSecret = response.apiSecret;
        }
      });

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
        if ( 'jss' + username in socialAuthorityFor ) {
          renderTip(trigger, username);
          return;
        }

        $.ajax(apiRequestUrl(username))
            .done(
              function(json) {
                socialAuthorityFor['jss' + username] = Math.round(json._embedded[0].social_authority);
                renderTip(trigger, username);
              }
            )
            .fail()
            .always();
      });
    }

    function renderTip(trigger, username) {
      var saScore = socialAuthorityFor['jss' + username];
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

    function apiRequestUrl(username) {
      var timestamp = Math.floor((new Date).getTime() / 1000);
      var hmac = CryptoJS.HmacSHA1(apiID + '\n' + timestamp, apiSecret);
      return 'https://api.followerwonk.com/social-authority?screen_name=' +
          username + ';AccessID=' + apiID + ';Timestamp=' + timestamp +
          ';Signature=' + hmac;
    }

    init();

  }

  $(document).ready(function() {
    new TwitterUsers();
  });

})();

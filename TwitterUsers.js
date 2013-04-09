var TwitterUsers = TwitterUsers || {};

TwitterUsers = 
{
  init : function() {
    $('a[href*=/https?:\/\/(www\.)?twitter.com\//]').each(TwitterUsers.hookEachUser);
  },

  hookEachUser : function(index, el) {
    alert(el);
  }
}

TwitterUsers.init();

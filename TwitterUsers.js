var TwitterUsers = TwitterUsers || {};

TwitterUsers = 
{
  init : function() {
    $('a[href*="twitter.com/"]').each(TwitterUsers.hookEachUser);
  },

  hookEachUser : function(index, el) {
    alert(el);
  }
}

TwitterUsers.init();

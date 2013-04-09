var TwitterUsers = TwitterUsers || {};

TwitterUsers = 
{
  hover_delay = 300,

  init : function() {
    $('a[href*="twitter.com/"]').each(TwitterUsers.hookEachUser);
  }

  hookEachUser : function(index, el) {
    alert(el);
  }
}

TwitterUsers.init();

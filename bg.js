chrome.extension.onRequest.addListener(
  function(request, sender, cb) {
    if ( request['sa-credentials'] ) {
      cb({
        apiID: localStorage['apiID'],
        apiSecret: localStorage['apiSecret']
      });
    }
  }
);

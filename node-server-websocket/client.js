var wsClient = (function() {

  var Model, View, Controller;

  Model = {
    socket: null,
    connect: function(callback) {
      if (typeof socket == 'undefined' || socket.readyState == 3) {
        socket = new WebSocket($('#wsEndpoint').val());
        socket.onmessage = function(event) {
          callback(event.data);
        };
      }
    },
    disconnect: function() {
      if (typeof socket != 'undefined' && socket.readyState == 1) {
        socket.close();
      }
    },
    send: function(){
      let val = Math.random()
      console.log("sending", val)
      socket.send(val.toString())
    }
  };

  View = {
    display: function(data) {
      $( '#randomNums' ).append(data + ' ');
    }
  };

  Controller = {
    socket: null,
    start: function() {
      Model.connect(View.display);
    },
    stop: function() {
      Model.disconnect();
    },
    send: function () {
      Model.send();
    },
    init: function() {
      setTimeout(function() {
        $( '#startButton' ).on( "click", Controller.start );
        $( '#stopButton' ).on( "click", Controller.stop );
        $('#sendButton').on("click", Controller.send);

      }, 1000);
    }
  };

  return {
    init: Controller.init
  }

});

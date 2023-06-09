const NodeHelper = require('node_helper');
var mqtt = require('mqtt');

module.exports = NodeHelper.create({
  start: function() {
    console.log('MMM-CustomModule started ...');
    this.clients = [];
  },

  
  connectMqtt: function(config) {
    var self = this;
    var client;

    if(typeof self.clients[config.mqttServer] === "undefined") {
      console.log("Creating new MQTT client for url: ", config.mqttServer);
      client = mqtt.connect(config.mqttServer);
      self.clients[config.mqttServer] = client;

      client.on('error', function(error) {
        console.log('*** MQTT JS ERROR ***: ' + error);
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Error',
          message: 'The MQTT Client has suffered an error: ' + error
        });
      });

      client.on('offline', function() {
        console.log('*** MQTT Client Offline ***');
        self.sendSocketNotification('ERROR', {
          type: 'notification',
          title: 'MQTT Offline',
          message: 'MQTT Server is offline.'
        });
        client.end();
      });
    } else { 
      client = self.clients[config.mqttServer];
    }

    if(config.mode !== 'send') {
      client.subscribe(config.topic);
      client.on('message', function(topic, message) {
        if(message.toString().length <= 5){
          self.sendSocketNotification('MQTT_DATA', {'topic':'temperature', 'data':message.toString()});
        }
        else{
          self.sendSocketNotification('MQTT_DATA', {'topic':'position', 'data':message.toString()});
        }
      });
    }
  },
  

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'MQTT_SERVER') {
      console.log("SocketNotificationReceived MQTT_SERVER");
      this.connectMqtt(payload);
    } else if(notification == 'MQTT_SEND') {
      var client = this.clients[payload.mqttServer];
      if(typeof client !== "undefined") {
        client.publish(payload.topic, JSON.stringify(payload.payload));
      }
    }
  }
});

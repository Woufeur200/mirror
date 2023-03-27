Module.register("MMM-CustomModule", {

  defaults: {
    mqttServer: 'http://localhost',
    topics: ['temperature', 'position'],
    interval: 500000,
    debug: false,
    showAlerts: true,
    showTitle: false,
    title: 'Indoor Temperature',
    loadingText: 'Loading MQTT Data...',
    postText: '°C',
  },


  start: function() {
    Log.info('Starting module: ' + this.name);
    this.loaded = false;
    this.mqttVal = '';
    this.mqttLastVal = '';
    this.updateMqtt(this);
  },

  updateMqtt: function(self) {
    console.log("Inside updateMqtt function");
    if (!self.config.topics) {
      // Use the single topic specified in the configuration
      console.log(topic + " outside else");
      self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topics: self.config.topics });
    } else {
      // Use the list of topics specified in the configuration
      self.config.topics.forEach(function(topic) {
        console.log(topic + " inside else");
        self.sendSocketNotification('MQTT_SERVER', { mqttServer: self.config.mqttServer, topic: topic });
        console.log(self.config.mqttServer + " " + topic)
      });
    }
    setTimeout(self.updateMqtt, self.config.interval, self);
  },
  

  getDom: function() {
    var wrapper = document.createElement('div');

    if (this.config.debug) {

      if (!this.loaded) {
        wrapper.innerHTML = this.config.loadingText;
        return wrapper;
      }

      var titleDiv = document.createElement('div');
      titleDiv.innerHTML = this.config.title;
      wrapper.appendChild(titleDiv);

      var mqttDiv = document.createElement('div');
      mqttDiv.innerHTML = this.mqttVal.toString().concat(this.config.postText);
      wrapper.appendChild(mqttDiv);

    }

    return wrapper;
  },



  socketNotificationReceived: function(notification, payload) {
    console.log("SocketNotificationReceived " + notification + " " + payload.topic + " " + payload.data);
    if (notification === 'MQTT_DATA'  && payload.topic === 'temperature') {
      this.mqttVal = payload.data.toString();
      this.loaded = true;
      if(this.mqttVal !== this.mqttLastVal)
      {
        this.mqttLastVal = this.mqttVal;
        this.sendNotification('INDOOR_TEMPERATURE', this.mqttVal);
        this.updateDom();
      }
    }
    if(notification === 'MQTT_DATA' && payload.topic === 'position'){
      console.log("Position: " + payload.data.toString());
      let parts = payload.data.toString().split(' ');
      let module = parts[0];
      let position = parts[1];

      this.sendNotification('CHANGE_POSITIONS', 
      modules = {
        module:{
          visible: 'true',
          position: position,
        }
      }
      );
    }
    if (notification === 'ERROR' && this.config.showAlerts){
      this.sendNotification('SHOW_ALERT', payload);
    }
  }

});

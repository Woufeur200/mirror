import time
import paho.mqtt.client as paho
from w1thermsensor import W1ThermSensor

broker = "localhost"
topic = "temperature"
sensor = W1ThermSensor()

client = paho.Client("client-publisher")
client.connect(broker)

while True:
	temperature = sensor.get_temperature()
	temperature = round(temperature * 2) / 2
	print("The temperature is %s celsius" % temperature)
	client.publish(topic, temperature)
	time.sleep(5)
	
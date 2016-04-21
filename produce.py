import pika
import json
from time import sleep

tasks = 2000000

params = pika.URLParameters("amqp://guest:guest@192.168.99.100:5672")
rabbit = pika.BlockingConnection(params)
channel = rabbit.channel()
channel.queue_declare(queue='speed_test', durable=False)

for i in range(tasks):
    channel.basic_publish(exchange='', routing_key='speed_test', body=json.dumps({"value": 25}))
    #sleep(.001);

print "MQ Loaded with {} items.".format(tasks)

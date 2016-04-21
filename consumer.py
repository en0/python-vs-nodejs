from time import time
import json
import pika

total = 0

params = pika.URLParameters("amqp://guest:guest@192.168.99.100:5672")
rabbit = pika.BlockingConnection(params)
channel = rabbit.channel()
# channel.queue_declare(queue='speed_test', durable=False)

def handler(ch, meth, prop, body):
    global total
    _body = json.loads(body)
    value = 0;
    for i in range(_body['value']):
        value += i
    ch.basic_ack(delivery_tag=meth.delivery_tag)
    total += 1

channel.basic_qos(prefetch_count=1)
channel.basic_consume(handler, queue='speed_test');

def test(r):
    global total
    total = 0
    timeout = time() + 10
    _start = time()
    while time() < timeout:
        r.process_data_events()
    _end = time()
    _dur = _end - _start
    return total, _dur, total / _dur


if __name__ == "__main__":
    loops = 10
    vals = []
    while loops > 0:
        c, t, r = test(rabbit)
        vals.append(r);
        loops -= 1;
        print "Processed {} in {} seconds.".format(c, t)
        print "{} loops left...".format(loops);
    print "Average Transfer Rate: {}".format(sum(vals) / len(vals))

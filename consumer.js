var amqp = require('amqplib/callback_api');
var total = 0;
var loops = 10;

function init() {
    amqp.connect("amqp://guest:guest@192.168.99.100:5672", function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.prefetch(1);
            test(ch);
        });
    }); 
}

function test(ch) {
    ch.consume('speed_test', function(msg) {
        var body = JSON.parse(msg.content.toString());
        var value = 0;
        for(var i = 0; i < body.value; i++)
            value += i;
        total++;
        ch.ack(msg);
    }, {noAck: false});
}

var stats = [];
function stat() {
    var _t = total;
    var dur = new Date() - start;
    stats.push(_t / (dur/1000));
    loops--;
    console.log("Processed " + _t + " in " + (dur/1000) +  " seconds.")
    console.log(loops + " Loops left...");
    if(loops > 0)
        setTimeout(stat, 10000);
    else
        finalize();
    start = new Date();
    total = 0;
}

function finalize() {
    var t = 0;
    for(var i in stats)
        t += stats[i]
    console.log("Average Transfer Rate: " + t/stats.length );
}

var timeout = new Date();
var start = new Date();
timeout.setSeconds(timeout.getSeconds() + 10);
init();
setTimeout(stat, 10000);

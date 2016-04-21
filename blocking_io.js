const aws = require('aws-sdk');
const fs = require('fs');
const LIMIT = 50;

aws.config.update({ region: 'us-west-2' });
var dynamo = new aws.DynamoDB.DocumentClient();

var total = 0;
var stats = [];
var total = 0;
var queued = 0;

var count = 0;
var fail = 0;
var loops = 9;

var _start = new Date();

function test() {
    while(loops > 0) {

        while(queued == LIMIT) {
            if(fail + count == LIMIT) {
                var _end = new Date();
                var _dur = (_end - _start) / 1000;
                var stat = {
                    duration: _dur,
                    fail: fail,
                    success: count,
                    rate: count / _dur
                };
                stats.push(stat);
                queued = 0;
                fail = 0;
                count = 0;
                loops--;
                console.log("Stats: " + JSON.stringify(stat));
                console.log(loops + " loops left.");
                if(loops == 0) {
                    var trate = 0
                    for(var i in stats) {
                        trate += stats[i].rate;
                    }
                    console.log("Average Rate: " + (trate / stats.length));
                }
                _start = new Date();
                break;
            } else {
                setTimeout(test, 3);
                return;
            }
        }

        dynamo.update({
            TableName: "speed_test",
            Key: { 'env': 'nodejs' },
            ExpressionAttributeNames: { '#f0': "value" },
            ExpressionAttributeValues: { ":v0": 1 },
            UpdateExpression: "SET #f0 = #f0 + :v0"
        }, function (err, data) {
            total++;
            if(err)
                fail++;
            else {
                fs.appendFile('node.out', 'Completed transfer for ' + total + '\n', (err) => {
                    if(err) {
                        fail++;
                        console.log('Failed to write to file');
                    } else
                        count++;
                });
            }
        });

        queued++;
    }
}

test();

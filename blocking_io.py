import boto3
from time import time

dynamo = boto3.client('dynamodb');

def test():
    count = 0;
    fail = 0;
    loop = 0;
    _start = time()
    with open('python.out', 'w') as fid:

        while (loop < 50):
            x = dynamo.update_item(
                TableName="speed_test",
                Key={ 'env': { "S": 'python' } },
                ExpressionAttributeNames={ '#f0': "value" },
                ExpressionAttributeValues={ ":v0": { "N": "1" } },
                UpdateExpression = "SET #f0 = #f0 + :v0"
            );
            loop += 1
            if (x['ResponseMetadata']['HTTPStatusCode'] == 200):
                fid.write("Completed transfer for {}\n".format(loop));
                count += 1
            else:
                fid.write("Failed transfer for {}\n".format(loop));
                fail += 1

    _end = time()

    dur = _end - _start
    rate = count / dur
    print "Stats: {} Seconds, {} transfers = {} transfers per second. ({} Failures)".format(
        dur,
        count,
        rate,
        fail
    )
    return rate


if __name__ == "__main__":
    loops = 10
    vals = []
    while loops > 0:
        vals.append(test());
        loops -= 1;
        print "{} loops left...".format(loops);
    print "Average Transfer Rate: {}".format(sum(vals) / len(vals))

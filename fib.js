function fib(n) {
    if (n < 2) {
        return 1;
    } else {
        return fib(n - 2) + fib(n - 1);
    }
}

function test() {
    var val = [];
    for (var i = 10; i < 40; i+=10) {
        val.push(fib(i));
    }
    return val;
}

var loops = 10;
var stats = []
while(loops > 0) {
    var _start = new Date();
    test();
    var _end = new Date();
    var _dur = (_end - _start) / 1000.0;
    stats.push(_dur);
    loops--;
    console.log("Elapsed Time: " + _dur + " seconds");
    console.log(loops + " Loops left...");
}

var t = 0;
for (var i in stats)
    t += stats[i];

console.log("Averaged Elapsed Time: " + t / stats.length);

from time import time

def fib(n):
    if (n < 2):
        return 1
    else:
        return fib(n - 2) + fib(n - 1)

def test():
    val = []
    for i in range(10, 40, 10):
        val.append(fib(i))
    return val

loops = 10
stats = []
while(loops > 0):
    _start = time()
    test()
    _end = time()
    _dur = _end - _start
    stats.append(_dur)
    loops -= 1
    print "Elapsed Time: {} seconds".format(_dur)
    print "{} Loops left...".format(loops)

print "Averaged Elapsed Time: {} seconds".format(sum(stats))

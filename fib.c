#include <stdio.h>  
#include <sys/time.h>

int fib(int n) {
    if (n < 2)
        return 1;
    else
        return fib(n - 2) + fib(n - 1);
}

int test() {
    long i = 0;
    int t = 0;
    struct timeval _start;
    struct timeval _end;

    gettimeofday(&_start, NULL);
    for (i = 10; i < 40; i+=10) {
        fib(i);
    }
    gettimeofday(&_end, NULL);
    t = _end.tv_usec - _start.tv_usec;
    printf("Elapsed Time: %i MICROSECONDS.\n", t);
    return t;
}

int main()  {  
    int loops = 10;
    float count = 0;
    int total = 0;
    while (loops > 0) {
        total += test();
        count++;
        loops--;
        printf("%i Loops left...\n", loops);
    }
    printf("Average Elapsed Time: %f MICROSECONDS\n", total / count);
    return 0;
} 

#!/bin/bash
echo "**** Testing python ****"
rm -rf ./python.out
python ./blocking_io.py
echo "**** END test **********"

echo "**** Testing nodejs ****"
rm -rf ./node.out
node ./blocking_io.js
echo "**** END test **********"

#!/bin/bash

# APP="ABBYY FineReader PDF.app"

if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  /usr/bin/osascript -e 'tell application "/Applications/ABBYY FineReader PDF.app"' -e 'activate' -e 'end tell'


# Other OS TODO
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  echo "TODO script to run FineReader on your os"
elif [[ "$OSTYPE" == "cygwin" ]]; then
  echo "TODO script to run FineReader on your os"
elif [[ "$OSTYPE" == "msys" ]]; then
  echo "TODO script to run FineReader on your os"
elif [[ "$OSTYPE" == "win32" ]]; then
 echo "TODO script to run FineReader on your os"
elif [[ "$OSTYPE" == "freebsd"* ]]; then
  echo "TODO script to run FineReader on your os"
else
  echo "TODO script to run FineReader on your os"
fi




#!/bin/bash

# How to Run it
# ! Use Abs Path

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  /usr/bin/osascript "$SCRIPT_DIR/close-finereader-application-osascript.scpt"

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


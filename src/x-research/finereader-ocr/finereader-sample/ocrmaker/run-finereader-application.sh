#!/bin/bash

# How to Run it
# ! Use Abs Path
# bash finereader-run.sh /Users/andrewlevin/Desktop/OCR-image/ocrmaker/example/img_0459.jpg /Users/andrewlevin/Desktop/OCR-image/ocrmaker/example/pdf_img_0459.pdf

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "PWD"
pwd

if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  /usr/bin/osascript "$SCRIPT_DIR/run-finereader-application-osascript.scpt" $1 $2

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


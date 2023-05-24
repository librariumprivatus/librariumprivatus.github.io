#!/usr/bin/env bash

DIRNAME=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "${DIRNAME}" || exit

source "venv/bin/activate"
python "biblioteka_make_pocketsync.py"

POCKETSYNC_DIR=$(python3 - <<'EOF'
import biblioteka_conf
print(biblioteka_conf.POCKETSYNC_ROOT)
EOF)

echo ""
echo "🏺 Size: "
du -sh "${POCKETSYNC_DIR}"
echo "Number Files: "
find "${POCKETSYNC_DIR}" -type f | wc -l
echo ""

sleep 5

open "${POCKETSYNC_DIR}"

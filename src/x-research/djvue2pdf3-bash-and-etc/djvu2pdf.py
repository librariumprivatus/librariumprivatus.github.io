

import pathlib


def run_for_dir(path: str = '', DEBUG: bool = False):
    if not path:
        print('No path')
        return

    dir = pathlib.Path(path)

    if not dir.exists():
        print('Err. Input Dir not exist')
        return






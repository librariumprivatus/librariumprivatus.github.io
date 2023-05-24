import shutil
import os
from pathlib import Path

import datetime

from osxmetadata import OSXMetaData


def get_macos_file_tags(path: str) -> list:
    tags_list = []
    for tag in OSXMetaData(path).tags:
        tags_list.append(tag.name)
    return tags_list


def rm_content_dir(target_dir: Path):
    if not target_dir.exists():
        print('Err. Not exist')
        return

    if not target_dir.is_dir():
        print('Err. Its not dir')
        return

    for item_path in target_dir.iterdir():
        try:
            shutil.rmtree(item_path)
        except OSError:
            os.remove(item_path)


def get_formatted_date_type1() -> str:
    """

    :return:
    """
    now = datetime.datetime.now()

    now_unix = now.timestamp()
    start_day_unix = datetime.datetime(now.year, now.month, now.day, 00, 00, 00).timestamp()
    delta_time_suffix = format(int(now_unix - start_day_unix), 'x')

    return now.strftime("%d%b%y").lower() + '-' + delta_time_suffix


def cp_file(file_path: Path, target_path: Path):
    if not file_path.exists():
        print('Err. No file to copy')
        return

    target_path.parent.mkdir(parents=True, exist_ok=True)

    shutil.copy2(file_path, target_path)


def get_all_files_in_dir(dir_path: Path) -> list[Path]:
    files = []
    for item_path in dir_path.iterdir():
        files.append(item_path)
        if item_path.is_dir():
            sub_files = get_all_files_in_dir(item_path)
            if sub_files:
                files += sub_files
    return files



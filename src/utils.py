import pathlib
import os
import math
import uuid

import slugify
import hashlib
import json
import datetime
import subprocess
from concurrent.futures import ThreadPoolExecutor

from src import toolsDJVU, toolsPDF, librariumTools


def walk_files(path: str | pathlib.Path) -> list[pathlib.Path]:
    path = pathlib.Path(path)
    data = []
    for root, dirs, files in os.walk(path.as_posix(), topdown=False):
        for name in files:
            file_path = os.path.join(root, name)
            data.append(file_path)

    all_files = [pathlib.Path(file) for file in data]
    return all_files


def read_file(path: str | pathlib.Path):
    path = pathlib.Path(path)

    try:
        with open(path.resolve().as_posix()) as f:
            data = f.read()
    except (Exception,):
        print('Err - except Exception: try: with open(path.absolute().as_posix()) ')
        return

    return data


def text_trimmer(text, top_limit: float = math.inf):
    return ''.join([symbol for idx, symbol in enumerate(text) if idx < top_limit])


def get_hashed_path(
        path: str | pathlib.Path,
        parent_limit: int = 10,
        name_limit: int = 16,
        paths_divider: str = '🔹',):

    path = pathlib.Path(path)
    parents = path.parts[:-1]

    parents = list(filter(lambda parent: parent != '/', parents))

    parents_name = [text_trimmer(parent, top_limit=parent_limit) for parent in parents]

    parents_unite = paths_divider.join(parents_name)

    short_name = text_trimmer(path.stem, top_limit=name_limit)

    name = f'{parents_unite}{paths_divider}{short_name}{path.suffix}'

    return name


def read_json(path: str | pathlib.Path):
    path = pathlib.Path(path)
    with open(path.resolve().as_posix(), 'r') as f:
        data = json.load(f)

    return data


def write_json(path: str | pathlib.Path, data: dict) -> str | None:
    path = pathlib.Path(path)
    with open(path.as_posix(), 'w+', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

    return path.as_posix()


def write_file(path: str | pathlib.Path, data) -> pathlib.Path | None:
    path = pathlib.Path(path)
    try:
        with open(path.resolve().as_posix(), "wb") as f:
            f.write(data)
    except (Exception,):
        print('Err.', 'write_file: try: with open(cover.as_posix()')
        return

    return path


def rename_file_stem(file, newstem):
    if not newstem:
        return False

    file = pathlib.Path(file)
    file.rename(file.with_stem(newstem))
    return file


def slug(text):
    return slugify.slugify(text)


def get_datetime():
    return datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")


def get_utime():
    return get_datetime()


def get_md5(text):
    return hashlib.md5(text.encode()).hexdigest()


def get_id(path: str | pathlib.Path) -> str:
    path = pathlib.Path(path)
    md5_path_short = text_trimmer(get_md5(path.as_posix()), top_limit=8)
    name_slug = text_trimmer(slug(path.name), top_limit=8)
    return f'{name_slug}-{md5_path_short}'


def get_nickname(path: str | pathlib.Path) -> str:
    path = pathlib.Path(path)
    md5_path = text_trimmer(get_md5(path.as_posix()), top_limit=8)
    return get_hashed_path(path.joinpath(md5_path))


def print_tree(tree):
    return print_with_json_dumps(tree)


def print_with_json_dumps(data):
    print(json.dumps(data, indent=4, ensure_ascii=False))


def timestamp_every_month(stamp):
    time = datetime.datetime.utcfromtimestamp(int(stamp))

    yy = int(time.strftime('%Y'))
    mm = int(time.strftime('%m'))

    return int(datetime.datetime(yy, mm, 1).timestamp())


def exec_subprocess(cmd):
    """
    single command run.
    command must be prepared as subprocess call

    :param cmd:
    :return:
    """
    ret = subprocess.call(cmd)
    if ret == 0:
        print("success...")
    else:
        print("error")


def run(commands_bash_list=None, max_workers: int = 1):
    """
    run pull of jobs
    input:
        parallel_jobs: integer, how many jobs at once
        cmds: list of commands

    :param commands_bash_list:
    :param max_workers:
    :return:
    """
    if commands_bash_list is None:
        commands_bash_list = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = executor.map(exec_subprocess, commands_bash_list)
        print(type(futures))


def rename_all_djv_file_with_djvu_suffix_in_dir(path):
    print('🟢', 'rename_all_djv_file_with_djvu_suffix_in_dir')

    files = walk_files(pathlib.Path(path))

    djvs = list(filter(lambda file: file.suffix in ['.djv'], files))
    print('🪢', len(djvs), '[.djv] files in total files number:', len(files))

    for file in djvs:
        if file.suffix == '.djv':
            file.rename(file.with_suffix('.djvu'))

        print('🧤', file.name)
        print(file)
        print()


def make_djvu_to_compressed_pdf(djvu):
    print('🟢🟢', 'make_djvu2pdf')
    djvu = pathlib.Path(djvu)

    max_len_pdf_stem = 203 - 2 * len(str(uuid.uuid4()))
    pdf_name = f'{slug(djvu.stem)[:max_len_pdf_stem]}-{uuid.uuid4()}.pdf'

    if not pathlib.Path('/tmp').exists():
        print('Err', 'No Linux TMP')
        return

    tmp_pdf = pathlib.Path('/tmp').joinpath(pdf_name)
    # print('tmp_pdf: ', tmp_pdf)

    # print('🍔', djvu)
    # print('🌶', djvu.resolve().as_posix())
    tmp_pdf = toolsDJVU.djvu2pdf(djvu, tmp_pdf, pages=None)

    if not tmp_pdf:
        return

    print(sizeof_fmt(tmp_pdf.stat().st_size))

    # print('🫑', tmp_pdf)

    print('🟢🟢', 'compress_pdf')
    compressed_pdf_name = f'{tmp_pdf.name}-{uuid.uuid4()}.pdf'
    compressed_pdf = pathlib.Path('/tmp').joinpath(compressed_pdf_name)
    # print('compressed_pdf:', compressed_pdf)

    compressed_pdf = toolsPDF.compress_pdf(tmp_pdf, compressed_pdf)

    if not compressed_pdf:
        return

    print(sizeof_fmt(compressed_pdf.stat().st_size))

    pdf = djvu.parent.joinpath(djvu.name + '.pdf')
    # print('PDF: ', pdf)

    # Move to Dir
    pdf = compressed_pdf.rename(pdf)
    tmp_pdf.unlink()

    return pdf


def make_all_djvu_to_compressed_pdf(path):
    print('🟢', 'make_djvu_to_compressed_pdf')

    files = walk_files(pathlib.Path(path))
    print('Len files: ', len(files))

    djvus = list(filter(lambda file: file.suffix == '.djvu', files))
    print('Len djvus: ', len(djvus))

    djvus_without_twinks = list(filter(lambda file: not librariumTools.is_twink_in_same_dir(file), djvus))
    print('Len djvus_without_twinks: ', len(djvus_without_twinks))

    for djvu in djvus_without_twinks:
        pdf = make_djvu_to_compressed_pdf(djvu)
        if not pdf:
            continue
            
        pdf = pathlib.Path(pdf)
        if not pdf.exists:
            continue

        print('🐫', djvu)
        print('🍫', pdf)
        print()

    print()
    print('🌽', 'End')


def sizeof_fmt(num, suffix="B"):
    for unit in ["", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi"]:
        if abs(num) < 1024.0:
            return f"{num:3.1f}{unit}{suffix}"
        num /= 1024.0
    return f"{num:.1f}Yi{suffix}"

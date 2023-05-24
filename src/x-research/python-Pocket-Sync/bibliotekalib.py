from pathlib import Path
import os

from biblioteka_utilities import get_all_files_in_dir, \
    rm_content_dir, \
    get_macos_file_tags, \
    get_formatted_date_type1, cp_file


class PocketSync:

    def __init__(self, path: Path):
        self.path = Path(path)

    def clear(self):
        rm_content_dir(self.path)

    def make(self):
        self.clear()

    def sync_files(self, files: list):
        pass


def filter_by_extension(files: list[Path], extensions: list[str]):
    if not extensions:
        return files

    files_filtered = []
    for file_path in files:
        if file_path.suffix not in extensions:
            continue
        files_filtered.append(file_path)

    return files_filtered


def filter_by_tags(files: list[Path], tags: list[str]):
    if not tags:
        return files

    files_filtered = []
    for file_path in files:
        file_tags = get_macos_file_tags(path=file_path.absolute().__str__())
        for file_tag in file_tags:
            if file_tag not in tags:
                continue
            if file_path.is_file():
                files_filtered.append(file_path)
            if file_path.is_dir():
                files_filtered += get_all_files_in_dir(file_path)

    return files_filtered


def show_files(files):
    for file_path in files:
        print(file_path)


class Biblioteka:

    def __init__(self, path: Path):
        if path:
            self.path = Path(path)
        else:
            self.path = Path(os.getcwd())

        self.files = get_all_files_in_dir(self.path)

    def __str__(self):
        return self.path.name.__str__()

    def myfunc2(self):
        print('MYFUNC2: ', self.__str__())

    def make_pocketsync(self, path):
        pocketsync = PocketSync(path=path)
        pocketsync.clear()

        files = self.files
        # filter_by_extension(files=self.files, extensions=['.pdf', '.epub', '.fb2', ])
        files = filter_by_tags(files=files, tags=['PocketSync', ])

        pocketsync_subdir = pocketsync.path.joinpath(f'{self.path.name}_{get_formatted_date_type1()}')

        for file_path in files:
            # print(file_path)
            relative_path = file_path.relative_to(self.path)
            target_file_path = pocketsync_subdir.joinpath(relative_path)

            cp_file(file_path=file_path, target_path=target_file_path)

        print('\n', f'Success! ✅ [{len(files)} files synced]')

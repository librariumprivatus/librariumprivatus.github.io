import pathlib
import shutil

import utils
from PIL import Image

import toolsPDF
import toolsDJVU
import toolsEPUB

import librarium

''''
    Why is the quality of JPEG images produced by PIL so poor?
    https://stackoverflow.com/questions/19303621/why-is-the-quality-of-jpeg-images-produced-by-pil-so-poor

    You can set subsampling=0 when saving an image and the image looks way sharper! Thanks for your Help Mark!


'''


def create_cover(
        path: str | pathlib.Path,
        output: str | pathlib.Path):

    path = pathlib.Path(path)
    output = pathlib.Path(output)

    match path.suffix:
        case '.pdf':
            return toolsPDF.cover(path, output)

        case '.djvu' | '.djv':
            return toolsDJVU.cover(path, output)

        case '.epub':
            return toolsEPUB.cover(path, output)

        case _:
            print('🔸Warn - Extension of your file is not supported')
            return None


def generate_covers_ratio(collection):
    for identifier, element in collection.elements.items():
        if not element.data.get('cover'):
            continue

        cover_name = element.data.get('cover')

        cover_path = collection.store.path.joinpath('covers').joinpath(cover_name)

        if not cover_path.exists():
            continue

        # print(cover_name)

        img = Image.open(cover_path.resolve().as_posix())
        width, height = img.size
        ratio = round(height / width, 3)
        element.set('cover_ratio', ratio)

    collection.save()


def generate_covers(collection: librarium.Collection):
    print('🟢 generate_covers', collection)
    collection.store.mkdir('covers/')

    for id_, element in collection.elements.items():
        print()
        print('🌠‍', 'Gen Cover For element: ', id_)

        book_home = collection.home.resolve().joinpath(element.path)
        cover = collection.store.path.joinpath('covers').joinpath(f'{id_}.jpg')

        #print('🧞', 'Book home path ', book_home.as_posix())
        #print('🧚‍', 'Cover Book home path ', cover.as_posix())

        try:
            cover = create_cover(book_home, cover)
        except Exception as e:
            print('🔴', 'Exception!', 'create_cover')
            print(e)
            continue

        if not cover:
            continue

        element.set('cover', cover.name)
        # print('🌠', cover.name)

    collection.save()


def compressed_cover_create(
        path: pathlib.Path,
        output: pathlib.Path,
        quality: int = 80,
        max_width: int = 500,
        max_height: int = 400
):
    try:
        img = Image.open(path.as_posix())
        img.thumbnail((max_width, max_height))
        img.save(
            output,
            "JPEG",
            optimize=True,
            quality=quality,
            subsampling=0,
            progressive=True
        )
    except Exception:
        err = '🔴'
        print(err)
        print(path.name)
        return

    return output


def generate_covers_compressed(
        collection: librarium.Collection,
        quality: int = 80,
        max_width: int = 400,
        max_height: int = 500
):
    compressed_covers_dir_name = f'covers-q{quality}w{max_width}h{max_height}'
    compressed_covers_dir = collection.store.path.joinpath(compressed_covers_dir_name)

    if compressed_covers_dir.exists():
        shutil.rmtree(compressed_covers_dir.resolve().as_posix())

    collection.store.mkdir(compressed_covers_dir_name)

    for identifier, element in collection.elements.items():
        if not element.data.get('cover'):
            continue

        cover_path = collection.store.path.joinpath('covers').joinpath(element.data.get('cover'))
        if not cover_path.exists():
            continue
        # print(cover_path.name)

        compressed_cover_path = compressed_covers_dir.joinpath(cover_path.name)
        res = compressed_cover_create(
            cover_path, compressed_cover_path,
            quality=quality,
            max_width=max_width,
            max_height=max_height
        )
        # print(res)
        # print()


def covers_full(collection: librarium.Collection):
    generate_covers(collection)
    generate_covers_ratio(collection)
    generate_covers_compressed(collection)

from pdf2image import convert_from_path
import pathlib
from pypdf import PdfReader
import utils

DEBUG = False


def pdf2text(path: pathlib.Path, pages_list: list = None):
    path = pathlib.Path(path)
    if not (pdf := PdfReader(path.resolve().as_posix())):
        print('Err - if not (pdf := PdfReader(path.as_posix())):')
        return

    if not pages_list:
        pages_list = list(range(len(pdf.pages)))

    texts = []
    for page_number in pages_list:
        try:
            page = pdf.pages[page_number]
            text = page.extract_text()
        except Exception:
            print('Err - tr page.extract_text()')
            continue

        texts.append(text)

    return texts


def get_images(path: pathlib.Path, output: pathlib.Path, only_first_page=False):
    output = pathlib.Path(output)
    images = convert_from_path(
        pdf_path=path.resolve().as_posix(),
        single_file=only_first_page,
        output_folder=output.parent.resolve(),
        output_file=output.stem,
        fmt=output.suffix
    )

    return images


def cover(path: pathlib.Path, output: pathlib.Path) -> pathlib.Path | None:
    if not get_images(path, output, only_first_page=True):
        print('Err - if not pdf_images_result:')
        return None

    return output


def compress_pdf(
        path: str | pathlib.Path,
        output: str | pathlib.Path) -> pathlib.Path | None:

    path = pathlib.Path(path)
    output = pathlib.Path(output)

    command = [
        'gs',  '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        '-dPDFSETTINGS=/printer',
        '-dNOPAUSE',  '-dQUIET',
        '-dBATCH',
        f'-sOutputFile={output.resolve().as_posix()}',
        f'{path.resolve().as_posix()}',
    ]

    # print(command)

    if (result := utils.subprocess.call(command)) != 0:
        print('Result: ', result)
        return

    return output

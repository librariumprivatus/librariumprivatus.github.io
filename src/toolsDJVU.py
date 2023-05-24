import pathlib
import subprocess
import utils

import toolsPDF


def convert2txt(path: str | pathlib.Path, output: str | pathlib.Path, pages: list):
    command = ['djvutxt']

    if pages:
        command.append('--page={pages}'.format(pages=','.join(pages)))

    path = pathlib.Path(path)
    command.append(f'{path.resolve().as_posix()}', )
    output = pathlib.Path(output)
    command.append(f'{output.resolve().as_posix()}')

    try:
        result = subprocess.call(command)
    except Exception:
        print('Err.', 'try: result = subprocess.call(command)')
        return None

    if result != 0:
        print('Err. ', 'if result != 0:')
        return None

    return output


def get_text(path: str | pathlib.Path, pages: list):
    """
    pages: - in format str for : -pages=1,2,3,7-9
        """

    path = pathlib.Path(path)
    txt = path.with_name(f'{path.name}.txt')
    if pathlib.Path('/tmp').exists():
        txt = pathlib.Path('/tmp').joinpath(txt.name)

    if not (output_txt_file := convert2txt(path, txt, pages=pages)):
        print('Err.', 'output_txt_file = convert2txt(path, txt, pages=pages)')
        txt.unlink()
        return

    text = utils.read_file(output_txt_file)
    txt.unlink()

    return text


def djvu2pdf(
        path: str | pathlib.Path,
        output: str | pathlib.Path,
        pages: list, quality=80) -> pathlib.Path | None:

    path = pathlib.Path(path)
    output = pathlib.Path(output)

    command = ['ddjvu', '-format=pdf']
    if pages:
        pages = [str(page) for page in pages]
        command.append('-page={pages}'.format(pages=','.join(pages)))

    if quality:
        command.append(f'-quality={quality}')

    command.append(f'{path.resolve().as_posix()}')
    command.append(f'{output.resolve().as_posix()}')

    # print(command)
    if (result := subprocess.call(command)) != 0:
        print('Result: ', result)
        return

    return output


def cover(path: pathlib.Path, output: pathlib.Path) -> pathlib.Path | None:
    # print('🧬', 'DJVU', '1')
    tmp_pdf_path = f'{output.stem}.pdf' if output else f'{path.name}.pdf'
    if pathlib.Path('/tmp').exists():
        tmp_pdf_path = pathlib.Path('/tmp').joinpath(tmp_pdf_path)

    # print('🧬', 'DJVU', '2')
    if not (pdf_temp := djvu2pdf(path=path, output=tmp_pdf_path, pages=[1])):
        print('Err', 'not pdf.exists():')
        return

    # print('🧬', 'DJVU', '3')
    output = output if output else f'{path.name}.jpg'
    # PDF (tmp) -> IMG

    # print('🧬', 'DJVU', '4')
    pdf_temp = pathlib.Path(pdf_temp)
    if not (image := toolsPDF.cover(pdf_temp, output=output)):
        print('🔻Err - if not cover:')
        return

    # print('🧬', 'DJVU', '5')
    # Remove PDF (tmp)
    pdf_temp.unlink()

    # print('🧬', 'DJVU', '6')
    return image

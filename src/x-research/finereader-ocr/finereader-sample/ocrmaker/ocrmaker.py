import subprocess
import os.path
import time

TIMEOUT_PDF_CREATION_SECONDS = 600
TIME_SLEEP_START_END_FINEREADER_APPLICATION_SECONDS = 10

CURRENT_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASH_ABSPATH = '/bin/bash'


def subprocess_run(command: str = '') -> str:
    result = subprocess.run(
        command,
        shell=True,
        capture_output=True
    )

    if result.stderr:
        print('Error! Subprocess.run: ', result)

    return str(result.stdout)


def open_finereader_application():
    close_bash_script_path = os.path.join(CURRENT_SCRIPT_DIR, 'open-finereader-application.sh')
    subprocess_run(f'{BASH_ABSPATH} {close_bash_script_path}')
    time.sleep(TIME_SLEEP_START_END_FINEREADER_APPLICATION_SECONDS)


def close_finereader_application():
    close_bash_script_path = os.path.join(CURRENT_SCRIPT_DIR, 'close-finereader-application.sh')
    subprocess_run(f'{BASH_ABSPATH} {close_bash_script_path}')
    time.sleep(TIME_SLEEP_START_END_FINEREADER_APPLICATION_SECONDS)


def make_pdf(file: str = '', target_file: str = ''):
    abspath_file = os.path.abspath(file)
    abspath_target_file = os.path.abspath(target_file)

    run_finereader_bash_script_path = os.path.join(CURRENT_SCRIPT_DIR, 'run-finereader-application.sh')
    bash_command = f'{BASH_ABSPATH} {run_finereader_bash_script_path} {abspath_file} {abspath_target_file}'
    result = subprocess.run(
        bash_command,
        shell=True,
        capture_output=True,
        timeout=TIMEOUT_PDF_CREATION_SECONDS
    )

    if result.stderr:
        print('Error in subprocess.run: ', result)
        return

    start_time = time.time()
    while time.time() - start_time < TIMEOUT_PDF_CREATION_SECONDS:
        if os.path.exists(abspath_target_file):
            return

    print('Error! PDF. No File wasn t generated')


def make_multiple_pdfs(inputlist: list = []):
    open_finereader_application()

    for abs_filepath, abs_target_pdf in inputlist:
        make_pdf(abs_filepath, abs_target_pdf)

    close_finereader_application()


if __name__ == '__main__':
    if True:
        demo_list = [
            ['example/diploma.pdf', 'example/diploma-recognized.pdf'],
            ['example/img_0459.jpg', 'example/img_0459.pdf'],
            ['example/file1.jpg', 'example/file1.pdf'],
            ['example/file2.jpg', 'example/file2.pdf'],
            ['example/file3.jpg', 'example/file3.pdf'],
        ]

        make_multiple_pdfs(demo_list)


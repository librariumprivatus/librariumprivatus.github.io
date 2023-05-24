import pathlib

samples_dir = pathlib.Path('samples')

for file in samples_dir.iterdir():
    print('Stem: ', file.stem)
    print('Suffix: ', file.absolute())

    print('\n')

import pathlib
from path_tree_generator import PathTree
import utils
import re


def sort_tree(tree=None):
    if tree is None:
        tree = {}
    if not tree.get('children'):
        return tree

    tree['children'] = sorted(tree['children'], key=lambda x: x.get('name'))

    for idx, child in enumerate(tree['children']):
        tree['children'][idx] = sort_tree(tree['children'][idx])

    return tree


'''
    Remove Not Serialized json objects
'''


def normalize_tree(tree=None):
    if tree is None:
        tree = {}

    if tree.get('entry_type'):
        type_str = str(tree.get('entry_type'))
        split = type_str.split('.')[-1]
        tree['entry_type'] = split
        tree['path'] = pathlib.Path(tree['path']).as_posix()

    if tree.get('children'):
        for idx, child in enumerate(tree['children']):
            tree['children'][idx] = normalize_tree(tree['children'][idx])

    return tree


def remove_ds_store_files(tree=None):
    if tree is None:
        tree = {}
    if tree.get('name') in ['.DS_Store', '.idea', '.DS Store']:
        print('🔴 🎭 ', 'Ignored: ', tree.get('name'), tree.get('path'))
        return None

    if not tree.get('children'):
        return tree

    if tree.get('children'):
        new_children = []
        for idx, child in enumerate(tree['children']):
            got_element = remove_ds_store_files(tree['children'][idx])
            if not got_element:
                continue
            new_children.append(got_element)

        tree['children'] = new_children
    return tree


def remove_some_keys(tree=None):
    if tree is None:
        tree = {}
    tree.pop('stat', None)

    if tree.get('children'):
        for child_tree in tree['children']:
            remove_some_keys(child_tree)

    return tree


def modify_some_keys(tree=None):
    if tree is None:
        tree = {}
    if tree.get('entry_type'):
        tree['type'] = tree.get('entry_type')
        tree.pop('entry_type', None)

    if tree.get('children'):
        for child_tree in tree['children']:
            modify_some_keys(child_tree)

    return tree


def generate_different_id(tree=None):
    if tree is None:
        tree = {}
    path = tree.get('path')

    tree['id'] = utils.get_id(pathlib.Path(path))
    tree['nickname'] = utils.get_nickname(pathlib.Path(path))

    if not tree.get('children'):
        return tree

    for idx, child_tree in enumerate(tree['children']):
        tree['children'][idx] = generate_different_id(tree['children'][idx])

    return tree


def generate_elements_tree(home_path: str | pathlib.Path):
    home_path = pathlib.Path(home_path)

    tree = PathTree(home_path).dict()

    tree = normalize_tree(tree)

    print('🔴 🎭 ', ' Start ! remove_ds_store_files')
    tree = remove_ds_store_files(tree)

    tree = sort_tree(tree)

    tree = remove_some_keys(tree)

    tree = modify_some_keys(tree)

    tree = generate_different_id(tree)

    return tree


def generate_elements_from_tree(input_tree):
    def make_elements_recursive(tree):
        # print('Tree node:', tree.get('nickname'))
        element = {
            'nickname': tree.get('nickname'),
            'type': tree.get('type'),
            'path': tree.get('path'),
        }

        elements[tree.get('id')] = element

        if not tree.get('children'):
            return tree

        for child_tree in tree['children']:
            make_elements_recursive(child_tree)

        return tree

    elements = {}
    make_elements_recursive(input_tree)

    return elements


LIB_PATTERNS = ['lib', 'Lib', 'LIB', 'z-l.', 'z-.']


def file_stem_has_lib_patterns(file, patterns=None):
    if patterns is None:
        patterns = LIB_PATTERNS
    file = pathlib.Path(file)
    for pattern in patterns:
        if re.findall(pattern, file.stem):
            print('🧶', file.name)
            print('\t', pattern)

            return True

    return False


BAD_TAGS_PATTERNS = {
    'Z Library': '',
    'Z_Library': '',
    'z_library': '',
    ' \(Z-Library\)': '',
    '_Z_Library': '',
    '_z_lib_org': '',
    '_z_lib_or': '',
    ' z_lib_or': '',
    ' \(z-lib\.org\)': '',
    ' \(z-lib\.or-2': '',
    ' \(z-lib\.or2': '',
    ' \(z-lib\.or': '',
    ' \(z-lib': '',
    ' \(z-l\.': '.',
    ' z-l\.': '.',
    ' z-$': '',
    ' - royallib\.com': '',
    '\.\.\.\.\.\.': '',
    '\.\.\.\.\.': '',
    '\.\.\.\.': '',
    '\.\.\.': '',
    '\.\.': '.',
    '     ': ' ',
    '    ': ' ',
    '   ': ' ',
    '  ': ' ',
    ' $': '',
    '\.$': '',
    ' \.$': '',
    '_': ' ',
    ',$': ' ',
    ' \)$': '',
    ' \($': '',
    ' - BooksCafe\.Net': '',
    ',': ' ',
    '-$': '',
    '=': ' ',
    '’': '-',
    '\($': '',
    '\(\)': '',
    '\(\)': '',
    '^ ': '',
    '^-': '',
}


def cleaned_stem(target, tags=None):
    if tags is None:
        tags = BAD_TAGS_PATTERNS

    status = True
    while status:
        status = False
        for key in tags.keys():
            # print(key)
            res = re.findall(key, target)
            # print(res)
            if res:
                # print('Find', key, tags[key])
                target = re.sub(key, tags[key], target)
                # print('UPD', target)
                # print()
                status = True

    return target


def clean_file_names(root):
    print('🟢', 'clean_file_names')

    files = utils.walk_files(root)
    files_with_patterns = list(filter(lambda file: file_stem_has_lib_patterns(file), files))

    for file in files_with_patterns:
        stem = file.stem
        stem = cleaned_stem(stem)
        if not stem:
            continue

        renamed_file = pathlib.Path()

        # Uncomment to WRITE Rename
        renamed_file = utils.rename_file_stem(file, stem)

        if not renamed_file:
            continue

        print('🧤')
        print(file.stem)
        print(renamed_file.stem)
        print()


def preprocessingCollection(root):
    root = pathlib.Path(root)

    clean_file_names(root)

    utils.rename_all_djv_file_with_djvu_suffix_in_dir(root)

    utils.make_all_djvu_to_compressed_pdf(root)



def is_twink_in_same_dir(djvu):
    djvu = pathlib.Path(djvu)

    pdfs = parents = list(filter(lambda file: file.suffix == '.pdf', djvu.parent.iterdir()))

    has_ddjvu_subsuffix = list(filter(lambda file: '.djvu' in file.stem, pdfs))

    twinks = list(filter(lambda file: djvu.stem in file.name, has_ddjvu_subsuffix))

    if twinks:
        return True

    return False






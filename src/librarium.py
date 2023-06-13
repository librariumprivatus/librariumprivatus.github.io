import pathlib
import enum
import sys

import librariumTools as Tools

import utils


SUPPORTED_BOOK_TYPES = [
    '.pdf',
    '.djvu',
    '.djv',
    '.epub',
]


class Element:
    class TAG(enum.Enum):
        ID = 'id'
        NICKNAME = 'nickname'
        PATH = 'path'
        HOME = 'home'

    data: dict = {
        'id': 'ID-DEFAULT-ELEMENT',
        'nickname': 'NICKNAME-DEFAULT-ELEMENT',
        'path': 'PATH-DEFAULT-ELEMENT',
        'home': 'HOME-DEFAULT-ELEMENT',
    }

    @property
    def id(self) -> str:
        return self.data.get(self.TAG.ID.value)

    @property
    def nickname(self) -> str:
        return self.data.get(self.TAG.NICKNAME.value)

    @property
    def path(self) -> pathlib.Path:
        return pathlib.Path(self.data.get(self.TAG.PATH.value))

    @property
    def home(self) -> pathlib.Path:
        return pathlib.Path(self.data.get(self.TAG.HOME.value))

    @property
    def path_at_home(self) -> pathlib.Path:
        return self.home.resolve().joinpath(self.path.as_posix())

    @property
    def filename(self) -> str:
        return '{nickname}.json'.format(nickname=self.nickname)

    def set(self, tag_name, value):
        self.data[tag_name] = value

    def set_data(self, data: dict):
        for key, value in data.items():
            self.set(key, value)

    def get(self, tag_name):
        return self.data.get(tag_name)

    def __init__(self, path):
        path = pathlib.Path(path)
        #   print('🧯', 'INIT', path.as_posix())

    def __str__(self):
        return f'⚪️ <Element ID {self.id}>'


class Store:
    class TAG(enum.Enum):
        ROOT: str = 'root'
        BOOKS_SHELF: str = 'books'
        COVERS_SHELF: str = 'covers'

    path: pathlib.Path = 'STORE-PATH'

    @property
    def dir_covers(self) -> pathlib.Path:
        return self.path.joinpath('covers/')

    @property
    def dir_elements(self) -> pathlib.Path:
        return self.path.joinpath('elements/')

    @property
    def elements_tree_path(self) -> pathlib.Path:
        return self.path.joinpath('elements-tree.json')

    def __init__(self, path: pathlib.Path):
        print('🟢 Init Store ')
        self.path = pathlib.Path(path)
        self.path.mkdir(parents=True, exist_ok=True)

    def mkdir(self, dirname):
        self.path.joinpath(pathlib.Path(dirname)).mkdir(parents=True, exist_ok=True)


class Collection:
    class TAG(enum.Enum):
        ROOT = 'root'
        RELATIVE = 'relative'
        STORE = 'store'
        DEFAULT_STORE_PLACEMENT = 'data/store'
        TREE_JSON_FILENAME = 'tree.json'
        PATH = 'path'

    SUPPORTED_BOOK_TYPES = [
        '.pdf',
        '.epub',
        '.djvu',
        '.djv',
        '.fb2',
    ]
    JSON_PATTERN = '{id}.json'

    data: dict = {}
    elements: dict[str, Element] = {}
    store: Store
    tree: dict = {}
    home: pathlib.Path = pathlib.Path('HOME-COLLECTION-DEFAULT')
    data_dir: pathlib.Path = pathlib.Path('DATA-DIR-COLLECTION-DEFAULT')

    def __new__(cls, home: str | pathlib.Path, store: str | pathlib.Path):
        print(f'🟢 Creating a new Collection object')

        if not pathlib.Path(home).exists():
            print(f'🔴 Error! Home path is not exist!: {home}')
            sys.exit()

        if not pathlib.Path(store).exists():
            print(f'🔴 Error! Store path is not exist!: {store}')
            sys.exit()

        sub_dirs = [x for x in pathlib.Path(home).iterdir() if x.is_dir()]
        if len(sub_dirs) != 1:
            print(f'🔴 Error! Data dir contains zero or more then one dir!')
            print('\t', 'Dirs: ')
            [print('\t', d) for d in sub_dirs]
            sys.exit()

        return object.__new__(cls)

    def __init__(self, home: str | pathlib.Path, store: str | pathlib.Path):
        print('🟢', 'Initializing Collection')

        self.home = pathlib.Path([x for x in pathlib.Path(home).iterdir() if x.is_dir()][0].as_posix())

        self.store = Store(path=pathlib.Path(store))

        self.load_store_data()

    def load_store_data(self):
        print('🟢 Load Store Data')
        if self.store.elements_tree_path.exists():
            self.tree = utils.read_json(self.store.elements_tree_path)

        if self.store.dir_elements.exists():
            print('🟢 Read elements')
            files = utils.walk_files(self.store.dir_elements)
            elements_files = list(filter(lambda f: f.suffix in ['.json'], files))

            for element_file in elements_files:
                if not (data_element := utils.read_json(element_file)):
                    print('🔸', 'Warning', 'if not (data_element := utils.read_json(element_file)):')
                    continue
                path = data_element.get('path')
                element = Element(path)
                element.data = data_element
                id_element = data_element.get('id')
                self.elements[id_element] = element

    def upgrade(self):
        print('🟢 🔄 Upgrade Collection', self)
        print()

        self.elements.clear()

        self.tree = Tools.generate_elements_tree(self.home)
        print('🧬 Tree: self.tree: ')
        utils.print_tree2(self.tree)
        print()

        cand_elements = Tools.generate_elements_from_tree(self.tree)

        for id_cand, data_cand in cand_elements.items():
            print('🏓 Candidate to Element: ', id_cand)

            path = pathlib.Path(data_cand.get('path'))
            element = Element(path)

            element.data = data_cand
            element.data['home'] = self.home.as_posix()

            self.elements[id_cand] = element

            print('🥎 Added Element: ', self.elements[id_cand].id)
            print()

        print('🟢 Add Parent Elem ID')
        Tools.add_parent_elem_id(self, self.tree)

        print('🟢 Add Empty Titles')
        Tools.add_empty_title(self)

    def save(self):
        print('🟢 💾 Save Collection')
        utils.write_json(self.store.elements_tree_path, self.tree)

        self.store.mkdir('elements')
        for element in self.elements.values():
            res = utils.write_json(self.store.dir_elements.joinpath(element.filename), element.data)

    def books_ids(self):
        ids_ = list(self.elements.keys())
        ids_ = list(filter(lambda id_: self.elements[id_].data.get('type') == 'file', ids_))
        ids_ = list(filter(lambda id_: self.elements[id_].path.suffix in self.SUPPORTED_BOOK_TYPES, ids_))
        return ids_






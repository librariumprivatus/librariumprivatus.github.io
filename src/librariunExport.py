import collections
import pathlib
import librariumTools as Tools
import utils
import librarium

DEFAULT_EXPORT_ELEMENT_SCHEME = {
    'nickname': 'NICKNAME',
    'type': 'TYPE',
    'path': 'PATH',
}


def write_export_json(path, data, tag_data_name: str = 'data'):
    utils.write_json(
        pathlib.Path(path),
        {
            'update': utils.get_datetime(),
            tag_data_name: data
        })


def get_slim_tree_to_export(tree):
    def _tree_recursion(tree=None):
        #print('😈', 'ID: ', tree.get('id'), '🐸', tree.get('name'))

        node_id, node_childs = None, None

        if tree.get('type') == 'file':
            #print('📋', 'It is File')

            if pathlib.Path(tree.get('path')).suffix in librarium.SUPPORTED_BOOK_TYPES:
                #print('📕', 'It is Book')
                node_id = tree.get('id')

        if tree.get('type') == 'dir':
            #print('🗂', 'It is Dir')

            if tree.get('children'):
                #print('🤖', 'Dir has children')

                node_id = tree.get('id')

                node_childs = {}
                for idx, child in enumerate(tree['children']):
                    sub_id, sub_childs = _tree_recursion(tree['children'][idx])
                    if not sub_id:
                        continue

                    node_childs[sub_id] = sub_childs

        return node_id, node_childs

    sub_id, sub_childs = _tree_recursion(tree)
    return {sub_id: sub_childs}


def export_elements_tree(collection):
    print('🟢 Export. Tree')
    out_tree = get_slim_tree_to_export(collection.tree)
    write_export_json(collection.store.path.joinpath('jsons/tree.json'), out_tree)


FIELDS_NOT_EXPORT = [
    'home',
    'name',
    'nickname'
]

def export_elements(collection):
    print('🟢 Export. Elements')

    elements_export = {}
    for id_element, element in collection.elements.items():
        export_element_data = {}
        for key, value in element.data.items():
            if key not in FIELDS_NOT_EXPORT:
                export_element_data[key] = value
        elements_export[id_element] = export_element_data

    write_export_json(collection.store.path.joinpath('jsons/elements.json'), elements_export)


def export_elements_books(collection):
    print('🟢 Export. Elements. Books')
    elements_by_time = []
    for id_element, element in collection.elements.items():
        if element.data.get('type') != 'dir':
            elements_by_time.append(element.id)

    # elements = sorted(elements, key=lambda x: x.get('time'), reverse=True)
    write_export_json(collection.store.path.joinpath('jsons/books.json'), elements_by_time)


def export_elements_months_and_books(collection: librarium.Collection):
    print('🟢 Export. Elements. Months')
    books_by_months = {}
    for id_element, element in collection.elements.items():
        if element.data.get('type') == 'dir':
            continue
        try:

            month_time_stamp = utils.timestamp_every_month(element.path_at_home.stat().st_mtime)
        except (Exception,):
            print('Err', Exception)
            continue

        if not books_by_months.get(month_time_stamp):
            books_by_months[month_time_stamp] = []
        books_by_months[month_time_stamp].append(element.id)

    # elements = sorted(elements, key=lambda x: x.get('time'), reverse=True)
    books_by_months = collections.OrderedDict(sorted(books_by_months.items(), reverse=True))
    write_export_json(collection.store.path.joinpath('jsons/booksByMonths.json'), books_by_months)

    months = [month for month in books_by_months.keys()]
    write_export_json(collection.store.path.joinpath('jsons/months.json'), months)


def export_full(collection):
    print('🟢 📬 Export')

    collection.store.mkdir('jsons')

    export_elements_tree(collection)
    export_elements(collection)
    export_elements_books(collection)
    export_elements_months_and_books(collection)


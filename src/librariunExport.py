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


def write_export_json(path, tag_name, data):
    utils.write_json(
        pathlib.Path(path),
        {
            'update': utils.get_datetime(),
            tag_name: data
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
    print('🟢 export_elements_tree', collection)
    out_tree = get_slim_tree_to_export(collection.tree)
    write_export_json(collection.store.path.joinpath('jsons/tree.json'), 'tree', out_tree)


def export_elements(collection):
    print('🟢 export_elements', collection)
    elements_export = {}
    for id_element, element in collection.elements.items():

        export_element = DEFAULT_EXPORT_ELEMENT_SCHEME.copy()

        export_element['nickname'] = element.data.get('nickname')
        export_element['path'] = element.data.get('path')

        if element.data.get('type'):
            export_element['type'] = element.data.get('type')

        if element.data.get('title'):
            export_element['title'] = element.data.get('title')

        if element.data.get('cover'):
            export_element['cover'] = element.data.get('cover')

        if element.data.get('cover_ratio'):
            export_element['cover_ratio'] = element.data.get('cover_ratio')

        # print('🛵 Export: ', id_element)
        # utils.print_tree(export_element)
        # print()

        elements_export[id_element] = export_element

    # utils.print_tree(elements_export)
    write_export_json(collection.store.path.joinpath('jsons/elements.json'), 'elements', elements_export)


def export_elements_times(collection):
    print('🟢 export_elements_times', collection)
    elements_by_time = []
    for id_element, element in collection.elements.items():

        if element.data.get('type') == 'dir':
            continue

        elements_by_time.append(element.id)

    # elements = sorted(elements, key=lambda x: x.get('time'), reverse=True)

    write_export_json(collection.store.path.joinpath('jsons/books-grid.json'), 'books', elements_by_time)


def export_elements_months(collection: librarium.Collection):
    print('🟢 export_elements_months', collection)
    months = {}

    for id_element, element in collection.elements.items():
        # print('\n', '🛼', 'Elem Export', '\t', element.path.name)
        # print('Type: ', element.data.get('type'))

        if element.data.get('type') == 'dir':
            continue

        month_time_stamp = utils.timestamp_every_month(element.path_at_home.stat().st_mtime)

        if not months.get(month_time_stamp):
            months[month_time_stamp] = []
        months[month_time_stamp].append(element.id)

    # elements = sorted(elements, key=lambda x: x.get('time'), reverse=True)

    months = collections.OrderedDict(sorted(months.items(), reverse=True))

    months_arr = []

    for key in months.keys():
        months_arr.append(key)

    write_export_json(collection.store.path.joinpath('jsons/books-months-grid.json'), 'months', months)

    write_export_json(collection.store.path.joinpath('jsons/months-sorted.json'), 'months', months_arr)


def export_full(collection):
    print('🟢 export_full', collection)

    collection.store.mkdir('jsons')

    export_elements_tree(collection)

    export_elements(collection)
    export_elements_months(collection)
    export_elements_times(collection)

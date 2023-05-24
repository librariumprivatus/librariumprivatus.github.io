

def print_directory_tree(tree, indent='   ', _tabs=0):
    if tree.get('children') and tree.get('type'):
        tree = tree.get('children')

    for name, data in tree.items():
        if data.get('type') == 'FILE':
            print(indent * _tabs, '🔹' + name, )

        elif data.get('type') == 'DIR':
            print(indent * _tabs, '🗂' + name)
            print_directory_tree(data.get('children'), _tabs=_tabs + 1)


def list_of_paths2tree(paths=None, datas=None):
    if datas is None:
        datas = []

    def attach(tree, branch, data):
        if not branch:
            return

        parts = branch.split('/', 1)
        name = parts[0]
        if len(parts) == 1:
            tree['children'][name] = {'type': 'FILE'}
            if data:
                for key in data.keys():
                    tree['children'][name][key] = data[key]

        else:
            childs = parts[1]
            if not tree['children'].get(name):
                tree['children'][name] = {
                    'type': 'DIR',
                    'children': {}
                }

            attach(tree['children'][name], childs, data)

    tree_inp = {'children': {}, 'type': 'DIR'}
    for idx, path in enumerate(paths):
        attach(tree_inp, path, datas[idx])

    return tree_inp


def tree2list_of_paths(tree=None):
    if tree is None:
        tree = {}
    paths = []
    if not tree.get('children'):
        return paths

    for name, data in tree.get('children').items():
        if data.get('type') == 'FILE':
            paths.append(name)

        elif data.get('type') == 'DIR':
            sub_paths = tree2list_of_paths(data)
            sub_paths = [name + '/' + sub_path for sub_path in sub_paths]
            paths += sub_paths

    return paths

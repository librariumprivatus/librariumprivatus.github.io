
import pathlib
import collectionBooks
import pdfBooks

DEBUG = False

MAX_PAGES_TO_DISCOVER_ISBN = 16


def discover(path):
    pages_list = list(range(MAX_PAGES_TO_DISCOVER_ISBN))
    match path.suffix:
        case '.pdf':
            return pdfBooks.pdf2text(path, pages_list)

        case _:
            print('🔸Warn - Extension of your file is not supported')
            return None


def make(collection: collectionBooks.CollectionBooks):
    for identifier, book in collection.books.items():
        print('Book', book.relative)

        isbns = discover(book.path)

        # book.data['cover'] = cover_path
        print('ISBNs: ', isbns)
        print()

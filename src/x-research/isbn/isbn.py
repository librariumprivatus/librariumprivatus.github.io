import pathlib
import re

from pypdf import PdfReader


def isValidISBNCode(str):
    # Regex to check valid ISBN Code
    regex = "^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\\d-]+$"

    # Compile the ReGex
    p = re.compile(regex)

    # If the string is empty
    # return false
    if (str == None):
        return False

    # Return if the string
    # matched the ReGex
    if (re.search(p, str)):
        return True
    else:
        return False


isbn_text_pattern = [
    'ISBN',
    'Isbn',
    'isbn',
]

def find_isbn_in_text(text):
    m1_text = text.replace(' ', '')

    find_isbn_text = False

    rows = []

    for pattern in isbn_text_pattern:
        res = re.findall(pattern, m1_text)
        if res:
            find_isbn_text = True

    if not find_isbn_text:
        return []

    m2_text = m1_text.replace('-', '')

    res = re.findall(r'\d{10,13}', m2_text)

    if res:
        return res

    return []


def get_isbn(book):
    reader = PdfReader(book.as_posix())
    npages = len(reader.pages)
    # print('\t', 'number_of_pages: ', number_of_pages)
    isbns = []
    for idx, page in enumerate(reader.pages[:20]):
        # print('Page: ', idx)
        text = page.extract_text()
        isbns_page = find_isbn_in_text(text)
        # print()
        # print('Isbns page: ', isbns_page)

        isbns += isbns_page
        # print('--'*10, '\n')

    isbns = list(set(isbns))

    isbns_true = []
    for isbn in isbns:
        # print(isbn)
        res = isValidISBNCode(isbn)
        # print(res)
        if res:
            isbns_true.append(isbn)

    # print()
    # print('ISBNs: ', isbns_true)

    return isbns_true


ISBM_TEXT_PATTERNS = [
    'ISBN',
    'Isbn',
    'isbn',
]


def how_many_isbn_words_in_text(text):
    counter = 0
    for pattern in ISBM_TEXT_PATTERNS:
        result = re.findall(pattern, text)
        counter += len(result)

    return counter


def get_text_blocks_with_isbn_word(text, delta_rows=0):
    rows = text.split('\n')

    target_rows = []
    for idx, row in enumerate(rows):
        result = how_many_isbn_words_in_text(row)
        if result:
            target_rows.append(idx)

    target_rows_range = []
    for target in target_rows:
        target_rows_range += list(range(target - delta_rows, target + 1 + delta_rows))

    target_rows_range = list(set(target_rows_range))

    real_rows_range = []
    for row_number in target_rows_range:
        if 0 <= row_number < len(rows):
            real_rows_range.append(row_number)

    out_text = []
    for row_number in real_rows_range:
        out_text.append(rows[row_number])

    out_text = '\n'.join(out_text)

    return out_text





def discover_isbn(path):
    path = pathlib.Path(path)
    if not path.exists():
        print('Err - if not path.exists():')














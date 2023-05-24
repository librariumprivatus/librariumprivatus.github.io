
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from slugify import slugify
import unicodedata
import parser_utils

MARC21_FIELDS_NAMES = {
    '100': 'authors',
    '245': 'title',
}


def get_marc21_fields_names(data):
    context = {}

    for key in data:
        marc21key = MARC21_FIELDS_NAMES.get(key)
        if not marc21key:
            continue

        context[marc21key] = data[key]

    return context


def get_named_field_data(driver):
    data = get_raw_data(driver)
    data_new = get_marc21_fields_names(data)
    data_new['raw'] = data

    print('data_new', data_new)
    return data_new



def get_raw_data(driver):
    if not driver:
        return None

    marc21_tag = driver.find_element(By.ID, 'marc-rec')
    if not marc21_tag:
        return None

    data = get_data_from_marc21_table(marc21_tag)
    print('Data', data)
    return data


def normalize_text(text):
    return unicodedata.normalize("NFKD", text)


def get_text_from_td_table(html):
    soup = BeautifulSoup(html, 'html.parser')

    texts = []
    for child in soup.children:
        if '<' in str(child):
            continue

        if len(slugify(child.text)) < 2:
            continue

        text = child.text
        text = text.strip()
        texts.append(text)
    return texts


def get_data_from_marc21_table(driver):
    context = {}

    # print('MARC', driver.get_attribute('innerHTML'))
    #   soup = BeautifulSoup(html, 'html.parser')
    if not driver:
        return context

    table = driver.find_element(By.TAG_NAME, 'table')
    if not table:
        return context

    trs = table.find_elements(By.TAG_NAME, 'tr')
    if not trs:
        return context

    for tr in trs:
        tds = tr.find_elements(By.TAG_NAME, 'td')
        if not tds:
            continue

        if len(tds) < 2:
            continue

        key = tds[0].get_attribute('innerHTML')
        key = normalize_text(key)
        key_soup = BeautifulSoup(key, 'html')
        key = key_soup.text
        key = slugify(key)
        print('Key: ', key)

        value = tds[1].get_attribute('innerHTML')
        value = normalize_text(value)
        print('value: ', value)
        #print()
        value = get_text_from_td_table(value)
        print('value: ', value)
        print()
        print()

        context[key] = value

    return context


RECORD_RSL_URL_PATTERN = 'https://search.rsl.ru/ru/record/{}'


def get_records_description_url(driver):
    urls = []

    if not driver:
        return urls

    content_items = driver.find_element(By.ID, 'content-items')
    if not content_items:
        return urls

    result_item = content_items.find_element(By.CLASS_NAME, 'result-item')
    if not result_item:
        return urls

    search_container_s = result_item.find_elements(By.CLASS_NAME, 'search-container')
    if not search_container_s:
        return urls

    for search_container in search_container_s:
        data_id = search_container.get_attribute('data-id')
        if not data_id:
            continue

        url = RECORD_RSL_URL_PATTERN.format(data_id)
        urls.append(url)

    return urls


def search_records(url):
    driver = parser_utils.get_selenium_driver(url)
    urls = get_records_description_url(driver)
    return urls


def get_record_data(url):
    driver = parser_utils.get_selenium_driver(url)
    data = get_named_field_data(driver)

    print('get_record_data', data)

    return data

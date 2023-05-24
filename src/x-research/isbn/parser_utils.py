
from selenium import webdriver


def get_selenium_driver(url):
    options = webdriver.ChromeOptions()
    options.add_argument("headless")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    return driver


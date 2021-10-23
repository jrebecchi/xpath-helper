import pytest
from lxml import etree

@pytest.fixture(scope="session")
def html_doc():
    with open('./tests/index.html') as f:
      contents = f.read()
      return etree.fromstring(contents)
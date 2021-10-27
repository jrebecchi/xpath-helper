from xpath_helper import __version__
from xpath_helper import XPathHelper
from xpath_helper import filter

def test_or_and_conditions(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "a"
    ).get_ancestor_by_tag(
        "ul"
    ).get_element_by_tag(
        "li",
        filter.or_condition(
            filter.and_condition(
                filter.value_contains("Uses"),
                filter.value_contains("awesome")
            ),
            filter.and_condition(
                filter.value_contains("thebestmotherfudging"),
                filter.value_contains("nginx")
            )
        )
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "awesome" in elements[0].text

def test_or_and_condition_priority(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "li",
        filter.and_condition(
            filter.or_condition(
                filter.value_contains("JavaScript"),
                filter.value_contains("wordthatdoesntexists")
            ),
            filter.value_contains("Freaks")
        )
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "Freaks" in elements[0].text

from xpath_helper import XPathHelper, filter

def test_or_and_operators(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "a"
    ).get_ancestor_by_tag(
        "ul"
    ).get_element_by_tag(
        "li",
        filter.or_operator(
            filter.and_operator(
                filter.value_contains("Uses"),
                filter.value_contains("awesome")
            ),
            filter.and_operator(
                filter.value_contains("thebestmotherfudging"),
                filter.value_contains("nginx")
            )
        )
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "awesome" in elements[0].text

def test_or_and_operator_priority(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "li",
        filter.and_operator(
            filter.or_operator(
                filter.value_contains("JavaScript"),
                filter.value_contains("wordthatdoesntexists")
            ),
            filter.value_contains("Freaks")
        )
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "Freaks" in elements[0].text

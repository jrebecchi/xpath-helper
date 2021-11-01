from xpath_helper import xh, filter

def test_and_operator(html_doc):
    h1_path = xh.get_element_by_tag("h1", filter.and_operator(
        filter.value_contains("motherfudging"),  filter.value_contains("website")))
    elements = html_doc.xpath(str(h1_path))
    assert len(elements) != 0
    assert "The " in elements[0].text


def test_or(html_doc):
    h1_path = xh.get_element_by_tag("h1", filter.value_contains(
        "motherfudging").or_operator(filter.value_equals("motherfudging")))
    elements = html_doc.xpath(str(h1_path))
    assert len(elements) != 0
    assert "The " in elements[0].text


def test_empty(html_doc):
    aFilter = filter.has_attribute("Toto")
    h1_path = xh.get_element_by_tag("h1", aFilter)
    elements = html_doc.xpath(str(h1_path))
    assert len(elements) == 0
    aFilter.empty()
    h1_path = xh.get_element_by_tag("h1", aFilter)
    elements = html_doc.xpath(str(h1_path))
    assert len(elements) != 0


def test_isEmpty(html_doc):
    assert filter.has_attribute("Toto").is_empty() == False
    assert filter.is_empty() == True


def test_has_attribute(html_doc):
    body_path = xh.get_element_by_tag("body", filter.has_attribute("data-new-gr-c-s-check-loaded"))
    elements = html_doc.xpath(str(body_path))
    assert len(elements) != 0


def test_attribute_contains(html_doc):
    body_path = xh.get_element_by_tag("body", filter.attribute_contains("data-new-gr-c-s-check-loaded", "8"))
    elements = html_doc.xpath(str(body_path))
    assert len(elements) != 0


def test_attribute_equals(html_doc):
    body_path = xh.get_element_by_tag("body", filter.attribute_equals("data-new-gr-c-s-check-loaded", "8.884.0"))
    elements = html_doc.xpath(str(body_path))
    assert len(elements) != 0


def test_attribute_not_equals(html_doc):
    body_path = xh.get_element_by_tag("body", filter.attribute_not_equals("data-new-gr-c-s-check-loaded", "toto"))
    elements = html_doc.xpath(str(body_path))
    assert len(elements) != 0


def test_attribute_less_than(html_doc):
    li_path = xh.get_element_by_tag("li", filter.attribute_less_than("data-number", 21)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_attribute_less_thanOrEqualsTo(html_doc):
    li_path = xh.get_element_by_tag("li", filter.attribute_less_than_or_equal_to("data-number", 20)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_attribute_greater_than(html_doc):
    li_path = xh.get_element_by_tag("li", filter.attribute_greater_than("data-number", 24)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_attribute_greater_than_or_equal_to(html_doc):
    li_path = xh.get_element_by_tag("li", filter.attribute_greater_than_or_equal_to("data-number", 25)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_contains(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_contains("Stuff doesn't weigh a ton (in fact it'")
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_equals(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_equals(20)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_not_equals(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_greater_than(14).and_operator(filter.value_not_equals(20))
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert elements[0].text == "15"


def test_value_less_than(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_less_than(16)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_less_thanOrEqualsTo(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_less_than_or_equal_to(15)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_greater_than(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_greater_than(19)
                                               )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_value_greater_thanOrEqualsTo(html_doc):
    li_path = xh.get_element_by_tag(
        "li", filter.value_greater_than_or_equal_to(20))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0


def test_get(html_doc):
    p_path = xh.get_element_by_tag(
        "body"
    ).get_element_by_tag("p", filter.get(2))
    elements = html_doc.xpath(str(p_path))
    assert len(elements) != 0
    assert "You probably build websites using vim" in elements[0].text


def test_get_first(html_doc):
    p_path = xh.get_element_by_tag(
        "body").get_element_by_tag("p", filter.get_first())
    elements = html_doc.xpath(str(p_path))
    assert len(elements) != 0
    assert "For real" in elements[0].text


def test_get_last(html_doc):
    p_path = xh.get_element(filter.attribute_equals(
        "class", "tleft")).get_element_by_tag("p", filter.get_last())
    elements = html_doc.xpath(str(p_path))
    assert len(elements) != 0
    assert "He's happy" in elements[0].text


def test_not(html_doc):
    p_path = xh.get_element_by_tag("body").get_element_by_tag(
        "p", filter.not_operator(filter.attribute_equals("class", "st")))
    elements = html_doc.xpath(str(p_path))
    assert len(elements) != 0
    assert "For real" not in elements[0].text

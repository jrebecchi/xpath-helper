from xpath_helper import __version__
from xpath_helper import xh, filter

def test_version():
    assert __version__ == '0.1.0'


def test_get_parent(html_doc):
    li_path = xh.get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_parent()
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_get_element_by_Xpath(html_doc):
    li_path = xh.get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_element_by_xpath("/..")
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_empty(html_doc):
    li_path = xh.get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_parent()
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text
    li_path.empty()
    assert str(li_path) == ""


def test_get_element_by_tag(html_doc):
    title = xh.get_element_by_tag("h1")
    elements = html_doc.xpath(str(title))
    assert len(elements) != 0
    assert "The " == elements[0].text


def test_get_element(html_doc):
    paragraph = xh.get_element(filter.attribute_equals("class", "st"))
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "For real." == elements[0].text


def test_get_element_by_svg_tag(html_doc):
    svgLayer = xh.get_element_by_svg_tag(
        "g", filter.attribute_equals("id", "Layer1"))
    elements = html_doc.xpath(str(svgLayer))
    assert len(elements) != 0


def test_get_descendant_or_self_by_tag(html_doc):
    title = xh.get_element_by_tag(
        "h1").get_descendant_or_self_by_tag("h1", filter.get_first())
    elements = html_doc.xpath(str(title))
    assert len(elements) != 0
    assert "The " == elements[0].text


def test_get_descendant_or_self(html_doc):
    paragraph = xh.get_element_by_tag(
        "p").get_descendant_or_self(filter.attribute_equals("class", "mfw"))
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "motherfudgingwebsite" == elements[0].text


def test_get_descendant_or_self_by_svg_tag(html_doc):
    svgLayer = xh.get_element_by_svg_tag("g", filter.attribute_equals("id", "Layer1")).get_descendant_or_self_by_svg_tag(
        "path",
        filter.attribute_equals("fill", "#131313")
    )
    elements = html_doc.xpath(str(svgLayer))
    assert len(elements) != 0


def test_get_child_by_tag(html_doc):
    licenseTerm = xh.get_element_by_tag("p").get_child_by_tag(
        "a", filter.attribute_equals("href", "LICENSE.txt"))
    elements = html_doc.xpath(str(licenseTerm))
    assert len(elements) != 0
    assert elements[0].text == "license terms"


def test_get_child(html_doc):
    paragraph = xh.get_element(filter.attribute_equals(
        "class", "tleft")).get_child(filter.get_first())
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "We're not looking at a novel by Stephenie Meyer" in elements[0].text


def test_get_child_by_svg_tag(html_doc):
    g_path = xh.get_element_by_svg_tag("g", filter.attribute_equals(
        "id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape"))
    elements = html_doc.xpath(str(g_path))
    assert len(elements) != 0

    g_path2 = xh.get_element_by_svg_tag("g", filter.attribute_equals(
        "id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape5"))
    elements = html_doc.xpath(str(g_path2))
    assert len(elements) == 0


def test_get_ancestor_by_tag(html_doc):
    ul_path = xh.get_element_by_tag(
        "a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_by_tag("ul")
    elements = html_doc.xpath(str(ul_path))
    assert len(elements) != 0

    firstLi_path = ul_path.get_element_by_tag("li", filter.get_first())
    elements = html_doc.xpath(str(firstLi_path))
    assert len(elements) != 0
    assert "It's over a, " in elements[0].text


def test_get_ancestor(html_doc):
    li_path = xh.get_element_by_tag("a", filter.attribute_contains(
        "href", "wiki/HTTPS")).get_ancestor(filter.value_contains("It's over a,"))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_get_ancestor_by_svg_tag(html_doc):
    g_path = xh.get_element(filter.attribute_equals("id", "Shape8")
                                       ).get_ancestor_by_svg_tag("g", filter.attribute_equals("stroke", "none"))
    elements = html_doc.xpath(str(g_path))
    assert len(elements) != 0


def test_get_ancestor_or_self_by_tag(html_doc):
    ul_path = xh.get_element_by_tag("a", filter.attribute_contains("href",
                                                                              "wiki/HTTPS")).get_ancestor_or_self_by_tag("ul").get_ancestor_or_self_by_tag("ul")
    elements = html_doc.xpath(str(ul_path))
    assert len(elements) != 0

    firstLi_path = ul_path.get_element_by_tag("li", filter.get_first())
    elements = html_doc.xpath(str(firstLi_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text

def test_get_ancestor_or_self(html_doc):
    li_path = xh.get_element_by_tag(
        "a",
        filter.attribute_contains("href", "wiki/HTTPS")
    ).get_ancestor_or_self(
        filter.value_contains("It's over a,")
    ).get_ancestor_or_self(filter.value_contains("It's over a,"))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_get_ancestor_or_self_by_svg_tag(html_doc):
    g_path = xh.get_element(filter.attribute_equals("id", "Shape8")).get_ancestor_or_self_by_svg_tag(
        "g",
        filter.attribute_equals("stroke", "none")
    ).get_ancestor_or_self_by_svg_tag(
        "g",
        filter.attribute_equals("stroke", "none")
    )
    elements = html_doc.xpath(str(g_path))
    assert len(elements) != 0


def test_get_following_by_tag(html_doc):
    li_path = xh.get_element_by_tag("i", filter.value_equals("almost")).get_following_by_tag(
        "li",
        filter.value_contains("Doesn't load mbumive images or scripts.")
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "Doesn't load mbumive images or scripts." in elements[0].text

    a_path = xh.get_element_by_tag("i", filter.value_equals("even more")
                                              ).get_following_by_tag("a", filter.value_equals("IPoAC"))
    elements = html_doc.xpath(str(a_path))
    assert len(elements) != 0


def test_get_following(html_doc):
    li_path = xh.get_element_by_tag(
        "a",
        filter.attribute_contains("href", "sencrypt")
    ).get_following(filter.attribute_greater_than("data-number", 21))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert elements[0].text == "20"


def test_get_following_by_svg_tag(html_doc):
    svg_path = xh.get_element(
        filter.attribute_less_than("width", 640).and_operator(
            filter.attribute_greater_than_or_equal_to("width", 620))
    ).get_following_by_svg_tag("svg", filter.attribute_equals("width", "298px"))
    elements = html_doc.xpath(str(svg_path))
    assert len(elements) != 0


def test_get_following_sibling_by_tag(html_doc):
    li_path = xh.get_element_by_tag("i", filter.value_equals("almost")).get_following_sibling_by_tag(
        "li",
        filter.value_contains("Doesn't load mbumive images or scripts.")
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) == 0

    a_path = xh.get_element_by_tag("i", filter.value_equals("even more")
                                              ).get_following_sibling_by_tag("a", filter.value_equals("ARPANET"))
    elements = html_doc.xpath(str(a_path))
    assert len(elements) != 0


def test_get_following_sibling(html_doc):
    li_path = xh.get_element_by_tag("li", filter.attribute_less_than(
        "data-number", 21)).get_following_sibling(filter.value_greater_than_or_equal_to(20))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert elements[0].text == "20"


def test_get_following_sibling_by_svg_tag(html_doc):
    path_path = xh.get_element(
        filter
        .attribute_less_than("width", 640)
        .and_operator(filter.attribute_greater_than_or_equal_to("width", 620))
    ).get_following_sibling_by_svg_tag(
        "path",
        filter.attribute_contains("d", "m423")
    )
    elements = html_doc.xpath(str(path_path))
    assert len(elements) != 0


def test_get_preceding_by_tag(html_doc):
    i_path = xh.get_element_by_tag(
        "li",
        filter.value_contains("Doesn't load mbumive images or scripts.")
    ).get_preceding_by_tag("i", filter.value_equals("almost"))
    elements = html_doc.xpath(str(i_path))
    assert len(elements) != 0

    i_path2 = xh.get_element_by_tag("a", filter.value_equals("ARPANET")
                                               ).get_preceding_by_tag("i", filter.value_equals("even more"))
    elements = html_doc.xpath(str(i_path2))
    assert len(elements) != 0


def test_get_preceding(html_doc):
    a_path = xh.get_element(
        filter
        .attribute_greater_than("data-number", 21)
    ).get_preceding(filter.attribute_contains("href", "sencrypt"))
    elements = html_doc.xpath(str(a_path))
    assert len(elements) != 0


def test_get_preceding_by_svg_tag(html_doc):
    rect_path = xh.get_element_by_svg_tag("svg", filter.attribute_equals("width", "298px")).get_preceding_by_svg_tag(
        "rect",
        filter
        .attribute_less_than("width", 640)
        .and_operator(filter.attribute_greater_than_or_equal_to("width", 620))
    )
    elements = html_doc.xpath(str(rect_path))
    assert len(elements) != 0


def test_get_preceding_sibling_by_tag(html_doc):
    i_path = xh.get_element_by_tag(
        "li",
        filter.value_contains("Doesn't load mbumive images or scripts.")
    ).get_preceding_sibling_by_tag("i", filter.value_equals("almost"))
    elements = html_doc.xpath(str(i_path))
    assert len(elements) == 0

    a_path = xh.get_element_by_tag("i", filter.value_equals("even more")
                                              ).get_following_sibling_by_tag("a", filter.value_equals("ARPANET"))
    elements = html_doc.xpath(str(a_path))
    assert len(elements) != 0


def test_get_preceding_sibling(html_doc):
    li_path = xh.get_element_by_tag("li", filter.value_greater_than_or_equal_to(20)).get_preceding_sibling(
        filter.attribute_less_than_or_equal_to("data-number", 21)
    )
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert elements[0].text == "15"

def test_get_preceding_sibling_by_svg_tag(html_doc):
    rect_path = xh.get_element_by_svg_tag("path", filter.attribute_contains("d", "m423")).get_preceding_sibling_by_svg_tag(
    "rect",
    filter
      .attribute_less_than("width", 640)
      .and_operator(filter.attribute_greater_than_or_equal_to("width", 620))
     )
    elements = html_doc.xpath(str(rect_path))
    assert len(elements) != 0
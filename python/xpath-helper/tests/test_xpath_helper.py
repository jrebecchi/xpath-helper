from xpath_helper import __version__
from xpath_helper import XPathHelper
from xpath_helper import filter


def test_version():
    assert __version__ == '0.1.0'


def test_get_parent(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_parent()
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_get_element_by_Xpath(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_element_by_xpath("/..")
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_empty(html_doc):
    li_path = XPathHelper().get_element_by_tag(
        "a", filter.value_contains("secure connection")).get_parent()
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text
    li_path.empty()
    assert str(li_path) == ""


def test_get_element_by_tag(html_doc):
    title = XPathHelper().get_element_by_tag("h1")
    elements = html_doc.xpath(str(title))
    assert len(elements) != 0
    assert "The " == elements[0].text


def test_get_element(html_doc):
    paragraph = XPathHelper().get_element(filter.attribute_equals("class", "st"))
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "For real." == elements[0].text


def test_get_element_by_svg_tag(html_doc):
    svgLayer = XPathHelper().get_element_by_svg_tag(
        "g", filter.attribute_equals("id", "Layer1"))
    elements = html_doc.xpath(str(svgLayer))
    assert len(elements) != 0


def test_get_descendant_or_self_by_tag(html_doc):
    title = XPathHelper().get_element_by_tag(
        "h1").get_descendant_or_self_by_tag("h1", filter.get_first())
    elements = html_doc.xpath(str(title))
    assert len(elements) != 0
    assert "The " == elements[0].text


def test_get_descendant_or_self(html_doc):
    paragraph = XPathHelper().get_element_by_tag(
        "p").get_descendant_or_self(filter.attribute_equals("class", "mfw"))
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "motherfudgingwebsite" == elements[0].text


def test_get_descendant_or_self_by_svg_tag(html_doc):
    svgLayer = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals("id", "Layer1")).get_descendant_or_self_by_svg_tag(
        "path",
        filter.attribute_equals("fill", "#131313")
    )
    elements = html_doc.xpath(str(svgLayer))
    assert len(elements) != 0


def test_get_child_by_tag(html_doc):
    licenseTerm = XPathHelper().get_element_by_tag("p").get_child_by_tag(
        "a", filter.attribute_equals("href", "LICENSE.txt"))
    elements = html_doc.xpath(str(licenseTerm))
    assert len(elements) != 0
    assert elements[0].text == "license terms"


def test_get_child(html_doc):
    paragraph = XPathHelper().get_element(filter.attribute_equals(
        "class", "tleft")).get_child(filter.get_first())
    elements = html_doc.xpath(str(paragraph))
    assert len(elements) != 0
    assert "We're not looking at a novel by Stephenie Meyer" in elements[0].text


def test_get_child_by_svg_tag(html_doc):
    gPath = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals(
        "id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape"))
    elements = html_doc.xpath(str(gPath))
    assert len(elements) != 0

    gPath2 = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals(
        "id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape5"))
    elements = html_doc.xpath(str(gPath2))
    assert len(elements) == 0


def test_get_ancestor_by_tag(html_doc):
    ulPath = XPathHelper().get_element_by_tag(
        "a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_by_tag("ul")
    elements = html_doc.xpath(str(ulPath))
    assert len(elements) != 0

    firstLiPath = ulPath.get_element_by_tag("li", filter.get_first())
    elements = html_doc.xpath(str(firstLiPath))
    assert len(elements) != 0
    assert "It's over a, " in elements[0].text


def test_get_ancestor(html_doc):
    li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains(
        "href", "wiki/HTTPS")).get_ancestor(filter.value_contains("It's over a,"))
    elements = html_doc.xpath(str(li_path))
    assert len(elements) != 0
    assert "It's over a," in elements[0].text


def test_get_ancestor_by_svg_tag(html_doc):
    gPath = XPathHelper().get_element(filter.attribute_equals("id", "Shape8")
                                      ).get_ancestor_by_svg_tag("g", filter.attribute_equals("stroke", "none"))
    elements = html_doc.xpath(str(gPath))
    assert len(elements) != 0


# def test_get_ancestor_or_self_by_tag(html_doc):
#     ulPath = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_or_self_by_tag("ul").get_ancestor_or_self_by_tag("ul")
#     elements = html_doc.xpath(str(ulPath))
#     assert len(elements) == 0

#     firstLiPath = ulPath.get_element_by_tag("li", filter.get_first())
#     elements = html_doc.xpath(str(firstLiPath))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor_or_self(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_or_self(filter.value_contains("It's over a,")).get_ancestor_or_self(filter.value_contains("It's over a,"))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor_or_self_by_svg_tag(html_doc):
#     gPath = XPathHelper().get_element(filter.attribute_equals("id", "Shape8")).get_ancestor_or_self_by_svg_tag(
#     "g",
#     filter.attribute_equals("stroke", "none")
#      ).get_ancestor_or_self_by_svg_tag(
#     "g",
#     filter.attribute_equals("stroke", "none")
#      )
#     g = html_doc.xpath(str(gPath))
#     assert g == None


# def test_get_following_by_tag(html_doc):
#     li_path = XPathHelper().get_element_by_tag("i", filter.valueEquals("almost")).get_following_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert
#      li?.textContent?.includes("Doesn't load mbumive images or scripts.")
#     ).toBeTruthy()

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_by_tag("a", filter.valueEquals("IPoAC"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_following(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "sencrypt")).get_following(filter.attributeGreaterThan("data-number", 21))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "20")

# def test_get_following_by_svg_tag(html_doc):
#     svgPath = XPathHelper().get_element(
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      ).get_following_by_svg_tag("svg", filter.attribute_equals("width", "298px"))
#     svg = html_doc.xpath(str(svgPath))
#     assert svg == None


# def test_get_following_sibling_by_tag(html_doc):
#     li_path = XPathHelper().get_element_by_tag("i", filter.valueEquals("almost")).get_following_sibling_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert li).None

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_sibling_by_tag("a", filter.valueEquals("ARPANET"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_following_sibling(html_doc):
#     li_path = XPathHelper().get_element_by_tag("li", filter.attributeLessThan("data-number", 21)).get_following_sibling(filter.valueGreaterThan_orEqualTo(20))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "20")

# def test_get_following_sibling_by_svg_tag(html_doc):
#     pathPath = XPathHelper().get_element(
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      ).get_following_sibling_by_svg_tag(
#     "path",
#     filter.attribute_contains("d", "m423")
#      )
#     path = html_doc.xpath(str(pathPath))
#     assert len(elements) != 0


# def test_get_preceding_by_tag(html_doc):
#     iPath = XPathHelper().get_element_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      ).get_preceding_by_tag("i", filter.valueEquals("almost"))
#     i = html_doc.xpath(str(iPath))
#     assert i == None

#     iPath2 = XPathHelper().get_element_by_tag("a", filter.valueEquals("ARPANET")).get_preceding_by_tag("i", filter.valueEquals("even more"))
#     i2 = html_doc.xpath(str(iPath2))
#     assert i2 == None

# def test_get_preceding_(html_doc):
#     aPath = XPathHelper().get_element(filter.attributeGreaterThan("data-number", 21)).get_preceding_(filter.attribute_contains("href", "sencrypt"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_preceding_by_svg_tag(html_doc):
#     rectPath = XPathHelper().get_element_by_svg_tag("svg", filter.attribute_equals("width", "298px")).get_preceding_by_svg_tag(
#     "rect",
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      )
#     rect = html_doc.xpath(str(rectPath))
#     assert rect == None


# def test_get_preceding_sibling_by_tag(html_doc):
#     iPath = XPathHelper().get_element_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      ).get_preceding_sibling_by_tag("i", filter.valueEquals("almost"))
#     i = html_doc.xpath(str(iPath))
#     assert i).None

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_sibling_by_tag("a", filter.valueEquals("ARPANET"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_preceding_sibling(html_doc):
#     li_path = XPathHelper().get_element_by_tag("li", filter.valueGreaterThan_orEqualTo(20)).get_preceding_sibling(
#     filter.attributeLessThan_orEqualTo("data-number", 21)
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "15")

# def test_get_preceding_sibling_by_svg_tag(html_doc):
#     rectPath = XPathHelper().get_element_by_svg_tag("path", filter.attribute_contains("d", "m423")).get_preceding_sibling_by_svg_tag(
#     "rect",
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      )
#     rect = html_doc.xpath(str(rectPath))
#     assert rect == None

# def test_get_element_by_Xpath(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.value_contains("secure connection")).get_element_by_Xpath("/..")
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert "It's over a," in elements[0].text


# def test_empty(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.value_contains("secure connection")).get_parent()
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert "It's over a," in elements[0].text

#     li_path.empty()
#     assert li_path)).toBe("")


# def test_get_element_by_tag(html_doc):
#     title = XPathHelper().get_element_by_tag("h1")
#     h1 = html_doc.xpath(str(title))
#     assert h1 == None
#     assert "The best motherfudging website")

# def test_get_element(html_doc):
#     paragraph = XPathHelper().get_element(
#      filter.attribute_equals("class", "st")
#     )
#     p = html_doc.xpath(str(paragraph))
#     assert len(elements) != 0
#     assert pelements[0].text == "For real.")

# def test_get_element_by_svg_tag(html_doc):
#     svgLayer = XPathHelper().get_element_by_svg_tag(
#      "g",
#      filter.attribute_equals("id", "Layer1")
#     )
#     g = html_doc.xpath(str(svgLayer))
#     assert g == None


# def test_get_descendant_or_self_by_tag(html_doc):
#     title = XPathHelper().get_element_by_tag("h1").get_descendant_or_self_by_tag("h1", filter.get_first())
#     h1 = html_doc.xpath(str(title))
#     assert h1 == None
#     assert h1 && h1.textContent).toBe("The best motherfudging website")

# def test_get_descendant_or_self(html_doc):
#     paragraph = XPathHelper().get_element_by_tag("p").get_descendant_or_self(filter.attribute_equals("class", "mfw"))
#     span = html_doc.xpath(str(paragraph))
#     assert len(elements) != 0
#     assert spanelements[0].text == "motherfudgingwebsite")

# def test_get_descendant_or_self_by_svg_tag(html_doc):
#     svgLayer = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals("id", "Layer1")).get_descendant_or_self_by_svg_tag(
#     "path",
#     filter.attribute_equals("fill", "#131313")
#      )
#     path = html_doc.xpath(str(svgLayer))
#     assert len(elements) != 0


# def test_get_child_by_tag(html_doc):
#     licenseTerm = XPathHelper().get_element_by_tag("p").get_child_by_tag("a", filter.attribute_equals("href", "LICENSE.txt"))
#     a = html_doc.xpath(str(licenseTerm))
#     assert len(elements) != 0
#     assert aelements[0].text == "license terms")

# def test_get_child(html_doc):
#     paragraph = XPathHelper().get_element(filter.attribute_equals("class", "tleft")).get_child(filter.get_first())
#     p = html_doc.xpath(str(paragraph))
#     assert len(elements) != 0
#     assert
#      p?.textContent?.includes(
#     "We're not looking at a novel by_ Stephenie Meyer"
#      )
#     ).toBeTruthy()

# def test_get_child_by_svg_tag(html_doc):
#     gPath = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals("id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape"))
#     path = html_doc.xpath(str(gPath))
#     assert len(elements) != 0

#     gPath2 = XPathHelper().get_element_by_svg_tag("g", filter.attribute_equals("id", "Layer1")).get_child_by_svg_tag("path", filter.attribute_equals("id", "Shape5"))
#     path = html_doc.xpath(str(gPath2))
#     assert len(elements) == 0


# def test_get_ancestor_by_tag(html_doc):
#     ulPath = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_by_tag("ul")
#     elements = html_doc.xpath(str(ulPath))
#     assert len(elements) == 0

#     firstLiPath = ulPath.get_element_by_tag("li", filter.get_first())
#     elements = html_doc.xpath(str(firstLiPath))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor(filter.value_contains("It's over a,"))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor_by_svg_tag(html_doc):
#     gPath = XPathHelper().get_element(filter.attribute_equals("id", "Shape8")).get_ancestor_by_svg_tag("g", filter.attribute_equals("stroke", "none"))
#     g = html_doc.xpath(str(gPath))
#     assert g == None


# def test_get_ancestor_or_self_by_tag(html_doc):
#     ulPath = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_or_self_by_tag("ul").get_ancestor_or_self_by_tag("ul")
#     elements = html_doc.xpath(str(ulPath))
#     assert len(elements) == 0

#     firstLiPath = ulPath.get_element_by_tag("li", filter.get_first())
#     elements = html_doc.xpath(str(firstLiPath))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor_or_self(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "wiki/HTTPS")).get_ancestor_or_self(filter.value_contains("It's over a,")).get_ancestor_or_self(filter.value_contains("It's over a,"))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert "secure connection") == None

# def test_get_ancestor_or_self_by_svg_tag(html_doc):
#     gPath = XPathHelper().get_element(filter.attribute_equals("id", "Shape8")).get_ancestor_or_self_by_svg_tag(
#     "g",
#     filter.attribute_equals("stroke", "none")
#      ).get_ancestor_or_self_by_svg_tag(
#     "g",
#     filter.attribute_equals("stroke", "none")
#      )
#     g = html_doc.xpath(str(gPath))
#     assert g == None


# def test_get_following_by_tag(html_doc):
#     li_path = XPathHelper().get_element_by_tag("i", filter.valueEquals("almost")).get_following_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert
#      li?.textContent?.includes("Doesn't load mbumive images or scripts.")
#     ).toBeTruthy()

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_by_tag("a", filter.valueEquals("IPoAC"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_following(html_doc):
#     li_path = XPathHelper().get_element_by_tag("a", filter.attribute_contains("href", "sencrypt")).get_following(filter.attributeGreaterThan("data-number", 21))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "20")

# def test_get_following_by_svg_tag(html_doc):
#     svgPath = XPathHelper().get_element(
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      ).get_following_by_svg_tag("svg", filter.attribute_equals("width", "298px"))
#     svg = html_doc.xpath(str(svgPath))
#     assert svg == None


# def test_get_following_sibling_by_tag(html_doc):
#     li_path = XPathHelper().get_element_by_tag("i", filter.valueEquals("almost")).get_following_sibling_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert li).None

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_sibling_by_tag("a", filter.valueEquals("ARPANET"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_following_sibling(html_doc):
#     li_path = XPathHelper().get_element_by_tag("li", filter.attributeLessThan("data-number", 21)).get_following_sibling(filter.valueGreaterThan_orEqualTo(20))
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "20")

# def test_get_following_sibling_by_svg_tag(html_doc):
#     pathPath = XPathHelper().get_element(
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      ).get_following_sibling_by_svg_tag(
#     "path",
#     filter.attribute_contains("d", "m423")
#      )
#     path = html_doc.xpath(str(pathPath))
#     assert len(elements) != 0


# def test_get_preceding_by_tag(html_doc):
#     iPath = XPathHelper().get_element_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      ).get_preceding_by_tag("i", filter.valueEquals("almost"))
#     i = html_doc.xpath(str(iPath))
#     assert i == None

#     iPath2 = XPathHelper().get_element_by_tag("a", filter.valueEquals("ARPANET")).get_preceding_by_tag("i", filter.valueEquals("even more"))
#     i2 = html_doc.xpath(str(iPath2))
#     assert i2 == None

# def test_get_preceding_(html_doc):
#     aPath = XPathHelper().get_element(filter.attributeGreaterThan("data-number", 21)).get_preceding_(filter.attribute_contains("href", "sencrypt"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_preceding_by_svg_tag(html_doc):
#     rectPath = XPathHelper().get_element_by_svg_tag("svg", filter.attribute_equals("width", "298px")).get_preceding_by_svg_tag(
#     "rect",
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      )
#     rect = html_doc.xpath(str(rectPath))
#     assert rect == None


# def test_get_preceding_sibling_by_tag(html_doc):
#     iPath = XPathHelper().get_element_by_tag(
#     "li",
#     filter.value_contains("Doesn't load mbumive images or scripts.")
#      ).get_preceding_sibling_by_tag("i", filter.valueEquals("almost"))
#     i = html_doc.xpath(str(iPath))
#     assert i).None

#     aPath = XPathHelper().get_element_by_tag("i", filter.valueEquals("even more")).get_following_sibling_by_tag("a", filter.valueEquals("ARPANET"))
#     a = html_doc.xpath(str(aPath))
#     assert len(elements) != 0

# def test_get_preceding_sibling(html_doc):
#     li_path = XPathHelper().get_element_by_tag("li", filter.valueGreaterThan_orEqualTo(20)).get_preceding_sibling(
#     filter.attributeLessThan_orEqualTo("data-number", 21)
#      )
#     elements = html_doc.xpath(str(li_path))
#     assert len(elements) != 0
#     assert lielements[0].text == "15")

# def test_get_preceding_sibling_by_svg_tag(html_doc):
#     rectPath = XPathHelper().get_element_by_svg_tag("path", filter.attribute_contains("d", "m423")).get_preceding_sibling_by_svg_tag(
#     "rect",
#     filter
#       .attributeLessThan("width", 640)
#       .and(filter.attributeGreaterThan_orEqualTo("width", 620))
#      )
#     rect = html_doc.xpath(str(rectPath))
#     assert rect == None

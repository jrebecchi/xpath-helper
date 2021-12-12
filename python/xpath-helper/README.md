<p align="center">
  <img src="https://raw.githubusercontent.com/jrebecchi/xpath-helper/main/docs/_static/logo-with-text.png" height="100px" alt="xpath-helper"/>
</p>
<p align="center">
  <i>Build complicated XPath queries without the hassle - JavaScript & Python</i><br/><br/>
  <a href="https://jrebecchi.github.io/xpath-helper/python/index.html">
    <img src="https://img.shields.io/badge/docs-master-blue.svg?style=flat">
  </a>
  <a href="https://codecov.io/gh/jrebecchi/xpath-helper">
    <img src="https://codecov.io/gh/jrebecchi/xpath-helper/branch/main/graph/badge.svg?token=0TJOZ64X10"/>
  </a>
  <a href="https://github.com/jrebecchi/xpath-helper/actions/workflows/python-ci.yml">
    <img src="https://github.com/jrebecchi/xpath-helper/actions/workflows/python-ci.yml/badge.svg">
  </a>
</p>

A chainable API to build complex XPath queries along the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html). Available both in Python and JavaScript.

- [**Documentation**](https://jrebecchi.github.io/xpath-helper/python/index.html) — Consult the quick start guide and the online documentation.

## Installation
`xpath-helper` requires python 3.5+ and can be installed using pip:
```bash
pip install xpath-helper
```
## Quick-start
You can chain method call on the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html) and easily add filters.
```python
from xpath_helper import xh, filter

# Finds a paragraph <p> containing a CSS class 'very-nice-p'
p = xh.get_element_by_tag('p', filter.attribute_contains('class', 'very-nice-p'))
str(p) # "//p[contains(@class, 'very-nice-p')]"

# Finds the paragraph that is following the above one
next_p = p.get_following_sibling_by_tag('p')
str(next_p) # "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

# Finds the modal containing a button with text "Register" 
modal = xh.get_element(filter.value_equals('Register')).get_ancestor(filter.attribute_equals('class', 'modal'))
str(modal) # "//*[text() = 'Register']/ancestor::*[@class='modal']"

# An elaborated filter with a boolean expression
li = xh.get_element_by_tag("li", filter.and_operator(
  filter.or_operator(
    filter.value_contains("JavaScript"), filter.value_contains("Python")
  ),
  filter.has_attribute("data-description")
))
str(li) # "//li[((text()[contains(., 'JavaScript')] or text()[contains(., 'Python')]) and @data-description)]"
```

## Chaining

XPath natively lets your build complex queries chaining them along its different axes. Read this [article to understand the different XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html).

This library let you do exactly the same by chaining method calls along the different axes: [`descendant`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_descendant) aliased as [`element`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_element), [`descendant-or-self`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_descendant_or_self), [`child`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_child), [`parent`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_parent), [`ancestor`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_ancestor), [`ancestor-or-self`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_ancestor_or_self), [`preceding`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_preceding), [`preceding-sibling`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_preceding_sibling), [`following`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_following), [`following-sibling`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.XPathHelper.get_following_sibling).

For each axis, xpath-helper provides 3 methods, like for instance `get_element(filter)`, `get_element_by_tag(tag, filter)`, `get_element_by_svg_tag(svgTag, filter)` for the `descendant`  axis aliased as `element`.

***The complete Python API can be found [here](https://jrebecchi.github.io/xpath-helper/python/api.html#module-xpath_helper).***


```python
from xpath_helper import xh, filter

# Finds an element into the page, moves to its parent, 
# finds a brother node of the parent positioned after it.
el = xh.get_element_by_tag(
    'p', filter.attribute_contains('class', 'very-nice-p')
).get_parent().get_following_sibling_by_tag('p')
str(el) # "//p[contains(@class, 'very-nice-p')]/../following-sibling::p"

# Finds an element into the page, moves to its ancestor 
# containing 'very-nice-p' ass CSS class, 
# finds a brother node of the ancestor positioned before it.
el = xh.get_element_by_tag(
    'p', filter.attribute_contains('class', 'very-nice-p')
).get_ancestor_by_tag(
  'div'
).get_preceding_sibling(filter.has_attribute('data-foo-bar'))
str(el) # "//p[contains(@class, 'very-nice-p')]/../following-sibling::p//p[contains(@class, 'very-nice-p')]/ancestor::div/preceding-sibling::*[@data-foo-bar]"
```

It is also possible to keep a relative path in a variable and re-use it after.
```python
from xpath_helper import xh, filter
# Stores the path of a modal window
modal = xh.get_element(filter.attribute_contains('class', 'modal'))
# Finds the Submit button inside the modal window
submit_button = modal.get_element_by_tag('button', filter.value_equals('Submit'))
# Finds the Cancel button inside the modal window
cancel_button = modal.get_element_by_tag('button', filter.value_equals('Cancel'))
```
## Filters
To select elements more precisely you can add filters: [on attributes](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.EmptyFilter.attribute_contains), on [element values](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.EmptyFilter.value_contains), [element position](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.EmptyFilter.get), and combining them with conditional operators: [`and_operator(...)`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.ValidExpressionFilter.and_operator), [`or_operator(...)`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.ValidExpressionFilter.or_operator), and [`not_operator(...)`](https://jrebecchi.github.io/xpath-helper/python/api.html#xpath_helper.filter.EmptyFilter.not_operator).

***The complete filter API can be found [here](https://jrebecchi.github.io/xpath-helper/python/api.html#filter-filter).***

### Attributes
Find below a few examples of filters on attributes.

```python
from xpath_helper import xh, filter
# Looks for an element that has a class attribute equals to 'foo'
el = xh.get_element(filter.attribute_equals('class', 'foo'))
# Looks for an element that has a class attribute containing 'bar'
el = xh.get_element(filter.attribute_contains('class', 'bar'))
# Looks for an element that has the attribute 'alt'
img = xh.get_element_by_tag('img', filter.has_attribute('alt'))
# Looks for all the li element with a data-attribute superior to 3
li = xh.get_element_by_tag('li', filter.attribute_greater_than('data-index', 3))
```
### Values
Find below a few examples of filters on node values.
```python
from xpath_helper import xh, filter

# Looks for a button whose text is 'Submit'
button = xh.get_element_by_tag('button', filter.value_equals('Submit'))
# Looks for an element whose text contains 'foobar'
el = xh.get_element(filter.value_contains('foobar'))
# Looks for all the li element with a value superior to 3
li = xh.get_element_by_tag('li', filter.value_greater_than(3))
```
### Position
Find below a few examples of filters on node position.
```python
from xpath_helper import xh, filter

# Looks for the first li element in ul list
first = xh.get_element_by_tag('ul').get_element_by_tag('li', filter.get_first())
# Looks for the first li element in ul list
last = xh.get_element_by_tag('ul').get_element_by_tag('li', filter.get_last())
# Looks for the third li element in ul list
third = xh.get_element_by_tag('ul').get_element_by_tag('li', filter.get(3))
```
### Conditional expression
Find below a few examples of filters with conditional expression.

```python
from xpath_helper import xh, filter

# Finds an element that has a CSS class 'a-link' and contains an attribute href
el = xh.get_element(
  filter.attribute_contains('class', 'a-link').and_operator(
    filter.has_attribute('href')
  )
)
str(el) # "//*[contains(@class, 'a-link') and (@href)]"

# Finds an element that has a CSS class 'foo' or a CSS class 'bar'
el = xh.get_element(
  filter.attribute_contains('class', 'foo').or_operator(
    filter.attribute_contains('class', 'bar')
  )
)
str(el) # "//*[contains(@class, 'foo') or (contains(@class, 'bar'))]"

# Builds a complex logical expression combining and & or
el = xh.get_element(
  filter.and_operator(
    filter.or_operator(
      filter.value_contains("JavaScript"),
      filter.value_contains("Pyhton")
    ),
      filter.value_contains("package")
  )
)
str(el) # "//*[((text()[contains(., 'JavaScript')] or text()[contains(., 'Pyhton')]) and text()[contains(., 'package')])]"
```
## SVG
Navigating into SVG elements from an HTML file can be tricky with XPath, that is why a subset of functions have been added. They are all ending with `...by_svg_tag` and can be used as below.

```python
from xpath_helper import xh, filter

# Stores the path of a modal window
path = xh.get_element_by_svg_tag('path', filter.attribute_equals('d', 'M 310 130 L 90 130 L 90 183.63'))
str(path) # "//*[local-name() = 'path'][@d='M 310 130 L 90 130 L 90 183.63']"

# Finds the Submit button inside the modal window
g = xh.get_element_by_svg_tag(
  'path', filter.attribute_equals('id', 'id-path')
).get_ancestor_by_svg_tag('g')
str(g) # "//*[local-name() = 'path'][@id='id-path']/ancestor::*[local-name() = 'g']"
```
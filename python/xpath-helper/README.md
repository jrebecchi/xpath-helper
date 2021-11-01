<p align="center">
  <img src="https://github.com/jrebecchi/xpath-helper/raw/master/docs/_static/logo-with-text.png" height="50px" alt="xpath-helper"/>
</p>
<p align="center">
  <i>Build complicated XPath queries without the hassle - JavaScript & Python</i><br/><br/>
  <a href="https://coveralls.io/github/jrebecchi/xpath-helper?branch=master">
    <img src="https://coveralls.io/repos/github/jrebecchi/xpath-helper/badge.svg?branch=master">
  </a>
  <a href="https://github.com/jrebecchi/xpath-helper/actions">
    <img src="https://img.shields.io/github/workflow/status/jrebecchi/xpath-helper/Node CI?label=tests">
  </a>
  <a href="https://heroku.com/deploy?template=https://github.com/jrebecchi/krypton-heroku">
    <img src="https://img.shields.io/badge/heroku-deploy-blueviolet?logo=heroku">
  </a>
</p>

A chainable API to build complex XPath queries along the different [XPath axes](https://krypton-org.github.io/jrebecchi/xpath-helper). Available both in Python and JavaScript.

- [**Documentation**](https://krypton-org.github.io/jrebecchi/xpath-helper) — Consult the quick start guide and the online documentation.

## Installation
```bash
pip install xpath-helper
```
## Quick-start
```python
from xpath_helper import XPathHelper, filter

# Find a paragraph <p> containing a CSS class 'very-nice-p'
p = XPathHelper().get_element_by_tag('p', filter.attribute_contains('class', 'very-nice-p'))
str(p) # "//p[contains(@class, 'very-nice-p')]"

# Find the paragraph that is following the above one
next_p = p.get_following_sibling_by_tag('p')
str(next_p) # "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

# Find the modal containing a button with text "Register" 
modal = XPathHelper().get_element(filter.value_equals('Register')).get_ancestor(filter.attribute_equals('class', 'modal'))
str(modal) # "//*[text() = 'Register']/ancestor::*[@class='modal']"

# An elaborated filter with a boolean expression
li = XPathHelper().get_element_by_tag("li", filter.and_operator(
  filter.or_operator(
    filter.value_contains("JavaScript"), filter.value_contains("Python")
  ),
  filter.has_attribute("data-description")
))
str(li) # "//li[((text()[contains(., 'JavaScript')] or text()[contains(., 'Python')]) and @data-description)]"
```

## Chaining

XPath natively lets your build complex queries chaining them along its different axes. Read this [article to understand the different XPath axes](https://krypton-org.github.io/jrebecchi/xpath-helper).

This library let you do exactly the same by chaining method calls along the different axes: [`descendant`](https://krypton-org.github.io/jrebecchi/xpath-helper) aliased as [`element`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`descendant-or-self`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`child`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`parent`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`ancestor`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`ancestor-or-self`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`preceding`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`preceding-sibling`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`following`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`following-sibling`](https://krypton-org.github.io/jrebecchi/xpath-helper).

For each axis, xpath-helper provides 3 methods, like for instance `get_element(filter)`, `get_element_by_tag(tag, filter)`, `get_child_by_svg_tag(svgTag, filter)` for the `descendant`  axis aliased as `element`. Find the complete API [here](https://krypton-org.github.io/jrebecchi/xpath-helper).

```python
from xpath_helper import XPathHelper, filter

# Find an element into the page, move to its parent, 
# find a brother node of the parent positioned after it.
el = XPathHelper().get_element_by_tag(
    'p', filter.attribute_contains('class', 'very-nice-p')
).get_parent().get_following_sibling_by_tag('p')
str(el) # "//p[contains(@class, 'very-nice-p')]/../following-sibling::p"

# Find an element into the page, move to its ancestor 
# containing 'very-nice-p' ass CSS class, 
# find a brother node of the ancestor positioned before it.
el = p.get_element_by_tag(
    'p', filter.attribute_contains('class', 'very-nice-p')
).get_ancestor_by_tag(
  'div'
).get_preceding_sibling(filter.has_attribute('data-foo-bar'))
str(el) # "//p[contains(@class, 'very-nice-p')]/../following-sibling::p//p[contains(@class, 'very-nice-p')]/ancestor::div/preceding-sibling::*[@data-foo-bar]"
```

It is also possible to keep a relative path in a variable and re-use it after.
```python
from xpath_helper import XPathHelper, filter
# Store the path of a modal window
modal = XPathHelper().get_element(filter.attribute_contains('class', 'modal'))
# Find the Submit button inside the modal window
submit_button = modal.get_element_by_tag('button', filter.value_equals('Submit'))
# Find the Cancel button inside the modal window
cancel_button = modal.get_element_by_tag('button', filter.value_equals('Cancel'))
```
## Filters
To select elements more precisely you can add filters: filtering on attributes, on element values, and combining them with conditional operators: [`and_operator(...)`](https://krypton-org.github.io/jrebecchi/xpath-helper), [`or_operator(...)`](https://krypton-org.github.io/jrebecchi/xpath-helper), and [`not_operator(...)`](https://krypton-org.github.io/jrebecchi/xpath-helper).

***The complete filter API can be found [here](https://krypton-org.github.io/jrebecchi/xpath-helper).***

### Attributes
Find below a few examples of filters on attributes.

```python
from xpath_helper import XPathHelper, filter
# Looks for an element that has a class attribute equals to 'foo'
el = XPathHelper().get_element(filter.attribute_equals('class', 'foo'))
# Looks for an element that has a class attribute containing 'bar'
el = XPathHelper().get_element(filter.attribute_contains('class', 'bar'))
# Looks for an element that has the attribute 'alt'
img = XPathHelper().get_element_by_tag('img', filter.has_attribute('alt'))
# Looks for all the li element with a data-attribute superior to 3
li = XPathHelper().get_element_by_tag('li', filter.attribute_greater_than('data-index', 3))
```
### Values
Find below a few examples of filters on node values.
```python
from xpath_helper import XPathHelper, filter
# Looks for a button whose text is 'Submit'
modal = XPathHelper().get_element_by_tag('button', filter.value_equals('Submit'))
# Looks for an element whose text contains 'foobar'
li = XPathHelper().get_element(filter.value_contains('foobar'))
# Looks for all the li element with a value superior to 3
li = XPathHelper().get_element_by_tag('li', filter.value_greater_than(3))
```
### Position
Find below a few examples of filters on node position.
```python
# Looks for the first li element in ul list
first = XPathHelper().get_element_by_tag('ul').get_element_by_tag('li', filter.get_first())
# Looks for the first li element in ul list
last = XPathHelper().get_element_by_tag('ul').get_element_by_tag('li', filter.get_last())
# Looks for the third li element in ul list
last = XPathHelper().get_element_by_tag('ul').get_element_by_tag('li', filter.get(3))
```
### Conditional expression
Find below a few examples of filters with conditional expression.

```python
from xpath_helper import XPathHelper, filter
# Store the path of a modal window
modal = XPathHelper().get_element(filter.attribute_contains('class', 'modal'))
# Find the Submit button inside the modal window
submit_button = modal.get_element_by_tag('button', filter.value_equals('Submit'))
# Find the Cancel button inside the modal window
cancel_button = modal.get_element_by_tag('button', filter.value_equals('Cancel'))
```
## SVG
Navigating into SVG elements from an HTML file can be tricky with XPath, that is why a subset of functions have been added for that purpose. They are all ending with `...svg_tag`.

```python
from xpath_helper import XPathHelper, filter
# Store the path of a modal window
modal = XPathHelper().get_element(filter.attribute_contains('class', 'modal'))
# Find the Submit button inside the modal window
submit_button = modal.get_element_by_tag('button', filter.value_equals('Submit'))
# Find the Cancel button inside the modal window
cancel_button = modal.get_element_by_tag('button', filter.value_equals('Cancel'))
```
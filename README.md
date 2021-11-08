<p align="center">
  <img src="https://raw.githubusercontent.com/jrebecchi/xpath-helper/main/docs/_static/logo-with-text.png" height="100px" alt="xpath-helper"/>
</p>
<p align="center">
  <i>Build complicated XPath queries without the hassle - JavaScript & Python</i><br/><br/>
  <a href="https://jrebecchi.github.io/xpath-helper/">
    <img src="https://img.shields.io/badge/docs-master-blue.svg?style=flat">
  </a>
  <a href="https://codecov.io/gh/jrebecchi/xpath-helper">
    <img src="https://codecov.io/gh/jrebecchi/xpath-helper/branch/main/graph/badge.svg?token=0TJOZ64X10"/>
  </a>
  <a href="https://github.com/jrebecchi/xpath-helper/actions/workflows/python-ci.yml">
    <img src="https://github.com/jrebecchi/xpath-helper/actions/workflows/python-ci.yml/badge.svg">
  </a>
  <a href="https://github.com/jrebecchi/xpath-helper/actions/workflows/javascript-ci.yml">
    <img src="https://github.com/jrebecchi/xpath-helper/actions/workflows/javascript-ci.yml/badge.svg">
  </a>
</p>

A chainable API to build complex XPath queries along the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html). Available both in Python and JavaScript.

- [**Documentation**](https://jrebecchi.github.io/xpath-helper/) — Consult the quick start guide and the online documentation.

### Installation
#### JavaScript
`xpath-helper` can be installed using npm:
```bash
npm install xpath-helper
```

#### Python
`xpath-helper` requires python 3.6+ and can be installed using pip:
```bash
pip install xpath-helper
```

### Quick-start
You can chain method call on the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html) and easily add filters.
#### JavaScript
```javascript
import { xh, filter } from 'xpath-helper';

// Find a paragraph <p> containing a CSS class 'very-nice-p'
const p = xh.getElementByTag('p', filter.attributeContains('class', 'very-nice-p'));
p.toString() // "//p[contains(@class, 'very-nice-p')]"

// Find the paragraph that is following the above one
const nextP = p.getFollowingSiblingByTag('p');
nextP.toString() // "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

// Find the modal containing a button with text "Register" 
const modal = xh.getElement(filter.valueEquals('Register'))
  .getAncestor(filter.attributeEquals('class', 'modal'));
modal.toString() // "//*[text() = 'Register']/ancestor::*[@class='modal']"

// An elaborated filter with a boolean expression
const li = xh.getElementByTag("li",
  filter.and(
    filter.or(
      filter.valueContains("JavaScript"), filter.valueContains("Python")
    ),
    filter.hasAttribute("data-description")
));
li.toString() // "//li[((text()[contains(., 'JavaScript')] or text()[contains(., 'Python')]) and @data-description)]"
```
***See the [JavaScript documentation](https://jrebecchi.github.io/xpath-helper/javascript/) for more details.***

#### Python
```python
from xpath_helper import xh, filter

# Find a paragraph <p> containing a CSS class 'very-nice-p'
p = xh.get_element_by_tag('p', filter.attribute_contains('class', 'very-nice-p'))
str(p) # "//p[contains(@class, 'very-nice-p')]"

# Find the paragraph that is following the above one
next_p = p.get_following_sibling_by_tag('p')
str(next_p) # "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

# Find the modal containing a button with text "Register" 
modal = xh.get_element(
  filter.value_equals('Register')
).get_ancestor(
  filter.attribute_equals('class', 'modal')
)
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
***See the [Python documentation](https://jrebecchi.github.io/xpath-helper/python/) for more details.***

## License

`xpath-helper` is released under the [MIT license](https://github.com/jrebecchi/xpath-helper/blob/docs/LICENSE).
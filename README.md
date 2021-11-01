<p align="center">
  <img src="https://raw.githubusercontent.com/jrebecchi/xpath-helper/main/docs/_static/logo-with-text.png" height="100px" alt="xpath-helper"/>
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

### Installation
`xpath-helper` can be installed using npm:
#### JavaScript
```bash
npm install xpath-helper
```

#### Python
`xpath-helper` requires python 3.5+ and can be installed using pip:
```bash
pip install xpath-helper
```

### Quick-start
You can [chain method call](https://krypton-org.github.io/jrebecchi/xpath-helper) on the [different XPath axes](https://krypton-org.github.io/jrebecchi/xpath-helper) and easily add [filters](https://krypton-org.github.io/jrebecchi/xpath-helper).
#### JavaScript
```javascript
import { XPathHelper, filter } from 'xpath-helper';

// Find a paragraph <p> containing a CSS class 'very-nice-p'
const p = new XPathHelper().getElementByTag('p', filter.attributeContains('class', 'very-nice-p'));
p.toString() // "//p[contains(@class, 'very-nice-p')]"

// Find the paragraph that is following the above one
const nextP = p.getFollowingSiblingByTag('p');
nextP.toString() // "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

// Find the modal containing a button with text "Register" 
const modal = new XPathHelper()
  .getElement(filter.valueEquals('Register'))
  .getAncestor(filter.attributeEquals('class', 'modal'));
modal.toString() // "//*[text() = 'Register']/ancestor::*[@class='modal']"

// An elaborated filter with a boolean expression
const li = new XPathHelper().getElementByTag("li",
  filter.and(
    filter.or(
      filter.valueContains("JavaScript"), filter.valueContains("Python")
    ),
    filter.hasAttribute("data-description")
));
li.toString() // "//li[((text()[contains(., 'JavaScript')] or text()[contains(., 'Python')]) and @data-description)]"
```
***See the [JavaScript documentation](https://krypton-org.github.io/jrebecchi/xpath-helper) for more details.***

#### Python
```python
from xpath_helper import XPathHelper, filter

# Find a paragraph <p> containing a CSS class 'very-nice-p'
p = XPathHelper().get_element_by_tag('p', filter.attribute_contains('class', 'very-nice-p'))
str(p) # "//p[contains(@class, 'very-nice-p')]"

# Find the paragraph that is following the above one
next_p = p.get_following_sibling_by_tag('p')
str(next_p) # "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

# Find the modal containing a button with text "Register" 
modal = XPathHelper().get_element(
  filter.value_equals('Register')
).get_ancestor(
  filter.attribute_equals('class', 'modal')
)
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
***See the [Python documentation](https://krypton-org.github.io/jrebecchi/xpath-helper) for more details.***

## License

`xpath-helper` is released under the [MIT license](https://github.com/jrebecchi/xpath-helper/blob/docs/LICENSE).
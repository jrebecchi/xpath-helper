## Installation
```bash
npm install xpath-helper
```
## Quick-start
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
## Chaining

## Filters
### Attributes
### Values

### Conditional expression

## SVG

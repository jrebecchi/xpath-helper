<p align="center">
  <img src="https://raw.githubusercontent.com/jrebecchi/xpath-helper/main/docs/_static/logo-with-text.png" height="100px" alt="xpath-helper"/>
</p>
<p align="center">
  <i>Build complicated XPath queries without the hassle - JavaScript & Python</i><br/><br/>
  <a href="https://jrebecchi.github.io/xpath-helper/javascript/index.html">
    <img src="https://img.shields.io/badge/docs-master-blue.svg?style=flat">
  </a>
  <a href="https://codecov.io/gh/jrebecchi/xpath-helper">
    <img src="https://codecov.io/gh/jrebecchi/xpath-helper/branch/main/graph/badge.svg?token=0TJOZ64X10"/>
  </a>
    <a href="https://github.com/jrebecchi/xpath-helper/actions/workflows/javascript-ci.yml">
      <img src="https://github.com/jrebecchi/xpath-helper/actions/workflows/javascript-ci.yml/badge.svg">
  </a>
</p>

A chainable API to build complex XPath queries along the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html). Available both in Python and JavaScript.

- [**Documentation**](https://jrebecchi.github.io/xpath-helper/javascript/index.html) — Consult the quick start guide and the online documentation.

## Installation
`xpath-helper` can be installed using npm:
```bash
npm install xpath-helper
```
It can be also be imported as a JavaScript module. 
```javascript
<script type="module" >
  import { xh, filter} from 'https://unpkg.com/xpath-helper@latest/dist/mjs/xpath-helper.js';
  console.log(
    xh.getElementByTag('body').getElementByTag('h1', filter.valueEquals('hello')).toString()
  );
</script> 
``` 
## Quick-start
You can chain method call on the different [XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html) and easily add filters.
```javascript
import { xh, filter } from 'xpath-helper';

// Finds a paragraph <p> containing a CSS class 'very-nice-p'
const p = xh.getElementByTag('p', filter.attributeContains('class', 'very-nice-p'));
p.toString(); // "//p[contains(@class, 'very-nice-p')]"

// Finds the paragraph that is following the above one
const nextP = p.getFollowingSiblingByTag('p');
nextP.toString(); // "//p[contains(@class, 'very-nice-p')]/following-sibling::p"

// Finds the modal containing a button with text "Register" 
const modal = xh
  .getElement(filter.valueEquals('Register'))
  .getAncestor(filter.attributeEquals('class', 'modal'));
modal.toString(); // "//*[text() = 'Register']/ancestor::*[@class='modal']"

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
## Chaining

XPath natively lets your build complex queries chaining them along its different axes. Read this [article to understand the different XPath axes](https://jrebecchi.github.io/xpath-helper/xpath-axes.html).

This library let you do exactly the same by chaining method calls along the different axes: [`descendant`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getDescendant) aliased as [`element`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getElement), [`descendant-or-self`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getDescendantOrSelf), [`child`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getChild), [`parent`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getParent), [`ancestor`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getAncestor), [`ancestor-or-self`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getAncestorOrSelf), [`preceding`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getPreceding), [`preceding-sibling`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getPrecedingSibling), [`following`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getFollowing), [`following-sibling`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#XPathHelper.getFollowingSibling).

For each axis, xpath-helper provides 3 methods, like for instance `getElement(filter)`, `getElementByTag(tag, filter)`, `getElementBySVGTag(svgTag, filter)` for the `descendant`  axis aliased as `element`.

***The complete JavaScript API can be found [here](https://jrebecchi.github.io/xpath-helper/javascript/api.html#xpathhelper-xh).***


```javascript
import { xh, filter } from 'xpath-helper';

// Finds an element into the page, moves to its parent, 
// finds a brother node of the parent positioned after it.
const el = xh.getElementByTag('p', filter.attributeContains('class', 'very-nice-p'))
  .getParent()
  .getFollowingSiblingByTag('p');
el.toString(); // "//p[contains(@class, 'very-nice-p')]/../following-sibling::p"

// Finds an element into the page, moves to its ancestor 
// containing 'very-nice-p' ass CSS class, 
// finds a brother node of the ancestor positioned before it.
el = xh.getElementByTag('p', filter.attributeContains('class', 'very-nice-p'))
  .getAncestorByTag('div')
  .getPrecedingSibling(filter.hasAttribute('data-foo-bar'));
el.toString(); // "//p[contains(@class, 'very-nice-p')]/../following-sibling::p//p[contains(@class, 'very-nice-p')]/ancestor::div/preceding-sibling::*[@data-foo-bar]"
```

It is also possible to keep a relative path in a variable and re-use it after.
```javascript
import { xh, filter } from 'xpath-helper';
// Stores the path of a modal window
const modal = xh.getElement(filter.attributeContains('class', 'modal'));
// Finds the Submit button inside the modal window
const submitButton = modal.getElementByTag('button', filter.valueEquals('Submit'));
// Finds the Cancel button inside the modal window
const cancelButton = modal.getElementByTag('button', filter.valueEquals('Cancel'));
```
## Filters
To select elements more precisely you can add filters: [on attributes](https://jrebecchi.github.io/xpath-helper/javascript/api.html#EmptyFilter.attributeContains), on [element values](https://jrebecchi.github.io/xpath-helper/javascript/api.html#EmptyFilter.valueContains), [element position](https://jrebecchi.github.io/xpath-helper/javascript/api.html#EmptyFilter.get), and combine them with conditional operators: [`and(...)`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#ValidExpressionFilter.and), [`or(...)`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#ValidExpressionFilter.or), and [`not(...)`](https://jrebecchi.github.io/xpath-helper/javascript/api.html#EmptyFilter.not).

***The complete filter API can be found [here](https://jrebecchi.github.io/xpath-helper/javascript/api.html#filter-filter).***

### Attributes
Find below a few examples of filters on attributes.

```javascript
import { xh, filter } from 'xpath-helper';
// Looks for an element that has a class attribute equals to 'foo'
const el = xh.getElement(filter.attributeEquals('class', 'foo'));
// Looks for an element that has a class attribute containing 'bar'
const el2 = xh.getElement(filter.attributeContains('class', 'bar'));
// Looks for an element that has the attribute 'alt'
const img = xh.getElementByTag('img', filter.hasAttribute('alt'));
// Looks for all the li element with a data-attribute superior to 3
const li = xh.getElementByTag('li', filter.attributeGreaterThan('data-index', 3);)
```
###  Values
Find below a few examples of filters on node values.
```javascript
import { xh, filter } from 'xpath-helper';

// Looks for a button whose text is 'Submit'
const button = xh.getElementByTag('button', filter.valueEquals('Submit'));
// Looks for an element whose text contains 'foobar'
const el = xh.getElement(filter.valueContains('foobar'));
// Looks for all the li element with a value superior to 3
const li = xh.getElementByTag('li', filter.valueGreaterThan(3));
```
### Position
Find below a few examples of filters on node position.
```javascript
import { xh, filter } from 'xpath-helper';

// Looks for the first li element in ul list
const first = xh.getElementByTag('ul').getElementByTag('li', filter.getFirst());
// Looks for the first li element in ul list
const last = xh.getElementByTag('ul').getElementByTag('li', filter.getLast());
// Looks for the third li element in ul list
const third = xh.getElementByTag('ul').getElementByTag('li', filter.get(3));
```
### Conditional expression
Find below a few examples of filters with conditional expression.

```javascript
import { xh, filter } from 'xpath-helper';

// Finds an element that has a CSS class 'a-link' and contains an attribute href
let el = xh.getElement(
  filter.attributeContains('class', 'a-link').and(
    filter.hasAttribute('href')
  )
);
el.toString(); // "//*[contains(@class, 'a-link') and (@href)]"

// Finds an element that has a CSS class 'foo' or a CSS class 'bar'
el = xh.getElement(
  filter.attributeContains('class', 'foo').or(
    filter.attributeContains('class', 'bar')
  )
);
el.toString(); // "//*[contains(@class, 'foo') or (contains(@class, 'bar'))]"

// Builds a complex logical expression combining and & or
el = xh.getElement(
  filter.and(
    filter.or(
      filter.valueContains("JavaScript"),
      filter.valueContains("Pyhton")
    ),
      filter.valueContains("package")
  )
);
el.toString(); // "//*[((text()[contains(., 'JavaScript')] or text()[contains(., 'Pyhton')]) and text()[contains(., 'package')])]"
```
## SVG
Navigating into SVG elements from an HTML file can be tricky with XPath, that is why a subset of functions have been added. They are all ending with `...bySVGTag` and can be used as below.

```javascript
import { xh, filter } from 'xpath-helper';

// Stores the path of a modal window
const path = xh.getElementBySVGTag('path', 
  filter.attributeEquals('d', 'M 310 130 L 90 130 L 90 183.63')
);
path.toString(); // "//*[local-name() = 'path'][@d='M 310 130 L 90 130 L 90 183.63']"
    
// Finds the Submit button inside the modal window
const g = xh.getElementBySVGTag('path', filter.attributeEquals('id', 'id-path'))
  .getAncestorBySVGTag('g');
g.toString(); // "//*[local-name() = 'path'][@id='id-path']/ancestor::*[local-name() = 'g']"
```
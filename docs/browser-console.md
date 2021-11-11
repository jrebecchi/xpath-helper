# Try it in your browser

You can directly use `xpath-helper` in your browser console to test XPath queries. You will find below an example with the docs of the project

 - Open the following page in your browser [https://jrebecchi.github.io/xpath-helper/](https://jrebecchi.github.io/xpath-helper/).
 - Open the browser console by pressing `Ctrl`+`F12` or `Cmd`+`F12` on mac.
 - In the command line at the bottom, import `xpath-helper` module from unpkg

```javascript
import('https://unpkg.com/xpath-helper@latest/dist/mjs/xpath-helper.js').then(m => xpathHelperModule = m);
```
 - import `xh` and `filter` objects

```javascript
const { xh, filter } = xpathHelperModule
```
 - Create your first path

```javascript
const img = xh.getElementByTag('img', filter.attributeContains('alt', 'xpath-helper')).toString()
//>> img = "//img[contains(@src, 'xpath-helper')]"
```
 - Test if your browser actually finds an element

```javascript
const elements = $x(img)
//>> elements = Array [ img ]
```

As you can see, you can directly test you xpath queries built with `xpath-helper`. Afterward, you can re-use the `xpath-helper` expression, or directly the XPath `string` generated, in your script.
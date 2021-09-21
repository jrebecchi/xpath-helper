import { DOMWindow, JSDOM } from 'jsdom';
import XPathHelper, { filter } from '../src/index'

let page: DOMWindow;
let findByXpath: (path: string) => Node | null;

beforeEach(async function () {
  page = await (await JSDOM.fromFile('./test/index.html')).window;
  findByXpath = function (path) {
    const result = page.document.evaluate(path, page.document, null, 9, null);
    return result.singleNodeValue;
  }
});
describe('Simple xpath selector', () => {
  it('- should select element with getElement... functions', () => {
    const title = new XPathHelper()
      .getElementByTag("h1");
    const h1 = findByXpath(title.toString());
    expect(h1).not.toBeNull();
    expect(h1).toBeInstanceOf(page.HTMLHeadingElement);
    expect(h1 && h1.textContent).toBe("The best motherfudging website");

    const paragraph = new XPathHelper()
      .getElement(filter.attributeEquals("class", "st"));
    const p = findByXpath(title.toString());
    expect(p).not.toBeNull();
    expect(p).toBeInstanceOf(page.HTMLHeadingElement);
    expect(p && p.textContent).toBe("For real.");
  });
});

import { DOMWindow, JSDOM } from 'jsdom';
import XPathHelper, { filter } from '../src/index'

let page: DOMWindow;
let findByXpath: (path: string) => Node | null;
let findByXpathSVG: (path: string) => Node | null;
beforeEach(async function () {
  page = await (await JSDOM.fromFile('./test/index.html')).window;
  findByXpath = function (path) {
    const result = page.document.evaluate(path, page.document, null, 9, null);
    return result.singleNodeValue;
  }
  findByXpathSVG = function (path) {
    const result = page.document.evaluate(path, page.document, function () { return 'http://www.w3.org/2000/svg' }
      , 9, null);
    return result.singleNodeValue;
  }
});
describe('Simple xpath selector and filter', () => {
  describe('- Descendant axe', () => {
    it('getElementByTag', () => {
      const title = new XPathHelper()
        .getElementByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1).toBeInstanceOf(page.HTMLHeadingElement);
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getElement', () => {

      const paragraph = new XPathHelper()
        .getElement(filter.attributeEquals("class", "st"));
      const p = findByXpath(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(page.HTMLParagraphElement);
      expect(p && p.textContent).toBe("For real.");
    });
    it('getElement', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer_1"));
      const g = findByXpathSVG(svgLayer.toString());
      // expect(g).not.toBeNull();
      // expect(g).toBeInstanceOf(page.HTMLParagraphElement);
    });

  });
});

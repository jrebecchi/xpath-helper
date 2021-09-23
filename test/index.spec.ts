import { DOMWindow, JSDOM } from 'jsdom';
import XPathHelper, { filter } from '../src/index'
import * as xpath from 'xpath';
import { DOMParser } from 'xmldom';
import * as fs from 'fs';

let page: DOMWindow;
let findByXpath: (path: string) => Node | null;
let findByXpathSVG: (path: string) => Node | null;
beforeEach(async function () {
  const file = fs.readFileSync('./test/index.html');
  const doc = new DOMParser().parseFromString(file.toString());
  findByXpath = (path) => xpath.evaluate(path, doc, null, 9, null).singleNodeValue

  findByXpathSVG = (path) => xpath.evaluate(path, doc, function () { return 'http://www.w3.org/2000/svg' }
    , 9, null).singleNodeValue;
});
describe('Simple xpath selector and filter', () => {
  describe('- Descendant axis', () => {
    it('getElementByTag', () => {
      const title = new XPathHelper()
        .getElementByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1?.textContent).toBe("The best motherfudging website");
    });
    it('getElement', () => {
      const paragraph = new XPathHelper()
        .getElement(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe("For real.");
    });
    it('getElementBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Descendant-or-self axis', () => {
    it('getDescendantOrSelfByTag', () => {
      const title = new XPathHelper()
        .getElementByTag("h1")
        .getDescendantOrSelfByTag("h1", filter.getFirst());
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getDescendantOrSelf', () => {
      const paragraph = new XPathHelper()
        .getElementByTag("p")
        .getDescendantOrSelf(filter.attributeEquals("class", "mfw"));
      const span = findByXpathSVG(paragraph.toString());
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe("motherfudgingwebsite");
    });
    it('getDescendantOrSelfBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getDescendantOrSelfBySVGTag("path", filter.attributeEquals("fill", "#131313"));
      const path = findByXpathSVG(svgLayer.toString());
      expect(path).not.toBeNull();
    });
  });

  describe('- Child axis', () => {
    it('getChildByTag', () => {
      const licenseTerm = new XPathHelper()
        .getElementByTag("p")
        .getChildByTag("a", filter.attributeEquals("href", "LICENSE.txt"));
      const a = findByXpath(licenseTerm.toString());
      expect(a).not.toBeNull();
      expect(a?.textContent).toBe("license terms");
    });
    it('getChild', () => {
      const paragraph = new XPathHelper()
        .getElement(filter.attributeEquals("class", "tleft"))
        .getChild(filter.getFirst());
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p?.textContent?.includes("We're not looking at a novel by Stephenie Meyer")).toBeTruthy();
    });
    it('getChildBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape"))
      let path = findByXpathSVG(svgLayer.toString());
      expect(path).not.toBeNull();

      const svgLayer2 = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape5"))
      path = findByXpathSVG(svgLayer2.toString());
      expect(path).toBeNull();
    });
  });

  describe('- Ancestor axis', () => {
    it('getAncestorByTag', () => {
      const title = new XPathHelper()
        .getAncestorByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getAncestor', () => {
      const paragraph = new XPathHelper()
        .getAncestor(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getAncestorBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getAncestorBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Ancestor-or-self axis', () => {
    it('getAncestorOrSelfByTag', () => {
      const title = new XPathHelper()
        .getAncestorOrSelfByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getAncestorOrSelf', () => {
      const paragraph = new XPathHelper()
        .getAncestorOrSelf(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getAncestorOrSelfBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getAncestorOrSelfBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Following axis', () => {
    it('getFollowingBySVGTag', () => {
      const title = new XPathHelper()
        .getFollowingBySVGTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getFollowing', () => {
      const paragraph = new XPathHelper()
        .getFollowing(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getFollowingByTag', () => {
      const svgLayer = new XPathHelper()
        .getFollowingByTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Following-sibling axis', () => {
    it('getFollowingSiblingByTag', () => {
      const title = new XPathHelper()
        .getFollowingSiblingByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getFollowingSibling', () => {
      const paragraph = new XPathHelper()
        .getFollowingSibling(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getFollowingSiblingBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getFollowingSiblingBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Preceding axis', () => {
    it('getPrecedingByTag', () => {
      const title = new XPathHelper()
        .getPrecedingByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getPreceding', () => {
      const paragraph = new XPathHelper()
        .getPreceding(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getPrecedingBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getPrecedingBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Preceding-sibling axis', () => {
    it('getPrecedingSiblingByTag', () => {
      const title = new XPathHelper()
        .getPrecedingSiblingByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it('getPrecedingSibling', () => {
      const paragraph = new XPathHelper()
        .getPrecedingSibling(filter.attributeEquals("class", "st"));
      const p = findByXpathSVG(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p && p.textContent).toBe("For real.");
    });
    it('getPrecedingSiblingBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getPrecedingSiblingBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpathSVG(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });
});

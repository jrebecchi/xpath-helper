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

  // findByXpathSVG = (path) => xpath.evaluate(path, doc, function () { return 'http://www.w3.org/2000/svg' }
  //   , 9, null).singleNodeValue;
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
      const p = findByXpath(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe("For real.");
    });
    it('getElementBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"));
      const g = findByXpath(svgLayer.toString());
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
      const span = findByXpath(paragraph.toString());
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe("motherfudgingwebsite");
    });
    it('getDescendantOrSelfBySVGTag', () => {
      const svgLayer = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getDescendantOrSelfBySVGTag("path", filter.attributeEquals("fill", "#131313"));
      const path = findByXpath(svgLayer.toString());
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
      const p = findByXpath(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p?.textContent?.includes("We're not looking at a novel by Stephenie Meyer")).toBeTruthy();
    });
    it('getChildBySVGTag', () => {
      const gPath = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape"))
      let path = findByXpath(gPath.toString());
      expect(path).not.toBeNull();

      const gPath2 = new XPathHelper()
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape5"))
      path = findByXpath(gPath2.toString());
      expect(path).toBeNull();
    });
  });

  describe('- Ancestor axis', () => {
    it('getAncestorByTag', () => {
      const ulPath = new XPathHelper()
        .getElementByTag('a', filter.attributeContains('href', 'wiki/HTTPS'))
        .getAncestorByTag("ul");
      const ul = findByXpath(ulPath.toString());
      expect(ul).not.toBeNull();

      const firstLiPath = ulPath.getElementByTag('li', filter.getFirst());
      const li = findByXpath(firstLiPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes('secure connection')).not.toBeNull();
    });
    it('getAncestor', () => {
      const liPath = new XPathHelper()
        .getElementByTag('a', filter.attributeContains('href', 'wiki/HTTPS'))
        .getAncestor(filter.valueContains("It's over a,"));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes('secure connection')).not.toBeNull();
    });
    it('getAncestorBySVGTag', () => {
      const gPath = new XPathHelper()
        .getElement(filter.attributeEquals("id", "Shape8"))
        .getAncestorBySVGTag("g", filter.attributeEquals("stroke", "none"));
      const g = findByXpath(gPath.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Ancestor-or-self axis', () => {
    it('getAncestorOrSelfByTag', () => {
      const ulPath = new XPathHelper()
        .getElementByTag('a', filter.attributeContains('href', 'wiki/HTTPS'))
        .getAncestorOrSelfByTag("ul")
        .getAncestorOrSelfByTag("ul");
      const ul = findByXpath(ulPath.toString());
      expect(ul).not.toBeNull();

      const firstLiPath = ulPath.getElementByTag('li', filter.getFirst());
      const li = findByXpath(firstLiPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes('secure connection')).not.toBeNull();
    });
    it('getAncestorOrSelf', () => {
      const liPath = new XPathHelper()
        .getElementByTag('a', filter.attributeContains('href', 'wiki/HTTPS'))
        .getAncestorOrSelf(filter.valueContains("It's over a,"))
        .getAncestorOrSelf(filter.valueContains("It's over a,"));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes('secure connection')).not.toBeNull();
    });
    it('getAncestorOrSelfBySVGTag', () => {
      const gPath = new XPathHelper()
        .getElement(filter.attributeEquals("id", "Shape8"))
        .getAncestorOrSelfBySVGTag("g", filter.attributeEquals("stroke", "none"))
        .getAncestorOrSelfBySVGTag("g", filter.attributeEquals("stroke", "none"));
      const g = findByXpath(gPath.toString());
      expect(g).not.toBeNull();
    });
  });

  describe('- Following axis', () => {
    it('getFollowingByTag', () => {
      const liPath = new XPathHelper()
        .getElementByTag('i', filter.valueEquals('almost'))
        .getFollowingByTag("li", filter.valueContains("Doesn't load mbumive images or scripts."));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("Doesn't load mbumive images or scripts.")).toBeTruthy();

      const aPath = new XPathHelper()
        .getElementByTag('i', filter.valueEquals('even more'))
        .getFollowingByTag("a", filter.valueEquals("ARPANET"));
      console.log(aPath.toString());
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it('getFollowing', () => {
      const liPath = new XPathHelper()
        .getElementByTag('a', filter.attributeContains("href", "letsencrypt"))
        .getFollowing(filter.attributeGreaterThan("data-number", 21));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("20");
    });
    it('getFollowingBySVGTag', () => {
      const svgPath = new XPathHelper()
        .getElement(filter.attributeLessThan("width", 640).and(filter.attributeGreaterThanOrEqualsTo("width", 620)))
        .getFollowingBySVGTag("svg", filter.attributeEquals("width", "298px"));
      const svg = findByXpath(svgPath.toString());
      expect(svg).not.toBeNull();
    });
  });

  describe('- Following-sibling axis', () => {
    it('getFollowingSiblingByTag', () => {
      const liPath = new XPathHelper()
        .getElementByTag('i', filter.valueEquals('almost'))
        .getFollowingSiblingByTag("li", filter.valueContains("Doesn't load mbumive images or scripts."));
      const li = findByXpath(liPath.toString());
      expect(li).toBeNull();

      const aPath = new XPathHelper()
        .getElementByTag('i', filter.valueEquals('even more'))
        .getFollowingSiblingByTag("a", filter.valueEquals("ARPANET"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it('getFollowingSibling', () => {
      const liPath = new XPathHelper()
        .getElementByTag('li', filter.attributeLessThan("data-number", 21))
        .getFollowingSibling(filter.valueGreaterThanOrEqualsTo(20));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("20");
    });
    it('getFollowingSiblingBySVGTag', () => {
      const pathPath = new XPathHelper()
        .getElement(filter.attributeLessThan("width", 640).and(filter.attributeGreaterThanOrEqualsTo("width", 620)))
        .getFollowingSiblingBySVGTag("path", filter.attributeContains("d", "m423"));
      const path = findByXpath(pathPath.toString());
      console.log(pathPath.toString());
      expect(path).not.toBeNull();
    });
  });

  describe('- Preceding axis', () => {
    it('getPrecedingByTag', () => {
      const liPath = new XPathHelper()
        .getElementByTag("li", filter.valueContains("Doesn't load mbumive images or scripts."))
        .getPrecedingByTag('i', filter.valueEquals('almost'))
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();

      const aPath = new XPathHelper()
        .getElementByTag("a", filter.valueEquals("ARPANET"))
        .getPrecedingByTag('i', filter.valueEquals('even more'))
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it('getPreceding', () => {
      const aPath = new XPathHelper()
        .getElement(filter.attributeGreaterThan("data-number", 21))
        .getPreceding(filter.attributeContains("href", "letsencrypt"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it('getPrecedingBySVGTag', () => {
      const svgPath = new XPathHelper()
        .getElementBySVGTag("svg", filter.attributeEquals("width", "298px"))
        .getPrecedingBySVGTag("rect", filter.attributeLessThan("width", 640).and(filter.attributeGreaterThanOrEqualsTo("width", 620)))
      const svg = findByXpath(svgPath.toString());
      expect(svg).not.toBeNull();
    });
  });

  describe('- Preceding-sibling axis', () => {
    it('getPrecedingSiblingByTag', () => {
      const iPath = new XPathHelper()
        .getElementByTag("li", filter.valueContains("Doesn't load mbumive images or scripts."))
        .getPrecedingSiblingByTag('i', filter.valueEquals('almost'))
      const i = findByXpath(iPath.toString());
      expect(i).toBeNull();

      const aPath = new XPathHelper()
        .getElementByTag('i', filter.valueEquals('even more'))
        .getFollowingSiblingByTag("a", filter.valueEquals("ARPANET"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it('getPrecedingSibling', () => {
      const liPath = new XPathHelper()
        .getElementByTag("li", filter.valueGreaterThanOrEqualsTo(20))
        .getPrecedingSibling(filter.attributeLessThanOrEqualsTo("data-number", 21))
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("15");
    });
    it('getPrecedingSiblingBySVGTag', () => {
      const rectPath = new XPathHelper()
        .getElementBySVGTag("path", filter.attributeContains("d", "m423"))
        .getPrecedingSiblingBySVGTag("rect", filter.attributeLessThan("width", 640).and(filter.attributeGreaterThanOrEqualsTo("width", 620)))
      const rect = findByXpath(rectPath.toString());
      expect(rect).not.toBeNull();
    });
  });
});

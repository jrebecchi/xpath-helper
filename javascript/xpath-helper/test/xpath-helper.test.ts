import { xh, filter } from "../src/xpath-helper";
import * as xpath from "xpath";
import { DOMParser } from "xmldom";
import * as fs from "fs";

let findByXpath: (path: string) => Node | null;
beforeEach(async function () {
  const file = fs.readFileSync("./test/index.html");
  const doc = new DOMParser().parseFromString(file.toString());
  findByXpath = (path) =>
    xpath.evaluate(path, doc, null, 9, null).singleNodeValue;
});
describe("XPathHelper", () => {
  describe("- General methods", () => {
    it("getParent", () => {
      const liPath = xh
        .getElementByTag("a", filter.valueContains("secure connection"))
        .getParent();
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("It's over a,")).toBeTruthy();
    });
    it("getElementByXpath", () => {
      const liPath = xh
        .getElementByTag("a", filter.valueContains("secure connection"))
        .getElementByXpath("/..");
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("It's over a,")).toBeTruthy();
    });
    it("empty", () => {
      const liPath = xh
        .getElementByTag("a", filter.valueContains("secure connection"))
        .getParent();
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("It's over a,")).toBeTruthy();
      liPath.empty();
      expect(liPath.toString()).toBe("");
    });
  });
  describe("- Descendant axis", () => {
    it("getElementByTag", () => {
      const title = xh.getElementByTag("h1");
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1?.textContent).toBe("The best motherfudging website");
    });
    it("getElement", () => {
      const paragraph = xh.getElement(
        filter.attributeEquals("class", "st")
      );
      const p = findByXpath(paragraph.toString());
      expect(p).not.toBeNull();
      expect(p?.textContent).toBe("For real.");
    });
    it("getElementBySVGTag", () => {
      const svgLayer = xh.getElementBySVGTag(
        "g",
        filter.attributeEquals("id", "Layer1")
      );
      const g = findByXpath(svgLayer.toString());
      expect(g).not.toBeNull();
    });
  });
  describe("- Descendant-or-self axis", () => {
    it("getDescendantOrSelfByTag", () => {
      const title = xh
        .getElementByTag("h1")
        .getDescendantOrSelfByTag("h1", filter.getFirst());
      const h1 = findByXpath(title.toString());
      expect(h1).not.toBeNull();
      expect(h1 && h1.textContent).toBe("The best motherfudging website");
    });
    it("getDescendantOrSelf", () => {
      const paragraph = xh
        .getElementByTag("p")
        .getDescendantOrSelf(filter.attributeEquals("class", "mfw"));
      const span = findByXpath(paragraph.toString());
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe("motherfudgingwebsite");
    });
    it("getDescendantOrSelfBySVGTag", () => {
      const svgLayer = xh
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getDescendantOrSelfBySVGTag(
          "path",
          filter.attributeEquals("fill", "#131313")
        );
      const path = findByXpath(svgLayer.toString());
      expect(path).not.toBeNull();
    });
  });
  describe("- Child axis", () => {
    it("getChildByTag", () => {
      const licenseTerm = xh
        .getElementByTag("p")
        .getChildByTag("a", filter.attributeEquals("href", "LICENSE.txt"));
      const a = findByXpath(licenseTerm.toString());
      expect(a).not.toBeNull();
      expect(a?.textContent).toBe("license terms");
    });
    it("getChild", () => {
      const paragraph = xh
        .getElement(filter.attributeEquals("class", "tleft"))
        .getChild(filter.getFirst());
      const p = findByXpath(paragraph.toString());
      expect(p).not.toBeNull();
      expect(
        p?.textContent?.includes(
          "We're not looking at a novel by Stephenie Meyer"
        )
      ).toBeTruthy();
    });
    it("getChildBySVGTag", () => {
      const gPath = xh
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape"));
      let path = findByXpath(gPath.toString());
      expect(path).not.toBeNull();

      const gPath2 = xh
        .getElementBySVGTag("g", filter.attributeEquals("id", "Layer1"))
        .getChildBySVGTag("path", filter.attributeEquals("id", "Shape5"));
      path = findByXpath(gPath2.toString());
      expect(path).toBeNull();
    });
  });
  describe("- Ancestor axis", () => {
    it("getAncestorByTag", () => {
      const ulPath = xh
        .getElementByTag("a", filter.attributeContains("href", "wiki/HTTPS"))
        .getAncestorByTag("ul");
      const ul = findByXpath(ulPath.toString());
      expect(ul).not.toBeNull();

      const firstLiPath = ulPath.getElementByTag("li", filter.getFirst());
      const li = findByXpath(firstLiPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("secure connection")).not.toBeNull();
    });
    it("getAncestor", () => {
      const liPath = xh
        .getElementByTag("a", filter.attributeContains("href", "wiki/HTTPS"))
        .getAncestor(filter.valueContains("It's over a,"));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("secure connection")).not.toBeNull();
    });
    it("getAncestorBySVGTag", () => {
      const gPath = xh
        .getElement(filter.attributeEquals("id", "Shape8"))
        .getAncestorBySVGTag("g", filter.attributeEquals("stroke", "none"));
      const g = findByXpath(gPath.toString());
      expect(g).not.toBeNull();
    });
  });
  describe("- Ancestor-or-self axis", () => {
    it("getAncestorOrSelfByTag", () => {
      const ulPath = xh
        .getElementByTag("a", filter.attributeContains("href", "wiki/HTTPS"))
        .getAncestorOrSelfByTag("ul")
        .getAncestorOrSelfByTag("ul");
      const ul = findByXpath(ulPath.toString());
      expect(ul).not.toBeNull();

      const firstLiPath = ulPath.getElementByTag("li", filter.getFirst());
      const li = findByXpath(firstLiPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("secure connection")).not.toBeNull();
    });
    it("getAncestorOrSelf", () => {
      const liPath = xh
        .getElementByTag("a", filter.attributeContains("href", "wiki/HTTPS"))
        .getAncestorOrSelf(filter.valueContains("It's over a,"))
        .getAncestorOrSelf(filter.valueContains("It's over a,"));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent?.includes("secure connection")).not.toBeNull();
    });
    it("getAncestorOrSelfBySVGTag", () => {
      const gPath = xh
        .getElement(filter.attributeEquals("id", "Shape8"))
        .getAncestorOrSelfBySVGTag(
          "g",
          filter.attributeEquals("stroke", "none")
        )
        .getAncestorOrSelfBySVGTag(
          "g",
          filter.attributeEquals("stroke", "none")
        );
      const g = findByXpath(gPath.toString());
      expect(g).not.toBeNull();
    });
  });
  describe("- Following axis", () => {
    it("getFollowingByTag", () => {
      const liPath = xh
        .getElementByTag("i", filter.valueEquals("almost"))
        .getFollowingByTag(
          "li",
          filter.valueContains("Doesn't load mbumive images or scripts.")
        );
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(
        li?.textContent?.includes("Doesn't load mbumive images or scripts.")
      ).toBeTruthy();

      const aPath = xh
        .getElementByTag("i", filter.valueEquals("even more"))
        .getFollowingByTag("a", filter.valueEquals("IPoAC"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it("getFollowing", () => {
      const liPath = xh
        .getElementByTag("a", filter.attributeContains("href", "letsencrypt"))
        .getFollowing(filter.attributeGreaterThan("data-number", 21));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("20");
    });
    it("getFollowingBySVGTag", () => {
      const svgPath = xh
        .getElement(
          filter
            .attributeLessThan("width", 640)
            .and(filter.attributeGreaterThanOrEqualTo("width", 620))
        )
        .getFollowingBySVGTag("svg", filter.attributeEquals("width", "298px"));
      const svg = findByXpath(svgPath.toString());
      expect(svg).not.toBeNull();
    });
  });
  describe("- Following-sibling axis", () => {
    it("getFollowingSiblingByTag", () => {
      const liPath = xh
        .getElementByTag("i", filter.valueEquals("almost"))
        .getFollowingSiblingByTag(
          "li",
          filter.valueContains("Doesn't load mbumive images or scripts.")
        );
      const li = findByXpath(liPath.toString());
      expect(li).toBeNull();

      const aPath = xh
        .getElementByTag("i", filter.valueEquals("even more"))
        .getFollowingSiblingByTag("a", filter.valueEquals("ARPANET"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it("getFollowingSibling", () => {
      const liPath = xh
        .getElementByTag("li", filter.attributeLessThan("data-number", 21))
        .getFollowingSibling(filter.valueGreaterThanOrEqualTo(20));
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("20");
    });
    it("getFollowingSiblingBySVGTag", () => {
      const pathPath = xh
        .getElement(
          filter
            .attributeLessThan("width", 640)
            .and(filter.attributeGreaterThanOrEqualTo("width", 620))
        )
        .getFollowingSiblingBySVGTag(
          "path",
          filter.attributeContains("d", "m423")
        );
      const path = findByXpath(pathPath.toString());
      expect(path).not.toBeNull();
    });
  });
  describe("- Preceding axis", () => {
    it("getPrecedingByTag", () => {
      const iPath = xh
        .getElementByTag(
          "li",
          filter.valueContains("Doesn't load mbumive images or scripts.")
        )
        .getPrecedingByTag("i", filter.valueEquals("almost"));
      const i = findByXpath(iPath.toString());
      expect(i).not.toBeNull();

      const iPath2 = xh
        .getElementByTag("a", filter.valueEquals("ARPANET"))
        .getPrecedingByTag("i", filter.valueEquals("even more"));
      const i2 = findByXpath(iPath2.toString());
      expect(i2).not.toBeNull();
    });
    it("getPreceding", () => {
      const aPath = xh
        .getElement(filter.attributeGreaterThan("data-number", 21))
        .getPreceding(filter.attributeContains("href", "letsencrypt"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it("getPrecedingBySVGTag", () => {
      const rectPath = xh
        .getElementBySVGTag("svg", filter.attributeEquals("width", "298px"))
        .getPrecedingBySVGTag(
          "rect",
          filter
            .attributeLessThan("width", 640)
            .and(filter.attributeGreaterThanOrEqualTo("width", 620))
        );
      const rect = findByXpath(rectPath.toString());
      expect(rect).not.toBeNull();
    });
  });
  describe("- Preceding-sibling axis", () => {
    it("getPrecedingSiblingByTag", () => {
      const iPath = xh
        .getElementByTag(
          "li",
          filter.valueContains("Doesn't load mbumive images or scripts.")
        )
        .getPrecedingSiblingByTag("i", filter.valueEquals("almost"));
      const i = findByXpath(iPath.toString());
      expect(i).toBeNull();

      const aPath = xh
        .getElementByTag("i", filter.valueEquals("even more"))
        .getFollowingSiblingByTag("a", filter.valueEquals("ARPANET"));
      const a = findByXpath(aPath.toString());
      expect(a).not.toBeNull();
    });
    it("getPrecedingSibling", () => {
      const liPath = xh
        .getElementByTag("li", filter.valueGreaterThanOrEqualTo(20))
        .getPrecedingSibling(
          filter.attributeLessThanOrEqualTo("data-number", 21)
        );
      const li = findByXpath(liPath.toString());
      expect(li).not.toBeNull();
      expect(li?.textContent).toBe("15");
    });
    it("getPrecedingSiblingBySVGTag", () => {
      const rectPath = xh
        .getElementBySVGTag("path", filter.attributeContains("d", "m423"))
        .getPrecedingSiblingBySVGTag(
          "rect",
          filter
            .attributeLessThan("width", 640)
            .and(filter.attributeGreaterThanOrEqualTo("width", 620))
        );
      const rect = findByXpath(rectPath.toString());
      expect(rect).not.toBeNull();
    });
  });
});

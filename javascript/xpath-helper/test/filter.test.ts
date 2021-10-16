import { XPathHelper, filter } from "../src/xpath-helper";
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
describe("Filter", () => {
  it("- and", () => {
    const h1Path = new XPathHelper().getElementByTag(
      "h1",
      filter.and(
        filter.valueContains("motherfudging"),
        filter.valueContains("website")
      )
    );
    const h1 = findByXpath(h1Path.toString());
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.includes("motherfudging")).toBeTruthy();
  });
  it("- or", () => {
    const h1Path = new XPathHelper().getElementByTag(
      "h1",
      filter
        .valueContains("motherfudging")
        .or(filter.valueEquals("motherfudging"))
    );
    const h1 = findByXpath(h1Path.toString());
    expect(h1).not.toBeNull();
    expect(h1?.textContent?.includes("motherfudging")).toBeTruthy();
  });
  it("- empty", () => {
    const aFilter = filter.hasAttribute("Toto");
    let h1Path = new XPathHelper().getElementByTag("h1", aFilter);
    let h1 = findByXpath(h1Path.toString());
    expect(h1).toBeNull();
    aFilter.empty();
    h1Path = new XPathHelper().getElementByTag("h1", aFilter);
    h1 = findByXpath(h1Path.toString());
    expect(h1).not.toBeNull();
  });

  it("- isEmpty", () => {
    expect(filter.hasAttribute("Toto").isEmpty()).toBeFalsy();
    expect(filter.isEmpty()).toBeTruthy();
  });
  it("- hasAttribute", () => {
    const bodyPath = new XPathHelper().getElementByTag(
      "body",
      filter.hasAttribute("data-new-gr-c-s-check-loaded")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeContains", () => {
    const bodyPath = new XPathHelper().getElementByTag(
      "body",
      filter.attributeContains("data-new-gr-c-s-check-loaded", "8")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeEquals", () => {
    const bodyPath = new XPathHelper().getElementByTag(
      "body",
      filter.attributeEquals("data-new-gr-c-s-check-loaded", "8.884.0")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeNotEquals", () => {
    const bodyPath = new XPathHelper().getElementByTag(
      "body",
      filter.attributeNotEquals("data-new-gr-c-s-check-loaded", "toto")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeLessThan", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.attributeLessThan("data-number", 21)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- attributeLessThanOrEqualsTo", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.attributeLessThanOrEqualTo("data-number", 20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- attributeGreaterThan", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.attributeGreaterThan("data-number", 24)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- attributeGreaterThanOrEqualsTo", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.attributeGreaterThanOrEqualTo("data-number", 25)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueContains", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueContains("Stuff doesn't weigh a ton (in fact it'")
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueEquals", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueEquals(20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- valueNotEquals", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueGreaterThan(14).and(filter.valueNotEquals(20))
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
    expect(li?.textContent).toBe("15");
  });

  it("- valueLessThan", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueLessThan(16)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueLessThanOrEqualsTo", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueLessThanOrEqualTo(15)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueGreaterThan", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueGreaterThan(19)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueGreaterThanOrEqualsTo", () => {
    const liPath = new XPathHelper().getElementByTag(
      "li",
      filter.valueGreaterThanOrEqualTo(20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- get", () => {
    const pPath = new XPathHelper()
      .getElementByTag("body")
      .getElementByTag("p", filter.get(2));
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(
      p?.textContent?.includes("You probably build websites using vim")
    ).toBeTruthy();
  });
  it("- getFirst", () => {
    const pPath = new XPathHelper()
      .getElementByTag("body")
      .getElementByTag("p", filter.getFirst());
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(p?.textContent?.includes("For real")).toBeTruthy();
  });
  it("- getLast", () => {
    const pPath = new XPathHelper()
      .getElement(filter.attributeEquals("class", "tleft"))
      .getElementByTag("p", filter.getLast());
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    console.log(p?.textContent);
    expect(p?.textContent?.includes("He's happy")).toBeTruthy();
  });
  it("- not", () => {
    const pPath = new XPathHelper()
      .getElementByTag("body")
      .getElementByTag("p", filter.not(filter.attributeEquals("class", "st")));

    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(p?.textContent?.includes("For real")).toBeFalsy();
  });
});

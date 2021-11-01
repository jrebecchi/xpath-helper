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
describe("Filter", () => {
  it("- and", () => {
    const h1Path = xh.getElementByTag(
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
    const h1Path = xh.getElementByTag(
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
    let h1Path = xh.getElementByTag("h1", aFilter);
    let h1 = findByXpath(h1Path.toString());
    expect(h1).toBeNull();
    aFilter.empty();
    h1Path = xh.getElementByTag("h1", aFilter);
    h1 = findByXpath(h1Path.toString());
    expect(h1).not.toBeNull();
  });

  it("- isEmpty", () => {
    expect(filter.hasAttribute("Toto").isEmpty()).toBeFalsy();
    expect(filter.isEmpty()).toBeTruthy();
  });
  it("- hasAttribute", () => {
    const bodyPath = xh.getElementByTag(
      "body",
      filter.hasAttribute("data-new-gr-c-s-check-loaded")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeContains", () => {
    const bodyPath = xh.getElementByTag(
      "body",
      filter.attributeContains("data-new-gr-c-s-check-loaded", "8")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeEquals", () => {
    const bodyPath = xh.getElementByTag(
      "body",
      filter.attributeEquals("data-new-gr-c-s-check-loaded", "8.884.0")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeNotEquals", () => {
    const bodyPath = xh.getElementByTag(
      "body",
      filter.attributeNotEquals("data-new-gr-c-s-check-loaded", "toto")
    );
    const body = findByXpath(bodyPath.toString());
    expect(body).not.toBeNull();
  });
  it("- attributeLessThan", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.attributeLessThan("data-number", 21)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- attributeLessThanOrEqualsTo", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.attributeLessThanOrEqualTo("data-number", 20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- attributeGreaterThan", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.attributeGreaterThan("data-number", 24)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- attributeGreaterThanOrEqualsTo", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.attributeGreaterThanOrEqualTo("data-number", 25)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueContains", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueContains("Stuff doesn't weigh a ton (in fact it'")
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueEquals", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueEquals(20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });

  it("- valueNotEquals", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueGreaterThan(14).and(filter.valueNotEquals(20))
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
    expect(li?.textContent).toBe("15");
  });

  it("- valueLessThan", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueLessThan(16)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueLessThanOrEqualsTo", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueLessThanOrEqualTo(15)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueGreaterThan", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueGreaterThan(19)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- valueGreaterThanOrEqualsTo", () => {
    const liPath = xh.getElementByTag(
      "li",
      filter.valueGreaterThanOrEqualTo(20)
    );
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
  });
  it("- get", () => {
    const pPath = xh
      .getElementByTag("body")
      .getElementByTag("p", filter.get(2));
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(
      p?.textContent?.includes("You probably build websites using vim")
    ).toBeTruthy();
  });
  it("- getFirst", () => {
    const pPath = xh
      .getElementByTag("body")
      .getElementByTag("p", filter.getFirst());
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(p?.textContent?.includes("For real")).toBeTruthy();
  });
  it("- getLast", () => {
    const pPath = xh
      .getElement(filter.attributeEquals("class", "tleft"))
      .getElementByTag("p", filter.getLast());
    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(p?.textContent?.includes("He's happy")).toBeTruthy();
  });
  it("- not", () => {
    const pPath = xh
      .getElementByTag("body")
      .getElementByTag("p", filter.not(filter.attributeEquals("class", "st")));

    const p = findByXpath(pPath.toString());
    expect(p).not.toBeNull();
    expect(p?.textContent?.includes("For real")).toBeFalsy();
  });
});

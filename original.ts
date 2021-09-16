/**
 * This class provides an API to build XPath requests. You can build from very
 * simple to very complicated ones by chaining different method calls.
 * After building your XPath request, call the method <code>toString()</code>
 * to get the XPath string.
 *
 * <p>A simple example:<code>
 * <br />
 * XPathBuilder xb = new XPathBuilder();
 * <br />
 * xb.getElementByTagWithTextContains("div", "div innerText");
 * <br />
 * return xb.toString()</code>
 * <br />
 * This will return <code>"//div[text()[contains(., 'div innerText')]]"</code>.</p>
 *
 * <p>Chaining method calls example:<code>
 * <br />
 * XPathBuilder xb = new XPathBuilder();
 * <br />
 * xb.getElementByTagWithTextContains("div", "div innerText").getAncestorByTagWithAttribute("div", "class", "ancestor-div");
 * <br />
 * return xb.toString()</code>
 * <br />
 * This will return <code>"//div[text()[contains(., 'div innerText')]]/ancestor::div[@class='ancestor-div']);"</code>.</p>
 */
 export default class XPathBuilder {
  private sb: Array<string>;

  constructor(currentPath?: Array<string>) {
      if (currentPath){
          this.sb = currentPath;
      } else {
          this.sb = new Array<string>();
          this.appendLocalPath();
      }
  }

  public empty(): void {
      this.sb = new Array<string>();
      this.appendLocalPath();
  }


  public toString(): string {
      return this.sb.join("");
  }
  
  /**
   * @summary Select an HTML element, child of the current element, with the inner text equal to <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getElementWithText(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, child of the current element, containing the inner text <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getElementWithTextContains(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, child of the current element, containing in its innerHTML <code>str</code>.
   * @param {string} str
   * @return {XPathBuilder} returns this
   */
  public getElementWithInnerHTMLContains(str: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[contains(., '" + str + "')]"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithTextContains(tagName: string, text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName + "[text()[contains(., '" + text + "')]]"]);
  }

  /**
   * @summary Select an HTML element, child of the current element, with tag <code>tagName</code>. 
   * @param {string} tagName
   * @return {XPathBuilder} returns this
   */
  public getElementByTag(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName]);
  }

  /**
   * @summary Select an SVG element, child of the current element, with tag <code>tagName</code>.
   * @param {string} tagName
   * @return {XPathBuilder} returns this
   */
  public getElementByTagSVG(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[local-name() = '" + tagName + "']"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementWithAttribute(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementWithAttributeContains(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }
  
  /**
   * @summary Select an HTML element, child of the current element,
   * containing a first attribute <code>attributeName1</code>
   * which value contains <code>attributeValue1</code>
   * ans second attribute <code>attributeName2</code>
   * which value contains <code>attributeValue2</code>.
   * @param {string} attributeName1
   * @param {string} attributeValue1
   * * @param {string} attributeName2
   * @param {string} attributeValue2
   * @return {XPathBuilder} returns this
   */
  public getElementWith1stAttributeContainsAnd2ndAttributeContains(attributeName1: string,
      attributeValue1: string, attributeName2: string, attributeValue2: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[contains(@" + attributeName1 + ", '" + attributeValue1 + "') and contains(@" + attributeName2 + ", '" + attributeValue2 + "')]"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttribute(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName + "[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttributeSVG(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[local-name() = '" + tagName + "'][@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttributeContains(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text equal to <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttributeContainsAndWithTextEquals(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text() = '" + text + "']"]);
  }

  /**
   * @summary Select an SVG element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttributeContainsSVG(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//*[local-name() = '" + tagName + "'][contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, child of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text containing <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getElementByTagWithAttributeContainsAndWithTextContains(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "//" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, ancestor of the current elemen, with the inner text equal to <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorWithText(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element, containing the inner text <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorWithTextContains(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, ancestor of the current element, containing in its innerHTML <code>str</code>.
   * @param {string} str
   * @return {XPathBuilder} returns this
   */
  public getAncestorWithInnerHTMLContains(str: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[contains(., '" + str + "')]"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTag(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName]);
  }

  /**
   * @summary Select an SVG element, ancestor of the current element, with tag <code>tagName</code>.
   * @param {string} tagName
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagSVG(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[local-name() = '" + tagName + "']"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithTextContains(tagName: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName + "[text()[contains(., '" + text + "')]]"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttribute(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName + "[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttributeSVG(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[local-name() = '" + tagName + "'][@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorWithAttribute(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorWithAttributeContains(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttributeContains(tagName: string,
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an SVG element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttributeContainsSVG(
      tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::*[local-name() = '" + tagName + "'][contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text equal to <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttributeContainsAndWithTextEquals(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, ancestor of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text containing <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getAncestorByTagWithAttributeContainsAndWithTextContains(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/ancestor::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, following sibling of the current element, with the inner text equal to <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingWithText(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element, containing the inner text <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingWithTextContains(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, following sibling of the current element, containing in its innerHTML <code>str</code>.
   * @param {string} str
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingWithInnerHTMLContains(str: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[contains(., '" + str + "')]"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithTextContains(
      tagName: string, text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName + "[text()[contains(., '" + text + "')]]"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingWithAttribute(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingWithAttributeContains(
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTag(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName]);
  }

  /**
   * @summary Select an SVG element, following sibling of the current element, with tag <code>tagName</code>.
   * @param {string} tagName
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagSVG(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[local-name() = '" + tagName + "']"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttributeContains(
      tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttribute(tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName + "[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttributeSVG(
      tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[local-name() = '" + tagName + "'][@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttributeContainsSVG(
      tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::*[local-name() = '" + tagName + "'][contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text equal to <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttributeContainsAndWithTextEquals(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, following sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text containing <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getFollowingSiblingByTagWithAttributeContainsAndWithTextContains(
      tagName: string, attributeName: string, attributeValue: string,
      text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/following-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, following sibling of the current element, with the inner text equal to <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingWithText(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[text() = '" + text + "']"]);
  }


  /**
   * @summary Select an HTML element, preceding sibling of the current element, containing the inner text <code>text</code>.
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingWithTextContains(text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[text()[contains(., '" + text + "')]]"]);
  }
  
  /**
   * @summary Select an HTML element, preceding sibling of the current element, containing in its innerHTML <code>str</code>.
   * @param {string} str
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingWithInnerHTMLContains(str: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[contains(., '" + str + "')]"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithTextContains(
      tagName: string, text: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName + "[text()[contains(., '" + text + "')]]"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingWithAttribute(attributeName: string,
      attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingWithAttributeContains(
      attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * and containing the inner text <code>text</code>.
   * @param {string} tagName
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTag(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName]);
  }

  /**
   * @summary Select an SVG element, preceding sibling of the current element, with tag <code>tagName</code>.
   * @param {string} tagName
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagSVG(tagName: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[local-name() = '" + tagName + "']"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttributeContains(
      tagName: string, attributeName: string, attributeValue: string): XPathBuilder {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttribute(tagName: string, attributeName: string, attributeValue: string) {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName + "[@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value is <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttributeSVG(
      tagName: string, attributeName: string, attributeValue: string) {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[local-name() = '" + tagName + "'][@" + attributeName + "='" + attributeValue + "']"]);
  }

  /**
   * @summary Select an SVG element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttributeContainsSVG(
      tagName: string, attributeName: string, attributeValue: string) {
       return new XPathBuilder([...this.sb, "/preceding-sibling::*[local-name() = '" + tagName + "'][contains(@" + attributeName + ", '" + attributeValue + "')]"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text equal to <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttributeContainsAndWithTextEquals(
      tagName: string, attributeName: string, attributeValue: string,
      text: string) {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text() = '" + text + "']"]);
  }

  /**
   * @summary Select an HTML element, preceding sibling of the current element,
   * with tag <code>tagName</code>
   * containing the attribute <code>attributeName</code>
   * which value contains <code>attributeValue</code>
   * AND with an inner text containing <code>text</code>.
   * @param {string} tagName
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {string} text
   * @return {XPathBuilder} returns this
   */
  public getPrecedingSiblingByTagWithAttributeContainsAndWithTextContains(
      tagName: string, attributeName: string, attributeValue: string,
      text: string) {
       return new XPathBuilder([...this.sb, "/preceding-sibling::" + tagName + "[contains(@" + attributeName + ", '" + attributeValue + "') and text()[contains(., '" + text + "')]]"]);
  }

  /**
   * @summary Select the parent of the current element.
   * @return {XPathBuilder} returns this
   */
  public getParent() {
       return new XPathBuilder([...this.sb, "/.."]);
  }

  /**
   * @summary Select an element with an XPath selector <code>xpath</code>.
   * @param xpath
   * @return {XPathBuilder} returns this
   */
  public getElementByXpath(xpath: string): XPathBuilder {
       return new XPathBuilder([...this.sb, xpath]);
  }

  private appendLocalPath() {
       return new XPathBuilder([...this.sb, "."]);
  }
}


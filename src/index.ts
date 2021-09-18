import Filter, { FilterClbck } from "./filter";

/**
 * XPathHelper provides a simple and chainnable API to build complicated XPath queries without the hassle. 
 * After building your XPath query, call the method <code>toString()</code> to get the corresponding XPath string.
 */
export default class XPathHelper {
  private sb: Array<string>;

  constructor(currentPath?: Array<string>) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
      this.appendLocalPath();
    }
  }

  /**
   * Empty the current path.
   */
  public empty(): void {
    this.sb = new Array<string>();
    this.appendLocalPath();
  }

  /**
   * Returns the corresponding Xpath query.
   * @returns {string} The corresponding XPath query
   */
  public toString(): string {
    return this.sb.join("");
  }

  /************* General commands *************/

  /**
   * @summary Select the parent of the current element.
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getParent() {
    return new XPathHelper([...this.sb, "/.."]);
  }

  /**
   * @summary Select an element with an XPath selector <code>xpath</code>.
   * @param xpath
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElementByXpath(xpath: string): XPathHelper {
    return new XPathHelper([...this.sb, xpath]);
  }

  /************* Descendant axis *************
   * The descendant axis retrieves all nodes below the node in reference no matter the depth.
   *******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendant(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "//*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendant</code>.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElement(filterClbk: FilterClbck): XPathHelper {
    return this.getDescendant(filterClbk);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @param {string} tag
   * @param {FilterClbck} filterClbk
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "//" + tag + this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendantByTag</code>.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElementByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return this.getDescendantByTag(tag, filterClbk);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendantBySVGTag</code>.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElementBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return this.getDescendantBySVGTag(svgTag, filterClbk);
  }

  /************* Descendant-or-self axis *************
   * The descendant-or-self axis returns all nodes below the current node,
   * but also returns the node in reference.
   *******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantOrSelf(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantOrSelfByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getSVGDescendantOrSelfByTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Child axis *************
   * The child axis returns the nodes immediately below the node in reference.
   *******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code> immediately below the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChild(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, immediately below the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChildByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, immediately below the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChildBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Ancestor axis *************
   * The ancestor axis returns all the nodes that are ancestors, 
   * or the parent, and the parent's parent, and so on, to the node in reference.
   *****************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestor(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Ancestor-or-self axis *************
   * The ancestor-or-self axis returns all nodes that are ancestors, 
   * or the parent, and the parent's parent, and so on, including the node in reference.
   *************************************************/
  /**
   * @summary Select the node elements filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelf(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelfByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelfBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Following axis *************
   * The following axis selects all nodes no matter the depth, that are located on parent-level 
   * and who are also located after (following) its parent of the node in reference.
   ******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on parent-level 
   * and who are also located after (following) its parent of the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowing(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are located on parent-level and who are also located after (following) its parent of the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are located on parent-level and who are also located after (following) its parent of the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Following-sibling axis *************
   * The following-sibling axis selects all nodes that are located on the same level who are located after (following) the node in reference.
   **************************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSibling(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSiblingByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSiblingBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Preceding axis *************
   * The preceding axis selects all nodes no matter the depth, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   ******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on parent-level 
   * and who are also located before (preceding) its parent of the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPreceding(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /************* Preceding-sibling axis *************
   * The preceding axis selects all nodes that are located on the same level
   * who are also located before (preceding) the node in reference.
   **************************************************/
  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on the same level
   * who are also located before (preceding) the node in reference.
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSibling(filterClbk: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::*"+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} tag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSiblingByTag(tag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::" + tag + ""+ this.computeFilter(filterClbk)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} svgTag
   * @param {FilterClbck} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSiblingBySVGTag(svgTag: string, filterClbk?: FilterClbck): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filterClbk)]);
  }

  /**
   * Private methods
   */

  /**
   * Adds the local path.
   * @returns a new instance of XPathHelper with the local path appened.
   */
  private appendLocalPath() {
    return new XPathHelper([...this.sb, "."]);
  }

  private computeFilter(filterClbk?: FilterClbck): string {
    let suffix = "";
    if (filterClbk) {
      const expression = filterClbk(new Filter()).toString();
      suffix = (expression) !== "" ? "[ " + expression + " ]" : "";
    }
    return suffix;
  }
}


import Filter, { IFilter } from "./filter";

/**
 * XPathHelper provides a simple and chainnable API to build complicated XPath queries without the hassle. 
 * After building your XPath query, call the method <code>toString()</code> to get the corresponding XPath string.
 */
export default class XPathHelper {
  private sb: string[];

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
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendant(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "//*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendant</code>.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElement(filter: IFilter): XPathHelper {
    return this.getDescendant(filter);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "//" + tag + this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendantByTag</code>.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElementByTag(tag: string, filter?: IFilter): XPathHelper {
    return this.getDescendantByTag(tag, filter);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "//*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the node in reference no matter the depth.
   * @description This method is a synonym of <code>getDescendantBySVGTag</code>.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getElementBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return this.getDescendantBySVGTag(svgTag, filter);
  }

  /************* Descendant-or-self axis *************
   * The descendant-or-self axis returns all nodes below the current node,
   * but also returns the node in reference.
   *******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantOrSelf(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantOrSelfByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, below the current node, but also returns the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getDescendantOrSelfBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/descendant-or-self::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Child axis *************
   * The child axis returns the nodes immediately below the node in reference.
   *******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code> immediately below the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChild(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, immediately below the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChildByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, immediately below the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getChildBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Ancestor axis *************
   * The ancestor axis returns all the nodes that are ancestors, 
   * or the parent, and the parent's parent, and so on, to the node in reference.
   *****************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestor(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Ancestor-or-self axis *************
   * The ancestor-or-self axis returns all nodes that are ancestors, 
   * or the parent, and the parent's parent, and so on, including the node in reference.
   *************************************************/
  /**
   * @summary Select the node elements filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelf(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelfByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getAncestorOrSelfBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/ancestor-or-self::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Following axis *************
   * The following axis selects all nodes no matter the depth, that are located on parent-level 
   * and who are also located after (following) its parent of the node in reference.
   ******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on parent-level 
   * and who are also located after (following) its parent of the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowing(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>,
   * that are located on parent-level and who are also located after (following) its parent of the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>,
   * that are located on parent-level and who are also located after (following) its parent of the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Following-sibling axis *************
   * The following-sibling axis selects all nodes that are located on the same level who are located after (following) the node in reference.
   **************************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSibling(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSiblingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getFollowingSiblingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/following-sibling::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Preceding axis *************
   * The preceding axis selects all nodes no matter the depth, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   ******************************************/

  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on parent-level 
   * and who are also located before (preceding) its parent of the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPreceding(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on parent-level and who are also located before (preceding) its parent of the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
  }

  /************* Preceding-sibling axis *************
   * The preceding axis selects all nodes that are located on the same level
   * who are also located before (preceding) the node in reference.
   **************************************************/
  /**
   * @summary Select the node elements filtered by <code>filter</code>, that are located on the same level
   * who are also located before (preceding) the node in reference.
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSibling(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::*"+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the node elements with tag <code>tag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} tag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSiblingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::" + tag + ""+ this.computeFilter(filter)]);
  }

  /**
   * @summary Select the SVG node elements with SVG tag <code>svgTag</code> filtered by <code>filter</code>, 
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} svgTag
   * @param {IFilter} filter
   * @return {XPathHelper} returns a new instance of XPathHelper
   */
  public getPrecedingSiblingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/preceding-sibling::*[local-name() = '" + svgTag + "']"+ this.computeFilter(filter)]);
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

  private computeFilter(filter?: IFilter): string {
    let suffix = "";
    if (filter && !filter.isEmpty()) {
      const expression = filter.toString();
      suffix =  "[ " + expression + " ]";
    }
    return suffix;
  }
}

const filterInstance = new Filter()
Object.freeze(filterInstance);
export const filter = filterInstance;

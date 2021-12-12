import { EmptyFilter, IFilter } from "./filter";

/**
 * XPathHelper provides a simple and chainnable API to build complicated XPath queries without the hassle.
 * After building your XPath query, call the method ``toString()`` to get the corresponding XPath string.
 * @export
 * @class XPathHelper
 */
export class XPathHelper {
  private sb: string[];
  /**
   * Creates an instance of XPathHelper.
   * @param {Array<string>} [currentPath] current path
   * @memberof XPathHelper
   */
  constructor(currentPath?: string[]) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
      this.appendLocalPath();
    }
  }

  /**
   * Empties the current path.
   * @memberof XPathHelper
   */
  public empty(): void {
    this.sb = new Array<string>();
    this.appendLocalPath();
  }

  /**
   * Returns the corresponding Xpath query.
   * @returns {string} The corresponding XPath query
   * @memberof XPathHelper
   */
  public toString(): string {
    return this.sb.join("");
  }

  /************* General commands *************/

  /**
   * Selects the parent of the current element.
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getParent() {
    return new XPathHelper([...this.sb, "/.."]);
  }

  /**
   * Selects an element with an XPath selector ``xpath``.
   * @param {string} xpath - XPath expression
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getElementByXpath(xpath: string): XPathHelper {
    return new XPathHelper([...this.sb, xpath]);
  }

  /************* Descendant axis *************
   * The descendant axis retrieves all nodes below the node in reference no matter the depth.
   *******************************************/

  /**
   * Selects the nodes filtered by ``filter``, below the node in reference no matter the depth.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendant(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "//*" + this.computeFilter(filter)]);
  }

  /**
   * Selects the nodes filtered by ``filter``, below the node in reference no matter the depth.
   * @description This method is a synonym of ``getDescendant``.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getElement(filter: IFilter): XPathHelper {
    return this.getDescendant(filter);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``, below the node in reference no matter the depth.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendantByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "//" + tag + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``, below the node in reference no matter the depth.
   * @description This method is a synonym of ``getDescendantByTag``.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getElementByTag(tag: string, filter?: IFilter): XPathHelper {
    return this.getDescendantByTag(tag, filter);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``, below the node in reference no matter the depth.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendantBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "//*[local-name() = '" + svgTag + "']" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``, below the node in reference no matter the depth.
   * @description This method is a synonym of ``getDescendantBySVGTag``.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getElementBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return this.getDescendantBySVGTag(svgTag, filter);
  }

  /************* Descendant-or-self axis *************
   * The descendant-or-self axis returns all nodes below the current node,
   * but also returns the node in reference.
   *******************************************/

  /**
   * Selects the nodes filtered by ``filter``, below the current node, but also returns the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendantOrSelf(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/descendant-or-self::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``, below the current node, but also returns the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendantOrSelfByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/descendant-or-self::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``, below the current node, but also returns the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getDescendantOrSelfBySVGTag(
    svgTag: string,
    filter?: IFilter
  ): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/descendant-or-self::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Child axis *************
   * The child axis returns the nodes immediately below the node in reference.
   *******************************************/

  /**
   * Selects the nodes filtered by ``filter`` immediately below the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getChild(filter: IFilter): XPathHelper {
    return new XPathHelper([...this.sb, "/*" + this.computeFilter(filter)]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``, immediately below the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getChildByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``, immediately below the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getChildBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/*[local-name() = '" + svgTag + "']" + this.computeFilter(filter),
    ]);
  }

  /************* Ancestor axis *************
   * The ancestor axis returns all the nodes that are ancestors,
   * or the parent, and the parent's parent, and so on, to the node in reference.
   *****************************************/

  /**
   * Selects the nodes filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestor(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestorByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, to the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestorBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Ancestor-or-self axis *************
   * The ancestor-or-self axis returns all nodes that are ancestors,
   * or the parent, and the parent's parent, and so on, including the node in reference.
   *************************************************/
  /**
   * Selects the nodes filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestorOrSelf(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor-or-self::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestorOrSelfByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor-or-self::" + tag + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are ancestors, or the parent, and the parent's parent, and so on, including the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getAncestorOrSelfBySVGTag(
    svgTag: string,
    filter?: IFilter
  ): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/ancestor-or-self::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Following axis *************
   * The following axis selects all nodes no matter the depth, that are located on parent-level
   * and also after (following) its parent of the node in reference.
   ******************************************/

  /**
   * Selects the nodes filtered by ``filter``, that are located on parent-level
   * and also after (following) its parent of the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowing(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are located on parent-level and also after (following) its parent of the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are located on parent-level and also after (following) its parent of the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Following-sibling axis *************
   * The following-sibling axis selects all nodes that are located on the same level who are located after (following) the node in reference.
   **************************************************/

  /**
   * Selects the nodes filtered by ``filter``,
   * that are located on the same level who are located after (following) the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowingSibling(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following-sibling::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowingSiblingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following-sibling::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are located on the same level who are located after (following) the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getFollowingSiblingBySVGTag(
    svgTag: string,
    filter?: IFilter
  ): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/following-sibling::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Preceding axis *************
   * The preceding axis selects all nodes no matter the depth,
   * that are located on parent-level and also before (preceding) its parent of the node in reference.
   ******************************************/

  /**
   * Selects the nodes filtered by ``filter``, that are located on parent-level
   * and also before (preceding) its parent of the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPreceding(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are located on parent-level and also before (preceding) its parent of the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPrecedingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are located on parent-level and also before (preceding) its parent of the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPrecedingBySVGTag(svgTag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /************* Preceding-sibling axis *************
   * The preceding axis selects all nodes that are located on the same level
   * who are also located before (preceding) the node in reference.
   **************************************************/
  /**
   * Selects the nodes filtered by ``filter``, that are located on the same level
   * who are also located before (preceding) the node in reference.
   * @param {IFilter} filter - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPrecedingSibling(filter: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding-sibling::*" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the nodes with tag ``tag`` filtered by ``filter``,
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} tag - tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPrecedingSiblingByTag(tag: string, filter?: IFilter): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding-sibling::" + tag + "" + this.computeFilter(filter),
    ]);
  }

  /**
   * Selects the SVG nodes with SVG tag ``svgTag`` filtered by ``filter``,
   * that are located on the same level who are also located before (preceding) the node in reference.
   * @param {string} svgTag - SVG tag name
   * @param {IFilter} [filter] - filter object
   * @return {XPathHelper} returns a new instance of XPathHelper
   * @memberof XPathHelper
   */
  public getPrecedingSiblingBySVGTag(
    svgTag: string,
    filter?: IFilter
  ): XPathHelper {
    return new XPathHelper([
      ...this.sb,
      "/preceding-sibling::*[local-name() = '" +
        svgTag +
        "']" +
        this.computeFilter(filter),
    ]);
  }

  /**
   * Adds the local path.
   * @private
   * @returns a new instance of XPathHelper with the local path appened.
   * @memberof XPathHelper
   */
  private appendLocalPath() {
    return new XPathHelper([...this.sb, "."]);
  }

  /**
   * Adds the given filter to the current xpath expression.
   * @private
   * @param {IFilter} [filter]
   * @returns {string}
   * @memberof XPathHelper
   */
  private computeFilter(filter?: IFilter): string {
    let suffix = "";
    if (filter && !filter.isEmpty()) {
      const expression = filter.toString();
      suffix = "[" + expression + "]";
    }
    return suffix;
  }
}

export const filter = Object.freeze(new EmptyFilter());
export const xh = Object.freeze(new XPathHelper());


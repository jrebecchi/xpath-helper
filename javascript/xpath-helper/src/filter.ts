/**
 * The following EmptyFilter classes provide a simple, chainable and decomposable api
 * to create XPath filter expression
 */

/**
 * Interface providing the minimal methods that must implement an XPath EmptyFilter.
 * @export
 * @interface IFilter
 */
export interface IFilter {
  toString(): string;
  isEmpty(): boolean;
}

/**
 * XPath Filter containing a valid expression.
 * @class ValidExpressionFilter
 * @implements {IFilter}
 */
export class ValidExpressionFilter implements IFilter {
  /**
   * Array of string containing the different part of the filter expression.
   * @protected
   * @type {string[]}
   * @memberof ValidExpressionFilter
   */
  protected sb: string[];

  /**
   * Creates an instance of ValidExpressionFilter.
   * @param {string[]} [currentPath] current path
   * @memberof ValidExpressionFilter
   */
  constructor(currentPath?: string[]) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
    }
  }

  /**
   * Adds one or more filter expression to the current one with the AND logical operator.
   * @param {IFilter[]} filters List of filters that will be added with the AND logical operator
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression
   * @memberof ValidExpressionFilter
   */
  and(...filters: IFilter[]) {
    let expression = "";
    if (this.sb.length !== 0) {
      expression += " and ";
    }
    expression += "(";
    filters.map(
      (filter, i) =>
        (expression += addOpenrand(filter, " and ", i === filters.length - 1))
    );
    return new ValidExpressionFilter([...this.sb, expression, ")"]);
  }

  /**
   * Adds one or more filter expression to the current one with the OR logical operator.
   * @param {IFilter[]} filters List of filters that will be added with the OR logical operator
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression
   * @memberof ValidExpressionFilter
   */
  or(...filters: IFilter[]) {
    let expression = "";
    if (this.sb.length !== 0) {
      expression += " or ";
    }
    expression += "(";
    filters.map(
      (filter, i) =>
        (expression += addOpenrand(filter, " or ", i === filters.length - 1))
    );
    return new ValidExpressionFilter([...this.sb, expression, ")"]);
  }

  /**
   * Returns the EmptyFilter as a valid XPath filter expression.
   * @returns {string} a valid XPath filter expression.
   * @memberof ValidExpressionFilter
   */
  public toString(): string {
    return this.sb.join("");
  }

  /**
   * Empties the current path.
   * @memberof ValidExpressionFilter
   */
  public empty(): void {
    this.sb = new Array<string>();
  }

  /**
   * Returns true if filter is empty.
   * @returns {boolean} true if filter is empty.
   * @memberof ValidExpressionFilter
   */
  public isEmpty(): boolean {
    return this.sb.length === 0;
  }
}

/**
 * Empty XPath filter.
 * @export
 * @class EmptyFilter
 * @extends {ValidExpressionFilter}
 */
export class EmptyFilter extends ValidExpressionFilter {
  /**
   * Shortcut to design any attribute name
   * @static
   * @type {string}
   * @memberof EmptyFilter
   */
  public static ANY_ATTRIBUTE: string = "*";

  /**
   * Creates an instance of EmptyFilter.
   * @param {string[] } [currentPath] current path
   * @memberof EmptyFilter
   */
  constructor(currentPath?: string[]) {
    super(currentPath);
  }

  /**
   * Selects the nodes that have the attribute ``attribute``.
   * @param {string} attribute - attribute name
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  hasAttribute(attribute: string) {
    return new ValidExpressionFilter([...this.sb, "@" + attribute]);
  }

  /**
   * Selects the nodes with the attribute ``attribute`` containing the value ``value``.
   * @param attribute
   * @param value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   */
  attributeContains(attribute: string, value: string) {
    return new ValidExpressionFilter([
      ...this.sb,
      "contains(@" + attribute + ", " + replaceApostrophes(value) + ")"
    ]);
  }

  /**
   * Selects the nodes with the attribute ``attribute``, whose value equals ``value``.
   * @param {string} attribute - attribute name
   * @param {(string | number)} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeEquals(attribute: string, value: string | number) {
    return new ValidExpressionFilter([
      ...this.sb,
      "@" + attribute + "=" + replaceApostrophes(value) + ""
    ]);
  }

  /**
   * Selects the nodes with the attribute ``attribute``, whose value doesn't equal ``value``.
   * @param {string} attribute - attribute name
   * @param {(string | number)} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeNotEquals(attribute: string, value: string | number) {
    return new ValidExpressionFilter([
      ...this.sb,
      "@" + attribute + "!=" + replaceApostrophes(value) + ""
    ]);
  }

  /**
   * Selects the nodes with the attribute ``attribute``, whose value is less than ``value``.
   * @param {string} attribute - attribute name
   * @param {number} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeLessThan(attribute: string, value: number) {
    return new ValidExpressionFilter([...this.sb, "@" + attribute + "<" + value]);
  }

  /**
   * Selects the nodes with the attribute ``attribute``, whose value is less than or equal to ``value``.
   * @param {string} attribute - attribute name
   * @param {number} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeLessThanOrEqualTo(attribute: string, value: number) {
    return new ValidExpressionFilter([...this.sb, "@" + attribute + "<=" + value]);
  }

  /**
   * Selects the nodes with the attribute ``attribute``, whose value is greater than ``value``.
   * @param {string} attribute - attribute name
   * @param {number} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeGreaterThan(attribute: string, value: number) {
    return new ValidExpressionFilter([...this.sb, "@" + attribute + ">" + value]);
  }
  /**
   * Selects the nodes with the attribute ``attribute``, whose value is greater than or equal to ``value``.
   * @param {string} attribute - attribute name
   * @param {number} value - value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  attributeGreaterThanOrEqualTo(attribute: string, value: number) {
    return new ValidExpressionFilter([...this.sb, "@" + attribute + ">=" + value]);
  }
  /**
   * Selects the nodes containing the value ``value``.
   * @param {string} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueContains(value: string) {
    return new ValidExpressionFilter([
      ...this.sb,
      "text()[contains(., " + replaceApostrophes(value) + ")]"
    ]);
  }

  /**
   * Selects the nodes whose value equals ``value``.
   * @param {(string | number)} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueEquals(value: string | number) {
    return new ValidExpressionFilter([
      ...this.sb,
      "text() = " + replaceApostrophes(value) + ""
    ]);
  }

  /**
   * Selects the nodes with whose value doesn't equal ``value``.
   * @param {(string | number)} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueNotEquals(value: string | number) {
    return new ValidExpressionFilter([
      ...this.sb,
      "text() !=" + replaceApostrophes(value) + ""
    ]);
  }

  /**
   * Selects the nodes whose value is less than ``value``.
   * @param {number} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueLessThan(value: number) {
    return new ValidExpressionFilter([...this.sb, "text() <" + value]);
  }

  /**
   * Selects the nodes whose value is less than or equal to ``value``.
   * @param {number} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueLessThanOrEqualTo(value: number) {
    return new ValidExpressionFilter([...this.sb, "text() <=" + value]);
  }

  /**
   * Selects the nodes whose value is greater than ``value``.
   * @param {number} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueGreaterThan(value: number) {
    return new ValidExpressionFilter([...this.sb, "text() >" + value]);
  }

  /**
   * Selects the nodes whose value is greater than or equal to ``value``.
   * @param {number} value - node value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  valueGreaterThanOrEqualTo(value: number) {
    return new ValidExpressionFilter([...this.sb, "text() >=" + value]);
  }

  /**
   * Selects the node element who is positioned at the ``index`` position in its parent children list.
   * @param {number} index - index value
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  get(index: number) {
    return new ValidExpressionFilter([...this.sb, "" + index]);
  }

  /**
   * Selects the node element who is positioned first in its parent children list.
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  getFirst() {
    return new ValidExpressionFilter([...this.sb, "1"]);
  }

  /**
   * Selects the node element who is positioned last in its parent children list.
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  getLast() {
    return new ValidExpressionFilter([...this.sb, "last()"]);
  }

  /**
   * Reverses the filter ``filter``. Returns true when the filter returns false and true when the filter returns false.
   * @param {IFilter} filter - filter object
   * @returns {ValidExpressionFilter} a new instance of ValidExpressionFilter with the newly formed expression.
   * @memberof EmptyFilter
   */
  not(filter: IFilter) {
    return new ValidExpressionFilter([...this.sb, "not( " + addOpenrand(filter) + " )"]);
  }
}

/**
 * Adds operand between filters
 * @param {IFilter} filter - filter object
 * @param {string} [separator=""] - separator to add after expression 
 * @param {boolean} [isLast=true] - true if this operand is the last of the conditional expression
 * @returns {string}
 */
function addOpenrand(filter: IFilter, separator = "", isLast = true): string {
  let suffix = "";
  if (filter && !filter.isEmpty()) {
    const expression = filter.toString();
    suffix = expression;
    if (!isLast) {
      suffix += separator;
    }
  }
  return suffix;
}

/**
 * Treats the presence of apostrophes so it doesn't break the XPath filter expression.
 * @param {(string | number)} input - input value
 * @returns {string} XPath filter expression with apostrophes handled.
 */
function replaceApostrophes(input: string | number) {
  if (typeof input === "number") {
    return input;
  }
  if (input.includes("'")) {
    let prefix: string = "";
    const elements: string[] = input.split("'");
    let output: string = "concat(";

    for (const s of elements) {
      output += prefix + "'" + s + "'";
      prefix = ',"\'",';
    }

    output += ")";
    return output;
  } else {
    return "'" + input + "'";
  }
}

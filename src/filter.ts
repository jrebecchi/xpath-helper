/**
 * The following Filter classes provide a simple, chainable and decomposable api
 * to create XPath filter expression
 */
 
 /**
  * @interface providing the minimal methods that must implement an XPath Filter.
  */
export interface IFilter {
  toString(): string;
  isEmpty(): boolean;
}

/**
 * @class XPath Filter containing a valid expression
 */
export class FilledFilter implements IFilter {
  protected sb: string[];

  constructor(currentPath?: Array<string>) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
    }
  }
  
  /**
   * @summary Add one or more filter expression to the current one with the AND logical operator.
   * @returns {FilledFilter} a new instance of FilledFilter with the newly formed expression
   */
  and(...filters: IFilter[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " and "
    }
    expression += "("
    filters.map((filter, i) => expression += addOpenrand(filter, " and ", i === filters.length - 1));
    return new FilledFilter([...this.sb, expression, ")"]);
  }
  
  /**
   * @summary Add one or more filter expression to the current one with the OR logical operator.
   * @returns {FilledFilter} a new instance of FilledFilter with the newly formed expression
   */
  or(...filters: IFilter[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " or "
    }
    expression += "("
    filters.map((filter, i) => expression += addOpenrand(filter, " or ", i === filters.length - 1));
    return new FilledFilter([...this.sb, expression, ")"]);
  }
  
  /**
   * @summary Returns the Filter as a valid XPath filter expression.
   * @returns {string} a valid XPath filter expression.
   */
  public toString(): string {
    return this.sb.join("");
  }
  
  /**
   * @summary Empty the current path.
   */
  public empty(): void {
    this.sb = new Array<string>();
  }
  
  /**
   * @summary Returns true if filter is empty.
   * @returns {boolean} true if filter is empty.
   */
  public isEmpty(): boolean {
    return this.sb.length == 0;
  }
}

/**
 * @class Empty XPath filter.
 */
export default class Filter extends FilledFilter {

  public static ANY_ATTRIBUTE: string = "*"
  public static ANY_CHILD_NODE: string = "."

  constructor(currentPath?: Array<string>) {
    super(currentPath)
  }
  
  /**
   * @summary Filter elements that contain the passed <code>attribute</code>
   * @param {string} attribute name
   * @returns {FilledFilter} a new instance of FilledFilter with the newly formed expression
   */
  hasAttribute(attribute: string) {
    return new FilledFilter([...this.sb, "@" + attribute]);
  }

  attributeContains(attribute: string, value: string) {
    return new FilledFilter([...this.sb, "contains(@" + attribute + ", " + replaceApostrophes(value) + ")"]);
  }

  attributeEquals(attribute: string, value: string | number) {
    return new FilledFilter([...this.sb, "@" + attribute + "=" + replaceApostrophes(value) + ""]);
  }

  attributeNotEquals(attribute: string, value: string | number) {
    return new FilledFilter([...this.sb, "@" + attribute + "!=" + replaceApostrophes(value) + ""]);
  }

  attributeLessThan(attribute: string, value: number) {
    return new FilledFilter([...this.sb, "@" + attribute + "<" + value]);
  }

  attributeLessThanOrEqualsTo(attribute: string, value: number) {
    return new FilledFilter([...this.sb, "@" + attribute + "<=" + value]);
  }

  attributeGreaterThan(attribute: string, value: number) {
    return new FilledFilter([...this.sb, "@" + attribute + ">" + value]);
  }

  attributeGreaterThanOrEqualsTo(attribute: string, value: number) {
    return new FilledFilter([...this.sb, "@" + attribute + ">=" + value]);
  }

  valueContains(value: string) {
    return new FilledFilter([...this.sb, "text()[contains(., " + replaceApostrophes(value) + ")]"]);
  }

  valueEquals(value: string | number) {
    return new FilledFilter([...this.sb, "text() = " + replaceApostrophes(value) + ""]);
  }

  valueNotEquals(value: string | number) {
    return new FilledFilter([...this.sb, "text() !=" + replaceApostrophes(value) + ""]);
  }

  valueLessThan(value: number) {
    return new FilledFilter([...this.sb, "text() <" + value]);
  }

  valueLessThanOrEqualsTo(value: number) {
    return new FilledFilter([...this.sb, "text() <=" + value]);
  }

  valueGreaterThan(value: number) {
    return new FilledFilter([...this.sb, "text() >" + value]);
  }

  valueGreaterThanOrEqualsTo(value: number) {
    return new FilledFilter([...this.sb, "text() >=" + value]);
  }

  get(index: number) {
    return new FilledFilter([...this.sb, "" + index]);
  }

  getFirst() {
    return new FilledFilter([...this.sb, "1"]);
  }

  getLast() {
    return new FilledFilter([...this.sb, "last()"]);
  }

  not(filter: IFilter) {
    return new FilledFilter([...this.sb, "not( " + addOpenrand(filter) + " )"]);
  }
}

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

function replaceApostrophes(input: string | number) {
  if (typeof input === 'number') {
    return input;
  }
  if (input.includes("'")) {
    let prefix: string = "";
    let elements: string[] = input.split("'");

    let output: string = "concat(";

    for (const s of elements) {
      output += prefix + "'" + s + "'";
      prefix = ",\"'\",";
    }

    if (output.endsWith(",")) {
      output = output.substring(0, output.length - 2);
    }

    output += ")";

    return output;
  }
  else { 
    return "'" + input + "'";
  }
}

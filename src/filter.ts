export type FilterClbck = (filter: Filter) => Filter;

export class FilterWithClosedExpression {
  protected sb: Array<string>;

  constructor(currentPath?: Array<string>) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
    }
  }

  and(...filterClbks: FilterClbck[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " and "
    }
    filterClbks.map((filterClbk, i) => expression += addOpenrand(filterClbk, " and ", i === filterClbks.length - 1));
    return new FilterWithClosedExpression([...this.sb, expression]);
  }

  or(...filterClbks: FilterClbck[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " or "
    }
    filterClbks.map((filterClbk, i) => expression += addOpenrand(filterClbk, " or ", i === filterClbks.length - 1));
    return new FilterWithClosedExpression([...this.sb, expression]);
  }

  public toString(): string {
    return this.sb.join("");
  }
}


export default class Filter extends FilterWithClosedExpression {

  public static ANY_ATTRIBUTE: string = "*"
  public static ANY_CHILD_NODE: string = "."

  constructor(currentPath?: Array<string>) {
    super(currentPath)
  }

  hasAttribute(attribute: string) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute]);
  }

  attributeContains(attribute: string, value: string) {
    return new FilterWithClosedExpression([...this.sb, "contains(@" + attribute + ", '" + value + "')"]);
  }

  attributeEquals(attribute: string, value: string | number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + "='" + value + "'"]);
  }

  attributeNotEquals(attribute: string, value: string | number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + "!='" + value + "'"]);
  }

  attributeLessThan(attribute: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + "<" + value]);
  }

  attributeLessThanOrEqualsTo(attribute: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + "<=" + value]);
  }

  attributeGreaterThan(attribute: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + ">" + value]);
  }

  attributeGreaterThanOrEqualsTo(attribute: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, "@" + attribute + ">=" + value]);
  }

  valueContains(value: string) {
    return new FilterWithClosedExpression([...this.sb, "text()[contains(., '" + value + "')]"]);
  }

  valueEquals(value: string) {
    return new FilterWithClosedExpression([...this.sb, "text() = '" + value + "'"]);
  }

  valueNotEquals(value: string | number) {
    return new FilterWithClosedExpression([...this.sb, "text() !='" + value + "'"]);
  }

  valueLessThan(value: number) {
    return new FilterWithClosedExpression([...this.sb, "text() <" + value]);
  }

  valueLessThanOrEqualsTo(value: number) {
    return new FilterWithClosedExpression([...this.sb, "text() <=" + value]);
  }

  valueGreaterThan(value: number) {
    return new FilterWithClosedExpression([...this.sb, "text() >" + value]);
  }

  valueGreaterThanOrEqualsTo(value: number) {
    return new FilterWithClosedExpression([...this.sb, "text() >=" + value]);
  }

  get(index: number) {
    return new FilterWithClosedExpression([...this.sb, "" + index]);
  }

  getFirst() {
    return new FilterWithClosedExpression([...this.sb, "1"]);
  }

  getLast() {
    return new FilterWithClosedExpression([...this.sb, "last()"]);
  }

  not(filterClbk: FilterClbck) {
    return new FilterWithClosedExpression([...this.sb, "not( " + addOpenrand(filterClbk) + " )"]);
  }

  public empty(): void {
    this.sb = new Array<string>();
  }
}

function addOpenrand(filterClbk: FilterClbck, separator = "", isLast = true): string {
  let suffix = "";
  if (filterClbk) {
    const expression = filterClbk(new Filter()).toString();
    if (expression !== "") {
      suffix = expression;
      if (!isLast) {
        suffix += separator;
      }
    }
  }
  return suffix;
}
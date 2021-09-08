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

  and(...filters: FilterClbck[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += "and "
    }
    filters.map(filter => expression += filter.toString());
    return new FilterWithClosedExpression([...this.sb, expression]);
  }

  or(...filters: FilterClbck[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += "or "
    }
    filters.map(filter => expression += filter.toString());
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

  haschildNode(tag: string) {
    return new FilterWithClosedExpression([...this.sb, tag]);
  }

  childNodeValueContains(tag: string, text: string) {
    return new FilterWithClosedExpression([...this.sb, "contains(" + tag + ", '" + text + "')"]);
  }

  childNodeValueEquals(tag: string, text: string) {
    return new FilterWithClosedExpression([...this.sb, tag + " = '" + text + "'"]);
  }

  childNodeValueNotEquals(tag: string, value: string | number) {
    return new FilterWithClosedExpression([...this.sb, tag + " != '" + value + "'"]);
  }

  childNodeValueLessThan(tag: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, tag + " < " + value]);
  }

  childNodeValueLessThanOrEqualsTo(tag: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, tag + " <= " + value]);
  }

  childNodeValueGreaterThan(tag: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, tag + " > " + value]);
  }

  childNodeValueGreaterThanOrEqualsTo(tag: string, value: number) {
    return new FilterWithClosedExpression([...this.sb, tag + " >= " + value]);
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

  not(filter: FilterClbck) {
    return new FilterWithClosedExpression([...this.sb, "not( " + filter.toString() + " )"]);
  }

  public empty(): void {
    this.sb = new Array<string>();
  }
}
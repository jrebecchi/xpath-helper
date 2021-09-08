export type FilterClbck = (filter: Filter) => Filter;

export class UneditableFilter {
  protected sb: Array<string>;

  constructor(currentPath?: Array<string>) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
    }
  }

  and(...filters: FilterClbck[]) {
    return new UneditableFilter([...this.sb, ""]);
  }

  or(...filters: FilterClbck[]) {
    return new UneditableFilter([...this.sb, ""]);
  }

  public toString(): string {
    return this.sb.join("");
  }
}


export default class Filter extends UneditableFilter {

  public static ANY_ATTRIBUTE: string = "*"
  public static ANY_CHILD_NODE: string = "."

  constructor(currentPath?: Array<string>) {
    super(currentPath)
  }

  hasAttribute(attribute: string) {
    return new UneditableFilter([...this.sb, "@" + attribute]);
  }

  attributeContains(attribute: string, value: string) {
    return new UneditableFilter([...this.sb, "contains(@" + attribute + ", '" + value + "')"]);
  }

  attributeEquals(attribute: string, value: string | number) {
    return new UneditableFilter([...this.sb, "@" + attribute + "='" + value + "'"]);
  }

  attributeNotEquals(attribute: string, value: string | number) {
    return new UneditableFilter([...this.sb, "@" + attribute + "!='" + value + "'"]);
  }

  attributeLessThan(attribute: string, value: number) {
    return new UneditableFilter([...this.sb, "@" + attribute + "<" + value]);
  }

  attributeLessThanOrEqualsTo(attribute: string, value: number) {
    return new UneditableFilter([...this.sb, "@" + attribute + "<=" + value]);
  }

  attributeGreaterThan(attribute: string, value: number) {
    return new UneditableFilter([...this.sb, "@" + attribute + ">" + value]);
  }

  attributeGreaterThanOrEqualsTo(attribute: string, value: number) {
    return new UneditableFilter([...this.sb, "@" + attribute + ">=" + value]);
  }

  valueContains(value: string) {
    return new UneditableFilter([...this.sb, "text()[contains(., '" + value + "')]"]);
  }

  valueEquals(value: string) {
    return new UneditableFilter([...this.sb, "text() = '" + value + "'"]);
  }

  valueNotEquals(value: string | number) {
    return new UneditableFilter([...this.sb, "text() !='" + value + "'"]);
  }

  valueLessThan(value: number) {
    return new UneditableFilter([...this.sb, "text() <" + value]);
  }

  valueLessThanOrEqualsTo(value: number) {
    return new UneditableFilter([...this.sb, "text() <=" + value]);
  }

  valueGreaterThan(value: number) {
    return new UneditableFilter([...this.sb, "text() >" + value]);
  }

  valueGreaterThanOrEqualsTo(value: number) {
    return new UneditableFilter([...this.sb, "text() >=" + value]);
  }

  haschildNode(tag: string) {
    return new UneditableFilter([...this.sb, tag]);
  }

  childNodeValueContains(tag: string, text: string) {
    return new UneditableFilter([...this.sb, "contains(" + tag + ", '" + text + "')"]);
  }

  childNodeValueEquals(tag: string, text: string) {
    return new UneditableFilter([...this.sb, tag + " = '" + text + "'"]);
  }

  childNodeValueNotEquals(tag: string, value: string | number) {
    return new UneditableFilter([...this.sb, tag + " != '" + value + "'"]);
  }

  childNodeValueLessThan(tag: string, value: number) {
    return new UneditableFilter([...this.sb, tag + " < " + value]);
  }

  childNodeValueLessThanOrEqualsTo(tag: string, value: number) {
    return new UneditableFilter([...this.sb, tag + " <= " + value]);
  }

  childNodeValueGreaterThan(tag: string, value: number) {
    return new UneditableFilter([...this.sb, tag + " > " + value]);
  }

  childNodeValueGreaterThanOrEqualsTo(tag: string, value: number) {
    return new UneditableFilter([...this.sb, tag + " >= " + value]);
  }

  get(index: number) {
    return new UneditableFilter([...this.sb, "" + index]);
  }

  getFirst() {
    return new UneditableFilter([...this.sb, "1"]);
  }

  getLast() {
    return new UneditableFilter([...this.sb, "last()"]);
  }

  not(filter: FilterClbck) {
    return new UneditableFilter([...this.sb, ""]);
  }

  public empty(): void {
    this.sb = new Array<string>();
  }
}
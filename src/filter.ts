export interface Filter {
  toString(): string;
  isEmpty(): boolean;
}

export class FilledFilter implements Filter{
  protected sb: string[];

  constructor(currentPath?: Array<string>) {
    if (currentPath) {
      this.sb = currentPath;
    } else {
      this.sb = new Array<string>();
    }
  }

  and(...filters: Filter[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " and "
    }
    filters.map((filter, i) => expression += addOpenrand(filter, " and ", i === filters.length - 1));
    return new FilledFilter([...this.sb, expression]);
  }

  or(...filters: Filter[]) {
    let expression = "";
    if (this.sb.length != 0) {
      expression += " or "
    }
    filters.map((filter, i) => expression += addOpenrand(filter, " or ", i === filters.length - 1));
    return new FilledFilter([...this.sb, expression]);
  }

  public toString(): string {
    return this.sb.join("");
  }

  public empty(): void {
    this.sb = new Array<string>();
  }

  public isEmpty(): boolean {
    return this.sb.length == 0;
  }
}


export default class EmptyFilter extends FilledFilter {

  public static ANY_ATTRIBUTE: string = "*"
  public static ANY_CHILD_NODE: string = "."

  constructor(currentPath?: Array<string>) {
    super(currentPath)
  }

  hasAttribute(attribute: string) {
    return new FilledFilter([...this.sb, "@" + attribute]);
  }

  attributeContains(attribute: string, value: string) {
    return new FilledFilter([...this.sb, "contains(@" + attribute + ", '" + value + "')"]);
  }

  attributeEquals(attribute: string, value: string | number) {
    return new FilledFilter([...this.sb, "@" + attribute + "='" + value + "'"]);
  }

  attributeNotEquals(attribute: string, value: string | number) {
    return new FilledFilter([...this.sb, "@" + attribute + "!='" + value + "'"]);
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
    return new FilledFilter([...this.sb, "text()[contains(., '" + value + "')]"]);
  }

  valueEquals(value: string) {
    return new FilledFilter([...this.sb, "text() = '" + value + "'"]);
  }

  valueNotEquals(value: string | number) {
    return new FilledFilter([...this.sb, "text() !='" + value + "'"]);
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

  not(filter: Filter) {
    return new FilledFilter([...this.sb, "not( " + addOpenrand(filter) + " )"]);
  }
}

function addOpenrand(filter: Filter, separator = "", isLast = true): string {
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

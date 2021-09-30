import XPathHelper, { filter } from '../src/index'
import * as xpath from 'xpath';
import { DOMParser } from 'xmldom';
import * as fs from 'fs';

let findByXpath: (path: string) => Node | null;
beforeEach(async function () {
  const file = fs.readFileSync('./test/index.html');
  const doc = new DOMParser().parseFromString(file.toString());
  findByXpath = (path) => xpath.evaluate(path, doc, null, 9, null).singleNodeValue
});

describe('Elaborated cases', () => {
  it('- using or/and operators ', () => {
    const liPath = new XPathHelper()
      .getElementByTag('a')
      .getAncestorByTag('ul')
      .getElementByTag('li',
        filter.or(
          filter.and(
            filter.valueContains('uses'),
            filter.valueContains('awesome')
          ),
          filter.and(
            filter.valueContains('thebestmotherfudging'),
            filter.valueContains('nginx')
          )
        )
      )
    const li = findByXpath(liPath.toString());
    expect(li).not.toBeNull();
    expect(li?.textContent?.includes("awesome")).toBeTruthy();
  });
  it('- testing or/and operator priority', () => {
    const liPath = new XPathHelper()
      .getElementByTag('li',
        filter.and(
          filter.or(
            filter.valueContains('JavaScript'),
            filter.valueContains('wordthatdoesntexists')
          ),
          filter.valueContains('Freaks')
        )
      );
    const li = findByXpath(liPath.toString());
    console.log(liPath.toString())
    console.log(li?.textContent);
    expect(li).not.toBeNull();
    expect(li?.textContent?.includes("Freaks")).toBeTruthy();
  });
});

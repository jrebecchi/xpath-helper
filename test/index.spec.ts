import { DOMWindow, JSDOM } from 'jsdom';
let page: DOMWindow;
let getElementByXpath: (path: string) => Node | null;

beforeEach(async function () {
  page = await (await JSDOM.fromFile('./test/index.html')).window;
  getElementByXpath = function (path) {
    return page.document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
});
describe('Simple xpath selector', () => {
  it('should select element with getElement... functions', () => {
    expect(page).toBeDefined();
    console.log(getElementByXpath)
  });
});

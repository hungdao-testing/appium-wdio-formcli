import { $, driver } from "@wdio/globals";

async function getRectBoundInAndroid(selector: string) {
  const boudAttrs = await $(selector).getAttribute("bounds");
  const [left, top, right, bottom] = boudAttrs
    .replace("][", ",")
    .replace("[", "")
    .replace("]", "")
    .split(",");

  const rect  = [left, top, right, bottom].map((el) => parseInt(el));
  return {
    left: rect[0],
    top: rect[1],
    right: rect[2],
    bottom: rect[3],
    width: Math.abs(rect[2] - rect[0]),
    height: Math.abs(rect[3] - rect[1]),

  }
}

async function getRectBoundInIos(selector: string) {
  const {
    x: left,
    y: top,
    width,
    height,
  } = JSON.parse(await $(selector).getAttribute("rect"));

  const right = parseInt(width) + parseInt(left);
  const bottom = parseInt(height) + parseInt(top);

  return {
    left: parseInt(left),
    top: parseInt(top),
    right,
    bottom,
    width,
    height
  };
  //   return [parseInt(left), parseInt(top), right, bottom];
}

/**
 *
 * @param selector
 * @returns [left, top, right, bottom] of an element
 */
async function getBoundOfElement(selector: string) {
  return driver.isAndroid
    ? getRectBoundInAndroid(selector)
    : getRectBoundInIos(selector);
}

export const elementHelper = {
  getBoundOfElement,
};

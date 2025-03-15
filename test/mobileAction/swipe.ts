import { $, driver } from "@wdio/globals";
import { SwipeOptions } from "webdriverio";
import { elementHelper } from "../helpers/element";

async function swipeUntilCondition(
  asyncCond: (...args: any[]) => Promise<boolean>,
  swipeOpt: SwipeOptions
) {
  while (!(await asyncCond())) {
    await driver.swipe({
      ...swipeOpt,
    });
    driver.pause(200);
  }
}

async function swipeUntilSeeElement(element: string, swipeOpt: SwipeOptions) {
  if (!swipeOpt.direction) return;
  await swipeUntilCondition($(element).isDisplayed, swipeOpt);
}

async function swipeVerticallyByCoordUntilSeeElement(
  dropdownElment: string,
  targetEl: string,
  swipeOpt: SwipeOptions
) {
  const { left, top, right, bottom } = await elementHelper.getBoundOfElement(
    dropdownElment
  );

  const width = Math.abs(right - left);
  const height = Math.abs(top - bottom);

  const xPointCouldBeTouchToScroll = left + width / 2;
  const yTopPointOfDropdown = top;
  const yEndPointOfDropdown = height / 2;

  const nailPoint1 = {
    x: xPointCouldBeTouchToScroll,
    y: yTopPointOfDropdown,
  };

  const nailPoint2 = {
    x: xPointCouldBeTouchToScroll,
    y: yEndPointOfDropdown,
  };

  const from = swipeOpt.direction == "down" ? nailPoint1 : nailPoint2;
  const to = swipeOpt.direction == "down" ? nailPoint2 : nailPoint1;

  await swipeUntilSeeElement(targetEl, {
    ...swipeOpt,
    from: from,
    to: to,
    percent: swipeOpt.percent ?? 0.5,
    duration: 500,
  });
}

function setVerticalDirectionBy(from: number, to: number) {
  if (from > to) {
    return "down";
  } else if (from < to) {
    return "up";
  } else {
    return;
  }
}

function setHorizotalDirectionBy(from: number, to: number) {
  if (from > to) {
    return "left";
  } else if (from < to) {
    return "right";
  } else {
    return;
  }
}
export const swipeAction = {
  swipeUntilSeeElement,
  setHorizotalDirectionBy,
  setVerticalDirectionBy,
  swipeVerticallyByCoordUntilSeeElement,
  swipeUntilCondition,
};

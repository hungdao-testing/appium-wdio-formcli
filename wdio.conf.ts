import * as os from "os";
import { driver } from "@wdio/globals";

const ANDROID_CAP = {
  "appium:platformName": "Android",
  "wdio:maxInstances": 1,
  "appium:platformVersion": "15.0",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Pixel 7a API",
  "appium:newCommandTimeout": 300,
  "appium:noReset": false,
  "appium:app": "./resources/formscli_android.apk",
  "appium:maxTypingFrequency": 30, // delay sending key stroke
  "appium:isHeadless": true,
};

const IOS_CAP = {
  "appium:platformName": "iOS",
  "wdio:maxInstances": 1,
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 15 Pro",
  "appium:newCommandTimeout": 300,
  "appium:platformVersion": "17.5",
  "appium:noReset": false,
  "appium:app": "./resources/formscli_ios.zip",
  "appium:maxTypingFrequency": 30, // delay sending key stroke
  "appium:isHeadless": true,
};

export const config: WebdriverIO.Config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  injectGlobals: false,
  port: 4723,

  specs: ["./test/specs/**/*.ts"],
  // Patterns to exclude.
  exclude: ["node_modules/"],

  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://saucelabs.com/platform/platform-configurator
  //
  capabilities: [
    {
      ...ANDROID_CAP,
    },
    {
      ...IOS_CAP,
    },
  ],

  logLevel: "info",

  bail: 0,

  waitforTimeout: 120000,
  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: [
    [
      "appium",
      {
        // This will use the globally installed version of Appium
        // command: "appium",
        args: {
          // This is needed to tell Appium that we can execute local ADB commands
          // and to automatically download the latest version of ChromeDriver
          relaxedSecurity: true,
          // Write the Appium logs to a file in the root of the directory
          log: "./logs/appium.log",
        },
      },
    ],
  ],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,

        reportedEnvironmentVars: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (error) {
      await driver.takeScreenshot();
    }
  },
  onComplete: function () {},
};

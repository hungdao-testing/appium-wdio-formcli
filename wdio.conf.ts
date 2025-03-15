const ANDROID_CAP = {
  "appium:platformName": "Android",
  "wdio:maxInstances": 1,
  "appium:platformVersion": "15.0",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Pixel 7a API",
  "appium:newCommandTimeout": 240,
  "appium:noReset": false,
  "appium:app": "./resources/formscli_android.apk",
};

const IOS_CAP = {
  "appium:platformName": "iOS",
  "wdio:maxInstances": 1,
  "appium:automationName": "XCUITest",
  "appium:deviceName": "iPhone 15 Pro",
  "appium:newCommandTimeout": 240,
  "appium:platformVersion": "17.5",
  "appium:noReset": false,
  "appium:app": "./resources/formscli_ios.zip",
  "appium:maxTypingFrequency": 30 // delay sending key stroke 
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
      ...IOS_CAP,
    },
  ],

  logLevel: "info",

  bail: 0,

  waitforTimeout: 20000,
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

  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};

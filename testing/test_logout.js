// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Logout', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Logout', async function() {
    // Test name: Logout
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1634x1324 | 
    await driver.manage().window().setRect({ width: 1634, height: 1324 })
    // 3 | click | css=.MuiSvgIcon-fontSizeLarge | 
    await driver.findElement(By.css(".MuiSvgIcon-fontSizeLarge")).click()
    // 4 | click | xpath=//div[@id='menu-appbar']/div[3]/ul/li/a | 
    await driver.findElement(By.xpath("//div[@id=\'menu-appbar\']/div[3]/ul/li/a")).click()
  })
})
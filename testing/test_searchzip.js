// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Search Zip', function() {
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
  it('Search Zip', async function() {
    // Test name: Search Zip
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1646x1340 | 
    await driver.manage().window().setRect({ width: 1646, height: 1340 })
    // 3 | click | xpath=//div[@id='root']/div/span/header/div/div/a | 
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/span/header/div/div/a")).click()
    // 4 | click | id=search-zip | 
    await driver.findElement(By.id("search-zip")).click()
    // 5 | type | id=search-zip | 95819
    await driver.findElement(By.id("search-zip")).sendKeys("95819")
    // 6 | click | css=.MuiButton-root | 
    await driver.findElement(By.css(".MuiButton-root")).click()
  })
})
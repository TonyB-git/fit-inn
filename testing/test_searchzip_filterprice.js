// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Filter Price', function() {
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
  it('Filter Price', async function() {
    // Test name: Filter Price
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1630x1320 | 
    await driver.manage().window().setRect({ width: 1630, height: 1320 })
    // 3 | click | xpath=//div[@id='root']/div/span/header/div/div/a | 
    await driver.findElement(By.xpath("//div[@id=\'root\']/div/span/header/div/div/a")).click()
    // 4 | click | id=search-zip | 
    await driver.findElement(By.id("search-zip")).click()
    // 5 | type | id=search-zip | 95819
    await driver.findElement(By.id("search-zip")).sendKeys("95819")
    // 6 | click | css=.MuiButton-root | 
    await driver.findElement(By.css(".MuiButton-root")).click()
    // 7 | click | id=max-price | 
    await driver.findElement(By.id("max-price")).click()
    // 8 | type | id=max-price | 10
    await driver.findElement(By.id("max-price")).sendKeys("10")
  })
})
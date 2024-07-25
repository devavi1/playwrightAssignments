const { test, expect } = require("@playwright/test");
const { Console } = require("console");

test("login functionally check-playwrightAssignment1", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("#login-button").click();
  await expect(
    page.locator('//*[@id = "header_container"]/div[2]/span')
  ).toHaveText("Products");
});

test("validate error state-playwrightAssignment2", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await expect(page).toHaveTitle("DEMOQA");
  await page.click("//div[@class='category-cards']/div[1]/div[1]");
  await page.click(
    "//div[@class='element-list collapse show']//li[@id='item-0']"
  );
  await page.locator("//input[@id='userName']").fill("avishek15");
  await page.locator("//input[@id='userEmail']").fill("amp@com");
  await page.locator("//textarea[@id='currentAddress']").fill("Kolkata");
  await page.locator("//textarea[@id='permanentAddress']").fill("Kolkata");
  await page.click("//button[@id='submit']");

  let maxAttempts = 2;
  let attempt = 0;
  let emailFieldClass;
  const exampleEmail = "abc@example.com";
  do {
    const emailField = await page.$("//input[@id='userEmail']");
    emailFieldClass = await emailField.getAttribute("class");
    attempt++;
  } while (attempt < maxAttempts);
  if (emailFieldClass.includes("error")) {
    console.log(
      "Invalid email input, please check your email, That should match this-> " +
        exampleEmail +
        " format"
    );
  } else {
    console.log("Valid email input");
  }
});

test("validate given values-playwrightAssignment3", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await expect(page).toHaveTitle("DEMOQA");

  const name = "Avishek";
  const email = "amp@gmail.com";
  const cAddress = "Kolata";
  const pAddress = "Kolata";

  await page.click("//div[@class='category-cards']/div[1]/div[1]");
  await page.click(
    "//div[@class='element-list collapse show']//li[@id='item-0']"
  );
  await page.locator("//input[@id='userName']").fill(name);
  await page.locator("//input[@id='userEmail']").fill(email);
  await page.locator("//textarea[@id='currentAddress']").fill(cAddress);
  await page.locator("//textarea[@id='permanentAddress']").fill(pAddress);
  await page.click("//button[@id='submit']");

  await page.waitForSelector("//div[@id='output']");
  const displayedName = await page.textContent("//p[@id='name']");
  const displayedEmail = await page.textContent("//p[@id='email']");
  const displayedCurrentAddress = await page.textContent(
    "//p[@id='currentAddress']"
  );
  const displayedPermanentAddress = await page.textContent(
    "//p[@id='permanentAddress']"
  );

  expect(displayedName.replace("Name:", "").trim()).toBe(name);
  expect(displayedEmail.replace("Email:", "").trim()).toBe(email);
  expect(displayedCurrentAddress.replace("Current Address :", "").trim()).toBe(
    cAddress
  );
  expect(
    displayedPermanentAddress.replace("Permananet Address :", "").trim()
  ).toBe(pAddress);
});

test("google page locators validation", async ({page}) => {
 await page.goto("https://www.google.com/");
 await page.hover("img[alt = 'Google']");
 await page.hover("a[aria-label='Gmail ']");
 await page.hover("a[aria-label='Search for Images ']");
 await page.hover("a[aria-label='Search Labs']");
 await page.hover("a[aria-label='Google apps']");
 
});
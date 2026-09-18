// const { test, expect } = require('@playwright/test');

// test('Verify example domain heading and title', async ({ page }) => {
//   // 1. Navigate to the website
//   await page.goto('https://example.com');

//   // 2. Assert the browser window title contains "Example Domain"
//   await expect(page).toHaveTitle(/Example Domain/);

//   // 3. Find the main heading element using a CSS locator
//   const heading = page.locator('h1');

//   // 4. Assert the heading is visible on screen and contains expected text
//   await expect(heading).toBeVisible();
//   await expect(heading).toHaveText('Example Domain');
// });

// const { test, expect } = require('@playwright/test');

// test('Demonstrating resilient user-facing locators', async ({ page }) => {
//   await page.goto('https://demo.playwright.dev/todomvc/#/');

//   // Target heading by its accessible role
//   const heading = page.getByRole('heading', { name: 'todos' });
//   await expect(heading).toBeVisible();

//   // Target input field by placeholder
//   const input = page.getByPlaceholder('What needs to be done?');
//   await input.fill('Master Locator Strategy');
//   await input.press('Enter');

//   // Verify item creation by visible text
//   const todoItem = page.getByText('Master Locator Strategy');
//   await expect(todoItem).toBeVisible();
// });

const { test, expect } = require('@playwright/test');

test('Demonstrating auto-waiting and web-first assertions', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  const input = page.getByPlaceholder('What needs to be done?');
  
  // Actionability check runs automatically before typing
  await input.fill('Test dynamic waiting');
  await input.press('Enter');

  const todoItem = page.getByTestId('todo-item');
  const toggleCheckbox = todoItem.getByRole('checkbox');

  // Web-First Assertion: Retries until item count equals 1
  await expect(todoItem).toHaveCount(1);

  // Click auto-waits until checkbox is visible, enabled, and stable
  await toggleCheckbox.check();

  // Web-First Assertion: Automatically waits for CSS class 'completed' to apply
  await expect(todoItem).toHaveClass(/completed/);
});
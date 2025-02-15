import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { A11YTAGS } from '../constant';

test.use({ storageState: 'playwright/.auth/unauthenticated.json' });

test.beforeEach(async ({ page }) => {
  // Go to the starting url before each test.
  await page.goto('/');
});

test('home page', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'type hero' })).toBeVisible();
});

test.describe('homepage a11y', () => {
  test('homepage should not have any automatically detectable WCAG A or AA violations in light mode', async ({
    page,
  }) => {
    const a11yScanResults = await new AxeBuilder({ page }).withTags(A11YTAGS).analyze();

    expect(a11yScanResults.violations).toEqual([]);
  });

  test('homepage should not have any automatically detectable WCAG A or AA violations in dark Mode', async ({
    page,
  }) => {
    await page
      .getByRole('button', {
        name: /theme button/i,
      })
      .click();

    const a11yScanResults = await new AxeBuilder({ page }).withTags(A11YTAGS).analyze();

    expect(a11yScanResults.violations).toEqual([]);
  });
});

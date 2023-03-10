import { test, expect } from '@playwright/test';
import { DirectoryPage } from '@src/pages/DirectoryPage';
import { beforeEach } from 'node:test';

test.describe('Some Suite', () => {
	let directoryPage: DirectoryPage;
	test.beforeEach(async ({ page }) => {
		directoryPage = new DirectoryPage(page);
		await directoryPage.navigate();
	});
	test('first test [1]', async ({ page }) => {
		const FILTERED_TAG = 'MMO';

		await directoryPage.setFilterValueAndSelect(FILTERED_TAG);

		await page.waitForLoadState('domcontentloaded');
		await page.waitForTimeout(2000);

		const items = await directoryPage.getGamesInfo();

		items.forEach((item) => {
			const { tags } = item;
			expect(tags, 'Tag assigned to game card').toContain(FILTERED_TAG);
		});
	});

	test('Second test [1]', async () => {
		await directoryPage.setFilterValueAndSelect('gggggggg');
	});
});

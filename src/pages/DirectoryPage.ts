import { Locator, Page } from '@playwright/test';
import { LogPage } from 'src/decorators/test_decorator';
import { BasePage } from './BasePage';

@LogPage
export class DirectoryPage extends BasePage {
	private readonly page: Page;

	readonly filterByCategoryInput: Locator;
	readonly filterDropDownResults: Locator;
	readonly gameCards: Locator;

	private readonly cardTitleSelector: string;
	private readonly cardTagsSelector: string;

	constructor(page: Page) {
		super('Directories Page');
		this.page = page;
		this.filterByCategoryInput = this.page.locator('[data-a-target="dropdown-search-input"] input');
		this.filterDropDownResults = this.page.locator('[aria-label="Search Results"]');

		this.gameCards = this.page.locator('[data-target="directory-page__card-container"]');
		this.cardTitleSelector = '[data-a-target="tw-card-title"]';
		this.cardTagsSelector = '.tw-tag';
	}

	async navigate() {
		this.page.goto('/directory', { waitUntil: 'domcontentloaded', timeout: 10000 });
	}

	async getGamesInfo() {
		const itemsInfo = [];
		for (let i = 0; i < (await this.gameCards.count()); i++) {
			const cardName = await this.gameCards.nth(i).locator(this.cardTitleSelector).innerText();
			const cardTags = this.gameCards.nth(i).locator(this.cardTagsSelector);

			const tags: string[] = [];

			for (let j = 0; j < (await cardTags.count()); j++) {
				const tag = await cardTags.nth(j).innerText();
				tags.push(tag);
			}
			itemsInfo.push({ name: cardName, tags });
		}
		return itemsInfo;
	}

	async setFilterValueAndSelect(text: string) {
		await this.filterByCategoryInput.type(text, { delay: 50 });
		await this.filterDropDownResults.locator('button', { hasText: text }).click({ timeout: 5000 });
	}
}

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		actionTimeout: 30000,
		baseURL: 'https://www.twitch.tv',
		headless: false,
		channel: 'chrome',
		viewport: { width: 1600, height: 960 },
		screenshot: 'only-on-failure',
	},
	testMatch: '**/*.test.[jt]s?(x)',
	testDir: './specs',
	reporter: [['html', { open: 'never' }]],
	workers: 1,
	timeout: 180000, // 3min,
};

if (process.env.LOG === 'trace') {
	config.use!.trace = 'retain-on-failure';
}

export default config;

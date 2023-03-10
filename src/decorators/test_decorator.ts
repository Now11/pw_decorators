import { test } from '@playwright/test';
const chalk = require('chalk');

export function LogPage(target: Function): void {
	const classMethodNames = Object.getOwnPropertyNames(target.prototype)
		.filter((prop) => prop !== 'constructor')
		.filter(
			(prop) =>
				!(
					'set' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor) ||
					'get' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor)
				),
		);

	classMethodNames.forEach((method) => {
		const originalMethod: Function = target.prototype[method];
		target.prototype[method] = async function (...args: any) {
			const argsStr = `\n[${chalk.blue('ARGUMENTS')}] => ${JSON.stringify(args)} \n`;
			if (args.length > 0) {
				this.logger.info(`Call method [${chalk.green(method)}]` + argsStr);
			} else {
				this.logger.info(`Call method [${chalk.green(method)}]`);
			}

			let results: any;
			await test.step(`[${this.name ?? target.prototype.constructor.name}] call method [${method}]`, async () => {
				results = await originalMethod.call(this, ...args);
			});
			return results;
		};
	});
}

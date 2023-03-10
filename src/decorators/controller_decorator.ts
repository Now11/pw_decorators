const chalk = require('chalk');

export function LogController(target: Function): void {
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
			const upperFirst = method.charAt(0).toUpperCase() + method.slice(1);
			this.logger.info(
				`Call method [${chalk.green(upperFirst)}] \n[${chalk.blue('ARGUMENTS')}] => ${JSON.stringify(args)} \n`,
			);

			return originalMethod.call(this, ...args);
		};
	});
}

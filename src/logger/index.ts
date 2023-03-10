import log4js from 'log4js';

export class Logger {
	protected readonly logger: log4js.Logger;
	private constructor(category: string) {
		this.logger = log4js.getLogger(category);
		this.logger.level = 'trace';
	}

	static init(category: string) {
		return new Logger(category).logger;
	}
}

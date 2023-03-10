import log4js from 'log4js';
import { Logger } from '../logger';

export abstract class BaseController {
	protected logger: log4js.Logger;
	protected name: string;
	constructor(name?: string) {
		this.name = name ?? this.constructor.name;
		this.logger = Logger.init(`[${this.name}]`);
	}
}

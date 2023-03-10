import { LogController } from '../decorators/controller_decorator';
import { BaseController } from './BaseController';

@LogController
export class UserController extends BaseController {
	async createUser({ name, surname }: { name: string; surname: string }) {}

	async updateUser({ userId, data }: { userId: number; data: { name: string; surname: string } }) {}

	async deleteUser({ userId }: { userId: number }) {}
}

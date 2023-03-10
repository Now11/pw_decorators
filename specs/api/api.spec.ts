import { UserController } from '../../src/controllers/UserController';

(async function test() {
	const userController = new UserController();

	await userController.createUser({ name: 'John', surname: 'Weak' });
	await userController.updateUser({ userId: 1, data: { name: 'John Updated', surname: 'Weak Updated' } });
	await userController.deleteUser({ userId: 1 });
})();

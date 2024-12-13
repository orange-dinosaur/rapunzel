import { createAdminClient } from '$lib/server/appwrite';
import type { AppwriteException } from 'node-appwrite';
import { fail } from '@sveltejs/kit';

let USERID = '';
let SECRET = '';

export async function load({ url }) {
	const userId = url.searchParams.get('userId')?.toString() ?? '';
	const secret = url.searchParams.get('secret')?.toString() ?? '';

	USERID = userId;
	SECRET = secret;
}

export const actions = {
	recover_password: async ({ request }) => {
		// Extract the form data.
		const formData = await request.formData();
		const password = formData.get('password')?.toString() ?? '';

		console.log('USERID: ', USERID);
		console.log('SECRET: ', SECRET);

		// Create the Appwrite client.
		const { account } = createAdminClient();

		try {
			await account.updateRecovery(USERID, SECRET, password);
		} catch (error) {
			const { code, message } = error as AppwriteException;

			return fail(code ?? 500, {
				status: 'Password recovery failed, please try again',
				message,
				fields: {
					password
				}
			});
		}

		return {
			status: 200,
			message: 'Password updated successfully!',
			fields: {
				password: ''
			}
		};
	}
};

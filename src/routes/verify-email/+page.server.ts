import { createClient } from '$lib/server/appwrite';
import type { AppwriteException } from 'node-appwrite';

export async function load({ url }) {
	const userId = url.searchParams.get('userId')?.toString() ?? '';
	const secret = url.searchParams.get('secret')?.toString() ?? '';

	// Create the Appwrite client.
	const { account } = createClient();

	// verify user account
	try {
		await account.updateVerification(userId, secret);
	} catch (error) {
		const { code, message } = error as AppwriteException;

		return {
			data: {
				status: code,
				message
			}
		};
	}

	return {
		data: {
			status: 200,
			message: 'Email verified successfully!'
		}
	};
}

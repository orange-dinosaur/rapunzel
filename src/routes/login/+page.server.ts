import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { AppwriteException } from 'node-appwrite';

export async function load({ locals }) {
	if (locals.user) {
		// If the user is logged in, redirect to its home page.
		redirect(301, `/users/${locals.user.$id}`);
	}
}

export const actions = {
	// Action to create a new user account and session
	default: async ({ request, cookies }) => {
		// Extract the form data.
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		// Create the Appwrite client.
		const { account } = createAdminClient();

		let session;
		try {
			session = await account.createEmailPasswordSession(email, password);
		} catch (error) {
			const { code, message } = error as AppwriteException;

			return fail(code ?? 500, {
				status: code,
				fields: {
					email: email,
					password: password
				},
				body: {
					message: message,
					session: null
				}
			});
		}

		console.log('SESSION: ', session);

		// Set the session cookie with the secret
		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		// Redirect to the account page.
		redirect(301, `/users/${session.userId}`);
	}
};

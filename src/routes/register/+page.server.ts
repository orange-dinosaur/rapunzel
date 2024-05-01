import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { fail, redirect } from '@sveltejs/kit';
import { AppwriteException, ID, type Models } from 'node-appwrite';

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
		const username = formData.get('username')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		// Create the Appwrite client.
		const { account } = createAdminClient();

		let userAccount: Models.User<Models.Preferences>;
		let session;
		try {
			// Create the session using the client
			userAccount = await account.create(ID.unique(), email, password, username);
			session = await account.createEmailPasswordSession(email, password);
		} catch (error) {
			const { code, message } = error as AppwriteException;

			return fail(code ?? 500, {
				status: code,
				fields: {
					email: email,
					username: username,
					password: password
				},
				body: {
					message: message,
					session: null
				}
			});
		}

		// Set the session cookie with the secret
		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		// Redirect to the account page.
		redirect(301, `/users/${userAccount.$id}`);
	}
};

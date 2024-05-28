import { SESSION_COOKIE, createSessionClientEvent } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	// Logged out users can't access this page.
	if (!locals.user) {
		redirect(301, '/register');
	} else if (!locals.user.emailVerification) {
		// If the user is logged in and is email is verified, redirect to its home page.
		redirect(301, '/login');
	}

	// Pass the stored user local to the page.
	return {
		user: locals.user
	};
}

// Define our log out endpoint/server action.
export const actions = {
	default: async (event) => {
		// Create the Appwrite client.
		const { account } = createSessionClientEvent(event);

		// Delete the session on Appwrite, and delete the session cookie.
		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE, { path: '/' });

		// Redirect to the login page.
		redirect(301, '/login');
	}
};

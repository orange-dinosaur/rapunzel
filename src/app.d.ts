import type { UserBooks } from '$lib/types/book/book';
import type { Models } from 'node-appwrite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Models.User<Models.Preferences> | undefined;
			userBooks: UserBooks | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

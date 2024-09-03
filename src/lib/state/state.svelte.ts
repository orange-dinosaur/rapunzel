import type BookFull from '$lib/components/book/BookFull.svelte';
import { UserBooks } from '$lib/types/book/book';
import type { Models } from 'node-appwrite';
import { writable } from 'svelte/store';

export type UserData = {
	user: Models.User<Models.Preferences>;
	userBooks: UserBooks;
};

function createUserData() {
	const { subscribe, set, update } = writable<UserData>();

	function updateUserBooks(booksFull: BookFull[]) {
		update((userData) => {
			userData.userBooks.books = booksFull.map((bookFull) => bookFull.book);
			return userData;
		});
	}

	return {
		subscribe,
		set,
		update,
		updateUserBooks
	};
}

export const userData = createUserData();

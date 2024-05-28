export async function load({ locals }) {
	if (locals.user) {
		console.log('PREFS: ', locals.user.prefs);
		if ('avatar' in locals.user.prefs) {
			console.log('AVATAR: ', locals.user.prefs.avatar);
		}
		return {
			user: locals.user
		};
	}
}

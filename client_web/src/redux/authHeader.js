export function authHeader() {
	// return authorization header with jwt token
	// get user token from state

	return {
		Accept: '/',
		'Content-Type': 'application/json',
		// Authorization: 'AAAAAAAAAAAAAAAA',
	};
}

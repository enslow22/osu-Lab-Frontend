import type { LayoutServerLoad } from './$types';
import { JWTSECRET } from '$env/static/private';
import pkg from 'jsonwebtoken';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const { verify } = pkg;
	let sessionToken = cookies.get('session_token')

	if (sessionToken) {
		return { session: verify(sessionToken, JWTSECRET) }
	}

	return {
		session: null
	};
};
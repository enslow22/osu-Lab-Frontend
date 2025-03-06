import { PUBLIC_API_DOMAIN } from '$env/static/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    
	if (request.url.startsWith(`${PUBLIC_API_DOMAIN}`)) {
		const sessionToken = event.request.headers.get('cookie') || '';
		request.headers.set('session_token', sessionToken);
	}

	return await fetch(request);
};
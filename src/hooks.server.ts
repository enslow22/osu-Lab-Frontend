import { PUBLIC_API_DOMAIN } from '$env/static/public';
import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    
	if (request.url.startsWith(`${PUBLIC_API_DOMAIN}`)) {
		request.headers.set('session_token', event.request.headers.get('session_token'));
	}

	return await fetch(request);
};
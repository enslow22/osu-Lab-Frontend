import { PUBLIC_API_DOMAIN } from "$env/static/public";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    let leaderboardsDataFetchUrl = `${PUBLIC_API_DOMAIN}/get_leaderboards`
    return {
        leaderboards: await fetch(leaderboardsDataFetchUrl).then((res) => res.json()),
    };
};
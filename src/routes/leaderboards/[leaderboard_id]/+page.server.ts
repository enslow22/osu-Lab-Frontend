import { PUBLIC_API_DOMAIN } from "$env/static/public";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {

    let leaderboardsDataFetchUrl = `${PUBLIC_API_DOMAIN}/get_leaderboard_info?leaderboard_id=${params.leaderboard_id}`
    return {
        leaderboardInfo: await fetch(leaderboardsDataFetchUrl).then((res) => res.json()),
    };
};
import { PUBLIC_API_DOMAIN } from "$env/static/public";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {

    let summaryDataFetchUrl = `${PUBLIC_API_DOMAIN}/database_summary`
    let summaryTodayDataFetchUrl = `${PUBLIC_API_DOMAIN}/recent_summary?days=7`
    let recentScoresFetchUrl = `${PUBLIC_API_DOMAIN}/recent_scores?n=10`
	return {
		databaseSummary: await fetch(summaryDataFetchUrl).then((res) => res.json()),
        recentDatabaseSummary: await fetch(summaryTodayDataFetchUrl).then((res) => res.json()),
        lastTenScores: await fetch(recentScoresFetchUrl).then((res) => res.json()),
	};
};
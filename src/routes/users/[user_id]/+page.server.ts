import { PUBLIC_API_DOMAIN } from "$env/static/public";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params, fetch}) => {

    let scoreHistoryUrl = `${PUBLIC_API_DOMAIN}/stats/score_history?user_id=${params.user_id}&minimal=true&all_modes=true`
    let modSpreadUrl = `${PUBLIC_API_DOMAIN}/stats/mod_spread?user_id=${params.user_id}&all_modes=true`
    let userSummaryUrl = `${PUBLIC_API_DOMAIN}/stats/user_summary?user_id=${params.user_id}&mode=osu&all_modes=true`

    let userSummary =  await fetch(userSummaryUrl).then((res) => res.json())

    // Format the histogram datas.
    // bin width for pp is 25. bin width for acc is 0.5% (or 0.005)

    function findMissingValues(arr: Array<{bin_floor: number, count: number}>, bin_width: number) {
        if (arr.length === 0) {
            return []
        }

        let new_arr = []
        const min_val = arr[0].bin_floor
        let current = min_val

        for (let i=0; i<arr.length; i++) {
            // If current and the bin are the same
            if (Math.abs(arr[i].bin_floor - current) < 0.00001) {
                new_arr.push(arr[i])
            }
            else {
                // Let current catch up to the bin
                current += bin_width
                while (arr[i].bin_floor > current) {
                    new_arr.push({bin_floor: current, count: 0})
                    current += bin_width
                }
                new_arr.push(arr[i])
            }
        }
        return new_arr
    }

    const modes = ["osu", "taiko", "fruits", "mania"]
    modes.forEach((mode) => {
        userSummary[mode]["pp_distribution"] = findMissingValues(userSummary[mode]["pp_distribution"], 25)
        userSummary[mode]["acc_distribution"] = findMissingValues(userSummary[mode]["acc_distribution"], 0.005)
    })

    return {
        scoreHistory: await fetch(scoreHistoryUrl).then((res) => res.json()),
        modSpread: await fetch(modSpreadUrl).then((res) => res.json()),
        userSummary: userSummary
    };
};
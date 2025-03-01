<script lang="ts">
    import { Trigger as SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
    import { Separator } from "$lib/components/ui/separator/index";
    import AuthButton from "$lib/components/auth-button.svelte";
    let user = {
        name: "John Doe",
        age: 30,
        bio: "Software developer with a passion for open-source projects.",
        interests: ["Coding", "Hiking", "Photography"]
    };

    let ppTime = [{
      "date": "2017-08-11",
      "max_pp": 2.74216
    },
    {
      "date": "2017-08-12",
      "max_pp": 4.71517
    },
    {
      "date": "2017-08-13",
      "max_pp": 8.96522
    },
    {
      "date": "2017-08-14",
      "max_pp": 6.84565
    },
    {
      "date": "2017-08-15",
      "max_pp": 3.43121
    },
    {
      "date": "2017-08-19",
      "max_pp": 4.40265
    },
    {
      "date": "2017-08-26",
      "max_pp": 3.73584
    },
    {
      "date": "2017-08-30",
      "max_pp": 8.87739
    },
    {
      "date": "2017-08-31",
      "max_pp": 8.43861
    },
    {
      "date": "2017-09-02",
      "max_pp": 10.9066
    },
    {
      "date": "2017-09-03",
      "max_pp": 8.94121
    },
    {
      "date": "2017-09-04",
      "max_pp": 8.90132
    },
    {
      "date": "2017-09-07",
      "max_pp": 9.69767
    },
    {
      "date": "2017-09-08",
      "max_pp": 13.4697
    },
    {
      "date": "2017-09-09",
      "max_pp": 7.68713
    },
    {
      "date": "2017-09-10",
      "max_pp": 8.95966
    },
    {
      "date": "2017-09-11",
      "max_pp": 10.0225
    },
    {
      "date": "2017-09-14",
      "max_pp": 11.9855
    },
    {
      "date": "2017-09-16",
      "max_pp": 5.6126
    },
    {
      "date": "2017-09-23",
      "max_pp": 11.3838
    },
    {
      "date": "2017-09-25",
      "max_pp": 8.85044
    },
    {
      "date": "2018-04-28",
      "max_pp": 8.6693
    },
    {
      "date": "2018-04-29",
      "max_pp": 7.63856
    },
    {
      "date": "2018-04-30",
      "max_pp": 11.1225
    },
    {
      "date": "2018-05-03",
      "max_pp": 11.5077
    },
    {
      "date": "2020-07-14",
      "max_pp": 18.6757
    },
    {
      "date": "2020-07-25",
      "max_pp": 5.29647
    },
    {
      "date": "2020-07-26",
      "max_pp": 2.50329
    },
    {
      "date": "2020-07-29",
      "max_pp": 12.8348
    },
    {
      "date": "2020-07-31",
      "max_pp": 11.2232
    },
    {
      "date": "2020-08-01",
      "max_pp": 16.3586
    },
    {
      "date": "2020-08-02",
      "max_pp": 23.5124
    },
    {
      "date": "2020-08-03",
      "max_pp": 19.9927
    },
    {
      "date": "2020-08-04",
      "max_pp": 18.1809
    },
    {
      "date": "2020-08-05",
      "max_pp": 18.1778
    },
    {
      "date": "2020-08-07",
      "max_pp": 33.0451
    },
    {
      "date": "2020-08-08",
      "max_pp": 27.2116
    },
    {
      "date": "2020-08-09",
      "max_pp": 25.7246
    },
    {
      "date": "2020-08-10",
      "max_pp": 21.8119
    },
    {
      "date": "2020-08-11",
      "max_pp": 47.7889
    },
    {
      "date": "2020-08-13",
      "max_pp": 27.8089
    },
    {
      "date": "2020-08-14",
      "max_pp": 49.0196
    },
    {
      "date": "2020-08-15",
      "max_pp": 31.4029
    },
    {
      "date": "2020-08-16",
      "max_pp": 29.2286
    },
    {
      "date": "2020-08-17",
      "max_pp": 61.5776
    },
    {
      "date": "2020-08-18",
      "max_pp": 37.2246
    },
    {
      "date": "2020-08-22",
      "max_pp": 26.4929
    },
    {
      "date": "2020-08-23",
      "max_pp": 38.6005
    },
    {
      "date": "2020-08-24",
      "max_pp": 73.18
    },
    {
      "date": "2020-08-25",
      "max_pp": 30.2921
    },
    {
      "date": "2020-08-26",
      "max_pp": 54.9831
    },
    {
      "date": "2020-08-27",
      "max_pp": 47.4571
    },
    {
      "date": "2020-08-28",
      "max_pp": 70.5401
    },
    {
      "date": "2020-08-29",
      "max_pp": 37.3486
    },
    {
      "date": "2020-08-31",
      "max_pp": 49.4002
    },
    {
      "date": "2020-09-01",
      "max_pp": 52.1901
    },
    {
      "date": "2020-09-02",
      "max_pp": 37.0274
    },
    {
      "date": "2020-09-05",
      "max_pp": 55.1255
    },
    {
      "date": "2020-09-06",
      "max_pp": 46.1421
    },
    {
      "date": "2020-09-08",
      "max_pp": 33.0724
    },
    {
      "date": "2020-09-09",
      "max_pp": 70.9428
    },
    {
      "date": "2020-09-10",
      "max_pp": 61.8857
    },
    {
      "date": "2020-09-11",
      "max_pp": 41.5618
    },
    {
      "date": "2020-09-12",
      "max_pp": 41.6227
    },
    {
      "date": "2020-09-13",
      "max_pp": 39.4692
    },
    {
      "date": "2020-09-14",
      "max_pp": 55.0305
    },
    {
      "date": "2020-09-15",
      "max_pp": 66.5109
    },
    {
      "date": "2020-09-16",
      "max_pp": 23.8206
    },
    {
      "date": "2020-09-17",
      "max_pp": 53.2673
    },
    {
      "date": "2020-09-18",
      "max_pp": 106.582
    },
    {
      "date": "2020-09-19",
      "max_pp": 79.3211
    },
    {
      "date": "2020-09-20",
      "max_pp": 62.1631
    },
    {
      "date": "2020-09-21",
      "max_pp": 71.3491
    },
    {
      "date": "2020-09-22",
      "max_pp": 48.0096
    },
    {
      "date": "2020-09-23",
      "max_pp": 51.657
    },
    {
      "date": "2020-09-24",
      "max_pp": 70.0863
    },
    {
      "date": "2020-09-25",
      "max_pp": 54.2855
    },
    {
      "date": "2020-09-27",
      "max_pp": 43.2915
    },
    {
      "date": "2020-09-29",
      "max_pp": 88.449
    },
    {
      "date": "2020-09-30",
      "max_pp": 65.917
    },
    {
      "date": "2020-10-01",
      "max_pp": 87.4259
    },
    {
      "date": "2020-10-02",
      "max_pp": 85.6142
    },
    {
      "date": "2020-10-03",
      "max_pp": 68.2505
    },
    {
      "date": "2020-10-04",
      "max_pp": 104.339
    },
    {
      "date": "2020-10-05",
      "max_pp": 93.6519
    },
    {
      "date": "2020-10-06",
      "max_pp": 77.754
    },
    {
      "date": "2020-10-07",
      "max_pp": 95.9311
    },
    {
      "date": "2020-10-08",
      "max_pp": 90.0942
    }];

    import { page } from '$app/state';
    export let user_id = page.params.user_id;
</script>

<div class="flex-1 flex flex-col m-3 p-3 gap-3">
    <div class="flex-1 p-3 border">User Info for {user_id}</div>
    <div class="flex flex-row gap-3 flex-1">
        <div class="flex-1 p-3 border">Playcount Graph</div>
        <div class="flex-1 p-3 border">Highest PP Per Day Graph</div>
    </div>
</div>
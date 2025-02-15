import { error } from '@sveltejs/kit';
export function load({ params }) {
    const groupData = [
        {
            name: 'Group A',
            users: [
                {
                    id: 1,
                    name: 'Alice'
                },
                {
                    id: 2,
                    name: 'Bob'
                }
            ],
            defaultSettings: {
                mods: "+HD",
                metric: "accuracy",
                filters: "rank/(S,SH)"
            }
        },
        {
            name: 'Group B',
            users: [
                {
                    id: 3,
                    name: 'Charlie'
                },
                {
                    id: 4,
                    name: 'David'
                }
            ],
            defaultSettings: {
                mods: "+HR",
                metric: "score",
                filters: "rank/(A,B)"
            }
        },
        {
            name: 'Group C',
            users: [
                {
                    id: 5,
                    name: 'Eve'
                },
                {
                    id: 6,
                    name: 'Frank'
                }
            ],
            defaultSettings: {
                mods: "+DT",
                metric: "combo",
                filters: "rank/(C,D)"
            }
        }
    ];

    const group = groupData.find(group => group.name === params.tag_name);

    if (!group) {
		error(404, {
			message: params.tag_name + ' was not found!'
		});
	}

    return {
      group
    };
  }
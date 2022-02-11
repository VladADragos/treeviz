const tree = {
    name: 8, children: [
        {
            name: 3,
            children: [
                {
                    name: 1,
                    children: []
                },
                {
                    name: 6,
                    children: [
                        {
                            name: 4,
                        },
                        {
                            name: 7
                        }
                    ]
                }
            ]
        },
        {
            name: 10,
            children: [
                {},
                {
                    name: 14,
                    children: [
                        {
                            name: 13,
                        }, {}
                    ]
                }
            ]
        }
    ]
};

export default JSON.stringify(tree);
const file = [{
        "key": "common",
        "children": [{
                "key": "setting1",
                "value1": "Value 1",
                "value2": "Value 1"
            },
            {
                "key": "setting2",
                "value1": 200
            },
            {
                "key": "setting3",
                "value1": true,
                "value2": {
                    "key": "value"
                }
            },
            {
                "key": "setting6",
                "children": [{
                        "key": "key",
                        "value1": "value",
                        "value2": "value"
                    },
                    {
                        "key": "ops",
                        "value2": "vops"
                    }
                ]
            },
            {
                "key": "follow",
                "value2": false
            },
            {
                "key": "setting4",
                "value2": "blah blah"
            },
            {
                "key": "setting5",
                "value2": {
                    "key5": "value5"
                }
            }
        ]
    },
    {
        "key": "group1",
        "children": [{
                "key": "baz",
                "value1": "bas",
                "value2": "bars"
            },
            {
                "key": "foo",
                "value1": "bar",
                "value2": "bar"
            },
            {
                "key": "nest",
                "value1": {
                    "key": "value"
                },
                "value2": "str"
            }
        ]
    },
    {
        "key": "group2",
        "value1": {
            "abc": 12345
        }
    },
    {
        "key": "group3",
        "value2": {
            "fee": 100500
        }
    }
]


const file2 = [{
        "key": "host",
        "value1": "hexlet.io",
        "value2": "hexlet.io"
    },
    {
        "key": "timeout",
        "value1": 50,
        "value2": 20
    },
    {
        "key": "proxy",
        "value1": "123.234.53.22"
    },
    {
        "key": "follow",
        "value1": false
    },
    {
        "key": "verbose",
        "value2": true
    }
]
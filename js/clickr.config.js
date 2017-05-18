var list = [
    {
        click: '.js-test'
    },
    {
        function: 'Test',
        delay: 2000,
        params: [
            'param value'
        ],
        check: {
            example: 'example value'
        }
    }
];

var test = new Clickr(list);

test.step();

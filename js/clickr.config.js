var list = [
    {
        click: '.js-test'
    },
    {
        input: 'input[name=email]:eq(0)',
        check: 'test@example.com',
        value: 'test@example.com'
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

var list = [
    {
        click: '.js-test'
    },
    {
        function: 'Test()',
        check: {
            example: 'example value'
        }
    }
];

var test = new Clickr(list);

test.step();

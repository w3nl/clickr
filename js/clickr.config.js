var list = [
    {
        click: '.js-test'
    },
    {
        fn: 'Test()',
        check: {
            example: 'example value'
        }
    }
];

var test = new Clickr(list);

test.step();

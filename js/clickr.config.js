var list = [
    {
        event: '.js-test'
    },
    {
        input: 'input[name=email]:eq(0)',
        check: 'test@example.com',
        value: 'test@example.com'
    },
    {
        function: testFunction,
        delay: 2000,
        params: [
            'example value'
        ],
        check: {
            example: 'example value'
        }
    }
];

var test = new Clickr(list);

/**
 * An example function.
 *
 * @param {string} exampleValue
 *
 * @return {object}
 */
function testFunction(exampleValue) {
    return {
        example: exampleValue
    };
}

test.step();

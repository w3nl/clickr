# clickr

I have build an [NPM package](https://www.npmjs.com/package/clickr) (and [Chrome extension](https://chrome.google.com/webstore/detail/clickr/kbegiheknicgehkajcakeoadpbbpgbjj?utm_source=chrome-app-launcher-info-dialog)) to automate and test your JavaScript.

## Example
Here is an example test script:
```
var list = [
    {
        function: 'testFunction',
        params: [
            'example value'
        ],
        delay: 2000,
        check: {
            example: 'example value'
        }
    },
    {
        input: 'input[name=email]:eq(0)',
        check: 'test@example.com',
        value: 'test@example.com'
    },
    {
        event: 'button[form=login]:eq(0)',
        type:  'click'
    }
];

var test = new Clickr(list);

test.step();

```

## Function
First you see a test that calls a function.
In this case the function `testFunction`.
There is also 1 param send, so the script will call `testFunction('example value')`.
You can also delay tests, e.g. if you know that some tests only can run after x time.
The default delay is 100ms.
If the function returns an object, you can check if the values are the same you expected.

You can also add a function to your test script, and used in your test.

## Input
The next test will search for input elements.
You can check if the value is the same you expected, and you can set a new value.
Both are optional.

## Event
The last test will scroll to an element, and trigger an event on an element, e.g. click.

## Results
When you run a test, you receive in your Devtools console a result, e.g.
![Clickr result](https://hckr.news/content/images/2017/05/Schermafdruk-van-2017-05-22-16-36-18.png)

/* eslint-disable no-console */

/**
 * Add charts to the page with ajax.
 *
 * @param {object} list
 *
 * @return {object}
 */
// eslint-disable-next-line no-unused-vars
var Clickr = (function(list) {
    'use strict';

    var globals = {
        step:    null,
        timeout: 100,
        results: {
            ok:   0,
            fail: 0
        }
    };

    /**
     * Click on an element.
     */
    function click() {
        if($(globals.step.click).length == 0) {
            console.log('%c click ' + globals.step.click, 'color: #f00');
            globals.results.fail++;
            step();

            return;
        }

        console.log('%c click ' + globals.step.click, 'color: #0f0');
        $(globals.step.click).on('click', function() {
            globals.results.ok++;
            step();
        });
        $(globals.step.click).click();
    }

    /**
     * Run a function, and check if the results from the function are the same as expected.
     */
    function check() {
        var values = eval(globals.step.function);

        if(globals.step.check) {
            $.each(globals.step.check, function(key, value) {
                if(values[key] == value) {
                    globals.results.ok++;
                    console.log('%c OK ' + key, 'color: #0f0');
                } else {
                    globals.results.fail++;
                    console.log('%c FAIL ' + key + ' (' + values[key] + '|' + value + ')', 'color: #f00');
                }
            });
        }

        step();
    }

    /**
     * Fill an input with a value.
     */
    function input() {
        if($(globals.step.input).length == 0) {
            console.log('%c input ' + globals.step.input, 'color: #f00');
            globals.results.fail++;
            step();

            return;
        }

        console.log('%c input ' + globals.step.input, 'color: #0f0');
        $(globals.step.input).val(globals.step.value);
        step();
    }

    /**
     * Check a new step.
     */
    function step() {
        if(list.length < 1) {
            globals.step = null;
            console.log(
                'Results: ' +
                '%c OK ' + globals.results.ok +
                '%c FAIL ' + globals.results.fail,
                'color: #0f0',
                'color: #f00'
            );

            return;
        }

        globals.step = list.shift();

        if(globals.step.click) {
            setTimeout(click, globals.timeout);
        }

        if(globals.step.function && globals.step.check) {
            setTimeout(check, globals.timeout);
        }

        if(globals.step.input && globals.step.value) {
            setTimeout(input, globals.timeout);
        }
    }

    return {
        globals: globals,
        step: step,
        click: click
    };
});

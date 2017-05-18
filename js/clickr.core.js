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
        list:    list,
        step:    null,
        timeout: 100,
        results: {
            ok:   0,
            fail: 0
        },
        log:      []
    };

    /**
     * Click on an element.
     */
    function click() {
        if($(globals.step.click).length == 0) {
            console.log('%c Click ' + globals.step.click, 'color: #f00');
            globals.results.fail++;
            step();

            return;
        }

        globals.step.scrollto = globals.step.click;
        scrollto();

        console.log('%c Click ' + globals.step.click, 'color: #0f0');
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
        var values = fn();

        if(globals.step.check) {
            $.each(globals.step.check, function(key, value) {
                if(values[key] == value) {
                    globals.results.ok++;
                    console.log('%c Check ' + key, 'color: #0f0');
                } else {
                    globals.results.fail++;
                    console.log('%c Check ' + key + ' (' + values[key] + '|' + value + ')', 'color: #f00');
                }
            });
        }

        step();
    }

    /**
     * Run a function.
     *
     * @return {object}
     */
    function fn() {
        var fn = eval(globals.step.function);
        var values;

        if(fn) {
            if(globals.step.params) {
                values = fn.apply(this, globals.step.params);
            } else {
                values = fn();
            }

            globals.log.last().values = values;
            globals.results.ok++;
            console.log('%c Function ' + globals.step.function, 'color: #0f0');
        } else {
            globals.results.fail++;
            console.log('%c Function ' + globals.step.function, 'color: #f00');
        }

        return values;
    }

    /**
     * Fill an input with a value.
     */
    function input() {
        var value;

        if($(globals.step.input).length == 0) {
            console.log('%c Input ' + globals.step.input, 'color: #f00');
            globals.results.fail++;
            step();

            return;
        }

        if(globals.step.check) {
            value = $(globals.step.input).val();

            if(value == globals.step.check) {
                console.log('%c Input check ' + globals.step.input, 'color: #0f0');
                globals.results.ok++;
            } else {
                console.log(
                    '%c Input check ' + globals.step.input +
                    ' (' + value + '|' + globals.step.check + ')',
                    'color: #f00'
                );
                globals.results.fail++;
            }
        }

        if(globals.step.value) {
            $(globals.step.input).val(globals.step.value);
            console.log('%c Input set ' + globals.step.input, 'color: #0f0');
            globals.results.ok++;
        }
        step();
    }

    function scrollto() {
        $(globals.step.scrollto).get(0).scrollIntoView();
    }

    /**
     * Check a new step.
     */
    function step() {
        var timeout = globals.timeout;

        if(globals.list.length < 1) {
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

        globals.step = globals.list.shift();
        globals.log.push(globals.step);

        if(globals.step.delay) {
            timeout = globals.step.delay;
        }

        if(globals.step.scrollto) {
            scrollto();
        }

        if(globals.step.click) {
            setTimeout(click, timeout);
        }

        if(globals.step.function) {
            setTimeout(check, timeout);
        }

        if(globals.step.input) {
            setTimeout(input, timeout);
        }
    }

    return {
        globals: globals,
        step: step,
        click: click
    };
});

Array.prototype.last = function() {
    return this[this.length - 1];
};

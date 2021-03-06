/* eslint-disable no-console */

/**
 * Automated clicker.
 *
 * @param {object} list
 *
 * @return {object}
 */

// eslint-disable-next-line no-unused-vars
var Clickr = (function(list, config) {
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

    globals = $.extend({}, globals, config || {});

    /**
     * Trigger an event on an element.
     */
    function event() {
        var eventType = 'click';

        if(globals.step.type) {
            eventType = globals.step.type;
        }

        if($(globals.step.event).length == 0) {
            console.log('%c Event ' + eventType + ' ' + globals.step.event, 'color: #f00');
            globals.results.fail++;
            step();

            return;
        }

        globals.step.scrollto = globals.step.event;
        scrollto();

        console.log('%c Event ' + eventType + ' ' + globals.step.event, 'color: #0f0');
        $(globals.step.event).on(eventType, function() {
            globals.results.ok++;
            step();
        });
        $(globals.step.event).trigger(eventType);
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
        var stepFunction;
        var values;

        stepFunction = globals.step.function;
        if(typeof stepFunction == 'string') {
            stepFunction = eval(stepFunction);
        }

        if(stepFunction) {
            if(globals.step.params) {
                values = stepFunction.apply(this, globals.step.params);
            } else {
                values = stepFunction();
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

    /**
     * Scroll to an element.
     */
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

        if(globals.step.function) {
            setTimeout(check, timeout);
        }

        if(globals.step.event) {
            setTimeout(event, timeout);
        }

        if(globals.step.input) {
            setTimeout(input, timeout);
        }
    }

    return {
        globals:  globals,
        step:     step,
        run:      step,
        scrollto: scrollto,
        event:    event,
        function: check,
        input:    input
    };
});

Array.prototype.last = function() {
    return this[this.length - 1];
};

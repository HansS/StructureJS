/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.MathUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
     * A helper class to do calculations and conversions.
     *
     * @class MathUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var MathUtil = (function () {
        function MathUtil() {
            throw new Error('[MathUtil] Do not instantiation the MathUtil class because it is a static class.');
        }
        /**
         * Returns a number constrained between min and max.
         *
         * @method constrain
         * @param num {number}
         * @param min {number}
         * @param  max {number}
         * @return  {number}
         * @example
         *      MathUtil.constrain(12, 3, 20);
         *      // 12
         *
         *      MathUtil.constrain(22, 3, 20);
         *      // 20
         *
         *      MathUtil.constrain(0, 3, 20);
         *      // 3
         */
        MathUtil.constrain = function (num, min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            if (num < min) {
                return min;
            }
            if (num > max) {
                return max;
            }
            return num;
        };

        /**
         * Returns a random number between min and max.
         *
         * @method randomRange
         * @param min {number}
         * @param max {number}
         * @param [wholeNumber=true] {number}
         * @return {number}
         * @example
         *
         */
        MathUtil.randomRange = function (min, max, wholeNumber) {
            if (typeof wholeNumber === "undefined") { wholeNumber = true; }
            var num = (min + Math.random() * (max - min));

            if (wholeNumber) {
                return Math.round(num);
            }
            return num;
        };

        /**
         * Returns the percentage of a number in a given range.
         * Example: num = 15 range 10 to 20 // outputs 0.5
         *
         * @method rangeToPercent
         * @param num {number}
         * @param min {number}
         * @param max {number}
         * @param constrainMin {boolean}        Returns 0 if num < min.
         * @param constrainMax {boolean}        Returns 1 if num > max.
         * @return {number}
         * @example
         *      MathUtil.rangeToPercent(15, 10, 20);
         *      // 0.5
         */
        MathUtil.rangeToPercent = function (num, min, max, constrainMin, constrainMax) {
            if (typeof constrainMin === "undefined") { constrainMin = false; }
            if (typeof constrainMax === "undefined") { constrainMax = false; }
            if (constrainMin && num < min) {
                return 0;
            }
            if (constrainMax && num > max) {
                return 1;
            }
            return (num - min) / (max - min);
        };

        /**
         * Returns the number that corresponds to the percentage in a given range.
         * Example: percent = 0.5 range 10 to 20 // outputs 15
         *
         * @method percentToRange
         * @param percent {number}
         * @param min {number}
         * @param max {number}
         * @return {number}
         * @example
         *      MathUtil.percentToRange(0.5, 10, 20);
         *      // 15
         */
        MathUtil.percentToRange = function (percent, min, max) {
            return (percent * (max - min)) + min;
        };

        /**
         * Re-maps a number from one range to another. The output is the same as inputing the result of rangeToPercent() numbero percentToRange().
         * Example: num = 10, min1 = 0, max1 = 100, min2 = 0, max2 = 50 // outputs 5
         *
         * @method map
         * @param num {number}
         * @param min1 {number}
         * @param max1 {number}
         * @param min2 {number}
         * @param max2 {number}
         * @return {number}
         * @example
         *      MathUtil.map(10, 0, 100, 0, 50);
         *      // 5
         */
        MathUtil.map = function (num, min1, max1, min2, max2, round, constrainMin, constrainMax) {
            if (typeof round === "undefined") { round = true; }
            if (typeof constrainMin === "undefined") { constrainMin = true; }
            if (typeof constrainMax === "undefined") { constrainMax = true; }
            if (constrainMin && num < min1) {
                return min2;
            }
            if (constrainMax && num > max1) {
                return max2;
            }

            var num1 = (num - min1) / (max1 - min1);
            var num2 = (num1 * (max2 - min2)) + min2;
            if (round) {
                return Math.round(num2);
            }
            return num2;
        };

        /**
         * Converts radians to degrees.
         *
         * @method radiansToDegrees
         * @param radians {number}
         * @return {number}
         * @example
         *      MathUtil.radiansToDegrees(1.5707963267948966);
         *      // 90
         *
         *      MathUtil.radiansToDegrees(3.141592653589793);
         *      // 180
         */
        MathUtil.radiansToDegrees = function (radians) {
            return radians * (180 / Math.PI);
        };

        /**
         * Converts degrees to radians.
         *
         * @method degreesToRadians
         * @param degrees {number}
         * @return {number}
         * @example
         *      MathUtil.degreesToRadians(90);
         *      // 1.5707963267948966
         *
         *      MathUtil.degreesToRadians(180);
         *      // 3.141592653589793
         */
        MathUtil.degreesToRadians = function (degrees) {
            return (degrees * Math.PI / 180);
        };

        /**
         * Returns 1 if the value is >= 0. Returns -1 if the value is < 0.
         *
         * @method sign
         * @param num {number}
         * @return {number}
         * @example
         *      MathUtil.sign(23);
         *      // 1
         *
         *      MathUtil.sign(-23);
         *      // -1
         */
        MathUtil.sign = function (num) {
            if (num < 0) {
                return -1;
            }
            return 1;
        };

        /**
         * Check if number is positive (zero is positive).
         *
         * @method isPositive
         * @param num {number} The number.
         * @return {boolean}
         * @example
         *      MathUtil.isPositive(23);
         *      // true
         *
         *      MathUtil.isPositive(-23);
         *      // false
         */
        MathUtil.isPositive = function (num) {
            return (num >= 0);
        };

        /**
         * Check if number is negative.
         *
         * @method isNegative
         * @param num {number} The
         * @return {boolean}
         * @example
         *      MathUtil.isNegative(23);
         *      // false
         *
         *      MathUtil.isNegative(-23);
         *      // true
         */
        MathUtil.isNegative = function (num) {
            return (num < 0);
        };

        /**
         * Check if number is odd (convert to Integer if necessary).
         *
         * @method isOdd
         * @param num {number} The number.
         * @return {boolean}
         * @example
         *      MathUtil.isOdd(2);
         *      // false
         *
         *      MathUtil.isOdd(3);
         *      // true
         */
        MathUtil.isOdd = function (num) {
            var i = num;
            var e = 2;
            return Boolean(i % e);
        };

        /**
         * Check if number is even (convert to Integer if necessary).
         *
         * @method isEven
         * @param num {number} The number.
         * @return {boolean}
         * @example
         *      MathUtil.isEven(2);
         *      // true
         *
         *      MathUtil.isEven(3);
         *      // false
         */
        MathUtil.isEven = function (num) {
            var int = num;
            var e = 2;
            return (int % e == 0);
        };

        /**
         * Check if number is Prime (divisible only by itself and one).
         *
         * @method isPrime
         * @param num {number} The number.
         * @return {boolean}
         * @example
         *      MathUtil.isPrime(4);
         *      // false
         *
         *      MathUtil.isPrime(5);
         *      // true
         */
        MathUtil.isPrime = function (num) {
            if (num > 2 && num % 2 == 0) {
                return false;
            }
            var l = Math.sqrt(num);
            var i = 3;
            for (i; i <= l; i += 2) {
                if (num % i == 0) {
                    return false;
                }
            }
            return true;
        };

        /**
         * Calculate the factorial of the integer.
         *
         * @method factorial
         * @param num {number} The number.
         * @return {number}
         * @example
         *      MathUtil.factorial(5);
         *      // 120
         *
         *      MathUtil.factorial(9);
         *      // 362880
         */
        MathUtil.factorial = function (num) {
            if (num == 0) {
                return 1;
            }
            var d = num.valueOf();
            var i = d - 1;
            while (i) {
                d = d * i;
                i--;
            }
            return d;
        };

        /**
         * Return an array of divisors of the integer.
         *
         * @method getDivisors
         * @param num {number} The number.
         * @return {Array.<number>}
         * @example
         *
         */
        MathUtil.getDivisors = function (num) {
            var r = [];

            for (var i = 1, e = num / 2; i <= e; i++) {
                if (num % i == 0) {
                    r.push(i);
                }
            }

            if (num != 0) {
                r.push(num.valueOf());
            }

            return r;
        };

        /**
         * Convert Fahrenheit to Celsius.
         *
         * @method fahrenheitToCelsius
         * @param fahrenheit {number} The fahrenheit value.
         * @param decimals {number} The number of decimals.
         * @return {number}
         * @example
         *      MathUtil.fahrenheitToCelsius(32);
         *      // 0
         *
         *      MathUtil.fahrenheitToCelsius(212);
         *      // 100
         */
        MathUtil.fahrenheitToCelsius = function (fahrenheit, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (5 / 9) * (fahrenheit - 32);
            var s = r.toString().split('.');
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += '0';
                    i--;
                }
            }
            var c = s[0] + '.' + d;
            return Number(c);
        };

        /**
         * Convert Celsius to Fahrenheit.
         *
         * @method celsiusToFahrenheit
         * @param celsius {number} The celsius value.
         * @param decimals {number} The number of decimals.
         * @return {number}
         * @example
         *      MathUtil.celsiusToFahrenheit(0);
         *      // 32
         *
         *      MathUtil.celsiusToFahrenheit(100);
         *      // 212
         */
        MathUtil.celsiusToFahrenheit = function (celsius, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (celsius / (5 / 9)) + 32;
            var s = r.toString().split('.');
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += '0';
                    i--;
                }
            }
            var f = s[0] + '.' + d;
            return Number(f);
        };
        return MathUtil;
    })();

    return MathUtil;
}));

/**
 * The NumberUtil class has many helper methods to work with number data.
 *
 * @class NumberUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureTS
{
    export class NumberUtil
    {
        constructor()
        {
            throw new Error('[NumberUtil] Do not instantiation the NumberUtil class because it is a static class.');
        }

        /**
         * Converts bytes into megabytes.
         *
         * @method bytesToMegabytes
         * @param bytes {number}
         * @returns {number}
         * @public
         * @static
         * @example
         *
         */
        public static bytesToMegabytes(bytes:number):number
        {
            return bytes / 1048576;
        }

        /**
         * Converts centimeters into inches.
         *
         * @method centimeterToInch
         * @param cm {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *     NumberUtil.centimeterToInch(1);
         *     // 0.3937
         */
        public static centimeterToInch(cm:number):number
        {
            return cm * 0.39370;
        }

        /**
         * Converts inches into centimeters.
         *
         * @method inchToCentimeter
         * @param inch {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *     NumberUtil.inchToCentimeter(1);
         *     // 2.54
         */
        public static inchToCentimeter(inch:number):number
        {
            return inch * 2.54;
        }

        /**
         * Converts feet into meters.
         *
         * @method feetToMeter
         * @param feet {number}
         * @public
         * @static
         * @returns {number}
         * @example
         *
         */
        public static feetToMeter(feet:number):number
        {
            return feet / 3.2808;
        }

        /**
         * Converts seconds into hour, minutes, seconds.
         *
         * @method convertToHHMMSS
         * @param seconds {number}
         * @returns {string}
         * @public
         * @static
         * @example
         *     NumberUtil.convertToHHMMSS(33333);
         *     // '09:15:33'
         */
        public static convertToHHMMSS(seconds:number):string
        {
            var sec:number = isNaN(seconds) ? 0 : seconds;//Changes NaN to 0

            var s:number = sec % 60;
            var m:number = Math.floor((sec % 3600 ) / 60);
            var h:number = Math.floor(sec / (60 * 60));

            var hourStr:string = (h == 0) ? '' : NumberUtil.doubleDigitFormat(h) + ':';
            var minuteStr:string = NumberUtil.doubleDigitFormat(m) + ':';
            var secondsStr:string = NumberUtil.doubleDigitFormat(s);

            return hourStr + minuteStr + secondsStr;
        }

        /**
         * Formats a number from 0-9 to display with 2 digits.
         *
         * @method doubleDigitFormat
         * @param num {number}
         * @returns {string}
         * @public
         * @static
         * @example
         *     NumberUtil.doubleDigitFormat(0);
         *     // '00'
         *
         *     NumberUtil.doubleDigitFormat(5);
         *     // '05'
         *
         *     NumberUtil.doubleDigitFormat(9);
         *     // '09'
         */
        public static doubleDigitFormat(num:number):string
        {
            if (num < 10)
            {
                return ('0' + num);
            }
            return String(num);
        }

        /**
         * Formats a currency string as a number.
         *
         * @method unformatUnit
         * @param value {string} The string currency that you want converted into a number.
         * @returns {number} Returns the number value of the currency string.
         * @public
         * @static
         * @example
         *     NumberUtil.unformatUnit('$1,234,567.89');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('1.234.567,89 €');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('$-123,456,789.99');
         *     // -123456789.99
         */
        public static unformatUnit(value:string):number
        {
            // Removes all characters and spaces except the period (.), comma (,) and the negative symbol (-).
            var withoutSpecialCharacters:string = value.replace(/[^\d.,-]/g, '');

            // Gets the index where the decimal placement is located.
            var decimalIndex:number = withoutSpecialCharacters.length - 3;
            var decimalSeparator:string = withoutSpecialCharacters.charAt(decimalIndex);
            if (decimalSeparator === '.')
            {
                // Removes all comma (,) characters and leaves the period (.) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d.-]/g, '');
            }
            else
            {
                // Removes all period (.) characters and leaves the comma (,) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d,-]/g, '');
                decimalIndex = withoutSpecialCharacters.length - 3;
                //Replaces the comma (,) to a period (.).
                withoutSpecialCharacters = withoutSpecialCharacters.replace(',', '.');
            }
            return parseFloat(withoutSpecialCharacters);
        }

        /**
         * Formats a number as a currency string.
         *
         * @method formatUnit
         * @param value {number} The number value you want formatted.
         * @param [decimalPlacement=2] {number} How many decimal placements you want to show.
         * @param [decimalSeparator='.'] {string} The character you want to use as the thousands separator.
         * @param [thousandsSeparator=','] {string} The character you want to use as the thousands separator.
         * @param [currencySymbol=''] {string} The symbol you would like to add.
         * @param [currencySymbolPlacement=0] {number} The placement of the symbol. Use 0 to place in front or 1 to place at the end.
         * @returns {string} Returns the formatted currency.
         * @public
         * @static
         * @example
         *     NumberUtil.formatUnit(1234567.89, 2, ".", ",", "$", 0);
         *     // '$1,234,567.89'
         *
         *     NumberUtil.formatUnit(12341234.56, 2, "*", ",", " €", 1);
         *     // '12,341,234*56 €'
         *
         *     NumberUtil.formatUnit(-1900.24, 1);
         *     // '-1,900.2'
         */
        public static formatUnit(value:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ',', currencySymbol:string = '', currencySymbolPlacement:number = 0):string
        {
            var str:string = String(Number(value).toFixed(decimalPlacement));
            var result:string = '';
            if (decimalPlacement != 0)
            {
                result = str.slice(-1 - decimalPlacement);
                result = result.replace('.', decimalSeparator);
                str = str.slice(0, str.length - 1 - decimalPlacement);
            }
            while (str.length > 3)
            {
                result = thousandsSeparator + str.slice(-3) + result;
                str = str.slice(0, str.length - 3);
            }
            if (str.length > 0)
            {
                if (currencySymbolPlacement === 0)
                {
                    result = currencySymbol + str + result;
                }
                else if (currencySymbolPlacement === 1)
                {
                    result = str + result + currencySymbol;
                }
                else
                {
                    result = str + result;
                }
            }
            return result;
        }
    }
}
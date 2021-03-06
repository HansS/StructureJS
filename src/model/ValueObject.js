/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../BaseObject'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.ValueObject = factory(root.structurejs.Extend, root.structurejs.BaseObject, root.structurejs.Util);
    }
}(this, function(Extend, BaseObject, Util) {
    'use strict';

    /**
     * Value Object (VO) is a design pattern used to transfer data between software application subsystems.
     *
     * @class ValueObject
     * @extends BaseObject
     * @param [data] {any} Provide a way to update the value object upon initialization.
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires BaseObject
     * @requires Util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ValueObject = (function () {

        var _super = Extend(ValueObject, BaseObject);

        function ValueObject() {
            _super.call(this);
        }
        /**
         * Provide a way to update the value object.
         *
         * @method update
         * @param data {any}
         * @public
         */
        ValueObject.prototype.update = function (data) {
            for (var key in data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = data[key];
                }
            }

            return this;
        };

        /**
         * ...
         *
         * @method toJSON
         * @returns {ValueObject}
         * @public
         */
        ValueObject.prototype.toJSON = function () {
            var clone = this.clone();
            return Util.deletePropertyFromObject(clone, ['cid']);
        };

        /**
         * ...
         *
         * @method toJSONString
         * @returns {string}
         * @public
         */
        ValueObject.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };

        /**
         * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         */
        ValueObject.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);

            return this;
        };

        /**
         *
         *
         * @method Object
         * @returns {any}
         * @public
         */
        ValueObject.prototype.clone = function () {
            return Util.clone(this);
        };

        /**
         *
         *
         * @method copy
         * @returns {IValueObject}
         * @public
         */
        ValueObject.prototype.copy = function () {
            var copy = new Object();

            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    copy[key] = this[key];
                }
            }

            return copy;
        };
        return ValueObject;
    })();

    return ValueObject;
}));
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../model/Route', '../event/RouterEvent', '../util/StringUtil'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../model/Route'), require('../event/RouterEvent'), require('../util/StringUtil'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.Router = factory(root.structurejs.Route, root.structurejs.RouterEvent, root.structurejs.StringUtil);
    }
}(this, function(Route, RouterEvent, StringUtil) {
    'use strict';

    /**
     * The **Router** class is a static class allows you to add different route patterns that can be matched to help control your application. Look at the Router.{{#crossLink "Router/add:method"}}{{/crossLink}} method for more details and examples.
     *
     * @class Router
     * @module StructureJS
     * @submodule controller
     * @requires Route
     * @requires RouterEvent
     * @requires StringUtil
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var Router = (function () {
        function Router() {
            throw new Error('[Router] Do not instantiation the Router class because it is a static class.');
        }
        /**
         * The **Router.add** method allows you to listen for route patterns to be matched. When a match is found the callback will be executed passing a {{#crossLink "RouterEvent"}}{{/crossLink}}.
         *
         * @method add
         * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''. See the examples below for more details.
         * @param callback {Function} The function that should be executed when a request matches the routePattern. It will receive a {{#crossLink "RouterEvent"}}{{/crossLink}} object.
         * @param callbackScope {any} The scope of the callback function that should be executed.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener and the function callback below.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // The above route listener would match the below url:
         *     // www.site.com/#/games/asteroids/2/
         *
         *     // The Call back receives a RouterEvent object.
         *     ClassName.prototype.onRouteHandler = function (routerEvent) {
        *         console.log(routerEvent.params);
        *     }
         *
         * Route Pattern Options:
         * ----------------------
         * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/contact/:name:/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/contact/
         *     // www.site.com/#/contact/heather/
         *     // www.site.com/#/contact/john/
         *
         *
         * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/product/{productName}/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/product/shoes/
         *     // www.site.com/#/product/jackets/
         *
         *
         * **\*** The asterisk character means it will match all or part of part the hash url.
         *
         *     Router.add('*', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/anything/
         *     // www.site.com/#/matches/any/hash/url/
         *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
         *
         *
         * **?** The question mark character means it will match a query string for the hash url.
         *
         *     Router.add('?', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/?one=1&two=2&three=3
         *     // www.site.com/#?one=1&two=2&three=3
         *
         *
         * **''** The empty string means it will match when there are no hash url.
         *
         *     Router.add('', this.method, this);
         *     Router.add('/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/
         *     // www.site.com/#/
         *
         *
         * Other possible combinations but not limited too:
         *
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *     Router.add('/home/?', this.method3, this);
         *     Router.add('/about/*', this.method4, this);
         *
         */
        Router.add = function (routePattern, callback, callbackScope) {
            Router.enable();

            var route = new Route(routePattern, callback, callbackScope);

            Router._routes.push(route);
        };

        /**
         * The **Router.remove** method will remove one of the added routes.
         *
         * @method remove
         * @param routePattern {string} Must be the same string pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callback {Function} Must be the same function you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callbackScope {any} Must be the same scope off the callback pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // Example of removing the same added route listener above.
         *     Router.remove('/games/{gameName}/:level:/', this.onRouteHandler, this);
         */
        Router.remove = function (routePattern, callback, callbackScope) {
            var route;

            // Since we are removing (splice) from routes we need to check the length every iteration.
            for (var i = Router._routes.length - 1; i >= 0; i--) {
                route = Router._routes[i];
                if (route.routePattern === routePattern && route.callback === callback && route.callbackScope === callbackScope) {
                    Router._routes.splice(i, 1);
                }
            }
        };

        /**
         * The **Router.addDefault** method is meant to trigger a callback function if there are no route matches are found.
         *
         * @method addDefault
         * @param callback {Function}
         * @param callbackScope {any}
         * @public
         * @static
         * @example
         *     Router.addDefault(this.noRoutesFoundHandler, this);
         */
        Router.addDefault = function (callback, callbackScope) {
            Router._defaultRoute = new Route('', callback, callbackScope);
        };

        /**
         * The **Router.removeDefault** method will remove the default callback that was added by the **Router.addDefault** method.
         *
         * @method removeDefault
         * @public
         * @static
         * @example
         *     Router.removeDefault();
         */
        Router.removeDefault = function () {
            Router._defaultRoute = null;
        };

        /**
         * Gets the current hash url minus the # or #! symbol(s).
         *
         * @method getHash
         * @public
         * @static
         * @return {string} Returns current hash url minus the # or #! symbol(s).
         * @example
         *     var str = Router.getHash();
         */
        Router.getHash = function () {
            var hash = Router._window.location.hash;
            var strIndex = (hash.substr(0, 2) === '#!') ? 2 : 1;

            return hash.substring(strIndex);
        };

        /**
         * The **Router.enable** method will allow the Router class to listen for the hashchange event. By default the Router class is enabled.
         *
         * @method enable
         * @public
         * @static
         * @example
         *     Router.enable();
         */
        Router.enable = function () {
            if (Router.isEnabled === true)
                return;

            if (Router._window.addEventListener) {
                Router._window.addEventListener('hashchange', Router.onHashChange, false);
            } else {
                Router._window.attachEvent('onhashchange', Router.onHashChange);
            }

            Router.isEnabled = true;
        };

        /**
         * The **Router.disable** method will stop the Router class from listening for the hashchange event.
         *
         * @method disable
         * @public
         * @static
         * @example
         *     Router.disable();
         */
        Router.disable = function () {
            if (Router.isEnabled === false)
                return;

            if (Router._window.removeEventListener) {
                Router._window.removeEventListener('hashchange', Router.onHashChange);
            } else {
                Router._window.detachEvent('onhashchange', Router.onHashChange);
            }

            Router.isEnabled = false;
        };

        /**
         * The **Router.start** method is meant to trigger or check the hash url on page load.
         * Either you can call this method after you add all your routers or after all data is loaded.
         * It is recommend you only call this once per page or application instantiation.
         *
         * @method start
         * @public
         * @static
         * @example
         *     // Example of adding routes and calling the start method.
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *
         *     Router.start();
         */
        Router.start = function () {
            setTimeout(Router.onHashChange, 1);
        };

        /**
         * The **Router.navigateTo** method allows you to change the hash url and to trigger a route
         * that matches the string value. The second parameter is **silent** and is **false** by
         * default. This allows you to update the hash url without causing a route callback to be
         * executed.
         *
         * @method navigateTo
         * @param route {String}
         * @param [silent=false] {Boolean}
         * @param [disableHistory=false] {Boolean}
         * @public
         * @static
         * @example
         *     // This will update the hash url and trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/');
         *
         *     // This will update the hash url but will not trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true);
         *
         *     // This will not update the hash url but will trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true, true);
         */
        Router.navigateTo = function (route, silent, disableHistory) {
            if (typeof silent === "undefined") { silent = false; }
            if (typeof disableHistory === "undefined") { disableHistory = false; }
            if (Router.isEnabled === false)
                return;

            if (route.charAt(0) === '#') {
                var strIndex = (route.substr(0, 2) === '#!') ? 2 : 1;
                route = route.substring(strIndex);
            }

            // Enforce starting slash
            if (route.charAt(0) !== '/' && Router.forceSlash === true) {
                route = '/' + route;
            }

            if (disableHistory === true) {
                Router.changeRoute(route);
                return;
            }

            if (Router.useDeepLinking === true) {
                if (silent === true) {
                    Router.disable();
                    setTimeout(function () {
                        window.location.hash = route;
                        setTimeout(Router.enable, 1);
                    }, 1);
                } else {
                    setTimeout(function () {
                        window.location.hash = route;
                    }, 1);
                }
            } else {
                Router.changeRoute(route);
            }
        };

        /**
         * The **Router.clear** will remove all route's and the default route from the Router class.
         *
         * @method clear
         * @public
         * @static
         * @example
         *     Router.clear();
         */
        Router.prototype.clear = function () {
            Router._routes = [];
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };

        /**
         * The **Router.destroy** method will null out all references to other objects in the Router class.
         *
         * @method destroy
         * @public
         * @static
         * @example
         *     Router.destroy();
         */
        Router.prototype.destroy = function () {
            Router._window = null;
            Router._routes = null;
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };

        /**
         * This method will be called if the Window object dispatches a HashChangeEvent.
         * This method will not be called if the Router is disabled.
         *
         * @method onHashChange
         * @param event {HashChangeEvent}
         * @private
         * @static
         */
        Router.onHashChange = function (event) {
            if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false)
                return;

            Router._hashChangeEvent = event;

            var hash = Router.getHash();

            Router.changeRoute(hash);
        };

        /**
         * The method is responsible for check if one of the routes matches the string value passed in.
         *
         * @method changeRoute
         * @param hash {string}
         * @private
         * @static
         */
        Router.changeRoute = function (hash) {
            var route;
            var match;
            var routerEvent = null;

            for (var i = 0; i < Router._routes.length; i++) {
                route = Router._routes[i];
                match = route.match(hash);

                // If there is a match.
                if (match !== null) {
                    routerEvent = new RouterEvent();
                    routerEvent.route = match.shift();
                    routerEvent.params = match.slice(0, match.length);
                    routerEvent.routePattern = route.routePattern;
                    routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                    routerEvent.target = Router;
                    routerEvent.currentTarget = Router;

                    // Since we are removing (splice) from params we need to check the length every iteration.
                    for (var j = routerEvent.params.length - 1; j >= 0; j--) {
                        if (routerEvent.params[j] === '') {
                            routerEvent.params.splice(j, 1);
                        }
                    }

                    // If there was a hash change event then set the info we want to send.
                    if (Router._hashChangeEvent != null) {
                        routerEvent.newURL = Router._hashChangeEvent.newURL;
                        routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                    } else {
                        routerEvent.newURL = window.location.href;
                    }

                    // Execute the callback function and pass the route event.
                    route.callback.call(route.callbackScope, routerEvent);

                    // Only trigger the first route and stop checking.
                    if (Router.allowMultipleMatches === false) {
                        break;
                    }
                }
            }

            // If there are no route's matched and there is a default route. Then call that default route.
            if (routerEvent === null && Router._defaultRoute !== null) {
                routerEvent = new RouterEvent();
                routerEvent.route = hash;
                routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                routerEvent.target = Router;
                routerEvent.currentTarget = Router;

                if (Router._hashChangeEvent != null) {
                    routerEvent.newURL = Router._hashChangeEvent.newURL;
                    routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                } else {
                    routerEvent.newURL = window.location.href;
                }

                Router._defaultRoute.callback.call(Router._defaultRoute.callbackScope, routerEvent);
            }

            Router._hashChangeEvent = null;
        };
        /**
         * A reference to the browser Window Object.
         *
         * @property _window
         * @type {Window}
         * @private
         * @static
         */
        Router._window = window;

        /**
         * A list of the added Route objects.
         *
         * @property _routes
         * @type {Array<Route>}
         * @private
         * @static
         */
        Router._routes = [];

        /**
         * A reference to default route object.
         *
         * @property _defaultRoute
         * @type {Route}
         * @private
         * @static
         */
        Router._defaultRoute = null;

        /**
         * A reference to the hash change event that was sent from the Window Object.
         *
         * @property _hashChangeEvent
         * @type {any}
         * @private
         * @static
         */
        Router._hashChangeEvent = null;

        /**
         * Determines if the Router class is enabled or disabled.
         *
         * @property isEnabled
         * @type {boolean}
         * @readOnly
         * @public
         * @static
         * @example
         *     // Read only.
         *     console.log(Router.isEnabled);
         */
        Router.isEnabled = false;

        /**
         * The **Router.useDeepLinking** property tells the Router class weather it should change the hash url or not.
         * By **default** this property is set to **true**. If you set the property to **false** and using the **Router.navigateTo**
         * method the hash url will not change. This can be useful if you are making an application or game and you don't want the user
         * to know how to jump to other sections directly. See the **Router.{{#crossLink "Router/allowManualDeepLinking:property"}}{{/crossLink}}** to fully change the Router class
         * from relying on the hash url to an internal state controller.
         *
         * @property useDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = true;
         */
        Router.useDeepLinking = true;

        /**
         * The **Router.allowManualDeepLinking** property tells the Router class weather it should check for route matches if the
         * hash url changes in the browser. This property only works if the **Router. {{#crossLink "Router/useDeepLinking:property"}}{{/crossLink}}** is set to **false**.
         * This is useful when used with the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method to use your routes as states rather than using the hash url to control the application.
         *
         * What this allows you to do is have testers jump to sections or levels easily changing the hash url manually but then when it is ready for production I set the property to **false** so users cannot jump around if they figure out the url schema.
         *
         * @property allowManualDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = false;
         *     Router.allowManualDeepLinking = false;
         */
        Router.allowManualDeepLinking = true;

        /**
         * The **Router.forceSlash** property tells the Router class if the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method is called to
         * make sure the hash url has a forward slash after the **#** character like this **#/**.
         *
         * @property forceSlash
         * @type {boolean}
         * @default false
         * @public
         * @static
         * @example
         *     // To turn on forcing the forward slash
         *     Router.forceSlash = true;
         *
         *     // If forceSlash is set to true it will change the url from #contact/bob/ to #/contact/bob/
         *     // when using the navigateTo method.
         */
        Router.forceSlash = false;

        /**
         * The **Router.allowMultipleMatches** property tells the Router class if it should trigger one or all routes that match a route pattern.
         *
         * @property allowMultipleMatches
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     // Only allow the first route matched to be triggered.
         *     Router.allowMultipleMatches = false;
         */
        Router.allowMultipleMatches = true;
        return Router;
    })();

    return Router;
}));
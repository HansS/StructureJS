// Imports
var Extend = window.structurejs.Extend;
var Stage = window.structurejs.Stage;
var BaseEvent = window.structurejs.BaseEvent;
var EventBroker = window.structurejs.EventBroker;
var Router = window.structurejs.Router;

var GrandparentView = window.GrandparentView;

/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
var EventBubblingApp = (function () {

    var _super = Extend(EventBubblingApp, Stage);

    function EventBubblingApp() {
        _super.call(this);

        this._grandpaView = null;
        this._$clearButton = null;
        this._$stageMessage = null;
    }

    /**
     * @overridden EventBubblingApp.createChildren
     */
    EventBubblingApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._grandpaView = new GrandparentView(this.$element.find('.js-grandParentContent'));
        this.addChild(this._grandpaView);

        this._$clearButton = this.$element.find('.js-clearButton');
        this._$stageMessage = this.$element.find('.js-stageMessage');
    };

    /**
     * @overridden Stage.layoutChildren
     */
    EventBubblingApp.prototype.layoutChildren = function () {
        this._$stageMessage.text('');
        this._grandpaView.layoutChildren();

        return this;
    };

    /**
     * @overridden Stage.enable
     */
    EventBubblingApp.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        EventBroker.addEventListener(BaseEvent.CHANGE, this._onGlobalEvent, this);

        this._$clearButton.addEventListener('click', this._onClearClick, this);

        this._grandpaView.enable();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden Stage.disable
     */
    EventBubblingApp.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$clearButton.removeEventListener('click', this._onClearClick, this);

        this._grandpaView.disable();

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden Stage.destroy
     */
    EventBubblingApp.prototype.destroy = function () {
        this._grandpaView.destroy();

        _super.prototype.destroy.call(this);
    };

    EventBubblingApp.prototype._onClearClick = function (event) {
        this.layoutChildren();
    };

    EventBubblingApp.prototype._onBubbled = function (baseEvent) {
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$stageMessage.html(text);
    };

    EventBubblingApp.prototype._onGlobalEvent = function(baseEvent) {
        console.log("Global event dispatched", baseEvent);
    };

    return EventBubblingApp;
})();
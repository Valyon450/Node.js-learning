var MyEventEmitter = /** @class */ (function () {
    function MyEventEmitter() {
        this.eventHandlers = {};
    }
    MyEventEmitter.prototype.registerHandler = function (eventName, handler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    };
    MyEventEmitter.prototype.emitEvent = function (eventName) {
        var handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(function (handler) { return handler(); });
        }
    };
    return MyEventEmitter;
}());
var emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', function () { return console.log('User account updated'); });
emitter.emitEvent('userUpdated'); // Output: User account updated

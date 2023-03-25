"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySchoolSchema = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
exports.Player = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _x_decorators;
    let _x_initializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _animation_decorators;
    let _animation_initializers = [];
    return _a = class Player extends schema_1.Schema {
            constructor() {
                super(...arguments);
                this.x = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _x_initializers, void 0));
                this.y = __runInitializers(this, _y_initializers, void 0);
                this.animation = __runInitializers(this, _animation_initializers, void 0);
            }
        },
        (() => {
            _x_decorators = [(0, schema_1.type)('number')];
            _y_decorators = [(0, schema_1.type)('number')];
            _animation_decorators = [(0, schema_1.type)('string')];
            __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } } }, _x_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } } }, _y_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _animation_decorators, { kind: "field", name: "animation", static: false, private: false, access: { has: obj => "animation" in obj, get: obj => obj.animation, set: (obj, value) => { obj.animation = value; } } }, _animation_initializers, _instanceExtraInitializers);
        })(),
        _a;
})();
exports.MySchoolSchema = (() => {
    var _a;
    let _instanceExtraInitializers_1 = [];
    let _players_decorators;
    let _players_initializers = [];
    return _a = class MySchoolSchema extends schema_1.Schema {
            constructor() {
                super(...arguments);
                this.players = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _players_initializers, new schema_1.MapSchema()));
            }
        },
        (() => {
            _players_decorators = [(0, schema_1.type)({ map: Player })];
            __esDecorate(null, null, _players_decorators, { kind: "field", name: "players", static: false, private: false, access: { has: obj => "players" in obj, get: obj => obj.players, set: (obj, value) => { obj.players = value; } } }, _players_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
})();

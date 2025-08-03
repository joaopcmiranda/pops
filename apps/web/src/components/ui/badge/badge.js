"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = Badge;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_slot_1 = require("@radix-ui/react-slot");
var utils_ts_1 = require("@/lib/utils.ts");
var badge_variants_ts_1 = require("./badge-variants.ts");
function Badge(_a) {
    var className = _a.className, variant = _a.variant, _b = _a.asChild, asChild = _b === void 0 ? false : _b, props = __rest(_a, ["className", "variant", "asChild"]);
    var Comp = asChild ? react_slot_1.Slot : 'span';
    return (0, jsx_runtime_1.jsx)(Comp, __assign({ "data-slot": 'badge', className: (0, utils_ts_1.cn)((0, badge_variants_ts_1.badgeVariants)({ variant: variant }), className) }, props));
}

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
exports.Skeleton = Skeleton;
exports.SkeletonCard = SkeletonCard;
exports.SkeletonStats = SkeletonStats;
exports.SkeletonContent = SkeletonContent;
exports.SkeletonItineraryDay = SkeletonItineraryDay;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
function Skeleton(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ "data-slot": 'skeleton', className: (0, utils_1.cn)('bg-accent animate-pulse rounded-md', className) }, props)));
}
function SkeletonCard() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col space-y-3', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-[125px] w-[250px] rounded-xl' }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[250px]' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[200px]' })] })] }));
}
function SkeletonStats() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex space-x-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[100px]' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[80px]' })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[100px]' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[80px]' })] })] }));
}
function SkeletonContent() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-6 w-[300px]' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-full' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-full' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[80%]' })] }));
}
function SkeletonItineraryDay() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-3 p-4 border rounded-lg', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-5 w-[150px]' }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-full' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[90%]' }), (0, jsx_runtime_1.jsx)(Skeleton, { className: 'h-4 w-[70%]' })] })] }));
}

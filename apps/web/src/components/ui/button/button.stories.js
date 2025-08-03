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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactive = exports.States = exports.AllSizes = exports.AllVariants = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("./button");
var StoryWrapper_1 = require("../../StoryWrapper");
require("../../../styles/story-fonts.css");
var meta = {
    title: 'Components/UI/Button',
    component: button_1.Button,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
        disabled: {
            control: 'boolean',
        },
    },
};
exports.default = meta;
exports.Default = {
    render: function (args) { return (0, jsx_runtime_1.jsx)(button_1.Button, __assign({}, args, { children: "Default Button" })); },
    args: {
        variant: 'default',
        size: 'default',
    },
};
exports.AllVariants = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Button Variants', description: 'All available button variants with usage guidelines', background: 'gradient-blue', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-4 flex-wrap', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'default', children: "Default" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'destructive', children: "Destructive" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'outline', children: "Outline" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'secondary', children: "Secondary" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'ghost', children: "Ghost" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'link', children: "Link" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-blue-50 rounded-lg border border-blue-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-blue-900 mb-2', children: "Usage Guidelines:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-blue-800 space-y-1', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Default:" }), " Primary actions like \"Save\" or \"Create\""] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Destructive:" }), " Dangerous actions like \"Delete\""] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Outline:" }), " Secondary actions like \"Cancel\""] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Secondary:" }), " Tertiary actions or alternative options"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Ghost:" }), " Subtle actions that don't need emphasis"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Link:" }), " Navigation or text-like actions"] })] })] })] }) })); },
};
exports.AllSizes = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Button Sizes', description: 'All available button sizes from small to large', background: 'gradient-green', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-4 items-center flex-wrap', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: 'sm', children: "Small" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: 'default', children: "Default" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: 'lg', children: "Large" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: 'icon', children: "\uD83C\uDFAF" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-green-50 rounded-lg border border-green-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-green-900 mb-2', children: "Size Guidelines:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-800 space-y-1', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Small:" }), " Compact spaces, tables, cards"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Default:" }), " Most common use case"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Large:" }), " Hero sections, important CTAs"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Icon:" }), " Square buttons with just icons"] })] })] })] }) })); },
};
exports.States = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Button States', description: 'Interactive and disabled states for all button variants', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'text-lg font-semibold mb-3 text-gray-700', children: "Normal vs Disabled" }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-4 flex-wrap', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { children: "Normal" }), (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: true, children: "Disabled" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'text-lg font-semibold mb-3 text-gray-700', children: "All Variants Disabled" }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-4 flex-wrap', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'default', disabled: true, children: "Default" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'destructive', disabled: true, children: "Destructive" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'outline', disabled: true, children: "Outline" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'secondary', disabled: true, children: "Secondary" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'ghost', disabled: true, children: "Ghost" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-purple-50 rounded-lg border border-purple-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-purple-900 mb-2', children: "State Usage:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-purple-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Use disabled state when actions are temporarily unavailable" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Consider loading states for async operations" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Provide clear feedback when buttons become interactive again" })] })] })] }) })); },
};
exports.Interactive = {
    render: function (args) { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Interactive Button', description: 'Button with click interactions and configurable properties', background: 'gradient-orange', children: (0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)(button_1.Button, __assign({}, args, { onClick: function () { return alert('🎉 Button clicked! This demonstrates interactive behavior.'); }, children: "Click Me" })), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-orange-900 mb-2', children: "Interactive Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-orange-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click the button to see the alert dialog" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Use Ladle controls to change variant and size" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Test different combinations of properties" })] })] })] }) })); },
    args: {
        variant: 'default',
        size: 'default',
    },
};

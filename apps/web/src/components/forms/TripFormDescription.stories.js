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
exports.WithCharacterCounter = exports.WithWritingTips = exports.Interactive = exports.Prefilled = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TripFormDescription_1 = require("./TripFormDescription");
var DefaultForm = function () {
    var _a = (0, react_1.useState)({
        description: '',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 text-sm text-gray-600', children: (0, jsx_runtime_1.jsxs)("p", { children: ["Character count: ", formData.description.length] }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-6 p-4 bg-gray-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "Current Description:" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm', children: formData.description || '(empty)' })] })] }));
};
var meta = {
    title: 'Components/TripFormDescription',
    component: TripFormDescription_1.TripFormDescription,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(DefaultForm, {}) })); },
};
var PrefilledForm = function () {
    var _a = (0, react_1.useState)({
        description: "A week-long adventure through the beautiful cities of Brazil. We'll explore Rio de Janeiro's beaches, visit Christ the Redeemer, and experience the vibrant nightlife. This trip includes visits to Sugarloaf Mountain, Copacabana Beach, and several local restaurants to taste authentic Brazilian cuisine.",
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 text-sm text-gray-600', children: (0, jsx_runtime_1.jsxs)("p", { children: ["Character count: ", formData.description.length] }) })] }));
};
exports.Prefilled = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(PrefilledForm, {}) })); },
};
var InteractiveExamples = function () {
    var _a = (0, react_1.useState)(0), currentExample = _a[0], setCurrentExample = _a[1];
    var examples = [
        {
            name: 'Adventure Trip',
            description: 'An exciting adventure through mountain trails and scenic landscapes. Perfect for thrill-seekers and nature lovers!',
        },
        {
            name: 'Business Trip',
            description: 'Professional meetings and conferences in the city center. Includes networking events and client presentations.',
        },
        {
            name: 'Family Vacation',
            description: 'A fun-filled family vacation with activities for all ages. Theme parks, beaches, and memorable experiences await!',
        },
        {
            name: 'Romantic Getaway',
            description: 'A romantic escape to a beautiful destination. Candlelit dinners, sunset walks, and couples spa treatments included.',
        },
        {
            name: 'Cultural Journey',
            description: 'Immerse yourself in local culture, visit historic sites, museums, and traditional markets. Learn about the rich heritage and customs.',
        },
    ];
    var _b = (0, react_1.useState)({ description: examples[0].description }), formData = _b[0], setFormData = _b[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var loadExample = function (index) {
        setCurrentExample(index);
        setFormData({ description: examples[index].description });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-blue-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold mb-3', children: "Try These Description Examples:" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex flex-wrap gap-2', children: examples.map(function (example, index) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return loadExample(index); }, className: "px-3 py-1 rounded text-sm ".concat(currentExample === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border border-blue-600'), children: example.name }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg', children: [(0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 flex justify-between text-sm text-gray-600', children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Character count: ", formData.description.length] }), (0, jsx_runtime_1.jsx)("span", { children: formData.description.length > 500 ? '⚠️ Long description' : '✅ Good length' })] })] })] }));
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(InteractiveExamples, {}) })); },
};
var WritingTips = function () {
    var _a = (0, react_1.useState)({
        description: '',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var getWritingTip = function () {
        var length = formData.description.length;
        if (length === 0)
            return 'Start by describing what makes this trip special...';
        if (length < 50)
            return 'Tell us more! What activities are you planning?';
        if (length < 100)
            return 'Great start! Consider adding details about locations or experiences.';
        if (length < 200)
            return 'Excellent! Your description is detailed and engaging.';
        return 'Comprehensive description! This will help you remember all the details.';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-green-50 border border-green-200 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-green-800 mb-2', children: "Writing Tips" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-green-700 text-sm space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Describe what makes this trip unique" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Include planned activities and experiences" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Mention specific locations you want to visit" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Add personal goals or expectations" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Keep it personal - this is for you!" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg', children: [(0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 p-3 bg-blue-50 rounded-lg', children: (0, jsx_runtime_1.jsxs)("p", { className: 'text-blue-700 text-sm font-medium', children: ["\uD83D\uDCA1 ", getWritingTip()] }) }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-4 text-sm text-gray-600', children: (0, jsx_runtime_1.jsxs)("p", { children: ["Characters: ", formData.description.length, " | Words:", ' ', formData.description.split(' ').filter(function (w) { return w.length > 0; }).length] }) })] })] }));
};
exports.WithWritingTips = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(WritingTips, {}) })); },
};
var CharacterCounter = function () {
    var _a = (0, react_1.useState)({
        description: '',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var maxLength = 500;
    var remaining = maxLength - formData.description.length;
    var isNearLimit = remaining < 50;
    var isOverLimit = remaining < 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 flex justify-between items-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-600', children: (0, jsx_runtime_1.jsxs)("p", { children: ["Characters: ", formData.description.length, " / ", maxLength] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium ".concat(isOverLimit ? 'text-red-600' : isNearLimit ? 'text-yellow-600' : 'text-green-600'), children: isOverLimit ? '❌ Too long' : isNearLimit ? '⚠️ Almost full' : '✅ Good' })] }), (0, jsx_runtime_1.jsx)("div", { className: 'mt-2 w-full bg-gray-200 rounded-full h-2', children: (0, jsx_runtime_1.jsx)("div", { className: "h-2 rounded-full transition-all ".concat(isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-green-500'), style: { width: "".concat(Math.min(100, (formData.description.length / maxLength) * 100), "%") } }) })] }));
};
exports.WithCharacterCounter = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(CharacterCounter, {}) })); },
};

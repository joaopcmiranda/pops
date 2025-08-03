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
exports.Interactive = exports.WithValidation = exports.AllTripTypes = exports.Prefilled = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TripFormBasicInfo_1 = require("./TripFormBasicInfo");
var StoryWrapper_1 = require("../StoryWrapper");
require("../../styles/story-fonts.css");
var DefaultForm = function () {
    var _a = (0, react_1.useState)({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-6 p-4 bg-gray-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "Current Form Data:" }), (0, jsx_runtime_1.jsx)("pre", { className: 'text-sm', children: JSON.stringify(formData, null, 2) })] })] }));
};
var meta = {
    title: 'Components/TripFormBasicInfo',
    component: TripFormBasicInfo_1.TripFormBasicInfo,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Form - Basic Info', description: 'Trip creation form with title, destination, and type selection', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)(DefaultForm, {}) })); },
};
var PrefilledForm = function () {
    var _a = (0, react_1.useState)({
        title: 'Summer in Europe',
        destination: 'Paris',
        country: 'France',
        type: 'leisure',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: (0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleChange }) }));
};
exports.Prefilled = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Form - Prefilled Data', description: 'Form with existing data for editing trip information', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)(PrefilledForm, {}) })); },
};
var AllTripTypesForm = function () {
    var _a = (0, react_1.useState)({
        title: 'Business Trip to Tokyo',
        destination: 'Tokyo',
        country: 'Japan',
        type: 'business',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4', children: "Try Different Trip Types" }), (0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleChange })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "Trip Type Examples:" }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-2 gap-2 text-sm', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Leisure:" }), " Vacation, relaxation"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Business:" }), " Work trips, conferences"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Family:" }), " Family vacations, reunions"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Adventure:" }), " Hiking, extreme sports"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Honeymoon:" }), " Romantic getaways"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Solo:" }), " Personal journeys"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Group:" }), " Friends, organizations"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Other:" }), " Custom trip types"] })] })] })] }));
};
exports.AllTripTypes = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Form - All Trip Types', description: 'Form showcasing all available trip type options with examples', background: 'gradient-purple', children: (0, jsx_runtime_1.jsx)(AllTripTypesForm, {}) })); },
};
var ValidationForm = function () {
    var _a = (0, react_1.useState)({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), showValidation = _b[0], setShowValidation = _b[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        setShowValidation(false);
    };
    var validateForm = function () {
        setShowValidation(true);
        var isValid = formData.title && formData.destination && formData.country;
        alert(isValid ? '✅ Form is valid!' : '❌ Please fill all required fields');
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleChange }), showValidation && ((0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 space-y-2', children: [!formData.title && (0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 Trip title is required" }), !formData.destination && ((0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 Destination is required" })), !formData.country && (0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 Country is required" })] })), (0, jsx_runtime_1.jsx)("button", { onClick: validateForm, className: 'mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700', children: "Validate Form" })] }));
};
exports.WithValidation = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(ValidationForm, {}) })); },
};
var InteractiveExamples = function () {
    var _a = (0, react_1.useState)(0), currentExample = _a[0], setCurrentExample = _a[1];
    var examples = [
        {
            title: 'Tokyo Adventure',
            destination: 'Tokyo',
            country: 'Japan',
            type: 'adventure',
        },
        {
            title: 'European Business Tour',
            destination: 'Berlin',
            country: 'Germany',
            type: 'business',
        },
        {
            title: 'Maldives Honeymoon',
            destination: 'Malé',
            country: 'Maldives',
            type: 'honeymoon',
        },
        {
            title: 'Family Disney Trip',
            destination: 'Orlando',
            country: 'USA',
            type: 'family',
        },
    ];
    var _b = (0, react_1.useState)(examples[0]), formData = _b[0], setFormData = _b[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var loadExample = function (index) {
        setCurrentExample(index);
        setFormData(examples[index]);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-blue-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold mb-3', children: "Try These Examples:" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex flex-wrap gap-2', children: examples.map(function (example, index) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return loadExample(index); }, className: "px-3 py-1 rounded text-sm ".concat(currentExample === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border border-blue-600'), children: example.title }, index)); }) })] }), (0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-white rounded-lg', children: (0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleChange }) })] }));
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(InteractiveExamples, {}) })); },
};

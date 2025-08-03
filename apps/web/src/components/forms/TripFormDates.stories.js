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
exports.DateConstraints = exports.Interactive = exports.WithValidation = exports.Prefilled = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TripFormDates_1 = require("./TripFormDates");
var DefaultForm = function () {
    var _a = (0, react_1.useState)({
        startDate: '',
        endDate: '',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var calculateDuration = function () {
        if (formData.startDate && formData.endDate) {
            var start = new Date(formData.startDate);
            var end = new Date(formData.endDate);
            var diffTime = Math.abs(end.getTime() - start.getTime());
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return null;
    };
    var duration = calculateDuration();
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleChange }), duration && ((0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 p-4 bg-green-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-green-800', children: "Trip Duration" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-green-700', children: [duration, " ", duration === 1 ? 'day' : 'days'] })] })), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-6 p-4 bg-gray-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "Current Form Data:" }), (0, jsx_runtime_1.jsx)("pre", { className: 'text-sm', children: JSON.stringify(formData, null, 2) })] })] }));
};
var meta = {
    title: 'Components/TripFormDates',
    component: TripFormDates_1.TripFormDates,
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
        startDate: '2024-06-15',
        endDate: '2024-06-22',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleChange }) }));
};
exports.Prefilled = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(PrefilledForm, {}) })); },
};
var ValidationForm = function () {
    var _a = (0, react_1.useState)({
        startDate: '',
        endDate: '',
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), showValidation = _b[0], setShowValidation = _b[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        setShowValidation(false);
    };
    var validateDates = function () {
        setShowValidation(true);
        var errors = [];
        if (!formData.startDate)
            errors.push('Start date is required');
        if (!formData.endDate)
            errors.push('End date is required');
        if (formData.startDate && formData.endDate) {
            var start = new Date(formData.startDate);
            var end = new Date(formData.endDate);
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (start < today)
                errors.push('Start date cannot be in the past');
            if (end < start)
                errors.push('End date must be after start date');
            var diffTime = end.getTime() - start.getTime();
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 365)
                errors.push('Trip duration cannot exceed 1 year');
        }
        if (errors.length === 0) {
            alert('✅ Dates are valid!');
        }
        else {
            alert('❌ Validation errors:\n' + errors.join('\n'));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleChange }), showValidation && ((0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 space-y-2', children: [!formData.startDate && ((0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 Start date is required" })), !formData.endDate && (0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 End date is required" }), formData.startDate &&
                        formData.endDate &&
                        new Date(formData.endDate) < new Date(formData.startDate) && ((0, jsx_runtime_1.jsx)("div", { className: 'text-red-600 text-sm', children: "\u2022 End date must be after start date" }))] })), (0, jsx_runtime_1.jsx)("button", { onClick: validateDates, className: 'mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700', children: "Validate Dates" })] }));
};
exports.WithValidation = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(ValidationForm, {}) })); },
};
var InteractiveExamples = function () {
    var _a = (0, react_1.useState)(0), currentExample = _a[0], setCurrentExample = _a[1];
    var examples = [
        {
            name: 'Weekend Trip',
            startDate: '2024-03-15',
            endDate: '2024-03-17',
        },
        {
            name: 'Week-long Vacation',
            startDate: '2024-06-01',
            endDate: '2024-06-08',
        },
        {
            name: 'Extended Journey',
            startDate: '2024-09-01',
            endDate: '2024-09-30',
        },
        {
            name: 'Day Trip',
            startDate: '2024-04-20',
            endDate: '2024-04-20',
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
    var calculateDuration = function () {
        if (formData.startDate && formData.endDate) {
            var start = new Date(formData.startDate);
            var end = new Date(formData.endDate);
            var diffTime = Math.abs(end.getTime() - start.getTime());
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return null;
    };
    var duration = calculateDuration();
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-blue-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold mb-3', children: "Try These Date Ranges:" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex flex-wrap gap-2', children: examples.map(function (example, index) { return ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return loadExample(index); }, className: "px-3 py-1 rounded text-sm ".concat(currentExample === index
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border border-blue-600'), children: example.name }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg', children: [(0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleChange }), duration !== null && ((0, jsx_runtime_1.jsx)("div", { className: 'mt-4 p-4 bg-green-50 rounded-lg', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center justify-between', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-green-800', children: "Trip Duration" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-green-700', children: [duration, " ", duration === 1 ? 'day' : 'days'] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'text-2xl', children: duration === 1 ? '📅' : duration <= 7 ? '🗓️' : duration <= 30 ? '📆' : '🗓️✈️' })] }) }))] })] }));
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(InteractiveExamples, {}) })); },
};
var DateConstraintsDemo = function () {
    var _a = (0, react_1.useState)({
        startDate: '',
        endDate: '',
    }), formData = _a[0], setFormData = _a[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var today = new Date().toISOString().split('T')[0];
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-yellow-50 border border-yellow-200 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-yellow-800 mb-2', children: "Date Constraints Demo" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-yellow-700 text-sm space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Start date cannot be in the past" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 End date is automatically constrained by start date" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Try selecting dates to see the constraints in action" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-white rounded-lg', children: [(0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleChange }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 text-sm text-gray-600', children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Today:" }), " ", today] }), formData.startDate && ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Selected start:" }), " ", formData.startDate] })), formData.endDate && ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Selected end:" }), " ", formData.endDate] }))] })] })] }));
};
exports.DateConstraints = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)(DateConstraintsDemo, {}) })); },
};

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripCreationWizard = TripCreationWizard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_tsx_1 = require("./ui/button/button.tsx");
var card_1 = require("./ui/card");
var trpc_1 = require("@/utils/trpc");
var initialFormData = {
    title: '',
    destination: '',
    country: '',
    type: 'leisure',
    startDate: '',
    endDate: '',
    description: '',
    budget: 0,
    currency: 'USD',
    travelers: 1,
};
function TripCreationWizard(_a) {
    var _this = this;
    var onClose = _a.onClose, onTripCreated = _a.onTripCreated;
    var _b = (0, react_1.useState)(1), currentStep = _b[0], setCurrentStep = _b[1];
    var _c = (0, react_1.useState)(initialFormData), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var createTripMutation = trpc_1.trpc.trip.create.useMutation({
        onSuccess: function (data) {
            if (data === null || data === void 0 ? void 0 : data.data) {
                onTripCreated(data.data);
            }
        },
        onError: function (error) {
            console.error('Failed to create trip:', error);
        },
    });
    var steps = [
        { number: 1, title: 'Where', description: 'Choose your destination', icon: lucide_react_1.MapPin },
        { number: 2, title: 'When', description: 'Pick your dates', icon: lucide_react_1.Calendar },
        { number: 3, title: 'Who', description: 'Trip type & travelers', icon: lucide_react_1.Users },
        { number: 4, title: 'Details', description: 'Budget & more info', icon: lucide_react_1.FileText },
        { number: 5, title: 'Review', description: 'Confirm and create', icon: lucide_react_1.Check },
    ];
    var handleNext = function () {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
        else {
            handleSubmit();
        }
    };
    var handleBack = function () {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, createTripMutation.mutateAsync({
                            title: formData.title,
                            description: formData.description,
                            destination: formData.destination,
                            country: formData.country,
                            type: formData.type,
                            startDate: formData.startDate,
                            endDate: formData.endDate,
                            budget: {
                                total: formData.budget,
                                currency: formData.currency,
                                categories: {
                                    accommodation: 0,
                                    transport: 0,
                                    activities: 0,
                                    food: 0,
                                    shopping: 0,
                                    other: 0,
                                },
                            },
                            settings: {
                                timezone: 'UTC',
                                dateFormat: 'US',
                                currency: formData.currency,
                                notifications: {
                                    email: true,
                                    push: true,
                                    reminders: true,
                                },
                                privacy: 'private',
                            },
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to create trip:', error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsSubmitting(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var updateFormData = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var isStepValid = function () {
        switch (currentStep) {
            case 1:
                return formData.destination && formData.country;
            case 2:
                return formData.startDate && formData.endDate;
            case 3:
                return formData.type && formData.travelers > 0;
            case 4:
                return true; // Optional step
            case 5:
                return formData.title;
            default:
                return false;
        }
    };
    var renderStep = function () {
        switch (currentStep) {
            case 1:
                return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-12', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: 'w-24 h-24 text-blue-500 mx-auto mb-6' }), (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-bold text-gray-900 mb-4 font-['Poppins']", children: "Where are you going?" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-xl text-gray-600', children: "Tell us about your destination" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8 max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-3', children: "Destination City *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', value: formData.destination, onChange: function (e) { return updateFormData('destination', e.target.value); }, placeholder: 'e.g., Paris, Tokyo, New York', className: 'w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-3', children: "Country *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', value: formData.country, onChange: function (e) { return updateFormData('country', e.target.value); }, placeholder: 'e.g., France, Japan, USA', className: 'w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md' })] })] })] }));
            case 2:
                return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-12', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: 'w-24 h-24 text-green-500 mx-auto mb-6' }), (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-bold text-gray-900 mb-4 font-['Poppins']", children: "When are you traveling?" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-xl text-gray-600', children: "Choose your travel dates" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-3xl mx-auto', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-3', children: "Start Date *" }), (0, jsx_runtime_1.jsx)("input", { type: 'date', value: formData.startDate, onChange: function (e) { return updateFormData('startDate', e.target.value); }, className: 'w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-3', children: "End Date *" }), (0, jsx_runtime_1.jsx)("input", { type: 'date', value: formData.endDate, onChange: function (e) { return updateFormData('endDate', e.target.value); }, min: formData.startDate, className: 'w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md' })] })] }), formData.startDate && formData.endDate && ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 text-center mt-8 border border-blue-100', children: (0, jsx_runtime_1.jsxs)("p", { className: 'text-lg font-semibold text-blue-800', children: ["Trip duration:", ' ', Math.ceil((new Date(formData.endDate).getTime() -
                                                new Date(formData.startDate).getTime()) /
                                                (1000 * 60 * 60 * 24)), ' ', "days"] }) }))] })] }));
            case 3:
                return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-12', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: 'w-24 h-24 text-purple-500 mx-auto mb-6' }), (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl font-bold text-gray-900 mb-4 font-['Poppins']", children: "What type of trip?" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-xl text-gray-600', children: "Help us personalize your experience" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-10 max-w-4xl mx-auto', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-6', children: "Trip Type *" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-2 md:grid-cols-4 gap-4', children: [
                                                { value: 'leisure', label: 'Leisure', emoji: '🏖️' },
                                                { value: 'business', label: 'Business', emoji: '💼' },
                                                { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
                                                { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
                                                { value: 'honeymoon', label: 'Honeymoon', emoji: '💕' },
                                                { value: 'solo', label: 'Solo', emoji: '🚶' },
                                                { value: 'group', label: 'Group', emoji: '👥' },
                                                { value: 'other', label: 'Other', emoji: '✨' },
                                            ].map(function (type) { return ((0, jsx_runtime_1.jsxs)("button", { onClick: function () { return updateFormData('type', type.value); }, className: "p-6 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-lg ".concat(formData.type === type.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg scale-105'
                                                    : 'border-gray-200 hover:border-gray-300 bg-white shadow-sm hover:shadow-md'), children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-3xl mb-2', children: type.emoji }), (0, jsx_runtime_1.jsx)("div", { className: 'font-semibold text-base', children: type.label })] }, type.value)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-md mx-auto', children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-lg font-semibold text-gray-700 mb-3', children: "Number of Travelers *" }), (0, jsx_runtime_1.jsx)("input", { type: 'number', min: '1', max: '20', value: formData.travelers, onChange: function (e) { return updateFormData('travelers', parseInt(e.target.value) || 1); }, className: 'w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-lg transition-all duration-200 shadow-sm hover:shadow-md text-center font-semibold' })] })] })] }));
            case 4:
                return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: 'w-16 h-16 text-orange-500 mx-auto mb-4' }), (0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-900 mb-2', children: "Additional Details" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Budget and trip information (optional)" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-sm font-medium text-gray-700 mb-2', children: "Trip Title" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', value: formData.title, onChange: function (e) { return updateFormData('title', e.target.value); }, placeholder: "".concat(formData.destination, " ").concat(formData.type === 'leisure' ? 'Vacation' : formData.type === 'business' ? 'Trip' : 'Adventure'), className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-sm font-medium text-gray-700 mb-2', children: "Description" }), (0, jsx_runtime_1.jsx)("textarea", { value: formData.description, onChange: function (e) { return updateFormData('description', e.target.value); }, placeholder: 'Tell us about your trip plans...', rows: 3, className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical' })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-4', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-sm font-medium text-gray-700 mb-2', children: "Budget" }), (0, jsx_runtime_1.jsx)("input", { type: 'number', min: '0', value: formData.budget, onChange: function (e) { return updateFormData('budget', parseFloat(e.target.value) || 0); }, placeholder: '0', className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-sm font-medium text-gray-700 mb-2', children: "Currency" }), (0, jsx_runtime_1.jsxs)("select", { value: formData.currency, onChange: function (e) { return updateFormData('currency', e.target.value); }, className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg', children: [(0, jsx_runtime_1.jsx)("option", { value: 'USD', children: "USD ($)" }), (0, jsx_runtime_1.jsx)("option", { value: 'EUR', children: "EUR (\u20AC)" }), (0, jsx_runtime_1.jsx)("option", { value: 'GBP', children: "GBP (\u00A3)" }), (0, jsx_runtime_1.jsx)("option", { value: 'JPY', children: "JPY (\u00A5)" }), (0, jsx_runtime_1.jsx)("option", { value: 'CAD', children: "CAD ($)" }), (0, jsx_runtime_1.jsx)("option", { value: 'AUD', children: "AUD ($)" })] })] })] })] })] }));
            case 5:
                return ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: 'w-16 h-16 text-green-500 mx-auto mb-4' }), (0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-900 mb-2', children: "Review Your Trip" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Make sure everything looks good" })] }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: 'p-6 space-y-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-4', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Destination" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-gray-600', children: [formData.destination, ", ", formData.country] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Dates" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-gray-600', children: [new Date(formData.startDate).toLocaleDateString(), " -", ' ', new Date(formData.endDate).toLocaleDateString()] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Trip Type" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 capitalize', children: formData.type })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Travelers" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-gray-600', children: [formData.travelers, " ", formData.travelers === 1 ? 'person' : 'people'] })] })] }), formData.title && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Title" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: formData.title })] })), formData.description && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Description" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: formData.description })] })), formData.budget > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900 mb-2', children: "Budget" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-gray-600', children: [formData.currency, " ", formData.budget.toLocaleString()] })] }))] }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: 'block text-sm font-medium text-gray-700 mb-2', children: "Trip Title *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', value: formData.title, onChange: function (e) { return updateFormData('title', e.target.value); }, placeholder: "".concat(formData.destination, " ").concat(formData.type === 'leisure' ? 'Vacation' : formData.type === 'business' ? 'Trip' : 'Adventure'), className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg' })] })] }));
            default:
                return null;
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-white shadow-sm border-b', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-6xl mx-auto px-6 py-6 flex items-center justify-between', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center space-x-6', children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', onClick: onClose, className: 'p-3 hover:bg-gray-100 transition-colors', "aria-label": 'Close wizard', children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: 'w-6 h-6' }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 font-['Poppins']", children: "Create New Trip" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'text-lg font-medium text-gray-600', children: ["Step ", currentStep, " of ", steps.length] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white border-b', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-6xl mx-auto px-6 py-8', children: (0, jsx_runtime_1.jsx)("div", { className: 'flex items-center justify-between', children: steps.map(function (step, index) {
                            var Icon = step.icon;
                            var isActive = currentStep === step.number;
                            var isCompleted = currentStep > step.number;
                            return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col items-center', children: [(0, jsx_runtime_1.jsx)("div", { className: "w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-200 ".concat(isCompleted
                                                    ? 'bg-green-500 border-green-500 text-white shadow-lg'
                                                    : isActive
                                                        ? 'bg-blue-500 border-blue-500 text-white shadow-lg scale-110'
                                                        : 'border-gray-300 text-gray-400 bg-white'), children: isCompleted ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: 'w-7 h-7' }) : (0, jsx_runtime_1.jsx)(Icon, { className: 'w-7 h-7' }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-4 text-center', children: [(0, jsx_runtime_1.jsx)("div", { className: "text-lg font-semibold ".concat(isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'), children: step.title }), (0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500 hidden sm:block mt-1', children: step.description })] })] }), index < steps.length - 1 && ((0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-1 mx-6 rounded-full transition-colors duration-300 ".concat(currentStep > step.number ? 'bg-green-500' : 'bg-gray-200') }))] }, step.number));
                        }) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-4xl mx-auto px-6 py-12', children: (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden', children: [(0, jsx_runtime_1.jsx)("div", { className: 'p-12', children: renderStep() }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-gray-50 px-12 py-8 border-t border-gray-100', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between', children: [(0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { variant: 'outline', onClick: handleBack, disabled: currentStep === 1, className: 'flex items-center space-x-3 px-8 py-4 text-lg font-medium border-2 hover:bg-gray-50 transition-all duration-200', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: 'w-5 h-5' }), (0, jsx_runtime_1.jsx)("span", { children: "Back" })] }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { onClick: handleNext, disabled: !isStepValid() || isSubmitting, className: 'flex items-center space-x-3 px-10 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl', children: [(0, jsx_runtime_1.jsx)("span", { children: currentStep === 5 ? (isSubmitting ? 'Creating...' : 'Create Trip') : 'Next' }), currentStep < 5 && (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: 'w-5 h-5' })] })] }) })] }) })] }));
}

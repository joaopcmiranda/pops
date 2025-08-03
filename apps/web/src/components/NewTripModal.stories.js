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
exports.Interactive = exports.WithPrefilledData = exports.AlwaysOpen = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button/button");
var dialog_1 = require("./ui/dialog");
var TripFormBasicInfo_1 = require("./forms/TripFormBasicInfo");
var TripFormDates_1 = require("./forms/TripFormDates");
var TripFormDescription_1 = require("./forms/TripFormDescription");
// Mock NewTripModal component using smaller components
function MockNewTripModal(_a) {
    var _this = this;
    var isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = (0, react_1.useState)({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
        startDate: '',
        endDate: '',
        description: '',
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var handleChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    // Simulate API call
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 1:
                    // Simulate API call
                    _a.sent();
                    alert("\u2708\uFE0F Trip Created: \"".concat(formData.title, "\" to ").concat(formData.destination));
                    setIsSubmitting(false);
                    onClose();
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, onOpenChange: onClose, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: 'max-w-2xl', children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Trip" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { data: formData, onChange: handleChange }), (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { data: formData, onChange: handleChange }), (0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { data: formData, onChange: handleChange }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-end gap-3 pt-4', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: 'button', variant: 'outline', onClick: onClose, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', disabled: isSubmitting, children: isSubmitting ? 'Creating...' : 'Create Trip' })] })] })] }) }));
}
var meta = {
    title: 'Components/NewTripModal',
    component: MockNewTripModal,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
var DefaultComponent = function () {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setIsOpen(true); }, children: "Open New Trip Modal" }), (0, jsx_runtime_1.jsx)(MockNewTripModal, { isOpen: isOpen, onClose: function () { return setIsOpen(false); } })] }));
};
exports.Default = {
    render: function () { return (0, jsx_runtime_1.jsx)(DefaultComponent, {}); },
};
exports.AlwaysOpen = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8', children: (0, jsx_runtime_1.jsx)(MockNewTripModal, { isOpen: true, onClose: function () { return alert('Modal closed'); } }) })); },
};
var WithPrefilledDataComponent = function () {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setIsOpen(true); }, children: "Open Prefilled Modal" }), (0, jsx_runtime_1.jsx)(MockNewTripModal, { isOpen: isOpen, onClose: function () { return setIsOpen(false); } })] }));
};
exports.WithPrefilledData = {
    render: function () { return (0, jsx_runtime_1.jsx)(WithPrefilledDataComponent, {}); },
};
var InteractiveComponent = function () {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(0), tripCount = _b[0], setTripCount = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 space-y-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-2', children: "Interactive Trip Creation" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-gray-600', children: ["Trips created: ", tripCount] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setIsOpen(true); }, children: "Create New Trip" }), (0, jsx_runtime_1.jsx)(MockNewTripModal, { isOpen: isOpen, onClose: function () {
                    setIsOpen(false);
                    setTripCount(function (prev) { return prev + 1; });
                } })] }));
};
exports.Interactive = {
    render: function () { return (0, jsx_runtime_1.jsx)(InteractiveComponent, {}); },
};

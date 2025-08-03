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
exports.FormField = exports.Form = void 0;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormMessage = FormMessage;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var react_slot_1 = require("@radix-ui/react-slot");
var react_hook_form_1 = require("react-hook-form");
var utils_ts_1 = require("@/lib/utils.ts");
var label_tsx_1 = require("@/components/ui/label.tsx");
var context_tsx_1 = require("@/components/ui/form/context.tsx");
var useFormField_tsx_1 = require("@/components/ui/form/useFormField.tsx");
var Form = react_hook_form_1.FormProvider;
exports.Form = Form;
var FormField = function (_a) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)(context_tsx_1.FormFieldContext, { value: { name: props.name }, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, __assign({}, props)) }));
};
exports.FormField = FormField;
function FormItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var id = React.useId();
    return ((0, jsx_runtime_1.jsx)(FormItemContext.Provider, { value: { id: id }, children: (0, jsx_runtime_1.jsx)("div", __assign({ "data-slot": 'form-item', className: (0, utils_ts_1.cn)('grid gap-2', className) }, props)) }));
}
function FormLabel(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = (0, useFormField_tsx_1.default)(), error = _b.error, formItemId = _b.formItemId;
    return ((0, jsx_runtime_1.jsx)(label_tsx_1.Label, __assign({ "data-slot": 'form-label', "data-error": !!error, className: (0, utils_ts_1.cn)('data-[error=true]:text-destructive', className), htmlFor: formItemId }, props)));
}
function FormControl(_a) {
    var props = __rest(_a, []);
    var _b = (0, useFormField_tsx_1.default)(), error = _b.error, formItemId = _b.formItemId, formDescriptionId = _b.formDescriptionId, formMessageId = _b.formMessageId;
    return ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, __assign({ "data-slot": 'form-control', id: formItemId, "aria-describedby": !error ? "".concat(formDescriptionId) : "".concat(formDescriptionId, " ").concat(formMessageId), "aria-invalid": !!error }, props)));
}
function FormDescription(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var formDescriptionId = (0, useFormField_tsx_1.default)().formDescriptionId;
    return ((0, jsx_runtime_1.jsx)("p", __assign({ "data-slot": 'form-description', id: formDescriptionId, className: (0, utils_ts_1.cn)('text-muted-foreground text-sm', className) }, props)));
}
function FormMessage(_a) {
    var _b;
    var className = _a.className, props = __rest(_a, ["className"]);
    var _c = (0, useFormField_tsx_1.default)(), error = _c.error, formMessageId = _c.formMessageId;
    var body = error ? String((_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : '') : props.children;
    if (!body) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("p", __assign({ "data-slot": 'form-message', id: formMessageId, className: (0, utils_ts_1.cn)('text-destructive text-sm', className) }, props, { children: body })));
}

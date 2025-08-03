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
exports.useFormField = void 0;
var React = require("react");
var react_hook_form_1 = require("react-hook-form");
var useFormField = function () {
    var fieldContext = React.useContext(FormFieldContext);
    var itemContext = React.useContext(FormItemContext);
    var getFieldState = (0, react_hook_form_1.useFormContext)().getFieldState;
    var formState = (0, react_hook_form_1.useFormState)({ name: fieldContext.name });
    var fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }
    var id = itemContext.id;
    return __assign({ id: id, name: fieldContext.name, formItemId: "".concat(id, "-form-item"), formDescriptionId: "".concat(id, "-form-item-description"), formMessageId: "".concat(id, "-form-item-message") }, fieldState);
};
exports.useFormField = useFormField;

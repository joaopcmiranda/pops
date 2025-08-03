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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripPlanningForm = exports.ProfileSettings = exports.RegistrationForm = exports.BasicForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = require("zod");
var form_1 = require("./form");
var button_1 = require("../button/button");
var input_1 = require("../input");
var select_1 = require("../select");
var checkbox_1 = require("../checkbox");
var radio_group_1 = require("../radio-group");
var switch_1 = require("../switch");
var StoryWrapper_1 = require("../../StoryWrapper");
require("../../../styles/story-fonts.css");
// Basic form schema
var basicFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    age: z
        .number()
        .min(18, 'Must be at least 18 years old')
        .max(120, 'Must be less than 120 years old'),
});
var meta = {
    title: 'Components/UI/Form',
    component: form_1.Form,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
var BasicFormComponent = function () {
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(basicFormSchema),
        defaultValues: {
            name: '',
            email: '',
            age: 25,
        },
    });
    var onSubmit = function (values) {
        alert(JSON.stringify(values, null, 2));
    };
    return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Basic Form', description: 'A simple form with validation using react-hook-form and zod', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'name', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Name" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: 'Enter your name' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "This is your public display name." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'email', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Email" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'email', placeholder: 'Enter your email' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "We'll never share your email with anyone else." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'age', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Age" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'number', placeholder: 'Enter your age' }, field, { onChange: function (e) { return field.onChange(parseInt(e.target.value) || 0); } })) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "You must be at least 18 years old." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', className: 'w-full', children: "Submit" })] }) })) }) }));
};
exports.BasicForm = {
    render: function () { return (0, jsx_runtime_1.jsx)(BasicFormComponent, {}); },
};
// Registration form schema
var registrationSchema = z
    .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    country: z.string().min(1, 'Please select a country'),
    agreeToTerms: z.boolean().refine(function (val) { return val === true; }, 'You must agree to the terms'),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});
var RegistrationFormComponent = function () {
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(registrationSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            country: '',
            agreeToTerms: false,
        },
    });
    var onSubmit = function (values) {
        alert('Registration successful!\n' + JSON.stringify(values, null, 2));
    };
    return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Registration Form', description: 'A comprehensive registration form with various input types and validation', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'username', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Username" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: 'Choose a username' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'email', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Email" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'email', placeholder: 'your@email.com' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'password', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Password" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'password', placeholder: 'Enter password' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Must be at least 8 characters long." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'confirmPassword', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Confirm Password" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'password', placeholder: 'Confirm password' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'country', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Country" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: 'Select a country' }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'us', children: "United States" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'uk', children: "United Kingdom" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'ca', children: "Canada" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'au', children: "Australia" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'de', children: "Germany" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'fr', children: "France" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'agreeToTerms', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex flex-row items-start space-x-3 space-y-0', children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-1 leading-none', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "I agree to the terms and conditions" }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "You must agree to our terms to create an account." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] })] }));
                            } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', className: 'w-full', children: "Create Account" })] }) })) }) }));
};
exports.RegistrationForm = {
    render: function () { return (0, jsx_runtime_1.jsx)(RegistrationFormComponent, {}); },
};
// Profile settings schema
var profileSchema = z.object({
    displayName: z.string().min(1, 'Display name is required'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    notifications: z.object({
        email: z.boolean(),
        push: z.boolean(),
        marketing: z.boolean(),
    }),
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string().min(1, 'Please select a language'),
});
var ProfileSettingsComponent = function () {
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(profileSchema),
        defaultValues: {
            displayName: 'John Doe',
            bio: '',
            website: '',
            notifications: {
                email: true,
                push: false,
                marketing: false,
            },
            theme: 'system',
            language: 'en',
        },
    });
    var onSubmit = function (values) {
        alert('Profile updated!\n' + JSON.stringify(values, null, 2));
    };
    return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Profile Settings Form', description: 'A complex form with radio groups, switches, and nested objects', background: 'gradient-purple', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'displayName', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Display Name" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: 'Your display name' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "This is how others will see your name." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'bio', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Bio" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)("textarea", __assign({ placeholder: 'Tell us about yourself...', className: 'w-full min-h-[80px] p-2 border rounded-md resize-none' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Optional. Max 500 characters." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'website', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Website" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: 'https://yourwebsite.com' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Optional. Your personal or professional website." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-3', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Notification Preferences" }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'notifications.email', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex flex-row items-center justify-between rounded-lg border p-3', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-0.5', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Email Notifications" }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Receive notifications via email" })] }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: field.value, onCheckedChange: field.onChange }) })] }));
                                    } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'notifications.push', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex flex-row items-center justify-between rounded-lg border p-3', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-0.5', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Push Notifications" }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Receive push notifications on your device" })] }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: field.value, onCheckedChange: field.onChange }) })] }));
                                    } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'notifications.marketing', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex flex-row items-center justify-between rounded-lg border p-3', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-0.5', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Marketing Communications" }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Receive updates about new features and offers" })] }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: field.value, onCheckedChange: field.onChange }) })] }));
                                    } })] }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'theme', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'space-y-3', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Theme Preference" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, { onValueChange: field.onChange, defaultValue: field.value, className: 'flex flex-col space-y-1', children: [(0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex items-center space-x-3 space-y-0', children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: 'light' }) }), (0, jsx_runtime_1.jsx)(form_1.FormLabel, { className: 'font-normal', children: "Light" })] }), (0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex items-center space-x-3 space-y-0', children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: 'dark' }) }), (0, jsx_runtime_1.jsx)(form_1.FormLabel, { className: 'font-normal', children: "Dark" })] }), (0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex items-center space-x-3 space-y-0', children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: 'system' }) }), (0, jsx_runtime_1.jsx)(form_1.FormLabel, { className: 'font-normal', children: "System" })] })] }) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'language', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Language" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: 'Select a language' }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'en', children: "English" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'es', children: "Spanish" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'fr', children: "French" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'de', children: "German" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'it', children: "Italian" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'pt', children: "Portuguese" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', className: 'w-full', children: "Save Changes" })] }) })) }) }));
};
exports.ProfileSettings = {
    render: function () { return (0, jsx_runtime_1.jsx)(ProfileSettingsComponent, {}); },
};
// Trip planning form schema
var tripPlanningSchema = z.object({
    destination: z.string().min(1, 'Destination is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    budget: z.number().min(1, 'Budget must be greater than 0'),
    travelers: z.number().min(1, 'At least 1 traveler is required'),
    accommodationType: z.enum(['hotel', 'hostel', 'airbnb', 'camping']),
    activities: z.array(z.string()).min(1, 'Select at least one activity'),
    specialRequirements: z.string().optional(),
});
var TripPlanningFormComponent = function () {
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(tripPlanningSchema),
        defaultValues: {
            destination: '',
            startDate: '',
            endDate: '',
            budget: 1000,
            travelers: 2,
            accommodationType: 'hotel',
            activities: [],
            specialRequirements: '',
        },
    });
    var onSubmit = function (values) {
        alert('Trip planned!\n' + JSON.stringify(values, null, 2));
    };
    var activityOptions = [
        'sightseeing',
        'adventure',
        'culture',
        'food',
        'nightlife',
        'shopping',
        'nature',
        'relaxation',
    ];
    return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Planning Form', description: 'A specialized form for trip planning with various input types', background: 'gradient-orange', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'destination', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Destination" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: 'Where do you want to go?' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-2 gap-4', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'startDate', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Start Date" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'date' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                    } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'endDate', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "End Date" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'date' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                    } })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-2 gap-4', children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'budget', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Budget ($)" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'number', placeholder: '1000' }, field, { onChange: function (e) { return field.onChange(parseInt(e.target.value) || 0); } })) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                    } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'travelers', render: function (_a) {
                                        var field = _a.field;
                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Travelers" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ type: 'number', placeholder: '2' }, field, { onChange: function (e) { return field.onChange(parseInt(e.target.value) || 1); } })) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                    } })] }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'accommodationType', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Accommodation Type" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: 'Select accommodation type' }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'hotel', children: "Hotel" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'hostel', children: "Hostel" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'airbnb', children: "Airbnb" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: 'camping', children: "Camping" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'activities', render: function () { return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsxs)("div", { className: 'mb-4', children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Preferred Activities" }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Select all activities you're interested in" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-2 gap-2', children: activityOptions.map(function (activity) { return ((0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'activities', render: function (_a) {
                                                var _b;
                                                var field = _a.field;
                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { className: 'flex flex-row items-start space-x-3 space-y-0', children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: (_b = field.value) === null || _b === void 0 ? void 0 : _b.includes(activity), onCheckedChange: function (checked) {
                                                                    var _a;
                                                                    return checked
                                                                        ? field.onChange(__spreadArray(__spreadArray([], field.value, true), [activity], false))
                                                                        : field.onChange((_a = field.value) === null || _a === void 0 ? void 0 : _a.filter(function (value) { return value !== activity; }));
                                                                } }) }), (0, jsx_runtime_1.jsx)(form_1.FormLabel, { className: 'text-sm font-normal capitalize', children: activity })] }, activity));
                                            } }, activity)); }) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] })); } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: 'specialRequirements', render: function (_a) {
                                var field = _a.field;
                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "Special Requirements" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)("textarea", __assign({ placeholder: 'Any special requirements or requests...', className: 'w-full min-h-[60px] p-2 border rounded-md resize-none' }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormDescription, { children: "Optional. Accessibility needs, dietary restrictions, etc." }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                            } }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', className: 'w-full', children: "Plan My Trip" })] }) })) }) }));
};
exports.TripPlanningForm = {
    render: function () { return (0, jsx_runtime_1.jsx)(TripPlanningFormComponent, {}); },
};

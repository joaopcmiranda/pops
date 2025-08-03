"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileOptimized = exports.StepByStep = exports.Interactive = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TripCreationWizard_1 = require("./TripCreationWizard");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var WizardDemo = function () {
    var _a = (0, react_1.useState)(true), isOpen = _a[0], setIsOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isOpen && ((0, jsx_runtime_1.jsx)("div", { className: 'text-center p-8', children: (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setIsOpen(true); }, className: 'bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors', children: "Open Trip Creation Wizard" }) })), isOpen && ((0, jsx_runtime_1.jsx)(TripCreationWizard_1.TripCreationWizard, { onClose: function () { return setIsOpen(false); }, onTripCreated: function (trip) {
                    alert("\uD83C\uDF89 Trip created: ".concat(trip.title || 'New Trip'));
                    setIsOpen(false);
                } }))] }));
};
var meta = {
    title: 'Components/TripCreationWizard',
    component: TripCreationWizard_1.TripCreationWizard,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Creation Wizard - Complete Flow', description: 'Full-page wizard for creating a new trip with 5 steps: Where \u2192 When \u2192 Who \u2192 Details \u2192 Review', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)(WizardDemo, {}) })); },
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Creation Wizard - Interactive Demo', description: 'Click through the entire trip creation process with realistic form validation', background: 'gradient-green', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-green-50 rounded-lg p-6 border border-green-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-green-900 mb-4', children: "Wizard Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-800 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Step 1 - Where:" }), " Destination and country selection"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Step 2 - When:" }), " Travel date picker with duration calculation"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Step 3 - Who:" }), " Trip type selection and traveler count"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Step 4 - Details:" }), " Budget, title, and description (optional)"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Step 5 - Review:" }), " Final review and trip creation"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-blue-50 rounded-lg p-6 border border-blue-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-blue-900 mb-4', children: "UX Improvements:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-blue-800 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Mobile-First:" }), " Responsive design for all screen sizes"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Progressive Disclosure:" }), " One step at a time reduces cognitive load"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Visual Progress:" }), " Clear step indicators and completion states"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Smart Validation:" }), " Real-time validation with helpful feedback"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Full-Page Experience:" }), " No modal constraints, plenty of space"] })] })] }), (0, jsx_runtime_1.jsx)(WizardDemo, {})] }) })); },
};
exports.StepByStep = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Creation Wizard - Step Showcase', description: 'Visual breakdown of each wizard step with explanations', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', children: [
                        {
                            step: 1,
                            title: 'Where',
                            description: 'Destination Selection',
                            features: ['City and country input', 'Location autocomplete', 'Validation required'],
                            color: 'blue',
                        },
                        {
                            step: 2,
                            title: 'When',
                            description: 'Date Selection',
                            features: ['Start and end date pickers', 'Duration calculation', 'Date validation'],
                            color: 'green',
                        },
                        {
                            step: 3,
                            title: 'Who',
                            description: 'Trip Type & Travelers',
                            features: ['8 trip type options', 'Traveler count input', 'Visual type selection'],
                            color: 'purple',
                        },
                        {
                            step: 4,
                            title: 'Details',
                            description: 'Additional Information',
                            features: ['Optional trip title', 'Budget and currency', 'Description field'],
                            color: 'orange',
                        },
                        {
                            step: 5,
                            title: 'Review',
                            description: 'Final Confirmation',
                            features: ['Complete trip summary', 'Final title input', 'Create trip action'],
                            color: 'green',
                        },
                    ].map(function (step) { return ((0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-sm border', children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full bg-".concat(step.color, "-500 text-white flex items-center justify-center font-bold text-lg mb-4"), children: step.step }), (0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-900 mb-2', children: step.title }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-4', children: step.description }), (0, jsx_runtime_1.jsx)("ul", { className: 'text-sm text-gray-700 space-y-1', children: step.features.map(function (feature, index) { return ((0, jsx_runtime_1.jsxs)("li", { className: 'flex items-center', children: [(0, jsx_runtime_1.jsx)("span", { className: 'w-1.5 h-1.5 bg-gray-400 rounded-full mr-2' }), feature] }, index)); }) })] }, step.step)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-purple-50 rounded-lg p-6 border border-purple-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-purple-900 mb-4', children: "Design Principles:" }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "User Experience" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Progressive disclosure reduces complexity" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Clear visual hierarchy and navigation" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Contextual help and validation feedback" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold mb-2', children: "Technical Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Form state management across steps" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Real-time validation and error handling" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Mobile-responsive design patterns" })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'text-center', children: (0, jsx_runtime_1.jsx)(WizardDemo, {}) })] }) })); },
};
exports.MobileOptimized = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Creation Wizard - Mobile Experience', description: 'Mobile-optimized wizard with touch-friendly interface and responsive design', background: 'gradient-cyan', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-cyan-50 rounded-lg p-6 border border-cyan-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-cyan-900 mb-4', children: "Mobile Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-cyan-800 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Touch-Friendly:" }), " 44px minimum touch targets"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Responsive Steps:" }), " Optimized for small screens"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Smart Keyboard:" }), " Appropriate input types"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Scroll Optimization:" }), " Smooth scrolling on mobile"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Safe Areas:" }), " iOS notch and bottom bar support"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-blue-50 rounded-lg p-6 border border-blue-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-blue-900 mb-4', children: "Accessibility:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-blue-800 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Keyboard Navigation:" }), " Full keyboard support"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Screen Readers:" }), " Proper ARIA labels"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Focus Management:" }), " Clear focus indicators"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "High Contrast:" }), " WCAG compliant colors"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Error Handling:" }), " Clear validation messages"] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-4', children: "Test the wizard on different screen sizes to see the responsive behavior" }), (0, jsx_runtime_1.jsx)(WizardDemo, {})] })] }) })); },
};

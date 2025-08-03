"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disabled = exports.WithLoading = exports.WithCustomStyling = exports.InGrid = exports.Interactive = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var NewTripCard_1 = require("./NewTripCard");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var meta = {
    title: 'Components/NewTripCard',
    component: NewTripCard_1.NewTripCard,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Default', description: 'Create new trip card with call-to-action styling', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { onClick: function () { return alert('✨ Create new trip clicked!'); } }) }) })); },
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Interactive', description: 'Interactive new trip card with user input and creation flow', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { onClick: function () {
                    var tripName = prompt('What would you like to name your new trip?');
                    if (tripName) {
                        alert("\u2708\uFE0F Creating trip: \"".concat(tripName, "\""));
                    }
                } }) }) })); },
};
exports.InGrid = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Grid Layout', description: 'New trip card displayed alongside existing trips in a grid', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-sm border', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4' }), (0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900', children: "Tokyo Adventure" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-gray-600', children: "March 15-22, 2024" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-sm border', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-full h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mb-4' }), (0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900', children: "European Backpacking" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-gray-600', children: "June 1-30, 2024" })] }), (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { onClick: function () { return alert('🎯 Add another trip!'); } })] }) })); },
};
exports.WithCustomStyling = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Different Styles', description: 'Various styling options for the new trip card', background: 'gradient-orange', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4 text-gray-800', children: "Standard Style" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { onClick: function () { return alert('Standard style!'); } }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4 text-gray-800', children: "Compact Style" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-xs mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { variant: 'compact', onClick: function () { return alert('Compact style!'); } }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4 text-gray-800', children: "Minimal Style" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { variant: 'minimal', onClick: function () { return alert('Minimal style!'); } }) })] })] }) })); },
};
exports.WithLoading = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Loading State', description: 'New trip card with loading state during trip creation', background: 'gradient-indigo', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { loading: true, onClick: function () { return alert('Creating trip...'); } }) }) })); },
};
exports.Disabled = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'New Trip Card - Disabled State', description: 'Disabled new trip card (e.g., when user reaches trip limit)', background: 'gradient-gray', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { disabled: true, onClick: function () { return alert('Card is disabled'); } }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-gray-50 rounded-lg p-4 max-w-md mx-auto', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Disabled States:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 User has reached maximum trip limit" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Account subscription doesn't allow new trips" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 System maintenance mode" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Network connectivity issues" })] })] })] }) })); },
};

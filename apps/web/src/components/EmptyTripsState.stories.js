"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorRecovery = exports.WithDifferentActions = exports.MultipleVariants = exports.InContext = exports.Interactive = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var EmptyTripsState_1 = require("./EmptyTripsState");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var meta = {
    title: 'Components/EmptyTripsState',
    component: EmptyTripsState_1.EmptyTripsState,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Empty Trips State - Default', description: 'Empty state for when user has no trips created yet', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return alert('✨ Creating your first trip!'); } }) })); },
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Empty Trips State - Interactive', description: 'Interactive empty state with user input for destination selection', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () {
                var destination = prompt('Where would you like to go?');
                if (destination) {
                    alert("\u2708\uFE0F Let's plan your trip to ".concat(destination, "!"));
                }
            } }) })); },
};
exports.InContext = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Empty Trips State - Welcome Context', description: 'Empty state within welcome flow showing app capabilities', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900 mb-2', children: "Welcome to Trip Organizer! \uD83C\uDF0E" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Start your journey by creating your first trip" })] }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return alert("🎉 Welcome aboard! Let's create your first trip!"); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'text-center text-sm text-gray-500 space-y-2', children: [(0, jsx_runtime_1.jsx)("p", { children: "Once you create a trip, you'll be able to:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\uD83D\uDCCD Add destinations and locations" }), (0, jsx_runtime_1.jsx)("li", { children: "\uD83D\uDCC5 Plan your daily itinerary" }), (0, jsx_runtime_1.jsx)("li", { children: "\uD83D\uDCB0 Track your budget" }), (0, jsx_runtime_1.jsx)("li", { children: "\uD83C\uDFE8 Book accommodations" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2708\uFE0F Manage transportation" })] })] })] }) })); },
};
exports.MultipleVariants = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen space-y-12', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-bold mb-6 text-center', children: "Standard Empty State" }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return alert('Standard create!'); } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-bold mb-6 text-center', children: "First Time User Experience" }), (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-2xl mx-auto', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-blue-500 text-2xl mr-3', children: "\uD83D\uDC4B" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-blue-900', children: "Welcome to Trip Organizer!" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-blue-700 text-sm', children: "Let's get you started with your first adventure." })] })] }) }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return alert('First time user!'); } })] })] })] })); },
};
exports.WithDifferentActions = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen space-y-8', children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-bold mb-4 text-center', children: "Quick Start Actions" }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () {
                        var action = prompt('Choose action:\n1. Quick trip\n2. Detailed planning\n3. Import existing');
                        switch (action) {
                            case '1':
                                alert('🚀 Quick trip creation started!');
                                break;
                            case '2':
                                alert('📋 Detailed planning mode activated!');
                                break;
                            case '3':
                                alert('📥 Import your existing trip data!');
                                break;
                            default:
                                alert('✨ Standard trip creation!');
                        }
                    } })] }) })); },
};
exports.ErrorRecovery = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen space-y-8', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-red-500 text-xl mr-3', children: "\u26A0\uFE0F" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-red-900', children: "Connection Error" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 text-sm', children: "Unable to load your trips. Create a new one to get started." })] })] }) }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return alert('🔄 Creating new trip while offline...'); } })] })); },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = exports.MobileView = exports.EventTypes = exports.Interactive = exports.WithEvents = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Calendar_1 = require("./Calendar");
require("../styles/story-fonts.css");
// Mock itinerary items for calendar stories
var mockItineraryItems = [
    {
        id: '1',
        title: 'Flight to Tokyo',
        type: 'transport',
        startDate: new Date('2024-03-15T09:00:00'),
        endDate: new Date('2024-03-15T21:00:00'),
        isAllDay: false,
        status: 'confirmed',
        location: {
            name: 'Narita Airport',
            address: 'Tokyo, Japan',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.7649, lng: 140.3864 },
        },
    },
    {
        id: '2',
        title: 'Hotel Check-in',
        type: 'accommodation',
        startDate: new Date('2024-03-15T15:00:00'),
        endDate: new Date('2024-03-19T11:00:00'),
        isAllDay: false,
        status: 'confirmed',
        location: {
            name: 'Park Hyatt Tokyo',
            address: 'Shinjuku, Tokyo',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.6795, lng: 139.6917 },
        },
    },
    {
        id: '3',
        title: 'Sushi Making Class',
        type: 'activity',
        startDate: new Date('2024-03-16T14:00:00'),
        endDate: new Date('2024-03-16T17:00:00'),
        isAllDay: false,
        status: 'planned',
        location: {
            name: 'Tokyo Sushi Academy',
            address: 'Ginza, Tokyo',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.6714, lng: 139.7647 },
        },
        attendees: [{ name: 'John Doe', email: 'john@example.com' }],
    },
    {
        id: '4',
        title: 'Cherry Blossom Festival',
        type: 'event',
        startDate: new Date('2024-03-17T10:00:00'),
        endDate: new Date('2024-03-17T18:00:00'),
        isAllDay: true,
        status: 'planned',
        location: {
            name: 'Ueno Park',
            address: 'Ueno, Tokyo',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.7141, lng: 139.7744 },
        },
        attendees: [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
        ],
    },
    {
        id: '5',
        title: 'Business Meeting',
        type: 'work',
        startDate: new Date('2024-03-18T09:00:00'),
        endDate: new Date('2024-03-18T11:00:00'),
        isAllDay: false,
        status: 'confirmed',
        location: {
            name: 'Tokyo Station',
            address: 'Chiyoda, Tokyo',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.6812, lng: 139.7671 },
        },
    },
    {
        id: '6',
        title: 'Return Flight',
        type: 'transport',
        startDate: new Date('2024-03-19T13:00:00'),
        endDate: new Date('2024-03-19T23:00:00'),
        isAllDay: false,
        status: 'confirmed',
        location: {
            name: 'Narita Airport',
            address: 'Tokyo, Japan',
            city: 'Tokyo',
            country: 'Japan',
            coordinates: { lat: 35.7649, lng: 140.3864 },
        },
    },
];
// Mock the itinerary service for stories
var mockItineraryService = {
    getAllItems: function () { return mockItineraryItems; },
};
// Override the import for stories
global.ItineraryService = mockItineraryService;
var meta = {
    title: 'Components/Calendar',
    component: Calendar_1.Calendar,
    parameters: {
        layout: 'fullscreen',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-7xl mx-auto', children: (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) { return alert("\uD83D\uDCC5 Event clicked: ".concat(event.title)); }, onAddEvent: function (date) { return alert("\u2795 Add event on: ".concat(date.toDateString())); } }) }) })); },
};
exports.WithEvents = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Calendar with Sample Events" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Tokyo trip itinerary displayed in calendar view" })] }), (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) {
                        var _a;
                        return alert("\uD83D\uDCC5 ".concat(event.title, "\n\uD83D\uDD52 ").concat(event.startDate.toLocaleString(), "\n\uD83D\uDCCD ").concat(((_a = event.location) === null || _a === void 0 ? void 0 : _a.name) || 'No location', "\n\u2705 Status: ").concat(event.status));
                    }, onAddEvent: function (date) {
                        return alert("\u2795 Add new event on ".concat(date.toLocaleDateString(), "\n\nThis would open the event creation form."));
                    } }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-purple-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Calendar Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click on any event to view details" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click on empty days to add new events" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Filter events by type using the filter buttons" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Navigate between months using arrow buttons" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click \"Today\" to jump to current date" })] })] })] }) })); },
};
var InteractiveComponent = function () {
    var _a = (0, react_1.useState)(null), selectedEvent = _a[0], setSelectedEvent = _a[1];
    var _b = (0, react_1.useState)(null), newEventDate = _b[0], setNewEventDate = _b[1];
    return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Interactive Calendar Demo" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Click on events and dates to see interactions" })] }), (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) {
                        setSelectedEvent(event.title);
                        setNewEventDate(null);
                    }, onAddEvent: function (date) {
                        setNewEventDate(date.toDateString());
                        setSelectedEvent(null);
                    } }), (selectedEvent || newEventDate) && ((0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-lg', children: [selectedEvent && ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-green-800', children: "\uD83D\uDCC5 Event Selected" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-green-700', children: ["You clicked on: ", (0, jsx_runtime_1.jsx)("strong", { children: selectedEvent })] }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-green-600', children: "In a real app, this would show event details or editing options." })] })), newEventDate && ((0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-green-800', children: "\u2795 Add Event" }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-green-700', children: ["Selected date: ", (0, jsx_runtime_1.jsx)("strong", { children: newEventDate })] }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-green-600', children: "In a real app, this would open the event creation form." })] })), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                setSelectedEvent(null);
                                setNewEventDate(null);
                            }, className: 'mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors', children: "Clear Selection" })] })), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-green-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-green-800 mb-3', children: "\uD83C\uDFAF Event Interactions" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click events to view/edit details" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Different colors for event types" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Status indicators (confirmed/planned)" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Time and location information" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-emerald-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-emerald-800 mb-3', children: "\uD83D\uDCC5 Calendar Navigation" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-emerald-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Month navigation with arrows" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click empty days to add events" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Filter by event types" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Today button for quick navigation" })] })] })] })] }) }));
};
exports.Interactive = {
    render: function () { return (0, jsx_runtime_1.jsx)(InteractiveComponent, {}); },
};
exports.EventTypes = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Event Types & Filtering" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Demonstration of different event types and filtering" })] }), (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) {
                        var _a;
                        return alert("\uD83D\uDCC5 ".concat(event.title, "\n\uD83C\uDFF7\uFE0F Type: ").concat(event.type, "\n\uD83D\uDCCD ").concat(((_a = event.location) === null || _a === void 0 ? void 0 : _a.name) || 'No location'));
                    }, onAddEvent: function (date) { return alert("\u2795 Add event on: ".concat(date.toDateString())); } }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4', children: [
                        {
                            type: 'accommodation',
                            color: 'bg-blue-500',
                            icon: '🏠',
                            description: 'Hotels & stays',
                        },
                        {
                            type: 'transport',
                            color: 'bg-gray-500',
                            icon: '✈️',
                            description: 'Flights & travel',
                        },
                        { type: 'activity', color: 'bg-yellow-500', icon: '🎯', description: 'Things to do' },
                        { type: 'event', color: 'bg-purple-500', icon: '🎉', description: 'Special events' },
                        { type: 'work', color: 'bg-green-500', icon: '💼', description: 'Business meetings' },
                        {
                            type: 'overarching-event',
                            color: 'bg-red-500',
                            icon: '🎪',
                            description: 'Multi-day events',
                        },
                    ].map(function (eventType) { return ((0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-4 shadow-sm', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-2 mb-2', children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 ".concat(eventType.color, " rounded-full") }), (0, jsx_runtime_1.jsx)("span", { className: 'text-lg', children: eventType.icon })] }), (0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-800 capitalize text-sm', children: eventType.type.replace('-', ' ') }), (0, jsx_runtime_1.jsx)("p", { className: 'text-xs text-gray-600 mt-1', children: eventType.description })] }, eventType.type)); }) })] }) })); },
};
exports.MobileView = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-4', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-sm mx-auto', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2 mb-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-bold text-gray-800', children: "Mobile Calendar View" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-gray-600', children: "Optimized for mobile devices" })] }), (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) { return alert("\uD83D\uDCF1 ".concat(event.title)); }, onAddEvent: function (date) { return alert("\uD83D\uDCF1 Add event: ".concat(date.toDateString())); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-orange-50 rounded-xl p-4 mt-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Mobile Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Touch-friendly interface" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Compact event display" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Swipe navigation (future)" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Responsive grid layout" })] })] })] }) })); },
};
exports.EmptyState = {
    render: function () {
        // Override with empty events for this story
        var emptyMockService = {
            getAllItems: function () { return []; },
        };
        global.ItineraryService =
            emptyMockService;
        return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-gray-50 to-slate-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Empty Calendar State" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "How the calendar appears with no events" })] }), (0, jsx_runtime_1.jsx)(Calendar_1.Calendar, { onEventClick: function (event) { return alert("Event: ".concat(event.title)); }, onAddEvent: function (date) { return alert("Add first event on: ".concat(date.toDateString())); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-gray-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Empty State Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Clean calendar grid without events" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click any date to add first event" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Filter options still available" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Navigation controls remain functional" })] })] })] }) }));
    },
};

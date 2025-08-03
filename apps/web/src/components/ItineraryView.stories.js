"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = exports.CompactView = exports.TimelineView = exports.WithFilters = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var ItineraryView_1 = require("./ItineraryView");
// Mock itinerary data for ItineraryView stories
var mockItineraryDays = [
    {
        date: new Date('2024-03-15'),
        items: [
            {
                id: '1',
                title: 'Flight to Tokyo',
                type: 'transport',
                startDate: new Date('2024-03-15T09:00:00'),
                endDate: new Date('2024-03-15T21:00:00'),
                isAllDay: false,
                status: 'confirmed',
                description: 'Non-stop flight from JFK to Narita Airport',
                location: {
                    name: 'Narita Airport',
                    address: 'Terminal 1',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.7649, lng: 140.3864 },
                },
                tags: ['international-flight', 'long-haul'],
            },
            {
                id: '2',
                title: 'Hotel Check-in',
                type: 'accommodation',
                startDate: new Date('2024-03-15T15:00:00'),
                endDate: new Date('2024-03-19T11:00:00'),
                isAllDay: false,
                status: 'confirmed',
                description: 'Luxury hotel in Shinjuku with city views',
                location: {
                    name: 'Park Hyatt Tokyo',
                    address: '3-7-1-2 Nishi-Shinjuku',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.6795, lng: 139.6917 },
                },
                tags: ['luxury', 'city-view', 'concierge'],
            },
        ],
    },
    {
        date: new Date('2024-03-16'),
        items: [
            {
                id: '3',
                title: 'Morning Jog in Imperial Palace',
                type: 'activity',
                startDate: new Date('2024-03-16T07:00:00'),
                endDate: new Date('2024-03-16T08:00:00'),
                isAllDay: false,
                status: 'planned',
                description: 'Peaceful morning run around the Imperial Palace gardens',
                location: {
                    name: 'Imperial Palace East Gardens',
                    address: 'Chiyoda',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.6839, lng: 139.7544 },
                },
                tags: ['exercise', 'nature', 'early-morning'],
            },
            {
                id: '4',
                title: 'Sushi Making Class',
                type: 'activity',
                startDate: new Date('2024-03-16T14:00:00'),
                endDate: new Date('2024-03-16T17:00:00'),
                isAllDay: false,
                status: 'planned',
                description: 'Learn traditional sushi making techniques from a master chef',
                location: {
                    name: 'Tokyo Sushi Academy',
                    address: 'Ginza District',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.6714, lng: 139.7647 },
                },
                attendees: [
                    { name: 'John Doe', email: 'john@example.com' },
                    { name: 'Chef Yamamoto', email: 'chef@sushiacademy.jp' },
                ],
                tags: ['culinary', 'hands-on', 'cultural'],
            },
        ],
    },
    {
        date: new Date('2024-03-17'),
        items: [
            {
                id: '5',
                title: 'Cherry Blossom Festival',
                type: 'event',
                startDate: new Date('2024-03-17T10:00:00'),
                endDate: new Date('2024-03-17T18:00:00'),
                isAllDay: true,
                status: 'planned',
                description: 'Annual sakura viewing festival with traditional performances',
                location: {
                    name: 'Ueno Park',
                    address: 'Ueno, Taito',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.7141, lng: 139.7744 },
                },
                attendees: [
                    { name: 'John Doe', email: 'john@example.com' },
                    { name: 'Jane Smith', email: 'jane@example.com' },
                    { name: 'Local Guide Tanaka', email: 'tanaka@tokyoguides.jp' },
                ],
                tags: ['sakura', 'festival', 'photography', 'cultural'],
            },
        ],
    },
    {
        date: new Date('2024-03-18'),
        items: [
            {
                id: '6',
                title: 'Business Meeting - Tokyo Office',
                type: 'work',
                startDate: new Date('2024-03-18T09:00:00'),
                endDate: new Date('2024-03-18T11:00:00'),
                isAllDay: false,
                status: 'confirmed',
                description: 'Quarterly review meeting with Tokyo team',
                location: {
                    name: 'Tokyo Station Conference Center',
                    address: 'Marunouchi, Chiyoda',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.6812, lng: 139.7671 },
                },
                attendees: [
                    { name: 'John Doe', email: 'john@example.com' },
                    { name: 'Hiroshi Tanaka', email: 'htanaka@company.co.jp' },
                    { name: 'Sarah Kim', email: 'skim@company.co.jp' },
                ],
                tags: ['business', 'quarterly-review', 'presentation'],
            },
            {
                id: '7',
                title: 'Team Dinner',
                type: 'overarching-event',
                startDate: new Date('2024-03-18T19:00:00'),
                endDate: new Date('2024-03-18T22:00:00'),
                isAllDay: false,
                status: 'confirmed',
                description: 'Welcome dinner with the Tokyo team at a traditional restaurant',
                location: {
                    name: 'Kikunoi Tokyo',
                    address: 'Akasaka, Minato',
                    city: 'Tokyo',
                    country: 'Japan',
                    coordinates: { lat: 35.6735, lng: 139.7367 },
                },
                attendees: [
                    { name: 'John Doe', email: 'john@example.com' },
                    { name: 'Hiroshi Tanaka', email: 'htanaka@company.co.jp' },
                    { name: 'Sarah Kim', email: 'skim@company.co.jp' },
                    { name: 'Yuki Nakamura', email: 'ynakamura@company.co.jp' },
                ],
                tags: ['business-dinner', 'kaiseki', 'team-building'],
            },
        ],
    },
];
var mockStats = {
    totalItems: 7,
    timeSpan: {
        start: new Date('2024-03-15'),
        end: new Date('2024-03-19'),
    },
    totalDays: 4,
};
var meta = {
    title: 'Components/ItineraryView',
    component: ItineraryView_1.ItineraryView,
    parameters: {
        layout: 'fullscreen',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-4xl mx-auto', children: (0, jsx_runtime_1.jsx)(ItineraryView_1.ItineraryView, { days: mockItineraryDays, stats: mockStats, onItemClick: function (item) { return alert("\uD83D\uDCC5 ".concat(item.title, " clicked!")); }, onAddItem: function (date) { return alert("\u2795 Add item for ".concat(date.toDateString())); } }) }) })); },
};
exports.WithFilters = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-4xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Itinerary with Type Filters" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Filter events by type to focus on specific categories" })] }), (0, jsx_runtime_1.jsx)(ItineraryView_1.ItineraryView, { days: mockItineraryDays, stats: mockStats, onItemClick: function (item) { var _a; return alert("\uD83D\uDCC5 ".concat(item.title, "\n\uD83C\uDFF7\uFE0F Type: ").concat(item.type, "\n\uD83D\uDCCD ").concat((_a = item.location) === null || _a === void 0 ? void 0 : _a.name)); }, onAddItem: function (date) { return alert("\u2795 Add new event for ".concat(date.toDateString())); } })] }) })); },
};
exports.TimelineView = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-6xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Timeline View" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Chronological timeline of all trip events" })] }), (0, jsx_runtime_1.jsx)(ItineraryView_1.ItineraryView, { days: mockItineraryDays, stats: mockStats, viewMode: 'timeline', onItemClick: function (item) { return alert("\uD83D\uDD52 ".concat(item.title, "\n\u23F0 ").concat(item.startDate.toLocaleString())); }, onAddItem: function (date) { return alert("\u2795 Add to timeline: ".concat(date.toDateString())); } })] }) })); },
};
exports.CompactView = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-orange-50 to-red-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-3xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Compact Itinerary" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Space-efficient view for mobile or sidebar display" })] }), (0, jsx_runtime_1.jsx)(ItineraryView_1.ItineraryView, { days: mockItineraryDays, stats: mockStats, viewMode: 'compact', onItemClick: function (item) { return alert("\uD83D\uDCF1 ".concat(item.title, " (compact view)")); }, onAddItem: function (date) { return alert("\u2795 Quick add: ".concat(date.toDateString())); } })] }) })); },
};
exports.EmptyState = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-gray-50 to-slate-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-4xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Empty Itinerary" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "How the view appears with no scheduled items" })] }), (0, jsx_runtime_1.jsx)(ItineraryView_1.ItineraryView, { days: [], stats: { totalItems: 0, timeSpan: null, totalDays: 0 }, onItemClick: function (item) { return alert("Item: ".concat(item.title)); }, onAddItem: function (date) { return alert("\uD83C\uDFAF Start planning! Add first event: ".concat(date.toDateString())); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-gray-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Empty State Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Encouraging call-to-action to add first event" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Clear instructions for getting started" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Visual placeholder maintains layout structure" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Quick access to event creation tools" })] })] })] }) })); },
};

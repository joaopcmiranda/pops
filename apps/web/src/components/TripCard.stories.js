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
exports.LongContent = exports.Comparison = exports.Interactive = exports.AllStatuses = exports.WithoutCoverImage = exports.Selected = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TripCard_1 = require("./TripCard");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var mockTrip = {
    id: '1',
    title: 'Rio de Janeiro Adventure',
    destination: 'Rio de Janeiro, Brazil',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    type: 'leisure',
    status: 'upcoming',
    coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
};
var trips = [
    mockTrip,
    {
        id: '2',
        title: 'Tokyo Business Trip',
        destination: 'Tokyo, Japan',
        startDate: '2024-02-10',
        endDate: '2024-02-15',
        type: 'business',
        status: 'active',
    },
    {
        id: '3',
        title: 'European Backpacking',
        destination: 'Multiple Cities, Europe',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        type: 'adventure',
        status: 'planning',
        coverImage: 'https://images.unsplash.com/photo-1520637836862-4d197d17c17a?w=400&h=240&fit=crop',
    },
    {
        id: '4',
        title: 'Honeymoon in Maldives',
        destination: 'Maldives',
        startDate: '2023-12-20',
        endDate: '2023-12-30',
        type: 'honeymoon',
        status: 'completed',
        coverImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=240&fit=crop',
    },
    {
        id: '5',
        title: 'Cancelled Vegas Trip',
        destination: 'Las Vegas, USA',
        startDate: '2024-01-15',
        endDate: '2024-01-18',
        type: 'leisure',
        status: 'cancelled',
    },
];
var meta = {
    title: 'Components/TripCard',
    component: TripCard_1.TripCard,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Card - Default State', description: 'Standard trip card with cover image and interactive elements', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: mockTrip, onSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onSettings: function (id) { return alert("\u2699\uFE0F Settings for trip: ".concat(id)); } }) }) })); },
};
exports.Selected = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Card - Selected State', description: 'Trip card in selected state with visual highlight', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: mockTrip, isSelected: true, onSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onSettings: function (id) { return alert("\u2699\uFE0F Settings for trip: ".concat(id)); } }) }) })); },
};
exports.WithoutCoverImage = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Card - No Cover Image', description: 'Trip card layout without cover image, showing text-only design', background: 'gradient-purple', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: __assign(__assign({}, mockTrip), { coverImage: undefined }), onSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onSettings: function (id) { return alert("\u2699\uFE0F Settings for trip: ".concat(id)); } }) }) })); },
};
exports.AllStatuses = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Card - All Status Types', description: 'Trip cards showing different status states and visual indicators', background: 'gradient-orange', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-center text-gray-800', children: "Trip Card States" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', children: trips.map(function (trip) { return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-2 text-center capitalize text-gray-700', children: trip.status }), (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trip, onSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onSettings: function (id) { return alert("\u2699\uFE0F Settings for trip: ".concat(id)); } })] }, trip.id)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-orange-50 rounded-lg border border-orange-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-orange-900 mb-2', children: "Status Types:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-orange-800 space-y-1', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Upcoming:" }), " Planned trips not yet started"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Active:" }), " Currently ongoing trips"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Planning:" }), " Draft trips being organized"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Completed:" }), " Past trips that have finished"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Cancelled:" }), " Trips that were cancelled"] })] })] })] }) })); },
};
exports.Interactive = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6 text-center', children: "Interactive Trip Cards" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto', children: trips.slice(0, 4).map(function (trip) { return ((0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trip, onSelect: function () { return alert("\uD83C\uDFAF Selected trip: ".concat(trip.title)); }, onSettings: function () { return alert("\u2699\uFE0F Opening settings for: ".concat(trip.title)); } }, trip.id)); }) })] })); },
};
exports.Comparison = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6 text-center', children: "Trip Types Comparison" }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4', children: "With Cover Images" }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6', children: [(0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trips[0], onSelect: function () { } }), (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trips[2], onSelect: function () { } })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4', children: "Without Cover Images" }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6', children: [(0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trips[1], onSelect: function () { } }), (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trips[4], onSelect: function () { } })] })] })] })] })); },
};
exports.LongContent = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: __assign(__assign({}, mockTrip), { title: 'Very Long Trip Title That Should Wrap to Multiple Lines Properly', destination: 'A Very Long Destination Name That Might Overflow' }), onSelect: function (id) { return alert("Selected trip: ".concat(id)); } }) }) })); },
};

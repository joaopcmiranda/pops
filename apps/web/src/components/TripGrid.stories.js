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
exports.LoadingStates = exports.ResponsiveLayout = exports.Interactive = exports.SingleTrip = exports.FewTrips = exports.WithoutNewTripCard = exports.WithSelection = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TripGrid_1 = require("./TripGrid");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var mockTrips = [
    {
        id: '1',
        title: 'Rio de Janeiro Adventure',
        destination: 'Rio de Janeiro, Brazil',
        startDate: '2024-03-15',
        endDate: '2024-03-22',
        type: 'leisure',
        status: 'upcoming',
        coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
    },
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
    {
        id: '6',
        title: 'Family Vacation',
        destination: 'Orlando, Florida',
        startDate: '2024-07-10',
        endDate: '2024-07-17',
        type: 'family',
        status: 'planning',
    },
];
var meta = {
    title: 'Components/TripGrid',
    component: TripGrid_1.TripGrid,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Grid - Complete Layout', description: 'Grid of trip cards with new trip creation functionality', background: 'gradient-blue', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Your Trips" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips, onTripSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onNewTrip: function () { return alert('✨ Create new trip!'); }, onTripSettings: function (id) { return alert("\u2699\uFE0F Settings for: ".concat(id)); } })] }) })); },
};
exports.WithSelection = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Grid - With Selection', description: 'Trip grid showing selected state highlighting', background: 'gradient-green', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Trip Grid with Selection" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips, selectedTripId: '2', onTripSelect: function (id) { return alert("\uD83C\uDFAF Selected trip: ".concat(id)); }, onNewTrip: function () { return alert('✨ Create new trip!'); }, onTripSettings: function (id) { return alert("\u2699\uFE0F Settings for: ".concat(id)); } })] }) })); },
};
exports.WithoutNewTripCard = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6', children: "Existing Trips Only" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips, showNewTripCard: false, onTripSelect: function (id) { return alert("Selected trip: ".concat(id)); }, onNewTrip: function () { return alert('Create new trip!'); } })] })); },
};
exports.FewTrips = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6', children: "Just Getting Started" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips.slice(0, 2), onTripSelect: function (id) { return alert("Selected trip: ".concat(id)); }, onNewTrip: function () { return alert('Create new trip!'); } })] })); },
};
exports.SingleTrip = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6', children: "Your First Trip" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: [mockTrips[0]], onTripSelect: function (id) { return alert("Selected trip: ".concat(id)); }, onNewTrip: function () { return alert('Create another trip!'); } })] })); },
};
exports.Interactive = {
    render: function () {
        var selectedTrip = null;
        var handleTripSelect = function (id) {
            selectedTrip = id;
            var trip = mockTrips.find(function (t) { return t.id === id; });
            alert("\uD83C\uDFAF Opening trip: ".concat(trip === null || trip === void 0 ? void 0 : trip.title));
        };
        return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Trip Grid - Interactive Demo', description: 'Fully interactive trip management with selection and actions', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Interactive Trip Management" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips, selectedTripId: selectedTrip, onTripSelect: handleTripSelect, onNewTrip: function () {
                            var name = prompt('Trip name?');
                            if (name)
                                alert("\u2728 Creating \"".concat(name, "\" trip!"));
                        }, onTripSettings: function (id) {
                            var trip = mockTrips.find(function (t) { return t.id === id; });
                            alert("\u2699\uFE0F Settings for \"".concat(trip === null || trip === void 0 ? void 0 : trip.title, "\""));
                        } })] }) }));
    },
};
exports.ResponsiveLayout = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl md:text-2xl font-bold mb-6', children: "Responsive Grid Layout" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-600 mb-4', children: "Resize your browser to see the responsive behavior" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips, onTripSelect: function (id) { return alert("Selected: ".concat(id)); }, onNewTrip: function () { return alert('New trip!'); } })] })); },
};
exports.LoadingStates = {
    render: function () { return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6', children: "Normal State" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: mockTrips.slice(0, 3), onTripSelect: function () { }, onNewTrip: function () { } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold mb-6', children: "Many Trips" }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: __spreadArray(__spreadArray([], mockTrips, true), mockTrips.map(function (t) { return (__assign(__assign({}, t), { id: t.id + '_copy' })); }), true), onTripSelect: function () { }, onNewTrip: function () { } })] })] })); },
};

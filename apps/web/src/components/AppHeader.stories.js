"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTripNames = exports.ResponsiveDemo = exports.Interactive = exports.DifferentTrips = exports.WithoutTrip = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var AppHeader_1 = require("./AppHeader");
var StoryWrapper_1 = require("./StoryWrapper");
var meta = {
    title: 'Components/AppHeader',
    component: AppHeader_1.AppHeader,
    parameters: {
        layout: 'fullscreen',
    },
};
exports.default = meta;
var mockTrip = {
    id: '1',
    title: 'Rio de Janeiro Adventure',
    destination: 'Rio de Janeiro, Brazil',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    type: 'leisure',
    status: 'upcoming',
};
var mockTrips = [
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
    },
];
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'App Header - Default', description: 'Main application header with trip selector, search, and user actions', background: 'gradient-blue', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: mockTrip, onTripSwitch: function () { return alert('🔄 Trip switch clicked!'); } }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-blue-50 rounded-xl p-6 border border-blue-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4 text-blue-900', children: "Header Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-blue-800 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Trip Selector:" }), " Shows current trip with destination"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Search Bar:" }), " Quick search across trip content"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Notifications:" }), " Bell icon for alerts and updates"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "User Menu:" }), " Profile and account settings"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Sidebar Toggle:" }), " Built-in sidebar trigger for responsive design"] })] })] })] }) })); },
};
exports.WithoutTrip = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'App Header - No Trip Selected', description: 'Header state when no trip is currently selected', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { onTripSwitch: function () { return alert('🔄 No trip selected'); } }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-purple-50 rounded-xl p-6 border border-purple-100', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold mb-4 text-purple-900', children: "No Trip State" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-sm text-purple-800', children: "When no trip is selected, the header shows the app title instead of trip information. This is the state users see when they first open the app or after logging out." })] })] }) })); },
};
exports.DifferentTrips = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800 text-center', children: "Header with Different Trips" }), mockTrips.map(function (trip) { return ((0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-2xl shadow-lg overflow-hidden', children: [(0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: trip, onTripSwitch: function () { return alert("\uD83D\uDD04 Switch from ".concat(trip.title)); } }), (0, jsx_runtime_1.jsx)("div", { className: 'p-4 bg-gray-50 border-t', children: (0, jsx_runtime_1.jsxs)("div", { className: 'text-sm text-gray-600', children: [(0, jsx_runtime_1.jsx)("strong", { children: "Trip Type:" }), " ", trip.type, " \u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Status:" }), " ", trip.status] }) })] }, trip.id)); })] }) })); },
};
exports.Interactive = {
    render: function () {
        var currentTripIndex = 0;
        var switchTrip = function () {
            currentTripIndex = (currentTripIndex + 1) % mockTrips.length;
            var newTrip = mockTrips[currentTripIndex];
            alert("\uD83D\uDD04 Switched to: ".concat(newTrip.title, "\nDestination: ").concat(newTrip.destination, "\nType: ").concat(newTrip.type));
        };
        return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Interactive Header Demo" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Click on different elements to see interactions" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: mockTrip, onTripSwitch: switchTrip }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-3 gap-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-blue-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-blue-800 mb-3', children: "\uD83D\uDD0D Search Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-blue-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Search across all trip content" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Find activities, bookings, notes" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Quick keyboard shortcuts" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-green-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-green-800 mb-3', children: "\uD83D\uDD14 Notifications" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Booking confirmations" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Weather alerts" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Trip reminders" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-purple-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-purple-800 mb-3', children: "\uD83D\uDC64 User Menu" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-purple-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Profile settings" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Account preferences" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Help & support" })] })] })] })] }) }));
    },
};
exports.ResponsiveDemo = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Responsive Header Design" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Resize your browser to see responsive behavior" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-700', children: "Desktop View" }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: mockTrip, onTripSwitch: function () { return alert('🔄 Trip switch (desktop)'); } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-700', children: "Mobile Simulation" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: mockTrip, onTripSwitch: function () { return alert('🔄 Trip switch (mobile)'); } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-orange-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Responsive Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Mobile menu button appears on small screens" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Search bar adapts to available space" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Trip selector truncates long names on mobile" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Action buttons stack appropriately" })] })] })] }) })); },
};
exports.LongTripNames = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-yellow-50 to-amber-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800 text-center', children: "Header with Long Trip Names" }), [
                    {
                        id: '1',
                        title: 'Epic 30-Day European Adventure Through 15 Countries',
                        destination: 'Multiple Cities Across Europe Including Amsterdam, Berlin, Prague, Vienna, Budapest, and More',
                        startDate: '2024-06-01',
                        endDate: '2024-06-30',
                        type: 'leisure',
                        status: 'planning',
                    },
                    {
                        id: '2',
                        title: 'Quick Weekend Getaway',
                        destination: 'NYC',
                        startDate: '2024-03-15',
                        endDate: '2024-03-17',
                        type: 'leisure',
                        status: 'upcoming',
                    },
                ].map(function (trip) { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(AppHeader_1.AppHeader, { currentTrip: trip, onTripSwitch: function () { return alert("\uD83D\uDD04 Switch from ".concat(trip.title)); } }) }, trip.id)); }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-yellow-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Text Overflow Handling:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Long trip names are truncated with ellipsis" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Destination names adapt to available space" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Hover states can show full text in tooltips" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Mobile view prioritizes readability" })] })] })] }) })); },
};

"use strict";
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
exports.CategoryGrid = exports.Empty = exports.Loading = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("./ui/card");
var button_1 = require("./ui/button/button");
var skeleton_1 = require("./ui/skeleton");
var lucide_react_1 = require("lucide-react");
var StoryWrapper_1 = require("./StoryWrapper");
require("../styles/story-fonts.css");
var categories = [
    { id: 'destinations', name: 'Destinations', icon: lucide_react_1.MapPin, color: '#3b82f6', count: 3 },
    { id: 'itinerary', name: 'Itinerary', icon: lucide_react_1.Calendar, color: '#10b981', count: 12 },
    { id: 'transport', name: 'Transport', icon: lucide_react_1.Plane, color: '#8b5cf6', count: 5 },
    { id: 'accommodation', name: 'Accommodation', icon: lucide_react_1.Home, color: '#f59e0b', count: 2 },
    { id: 'activities', name: 'Activities', icon: lucide_react_1.Activity, color: '#ef4444', count: 8 },
    { id: 'budget', name: 'Budget', icon: lucide_react_1.DollarSign, color: '#eab308', count: 1 },
    { id: 'documents', name: 'Documents', icon: lucide_react_1.FileText, color: '#64748b', count: 4 },
];
// Mock Dashboard Component for Storybook
function MockDashboard(_a) {
    var onCategorySelect = _a.onCategorySelect, loading = _a.loading;
    var upcomingItems = [
        { id: '1', title: 'Flight to Rio', time: '08:00 AM', date: 'March 15', type: 'transport' },
        {
            id: '2',
            title: 'Christ the Redeemer Visit',
            time: '02:00 PM',
            date: 'March 16',
            type: 'activity',
        },
        {
            id: '3',
            title: 'Copacabana Hotel Check-in',
            time: '03:00 PM',
            date: 'March 15',
            type: 'accommodation',
        },
        { id: '4', title: 'Sugarloaf Mountain', time: '10:00 AM', date: 'March 17', type: 'activity' },
    ];
    var stats = [
        { label: 'Days Until Trip', value: '45', icon: lucide_react_1.Clock, color: '#3b82f6' },
        { label: 'Budget Used', value: '67%', icon: lucide_react_1.Target, color: '#10b981' },
        { label: 'Activities Planned', value: '8', icon: lucide_react_1.Activity, color: '#ef4444' },
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: 'p-6', children: (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', children: __spreadArray([], Array(7), true).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'category-card', children: (0, jsx_runtime_1.jsx)(skeleton_1.SkeletonCard, {}) }, i)); }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'dashboard-container p-6 space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900', children: "Rio de Janeiro Trip" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "March 15-22, 2024 \u2022 7 days" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return alert('Add new content'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: 'w-4 h-4 mr-2' }), "Add Content"] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-3 gap-6', children: stats.map(function (stat, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'hover:shadow-lg transition-shadow', children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: 'p-6', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center justify-between', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: 'text-sm font-medium text-gray-600', children: stat.label }), (0, jsx_runtime_1.jsx)("p", { className: 'text-2xl font-bold text-gray-900', children: stat.value })] }), (0, jsx_runtime_1.jsx)(stat.icon, { className: 'w-8 h-8', style: { color: stat.color } })] }) }) }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-semibold mb-6', children: "Trip Categories" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'category-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105', onClick: function () { return onCategorySelect(category.id); }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: 'p-6 text-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'mb-4', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-16 h-16 rounded-full mx-auto flex items-center justify-center', style: { backgroundColor: "".concat(category.color, "20") }, children: (0, jsx_runtime_1.jsx)(category.icon, { className: 'w-8 h-8', style: { color: category.color } }) }) }), (0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-900 mb-1', children: category.name }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-sm text-gray-600', children: [category.count, " items"] })] }) }, category.id)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center mb-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-semibold', children: "Upcoming Activities" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: 'outline', size: 'sm', children: ["View All", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: 'w-4 h-4 ml-2' })] })] }), (0, jsx_runtime_1.jsx)("div", { className: 'space-y-4', children: upcomingItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'hover:shadow-md transition-shadow', children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: 'p-4', children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center justify-between', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center space-x-3', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-3 h-3 rounded-full bg-blue-500' }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-medium text-gray-900', children: item.title }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-sm text-gray-500', children: [item.date, " at ", item.time] })] })] }), (0, jsx_runtime_1.jsx)("span", { className: 'text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 capitalize', children: item.type })] }) }) }, item.id)); }) })] })] }));
}
var meta = {
    title: 'Components/Dashboard',
    component: MockDashboard,
    parameters: {
        layout: 'fullscreen',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.AppLayoutStory, { title: 'Dashboard - Complete Layout', description: 'Full dashboard with categories, stats, and upcoming activities', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)(MockDashboard, { onCategorySelect: function (category) { return alert("\uD83C\uDFAF Selected: ".concat(category)); } }) })); },
};
exports.Loading = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.AppLayoutStory, { title: 'Dashboard - Loading State', description: 'Dashboard skeleton loading state with animated placeholders', background: 'gradient-green', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsx)("div", { className: 'h-8 w-64 bg-gray-200 rounded animate-pulse' }), (0, jsx_runtime_1.jsx)("div", { className: 'h-4 w-40 bg-gray-200 rounded animate-pulse' })] }), (0, jsx_runtime_1.jsx)("div", { className: 'h-10 w-32 bg-gray-200 rounded animate-pulse' })] }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-3 gap-6', children: __spreadArray([], Array(3), true).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(skeleton_1.SkeletonCard, {}) }, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: 'h-6 w-32 bg-gray-200 rounded animate-pulse mb-6' }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', children: __spreadArray([], Array(7), true).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(skeleton_1.SkeletonCard, {}) }, i)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-green-50 rounded-lg border border-green-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-green-900 mb-2', children: "Loading States:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Skeleton components maintain layout structure" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Animated placeholders provide visual feedback" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Different skeleton types for different content areas" })] })] })] }) })); },
};
exports.Empty = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.AppLayoutStory, { title: 'Dashboard - Empty State', description: 'Dashboard empty state for new trips with onboarding guidance', background: 'gradient-purple', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900', children: "New Trip" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Start planning your adventure" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return alert('➕ Add Content clicked!'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: 'w-4 h-4 mr-2' }), "Add Content"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl shadow-sm text-center py-12', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: 'w-16 h-16 text-gray-400 mx-auto mb-4' }), (0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-semibold text-gray-900 mb-2', children: "No content yet" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-6', children: "Start by adding some destinations or activities to your trip." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return alert('🚀 Get Started clicked!'); }, children: "Get Started" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-purple-50 rounded-lg border border-purple-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-purple-900 mb-2', children: "Empty State Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-purple-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Clear visual hierarchy with prominent call-to-action" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Friendly messaging to encourage user engagement" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Multiple entry points for adding initial content" })] })] })] }) })); },
};
exports.CategoryGrid = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Dashboard - Category Grid', description: 'Interactive grid of trip categories with hover effects and item counts', background: 'gradient-orange', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-xl font-semibold text-gray-800', children: "Trip Categories" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'category-card hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105', onClick: function () { return alert("\uD83C\uDFAF Selected: ".concat(category.name)); }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: 'p-6 text-center', children: [(0, jsx_runtime_1.jsx)("div", { className: 'mb-4', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-16 h-16 rounded-full mx-auto flex items-center justify-center', style: { backgroundColor: "".concat(category.color, "20") }, children: (0, jsx_runtime_1.jsx)(category.icon, { className: 'w-8 h-8', style: { color: category.color } }) }) }), (0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-900 mb-1', children: category.name }), (0, jsx_runtime_1.jsxs)("p", { className: 'text-sm text-gray-600', children: [category.count, " items"] })] }) }, category.id)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-orange-50 rounded-lg border border-orange-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-orange-900 mb-2', children: "Category Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-orange-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Color-coded icons for easy visual identification" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Item counts show content progress" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Hover effects and scaling for interactivity" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Responsive grid adapts to screen sizes" })] })] })] }) })); },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleCards = exports.CategoryCard = exports.TripCard = exports.HeaderOnly = exports.SimpleCard = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("./card");
var button_1 = require("./button/button");
var StoryWrapper_1 = require("../StoryWrapper");
require("../../styles/story-fonts.css");
var meta = {
    title: 'Components/UI/Card',
    component: card_1.Card,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Default Layout', description: 'Standard card component with header, content, and footer sections', background: 'gradient-blue', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-md mx-auto', children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: 'w-full', children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Card Title" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "Card description goes here." })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("p", { children: "This is the card content area where you can put any content." }) }), (0, jsx_runtime_1.jsxs)(card_1.CardFooter, { className: 'flex justify-between', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'outline', children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { children: "Save" })] })] }) }) })); },
};
exports.SimpleCard = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Simple Content Only', description: 'Minimal card with just content section for simple layouts', background: 'gradient-green', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: 'w-full', children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: 'pt-6', children: (0, jsx_runtime_1.jsx)("p", { children: "This is a simple card with just content, no header or footer." }) }) }) }) })); },
};
exports.HeaderOnly = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Header Only', description: 'Card with only header section for titles and descriptions', background: 'gradient-purple', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-md mx-auto', children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: 'w-full', children: (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Trip to Tokyo" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "7 days of adventure in Japan's capital" })] }) }) }) })); },
};
exports.TripCard = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Trip Information', description: 'Complete trip card with all sections and interactive elements', background: 'gradient-orange', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-md mx-auto', children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: 'w-full', children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Rio de Janeiro" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "March 15-22, 2024 \u2022 7 days" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-2', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between', children: [(0, jsx_runtime_1.jsx)("span", { className: 'text-sm text-muted-foreground', children: "Budget:" }), (0, jsx_runtime_1.jsx)("span", { className: 'text-sm font-medium', children: "$2,500" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between', children: [(0, jsx_runtime_1.jsx)("span", { className: 'text-sm text-muted-foreground', children: "Status:" }), (0, jsx_runtime_1.jsx)("span", { className: 'text-sm font-medium text-green-600', children: "Confirmed" })] })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: 'w-full', children: "View Trip" }) })] }) }) })); },
};
exports.CategoryCard = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Category Display', description: 'Icon-based category card with hover effects and centered content', background: 'gradient-red', children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-xs mx-auto', children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: 'w-full h-[150px] hover:shadow-lg transition-shadow cursor-pointer', children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: 'flex flex-col items-center justify-center h-full text-center p-6', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-3xl mb-2', children: "\uD83C\uDFE8" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: 'text-lg', children: "Accommodation" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: 'text-xs mt-1', children: "Hotels & Lodging" })] }) }) }) })); },
};
exports.MultipleCards = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.ComponentStory, { title: 'Card - Grid Layout', description: 'Multiple category cards in responsive grid layout with consistent spacing', background: 'gradient-cyan', children: (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-8', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-2xl font-bold text-center text-gray-800', children: "Trip Categories" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto', children: [
                        { icon: '🌎', title: 'Destinations', desc: 'Places to visit' },
                        { icon: '📅', title: 'Itinerary', desc: 'Daily schedules' },
                        { icon: '✈️', title: 'Transport', desc: 'Flights & trains' },
                        { icon: '🏨', title: 'Accommodation', desc: 'Hotels & lodging' },
                        { icon: '🎯', title: 'Activities', desc: 'Things to do' },
                        { icon: '💰', title: 'Budget', desc: 'Cost tracking' },
                    ].map(function (item, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'h-[150px] hover:shadow-lg transition-shadow cursor-pointer', children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: 'flex flex-col items-center justify-center h-full text-center p-6', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-3xl mb-2', children: item.icon }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: 'text-lg', children: item.title }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: 'text-xs mt-1', children: item.desc })] }) }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'p-4 bg-cyan-50 rounded-lg border border-cyan-100', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-cyan-900 mb-2', children: "Grid Features:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-cyan-800 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Responsive grid adapts to screen size" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Consistent card height and hover effects" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Icon-centered design with clear typography" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Hover states provide visual feedback" })] })] })] }) })); },
};

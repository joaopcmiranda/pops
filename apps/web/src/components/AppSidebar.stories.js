"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationFlow = exports.ResponsiveDemo = exports.Interactive = exports.Collapsed = exports.AllStates = exports.Default = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AppSidebar_1 = require("./AppSidebar");
var StoryWrapper_1 = require("./StoryWrapper");
var sidebar_1 = require("@/components/ui/sidebar/sidebar");
var meta = {
    title: 'Components/AppSidebar',
    component: AppSidebar_1.AppSidebar,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        activeCategory: {
            control: 'select',
            options: [
                'dashboard',
                'calendar',
                'analytics',
                'destinations',
                'itinerary',
                'transport',
                'accommodation',
                'activities',
                'budget',
                'documents',
                'readme',
                'settings',
            ],
        },
    },
};
exports.default = meta;
exports.Default = {
    render: function () { return ((0, jsx_runtime_1.jsx)(StoryWrapper_1.AppLayoutStory, { title: 'App Sidebar - Default Layout', description: 'Main application sidebar with navigation categories', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: true, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-screen', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: 'dashboard', onCategorySelect: function (category) { return alert("\uD83D\uDCC2 Selected: ".concat(category)); } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 bg-gray-50', children: (0, jsx_runtime_1.jsxs)("div", { className: 'p-8', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800 mb-4', children: "Main Content Area" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-6', children: "This area would show the content for the selected category. Click on any sidebar item to see the selection." }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-sm border border-gray-200', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-800 mb-3', children: "Navigation Features" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-2', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Overview Section:" }), " Dashboard, Calendar, Analytics"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Trip Planning:" }), " Destinations, Itinerary, Transport, etc."] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Settings:" }), " Documentation and preferences"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Active States:" }), " Highlight current section"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Hover Effects:" }), " Interactive feedback"] })] })] })] }) })] }) }) })); },
};
exports.AllStates = {
    render: function () {
        var categories = [
            'dashboard',
            'calendar',
            'analytics',
            'destinations',
            'itinerary',
            'transport',
            'accommodation',
            'activities',
            'budget',
            'documents',
            'readme',
            'settings',
        ];
        return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800 text-center', children: "Sidebar with Different Active States" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6', children: categories.slice(0, 6).map(function (category) { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: true, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-80', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: category, onCategorySelect: function (cat) { return alert("\uD83D\uDCC2 ".concat(cat, " selected")); } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 p-6 bg-gray-50 flex items-center justify-center', children: (0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-xl font-semibold text-gray-800 capitalize', children: category }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mt-2', children: "Active state preview" })] }) })] }) }) }, category)); }) })] }) }));
    },
};
exports.Collapsed = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Collapsed Sidebar" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Space-saving layout for smaller screens" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: false, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-96', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: 'destinations', onCategorySelect: function (category) { return alert("\uD83D\uDCC2 Selected: ".concat(category)); } }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex-1 p-8 bg-gray-50', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800 mb-4', children: "Expanded Content Area" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-4', children: "When the sidebar is collapsed, more space is available for content. This is ideal for mobile devices or when users want to focus on content." }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-green-100 rounded-lg p-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-green-800 mb-2', children: "Benefits of Collapsed Mode:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-green-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 More screen real estate for content" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Better mobile experience" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Icons remain visible for quick navigation" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Hover states can show labels" })] })] })] })] }) }) })] }) })); },
};
var InteractiveComponent = function () {
    var _a = (0, react_1.useState)('dashboard'), activeCategory = _a[0], setActiveCategory = _a[1];
    var _b = (0, react_1.useState)(true), isOpen = _b[0], setIsOpen = _b[1];
    var categoryDescriptions = {
        dashboard: 'Overview of your entire trip with quick stats and recent activity',
        calendar: 'Timeline view of all your trip events and activities',
        analytics: 'Insights and statistics about your travel patterns and spending',
        destinations: 'Places you want to visit with details and recommendations',
        itinerary: 'Day-by-day schedule and planned activities',
        transport: 'Flights, trains, buses, and other transportation bookings',
        accommodation: 'Hotels, hostels, and other places you will stay',
        activities: 'Tours, experiences, and things to do at your destination',
        budget: 'Track expenses and manage your travel budget',
        documents: 'Important papers, tickets, and travel documents',
        readme: 'Help documentation and user guides',
        settings: 'App preferences and account settings',
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-indigo-50 to-cyan-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-6', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Interactive Sidebar Demo" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Click on any menu item to see content change" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { open: isOpen, onOpenChange: setIsOpen, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-[600px]', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: activeCategory, onCategorySelect: function (category) {
                                        setActiveCategory(category);
                                        // Simulate page navigation
                                        setTimeout(function () {
                                            alert("\uD83C\uDFAF Navigated to ".concat(category.charAt(0).toUpperCase() + category.slice(1)));
                                        }, 100);
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 p-8 bg-gray-50', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-2xl', children: [(0, jsx_runtime_1.jsx)("div", { className: 'flex gap-4 mb-6', children: (0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setIsOpen(!isOpen); }, className: 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors', children: [isOpen ? '◀ Collapse' : '▶ Expand', " Sidebar"] }) }), (0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800 mb-4 capitalize', children: activeCategory === 'readme' ? 'Documentation' : activeCategory }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-6', children: categoryDescriptions[activeCategory] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-xl p-6 shadow-sm', children: [(0, jsx_runtime_1.jsxs)("h3", { className: 'text-lg font-semibold text-gray-800 mb-4', children: ["Current Section:", ' ', activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-3 h-3 bg-blue-500 rounded-full' }), (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-700', children: "Interactive navigation working" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-3 h-3 bg-green-500 rounded-full' }), (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-700', children: "Active state highlighting" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-3', children: [(0, jsx_runtime_1.jsx)("div", { className: 'w-3 h-3 bg-purple-500 rounded-full' }), (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-700', children: "Responsive collapse/expand" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'mt-6 p-4 bg-indigo-50 rounded-lg', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-indigo-800 mb-2', children: "Try These Actions:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-indigo-700 space-y-1', children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Click different menu items to see content change" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Toggle the sidebar collapse/expand" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Notice the smooth transitions and hover effects" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Check how icons and labels work together" })] })] })] }) })] }) }) })] }) }));
};
exports.Interactive = {
    render: function () { return (0, jsx_runtime_1.jsx)(InteractiveComponent, {}); },
};
exports.ResponsiveDemo = {
    render: function () { return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-rose-50 to-orange-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-7xl mx-auto space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800', children: "Responsive Sidebar Behavior" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "How the sidebar adapts to different screen sizes" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-700', children: "\uD83D\uDDA5\uFE0F Desktop View (Full Width)" }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: true, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-64', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: 'itinerary', onCategorySelect: function (cat) { return alert("Desktop: ".concat(cat)); } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 p-6 bg-gray-50 flex items-center justify-center', children: (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-600', children: "Desktop content area with full sidebar" }) })] }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-700', children: "\uD83D\uDCF1 Tablet View (Collapsed)" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: false, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-64', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: 'activities', onCategorySelect: function (cat) { return alert("Tablet: ".concat(cat)); } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 p-6 bg-gray-50 flex items-center justify-center', children: (0, jsx_runtime_1.jsx)("span", { className: 'text-gray-600', children: "Tablet content with collapsed sidebar" }) })] }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'text-lg font-semibold text-gray-700', children: "\uD83D\uDCF1 Mobile View (Hidden/Overlay)" }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden', children: (0, jsx_runtime_1.jsx)("div", { className: 'p-6 bg-gray-50 h-64 flex items-center justify-center', children: (0, jsx_runtime_1.jsxs)("div", { className: 'text-center', children: [(0, jsx_runtime_1.jsx)("span", { className: 'text-gray-600 block', children: "Mobile content (full width)" }), (0, jsx_runtime_1.jsx)("span", { className: 'text-xs text-gray-500 mt-2', children: "Sidebar becomes an overlay" })] }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-orange-50 rounded-xl p-6', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-700 mb-2', children: "Responsive Behavior:" }), (0, jsx_runtime_1.jsxs)("ul", { className: 'text-sm text-gray-600 space-y-1', children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Desktop:" }), " Sidebar always visible, can be collapsed"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Tablet:" }), " Sidebar collapsed by default, icons visible"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Mobile:" }), " Sidebar hidden, accessible via hamburger menu"] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", (0, jsx_runtime_1.jsx)("strong", { children: "Touch:" }), " Swipe gestures for opening/closing on mobile"] })] })] })] }) })); },
};
var NavigationFlowComponent = function () {
    var _a = (0, react_1.useState)(0), currentFlow = _a[0], setCurrentFlow = _a[1];
    var flows = [
        { category: 'dashboard', description: 'Start at the dashboard for trip overview' },
        { category: 'destinations', description: 'Browse and select destinations to visit' },
        { category: 'accommodation', description: 'Find and book places to stay' },
        { category: 'transport', description: 'Book flights, trains, and local transport' },
        { category: 'activities', description: 'Discover and plan activities and tours' },
        { category: 'itinerary', description: 'Organize everything into a daily schedule' },
        { category: 'budget', description: 'Track expenses and manage your budget' },
        { category: 'documents', description: 'Store tickets, confirmations, and documents' },
    ];
    var nextFlow = function () {
        setCurrentFlow(function (prev) { return (prev + 1) % flows.length; });
    };
    var currentFlowData = flows[currentFlow];
    return ((0, jsx_runtime_1.jsx)("div", { className: 'bg-gradient-to-br from-violet-50 to-fuchsia-50 min-h-screen p-8', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-6xl mx-auto space-y-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center space-y-2', children: [(0, jsx_runtime_1.jsx)("h2", { className: 'text-3xl font-bold text-gray-800', children: "Trip Planning Navigation Flow" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Follow the typical user journey through trip planning" })] }), (0, jsx_runtime_1.jsx)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden', children: (0, jsx_runtime_1.jsx)(sidebar_1.SidebarProvider, { defaultOpen: true, children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex h-[500px]', children: [(0, jsx_runtime_1.jsx)(AppSidebar_1.AppSidebar, { activeCategory: currentFlowData.category, onCategorySelect: function (category) {
                                        var flowIndex = flows.findIndex(function (f) { return f.category === category; });
                                        if (flowIndex !== -1)
                                            setCurrentFlow(flowIndex);
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-1 p-8 bg-gray-50', children: (0, jsx_runtime_1.jsxs)("div", { className: 'max-w-xl', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-4 mb-6', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold', children: currentFlow + 1 }), (0, jsx_runtime_1.jsx)("h2", { className: 'text-2xl font-bold text-gray-800 capitalize', children: currentFlowData.category })] }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mb-8 text-lg', children: currentFlowData.description }), (0, jsx_runtime_1.jsxs)("div", { className: 'space-y-4', children: [(0, jsx_runtime_1.jsxs)("button", { onClick: nextFlow, className: 'bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors', children: ["Next Step (", ((currentFlow + 1) % flows.length) + 1, "/8)"] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-violet-50 rounded-lg p-4', children: [(0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-violet-800 mb-2', children: "Planning Flow Progress:" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex gap-2', children: flows.map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "w-8 h-2 rounded-full ".concat(index <= currentFlow ? 'bg-violet-600' : 'bg-violet-200') }, index)); }) })] })] })] }) })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', children: flows.map(function (flow, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 rounded-lg cursor-pointer transition-all ".concat(index === currentFlow
                            ? 'bg-violet-100 border-2 border-violet-300'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'), onClick: function () { return setCurrentFlow(index); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex items-center gap-2 mb-2', children: [(0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ".concat(index === currentFlow ? 'bg-violet-600 text-white' : 'bg-gray-300 text-gray-600'), children: index + 1 }), (0, jsx_runtime_1.jsx)("h4", { className: 'font-semibold text-gray-800 capitalize', children: flow.category })] }), (0, jsx_runtime_1.jsx)("p", { className: 'text-xs text-gray-600', children: flow.description })] }, flow.category)); }) })] }) }));
};
exports.NavigationFlow = {
    render: function () { return (0, jsx_runtime_1.jsx)(NavigationFlowComponent, {}); },
};

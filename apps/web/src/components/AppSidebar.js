"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSidebar = AppSidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var sidebar_tsx_1 = require("@/components/ui/sidebar/sidebar.tsx");
function AppSidebar(_a) {
    var _b = _a.activeCategory, activeCategory = _b === void 0 ? 'dashboard' : _b, onCategorySelect = _a.onCategorySelect;
    var overviewItems = [
        { id: 'dashboard', name: 'Dashboard', icon: lucide_react_1.Home },
        { id: 'calendar', name: 'Calendar', icon: lucide_react_1.CalendarDays },
        { id: 'analytics', name: 'Analytics', icon: lucide_react_1.BarChart3 },
    ];
    var planningItems = [
        { id: 'destinations', name: 'Destinations', icon: lucide_react_1.MapPin },
        { id: 'itinerary', name: 'Itinerary', icon: lucide_react_1.Calendar },
        { id: 'transport', name: 'Transport', icon: lucide_react_1.Plane },
        { id: 'accommodation', name: 'Accommodation', icon: lucide_react_1.Home },
        { id: 'activities', name: 'Activities', icon: lucide_react_1.Activity },
        { id: 'budget', name: 'Budget', icon: lucide_react_1.DollarSign },
        { id: 'documents', name: 'Documents', icon: lucide_react_1.FileText },
    ];
    var settingsItems = [
        { id: 'readme', name: 'Documentation', icon: lucide_react_1.BookOpen },
        { id: 'settings', name: 'Settings', icon: lucide_react_1.Settings },
    ];
    var handleCategoryClick = function (categoryId) {
        onCategorySelect === null || onCategorySelect === void 0 ? void 0 : onCategorySelect(categoryId);
    };
    return ((0, jsx_runtime_1.jsxs)(sidebar_tsx_1.Sidebar, { children: [(0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarHeader, { children: (0, jsx_runtime_1.jsxs)("button", { className: 'flex items-center gap-2 px-2 py-1 text-left w-full hover:bg-accent rounded-md transition-colors', onClick: function () { return handleCategoryClick('dashboard'); }, children: [(0, jsx_runtime_1.jsx)("span", { className: 'text-xl', children: "\u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { className: 'font-semibold', children: "Trip Organizer" })] }) }), (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarContent, { children: [(0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarGroup, { children: [(0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupLabel, { children: "Overview" }), (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupContent, { children: (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenu, { children: overviewItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarMenuButton, { isActive: activeCategory === item.id, onClick: function () { return handleCategoryClick(item.id); }, children: [(0, jsx_runtime_1.jsx)(item.icon, {}), (0, jsx_runtime_1.jsx)("span", { children: item.name })] }) }, item.id)); }) }) })] }), (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarGroup, { children: [(0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupLabel, { children: "Trip Planning" }), (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupContent, { children: (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenu, { children: planningItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarMenuButton, { isActive: activeCategory === item.id, onClick: function () { return handleCategoryClick(item.id); }, children: [(0, jsx_runtime_1.jsx)(item.icon, {}), (0, jsx_runtime_1.jsx)("span", { children: item.name })] }) }, item.id)); }) }) })] }), (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarGroup, { children: [(0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupLabel, { children: "Settings" }), (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarGroupContent, { children: (0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenu, { children: settingsItems.map(function (item) { return ((0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarMenuItem, { children: (0, jsx_runtime_1.jsxs)(sidebar_tsx_1.SidebarMenuButton, { isActive: activeCategory === item.id, onClick: function () { return handleCategoryClick(item.id); }, children: [(0, jsx_runtime_1.jsx)(item.icon, {}), (0, jsx_runtime_1.jsx)("span", { children: item.name })] }) }, item.id)); }) }) })] })] })] }));
}

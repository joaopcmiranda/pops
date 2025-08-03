"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryWrapper = StoryWrapper;
exports.AppLayoutStory = AppLayoutStory;
exports.ComponentStory = ComponentStory;
exports.ModalStory = ModalStory;
exports.MobileStory = MobileStory;
var jsx_runtime_1 = require("react/jsx-runtime");
var backgrounds = {
    default: 'bg-slate-50',
    'gradient-blue': 'bg-gradient-to-br from-slate-50 to-blue-50',
    'gradient-purple': 'bg-gradient-to-br from-purple-50 to-pink-50',
    'gradient-green': 'bg-gradient-to-br from-green-50 to-emerald-50',
    'gradient-orange': 'bg-gradient-to-br from-yellow-50 to-orange-50',
    'gradient-pink': 'bg-gradient-to-br from-rose-50 to-pink-50',
};
function StoryWrapper(_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.variant, variant = _c === void 0 ? 'default' : _c, _d = _a.background, background = _d === void 0 ? 'default' : _d;
    if (variant === 'app-frame') {
        // Full app layout frame
        return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(backgrounds[background], " min-h-screen p-6"), children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-6xl mx-auto', children: (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-lg shadow-sm border overflow-hidden', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-gray-50 border-b px-6 py-4', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900 font-['Poppins']", children: title }), description && (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mt-1', children: description })] }), (0, jsx_runtime_1.jsx)("div", { className: 'p-0', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-full h-full', children: children }) })] }) }) }));
    }
    if (variant === 'modal-frame') {
        // Modal demonstration frame
        return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(backgrounds[background], " min-h-screen p-6 flex items-center justify-center"), children: (0, jsx_runtime_1.jsxs)("div", { className: 'w-full max-w-2xl', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900 font-['Poppins']", children: title }), description && (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mt-2', children: description })] }), (0, jsx_runtime_1.jsx)("div", { className: 'relative', children: children })] }) }));
    }
    if (variant === 'mobile-frame') {
        // Mobile device frame
        return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(backgrounds[background], " min-h-screen p-6 flex items-center justify-center"), children: (0, jsx_runtime_1.jsxs)("div", { className: 'w-full max-w-md', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900 font-['Poppins']", children: title }), description && (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mt-2', children: description })] }), (0, jsx_runtime_1.jsx)("div", { className: 'max-w-sm mx-auto', children: (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200', children: [(0, jsx_runtime_1.jsx)("div", { className: 'bg-gray-900 h-6 flex items-center justify-center', children: (0, jsx_runtime_1.jsx)("div", { className: 'w-12 h-1 bg-gray-600 rounded-full' }) }), (0, jsx_runtime_1.jsx)("div", { className: 'relative', children: children })] }) })] }) }));
    }
    // Default frame
    return ((0, jsx_runtime_1.jsx)("div", { className: "".concat(backgrounds[background], " min-h-screen p-6 ").concat(className), children: (0, jsx_runtime_1.jsx)("div", { className: 'max-w-4xl mx-auto', children: (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white rounded-lg shadow-sm border overflow-hidden', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-gray-50 border-b px-6 py-4', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900 font-['Poppins']", children: title }), description && (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600 mt-1', children: description })] }), (0, jsx_runtime_1.jsx)("div", { className: 'p-6', children: children })] }) }) }));
}
// Convenience wrapper for app layout stories
function AppLayoutStory(_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.background, background = _b === void 0 ? 'gradient-blue' : _b;
    return ((0, jsx_runtime_1.jsx)(StoryWrapper, { title: title, description: description, variant: 'app-frame', background: background, children: children }));
}
// Convenience wrapper for component stories
function ComponentStory(_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.background, background = _b === void 0 ? 'gradient-blue' : _b;
    return ((0, jsx_runtime_1.jsx)(StoryWrapper, { title: title, description: description, variant: 'default', background: background, children: children }));
}
// Convenience wrapper for modal stories
function ModalStory(_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.background, background = _b === void 0 ? 'gradient-purple' : _b;
    return ((0, jsx_runtime_1.jsx)(StoryWrapper, { title: title, description: description, variant: 'modal-frame', background: background, children: children }));
}
// Convenience wrapper for mobile stories
function MobileStory(_a) {
    var title = _a.title, description = _a.description, children = _a.children, _b = _a.background, background = _b === void 0 ? 'gradient-green' : _b;
    return ((0, jsx_runtime_1.jsx)(StoryWrapper, { title: title, description: description, variant: 'mobile-frame', background: background, children: children }));
}

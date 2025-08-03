"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHeader = AppHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_tsx_1 = require("./ui/button/button.tsx");
var avatar_1 = require("./ui/avatar");
var sidebar_tsx_1 = require("./ui/sidebar/sidebar.tsx");
function AppHeader(_a) {
    var currentTrip = _a.currentTrip, onTripSwitch = _a.onTripSwitch;
    return ((0, jsx_runtime_1.jsxs)("header", { className: 'app-header', children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(sidebar_tsx_1.SidebarTrigger, { className: 'md:hidden' }), currentTrip ? ((0, jsx_runtime_1.jsxs)("div", { onClick: onTripSwitch, style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s ease',
                            minWidth: 0,
                            flex: '0 1 auto',
                            touchAction: 'manipulation',
                        }, className: 'trip-selector-header', role: 'button', tabIndex: 0, onKeyDown: function (e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onTripSwitch === null || onTripSwitch === void 0 ? void 0 : onTripSwitch();
                            }
                        }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '16px', height: '16px', color: '#3b82f6', flexShrink: 0 } }), (0, jsx_runtime_1.jsxs)("div", { style: { minWidth: 0, flex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            fontSize: '0.875rem',
                                            fontWeight: '600',
                                            color: '#0f172a',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }, children: currentTrip.title }), (0, jsx_runtime_1.jsx)("div", { style: {
                                            fontSize: '0.75rem',
                                            color: '#64748b',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }, children: currentTrip.destination })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { style: { width: '16px', height: '16px', color: '#64748b', flexShrink: 0 } })] })) : ((0, jsx_runtime_1.jsx)("h1", { className: 'header-title', style: {
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }, children: "Trip Organizer" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: 'header-actions', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'hidden sm:flex', style: { position: 'relative', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { style: {
                                    position: 'absolute',
                                    left: '12px',
                                    width: '16px',
                                    height: '16px',
                                    color: '#64748b',
                                } }), (0, jsx_runtime_1.jsx)("input", { type: 'text', placeholder: 'Search your trip...', style: {
                                    paddingLeft: '2.5rem',
                                    paddingRight: '1rem',
                                    paddingTop: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#f8fafc',
                                    fontSize: '0.875rem',
                                    width: '240px',
                                    outline: 'none',
                                    transition: 'width 0.2s ease',
                                }, onFocus: function (e) {
                                    if (window.innerWidth <= 768) {
                                        e.target.style.width = '200px';
                                    }
                                }, onBlur: function (e) {
                                    if (window.innerWidth <= 768) {
                                        e.target.style.width = '160px';
                                    }
                                } })] }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', className: 'sm:hidden', style: {
                            padding: '0.5rem',
                            minHeight: '40px',
                            minWidth: '40px',
                            touchAction: 'manipulation',
                        }, "aria-label": 'Search', children: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { style: { width: '18px', height: '18px' } }) }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', style: {
                            padding: '0.5rem',
                            minHeight: '40px',
                            minWidth: '40px',
                            touchAction: 'manipulation',
                        }, "aria-label": 'Notifications', children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { style: { width: '20px', height: '20px' } }) }), (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: 'h-8 w-8 cursor-pointer', children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: '/api/placeholder/32/32', alt: 'User' }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: 'h-4 w-4' }) })] })] })] }));
}

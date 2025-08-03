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
exports.ErrorScreen = ErrorScreen;
exports.NetworkErrorScreen = NetworkErrorScreen;
exports.NotFoundErrorScreen = NotFoundErrorScreen;
exports.LoadingErrorScreen = LoadingErrorScreen;
exports.PermissionErrorScreen = PermissionErrorScreen;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var button_tsx_1 = require("./ui/button/button.tsx");
function ErrorScreen(_a) {
    var _b = _a.type, type = _b === void 0 ? 'generic' : _b, title = _a.title, description = _a.description, children = _a.children, onRetry = _a.onRetry, onGoHome = _a.onGoHome, _c = _a.showRetry, showRetry = _c === void 0 ? true : _c, _d = _a.showHome, showHome = _d === void 0 ? true : _d;
    var getErrorConfig = function () {
        switch (type) {
            case 'network':
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Wifi, { style: { width: '64px', height: '64px', color: '#ef4444' } }),
                    defaultTitle: 'Connection Problem',
                    defaultDescription: 'Unable to connect to the server. Please check your internet connection and try again.',
                };
            case 'notFound':
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { style: { width: '64px', height: '64px', color: '#64748b' } }),
                    defaultTitle: 'Content Not Found',
                    defaultDescription: "The content you're looking for doesn't exist or has been moved.",
                };
            case 'loading':
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { style: { width: '64px', height: '64px', color: '#3b82f6' } }),
                    defaultTitle: 'Loading Error',
                    defaultDescription: 'There was a problem loading this content. This might be temporary.',
                };
            case 'permission':
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { style: { width: '64px', height: '64px', color: '#f59e0b' } }),
                    defaultTitle: 'Access Denied',
                    defaultDescription: "You don't have permission to access this content.",
                };
            default:
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { style: { width: '64px', height: '64px', color: '#ef4444' } }),
                    defaultTitle: 'Something went wrong',
                    defaultDescription: 'An unexpected error occurred. Please try again.',
                };
        }
    };
    var config = getErrorConfig();
    var displayTitle = title || config.defaultTitle;
    var displayDescription = description || config.defaultDescription;
    var handleRetry = function () {
        if (onRetry) {
            onRetry();
        }
        else {
            window.location.reload();
        }
    };
    var handleGoHome = function () {
        if (onGoHome) {
            onGoHome();
        }
        else {
            window.location.href = '/';
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
        }, className: 'animate-fade-in', children: (0, jsx_runtime_1.jsx)(card_1.Card, { style: { maxWidth: '500px', width: '100%' }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { style: { padding: '3rem', textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { margin: '0 auto 1.5rem' }, children: config.icon }), (0, jsx_runtime_1.jsx)("h2", { style: {
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '0.5rem',
                            fontFamily: 'Poppins, sans-serif',
                        }, children: displayTitle }), (0, jsx_runtime_1.jsx)("p", { style: {
                            color: '#64748b',
                            marginBottom: '2rem',
                            lineHeight: '1.6',
                        }, children: displayDescription }), children && (0, jsx_runtime_1.jsx)("div", { style: { marginBottom: '2rem' }, children: children }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }, children: [showRetry && ((0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { onClick: handleRetry, className: 'button-hover focus-ring', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Try Again"] })), showHome && ((0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { variant: 'outline', onClick: handleGoHome, className: 'button-hover focus-ring', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Home, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Go to Dashboard"] }))] })] }) }) }));
}
// Specialized error screen components
function NetworkErrorScreen(props) {
    return (0, jsx_runtime_1.jsx)(ErrorScreen, __assign({}, props, { type: 'network' }));
}
function NotFoundErrorScreen(props) {
    return (0, jsx_runtime_1.jsx)(ErrorScreen, __assign({}, props, { type: 'notFound' }));
}
function LoadingErrorScreen(props) {
    return (0, jsx_runtime_1.jsx)(ErrorScreen, __assign({}, props, { type: 'loading' }));
}
function PermissionErrorScreen(props) {
    return (0, jsx_runtime_1.jsx)(ErrorScreen, __assign({}, props, { type: 'permission' }));
}

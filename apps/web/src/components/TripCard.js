"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripCard = TripCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var button_tsx_1 = require("./ui/button/button.tsx");
var badge_tsx_1 = require("./ui/badge/badge.tsx");
function TripCard(_a) {
    var trip = _a.trip, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, onSelect = _a.onSelect, onSettings = _a.onSettings;
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };
    var getStatusVariant = function (status) {
        switch (status) {
            case 'active':
            case 'confirmed':
                return 'default';
            case 'upcoming':
            case 'planning':
                return 'secondary';
            case 'completed':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'secondary';
        }
    };
    var getTypeVariant = function (type) {
        switch (type) {
            case 'business':
                return 'default';
            case 'adventure':
            case 'backpacking':
                return 'secondary';
            case 'family':
            case 'leisure':
                return 'outline';
            default:
                return 'secondary';
        }
    };
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "card-hover cursor-pointer ".concat(isSelected ? 'ring-2 ring-blue-500' : ''), onClick: function () { return onSelect(trip.id); }, style: {
            transition: 'all 0.2s ease',
            transform: isSelected ? 'translateY(-2px)' : 'none',
        }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { style: { padding: '1.5rem' }, children: [trip.coverImage && ((0, jsx_runtime_1.jsx)("div", { style: {
                        height: '120px',
                        backgroundImage: "url(".concat(trip.coverImage, ")"),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                    } })), (0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                                        fontSize: '1.25rem',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                        marginBottom: '0.25rem',
                                        lineHeight: '1.3',
                                    }, children: trip.title }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#64748b',
                                        fontSize: '0.875rem',
                                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '14px', height: '14px', marginRight: '0.25rem' } }), trip.destination] })] }), (0, jsx_runtime_1.jsx)(badge_tsx_1.Badge, { variant: getStatusVariant(trip.status), children: trip.status })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        color: '#64748b',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { style: { width: '14px', height: '14px', marginRight: '0.25rem' } }), formatDate(trip.startDate), " - ", formatDate(trip.endDate)] }), (0, jsx_runtime_1.jsxs)(badge_tsx_1.Badge, { variant: getTypeVariant(trip.type), children: [trip.type, " trip"] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #e2e8f0',
                    }, children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'outline', size: 'sm', onClick: function (e) {
                                e.stopPropagation();
                                onSelect(trip.id);
                            }, children: "Open Trip" }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: '0.5rem' }, children: onSettings && ((0, jsx_runtime_1.jsx)("button", { style: {
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                }, onClick: function (e) {
                                    e.stopPropagation();
                                    onSettings(trip.id);
                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { style: { width: '16px', height: '16px' } }) })) })] })] }) }));
}

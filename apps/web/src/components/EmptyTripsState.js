"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyTripsState = EmptyTripsState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var button_tsx_1 = require("./ui/button/button.tsx");
function EmptyTripsState(_a) {
    var onCreateTrip = _a.onCreateTrip;
    return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { style: { padding: '3rem', textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '64px', height: '64px', color: '#d1d5db', margin: '0 auto 1rem' } }), (0, jsx_runtime_1.jsx)("h3", { style: {
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#0f172a',
                        marginBottom: '0.5rem',
                    }, children: "No trips yet" }), (0, jsx_runtime_1.jsx)("p", { style: { color: '#64748b', marginBottom: '1.5rem' }, children: "Create your first trip to get started with planning your adventure" }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { onClick: onCreateTrip, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Create Your First Trip"] })] }) }));
}

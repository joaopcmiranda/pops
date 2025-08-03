"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTripCard = NewTripCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function NewTripCard(_a) {
    var onClick = _a.onClick;
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'card-hover cursor-pointer', onClick: onClick, style: {
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            textAlign: 'center',
            transition: 'all 0.2s ease',
        }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '48px', height: '48px', color: '#3b82f6', margin: '0 auto 1rem' } }), (0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '1.25rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }, children: "Create New Trip" }), (0, jsx_runtime_1.jsx)("p", { style: { color: '#64748b' }, children: "Start planning your next adventure" })] }));
}

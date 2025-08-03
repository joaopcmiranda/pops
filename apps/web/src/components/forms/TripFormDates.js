"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripFormDates = TripFormDates;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function TripFormDates(_a) {
    var formData = _a.formData, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: {
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { style: { width: '20px', height: '20px', marginRight: '0.5rem' } }), "Travel Dates"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: {
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '0.5rem',
                                }, children: "Start Date *" }), (0, jsx_runtime_1.jsx)("input", { type: 'date', required: true, value: formData.startDate, onChange: function (e) { return onChange('startDate', e.target.value); }, style: {
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: {
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '0.5rem',
                                }, children: "End Date *" }), (0, jsx_runtime_1.jsx)("input", { type: 'date', required: true, value: formData.endDate, onChange: function (e) { return onChange('endDate', e.target.value); }, min: formData.startDate, style: {
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                } })] })] })] }));
}

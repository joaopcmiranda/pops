"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripFormBasicInfo = TripFormBasicInfo;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function TripFormBasicInfo(_a) {
    var formData = _a.formData, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: {
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#0f172a',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '20px', height: '20px', marginRight: '0.5rem' } }), "Trip Details"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gap: '1rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: {
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '0.5rem',
                                }, children: "Trip Title *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', required: true, value: formData.title, onChange: function (e) { return onChange('title', e.target.value); }, placeholder: 'e.g., Summer in Europe', style: {
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                } })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: {
                                            display: 'block',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#374151',
                                            marginBottom: '0.5rem',
                                        }, children: "Destination *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', required: true, value: formData.destination, onChange: function (e) { return onChange('destination', e.target.value); }, placeholder: 'e.g., Paris', style: {
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
                                        }, children: "Country *" }), (0, jsx_runtime_1.jsx)("input", { type: 'text', required: true, value: formData.country, onChange: function (e) { return onChange('country', e.target.value); }, placeholder: 'e.g., France', style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                        } })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: {
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '0.5rem',
                                }, children: "Trip Type" }), (0, jsx_runtime_1.jsxs)("select", { value: formData.type, onChange: function (e) { return onChange('type', e.target.value); }, style: {
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '0.875rem',
                                }, children: [(0, jsx_runtime_1.jsx)("option", { value: 'leisure', children: "Leisure" }), (0, jsx_runtime_1.jsx)("option", { value: 'business', children: "Business" }), (0, jsx_runtime_1.jsx)("option", { value: 'family', children: "Family" }), (0, jsx_runtime_1.jsx)("option", { value: 'adventure', children: "Adventure" }), (0, jsx_runtime_1.jsx)("option", { value: 'honeymoon', children: "Honeymoon" }), (0, jsx_runtime_1.jsx)("option", { value: 'solo', children: "Solo" }), (0, jsx_runtime_1.jsx)("option", { value: 'group', children: "Group" }), (0, jsx_runtime_1.jsx)("option", { value: 'other', children: "Other" })] })] })] })] }));
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripFormDescription = TripFormDescription;
var jsx_runtime_1 = require("react/jsx-runtime");
function TripFormDescription(_a) {
    var formData = _a.formData, onChange = _a.onChange;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '2rem' }, children: [(0, jsx_runtime_1.jsx)("label", { style: {
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem',
                }, children: "Description (Optional)" }), (0, jsx_runtime_1.jsx)("textarea", { value: formData.description, onChange: function (e) { return onChange('description', e.target.value); }, placeholder: 'Tell us about your trip plans...', rows: 3, style: {
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                } })] }));
}

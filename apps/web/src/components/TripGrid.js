"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripGrid = TripGrid;
var jsx_runtime_1 = require("react/jsx-runtime");
var TripCard_1 = require("./TripCard");
var NewTripCard_1 = require("./NewTripCard");
function TripGrid(_a) {
    var trips = _a.trips, selectedTripId = _a.selectedTripId, onTripSelect = _a.onTripSelect, onNewTrip = _a.onNewTrip, onTripSettings = _a.onTripSettings, _b = _a.showNewTripCard, showNewTripCard = _b === void 0 ? true : _b;
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
        }, children: [showNewTripCard && (0, jsx_runtime_1.jsx)(NewTripCard_1.NewTripCard, { onClick: onNewTrip }), trips.map(function (trip) { return ((0, jsx_runtime_1.jsx)(TripCard_1.TripCard, { trip: trip, isSelected: selectedTripId === trip.id, onSelect: onTripSelect, onSettings: onTripSettings }, trip.id)); })] }));
}

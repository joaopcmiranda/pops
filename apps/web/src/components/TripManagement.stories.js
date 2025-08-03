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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactive = exports.EmptyState = exports.CompleteWorkflow = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var TripGrid_1 = require("./TripGrid");
var EmptyTripsState_1 = require("./EmptyTripsState");
var dialog_1 = require("./ui/dialog");
var TripFormBasicInfo_1 = require("./forms/TripFormBasicInfo");
var TripFormDates_1 = require("./forms/TripFormDates");
var TripFormDescription_1 = require("./forms/TripFormDescription");
var button_1 = require("./ui/button/button");
// Mock trip data
var initialTrips = [
    {
        id: '1',
        title: 'Rio de Janeiro Adventure',
        destination: 'Rio de Janeiro, Brazil',
        startDate: '2024-03-15',
        endDate: '2024-03-22',
        type: 'leisure',
        status: 'upcoming',
        coverImage: 'https://images.unsplash.com/photo-1544984503-42b2de65b9ee?w=400&h=240&fit=crop',
    },
    {
        id: '2',
        title: 'Tokyo Business Trip',
        destination: 'Tokyo, Japan',
        startDate: '2024-02-10',
        endDate: '2024-02-15',
        type: 'business',
        status: 'active',
    },
    {
        id: '3',
        title: 'European Backpacking',
        destination: 'Multiple Cities, Europe',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        type: 'adventure',
        status: 'planning',
        coverImage: 'https://images.unsplash.com/photo-1520637836862-4d197d17c17a?w=400&h=240&fit=crop',
    },
];
// Complete Trip Management Component
function TripManagement() {
    var _a = (0, react_1.useState)(initialTrips), trips = _a[0], setTrips = _a[1];
    var _b = (0, react_1.useState)(null), selectedTripId = _b[0], setSelectedTripId = _b[1];
    var _c = (0, react_1.useState)(false), isNewTripModalOpen = _c[0], setIsNewTripModalOpen = _c[1];
    var _d = (0, react_1.useState)({
        title: '',
        destination: '',
        country: '',
        type: 'leisure',
        startDate: '',
        endDate: '',
        description: '',
    }), formData = _d[0], setFormData = _d[1];
    var handleTripSelect = function (tripId) {
        setSelectedTripId(tripId);
        var trip = trips.find(function (t) { return t.id === tripId; });
        if (trip) {
            alert("\uD83C\uDFAF Opening \"".concat(trip.title, "\" trip dashboard..."));
        }
    };
    var handleNewTrip = function () {
        setIsNewTripModalOpen(true);
    };
    var handleTripSettings = function (tripId) {
        var trip = trips.find(function (t) { return t.id === tripId; });
        if (trip) {
            alert("\u2699\uFE0F Opening settings for \"".concat(trip.title, "\"..."));
        }
    };
    var handleFormChange = function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var handleCreateTrip = function (e) {
        e.preventDefault();
        var newTrip = {
            id: Date.now().toString(),
            title: formData.title,
            destination: "".concat(formData.destination, ", ").concat(formData.country),
            startDate: formData.startDate,
            endDate: formData.endDate,
            type: formData.type,
            status: 'planning',
        };
        setTrips(function (prev) { return __spreadArray([newTrip], prev, true); });
        setIsNewTripModalOpen(false);
        // Reset form
        setFormData({
            title: '',
            destination: '',
            country: '',
            type: 'leisure',
            startDate: '',
            endDate: '',
            description: '',
        });
        alert("\uD83C\uDF89 \"".concat(newTrip.title, "\" trip created successfully!"));
    };
    if (trips.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900 mb-2', children: "Welcome to Trip Organizer! \uD83C\uDF0E" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Start your journey by creating your first trip" })] }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: handleNewTrip }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isNewTripModalOpen, onOpenChange: function (open) { return setIsNewTripModalOpen(open); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: 'sm:max-w-[600px]', children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create Your First Trip" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateTrip, children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: '1rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid #e2e8f0',
                                        }, children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: 'button', variant: 'outline', onClick: function () { return setIsNewTripModalOpen(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', children: "Create Trip" })] })] })] }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center mb-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900', children: "Your Trips \u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Manage all your travel adventures in one place" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'text-right', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500', children: "Total Trips" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-2xl font-bold text-blue-600', children: trips.length })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid grid-cols-1 md:grid-cols-4 gap-4 mb-8', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'bg-white p-4 rounded-lg shadow-sm', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500', children: "Active" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-xl font-bold text-green-600', children: trips.filter(function (t) { return t.status === 'active'; }).length })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white p-4 rounded-lg shadow-sm', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500', children: "Upcoming" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-xl font-bold text-blue-600', children: trips.filter(function (t) { return t.status === 'upcoming'; }).length })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white p-4 rounded-lg shadow-sm', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500', children: "Planning" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-xl font-bold text-yellow-600', children: trips.filter(function (t) { return t.status === 'planning'; }).length })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white p-4 rounded-lg shadow-sm', children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-gray-500', children: "Completed" }), (0, jsx_runtime_1.jsx)("div", { className: 'text-xl font-bold text-gray-600', children: trips.filter(function (t) { return t.status === 'completed'; }).length })] })] }), (0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: trips, selectedTripId: selectedTripId, onTripSelect: handleTripSelect, onNewTrip: handleNewTrip, onTripSettings: handleTripSettings }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isNewTripModalOpen, onOpenChange: function (open) { return setIsNewTripModalOpen(open); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: 'sm:max-w-[600px]', children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Trip" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateTrip, children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '1rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid #e2e8f0',
                                    }, children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: 'button', variant: 'outline', onClick: function () { return setIsNewTripModalOpen(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', children: "Create Trip" })] })] })] }) })] }));
}
var meta = {
    title: 'Components/TripManagement',
    component: TripGrid_1.TripGrid,
    parameters: {
        layout: 'centered',
    },
};
exports.default = meta;
exports.CompleteWorkflow = {
    render: function () { return (0, jsx_runtime_1.jsx)(TripManagement, {}); },
};
exports.EmptyState = {
    render: function () {
        var EmptyTripManagement = function () {
            var _a = (0, react_1.useState)(false), isNewTripModalOpen = _a[0], setIsNewTripModalOpen = _a[1];
            var _b = (0, react_1.useState)({
                title: '',
                destination: '',
                country: '',
                type: 'leisure',
                startDate: '',
                endDate: '',
                description: '',
            }), formData = _b[0], setFormData = _b[1];
            var handleFormChange = function (field, value) {
                setFormData(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
                });
            };
            var handleCreateTrip = function (e) {
                e.preventDefault();
                alert("\uD83C\uDF89 \"".concat(formData.title, "\" would be your first trip!"));
                setIsNewTripModalOpen(false);
            };
            return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'text-center mb-8', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900 mb-2', children: "Welcome to Trip Organizer! \uD83C\uDF0E" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Start your journey by creating your first trip" })] }), (0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return setIsNewTripModalOpen(true); } }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isNewTripModalOpen, onOpenChange: function (open) { return setIsNewTripModalOpen(open); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: 'sm:max-w-[600px]', children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create Your First Trip" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateTrip, children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                gap: '1rem',
                                                paddingTop: '1rem',
                                                borderTop: '1px solid #e2e8f0',
                                            }, children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: 'button', variant: 'outline', onClick: function () { return setIsNewTripModalOpen(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', children: "Create Trip" })] })] })] }) })] }));
        };
        return (0, jsx_runtime_1.jsx)(EmptyTripManagement, {});
    },
};
exports.Interactive = {
    render: function () {
        var InteractiveTripManagement = function () {
            var _a = (0, react_1.useState)(initialTrips), trips = _a[0], setTrips = _a[1];
            var _b = (0, react_1.useState)(null), selectedTripId = _b[0], setSelectedTripId = _b[1];
            var _c = (0, react_1.useState)(false), isNewTripModalOpen = _c[0], setIsNewTripModalOpen = _c[1];
            var _d = (0, react_1.useState)({
                title: '',
                destination: '',
                country: '',
                type: 'leisure',
                startDate: '',
                endDate: '',
                description: '',
            }), formData = _d[0], setFormData = _d[1];
            var handleTripSelect = function (tripId) {
                setSelectedTripId(tripId);
                var trip = trips.find(function (t) { return t.id === tripId; });
                if (trip) {
                    alert("\uD83C\uDFAF Selected \"".concat(trip.title, "\"\n\nIn a real app, this would:\n\u2022 Navigate to trip dashboard\n\u2022 Show trip details\n\u2022 Allow editing and planning"));
                }
            };
            var handleDeleteTrip = function (tripId) {
                var trip = trips.find(function (t) { return t.id === tripId; });
                if (trip && confirm("Are you sure you want to delete \"".concat(trip.title, "\"?"))) {
                    setTrips(function (prev) { return prev.filter(function (t) { return t.id !== tripId; }); });
                    alert("\uD83D\uDDD1\uFE0F \"".concat(trip.title, "\" has been deleted."));
                }
            };
            var handleFormChange = function (field, value) {
                setFormData(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
                });
            };
            var handleCreateTrip = function (e) {
                e.preventDefault();
                var newTrip = {
                    id: Date.now().toString(),
                    title: formData.title,
                    destination: "".concat(formData.destination, ", ").concat(formData.country),
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    type: formData.type,
                    status: 'planning',
                };
                setTrips(function (prev) { return __spreadArray([newTrip], prev, true); });
                setIsNewTripModalOpen(false);
                // Reset form
                setFormData({
                    title: '',
                    destination: '',
                    country: '',
                    type: 'leisure',
                    startDate: '',
                    endDate: '',
                    description: '',
                });
                alert("\uD83C\uDF89 \"".concat(newTrip.title, "\" created successfully!\n\nYou can now:\n\u2022 Plan your itinerary\n\u2022 Set your budget\n\u2022 Book accommodations\n\u2022 Add activities"));
            };
            return ((0, jsx_runtime_1.jsxs)("div", { className: 'p-8 bg-gray-50 min-h-screen', children: [(0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between items-center mb-8', children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-3xl font-bold text-gray-900', children: "Interactive Trip Manager \u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("p", { className: 'text-gray-600', children: "Click on cards, buttons, and forms to see interactions" })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-2', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: 'outline', onClick: function () {
                                            setTrips(initialTrips);
                                            alert('🔄 Trips reset to initial state');
                                        }, children: "Reset Data" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return setIsNewTripModalOpen(true); }, children: "+ Add Trip" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'bg-white p-4 rounded-lg shadow-sm mb-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold mb-3', children: "Quick Actions" }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex gap-2 flex-wrap', children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: 'sm', variant: 'outline', onClick: function () {
                                            var randomTrips = [
                                                {
                                                    title: 'Iceland Adventure',
                                                    destination: 'Reykjavik, Iceland',
                                                    type: 'adventure',
                                                },
                                                { title: 'Bali Retreat', destination: 'Ubud, Bali', type: 'leisure' },
                                                { title: 'NYC Business', destination: 'New York, USA', type: 'business' },
                                            ];
                                            var randomTrip = randomTrips[Math.floor(Math.random() * randomTrips.length)];
                                            setFormData({
                                                title: randomTrip.title,
                                                destination: randomTrip.destination.split(',')[0],
                                                country: randomTrip.destination.split(',')[1].trim(),
                                                type: randomTrip.type,
                                                startDate: '2024-07-15',
                                                endDate: '2024-07-22',
                                                description: '',
                                            });
                                            setIsNewTripModalOpen(true);
                                        }, children: "\uD83C\uDFB2 Random Trip" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: 'sm', variant: 'outline', onClick: function () {
                                            var completed = trips.map(function (trip) { return (__assign(__assign({}, trip), { status: 'completed' })); });
                                            setTrips(completed);
                                            alert('📋 All trips marked as completed');
                                        }, children: "\u2705 Mark All Complete" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: 'sm', variant: 'outline', onClick: function () {
                                            if (confirm('Delete all trips? This cannot be undone.')) {
                                                setTrips([]);
                                                alert('🗑️ All trips deleted');
                                            }
                                        }, children: "\uD83D\uDDD1\uFE0F Clear All" })] })] }), trips.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyTripsState_1.EmptyTripsState, { onCreateTrip: function () { return setIsNewTripModalOpen(true); } })) : ((0, jsx_runtime_1.jsx)(TripGrid_1.TripGrid, { trips: trips, selectedTripId: selectedTripId, onTripSelect: handleTripSelect, onNewTrip: function () { return setIsNewTripModalOpen(true); }, onTripSettings: function (tripId) {
                            var actions = [
                                '✏️ Edit trip details',
                                '📅 Manage itinerary',
                                '💰 Update budget',
                                '🏨 Book accommodation',
                                '✈️ Add flights',
                                '🗑️ Delete trip',
                            ];
                            var action = prompt("Choose action for trip:\n\n".concat(actions.map(function (a, i) { return "".concat(i + 1, ". ").concat(a); }).join('\n'), "\n\nEnter number (1-").concat(actions.length, "):"));
                            if (action === '6') {
                                handleDeleteTrip(tripId);
                            }
                            else if (action && parseInt(action) >= 1 && parseInt(action) <= actions.length) {
                                alert("".concat(actions[parseInt(action) - 1], " - Feature coming soon!"));
                            }
                        } })), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isNewTripModalOpen, onOpenChange: function (open) { return setIsNewTripModalOpen(open); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: 'sm:max-w-[600px]', children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "Create New Trip" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateTrip, children: [(0, jsx_runtime_1.jsx)(TripFormBasicInfo_1.TripFormBasicInfo, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDates_1.TripFormDates, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsx)(TripFormDescription_1.TripFormDescription, { formData: formData, onChange: handleFormChange }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                gap: '1rem',
                                                paddingTop: '1rem',
                                                borderTop: '1px solid #e2e8f0',
                                            }, children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: 'button', variant: 'outline', onClick: function () {
                                                        setIsNewTripModalOpen(false);
                                                        setFormData({
                                                            title: '',
                                                            destination: '',
                                                            country: '',
                                                            type: 'leisure',
                                                            startDate: '',
                                                            endDate: '',
                                                            description: '',
                                                        });
                                                    }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: 'submit', children: "Create Trip" })] })] })] }) })] }));
        };
        return (0, jsx_runtime_1.jsx)(InteractiveTripManagement, {});
    },
};

"use strict";
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
exports.Calendar = Calendar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var button_tsx_1 = require("./ui/button/button.tsx");
var itineraryService_1 = require("@/services/itineraryService");
var MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
var WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function Calendar(_a) {
    var _b, _c;
    var onEventClick = _a.onEventClick, onAddEvent = _a.onAddEvent;
    var _d = (0, react_1.useState)(new Date()), currentDate = _d[0], setCurrentDate = _d[1];
    var _e = (0, react_1.useState)(null), selectedDate = _e[0], setSelectedDate = _e[1];
    var _f = (0, react_1.useState)([]), events = _f[0], setEvents = _f[1];
    var _g = (0, react_1.useState)([]), filteredTypes = _g[0], setFilteredTypes = _g[1];
    var _h = (0, react_1.useState)(true), loading = _h[0], setLoading = _h[1];
    // Load events from service
    (0, react_1.useEffect)(function () {
        try {
            setLoading(true);
            var allEvents = itineraryService_1.ItineraryService.getAllItems();
            setEvents(allEvents);
        }
        catch (error) {
            console.error('Error loading calendar events:', error);
            // TODO: Replace with Sonner toast
            console.error('Calendar Error: Unable to load your itinerary events');
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Generate calendar days for current month view
    var calendarDays = (0, react_1.useMemo)(function () {
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        // First day of the month
        var firstDay = new Date(year, month, 1);
        // Last day of the month
        var lastDay = new Date(year, month + 1, 0);
        // Start from the first Sunday of the calendar view
        var startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        // End at the last Saturday of the calendar view
        var endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
        var days = [];
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var _loop_1 = function (date) {
            var currentCalendarDate = new Date(date);
            var isCurrentMonth = currentCalendarDate.getMonth() === month;
            var isToday = currentCalendarDate.getTime() === today.getTime();
            var isSelected = (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.toDateString()) === currentCalendarDate.toDateString();
            // Filter events for this day
            var dayEvents = events.filter(function (event) {
                var eventDate = new Date(event.startDate);
                eventDate.setHours(0, 0, 0, 0);
                // Apply type filter
                if (filteredTypes.length > 0 && !filteredTypes.includes(event.type)) {
                    return false;
                }
                return eventDate.getTime() === currentCalendarDate.getTime();
            });
            days.push({
                date: new Date(currentCalendarDate),
                events: dayEvents,
                isCurrentMonth: isCurrentMonth,
                isToday: isToday,
                isSelected: isSelected,
            });
        };
        for (var date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            _loop_1(date);
        }
        return days;
    }, [currentDate, events, selectedDate, filteredTypes]);
    var navigateMonth = function (direction) {
        setCurrentDate(function (prev) {
            var newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            }
            else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };
    var goToToday = function () {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };
    var handleDayClick = function (day) {
        setSelectedDate(day.date);
        if (onAddEvent && day.events.length === 0) {
            // If no events on this day, show option to add
            onAddEvent(day.date);
        }
    };
    var getEventTypeColor = function (type) {
        var colors = {
            accommodation: 'bg-blue-500',
            event: 'bg-purple-500',
            work: 'bg-green-500',
            activity: 'bg-yellow-500',
            transport: 'bg-gray-500',
            'overarching-event': 'bg-red-500',
        };
        return colors[type] || 'bg-gray-400';
    };
    var toggleTypeFilter = function (type) {
        setFilteredTypes(function (prev) { return (prev.includes(type) ? prev.filter(function (t) { return t !== type; }) : __spreadArray(__spreadArray([], prev, true), [type], false)); });
    };
    var eventTypes = [
        'accommodation',
        'event',
        'work',
        'activity',
        'transport',
        'overarching-event',
    ];
    var eventCounts = eventTypes.reduce(function (acc, type) {
        acc[type] = events.filter(function (e) { return e.type === type; }).length;
        return acc;
    }, {});
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: 'animate-fade-in', children: (0, jsx_runtime_1.jsx)(card_1.Card, { style: { padding: '2rem', textAlign: 'center' }, children: (0, jsx_runtime_1.jsxs)("div", { className: 'animate-pulse', children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                width: '200px',
                                height: '20px',
                                backgroundColor: '#e2e8f0',
                                borderRadius: '4px',
                                margin: '0 auto 1rem',
                            } }), (0, jsx_runtime_1.jsx)("div", { style: {
                                width: '100%',
                                height: '400px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '8px',
                            } })] }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'animate-fade-in', children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { style: {
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: '#0f172a',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Poppins, sans-serif',
                                }, children: "Trip Calendar \u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("p", { style: { color: '#64748b', fontSize: '1rem' }, children: "Your complete trip itinerary at a glance" })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { variant: 'outline', className: 'button-hover button-entrance', onClick: goToToday, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Today"] }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { variant: 'default', className: 'button-hover button-premium button-entrance', onClick: function () { return onAddEvent === null || onAddEvent === void 0 ? void 0 : onAddEvent(selectedDate || new Date()); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Add Event"] })] })] }), (0, jsx_runtime_1.jsx)(card_1.Card, { style: { marginBottom: '1.5rem', padding: '1rem' }, className: 'animate-fade-in-up', children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { style: { width: '16px', height: '16px', color: '#64748b' } }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.875rem', fontWeight: '500', color: '#374151' }, children: "Filter:" })] }), eventTypes.map(function (type) { return ((0, jsx_runtime_1.jsxs)("button", { onClick: function () { return toggleTypeFilter(type); }, style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                border: filteredTypes.includes(type) ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                                backgroundColor: filteredTypes.includes(type) ? '#eff6ff' : 'white',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: filteredTypes.includes(type) ? '#1d4ed8' : '#6b7280',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                            }, className: 'hover:scale-105', children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                    }, className: getEventTypeColor(type) }), type.replace('-', ' '), " (", eventCounts[type], ")"] }, type)); })] }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }, children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: 'animate-fade-in-up stagger-1', children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { style: { padding: '1.5rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'between',
                                    marginBottom: '1.5rem',
                                }, children: [(0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', size: 'icon', className: 'button-hover', onClick: function () { return navigateMonth('prev'); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { style: { width: '20px', height: '20px' } }) }), (0, jsx_runtime_1.jsxs)("h2", { style: {
                                            fontSize: '1.5rem',
                                            fontWeight: '600',
                                            color: '#0f172a',
                                            fontFamily: 'Poppins, sans-serif',
                                        }, children: [MONTHS[currentDate.getMonth()], " ", currentDate.getFullYear()] }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', size: 'icon', className: 'button-hover', onClick: function () { return navigateMonth('next'); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { style: { width: '20px', height: '20px' } }) })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gap: '1px',
                                    marginBottom: '1px',
                                }, children: WEEKDAYS.map(function (day) { return ((0, jsx_runtime_1.jsx)("div", { style: {
                                        padding: '0.75rem',
                                        textAlign: 'center',
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#6b7280',
                                        backgroundColor: '#f8fafc',
                                    }, children: day }, day)); }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gap: '1px',
                                    backgroundColor: '#e2e8f0',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                }, children: calendarDays.map(function (day, index) { return ((0, jsx_runtime_1.jsxs)("div", { onClick: function () { return handleDayClick(day); }, style: {
                                        minHeight: '100px',
                                        padding: '0.5rem',
                                        backgroundColor: day.isCurrentMonth ? 'white' : '#f8fafc',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        border: day.isSelected ? '2px solid #3b82f6' : 'none',
                                    }, className: 'hover:bg-blue-50 transition-colors', children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                                fontSize: '0.875rem',
                                                fontWeight: day.isToday ? '700' : '500',
                                                color: day.isCurrentMonth ? (day.isToday ? '#1d4ed8' : '#374151') : '#9ca3af',
                                                marginBottom: '0.25rem',
                                            }, children: [day.date.getDate(), day.isToday && ((0, jsx_runtime_1.jsx)("div", { style: {
                                                        width: '6px',
                                                        height: '6px',
                                                        backgroundColor: '#3b82f6',
                                                        borderRadius: '50%',
                                                        position: 'absolute',
                                                        top: '0.5rem',
                                                        right: '0.5rem',
                                                    } }))] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '1px' }, children: [day.events.slice(0, 3).map(function (event) { return ((0, jsx_runtime_1.jsxs)("div", { onClick: function (e) {
                                                        e.stopPropagation();
                                                        onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event);
                                                    }, style: {
                                                        fontSize: '0.625rem',
                                                        padding: '1px 4px',
                                                        borderRadius: '2px',
                                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                        color: '#1e40af',
                                                        cursor: 'pointer',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }, className: 'hover:bg-blue-200 transition-colors', title: event.title, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                                                width: '4px',
                                                                height: '4px',
                                                                borderRadius: '50%',
                                                                display: 'inline-block',
                                                                marginRight: '4px',
                                                            }, className: getEventTypeColor(event.type) }), event.title] }, event.id)); }), day.events.length > 3 && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                        fontSize: '0.625rem',
                                                        color: '#6b7280',
                                                        fontWeight: '500',
                                                    }, children: ["+", day.events.length - 3, " more"] }))] })] }, index)); }) })] }) }) }), selectedDate && ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'animate-fade-in', style: { marginTop: '1.5rem' }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { style: { padding: '1.5rem' }, children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: '#0f172a',
                                marginBottom: '1rem',
                            }, children: selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            }) }), ((_b = calendarDays.find(function (day) { return day.date.toDateString() === selectedDate.toDateString(); })) === null || _b === void 0 ? void 0 : _b.events.length) === 0 ? ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', padding: '2rem', color: '#6b7280' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { style: { width: '48px', height: '48px', margin: '0 auto 1rem', color: '#94a3b8' } }), (0, jsx_runtime_1.jsx)("p", { children: "No events scheduled for this day" }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { variant: 'outline', className: 'button-hover', style: { marginTop: '1rem' }, onClick: function () { return onAddEvent === null || onAddEvent === void 0 ? void 0 : onAddEvent(selectedDate); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Add Event"] })] })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, children: (_c = calendarDays
                                .find(function (day) { return day.date.toDateString() === selectedDate.toDateString(); })) === null || _c === void 0 ? void 0 : _c.events.map(function (event) { return ((0, jsx_runtime_1.jsxs)("div", { onClick: function () { return onEventClick === null || onEventClick === void 0 ? void 0 : onEventClick(event); }, style: {
                                    padding: '1rem',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                }, className: 'hover:bg-gray-50 transition-colors card-hover', children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                        }, className: getEventTypeColor(event.type) }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)("h4", { style: {
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    color: '#0f172a',
                                                    marginBottom: '0.25rem',
                                                }, children: event.title }), (0, jsx_runtime_1.jsxs)("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#6b7280',
                                                }, children: [!event.isAllDay && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.25rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { style: { width: '14px', height: '14px' } }), event.startDate.toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })] })), event.location && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.25rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '14px', height: '14px' } }), event.location.name] })), event.attendees && event.attendees.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.25rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { style: { width: '14px', height: '14px' } }), event.attendees.length, " attendee", event.attendees.length > 1 ? 's' : ''] }))] })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            fontWeight: '500',
                                            backgroundColor: event.status === 'confirmed'
                                                ? '#dcfce7'
                                                : event.status === 'planned'
                                                    ? '#fef3c7'
                                                    : '#fee2e2',
                                            color: event.status === 'confirmed'
                                                ? '#166534'
                                                : event.status === 'planned'
                                                    ? '#92400e'
                                                    : '#991b1b',
                                        }, children: event.status })] }, event.id)); }) }))] }) }))] }));
}

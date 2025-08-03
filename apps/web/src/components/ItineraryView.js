"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryView = ItineraryView;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var card_1 = require("./ui/card");
var button_tsx_1 = require("./ui/button/button.tsx");
var itineraryService_1 = require("@/services/itineraryService");
function ItineraryView() {
    var _a = (0, react_1.useState)([]), itineraryDays = _a[0], setItineraryDays = _a[1];
    // const [selectedFilters, setSelectedFilters] = useState<ItemType[]>([])
    var _b = (0, react_1.useState)(itineraryService_1.ItineraryService.getStats()), stats = _b[0], setStats = _b[1];
    (0, react_1.useEffect)(function () {
        var days = itineraryService_1.ItineraryService.getItemsByDay();
        setItineraryDays(days);
        setStats(itineraryService_1.ItineraryService.getStats());
    }, []);
    var getItemTypeColor = function (type) {
        var colors = {
            accommodation: 'bg-orange-500',
            event: 'bg-red-500',
            work: 'bg-blue-500',
            activity: 'bg-green-500',
            transport: 'bg-purple-500',
            'overarching-event': 'bg-yellow-500',
        };
        return colors[type] || 'bg-gray-500';
    };
    var getItemTypeIcon = function (type) {
        switch (type) {
            case 'accommodation':
                return '🏠';
            case 'event':
                return '🎉';
            case 'work':
                return '💼';
            case 'activity':
                return '🎯';
            case 'transport':
                return '✈️';
            case 'overarching-event':
                return '🎪';
            default:
                return '📅';
        }
    };
    var formatDate = function (date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    var formatTime = function (date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return ((0, jsx_runtime_1.jsxs)("main", { className: 'app-content animate-fade-in page-enter', children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { style: {
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: '#0f172a',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Poppins, sans-serif',
                                }, children: "Trip Itinerary" }), (0, jsx_runtime_1.jsxs)("p", { style: { color: '#64748b', fontSize: '1rem' }, children: [stats.totalItems, " items planned \u2022 ", stats.timeSpan.totalDays, " days total"] })] }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Add Item"] })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }, children: Object.entries(stats.byType).map(function (_a) {
                    var type = _a[0], count = _a[1];
                    return ((0, jsx_runtime_1.jsx)(card_1.Card, { style: { padding: '1rem' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.75rem' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "".concat(getItemTypeColor(type)), style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                    }, children: getItemTypeIcon(type) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { style: { fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }, children: count }), (0, jsx_runtime_1.jsx)("p", { style: {
                                                fontSize: '0.875rem',
                                                color: '#64748b',
                                                margin: 0,
                                                textTransform: 'capitalize',
                                            }, children: type.replace('-', ' ') })] })] }) }, type));
                }) }), itineraryDays.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { style: { textAlign: 'center', padding: '3rem' }, children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { style: {
                                width: '48px',
                                height: '48px',
                                color: '#94a3b8',
                                margin: '0 auto 1rem',
                            } }), (0, jsx_runtime_1.jsx)("h3", { style: {
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: '#1e293b',
                                marginBottom: '0.5rem',
                            }, children: "No itinerary items yet" }), (0, jsx_runtime_1.jsx)("p", { style: { color: '#64748b', marginBottom: '1.5rem' }, children: "Start planning your adventure by adding your first item." }), (0, jsx_runtime_1.jsxs)(button_tsx_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { style: { width: '16px', height: '16px', marginRight: '0.5rem' } }), "Add Your First Item"] })] }) })) : ((0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', flexDirection: 'column', gap: '2rem' }, children: itineraryDays.map(function (day) { return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                position: 'sticky',
                                top: '80px',
                                backgroundColor: '#f8fafc',
                                padding: '1rem 0',
                                borderBottom: '2px solid #e2e8f0',
                                marginBottom: '1rem',
                                zIndex: 10,
                            }, children: [(0, jsx_runtime_1.jsx)("h2", { style: {
                                        fontSize: '1.5rem',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                        margin: 0,
                                        fontFamily: 'Poppins, sans-serif',
                                    }, children: formatDate(day.date) }), (0, jsx_runtime_1.jsxs)("p", { style: { color: '#64748b', fontSize: '0.875rem', margin: 0 }, children: [day.items.length, " ", day.items.length === 1 ? 'item' : 'items'] })] }), (0, jsx_runtime_1.jsx)("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                paddingLeft: '1rem',
                            }, children: day.items.map(function (item) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: 'category-card', children: (0, jsx_runtime_1.jsxs)(card_1.CardHeader, { style: { paddingBottom: '12px' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                            }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "".concat(getItemTypeColor(item.type)), style: {
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '6px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '0.9rem',
                                                                flexShrink: 0,
                                                            }, children: getItemTypeIcon(item.type) }), (0, jsx_runtime_1.jsxs)("div", { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { style: { fontSize: '1.125rem', marginBottom: '0.25rem' }, children: item.title }), !item.isAllDay && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.5rem',
                                                                        marginBottom: '0.25rem',
                                                                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { style: { width: '14px', height: '14px', color: '#64748b' } }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '0.875rem', color: '#64748b' }, children: [formatTime(item.startDate), item.endDate && " - ".concat(formatTime(item.endDate))] })] })), item.location && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.5rem',
                                                                        marginBottom: '0.25rem',
                                                                    }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { style: { width: '14px', height: '14px', color: '#64748b' } }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '0.875rem', color: '#64748b' }, children: [item.location.name, ", ", item.location.city] })] })), item.attendees && item.attendees.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { style: { width: '14px', height: '14px', color: '#64748b' } }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.875rem', color: '#64748b' }, children: item.attendees.map(function (p) { return p.name; }).join(', ') })] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                                backgroundColor: item.status === 'confirmed' ? '#dcfce7' : '#f1f5f9',
                                                                color: item.status === 'confirmed' ? '#166534' : '#64748b',
                                                                padding: '2px 8px',
                                                                borderRadius: '12px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500',
                                                                textTransform: 'capitalize',
                                                            }, children: item.status }), (0, jsx_runtime_1.jsx)(button_tsx_1.Button, { variant: 'ghost', style: { padding: '0.25rem' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontal, { style: { width: '16px', height: '16px' } }) })] })] }), item.description && ((0, jsx_runtime_1.jsx)(card_1.CardDescription, { style: { marginTop: '0.5rem' }, children: item.description })), item.tags && item.tags.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginTop: '0.5rem',
                                            }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Tag, { style: { width: '14px', height: '14px', color: '#64748b' } }), (0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }, children: item.tags.map(function (tag) { return ((0, jsx_runtime_1.jsx)("span", { style: {
                                                            backgroundColor: '#f1f5f9',
                                                            color: '#64748b',
                                                            padding: '2px 6px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.75rem',
                                                        }, children: tag }, tag)); }) })] }))] }) }, item.id)); }) })] }, day.date.toISOString())); }) }))] }));
}

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
exports.ItineraryService = void 0;
// Sample data for development
var samplePeople = [
    {
        id: 'p1',
        name: 'Maria Santos',
        relationshipType: 'family',
        contactInfo: { phone: '+55 11 99999-1234' },
        notes: 'Cousin in São Paulo',
    },
    {
        id: 'p2',
        name: 'João Silva',
        relationshipType: 'friend',
        contactInfo: { whatsapp: '+55 21 88888-5678' },
        notes: 'Friend from Rio, knows great restaurants',
    },
    {
        id: 'p3',
        name: 'Ana Costa',
        relationshipType: 'colleague',
        contactInfo: { email: 'ana@company.com' },
        notes: 'Work contact for research interviews',
    },
];
var sampleLocations = [
    {
        id: 'l1',
        name: 'Copacabana Palace Hotel',
        address: 'Av. Atlântica, 1702',
        city: 'Rio de Janeiro',
        state: 'RJ',
        type: 'accommodation',
    },
    {
        id: 'l2',
        name: 'Christ the Redeemer',
        address: 'Parque Nacional da Tijuca',
        city: 'Rio de Janeiro',
        state: 'RJ',
        type: 'tourist-spot',
    },
    {
        id: 'l3',
        name: 'Parents House',
        city: 'São Paulo',
        state: 'SP',
        type: 'accommodation',
    },
];
// Sample itinerary items
var sampleItinerary = [
    // Rio de Janeiro Trip Items
    {
        id: 'rio-arrival',
        title: 'Flight Arrival - Rio de Janeiro',
        description: 'TAM Airlines JJ8070 - Land at Galeão International Airport',
        type: 'transport',
        transportationType: 'flight',
        startDate: new Date('2024-03-15T22:45:00'),
        endDate: new Date('2024-03-15T23:30:00'),
        isAllDay: false,
        location: {
            id: 'galeao-airport',
            name: 'Galeão International Airport',
            city: 'Rio de Janeiro',
            type: 'airport',
        },
        status: 'confirmed',
        priority: 'high',
        tags: ['travel', 'arrival'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'rio-hotel-checkin',
        title: 'Hotel Check-in - Copacabana Palace',
        description: 'Check into Ocean View Suite',
        type: 'accommodation',
        accommodationType: 'hotel',
        startDate: new Date('2024-03-16T15:00:00'),
        endDate: new Date('2024-03-22T12:00:00'),
        isAllDay: false,
        location: sampleLocations[0],
        status: 'confirmed',
        priority: 'high',
        tags: ['accommodation'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'christ-redeemer-visit',
        title: 'Christ the Redeemer Tour',
        description: 'Small group tour with professional guide',
        type: 'activity',
        activityType: 'sightseeing',
        startDate: new Date('2024-03-17T09:00:00'),
        endDate: new Date('2024-03-17T14:00:00'),
        isAllDay: false,
        location: sampleLocations[1],
        status: 'confirmed',
        priority: 'high',
        tags: ['sightseeing', 'tour'],
        cost: { amount: 85, currency: 'USD' },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'copacabana-beach',
        title: 'Copacabana Beach Day',
        description: 'Relax on the famous beach, try local food',
        type: 'activity',
        activityType: 'leisure',
        startDate: new Date('2024-03-18T10:00:00'),
        endDate: new Date('2024-03-18T17:00:00'),
        isAllDay: false,
        location: {
            id: 'copacabana-beach',
            name: 'Copacabana Beach',
            city: 'Rio de Janeiro',
            type: 'beach',
        },
        status: 'planned',
        priority: 'medium',
        tags: ['beach', 'leisure'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'sugarloaf-mountain',
        title: 'Sugarloaf Mountain Cable Car',
        description: 'Panoramic views of Rio at sunset',
        type: 'activity',
        activityType: 'sightseeing',
        startDate: new Date('2024-03-19T16:00:00'),
        endDate: new Date('2024-03-19T19:00:00'),
        isAllDay: false,
        location: {
            id: 'sugarloaf',
            name: 'Sugarloaf Mountain',
            city: 'Rio de Janeiro',
            type: 'attraction',
        },
        status: 'confirmed',
        priority: 'high',
        tags: ['sightseeing', 'sunset'],
        cost: { amount: 75, currency: 'USD' },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'santa-teresa-walk',
        title: 'Santa Teresa Neighborhood Walk',
        description: 'Explore historic neighborhood with colonial architecture',
        type: 'activity',
        activityType: 'walking-tour',
        startDate: new Date('2024-03-20T14:00:00'),
        endDate: new Date('2024-03-20T17:00:00'),
        isAllDay: false,
        location: {
            id: 'santa-teresa',
            name: 'Santa Teresa',
            city: 'Rio de Janeiro',
            type: 'neighborhood',
        },
        status: 'planned',
        priority: 'medium',
        tags: ['culture', 'walking', 'historic'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'rio-departure',
        title: 'Departure Flight',
        description: 'Return flight to home',
        type: 'transport',
        transportationType: 'flight',
        startDate: new Date('2024-03-22T15:30:00'),
        endDate: new Date('2024-03-22T16:30:00'),
        isAllDay: false,
        location: {
            id: 'galeao-airport',
            name: 'Galeão International Airport',
            city: 'Rio de Janeiro',
            type: 'airport',
        },
        status: 'confirmed',
        priority: 'high',
        tags: ['travel', 'departure'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // Some additional items for different dates to populate the calendar
    {
        id: 'tokyo-arrival',
        title: 'Arrive in Tokyo',
        description: 'Business trip arrival at Narita Airport',
        type: 'transport',
        transportationType: 'flight',
        startDate: new Date('2024-02-10T18:30:00'),
        endDate: new Date('2024-02-10T19:30:00'),
        isAllDay: false,
        location: {
            id: 'narita-airport',
            name: 'Narita International Airport',
            city: 'Tokyo',
            type: 'airport',
        },
        status: 'confirmed',
        priority: 'high',
        tags: ['business', 'travel'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'tokyo-meeting',
        title: 'Business Meeting - Shibuya Office',
        description: 'Quarterly review meeting with Japan team',
        type: 'work',
        workType: 'meeting',
        startDate: new Date('2024-02-12T10:00:00'),
        endDate: new Date('2024-02-12T16:00:00'),
        isAllDay: false,
        location: {
            id: 'shibuya-office',
            name: 'Shibuya Business Tower',
            city: 'Tokyo',
            type: 'office',
        },
        status: 'confirmed',
        priority: 'high',
        tags: ['business', 'meeting'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // London trip items
    {
        id: 'london-planning',
        title: 'Plan London Itinerary',
        description: 'Research attractions and book tickets',
        type: 'activity',
        activityType: 'planning',
        startDate: new Date('2024-06-15T10:00:00'),
        endDate: new Date('2024-06-15T12:00:00'),
        isAllDay: false,
        status: 'planned',
        priority: 'medium',
        tags: ['planning', 'research'],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
var ItineraryService = /** @class */ (function () {
    function ItineraryService() {
    }
    // CRUD Operations for Items
    ItineraryService.getAllItems = function () {
        return __spreadArray([], this.items, true).sort(function (a, b) { return a.startDate.getTime() - b.startDate.getTime(); });
    };
    ItineraryService.getItemById = function (id) {
        return this.items.find(function (item) { return item.id === id; }) || null;
    };
    ItineraryService.addItem = function (item) {
        this.items.push(__assign(__assign({}, item), { createdAt: new Date(), updatedAt: new Date() }));
    };
    ItineraryService.updateItem = function (id, updates) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index === -1)
            return false;
        // Type assertion to ensure TypeScript understands the update is valid
        this.items[index] = __assign(__assign(__assign({}, this.items[index]), updates), { updatedAt: new Date() });
        return true;
    };
    ItineraryService.deleteItem = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    };
    // Filtering and Search
    ItineraryService.getFilteredItems = function (filters) {
        var filtered = this.getAllItems();
        if (filters.types && filters.types.length > 0) {
            filtered = filtered.filter(function (item) { return filters.types.includes(item.type); });
        }
        if (filters.dateRange) {
            filtered = filtered.filter(function (item) {
                return item.startDate >= filters.dateRange.start && item.startDate <= filters.dateRange.end;
            });
        }
        if (filters.location) {
            filtered = filtered.filter(function (item) {
                var _a, _b;
                return ((_a = item.location) === null || _a === void 0 ? void 0 : _a.city.toLowerCase().includes(filters.location.toLowerCase())) ||
                    ((_b = item.location) === null || _b === void 0 ? void 0 : _b.name.toLowerCase().includes(filters.location.toLowerCase()));
            });
        }
        if (filters.attendees && filters.attendees.length > 0) {
            filtered = filtered.filter(function (item) { var _a; return (_a = item.attendees) === null || _a === void 0 ? void 0 : _a.some(function (attendee) { return filters.attendees.includes(attendee.id); }); });
        }
        if (filters.status && filters.status.length > 0) {
            filtered = filtered.filter(function (item) { return filters.status.includes(item.status); });
        }
        if (filters.tags && filters.tags.length > 0) {
            filtered = filtered.filter(function (item) { var _a; return (_a = item.tags) === null || _a === void 0 ? void 0 : _a.some(function (tag) { return filters.tags.includes(tag); }); });
        }
        return filtered;
    };
    // Get items organized by day
    ItineraryService.getItemsByDay = function (startDate, endDate) {
        var items = startDate && endDate
            ? this.getFilteredItems({ dateRange: { start: startDate, end: endDate } })
            : this.getAllItems();
        var itemsByDate = new Map();
        items.forEach(function (item) {
            var dateKey = item.startDate.toISOString().split('T')[0];
            if (!itemsByDate.has(dateKey)) {
                itemsByDate.set(dateKey, []);
            }
            itemsByDate.get(dateKey).push(item);
        });
        return Array.from(itemsByDate.entries())
            .map(function (_a) {
            var dateStr = _a[0], dayItems = _a[1];
            return ({
                date: new Date(dateStr),
                items: dayItems.sort(function (a, b) { return a.startDate.getTime() - b.startDate.getTime(); }),
            });
        })
            .sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
    };
    // Statistics
    ItineraryService.getStats = function () {
        var items = this.getAllItems();
        if (items.length === 0) {
            return {
                totalItems: 0,
                byType: {},
                byStatus: {},
                totalBudget: 0,
                timeSpan: {
                    start: new Date(),
                    end: new Date(),
                    totalDays: 0,
                },
            };
        }
        var byType = items.reduce(function (acc, item) {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        }, {});
        var byStatus = items.reduce(function (acc, item) {
            acc[item.status] = (acc[item.status] || 0) + 1;
            return acc;
        }, {});
        var dates = items.map(function (item) { return item.startDate; }).sort(function (a, b) { return a.getTime() - b.getTime(); });
        var start = dates[0];
        var end = dates[dates.length - 1];
        var totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        // Calculate total budget (simplified - would need proper cost tracking)
        var totalBudget = items.reduce(function (sum, item) {
            if ('cost' in item && item.cost) {
                return sum + item.cost.amount;
            }
            return sum;
        }, 0);
        return {
            totalItems: items.length,
            byType: byType,
            byStatus: byStatus,
            totalBudget: totalBudget,
            timeSpan: { start: start, end: end, totalDays: totalDays },
        };
    };
    // People management
    ItineraryService.getAllPeople = function () {
        return __spreadArray([], this.people, true);
    };
    ItineraryService.addPerson = function (person) {
        this.people.push(person);
    };
    // Locations management
    ItineraryService.getAllLocations = function () {
        return __spreadArray([], this.locations, true);
    };
    ItineraryService.addLocation = function (location) {
        this.locations.push(location);
    };
    // Utility functions
    ItineraryService.getOverarchingEvents = function () {
        return this.items.filter(function (item) { return item.type === 'overarching-event'; });
    };
    ItineraryService.getSubEventsForOverarching = function (parentId) {
        var _this = this;
        var parent = this.getItemById(parentId);
        if (!parent || parent.type !== 'overarching-event')
            return [];
        return parent.subEvents.map(function (id) { return _this.getItemById(id); }).filter(Boolean);
    };
    ItineraryService.items = __spreadArray([], sampleItinerary, true);
    ItineraryService.people = __spreadArray([], samplePeople, true);
    ItineraryService.locations = __spreadArray([], sampleLocations, true);
    return ItineraryService;
}());
exports.ItineraryService = ItineraryService;

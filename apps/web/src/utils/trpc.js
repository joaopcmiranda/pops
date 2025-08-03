"use strict";
// Mock tRPC implementation for development
// This provides a compatible interface while the full tRPC setup is being configured
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpcClient = exports.trpc = void 0;
exports.trpc = {
    health: {
        check: {
            useQuery: function () { return ({
                data: { status: 'healthy', timestamp: new Date().toISOString() },
                isLoading: false,
                error: null,
            }); },
        },
    },
    trip: {
        create: {
            useMutation: function () { return ({
                mutate: function (data) {
                    console.log('Mock trip create:', data);
                },
                isLoading: false,
                error: null,
            }); },
        },
        list: {
            useQuery: function () { return ({
                data: [],
                isLoading: false,
                error: null,
            }); },
        },
    },
    Provider: function (_a) {
        var children = _a.children;
        return children;
    },
};
exports.trpcClient = {};

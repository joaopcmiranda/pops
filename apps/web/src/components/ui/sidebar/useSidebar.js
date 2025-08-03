"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSidebar = useSidebar;
var React = require("react");
var context_tsx_1 = require("@/components/ui/sidebar/context.tsx");
function useSidebar() {
    var context = React.useContext(context_tsx_1.SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }
    return context;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarContext = void 0;
exports.useSidebar = useSidebar;
var React = require("react");
exports.SidebarContext = React.createContext(null);
function useSidebar() {
    var context = React.useContext(exports.SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }
    return context;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIDEBAR_KEYBOARD_SHORTCUT = exports.SIDEBAR_WIDTH_ICON = exports.SIDEBAR_WIDTH = exports.SIDEBAR_COOKIE_MAX_AGE = exports.SIDEBAR_COOKIE_NAME = exports.sidebarMenuButtonVariants = exports.SIDEBAR_WIDTH_MOBILE = void 0;
var class_variance_authority_1 = require("class-variance-authority");
exports.SIDEBAR_WIDTH_MOBILE = '18rem';
exports.sidebarMenuButtonVariants = (0, class_variance_authority_1.cva)('peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0', {
    variants: {
        variant: {
            default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            outline: 'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
        },
        size: {
            default: 'h-8 text-sm',
            sm: 'h-7 text-xs',
            lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
exports.SIDEBAR_COOKIE_NAME = 'sidebar_state';
exports.SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
exports.SIDEBAR_WIDTH = '16rem';
exports.SIDEBAR_WIDTH_ICON = '3rem';
exports.SIDEBAR_KEYBOARD_SHORTCUT = 'b';

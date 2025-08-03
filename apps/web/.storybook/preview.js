"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the main CSS file which includes Tailwind 4
require("../src/index.css");
// Import story-specific fonts
require("../src/styles/story-fonts.css");
var preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#1f2937',
                },
                {
                    name: 'gray',
                    value: '#f8fafc',
                },
            ],
        },
    },
    tags: ['autodocs'],
};
exports.default = preview;

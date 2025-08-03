// Import the main CSS file which includes Tailwind 4
import '../src/index.css'
// Import story-specific fonts
import '../src/styles/story-fonts.css'

const preview = {
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
}

export default preview

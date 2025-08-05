import { createRequire } from 'node:module'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path, { dirname, join } from 'path'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    })
  },
}

export default config

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

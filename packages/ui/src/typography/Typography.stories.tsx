import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading, Text, Label } from './Typography'

const meta = {
  title: 'Typography/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

export const Headings: StoryObj = {
  render: () => (
    <div className='space-y-4'>
      <Heading variant='h1'>Heading 1</Heading>
      <Heading variant='h2'>Heading 2</Heading>
      <Heading variant='h3'>Heading 3</Heading>
      <Heading variant='h4'>Heading 4</Heading>
      <Heading variant='h5'>Heading 5</Heading>
      <Heading variant='h6'>Heading 6</Heading>
    </div>
  ),
}

export const TextVariants: StoryObj = {
  render: () => (
    <div className='space-y-4'>
      <Text variant='lead'>This is a lead paragraph. It stands out from regular text.</Text>
      <Text variant='large'>This is large text, slightly bigger than body text.</Text>
      <Text variant='body'>
        This is body text. It's the default text style used throughout the application.
      </Text>
      <Text variant='small'>
        This is small text, useful for captions and secondary information.
      </Text>
      <Text variant='muted'>This is muted text, which appears with reduced emphasis.</Text>
    </div>
  ),
}

export const Labels: StoryObj = {
  render: () => (
    <div className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email address</Label>
        <input
          type='email'
          id='email'
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
          placeholder='you@example.com'
        />
      </div>
      <div>
        <Label htmlFor='disabled' className='peer-disabled:opacity-70'>
          Disabled label
        </Label>
        <input
          type='text'
          id='disabled'
          disabled
          className='peer mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
          placeholder='Disabled input'
        />
      </div>
    </div>
  ),
}

export const MixedUsage: StoryObj = {
  render: () => (
    <article className='prose max-w-none space-y-6'>
      <Heading variant='h1'>Welcome to Pops UI</Heading>
      <Text variant='lead'>
        A comprehensive component library built with React, TypeScript, and Tailwind CSS.
      </Text>

      <Heading variant='h2'>Getting Started</Heading>
      <Text>
        Pops UI provides a set of accessible, customizable components that follow modern design
        principles. Each component is built with flexibility in mind.
      </Text>

      <Heading variant='h3'>Installation</Heading>
      <Text variant='muted'>Install the package using your preferred package manager:</Text>

      <div className='rounded-md bg-gray-100 p-4'>
        <code>pnpm add @pops/ui</code>
      </div>

      <Heading variant='h3'>Features</Heading>
      <ul className='space-y-2'>
        <li>
          <Text as='span' variant='small'>
            ✓ Fully typed with TypeScript
          </Text>
        </li>
        <li>
          <Text as='span' variant='small'>
            ✓ Accessible by default
          </Text>
        </li>
        <li>
          <Text as='span' variant='small'>
            ✓ Customizable with Tailwind CSS
          </Text>
        </li>
      </ul>
    </article>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { ScrollArea } from '../scroll-area'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from './Sidebar'
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User,
  Bell,
  FileText,
  Folder,
  Plus,
  ChevronRight,
  Star,
  Archive,
  Trash2,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
} from 'lucide-react'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className='h-screen'>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic sidebar with navigation
 */
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className='flex items-center gap-2 px-2 py-2'>
            <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold'>
              A
            </div>
            <span className='font-semibold'>Acme Corp</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Home className='w-4 h-4' />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox className='w-4 h-4' />
                    <span>Inbox</span>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar className='w-4 h-4' />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search className='w-4 h-4' />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className='w-4 h-4' />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className='w-4 h-4' />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
          <h1 className='text-lg font-semibold'>Dashboard</h1>
        </header>
        <div className='flex-1 p-4'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-2xl font-bold mb-4'>Welcome to your dashboard</h2>
            <p className='text-muted-foreground'>
              This is the main content area. Use the sidebar trigger to toggle the sidebar.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

/**
 * Sidebar with collapsible groups and sub-menus
 */
export const WithSubMenus: Story = {
  render: () => {
    const [openProjects, setOpenProjects] = useState(false)

    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className='flex items-center gap-2 px-2 py-2'>
              <div className='w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold'>
                PM
              </div>
              <span className='font-semibold'>Project Manager</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home className='w-4 h-4' />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BarChart3 className='w-4 h-4' />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setOpenProjects(!openProjects)}
                      className='justify-between'
                    >
                      <div className='flex items-center gap-2'>
                        <Folder className='w-4 h-4' />
                        <span>My Projects</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openProjects ? 'rotate-90' : ''
                        }`}
                      />
                    </SidebarMenuButton>
                    {openProjects && (
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton isActive>Website Redesign</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>Mobile App</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>API Integration</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Plus className='w-4 h-4' />
                      <span>New Project</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Teams</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className='w-4 h-4' />
                      <span>Engineering</span>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className='w-4 h-4' />
                      <span>Design</span>
                      <SidebarMenuBadge>5</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className='w-4 h-4' />
                      <span>Marketing</span>
                      <SidebarMenuBadge>8</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className='w-4 h-4' />
                  <span>John Doe</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
            <SidebarTrigger />
            <h1 className='text-lg font-semibold'>Project Dashboard</h1>
          </header>
          <div className='flex-1 p-4'>
            <div className='mx-auto max-w-6xl'>
              <h2 className='text-2xl font-bold mb-4'>Project Overview</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='p-6 border rounded-lg'>
                  <h3 className='font-semibold mb-2'>Active Projects</h3>
                  <p className='text-3xl font-bold text-primary'>12</p>
                </div>
                <div className='p-6 border rounded-lg'>
                  <h3 className='font-semibold mb-2'>Team Members</h3>
                  <p className='text-3xl font-bold text-primary'>25</p>
                </div>
                <div className='p-6 border rounded-lg'>
                  <h3 className='font-semibold mb-2'>Completed Tasks</h3>
                  <p className='text-3xl font-bold text-primary'>148</p>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  },
}

/**
 * Email client sidebar
 */
export const EmailClient: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className='px-2 py-2'>
            <Button className='w-full justify-start gap-2'>
              <Plus className='w-4 h-4' />
              Compose
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Inbox className='w-4 h-4' />
                    <span>Inbox</span>
                    <SidebarMenuBadge>42</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Star className='w-4 h-4' />
                    <span>Starred</span>
                    <SidebarMenuBadge>7</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FileText className='w-4 h-4' />
                    <span>Drafts</span>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Archive className='w-4 h-4' />
                    <span>Archive</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Trash2 className='w-4 h-4' />
                    <span>Trash</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Labels</SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus className='w-4 h-4' />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size='sm'>
                    <div className='w-2 h-2 rounded-full bg-red-500' />
                    <span>Work</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size='sm'>
                    <div className='w-2 h-2 rounded-full bg-blue-500' />
                    <span>Personal</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size='sm'>
                    <div className='w-2 h-2 rounded-full bg-green-500' />
                    <span>Important</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
          <Input placeholder='Search mail...' className='max-w-sm' />
        </header>
        <div className='flex-1 p-4'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='text-xl font-semibold mb-4'>Inbox</h2>
            <div className='space-y-2'>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className='p-4 border rounded-lg hover:bg-muted/50 cursor-pointer'>
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='font-medium'>Email Subject {i + 1}</h3>
                    <span className='text-sm text-muted-foreground'>
                      {i < 3 ? 'Today' : i < 7 ? 'Yesterday' : '2 days ago'}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    Preview of the email content for email {i + 1}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

/**
 * Different sidebar variants
 */
export const Variants: Story = {
  render: () => {
    const [currentVariant, setCurrentVariant] = useState<'sidebar' | 'floating' | 'inset'>(
      'sidebar'
    )

    return (
      <div className='space-y-4'>
        <div className='flex gap-2 p-4 border-b'>
          <Button
            variant={currentVariant === 'sidebar' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCurrentVariant('sidebar')}
          >
            Sidebar
          </Button>
          <Button
            variant={currentVariant === 'floating' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCurrentVariant('floating')}
          >
            Floating
          </Button>
          <Button
            variant={currentVariant === 'inset' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCurrentVariant('inset')}
          >
            Inset
          </Button>
        </div>

        <SidebarProvider>
          <Sidebar variant={currentVariant}>
            <SidebarHeader>
              <div className='flex items-center gap-2 px-2 py-2'>
                <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold'>
                  V
                </div>
                <span className='font-semibold'>Variant: {currentVariant}</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <Home className='w-4 h-4' />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Settings className='w-4 h-4' />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
              <SidebarTrigger />
              <h1 className='text-lg font-semibold'>Variant Demo: {currentVariant}</h1>
            </header>
            <div className='flex-1 p-4'>
              <div className='mx-auto max-w-6xl'>
                <h2 className='text-2xl font-bold mb-4'>Sidebar Variant: {currentVariant}</h2>
                <div className='space-y-4'>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Sidebar Variant</h3>
                    <p className='text-sm text-muted-foreground'>
                      Standard sidebar that takes up full height and is attached to the edge.
                    </p>
                  </div>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Floating Variant</h3>
                    <p className='text-sm text-muted-foreground'>
                      Floating sidebar with rounded corners and shadow, inset from the edges.
                    </p>
                  </div>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Inset Variant</h3>
                    <p className='text-sm text-muted-foreground'>
                      Inset sidebar with rounded corners that affects the main content layout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  },
}

/**
 * Sidebar with loading states
 */
export const LoadingState: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className='flex items-center gap-2 px-2 py-2'>
            <div className='w-8 h-8 rounded-lg bg-muted animate-pulse' />
            <div className='h-4 w-24 bg-muted rounded animate-pulse' />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className='h-4 w-16 bg-muted rounded animate-pulse mb-2 mx-2' />
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <div className='h-4 w-20 bg-muted rounded animate-pulse mb-2 mx-2' />
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
          <h1 className='text-lg font-semibold'>Loading State</h1>
        </header>
        <div className='flex-1 p-4'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-2xl font-bold mb-4'>Sidebar Loading State</h2>
            <p className='text-muted-foreground'>
              The sidebar shows skeleton placeholders while loading data. This provides better UX
              than showing empty states or spinners.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

/**
 * Different collapsible modes
 */
export const CollapsibleModes: Story = {
  render: () => {
    const [collapsible, setCollapsible] = useState<'offcanvas' | 'icon' | 'none'>('offcanvas')

    return (
      <div className='space-y-4'>
        <div className='flex gap-2 p-4 border-b'>
          <Button
            variant={collapsible === 'offcanvas' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCollapsible('offcanvas')}
          >
            Offcanvas
          </Button>
          <Button
            variant={collapsible === 'icon' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCollapsible('icon')}
          >
            Icon
          </Button>
          <Button
            variant={collapsible === 'none' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setCollapsible('none')}
          >
            None
          </Button>
        </div>

        <SidebarProvider>
          <Sidebar collapsible={collapsible}>
            <SidebarHeader>
              <div className='flex items-center gap-2 px-2 py-2'>
                <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold'>
                  C
                </div>
                <span className='font-semibold'>Collapsible</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip='Home'>
                        <Home className='w-4 h-4' />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip='Inbox'>
                        <Inbox className='w-4 h-4' />
                        <span>Inbox</span>
                        <SidebarMenuBadge>5</SidebarMenuBadge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip='Calendar'>
                        <Calendar className='w-4 h-4' />
                        <span>Calendar</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip='Settings'>
                        <Settings className='w-4 h-4' />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip='Profile'>
                    <User className='w-4 h-4' />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
              <SidebarTrigger />
              <h1 className='text-lg font-semibold'>Collapsible Mode: {collapsible}</h1>
            </header>
            <div className='flex-1 p-4'>
              <div className='mx-auto max-w-6xl'>
                <h2 className='text-2xl font-bold mb-4'>Collapsible Modes</h2>
                <div className='space-y-4'>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Offcanvas Mode</h3>
                    <p className='text-sm text-muted-foreground'>
                      Sidebar slides off-screen when collapsed. Main content takes full width.
                    </p>
                  </div>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Icon Mode</h3>
                    <p className='text-sm text-muted-foreground'>
                      Sidebar collapses to show only icons. Tooltips appear on hover.
                    </p>
                  </div>
                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h3 className='font-semibold mb-2'>None Mode</h3>
                    <p className='text-sm text-muted-foreground'>
                      Sidebar cannot be collapsed and remains fixed in position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    )
  },
}

/**
 * Real-world application layout
 */
export const ApplicationLayout: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className='flex items-center gap-2 px-2 py-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-bold'>
              PM
            </div>
            <div className='flex-1 min-w-0'>
              <div className='font-semibold truncate'>Project Pro</div>
              <div className='text-xs text-muted-foreground truncate'>v2.1.0</div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className='flex-1'>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Home className='w-4 h-4' />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Inbox className='w-4 h-4' />
                      <span>Tasks</span>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Calendar className='w-4 h-4' />
                      <span>Calendar</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className='w-4 h-4' />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupAction>
                <Plus className='w-4 h-4' />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className='w-2 h-2 rounded-full bg-blue-500' />
                      <span>Website Redesign</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className='w-2 h-2 rounded-full bg-green-500' />
                      <span>Mobile App</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <div className='w-2 h-2 rounded-full bg-yellow-500' />
                      <span>API Development</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BarChart3 className='w-4 h-4' />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className='w-4 h-4' />
                      <span>Documents</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className='w-4 h-4' />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <CreditCard className='w-4 h-4' />
                      <span>Billing</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className='h-auto p-2'>
                <div className='flex items-center gap-2 flex-1 min-w-0'>
                  <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium'>
                    JD
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='text-sm font-medium truncate'>John Doe</div>
                    <div className='text-xs text-muted-foreground truncate'>john@company.com</div>
                  </div>
                </div>
                <LogOut className='w-4 h-4 opacity-60' />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <SidebarTrigger />
          <div className='flex items-center gap-2 flex-1'>
            <h1 className='text-lg font-semibold'>Dashboard</h1>
            <div className='ml-auto flex items-center gap-2'>
              <Input placeholder='Search...' className='w-64' />
              <Button variant='ghost' size='icon'>
                <Bell className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </header>

        <div className='flex-1 p-6 space-y-6'>
          <div>
            <h2 className='text-3xl font-bold mb-2'>Good morning, John! 👋</h2>
            <p className='text-muted-foreground'>
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='p-6 border rounded-lg'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold'>Active Tasks</h3>
                <Inbox className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='text-3xl font-bold mb-2'>12</div>
              <p className='text-sm text-muted-foreground'>3 due today</p>
            </div>

            <div className='p-6 border rounded-lg'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold'>Team Members</h3>
                <Users className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='text-3xl font-bold mb-2'>8</div>
              <p className='text-sm text-muted-foreground'>2 online now</p>
            </div>

            <div className='p-6 border rounded-lg'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold'>Projects</h3>
                <Folder className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='text-3xl font-bold mb-2'>3</div>
              <p className='text-sm text-muted-foreground'>1 in progress</p>
            </div>

            <div className='p-6 border rounded-lg'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='font-semibold'>Completed</h3>
                <BarChart3 className='w-5 h-5 text-muted-foreground' />
              </div>
              <div className='text-3xl font-bold mb-2'>24</div>
              <p className='text-sm text-muted-foreground'>This month</p>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='p-6 border rounded-lg'>
              <h3 className='font-semibold mb-4'>Recent Activity</h3>
              <div className='space-y-4'>
                {[
                  'John completed "Design System Updates"',
                  'Sarah added 3 new tasks to "Mobile App"',
                  'Mike commented on "API Development"',
                  'Lisa updated project timeline',
                ].map((activity, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <div className='w-2 h-2 rounded-full bg-blue-500 mt-2' />
                    <div className='flex-1'>
                      <p className='text-sm'>{activity}</p>
                      <p className='text-xs text-muted-foreground'>
                        {i < 2 ? 'Just now' : `${i + 1} hours ago`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='p-6 border rounded-lg'>
              <h3 className='font-semibold mb-4'>Upcoming Deadlines</h3>
              <div className='space-y-3'>
                {[
                  { task: 'Website Redesign Review', date: 'Today', urgent: true },
                  { task: 'Mobile App Testing', date: 'Tomorrow', urgent: false },
                  { task: 'API Documentation', date: 'Friday', urgent: false },
                  { task: 'Client Presentation', date: 'Next Week', urgent: false },
                ].map((item, i) => (
                  <div key={i} className='flex items-center justify-between p-3 border rounded'>
                    <div>
                      <p className='text-sm font-medium'>{item.task}</p>
                      <p className='text-xs text-muted-foreground'>Due {item.date}</p>
                    </div>
                    {item.urgent && <div className='w-2 h-2 rounded-full bg-red-500' />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}

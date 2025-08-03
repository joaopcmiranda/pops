import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, useEffect } from 'react'
import { Progress } from './progress'
import { Button } from './button/button'
import { ComponentStory } from '../StoryWrapper'
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react'
import '../../styles/story-fonts.css'

const meta: Meta<typeof Progress> = {
  title: 'Components/UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ComponentStory
      title='Basic Progress Bar'
      description='Simple progress bars with different completion values'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-md mx-auto'>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>0% Complete</span>
            <span>0/100</span>
          </div>
          <Progress value={0} className='h-2' />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>25% Complete</span>
            <span>25/100</span>
          </div>
          <Progress value={25} className='h-2' />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>50% Complete</span>
            <span>50/100</span>
          </div>
          <Progress value={50} className='h-2' />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>75% Complete</span>
            <span>75/100</span>
          </div>
          <Progress value={75} className='h-2' />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span>100% Complete</span>
            <span>100/100</span>
          </div>
          <Progress value={100} className='h-2' />
        </div>
      </div>
    </ComponentStory>
  ),
}
export const DifferentSizes: Story = {
  render: () => (
    <ComponentStory
      title='Progress Bar Sizes'
      description='Progress bars with different heights and styling'
      background='gradient-green'
    >
      <div className='space-y-6 max-w-md mx-auto'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Extra Small (1px)</label>
          <Progress value={60} className='h-px' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Small (2px) - Default</label>
          <Progress value={60} className='h-0.5' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Medium (4px)</label>
          <Progress value={60} className='h-1' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Large (8px)</label>
          <Progress value={60} className='h-2' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Extra Large (12px)</label>
          <Progress value={60} className='h-3' />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Chunky (16px)</label>
          <Progress value={60} className='h-4' />
        </div>
      </div>
    </ComponentStory>
  ),
}
export const TaskProgress: Story = {
  render: () => (
    <ComponentStory
      title='Task Progress Indicators'
      description='Real-world examples of progress bars for different tasks'
      background='gradient-purple'
    >
      <div className='space-y-6 max-w-lg mx-auto'>
        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Profile Setup</h4>
              <span className='text-sm text-muted-foreground'>3/5 completed</span>
            </div>
            <Progress value={60} className='h-2' />
            <div className='text-xs text-muted-foreground'>
              Complete your profile to unlock all features
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Trip Planning</h4>
              <span className='text-sm text-muted-foreground'>7/10 steps</span>
            </div>
            <Progress value={70} className='h-2' />
            <div className='text-xs text-muted-foreground'>
              Almost done! Add accommodation details to finish
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Document Upload</h4>
              <span className='text-sm text-muted-foreground'>2/3 files</span>
            </div>
            <Progress value={67} className='h-2' />
            <div className='text-xs text-muted-foreground'>
              Upload your travel insurance document
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='font-medium'>Itinerary Review</h4>
              <span className='text-sm text-green-600 font-medium'>Complete!</span>
            </div>
            <Progress value={100} className='h-2' />
            <div className='text-xs text-muted-foreground'>
              Your itinerary is ready for your trip
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}
export const FileUpload: Story = {
  render: () => (
    <ComponentStory
      title='File Upload Progress'
      description='Progress bars showing file upload status with different states'
      background='gradient-orange'
    >
      <div className='space-y-4 max-w-lg mx-auto'>
        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>vacation-photos.zip</span>
              <span className='text-muted-foreground'>45.2 MB</span>
            </div>
            <Progress value={23} className='h-1.5' />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Uploading... 23%</span>
              <span>2.3 MB/s</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>flight-tickets.pdf</span>
              <span className='text-muted-foreground'>1.8 MB</span>
            </div>
            <Progress value={78} className='h-1.5' />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Uploading... 78%</span>
              <span>1.9 MB/s</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>hotel-confirmation.pdf</span>
              <span className='text-green-600'>✓ Complete</span>
            </div>
            <Progress value={100} className='h-1.5' />
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Upload complete</span>
              <span>856 KB</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-4 rounded-lg border border-red-200'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='font-medium'>passport-scan.jpg</span>
              <span className='text-red-600'>✗ Failed</span>
            </div>
            <Progress value={15} className='h-1.5 bg-red-100' />
            <div className='flex justify-between text-xs text-red-600'>
              <span>Upload failed - file too large</span>
              <span>12.4 MB</span>
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

const AnimatedProgressComponent = () => {
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && progress < 100) {
      timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100))
      }, 500)
    } else if (progress >= 100) {
      setIsRunning(false)
    }

    return () => clearTimeout(timer)
  }, [progress, isRunning])

  const handleStart = () => {
    setIsRunning(true)
    if (progress >= 100) {
      setProgress(0)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setProgress(0)
    setIsRunning(false)
  }

  return (
    <ComponentStory
      title='Animated Progress Bar'
      description='Interactive progress bar with start, pause, and reset controls'
      background='gradient-pink'
    >
      <div className='space-y-6 max-w-md mx-auto'>
        <div className='bg-white p-6 rounded-lg border'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h4 className='font-medium'>Data Processing</h4>
              <span className='text-sm font-mono'>{Math.round(progress)}%</span>
            </div>

            <Progress value={progress} className='h-3' />

            <div className='text-sm text-muted-foreground text-center'>
              {progress === 0 && 'Ready to start processing'}
              {progress > 0 && progress < 100 && isRunning && 'Processing data...'}
              {progress > 0 && progress < 100 && !isRunning && 'Processing paused'}
              {progress >= 100 && 'Processing complete!'}
            </div>

            <div className='flex justify-center gap-2'>
              <Button
                size='sm'
                onClick={handleStart}
                disabled={isRunning}
                variant={progress >= 100 ? 'default' : 'outline'}
              >
                <PlayIcon className='h-4 w-4 mr-1' />
                {progress >= 100 ? 'Restart' : 'Start'}
              </Button>

              <Button size='sm' variant='outline' onClick={handlePause} disabled={!isRunning}>
                <PauseIcon className='h-4 w-4 mr-1' />
                Pause
              </Button>

              <Button size='sm' variant='outline' onClick={handleReset} disabled={progress === 0}>
                <RotateCcwIcon className='h-4 w-4 mr-1' />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className='bg-blue-50 p-4 rounded-lg border border-blue-100'>
          <h4 className='font-semibold text-blue-900 mb-2'>Interactive Features:</h4>
          <ul className='text-sm text-blue-800 space-y-1'>
            <li>• Click Start to begin animated progress</li>
            <li>• Use Pause to temporarily stop the animation</li>
            <li>• Reset button clears progress back to 0%</li>
            <li>• Progress updates with random increments</li>
          </ul>
        </div>
      </div>
    </ComponentStory>
  )
}

export const AnimatedProgress: Story = {
  render: () => <AnimatedProgressComponent />,
}

export const SkillLevels: Story = {
  render: () => (
    <ComponentStory
      title='Skill Level Indicators'
      description='Using progress bars to show proficiency levels and ratings'
      background='gradient-blue'
    >
      <div className='space-y-6 max-w-lg mx-auto'>
        <div className='bg-white p-6 rounded-lg border'>
          <h4 className='font-medium mb-4'>Technical Skills</h4>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>React.js</span>
                <span className='text-muted-foreground'>Expert</span>
              </div>
              <Progress value={90} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>TypeScript</span>
                <span className='text-muted-foreground'>Advanced</span>
              </div>
              <Progress value={75} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Node.js</span>
                <span className='text-muted-foreground'>Intermediate</span>
              </div>
              <Progress value={60} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>GraphQL</span>
                <span className='text-muted-foreground'>Beginner</span>
              </div>
              <Progress value={30} className='h-2' />
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg border'>
          <h4 className='font-medium mb-4'>Project Health</h4>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Code Coverage</span>
                <span className='text-green-600 font-medium'>87%</span>
              </div>
              <Progress value={87} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Performance Score</span>
                <span className='text-green-600 font-medium'>94%</span>
              </div>
              <Progress value={94} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Security Audit</span>
                <span className='text-yellow-600 font-medium'>68%</span>
              </div>
              <Progress value={68} className='h-2' />
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between text-sm'>
                <span>Documentation</span>
                <span className='text-red-600 font-medium'>45%</span>
              </div>
              <Progress value={45} className='h-2' />
            </div>
          </div>
        </div>
      </div>
    </ComponentStory>
  ),
}

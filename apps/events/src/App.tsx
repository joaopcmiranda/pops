import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Calendar, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Textarea } from '@pops/ui'

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto p-4 dark:bg-background dark:text-foreground">
      <h1 className="text-3xl font-bold mb-6">Event Manager</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Event Creation */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input placeholder="Event Name" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Event Description" />
                  <Button>Create Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Team Conference</span>
                <Badge variant="secondary">Aug 15, 2025</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Family Reunion</span>
                <Badge variant="outline">Sep 5, 2025</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
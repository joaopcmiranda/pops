import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger, Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Textarea } from '@pops/ui'

const ContentManagerApp: React.FC = () => {
  return (
    <div className="container mx-auto p-4 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">POps Content Manager</h1>
      
      <Tabs defaultValue="articles">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Content Library
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Article</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Article</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input placeholder="Article Title" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Article Content" />
                        <Button>Save Article</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Intro to React 19</span>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Travel Insights 2025</span>
                    <Badge variant="outline">Published</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardContent>
              <p>Notes management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardContent>
              <p>Document management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ContentManagerApp
// src/pages/ProjectMonitoringDashboard.jsx
import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut, User, PlusCircle, HelpCircle, Clock, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';

const ProjectMonitoringDashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Coal Efficiency Study', progress: 75, status: 'On Track', description: 'Analyzing coal usage efficiency in power plants.', startDate: '2024-01-01', endDate: '2024-12-31', documents: [] },
    { id: 2, name: 'Mining Safety Analysis', progress: 40, status: 'Delayed', description: 'Comprehensive safety analysis of underground mining operations.', startDate: '2024-02-15', endDate: '2024-11-30', documents: [] },
    { id: 3, name: 'Environmental Impact Assessment', progress: 90, status: 'Near Completion', description: 'Assessing the environmental impact of new mining techniques.', startDate: '2024-03-01', endDate: '2024-09-30', documents: [] },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [auditTrail, setAuditTrail] = useState([
    { id: 1, user: 'John Doe', action: 'Updated project status', date: '2024-09-15 14:30' },
    { id: 2, user: 'Jane Smith', action: 'Uploaded new document', date: '2024-09-14 11:45' },
    { id: 3, user: 'Mike Johnson', action: 'Created new project', date: '2024-09-13 09:15' },
  ]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: projects.length + 1,
      name: e.target.projectName.value,
      description: e.target.projectDescription.value,
      progress: 0,
      status: 'Not Started',
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      documents: [],
    };
    setProjects([...projects, newProject]);
    addAuditEntry(`Created new project: ${newProject.name}`);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const updatedProject = {
      ...selectedProject,
      name: e.target.projectName.value,
      description: e.target.projectDescription.value,
      progress: parseInt(e.target.progress.value),
      status: e.target.status.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
    addAuditEntry(`Updated project: ${updatedProject.name}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedProject = {
        ...selectedProject,
        documents: [...selectedProject.documents, file.name],
      };
      setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
      setSelectedProject(updatedProject);
      addAuditEntry(`Uploaded document to project: ${updatedProject.name}`);
    }
  };

  const addAuditEntry = (action) => {
    const newEntry = {
      id: auditTrail.length + 1,
      user: 'Current User',
      action: action,
      date: new Date().toLocaleString(),
    };
    setAuditTrail([newEntry, ...auditTrail]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Project Monitoring Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Project Overview</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input id="projectName" name="projectName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Description</Label>
                      <Textarea id="projectDescription" name="projectDescription" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" required />
                    </div>
                    <Button type="submit">Create Project</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status</span>
                        <span className={`text-sm font-medium ${
                          project.status === 'On Track' ? 'text-green-500' :
                          project.status === 'Delayed' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="audit">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Audit Trail</h2>
            <div className="space-y-4">
              {auditTrail.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="flex items-center space-x-4 py-4">
                    <Clock className="h-6 w-6 text-gray-500" />
                    <div>
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-sm text-gray-500">By {entry.user} on {entry.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="help">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Help & Support</h2>
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">How do I create a new project?</h3>
                    <p className="text-sm text-gray-500">Click the "New Project" button on the Projects tab and fill out the form.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">How can I update project progress?</h3>
                    <p className="text-sm text-gray-500">Click on a project card to view details, then use the update form to modify project information.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">How do I upload documents to a project?</h3>
                    <p className="text-sm text-gray-500">In the project details view, use the file upload button to attach documents to the project.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Who can I contact for technical support?</h3>
                    <p className="text-sm text-gray-500">Please email support@projectmonitoring.com for any technical issues.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" name="projectName" defaultValue={selectedProject.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDescription">Description</Label>
                <Textarea id="projectDescription" name="projectDescription" defaultValue={selectedProject.description} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input id="progress" name="progress" type="number" min="0" max="100" defaultValue={selectedProject.progress} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" defaultValue={selectedProject.status} className="w-full p-2 border rounded" required>
                  <option>Not Started</option>
                  <option>On Track</option>
                  <option>Delayed</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" defaultValue={selectedProject.startDate} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" defaultValue={selectedProject.endDate} required />
              </div>
              <Button type="submit">Update Project</Button>
            </form>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Documents</h3>
              {selectedProject.documents.length > 0 ? (
                <ul className="list-disc pl-5">
                  {selectedProject.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded yet.</p>
              )}
              <div className="mt-2">
                <Label htmlFor="fileUpload" className="cursor-pointer">
                  <Input id="fileUpload" name="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
                  <div className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
                    <Upload className="h-4 w-4" />
                    <span>Upload Document</span>
                  </div>
                </Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectMonitoringDashboard;

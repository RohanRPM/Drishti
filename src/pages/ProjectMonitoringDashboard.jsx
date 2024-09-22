import React, { useState } from 'react';
import {
  PlusCircle,
  Clock,
  Upload,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectMonitoringDashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Coal Efficiency Study',
      progress: 75,
      status: 'On Track',
      description: 'Analyzing coal usage efficiency in power plants.',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      documents: [],
    },
    {
      id: 2,
      name: 'Mining Safety Analysis',
      progress: 40,
      status: 'Delayed',
      description: 'Comprehensive safety analysis of underground mining operations.',
      startDate: '2024-02-15',
      endDate: '2024-11-30',
      documents: [],
    },
    {
      id: 3,
      name: 'Environmental Impact Assessment',
      progress: 90,
      status: 'Near Completion',
      description: 'Assessing the environmental impact of new mining techniques.',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      documents: [],
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [auditTrail, setAuditTrail] = useState([
    { id: 1, user: 'John Doe', action: 'Updated project status', date: '2024-09-15 14:30' },
    { id: 2, user: 'Jane Smith', action: 'Uploaded new document', date: '2024-09-14 11:45' },
    { id: 3, user: 'Mike Johnson', action: 'Created new project', date: '2024-09-13 09:15' },
  ]);
  const getColor = (progress) => {
    if (progress < 50) {
      return 'rgba(255, 99, 132, 0.6)'; // Red
    } else if (progress < 80) {
      return 'rgba(255, 206, 86, 0.6)'; // Yellow
    } else {
      return 'rgba(75, 192, 192, 0.6)'; // Green
    }
  };

  const chartData = {
    labels: projects.map(project => project.name),
    datasets: [
      {
        label: 'Project Progress (%)',
        data: projects.map(project => project.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Project Progress Overview',
      },
    },
    //reduce the size of chart
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    
    },
    //SLIGHTLY INCREASE THE HEIGHT
    height: 300,

  };

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
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
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
      setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Project Monitoring Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="projects" className="space-y-4">
         
          <TabsContent value="projects" className="space-y-4">
            <div className="my-6">
              <Bar data={chartData} options={chartOptions} />
            </div>
            {/* Your project cards... */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="w-full rounded-lg bg-gray-200">
                        <div
                          className={`h-full rounded-lg ${
                            project.progress < 50
                              ? 'bg-red-500'
                              : project.progress < 80
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </Progress>
                      <div className="text-sm">{project.status}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Project Overview</h2>
              <Dialog>
                {/* <DialogTrigger asChild>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger> */}
                {/* <DialogContent>
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
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Create Project</Button>
                  </form>
                </DialogContent> */}
              </Dialog>
            </div>
            {/* Chart for project progress */}
          </TabsContent>
          <TabsContent value="audit">
            <h2 className="text-2xl font-semibold text-gray-800">Audit Trail</h2>
            <div className="space-y-4">
              {auditTrail.map((entry) => (
                <div key={entry.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <div className="font-medium">{entry.user}</div>
                  <div className="text-sm text-gray-600">{entry.action}</div>
                  <div className="text-xs text-gray-400">{entry.date}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="help">
            <h2 className="text-2xl font-semibold text-gray-800">Help</h2>
            <p className="text-gray-600">
              For assistance with this application, please refer to the documentation or contact support.
            </p>
          </TabsContent>
        </Tabs>
      </main>
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent>
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
                <Input id="progress" name="progress" type="number" defaultValue={selectedProject.progress} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" name="status" defaultValue={selectedProject.status} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" name="startDate" type="date" defaultValue={selectedProject.startDate} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" defaultValue={selectedProject.endDate} required />
              </div>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Update Project</Button>
            </form>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Documents</h3>
              <input type="file" onChange={handleFileUpload} className="mt-2" />
              <ul className="mt-2 space-y-1">
                {selectedProject.documents.map((doc, index) => (
                  <li key={index} className="text-sm text-gray-600">{doc}</li>
                ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectMonitoringDashboard;

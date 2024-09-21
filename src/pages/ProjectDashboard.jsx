// src/pages/ProjectDashboard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const ProjectDashboard = () => {
  // Sample data - replace with actual data from your backend
  const projectsData = [
    { name: 'Project A', progress: 75, budget: 100000, spent: 75000 },
    { name: 'Project B', progress: 50, budget: 150000, spent: 60000 },
    { name: 'Project C', progress: 90, budget: 80000, spent: 78000 },
    { name: 'Project D', progress: 30, budget: 200000, spent: 50000 },
  ];

  const statusData = [
    { name: 'Completed', value: 5 },
    { name: 'In Progress', value: 10 },
    { name: 'Not Started', value: 3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{projectsData.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              ${projectsData.reduce((sum, project) => sum + project.budget, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              ${projectsData.reduce((sum, project) => sum + project.spent, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {projectsData.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{project.name}</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Spent</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;

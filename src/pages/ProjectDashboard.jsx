// src/pages/ProjectDashboard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ProjectDashboard = () => {
  // Sample data
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

  // Additional datasets for new pie charts
  const additionalStatusData1 = [
    { name: 'High Priority', value: 6 },
    { name: 'Medium Priority', value: 8 },
    { name: 'Low Priority', value: 4 },
  ];

  const additionalStatusData2 = [
    { name: 'Over Budget', value: 3 },
    { name: 'On Budget', value: 12 },
  ];

  // Pie Chart Data
  const pieData = {
    labels: statusData.map(status => status.name),
    datasets: [
      {
        data: statusData.map(status => status.value),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
      },
    ],
  };

  const additionalPieData1 = {
    labels: additionalStatusData1.map(status => status.name),
    datasets: [
      {
        data: additionalStatusData1.map(status => status.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const additionalPieData2 = {
    labels: additionalStatusData2.map(status => status.name),
    datasets: [
      {
        data: additionalStatusData2.map(status => status.value),
        backgroundColor: ['#FF5733', '#C70039'],
      },
    ],
  };

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
            <Bar
              data={{
                labels: projectsData.map(project => project.name),
                datasets: [
                  {
                    label: 'Budget',
                    data: projectsData.map(project => project.budget),
                    backgroundColor: '#8884d8',
                  },
                  {
                    label: 'Spent',
                    data: projectsData.map(project => project.spent),
                    backgroundColor: '#82ca9d',
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <Pie
              data={additionalPieData1}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[100px]">
            <Pie
              data={additionalPieData2}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' } },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;

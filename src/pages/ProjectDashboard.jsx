import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ProjectDashboard = () => {
  // Sample data for projects
  const projectsData = [
    { name: 'Project A', progress: 75, budget: 100000, spent: 75000, upcomingDeadline: 'Quarterly Report: 30th Sept' },
    { name: 'Project B', progress: 50, budget: 150000, spent: 60000, upcomingDeadline: 'Financial Report: 15th Oct' },
    { name: 'Project C', progress: 90, budget: 80000, spent: 78000, upcomingDeadline: 'Completion Report: 1st Nov' },
    { name: 'Project D', progress: 30, budget: 200000, spent: 50000, upcomingDeadline: 'Quarterly Report: 15th Oct' },
  ];

  const statusData = [
    { name: 'Completed', value: 5 },
    { name: 'In Progress', value: 10 },
    { name: 'Not Started', value: 3 },
  ];

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

  // State to store the message to the admin
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Function to handle message submission
  const handleSendMessage = () => {
    if (message.trim() === '') return; // Prevent sending empty messages
    setMessageSent(true); // Simulate message sent
    setMessage(''); // Clear the input field after sending
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drishti Investigator Dashboard</h1>

      {/* Summary Cards */}
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

      {/* Project Progress and Budget vs Spent */}
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
                <p className="text-sm text-gray-500">Upcoming: {project.upcomingDeadline}</p>
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

      {/* Communication and Submission Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Communication with CMPDI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Use the built-in messaging system to contact CMPDI for project updates, fund requests, or time extensions.
              Ensure to communicate any delays or issues promptly.
            </p>
            <textarea
              className="w-full mt-2 p-2 border rounded"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSendMessage}
            >
              Send Message
            </button>
            {messageSent && (
              <p className="mt-2 text-green-600">Your message has been sent successfully!</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Reports and Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Submit quarterly progress reports, financial reports, or completion documents through the platform. Once uploaded, you will receive a confirmation for successful submission.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Upload Report</button>
          </CardContent>
        </Card>
      </div>

      {/* Status and Priority Overview */}
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

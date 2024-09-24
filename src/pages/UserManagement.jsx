import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { FaUserPlus, FaProjectDiagram } from 'react-icons/fa'; // Example icons

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Moin Arbee', role: 'Investigator' },
    { id: 2, name: 'Rohan Meshram', role: 'Admin' },
  ]);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedInvestigator, setSelectedInvestigator] = useState(null);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const generateProjectCode = () => {
    // Generate a simple unique project code
    return `PROJ-${Math.floor(Math.random() * 10000)}`;
  };

  const handleCreateProject = () => {
    if (newProjectName && selectedInvestigator) {
      const projectCode = generateProjectCode();
      const newProject = {
        name: newProjectName,
        code: projectCode,
        investigator: selectedInvestigator,
      };
      setProjects([...projects, newProject]);

      // Reset form fields
      setNewProjectName('');
      setSelectedInvestigator(null);

      // Simulate sending credentials
      sendCredentials(selectedInvestigator, projectCode);
    }
  };

  const sendCredentials = (investigatorId, projectCode) => {
    const investigator = users.find(user => user.id === investigatorId);
    if (investigator) {
      console.log(`Sending credentials to ${investigator.name} for project ${projectCode}`);
      // Simulate email or credential sending logic here
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Create New Project Section */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-blue-600">
            <FaProjectDiagram /> <span>Create New Project</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Select onValueChange={(value) => setSelectedInvestigator(value)}>
              <SelectTrigger className="w-[180px] border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select Investigator" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg">
                {users
                  .filter(user => user.role === 'Investigator')
                  .map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={handleCreateProject}>
            Create Project
          </Button>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-green-600">
            <FaProjectDiagram /> <span>Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full border rounded-md shadow-sm">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="p-3">Project Name</TableHead>
                <TableHead className="p-3">Project Code</TableHead>
                <TableHead className="p-3">Investigator</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={index} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3">{project.name}</TableCell>
                  <TableCell className="p-3">{project.code}</TableCell>
                  <TableCell className="p-3">
                    {users.find(user => user.id === project.investigator)?.name || 'Moin'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Roles Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-purple-600">
            <FaUserPlus /> <span>User Roles and Permissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full border rounded-md shadow-sm">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead className="p-3">Name</TableHead>
                <TableHead className="p-3">Role</TableHead>
                <TableHead className="p-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="border-b hover:bg-gray-100">
                  <TableCell className="p-3">{user.name}</TableCell>
                  <TableCell className="p-3">{user.role}</TableCell>
                  <TableCell className="p-3">
                    <Select onValueChange={(value) => handleRoleChange(user.id, value)}>
                      <SelectTrigger className="w-[180px] border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Change role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white shadow-lg">
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Investigator">Investigator</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;

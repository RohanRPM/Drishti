// src/pages/AdminControlPanel.jsx
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

const AdminControlPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Investigator' },
    { id: 2, name: 'Jane Smith', role: 'Admin' },
  ]);
  const [activeTab, setActiveTab] = useState('reports'); // Initial active tab


  const [projects, setProjects] = useState([
    { id: 1, title: 'Project A', investigator: 'John Doe', status: 'In Progress' },
    { id: 2, title: 'Project B', investigator: 'Jane Smith', status: 'Completed' },
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleAssignProject = (projectId, investigator) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, investigator } : project
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Control Panel</h1>
      {/* <Tabs defaultValue="users"> */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Project Management</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        {/* TabsContent goes here */}
      {/* </Tabs> */}

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Roles and Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleRoleChange(user.id, value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Change role" />
                          </SelectTrigger>
                          <SelectContent>
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
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Investigator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map(project => (
                    <TableRow key={project.id}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.investigator}</TableCell>
                      <TableCell>{project.status}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value) => handleAssignProject(project.id, value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Assign investigator" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.filter(user => user.role === 'Investigator').map(user => (
                              <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Generate Project Status Report</Button>
                <Button>Generate Funding Utilization Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControlPanel;

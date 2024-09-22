import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import UserManagement from './UserManagement';
import ProjectMonitoringDashboard from './ProjectMonitoringDashboard';
import Reports from './Reports';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Investigator' },
    { id: 2, name: 'Jane Smith', role: 'Admin' },
  ]);

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
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="users" onClick={() => setActiveTab("users")}>User Management</TabsTrigger>
          <TabsTrigger value="projects" onClick={() => setActiveTab("projects")}>Project Management</TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Roles and Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <UserManagement users={users} handleRoleChange={handleRoleChange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectMonitoringDashboard projects={projects} handleAssignProject={handleAssignProject} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Reports />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControlPanel;

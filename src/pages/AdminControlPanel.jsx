import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import UserManagement from './UserManagement';
import ProjectMonitoringDashboard from './ProjectMonitoringDashboard';
import Reports from './Reports';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [users, setUsers] = useState([
    { id: 1, name: 'Moin Arbee', role: 'Investigator' },
    { id: 2, name: 'Rohan Meshram', role: 'Admin' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: 'Project A', investigator: 'Moin Arbee', status: 'In Progress' },
    { id: 2, title: 'Project B', investigator: 'Rohan Meshram', status: 'Completed' },
  ]);

  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedInvestigator, setSelectedInvestigator] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  const handleSendNotification = () => {
    if (notificationMessage && selectedInvestigator) {
      const investigator = users.find(user => user.id === parseInt(selectedInvestigator));
      if (investigator) {
        const newNotification = {
          message: notificationMessage,
          investigator: investigator.name,
          date: new Date().toLocaleString(),
        };
        setNotifications([...notifications, newNotification]);
        setNotificationMessage(''); // Clear message
        setSelectedInvestigator(null); // Reset selected investigator
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Control Panel</h1>
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="users" onClick={() => setActiveTab("users")}>User Management</TabsTrigger>
          <TabsTrigger value="projects" onClick={() => setActiveTab("projects")}>Project Management</TabsTrigger>
          <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>Reports</TabsTrigger>
          <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>Notifications</TabsTrigger>
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

        {/* New Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Send Notifications to Investigators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Notification Message"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="mb-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Select onValueChange={(value) => setSelectedInvestigator(value)}>
                  <SelectTrigger className="w-[180px] border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Investigator" />
                  </SelectTrigger>
                  <SelectContent>
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
              <Button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700" onClick={handleSendNotification}>
                Send Notification
              </Button>

              {/* Notification History */}
              <div className="mt-6">
                <h2 className="text-xl font-bold">Notification History</h2>
                {notifications.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {notifications.map((notif, index) => (
                      <li key={index} className="p-3 bg-gray-100 border rounded-md shadow-sm">
                        <p><strong>To:</strong> {notif.investigator}</p>
                        <p><strong>Message:</strong> {notif.message}</p>
                        <p><small><strong>Sent on:</strong> {notif.date}</small></p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No notifications sent yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControlPanel;

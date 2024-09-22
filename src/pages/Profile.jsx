// src/pages/Profile.jsx
import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
// import logo from '../assets/logo.png';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '1234567890',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement profile update logic
    alert('Profile Updated Successfully!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* <div className="w-64 bg-black text-white flex flex-col">
        <div className="p-4 flex items-center">
          <img src={logo} alt="Drishti Logo" className="h-8 mr-2" />
          <span className="font-bold text-lg"></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">Home</a>
          <a href="/project-dashboard" className="block p-2 rounded hover:bg-gray-700">Project Dashboard</a>
          <a href="/data-entry-upload" className="block p-2 rounded hover:bg-gray-700">Data Entry & Upload</a>
          <a href="/profile" className="block p-2 rounded bg-gray-700">Profile</a>
        </nav>
      </div> */}
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

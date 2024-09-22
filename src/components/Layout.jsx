// src/components/Layout.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/DropdownMenu';
import { User, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        <div className="p-4 flex items-center">
          <img src={logo} alt="Drishti Logo" className="h-8 mr-2" />
          <span className="font-bold text-lg"></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">Home</Link>
          <Link to="/project-dashboard" className="block p-2 rounded hover:bg-gray-700">Project Dashboard</Link>
          <Link to="/data-entry-upload" className="block p-2 rounded hover:bg-gray-700">Data Entry & Upload</Link>
          {user.role === 'Admin' && (
            <Link to="/admin-control-panel" className="block p-2 rounded hover:bg-gray-700">Admin Control Panel</Link>
          )}
          <Link to="/profile" className="block p-2 rounded hover:bg-gray-700">Profile</Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow mb-4">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" onClick={toggleDropdown}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" alt="User avatar" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              {isOpen && (
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center space-x-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;

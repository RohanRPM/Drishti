// src/pages/DataEntryAndUpload.jsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const DataEntryAndUpload = ({ project, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    progress: project.progress,
    status: project.status,
    startDate: project.startDate,
    endDate: project.endDate,
  });
  const [documents, setDocuments] = useState(project.documents || []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...project, ...formData, documents });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would handle file upload to a server here
      // For this example, we'll just add the file name to the documents array
      setDocuments(prevDocs => [...prevDocs, file.name]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Project: {project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>On Hold</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Update Project</Button>
        </form>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Documents</h3>
          {documents.length > 0 ? (
            <ul className="list-disc pl-5 mb-4">
              {documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-4">No documents uploaded yet.</p>
          )}
          <Label htmlFor="fileUpload" className="cursor-pointer">
            <Input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </div>
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataEntryAndUpload;

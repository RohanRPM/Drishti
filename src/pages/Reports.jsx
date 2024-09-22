import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Reports = () => {
  const handleGenerateStatusReport = () => {
    // Logic to generate project status report
    console.log('Generating Project Status Report...');
  };

  const handleGenerateFundingReport = () => {
    // Logic to generate funding utilization report
    console.log('Generating Funding Utilization Report...');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 space-x-2">
          <Button onClick={handleGenerateStatusReport}>Generate Project Status Report</Button>
          <Button onClick={handleGenerateFundingReport}>Generate Funding Utilization Report</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reports;

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';

export function MonthlyReport() {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());

  const generateReport = () => {
    alert(`Generating monthly report for ${month}/${year}`);
  };

  const downloadReport = () => {
    alert(`Downloading monthly report for ${month}/${year}`);
  };

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => 
    (new Date().getFullYear() - i).toString()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Report Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={generateReport}>
              Generate Report
            </Button>
          </div>
          
          <div className="pt-4">
            <h4 className="font-medium mb-2">Report Preview</h4>
            <p className="text-muted-foreground mb-4">
              Monthly report for {months.find(m => m.value === month)?.label} {year} will include:
            </p>
            
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Comprehensive task completion analytics</li>
              <li>Team performance KPIs and metrics</li>
              <li>Project progress and milestone tracking</li>
              <li>Resource allocation and utilization</li>
              <li>Budget and time expenditure analysis</li>
              <li>Forecast and recommendations for next month</li>
            </ul>
            
            <Button className="mt-4" onClick={downloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
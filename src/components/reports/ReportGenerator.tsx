'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface ReportGeneratorProps {
  preloadedReports?: any;
}

export function ReportGenerator({ preloadedReports }: ReportGeneratorProps) {
  const reports = useQuery(api.reports.getReports, { companyId: 'placeholder' }) || preloadedReports;
  const [selectedPeriod, setSelectedPeriod] = useState('weekly');

  const generateReport = async (type: 'weekly' | 'monthly') => {
    // This would call the API endpoint to generate a report
    console.log(`Generating ${type} report`);
    
    // For now, we'll just show a success message
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} report generation started!`);
  };

  const downloadReport = async (reportId: string) => {
    // This would download the report PDF
    console.log(`Downloading report ${reportId}`);
    alert('Report download started!');
  };

  if (!reports) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-max rounded-full bg-blue-100 p-3 mb-4">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Weekly Report</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate a weekly performance report for your team
                    </p>
                    <Button onClick={() => generateReport('weekly')}>
                      Generate Weekly Report
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-max rounded-full bg-green-100 p-3 mb-4">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Monthly Report</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate a comprehensive monthly performance report
                    </p>
                    <Button onClick={() => generateReport('monthly')}>
                      Generate Monthly Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No reports generated yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report: any) => (
                    <div key={report._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium capitalize">{report.type} Report</h4>
                        <p className="text-sm text-muted-foreground">
                          Generated on {format(new Date(report.generatedAt), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Period: {report.period}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReport(report._id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function WeeklyReport() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const generateReport = () => {
    if (!date) return;
    alert(`Generating weekly report for week of ${format(date, 'MMM dd, yyyy')}`);
  };

  const downloadReport = () => {
    if (!date) return;
    alert(`Downloading weekly report for week of ${format(date, 'MMM dd, yyyy')}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Report Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pick a date for the report week</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button onClick={generateReport} disabled={!date}>
              Generate Report
            </Button>
          </div>
          
          {date && (
            <div className="pt-4">
              <h4 className="font-medium mb-2">Report Preview</h4>
              <p className="text-muted-foreground mb-4">
                Weekly report for the week of {format(date, 'MMM dd, yyyy')} will include:
              </p>
              
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Task completion statistics</li>
                <li>Team member performance metrics</li>
                <li>Project progress updates</li>
                <li>Priority task overview</li>
                <li>Upcoming deadlines</li>
              </ul>
              
              <Button className="mt-4" onClick={downloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
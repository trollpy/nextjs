'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export function useReports(companyId?: Id<'companies'>) {
  const reports = useQuery(api.reports.getReports, { 
    companyId: companyId as Id<'companies'> 
  });
  const generateWeeklyReport = useMutation(api.reports.generateWeeklyReport);
  const generateMonthlyReport = useMutation(api.reports.generateMonthlyReport);
  const getReport = useMutation(api.reports.getReport);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async (type: 'weekly' | 'monthly', data: any) => {
    setIsGenerating(true);
    try {
      let reportId;
      
      if (type === 'weekly') {
        reportId = await generateWeeklyReport({
          companyId: companyId as Id<'companies'>,
          startDate: data.startDate,
          endDate: data.endDate,
          generatedBy: data.generatedBy,
        });
      } else {
        reportId = await generateMonthlyReport({
          companyId: companyId as Id<'companies'>,
          year: data.year,
          month: data.month,
          generatedBy: data.generatedBy,
        });
      }

      return reportId;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportData = async (reportId: Id<'reports'>) => {
    try {
      return await getReport({ reportId });
    } catch (error) {
      console.error('Error fetching report:', error);
      throw error;
    }
  };

  const getWeeklyReports = () => {
    return reports?.filter(report => report.type === 'weekly') || [];
  };

  const getMonthlyReports = () => {
    return reports?.filter(report => report.type === 'monthly') || [];
  };

  return {
    reports,
    isLoading: !reports,
    isGenerating,
    generateReport,
    getReportData,
    getWeeklyReports,
    getMonthlyReports,
  };
}
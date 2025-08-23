import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/convex/_generated/api';
import { fetchMutation } from 'convex/nextjs';

export async function POST(req: NextRequest) {
  try {
    const { companyId, type, period, generatedBy } = await req.json();

    let reportId;
    
    if (type === 'weekly') {
      const { startDate, endDate } = period;
      reportId = await fetchMutation(api.reports.generateWeeklyReport, {
        companyId,
        startDate,
        endDate,
        generatedBy,
      });
    } else if (type === 'monthly') {
      const { year, month } = period;
      reportId = await fetchMutation(api.reports.generateMonthlyReport, {
        companyId,
        year,
        month,
        generatedBy,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid report type' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      reportId 
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BarChart3, FileText, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await currentUser();
  
  if (user) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Task Management',
      description: 'Drag and drop tasks, set priorities, and track progress with ease.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Assign tasks to team members and track their performance with KPIs.',
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Get insights into team performance with detailed charts and reports.',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Custom Reports',
      description: 'Generate weekly and monthly reports with your company branding.',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Time Tracking',
      description: 'Monitor task completion times and identify bottlenecks.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Role-based Access',
      description: 'Control access with hierarchical permissions and privileges.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskManager Pro</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/sign-in" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Sign In
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Manage Tasks, 
          <span className="text-blue-600 dark:text-blue-400"> Boost Productivity</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          The all-in-one task management platform with advanced analytics, custom reporting, 
          and team collaboration features designed for modern businesses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Free Trial
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your team's tasks and track performance in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-blue-600 dark:bg-blue-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams that use TaskManager Pro to streamline their task management and boost productivity.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} TaskManager Pro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
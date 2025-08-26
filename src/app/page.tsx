import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BarChart3, FileText, Clock, Shield, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function HomePage() {
  const user = await currentUser();
  
  if (user) {
    redirect('/dashboard');
  }

  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Task Management',
      description: 'Drag and drop tasks, set priorities, and track progress with ease.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description: 'Assign tasks to team members and track their performance with KPIs.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Get insights into team performance with detailed charts and reports.',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Custom Reports',
      description: 'Generate weekly and monthly reports with your company branding.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Time Tracking',
      description: 'Monitor task completion times and identify bottlenecks.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Role-based Access',
      description: 'Control access with hierarchical permissions and privileges.',
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      company: "TechCorp",
      content: "TaskManager Pro has transformed how our team collaborates. The analytics are incredibly insightful.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Team Lead",
      company: "StartupXYZ",
      content: "The reporting features save us hours every week. Clean interface and powerful functionality.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">TaskManager Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/sign-in" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button className="bg-slate-900 hover:bg-slate-800">Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600 mb-6">
                <Star className="h-4 w-4 mr-2 text-amber-500" />
                Trusted by 10,000+ teams worldwide
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Manage Tasks,{' '}
                <span className="text-slate-600">Boost Productivity</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                The all-in-one task management platform with advanced analytics, custom reporting, 
                and team collaboration features designed for modern businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center"
                  alt="Team collaboration workspace"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Tasks Completed</p>
                    <p className="text-2xl font-bold text-slate-900">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and boost team productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-slate-300">
                <CardHeader className="pb-4">
                  <div className="bg-slate-100 p-3 rounded-lg w-fit mb-4">
                    <div className="text-slate-700">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers have to say about TaskManager Pro.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-200 rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-slate-600 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams using TaskManager Pro to streamline their projects and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8 py-3">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-slate-900 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-slate-900">TaskManager Pro</span>
            </div>
            <p className="text-slate-600 text-center md:text-right">
              © {new Date().getFullYear()} TaskManager Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
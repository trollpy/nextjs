'use client';

import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface HierarchySettingsProps {
  preloadedWorkers?: any;
}

export function HierarchySettings({ preloadedWorkers }: HierarchySettingsProps) {
  const workers = useQuery(api.workers.getByCompany, { companyId: 'placeholder' }) || preloadedWorkers;
  const [hierarchy, setHierarchy] = useState<Record<string, string>>({});

  const handleRoleChange = (workerId: string, role: string) => {
    setHierarchy(prev => ({
      ...prev,
      [workerId]: role,
    }));
  };

  const saveHierarchy = () => {
    // This would save the hierarchy settings
    console.log('Saving hierarchy:', hierarchy);
    alert('Hierarchy settings saved!');
  };

  if (!workers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Set up role-based permissions and hierarchy for your team members.
            </p>
            
            <div className="space-y-4">
              {workers.map((worker: any) => (
                <div key={worker._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{worker.name}</h4>
                    <p className="text-sm text-muted-foreground">{worker.email}</p>
                  </div>
                  
                  <div className="w-48">
                    <Label htmlFor={`role-${worker._id}`} className="sr-only">
                      Role for {worker.name}
                    </Label>
                    <Select
                      value={hierarchy[worker._id] || worker.role || 'user'}
                      onValueChange={(value) => handleRoleChange(worker._id, value)}
                    >
                      <SelectTrigger id={`role-${worker._id}`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
            
            <Button onClick={saveHierarchy} className="mt-4">
              Save Hierarchy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Administrator</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full system access</li>
                  <li>• Manage all users and permissions</li>
                  <li>• Company settings management</li>
                  <li>• Billing and subscription management</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Manager</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create and assign tasks</li>
                  <li>• Manage team members</li>
                  <li>• Generate reports</li>
                  <li>• Project management</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">User</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Work on assigned tasks</li>
                  <li>• Update task status</li>
                  <li>• View team tasks</li>
                  <li>• Basic reporting</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Viewer</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Read-only access</li>
                  <li>• View tasks and projects</li>
                  <li>• View reports</li>
                  <li>• No editing capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
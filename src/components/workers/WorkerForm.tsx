'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WorkerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker?: any;
}

export function WorkerForm({ open, onOpenChange, worker }: WorkerFormProps) {
  const createWorker = useMutation(api.workers.create);
  const updateWorker = useMutation(api.workers.update);
  
  const [formData, setFormData] = useState({
    name: worker?.name || '',
    email: worker?.email || '',
    position: worker?.position || '',
    department: worker?.department || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'Support',
    'Operations',
    'Human Resources',
    'Finance',
  ];

  const positions = [
    'Developer',
    'Designer',
    'Manager',
    'Analyst',
    'Specialist',
    'Director',
    'Executive',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const workerData = {
        companyId: 'placeholder' as any,
        name: formData.name,
        email: formData.email,
        position: formData.position,
        department: formData.department,
      };

      if (worker) {
        await updateWorker({ workerId: worker._id, ...workerData });
      } else {
        await createWorker(workerData);
      }

      onOpenChange(false);
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
      });
    } catch (error) {
      console.error('Error saving worker:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{worker ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => setFormData({ ...formData, position: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (worker ? 'Update' : 'Add Member')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
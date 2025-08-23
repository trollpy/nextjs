'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUpload } from '@/components/common/ImageUpload';
import { useToast } from '@/components/ui/use-toast';

interface CompanySettingsProps {
  preloadedCompany?: any;
}

export function CompanySettings({ preloadedCompany }: CompanySettingsProps) {
  const company = useQuery(api.companies.getByOwner, { ownerId: 'placeholder' }) || preloadedCompany;
  const updateCompany = useMutation(api.companies.update);
  const updateLogo = useMutation(api.companies.updateLogo);
  
  const [formData, setFormData] = useState({
    name: company?.name || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateCompany({
        companyId: company._id,
        name: formData.name,
      });

      toast({
        title: 'Success',
        description: 'Company settings updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update company settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = async (fileUrl: string) => {
    try {
      await updateLogo({
        companyId: company._id,
        logo: fileUrl,
      });

      toast({
        title: 'Success',
        description: 'Company logo updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update company logo.',
        variant: 'destructive',
      });
    }
  };

  if (!company) {
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
          <CardTitle>Company Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            currentImage={company.logo}
            onUpload={handleLogoUpload}
            folder="logos"
            description="Upload your company logo. This will be used as a watermark on reports."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
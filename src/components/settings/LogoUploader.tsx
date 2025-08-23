'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LogoUploaderProps {
  currentLogo?: string;
  onLogoUpload: (fileUrl: string) => void;
  onLogoRemove: () => void;
}

export function LogoUploader({ currentLogo, onLogoUpload, onLogoRemove }: LogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      // In a real application, you would upload the file to your server or cloud storage
      // For now, we'll simulate an upload delay and return a mock URL
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockFileUrl = URL.createObjectURL(file);
      onLogoUpload(mockFileUrl);
      
      toast({
        title: 'Success',
        description: 'Logo uploaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload logo.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    onLogoRemove();
    toast({
      title: 'Success',
      description: 'Logo removed successfully.',
    });
  };

  return (
    <div className="space-y-4">
      {currentLogo ? (
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 border rounded-lg overflow-hidden">
            <img
              src={currentLogo}
              alt="Company logo"
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemoveLogo}
          >
            <X className="h-4 w-4 mr-2" />
            Remove Logo
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <Label htmlFor="logo-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>Upload Logo</span>
            </Button>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            PNG, JPG up to 5MB
          </p>
        </div>
      )}
      
      {isUploading && (
        <div className="text-sm text-muted-foreground">
          Uploading...
        </div>
      )}
    </div>
  );
}
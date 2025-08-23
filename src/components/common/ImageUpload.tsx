'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImagePlus, X, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (fileUrl: string) => void;
  onRemove?: () => void;
  folder: string;
  description?: string;
}

export function ImageUpload({
  currentImage,
  onUpload,
  onRemove,
  folder,
  description = 'Upload an image file',
}: ImageUploadProps) {
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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockFileUrl = URL.createObjectURL(file);
      onUpload(mockFileUrl);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (onRemove) {
      onRemove();
    }
    toast({
      title: 'Success',
      description: 'Image removed successfully.',
    });
  };

  return (
    <div className="space-y-4">
      {currentImage ? (
        <div className="flex items-start gap-4">
          <div className="w-32 h-32 border rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4 mr-2" />
              Remove Image
            </Button>
            <p className="text-sm text-muted-foreground">
              Click to replace the current image
            </p>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </span>
            </Button>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </Label>
          <p className="text-sm text-muted-foreground mt-2">
            {description}
          </p>
          <p className="text-sm text-muted-foreground">
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
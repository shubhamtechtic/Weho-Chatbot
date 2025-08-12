
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

export default function AdminPanelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    // TODO: Implement actual file upload logic here
    console.log('Uploading file:', file.name);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsUploading(false);
    
    toast({
        title: "Upload Successful",
        description: `"${file.name}" has been uploaded.`,
    })

    setFile(null);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel</CardTitle>
            <CardDescription>
              Upload PDF or text documents to provide context for the chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="file-upload" className="font-medium text-sm">Select a document</label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.txt,.md"
                disabled={isUploading}
                className="file:text-foreground"
              />
              {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
            </div>
            <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

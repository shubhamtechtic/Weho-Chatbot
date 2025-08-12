
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Loader2, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

type UploadedFile = {
  name: string;
  size: number; // in KB
  uploadDate: string;
};

const mockUploadedFiles: UploadedFile[] = [
    { name: 'business-regulations-2024.pdf', size: 1204, uploadDate: '2024-07-28' },
    { name: 'incentive-guide-v2.docx', size: 850, uploadDate: '2024-07-27' },
    { name: 'zoning-map-weho.pdf', size: 2340, uploadDate: '2024-07-25' },
];


export default function AdminPanelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);
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
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newFile: UploadedFile = {
        name: file.name,
        size: Math.round(file.size / 1024),
        uploadDate: new Date().toISOString().split('T')[0],
    }

    setUploadedFiles(prevFiles => [newFile, ...prevFiles]);
    
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

  const handleDelete = (fileName: string) => {
    setUploadedFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    toast({
        title: "File Deleted",
        description: `"${fileName}" has been removed.`,
        variant: 'destructive',
    })
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>
              Upload PDF, DOCX, or text documents to provide context for the chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="file-upload" className="font-medium text-sm">Select a document</label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.txt,.md,.docx"
                disabled={isUploading}
                className="file:text-foreground"
              />
              {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
            </div>
            <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full sm:w-auto">
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
        
        <Card>
            <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                    These documents are currently used as a knowledge base for the AI chatbot.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Size</TableHead>
                            <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {uploadedFiles.map((uploadedFile) => (
                            <TableRow key={uploadedFile.name}>
                                <TableCell className="font-medium">{uploadedFile.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{uploadedFile.size} KB</TableCell>
                                <TableCell className="hidden md:table-cell">{uploadedFile.uploadDate}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(uploadedFile.name)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}

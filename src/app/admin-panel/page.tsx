
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, Loader2, Trash2, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
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

type QueryLog = {
    id: number;
    question: string;
    answer: string;
    timestamp: string;
    feedback: 'positive' | 'negative' | null;
};

const mockQueryLogs: QueryLog[] = [
    { id: 1, question: 'How do I get a business license?', answer: 'You can start the pre-application process on our website...', timestamp: '2024-07-28 10:45:12', feedback: 'positive' },
    { id: 2, question: 'Are there any incentives for green businesses?', answer: 'Yes, we offer several grants and tax credits for sustainable businesses...', timestamp: '2024-07-28 09:30:05', feedback: null },
    { id: 3, question: 'What are the parking regulations for restaurants?', answer: 'Parking requirements depend on your restaurant\'s size and location...', timestamp: '2024-07-27 18:15:43', feedback: null },
];


export default function AdminPanelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);
  const [isRetraining, setIsRetraining] = useState(false);
  const [queryLogs, setQueryLogs] = useState<QueryLog[]>(mockQueryLogs);
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

  const handleRetrain = async () => {
    setIsRetraining(true);
    // Simulate retraining delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRetraining(false);
    toast({
        title: "Retraining Complete",
        description: "The AI model has been updated with the latest documents.",
    })
  }

  const handleFeedback = (logId: number, feedback: 'positive' | 'negative') => {
    setQueryLogs(prevLogs => 
        prevLogs.map(log => 
            log.id === logId ? { ...log, feedback: log.feedback === feedback ? null : feedback } : log
        )
    );
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
                disabled={isUploading || isRetraining}
                className="file:text-foreground"
              />
              {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
            </div>
            <Button onClick={handleUpload} disabled={!file || isUploading || isRetraining} className="w-full sm:w-auto">
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
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(uploadedFile.name)} disabled={isRetraining}>
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

        <Card>
            <CardHeader>
                <CardTitle>Model Retraining</CardTitle>
                <CardDescription>
                    Click the button below to retrain the AI model with the most recent set of uploaded documents.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleRetrain} disabled={isRetraining || isUploading}>
                    {isRetraining ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Retraining...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Retrain Model
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Query Logs</CardTitle>
                <CardDescription>
                    Review user interactions with the chatbot and provide feedback.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer</TableHead>
                            <TableHead className="hidden md:table-cell">Timestamp</TableHead>
                            <TableHead className="text-right">Feedback</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {queryLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium max-w-xs truncate">{log.question}</TableCell>
                                <TableCell className="text-muted-foreground max-w-xs truncate">{log.answer}</TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">{log.timestamp}</TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Button 
                                        variant={log.feedback === 'positive' ? 'secondary' : 'ghost'} 
                                        size="icon" 
                                        onClick={() => handleFeedback(log.id, 'positive')}
                                        className={log.feedback === 'positive' ? 'text-green-500 hover:text-green-600' : ''}
                                        >
                                        <ThumbsUp className="h-4 w-4" />
                                        <span className="sr-only">Good</span>
                                    </Button>
                                    <Button 
                                        variant={log.feedback === 'negative' ? 'secondary' : 'ghost'} 
                                        size="icon" 
                                        onClick={() => handleFeedback(log.id, 'negative')}
                                        className={log.feedback === 'negative' ? 'text-red-500 hover:text-red-600' : ''}
                                        >
                                        <ThumbsDown className="h-4 w-4" />
                                        <span className="sr-only">Bad</span>
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

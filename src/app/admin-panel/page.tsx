
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Loader2, Trash2, ThumbsUp, ThumbsDown, Edit, TrendingUp } from 'lucide-react';
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

const mockAnalyticsData = [
  { date: '2024-07-22', queries: 45 },
  { date: '2024-07-23', queries: 52 },
  { date: '2024-07-24', queries: 68 },
  { date: '2024-07-25', queries: 61 },
  { date: '2024-07-26', queries: 75 },
  { date: '2024-07-27', queries: 82 },
  { date: '2024-07-28', queries: 90 },
];


export default function AdminPanelPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);
  const [queryLogs, setQueryLogs] = useState<QueryLog[]>(mockQueryLogs);
  const { toast } = useToast();
  const [editingLog, setEditingLog] = useState<QueryLog | null>(null);
  const [editedAnswer, setEditedAnswer] = useState('');

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

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chatbot-v2/upload-doc?thread_id=default', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const result = await response.json();

      const newFile: UploadedFile = {
          name: file.name,
          size: Math.round(file.size / 1024),
          uploadDate: new Date().toISOString().split('T')[0],
      }
      setUploadedFiles(prevFiles => [newFile, ...prevFiles]);
      
      toast({
          title: "Upload Successful",
          description: result.message || `"${file.name}" has been uploaded and processed.`,
      })

    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "An unexpected error occurred.",
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false);
      setFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
    }
  };

  const handleDelete = (fileName: string) => {
    setUploadedFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    toast({
        title: "File Deleted",
        description: `"${fileName}" has been removed.`,
        variant: 'destructive',
    })
  }

  const handleFeedback = (logId: number, feedback: 'positive' | 'negative') => {
    setQueryLogs(prevLogs => 
        prevLogs.map(log => 
            log.id === logId ? { ...log, feedback: log.feedback === feedback ? null : feedback } : log
        )
    );
  }

  const handleEditClick = (log: QueryLog) => {
    setEditingLog(log);
    setEditedAnswer(log.answer);
  }

  const handleSaveEdit = () => {
    if (!editingLog) return;

    setQueryLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === editingLog.id ? { ...log, answer: editedAnswer } : log
      )
    );

    toast({
      title: 'Answer Updated',
      description: `The response for "${editingLog.question}" has been updated.`
    })
    
    setEditingLog(null);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>
              Upload a PDF document to train the chatbot. The model will be retrained automatically.
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
                  Uploading & Training...
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

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" /> Analytics
                </CardTitle>
                <CardDescription>
                    Usage metrics and feedback statistics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="font-semibold text-lg mb-4">Query Volume (Last 7 Days)</h3>
                <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockAnalyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="queries" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Query Logs & Moderation</CardTitle>
                <CardDescription>
                    Review user interactions, provide feedback, and override incorrect answers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead>Answer</TableHead>
                            <TableHead className="hidden md:table-cell">Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => handleEditClick(log)}
                                        >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
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
       <Dialog open={!!editingLog} onOpenChange={(open) => !open && setEditingLog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit AI Response</DialogTitle>
            <DialogDescription>
              Modify the answer for the question: "{editingLog?.question}"
            </DialogDescription>
          </DialogHeader>
          <Textarea 
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            rows={8}
            className="my-4"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingLog(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

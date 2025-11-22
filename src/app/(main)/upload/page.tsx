"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtifactCard } from "@/components/artifact-card";
import type { Artifact } from "@/lib/types";
import { UploadCloud, FileArchive, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const uploadSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  era: z.string().min(3, "Era is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Meme", "Website", "Text", "UI", "Other"]),
  file: z.any().refine((files) => files?.length === 1, "Image is required."),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const [preview, setPreview] = useState<Partial<Artifact> | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const { toast } = useToast();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      era: "",
      description: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
      updatePreview({ file });
    }
  };

  const updatePreview = (values: Partial<UploadFormValues>) => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues, ...values };

    const eraTagline = newValues.era ? `Lost in ${newValues.era}` : "An echo from the past";
    const archiveHash = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');


    setPreview({
      id: "preview",
      name: newValues.name,
      era: newValues.era,
      description: newValues.description,
      category: newValues.category,
      imageUrl: imagePreviewUrl || "https://picsum.photos/seed/preview/600/400",
      imageHint: "preview",
      timestamp: Date.now() / 1000,
      uploader: "0xYOU...123",
      archiveHash: archiveHash,
    });
  };

  const onSubmit = (data: UploadFormValues) => {
    console.log("Minting artifact:", data);
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "Minting Successful!",
        description: `Your artifact "${data.name}" has been archived.`,
      });
      form.reset();
      setPreview(null);
      setImagePreviewUrl(null);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto">
      <PageHeader
        title="Archive an Artifact"
        description="Contribute to the museum by uploading and minting a piece of internet history as an NFT."
      />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Artifact Details</CardTitle>
            <CardDescription>Fill in the metadata for your digital artifact.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" onChange={() => updatePreview({})}>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Artifact File</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={(e) => {field.onChange(e.target.files); handleFileChange(e);}}/>
                            </label>
                        </div> 
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artifact Name</FormLabel>
                    <FormControl><Input placeholder="e.g., 'Numa Numa Dance'" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="era" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year or Era</FormLabel>
                    <FormControl><Input placeholder="e.g., '2004 Flash Era'" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["Meme", "Website", "Text", "UI", "Other"].map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the artifact's origin and significance..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
                <Button type="submit" className="w-full" disabled={isMinting}>
                  {isMinting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileArchive className="mr-2 h-4 w-4" />}
                  Mint Artifact NFT
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div>
          <h2 className="text-2xl font-bold tracking-tighter mb-4">Live Preview</h2>
          {preview?.name ? (
            <ArtifactCard artifact={preview as Artifact} />
          ) : (
            <Card className="flex flex-col items-center justify-center h-full min-h-[300px] border-dashed">
                <FileArchive className="h-16 w-16 text-muted-foreground/50"/>
                <p className="mt-4 text-muted-foreground">Your artifact preview will appear here.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

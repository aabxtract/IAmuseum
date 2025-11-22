import { notFound } from "next/navigation";
import Image from "next/image";
import { artifacts } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Share2, Twitter, Link as LinkIcon } from "lucide-react";

export default function ArtifactDetailPage({ params }: { params: { id: string } }) {
  const artifact = artifacts.find((a) => a.id === params.id);

  if (!artifact) {
    notFound();
  }

  const metadata = [
    { label: "Era", value: artifact.era },
    { label: "Mint Date", value: new Date(artifact.timestamp * 1000).toLocaleDateString() },
    { label: "Contributor", value: artifact.uploader },
    { label: "Archive Hash", value: artifact.archiveHash },
  ]

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <Card className="overflow-hidden border-2 border-accent/20 shadow-lg shadow-accent/10">
            <div className="relative aspect-video w-full">
              <Image
                src={artifact.imageUrl}
                alt={artifact.name}
                fill
                className="object-cover"
                data-ai-hint={artifact.imageHint}
              />
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <Badge variant="secondary" className="mb-2 w-fit">{artifact.category}</Badge>
                    <CardTitle className="text-3xl font-black tracking-tighter">{artifact.name}</CardTitle>
                    <CardDescription className="text-base">{artifact.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator />
                    <div className="space-y-2 text-sm text-muted-foreground">
                        {metadata.map(meta => (
                             <div key={meta.label} className="flex justify-between">
                                <span className="font-semibold text-foreground/80">{meta.label}:</span>
                                <span className="truncate font-mono text-xs">{meta.value}</span>
                            </div>
                        ))}
                    </div>
                    <Separator />
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
                        <Button variant="ghost" size="icon"><Twitter className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon"><LinkIcon className="h-4 w-4"/></Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Artifact } from "@/lib/types";

type ArtifactCardProps = {
  artifact: Artifact;
};

export function ArtifactCard({ artifact }: ArtifactCardProps) {
  return (
    <Link href={`/gallery/${artifact.id}`} className="group block">
      <Card className="h-full overflow-hidden crt-glow bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={artifact.imageUrl}
              alt={artifact.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={artifact.imageHint}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2 border-accent/50 text-accent font-bold text-xs uppercase tracking-wider">{artifact.category}</Badge>
          <CardTitle className="text-lg font-bold tracking-tight line-clamp-2">{artifact.name}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
          <p>Era: {artifact.era}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

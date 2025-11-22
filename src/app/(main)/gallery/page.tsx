import { PageHeader } from "@/components/page-header";
import { ArtifactCard } from "@/components/artifact-card";
import { artifacts } from "@/lib/data";

export default function GalleryPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="The Archive"
        description="A curated museum of digital artifacts. Explore the collected history of the internet, one fragment at a time."
      />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artifacts.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </div>
    </div>
  );
}

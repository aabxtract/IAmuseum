import { PageHeader } from "@/components/page-header";
import { artifacts } from "@/lib/data";
import { ArtifactCard } from "@/components/artifact-card";
import { cn } from "@/lib/utils";

// In a real app, these would be dynamically determined by votes
const featuredArtifactIds = ['6', '10', '12', '2'];

export default function MainHallPage() {
  const featuredArtifacts = artifacts.filter(a => featuredArtifactIds.includes(a.id));

  return (
    <div className="container mx-auto">
      <PageHeader
        title="The Main Hall"
        description="A curated collection of the most iconic and influential artifacts, as chosen by the DAO."
      />
      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2">
        {featuredArtifacts.map((artifact, index) => (
          <div key={artifact.id} className={cn("spotlight-effect rounded-lg p-4", index % 2 !== 0 && "sm:mt-16")}>
             <ArtifactCard artifact={artifact} />
          </div>
        ))}
      </div>
    </div>
  );
}

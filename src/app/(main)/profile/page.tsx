import { user, artifacts as allArtifacts, proposals as allProposals } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtifactCard } from "@/components/artifact-card";
import { Separator } from "@/components/ui/separator";
import { Trophy, Star, Vote } from "lucide-react";

export default function ProfilePage() {
  const userArtifacts = allArtifacts.filter(a => user.contributions.includes(a.id));
  const userVotes = user.votesCast.map(vote => {
    const proposal = allProposals.find(p => p.id === vote.proposalId);
    const option = proposal?.options.find(o => o.id === vote.optionId);
    return { proposal, option };
  });

  const stats = [
    { name: "Rank", value: user.archeologistRank, icon: Trophy },
    { name: "Contributions", value: user.contributions.length, icon: Star },
    { name: "Votes Cast", value: user.votesCast.length, icon: Vote },
  ];

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Curator Profile"
        description={`An overview of contributions and governance activity for wallet ${user.walletAddress}.`}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
              <CardDescription>Your participation in the DAO.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map(stat => (
                <div key={stat.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <stat.icon className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{stat.name}</span>
                  </div>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="artifacts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="artifacts">My Artifacts</TabsTrigger>
              <TabsTrigger value="votes">My Votes</TabsTrigger>
            </TabsList>
            <TabsContent value="artifacts" className="mt-4">
               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {userArtifacts.length > 0 ? (
                  userArtifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">No artifacts contributed yet.</p>
                )}
               </div>
            </TabsContent>
            <TabsContent value="votes">
                <Card>
                    <CardContent className="p-4 space-y-4">
                        {userVotes.length > 0 ? userVotes.map((vote, index) => (
                           vote.proposal && vote.option && (
                                <div key={index}>
                                    <p className="text-sm">
                                        Voted for <span className="font-bold text-accent">{vote.option.label}</span> in proposal: &quot;{vote.proposal.title}&quot;
                                    </p>
                                    {index < userVotes.length - 1 && <Separator className="mt-4" />}
                                </div>
                           )
                        )) : (
                            <p className="text-center text-muted-foreground">No votes cast yet.</p>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

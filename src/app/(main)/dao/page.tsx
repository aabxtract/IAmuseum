import { PageHeader } from "@/components/page-header";
import { proposals } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";

export default function DaoPage() {
  return (
    <div className="container mx-auto">
      <PageHeader
        title="DAO Governance"
        description="Participate in the curation of the museum. Your vote shapes the future of the archive."
      />

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="flex flex-col bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{proposal.title}</CardTitle>
                <Badge variant={proposal.status === 'active' ? 'default' : 'secondary'} className={proposal.status === 'active' ? 'bg-accent/80 text-accent-foreground' : ''}>
                  {proposal.status === 'active' ? <Clock className="mr-1 h-3 w-3" /> : <CheckCircle className="mr-1 h-3 w-3" />}
                  {proposal.status}
                </Badge>
              </div>
              <CardDescription>{proposal.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              {proposal.options.map((option) => {
                const percentage = proposal.totalVotes > 0 ? (option.votes / proposal.totalVotes) * 100 : 0;
                return (
                  <div key={option.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-muted-foreground">{Math.round(percentage)}% ({option.votes} votes)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Progress value={percentage} className="h-2 w-full" />
                        {proposal.status === 'active' && <Button size="sm" variant="outline">Vote</Button>}
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">Total Votes: {proposal.totalVotes}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

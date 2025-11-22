export type Artifact = {
  id: string;
  name: string;
  era: string;
  description: string;
  category: 'Meme' | 'Website' | 'Text' | 'UI' | 'Other';
  archiveHash: string;
  uploader: string;
  timestamp: number;
  imageUrl: string;
  imageHint: string;
};

export type Proposal = {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed';
  options: {
    id: string;
    label: string; // This can be an artifact ID or a general choice
    votes: number;
  }[];
  totalVotes: number;
};

export type User = {
  walletAddress: string;
  archeologistRank: string;
  participationScore: number;
  contributions: string[]; // array of artifact IDs
  votesCast: { proposalId: string; optionId: string }[];
};

// ChallengeObject.ts
export type Task = {
    description: string;
    completed: boolean;
  };

export type ChallengeObject = {
    id: string;
    name: string;
    description: string;
    time: string;
    tasks: Task[];
    type: string;
  };
  
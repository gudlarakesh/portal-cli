export class Task {
  id?:number;
  submissionId? : number;
  status?: string;
  attributes: {
    title: string;
    description: string;
    isDone: boolean;
    status: string;
  };
  relationships: {
    curriculum_task: {
      id: number;
    },
    organization_curriculum_task?: {
      id: number;
    }
  };
}

export interface CurriculumTask {
  id:number;
  attributes: {
    title: string;
    description: string;
    published: boolean;
  };
  type:string;
}

export class SubmittedTask {
  id:number;
  attributes: {
    status: string;
    status_changed_on: string;
    submissions_count: boolean;
  };
  relationships: {
    organization_curriculum_task: {
      id: number;
      type:string;
    },
    status_changed_by: {
      id: number;
      type:string;
    },
    user: {
      id: number;
      type:string;
    }
  };
  type:string;
}

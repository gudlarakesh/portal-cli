export enum AnswerType {
  string = 0,
  text = 1
}

export class Question {
  id?: number;
  text: string;
  answer_type?: any;
  answer?: string;
  solution?: string;
};

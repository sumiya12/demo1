export type PersonData = {

  _id: any;
  name: string;
  color:string;
  description: string;
  scores: Score[];
};
export interface Score {
    sprint: number;
    quarter: number;
    date: string;
    point: number ;
  }
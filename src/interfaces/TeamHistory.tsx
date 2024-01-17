export interface TeamHistory {
    memberID: number;
    teamID: number;
    startYear: number;
    startSem: string;
    endYear?: number;
    endSem?: string;
    priviledges?: string | "Member"; 
  }
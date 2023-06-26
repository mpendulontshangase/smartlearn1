import { createContext } from "react";

export interface IHomework {
    id: string;
    homeworkDescription?: string;
    due_Date: Date;
    grade: string;
    subject: string;
    file?: string; 
    teacher_Id: string;
    subjectDisplay?:[];
    gradeName?:string;
  }
  

export interface IHomeworkStateContext {
  readonly Update?: IHomework;
  readonly Create?: IHomework;
  readonly deletedHomeworkId?: string;
  readonly View?: IHomework[];
}

export const INITIAL_STATE: IHomeworkStateContext = {
  View: [],
  deletedHomeworkId: undefined,
  Update: undefined,
  Create: undefined,
};

export interface IHomeworkActionContext {
  UpdateHomework?: (payload: IHomework) => void;
  CreateHomework?: (payload: FormData) => void;
  DeleteHomework?: (payload: string) => void;
  ViewHomework?: () => void;
}

const HomeworkContext = createContext<IHomeworkStateContext>(INITIAL_STATE);

const HomeworkActionContext = createContext<IHomeworkActionContext>({
  UpdateHomework: undefined,
  CreateHomework: undefined,
  DeleteHomework: undefined,
  ViewHomework: undefined,
});

export { HomeworkContext, HomeworkActionContext };

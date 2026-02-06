export enum FormQuestionType {
  TEXT = "TEXT",
  SET = "SET"
}

export interface Header {
  id: string;
  question: string;
  type: FormQuestionType;
  answerSet?: string[]; // For SET type questions
  required?: boolean;
}

export interface RegistrationAnswer {
  id: string;
  value: string | string[]; // Array for multi-select SET questions
}

export interface RegistrationWithAnswers {
  id: string;
  user: {
    userId?: string;
    email: string;
  };
  data: RegistrationAnswer[];
  createdAt: string;
}

export interface RegistrationFormData {
  headers: Header[];
  registrations: RegistrationWithAnswers[];
}

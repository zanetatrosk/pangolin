export enum FormQuestionType {
  TEXT = "TEXT",
  SELECT = "SELECT",
  RADIO = "RADIO",
  CHECKBOX = "CHECKBOX",
  EMAIL = "EMAIL",
}

export interface FormQuestion {
  id: string;
  question: string;
  type: FormQuestionType;
  answerSet?: string[]; // For SELECT, RADIO, CHECKBOX
  required?: boolean;
}

export interface RegistrationAnswer {
  questionId: string;
  answer: string | string[]; // Array for CHECKBOX
}

export interface RegistrationWithAnswers {
  id: string;
  user: {
    userId?: string;
    email: string;
  };
  answers: RegistrationAnswer[];
  createdAt: string;
}

export interface RegistrationFormData {
  form: FormQuestion[];
  registrations: RegistrationWithAnswers[];
}

import { RsvpStatus } from "@/services/types";

export enum FormQuestionType {
  TEXT = "TEXT",
  SET = "SET"
}

export enum OrganizerAction {
  COPY_EMAIL = "COPY_EMAIL",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
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
  status: RsvpStatus;
}

export interface RegistrationFormData {
  headers: Header[];
  registrations: RegistrationWithAnswers[];
}

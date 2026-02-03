import { axiosInstance } from './axios';

export interface GoogleFormsAccessStatus {
  hasAccess: boolean;
}

export interface GoogleForm {
  formId: string;
  info: {
    title: string;
    description?: string;
  };
  items: Array<{
    questionItem?: {
      question: {
        questionId: string;
        required: boolean;
        choiceQuestion?: {
          type: string;
          options: Array<{ value: string }>;
        };
        textQuestion?: {
          paragraph: boolean;
        };
      };
    };
    title?: string;
  }>;
}

export interface GoogleFormResponse {
  responseId: string;
  createTime: string;
  lastSubmittedTime: string;
  answers: Record<string, {
    questionId: string;
    textAnswers?: {
      answers: Array<{ value: string }>;
    };
  }>;
}

export interface GoogleFormResponses {
  responses: GoogleFormResponse[];
}

/**
 * Check if user has granted Google Forms access
 */
export const checkFormsAccess = async (): Promise<GoogleFormsAccessStatus> => {
  const response = await axiosInstance.get<GoogleFormsAccessStatus>('/google-forms/access-status');
  return response.data;
};

/**
 * Get a Google Form by ID
 */
export const getGoogleForm = async (formId: string): Promise<GoogleForm> => {
  const response = await axiosInstance.get<GoogleForm>(`/google-forms/${formId}`);
  return response.data;
};

/**
 * Get form responses
 */
export const getGoogleFormResponses = async (formId: string): Promise<GoogleFormResponses> => {
  const response = await axiosInstance.get<GoogleFormResponses>(`/google-forms/${formId}/responses`);
  return response.data;
};

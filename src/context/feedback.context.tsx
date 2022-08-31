import { createContext, useContext, useState } from 'react';

export enum FeedbackType {
  ERROR = 'error',
  INFO='info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface Feedback {
  message: string,
  type: FeedbackType,
  open: boolean
}

export const FeedbackContext = createContext({
  feedback: {
    message: '',
    type: FeedbackType.INFO,
    open: false,
  } as Feedback,

  setFeedback: (values: Feedback) => {}
});

export const useFeedbackContext = () => useContext(FeedbackContext);

export function FeedbackProvider({ children }: { children: any }) {

  const [feedbackState, setFeedbackState] = useState<Feedback>({
    message: '',
    type: FeedbackType.INFO,
    open: false,
  });

  return (
    <FeedbackContext.Provider value={{ feedback: feedbackState, setFeedback: setFeedbackState }}>
      {children}
    </FeedbackContext.Provider>
  );
}

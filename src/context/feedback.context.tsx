import { createContext, useContext, useState } from 'react';

export const FeedbackContext = createContext({
  feedback: {
    message: '',
    error: false,
    open: false,
  },

  setFeedback: (values: any) => {}
});

export const useFeedbackContext = () => useContext(FeedbackContext);

export function FeedbackProvider({ children }: { children: any }) {

  const [feedbackState, setFeedbackState] = useState({
    message: '',
    error: false,
    open: false
  });

  return (
    <FeedbackContext.Provider value={{ feedback: feedbackState, setFeedback: setFeedbackState }}>
      {children}
    </FeedbackContext.Provider>
  );
}

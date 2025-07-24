"use client";

import { useUserback } from "@/context/userback";


const FeedbackButton = () => {
  const userbackInstance = useUserback();
  const handleClick = () => {
    if (userbackInstance) {
      userbackInstance.openForm();
    } else {
      console.warn("Userback is not ready yet");
    }
  };

  return <button onClick={handleClick}>Open Feedback</button>;
};

export default FeedbackButton;

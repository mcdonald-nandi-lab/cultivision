import { sendGAEvent } from "@next/third-parties/google";

type EventParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Track custom events in Google Analytics
 * @param eventName The name of the event to track
 * @param parameters Additional parameters to send with the event
 */
export const trackEvent = (
  eventName: string,
  parameters: EventParameters = {}
): void => {
  try {
    sendGAEvent(eventName, parameters);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

/**
 * Track button click events
 * @param buttonId Identifier for the button
 * @param buttonText Display text of the button
 * @param additionalParams Any additional parameters to track
 */
export const trackButtonClick = (
  buttonId: string,
  buttonText: string,
  additionalParams: EventParameters = {}
): void => {
  trackEvent("button_click", {
    button_id: buttonId,
    button_text: buttonText,
    ...additionalParams,
  });
};

/**
 * Track file download events
 * @param fileType Type of file being downloaded (e.g., 'pdf', 'csv')
 * @param fileName Name of the file being downloaded
 * @param fileSize Optional file size in bytes
 */
export const trackDownload = (
  fileType: string,
  fileName: string,
): void => {
  trackEvent("file_download", {
    file_type: fileType,
    file_name: fileName,
  });
};

/**
 * Track user behavior events
 * @param behaviorType Type of behavior being tracked
 * @param details Additional details about the behavior
 */
export const trackUserBehavior = (
  behaviorType: string,
  details: EventParameters = {}
): void => {
  trackEvent("user_behavior", {
    behavior_type: behaviorType,
    ...details,
  });
};

/**
 * Track page view events with custom dimensions
 * @param url URL of the page being viewed
 * @param pageTitle Title of the page being viewed
 */
export const trackPageView = (
  url: string,
  pageTitle: string,
): void => {
  trackEvent("page_view", {
    page_location: url,
    page_title: pageTitle,
  });
};

/**
 * Track form submissions
 * @param formId Identifier for the form
 * @param formName Name of the form
 */
export const trackFormSubmission = (
  formId: string,
  formName: string,
): void => {
  trackEvent("form_submission", {
    form_id: formId,
    form_name: formName,
  });
};

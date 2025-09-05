import { TeacherLevelType } from "../course";

export type SendNotificationPayload = {
  title: string;
  message: string;
  recipientType: NotificationRecipientType;
  type: NotificationType;
  teacherLevels?: TeacherLevelType[];
  schoolIds?: string[];
  countryIds?: string[];
};

export type NotificationRecipientType = "TEACHER" | "SCHOOL" | "COUNTRY";
export type NotificationType = "INFO" | "ALERT" | "WARNING" | "REMINDER";

export type NotificationResponse = {
  success: boolean;
  notificationsSent: number;
  recipientType: NotificationRecipientType;
};

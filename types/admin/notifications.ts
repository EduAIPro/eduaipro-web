import { TeacherLevelType } from "../course";

export type SendNotificationPayload = {
  title: string;
  message: string;
  recipientType?: NotificationRecipientType;
  type: NotificationType;
  teacherLevels?: TeacherLevelType[];
  schoolIds?: string[];
  countryIds?: string[];
  recipientIds?:string[]
};

export enum NotificationRecipient {
  TEACHER = "TEACHER",
  SCHOOL = "SCHOOL",
  COUNTRY = "COUNTRY",
}

export enum NotificationTypes {
  INFO = "INFO",
  ALERT = "ALERT",
  WARNING = "WARNING",
  REMINDER = "REMINDER",
}

export type NotificationRecipientType = "TEACHER" | "SCHOOL" | "COUNTRY";
export type NotificationType = "INFO" | "ALERT" | "WARNING" | "REMINDER";

export type NotificationResponse = {
  success: boolean;
  notificationsSent: number;
  recipientType: NotificationRecipientType;
};

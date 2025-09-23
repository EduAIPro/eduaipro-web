import {
  NotificationRecipient,
  NotificationTypes,
} from "@/types/admin/notifications";

export const messageTypes = [
  {
    label: "Info",
    value: NotificationTypes.INFO,
  },
  {
    label: "Alert",
    value: NotificationTypes.ALERT,
  },
  {
    label: "Reminder",
    value: NotificationTypes.REMINDER,
  },
  {
    label: "Warning",
    value: NotificationTypes.WARNING,
  },
];

export const recipientTypes = [
  {
    label: "Teacher",
    value: NotificationRecipient.TEACHER,
  },
  {
    label: "School",
    value: NotificationRecipient.SCHOOL,
  },
  {
    label: "Country",
    value: NotificationRecipient.COUNTRY,
  },
];

export const teachersList = [
  {
    label: "All Teachers",
    value: "all",
  },
  {
    label: "Primary School Teachers",
    value: "PRIMARY",
  },
  {
    label: "Secondary School Teachers",
    value: "SECONDARY",
  },
  {
    label: "Higher Institution Teachers",
    value: "TERTIARY",
  },
  {
    label: "Mentors",
    value: "MENTOR",
  },
  {
    label: "Teaching Assistants",
    value: "TEACHER_ASSISTANT",
  },
];

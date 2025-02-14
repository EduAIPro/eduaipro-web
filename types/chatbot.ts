// types.ts
interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
}

interface AttentionPopupProps {
  onClose: () => void;
}

interface AutoResizeTextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

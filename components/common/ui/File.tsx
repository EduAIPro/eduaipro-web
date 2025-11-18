import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import { useField, useFormikContext } from "formik";
import {
  File,
  FileAudio,
  FileText,
  FileVideo,
  Image as ImageIcon,
  X,
} from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";

interface FormFileInputProps {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  label?: string;
  placeholder?: string;
  note?: string;
  name: string;
  error?: string | null;
  className?: string;
  disabled?: boolean;
  accept?: string; // e.g., "image/*", ".pdf,.doc,.docx"
  maxSize?: number; // in MB
}

export default function FormFileInput({
  rightIcon,
  leftIcon,
  placeholder = "Choose a file...",
  label,
  name,
  className,
  error,
  note,
  disabled,
  accept,
  maxSize = 10, // Default 10MB
}: FormFileInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/"))
      return <ImageIcon className="w-4 h-4 text-grey-650" />;
    if (type.startsWith("video/"))
      return <FileVideo className="w-4 h-4 text-grey-650" />;
    if (type.startsWith("audio/"))
      return <FileAudio className="w-4 h-4 text-grey-650" />;
    if (type.includes("pdf") || type.includes("document"))
      return <FileText className="w-4 h-4 text-grey-650" />;
    return <File className="w-4 h-4 text-grey-650" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setFieldValue(name, null);
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      // You might want to set an error here
      console.error(`File size exceeds ${maxSize}MB limit`);
      return;
    }

    setSelectedFile(file);
    setFieldValue(name, file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFieldValue(name, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`${className}`}>
      {label && (
        <p className="font-medium text-base mb-1 text-grey-650">{label}</p>
      )}

      <div
        className={cn(
          "shadow-lg !shadow-grey-2 flex items-center gap-x-3 py-2 px-2 w-full border rounded-lg cursor-pointer transition-all",
          error ? "border-red-400" : "border-grey-4/50",
          isFocused || isDragging
            ? "border-brand-1001 transition-colors duration-300 border-[1.5px]"
            : "",
          disabled ? "opacity-50 cursor-not-allowed" : "hover:border-grey-6"
        )}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {leftIcon ? (
          <div
            className={cn(
              "py-1 px-[6px] rounded-lg",
              error ? "bg-red-100/50" : "bg-blue-500/10"
            )}
          >
            {leftIcon}
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="hidden"
        />

        <div className="flex-1 flex items-center justify-between">
          {selectedFile ? (
            <div className="flex items-center gap-2">
              {getFileIcon(selectedFile)}
              <span className="text-base text-grey-12 truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              <span className="text-sm text-grey-9">
                ({formatFileSize(selectedFile.size)})
              </span>
            </div>
          ) : (
            <span className="text-base text-grey-9">
              {isDragging ? "Drop file here..." : placeholder}
            </span>
          )}

          {selectedFile && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
              className="p-1 hover:bg-grey-2 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-grey-650" />
            </button>
          )}
        </div>

        {rightIcon && !selectedFile && rightIcon}
      </div>

      {note ? <span className="text-sm text-grey-9">{note}</span> : null}

      {error ? (
        <div className="mt-2">
          <p className="text-sm text-error-600">{error}</p>
        </div>
      ) : null}
    </div>
  );
}

import React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseUploadFieldProps {
  label: string;
  hint?: string;
  acceptType: string;
  uploadText: string;
  onChange: (file: File | null) => void;
  className?: string;
}

const CourseUploadField: React.FC<CourseUploadFieldProps> = ({
  label,
  hint,
  acceptType,
  uploadText,
  onChange,
  className,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onChange(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-sm text-gray-500">{hint}</p>}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
          isDragging
            ? "border-teal-500 bg-teal-50"
            : "border-gray-300 hover:border-gray-400",
          "min-h-[116px] flex flex-col items-center justify-center"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept={acceptType}
          onChange={handleChange}
        />
        <div className="bg-gray-100 rounded-full p-2 mb-2">
          <UploadCloud className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">
          {file ? file.name : uploadText}
        </p>
      </div>
    </div>
  );
};

export default CourseUploadField;

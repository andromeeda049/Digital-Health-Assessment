import React from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadButtonProps {
  fileName: string | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  id: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ fileName, onFileSelect, onClear, id }) => (
  <div className="flex items-center mt-3 sm:mt-0">
    <input
      type="file"
      id={id}
      className="hidden"
      onChange={onFileSelect}
    />
    {!fileName ? (
      <label
        htmlFor={id}
        className="group flex items-center gap-2 cursor-pointer text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium"
      >
        <div className="p-1.5 rounded-md border border-slate-200 group-hover:border-teal-500 transition-colors">
          <Upload size={14} />
        </div>
        <span className="underline decoration-dotted underline-offset-4">แนบหลักฐาน</span>
      </label>
    ) : (
      <div className="flex items-center gap-2 bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md text-sm border border-slate-200 animate-fade-in">
        <File size={14} className="text-teal-500" />
        <span className="max-w-[150px] truncate font-medium" title={fileName}>{fileName}</span>
        <button onClick={onClear} className="text-slate-400 hover:text-rose-500 ml-1 transition-colors">
          <X size={14} />
        </button>
      </div>
    )}
  </div>
);

export default FileUploadButton;
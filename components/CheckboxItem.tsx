import React from 'react';
import { FileText, Check, X } from 'lucide-react';
import FileUploadButton from './FileUploadButton';
import { AssessmentItem } from '../types';

interface CheckboxItemProps<T> {
  label: string;
  stateKey: keyof T;
  stateObj: T;
  setStateObj: React.Dispatch<React.SetStateAction<T>>;
  evidence: string;
}

const CheckboxItem = <T extends Record<string, AssessmentItem>>({ 
  label, 
  stateKey, 
  stateObj, 
  setStateObj, 
  evidence 
}: CheckboxItemProps<T>) => {
  const item = stateObj[stateKey as string];
  const uniqueId = `file-${String(stateKey)}`;
  const isPass = item.status === 'pass';
  const isFail = item.status === 'fail';

  const updateAssessmentState = (field: keyof AssessmentItem, value: any) => {
    setStateObj({
      ...stateObj,
      [stateKey]: { ...item, [field]: value }
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateAssessmentState('fileName', file.name);
    }
  };

  return (
    <div className="group flex flex-col md:flex-row md:items-start justify-between py-5 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors px-4 -mx-4 rounded-lg">
      <div className="mb-4 md:mb-0 md:w-1/2 pr-6">
        <p className="font-medium text-slate-800 text-base">{label}</p>
        <p className="text-xs text-slate-400 mt-1.5 flex items-start gap-1.5 font-light">
          <FileText size={12} className="mt-0.5" />
          {evidence}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center md:w-1/2 justify-end">
        <div className="flex gap-2">
          <button
            onClick={() => updateAssessmentState('status', 'pass')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${isPass ? 'bg-teal-600 border-teal-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-teal-200 hover:text-teal-600'}`}
          >
            <Check size={14} strokeWidth={3} className={isPass ? 'opacity-100' : 'opacity-0 w-0'} /> ผ่าน
          </button>
          <button
            onClick={() => updateAssessmentState('status', 'fail')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${isFail ? 'bg-rose-500 border-rose-500 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600'}`}
          >
            <X size={14} strokeWidth={3} className={isFail ? 'opacity-100' : 'opacity-0 w-0'} /> ไม่ผ่าน
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200 hidden sm:block mx-2"></div>

        <FileUploadButton 
          id={uniqueId}
          fileName={item.fileName}
          onFileSelect={handleFileSelect}
          onClear={() => updateAssessmentState('fileName', null)}
        />
      </div>
    </div>
  );
};

export default CheckboxItem;
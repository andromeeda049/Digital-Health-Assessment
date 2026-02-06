import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, FileText, HelpCircle, Upload, File } from 'lucide-react';
import { AssessmentItem, CriteriaData } from '../types';

interface CheckboxItemProps<T> {
  data: CriteriaData;
  stateObj: T;
  setStateObj: React.Dispatch<React.SetStateAction<T>>;
}

const CheckboxItem = <T extends Record<string, AssessmentItem>>({ 
  data,
  stateObj, 
  setStateObj, 
}: CheckboxItemProps<T>) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // Helper to update state for a specific sub-item
  const updateItemState = (id: string, field: keyof AssessmentItem, value: any) => {
    const currentItem = stateObj[id] || { status: null, fileName: null };
    setStateObj({
      ...stateObj,
      [id]: { ...currentItem, [field]: value }
    });
  };

  const handleFileSelect = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateItemState(id, 'fileName', file.name);
    }
  };

  // Calculate summary stats
  const totalItems = data.subItems.length;
  const passedItems = data.subItems.filter(sub => stateObj[sub.id]?.status === 'pass').length;
  const isAllPassed = totalItems > 0 && passedItems === totalItems;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm transition-all">
      
      {/* --- Main Header Row --- */}
      <div className="p-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className={`mt-1 p-2 rounded-lg ${isAllPassed ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'}`}>
                {isAllPassed ? <Check size={20} /> : <FileText size={20} />}
            </div>
            <div>
                <h3 className="font-semibold text-slate-800 text-lg">{data.label}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <button 
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        className="text-xs flex items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors font-medium bg-slate-50 px-2 py-1 rounded-md"
                    >
                        <HelpCircle size={12} />
                        {isDescriptionOpen ? 'ซ่อนคำอธิบาย' : 'คำอธิบาย'}
                    </button>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-400">{passedItems}/{totalItems} ผ่านเกณฑ์</span>
                </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center self-end md:self-center">
             <button 
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isDetailsOpen ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'}`}
             >
                {isDetailsOpen ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
                {isDetailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
             </button>
        </div>
      </div>

      {/* --- Description Section (Collapsible) --- */}
      {isDescriptionOpen && (
          <div className="px-4 pb-4 animate-fade-in">
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg text-sm text-slate-600 leading-relaxed">
                  <h4 className="font-bold text-blue-800 mb-1 text-xs uppercase tracking-wide">คำชี้แจง / วัตถุประสงค์</h4>
                  <p className="whitespace-pre-line">{data.description}</p>
              </div>
          </div>
      )}

      {/* --- Sub-Items List (Collapsible via Details) --- */}
      {isDetailsOpen && (
        <div className="border-t border-slate-100 bg-slate-50/30">
            {data.subItems.map((subItem, index) => {
                const itemState = stateObj[subItem.id] || { status: null, fileName: null };
                const isPass = itemState.status === 'pass';
                const isFail = itemState.status === 'fail';

                return (
                    <div key={subItem.id} className={`p-4 border-b border-slate-100 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            
                            {/* Left: Content */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-xs font-mono text-slate-400 mt-1">{index + 1}.</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-700">{subItem.label}</h4>
                                        <p className="text-sm text-slate-500 mt-1 font-light">{subItem.description}</p>
                                        {subItem.evidence && (
                                            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded text-[10px] text-slate-500 border border-slate-200">
                                                <FileText size={10} />
                                                หลักฐาน: {subItem.evidence}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-[280px] justify-end">
                                {/* Status Buttons */}
                                <div className="flex bg-white rounded-md shadow-sm border border-slate-200 p-0.5">
                                    <button
                                        onClick={() => updateItemState(subItem.id, 'status', 'pass')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${isPass ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-400 hover:text-teal-600 hover:bg-slate-50'}`}
                                    >
                                        <Check size={12} strokeWidth={3} /> ผ่าน
                                    </button>
                                    <button
                                        onClick={() => updateItemState(subItem.id, 'status', 'fail')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${isFail ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-rose-600 hover:bg-slate-50'}`}
                                    >
                                        <X size={12} strokeWidth={3} /> ไม่ผ่าน
                                    </button>
                                </div>

                                {/* File Upload */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        id={`upload-${subItem.id}`}
                                        className="hidden"
                                        onChange={(e) => handleFileSelect(subItem.id, e)}
                                    />
                                    {!itemState.fileName ? (
                                        <label
                                            htmlFor={`upload-${subItem.id}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs text-slate-500 hover:border-teal-400 hover:text-teal-600 cursor-pointer transition-colors shadow-sm"
                                        >
                                            <Upload size={12} /> แนบไฟล์
                                        </label>
                                    ) : (
                                        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3 py-1.5 rounded-md text-xs">
                                            <File size={12} />
                                            <span className="max-w-[80px] truncate" title={itemState.fileName}>{itemState.fileName}</span>
                                            <button 
                                                onClick={() => updateItemState(subItem.id, 'fileName', null)}
                                                className="text-teal-400 hover:text-rose-500 ml-1"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      )}
    </div>
  );
};

export default CheckboxItem;
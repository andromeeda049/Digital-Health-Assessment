import React, { useState } from 'react';
import { 
  Shield, Users, Server, Printer, Plus, Trash2, 
  Upload, File, X, Building, CalendarCheck, BarChart3, Radio
} from 'lucide-react';
import CheckboxItem from './components/CheckboxItem';
import { 
  Asset, AssessmentItem, AssessmentState, CriteriaData 
} from './types';

// --- Data Content Constants (Based on PDF) ---

const DATA_WORKFORCE: CriteriaData[] = [
    {
        id: 'workforce_dev',
        label: 'การพัฒนาศักยภาพบุคลากรด้านสุขภาพดิจิทัล',
        description: 'ติดตามการจัดตั้งคณะกรรมการและการพัฒนาศักยภาพบุคลากรตามหลักสูตร Digital Health ในระบบ MOPH Academy',
        subItems: [
            { id: 'wf_1', label: '1. การจัดตั้งคณะกรรมการ', description: 'มีคำสั่งแต่งตั้ง "คณะกรรมการพัฒนาบุคลากรด้านสุขภาพดิจิทัล" องค์ประกอบ: ผู้บริหาร, HR, แผนงาน, IT, ตัวแทนวิชาชีพ', evidence: 'คำสั่งแต่งตั้ง (PDF)' },
            { id: 'wf_2', label: '2. กลุ่มเป้าหมายที่ 1 (ผู้บริหารระดับสูง & หัวหน้ากลุ่มงาน)', description: 'เข้าอบรมใน MOPH Academy หรือหลักสูตรที่กลุ่มงานสุขภาพดิจิทัลจัดขึ้น อย่างน้อย 1 หลักสูตรต่อคน (ครบ 100%)', evidence: 'ใบประกาศนียบัตร (Certificate) ครบทุกคน' },
            { id: 'wf_3', label: '3. กลุ่มเป้าหมายที่ 2 (บุคลากรด้านสุขภาพดิจิทัล/IT)', description: 'เข้าอบรม MOPH Academy (เช่น Cybersecurity, AI) อย่างน้อย 3 หลักสูตรต่อคน (ครบ 100%)', evidence: 'ใบประกาศนียบัตร (Certificate) ครบทุกคน' },
            { id: 'wf_4', label: '4. กลุ่มเป้าหมายที่ 3 (บุคลากรทั่วไป)', description: 'เข้าอบรม MOPH Academy หรือหลักสูตรที่เกี่ยวข้อง อย่างน้อย 1 หลักสูตรต่อคน (ผ่านร้อยละ 80 ของบุคลากรทั้งหมด)', evidence: 'ทะเบียนรายชื่อ หรือรวบรวมใบ Certificate' },
            { id: 'wf_5', label: '5. นวัตกรรมสุขภาพดิจิทัล', description: 'มีการพัฒนานวัตกรรมสุขภาพดิจิทัล ให้ คปสอ.มีอย่างน้อย 1 ผลงาน และมีการส่งผลงานร่วมนำเสนอในระดับจังหวัด', evidence: 'เล่มผลงาน หรือหลักฐานการส่งผลงาน' }
        ]
    }
];

const DATA_APPOINTMENT: CriteriaData[] = [
    {
        id: 'online_appointment',
        label: 'การจัดบริการนัดหมายออนไลน์ (Online Appointment)',
        description: 'หน่วยบริการจัดให้มีระบบนัดหมายออนไลน์ในคลินิกเป้าหมาย',
        subItems: [
            { id: 'appt_1_1', label: '1. คลินิกนัดหมายออนไลน์ (รพ.)', description: 'รพ.เปิดให้บริการนัดหมายออนไลน์อย่างน้อย 4 คลินิกเป้าหมาย', evidence: 'ภาพหน้าจอระบบนัดหมาย' },
            { id: 'appt_1_2', label: '2. สัดส่วนการจอง Slot (รพ.)', description: 'เปิด Slot ให้ Walk-in จองได้ไม่น้อยกว่าร้อยละ 10 (6 เดือน) / 20 (12 เดือน)', evidence: 'รายงานสรุปการนัดหมาย' }
        ]
    }
];

const DATA_SMART: CriteriaData[] = [
    {
        id: 'smart_pcu',
        label: 'แบบประเมินตนเอง Smart รพ.สต. (Smart PCU Assessment)',
        description: 'เพื่อประเมินประสิทธิภาพกระบวนการบริหารจัดการและการให้บริการประชาชน',
        subItems: [
            { id: 'smart_pcu_plan', label: 'แผนการดำเนินงานขับเคลื่อน Smart รพ.สต.', description: 'มีแผนการดำเนินงานขับเคลื่อนการพัฒนา Smart รพ.สต. ที่ชัดเจน', evidence: 'ไฟล์แผนการดำเนินงาน' },
            { id: 'smart_1_1', label: '1.1 ตัวตนดิจิทัล (Provider ID)', description: 'เจ้าหน้าที่ทุกคนลงทะเบียนและยืนยันตัวตนในระบบ Provider ID ครบ 100%', evidence: 'ภาพหน้าจอ Profile ในระบบ Provider ID' },
            { id: 'smart_1_2', label: '1.2 การสื่อสารองค์กร', description: 'มีกลุ่ม LINE ภายใน และมีช่องทางสื่อสารประชาชน (Page/Line OA)', evidence: 'ภาพหน้าจอแชทกลุ่ม หรือหน้าเพจ' },
            { id: 'smart_1_3', label: '1.3 สารบรรณอิเล็กทรอนิกส์', description: 'ใช้ระบบสารบรรณอิเล็กทรอนิกส์ หรืออีเมลในการรับส่งงานแทนกระดาษ', evidence: 'ภาพหน้าจอการรับ-ส่งหนังสือ' },
            { id: 'smart_1_4', label: '1.4 นโยบาย PDPA', description: 'มีประกาศนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA Policy) เป็นลายลักษณ์อักษร', evidence: 'ไฟล์ประกาศนโยบายที่ลงนามแล้ว' },
            { id: 'smart_2_1', label: '2.1 ยืนยันตัวตน (Authen)', description: 'ใช้เครื่อง Smart Card Reader เสียบยืนยันตัวตนผู้ป่วย (Authen Code) ทุกราย', evidence: 'ภาพถ่ายขณะเสียบบัตร ปชช. ให้บริการ' },
            { id: 'smart_2_2', label: '2.2 นัดหมาย & คิว', description: 'มีระบบรับนัดหมายล่วงหน้า (Line/โทร) และเตรียมแฟ้มประวัติไว้ก่อน', evidence: 'ภาพสมุดนัด หรือแชทการนัดหมาย' },
            { id: 'smart_2_3', label: '2.3 แพทย์ทางไกล (Telemedicine)', description: 'มีจุด/อุปกรณ์ พร้อม Video Call ปรึกษาแพทย์ รพ.แม่ข่ายได้ทันทีเมื่อจำเป็น', evidence: 'ภาพถ่ายจุดให้บริการ Telemedicine' },
            { id: 'smart_2_4', label: '2.4 เยี่ยมบ้าน/ส่งยา', description: 'ใช้ App บันทึกข้อมูลเยี่ยมบ้าน หรือมีระบบส่งยาให้ผู้ป่วย', evidence: 'ภาพหน้าจอ App หรือภาพการส่งยา' }
        ]
    },
    {
        id: 'smart_hospital',
        label: 'เกณฑ์มาตรฐาน Smart Hospital (สำหรับ รพ.)',
        description: 'ดำเนินการตามเกณฑ์โรงพยาบาลอัจฉริยะ (Smart Hospital) ครอบคลุมด้าน Infrastructure, Management และ Service',
        subItems: [
            { id: 'smart_hosp_1', label: 'การประเมินตนเอง (Mandatory Criteria)', description: 'ผ่านเกณฑ์จำเป็นทุกข้อในด้าน Infrastructure, Management และ Service และผ่านเกณฑ์ขั้นต่ำระดับทอง', evidence: 'รายงานผลการประเมิน' }
        ]
    }
];

const DATA_CYBER: CriteriaData[] = [
    {
        id: 'hospital_cyber',
        label: 'เกณฑ์มาตรฐานความมั่นคงปลอดภัยไซเบอร์ (CTAM+) สำหรับ รพ.',
        description: 'การประเมินความมั่นคงปลอดภัยไซเบอร์ตามมาตรฐาน CTAM+',
        subItems: [
            { id: 'ctam_plus_assess', label: 'การประเมินตนเอง (CTAM+)', description: 'รพ. ประเมินตนเองผ่านเกณฑ์มาตรฐานความมั่นคงปลอดภัยไซเบอร์ (CTAM+)', evidence: 'ผลการประเมินจากระบบ' }
        ]
    },
    {
        id: 'cyber_checklist',
        label: 'แบบประเมินความมั่นคงปลอดภัยไซเบอร์ (Cybersecurity Checklist) สำหรับ รพ.สต.',
        description: 'ตรวจสอบความปลอดภัยพื้นฐานของอุปกรณ์และข้อมูล',
        subItems: [
            { id: 'cyber_1_1', label: '1.1 อัปเดตวินโดวส์ (OS Patching)', description: 'คอมพิวเตอร์ใช้งานหลักได้รับการอัปเดต Windows เป็นปัจจุบัน', evidence: 'ภาพหน้าจอ Windows Update' },
            { id: 'cyber_1_2', label: '1.2 ป้องกันไวรัส (Antivirus)', description: 'ทุกเครื่องมี Antivirus (หรือ Windows Defender) เปิดใช้งาน สถานะสีเขียว', evidence: 'ภาพหน้าจอ Antivirus' },
            { id: 'cyber_1_3', label: '1.3 ซอฟต์แวร์ (Software)', description: 'โปรแกรมสำคัญ (JHCIS/HosXP, Browser) เป็นเวอร์ชันล่าสุดเสมอ', evidence: 'ภาพหน้าจอ About ของโปรแกรม' },
            { id: 'cyber_2_1', label: '2.1 การสำรองข้อมูล (Backup)', description: 'สำรองข้อมูลใส่ External HDD และถอดเก็บแยกทันทีหลังทำเสร็จ (Offline)', evidence: 'ภาพถ่ายอุปกรณ์ที่ถอดวางไว้' },
            { id: 'cyber_2_2', label: '2.2 ความเป็นส่วนตัว (Privacy)', description: 'ไม่มีการแปะกระดาษจดรหัสผ่าน (Password) ไว้ที่หน้าจอ/ใต้คีย์บอร์ด', evidence: 'ภาพถ่ายหน้าจอคอมพิวเตอร์' },
            { id: 'cyber_3_1', label: '3.1 อินเทอร์เน็ตสำรอง', description: 'มีแนวทาง/อุปกรณ์สำรอง (เช่น Hotspot มือถือ) หากเน็ตหลักล่ม', evidence: 'ภาพถ่ายการทดสอบเน็ตสำรอง' }
        ]
    }
];

const DATA_RESOURCE: CriteriaData[] = [
    {
        id: 'erp_connect',
        label: 'การเชื่อมต่อข้อมูลระบบ ERP กระทรวง',
        description: 'เชื่อมต่อข้อมูลกับระบบ Enterprise Resources Planning (ERP) ของกระทรวงสาธารณสุข',
        subItems: [
             { id: 'erp_1', label: 'การเชื่อมต่อ ERP (เฉพาะ รพ.)', description: 'เชื่อมต่อข้อมูลครบตามโมดูลที่กำหนด และสถานะเป็นออนไลน์', evidence: 'ภาพหน้าจอสถานะการเชื่อมต่อ' },
             { id: 'resource_survey', label: 'การรายงานข้อมูลทรัพยากร (ทุกหน่วยงาน)', description: 'รายงานทุกหน่วยงานผ่านการบันทึก บัญชีทรัพย์สินคอมพิวเตอร์ หรือนำเข้าไฟล์ template', evidence: 'รายงานจากระบบ' }
        ]
    }
];

const App = () => {
  const [activeTab, setActiveTab] = useState<string>('workforce');
  const [showPrintView, setShowPrintView] = useState<boolean>(false);
  const [hospitalName, setHospitalName] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  
  // Helper to initialize state from DATA constants
  const initializeState = (data: CriteriaData[]): AssessmentState => {
    const initialState: AssessmentState = {};
    data.forEach(group => {
      group.subItems.forEach(sub => {
        initialState[sub.id] = { status: null, fileName: null };
      });
    });
    return initialState;
  };

  // --- State Definitions ---
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, code: '', type: 'PC', user: '', spec: '', status: 'normal', fileName: null }
  ]);

  const [workforce, setWorkforce] = useState<AssessmentState>(initializeState(DATA_WORKFORCE));
  const [appointment, setAppointment] = useState<AssessmentState>(initializeState(DATA_APPOINTMENT));
  const [resource, setResource] = useState<AssessmentState>(initializeState(DATA_RESOURCE));
  const [smartStandard, setSmartStandard] = useState<AssessmentState>(initializeState(DATA_SMART));
  const [cyber, setCyber] = useState<AssessmentState>(initializeState(DATA_CYBER));

  // --- Asset Handlers ---
  const handleAssetChange = (id: number, field: keyof Asset, value: any) => {
    setAssets(assets.map(asset => asset.id === id ? { ...asset, [field]: value } : asset));
  };

  const handleAssetFileChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAssets(assets.map(asset => asset.id === id ? { ...asset, fileName: file.name } : asset));
    }
  };

  const addAsset = () => {
    setAssets([...assets, { id: Date.now(), code: '', type: 'PC', user: '', spec: '', status: 'normal', fileName: null }]);
  };

  const removeAsset = (id: number) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  // --- Render Sections ---

  const renderHeader = () => (
    <div className="mb-12 pt-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Building size={18} />
             </div>
             <span className="text-xs font-bold tracking-wider text-teal-600 uppercase">Satun Provincial Public Health Office</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
            ระบบประเมิน<span className="font-semibold">สุขภาพดิจิทัล</span>
          </h1>
          <p className="mt-2 text-slate-500 font-light">การขับเคลื่อนการพัฒนาด้านสุขภาพดิจิทัล ประจำปีงบประมาณ 2569</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm w-full md:w-auto min-w-[200px] focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">หน่วยงาน</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent text-slate-800 text-sm font-medium focus:outline-none placeholder-slate-300"
                  placeholder="เช่น รพ.สต. ควนโดน"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
            </div>
             <div className="bg-white px-4 py-2 border border-slate-200 rounded-lg shadow-sm w-full md:w-auto min-w-[150px] focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">อำเภอ</label>
                <div className="relative">
                  <select 
                    className="w-full bg-transparent text-slate-800 text-sm font-medium focus:outline-none cursor-pointer appearance-none pr-4" 
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option value="">เลือกอำเภอ</option>
                    <option value="เมืองสตูล">เมืองสตูล</option>
                    <option value="ควนโดน">ควนโดน</option>
                    <option value="ควนกาหลง">ควนกาหลง</option>
                    <option value="ท่าแพ">ท่าแพ</option>
                    <option value="ละงู">ละงู</option>
                    <option value="ทุ่งหว้า">ทุ่งหว้า</option>
                    <option value="มะนัง">มะนัง</option>
                  </select>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => {
    const tabs = [
      { id: 'workforce', label: '1. Digital Workforce', icon: Users },
      { id: 'appointment', label: '2. นัดหมายออนไลน์', icon: CalendarCheck },
      { id: 'resource', label: '3. ทรัพยากร & ERP', icon: BarChart3 },
      { id: 'smart', label: '4. Smart Standards', icon: Radio },
      { id: 'cyber', label: '5. Cybersecurity', icon: Shield },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-8 no-print border-b border-slate-200 pb-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-all relative top-[1px] ${
                isActive 
                  ? 'text-teal-700 border-b-2 border-teal-600 bg-teal-50/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={16} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  };

  const renderAssetTable = () => (
    <div className="animate-fade-in mt-12 mb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
           <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Asset Inventory</span>
           <h2 className="text-2xl font-semibold text-slate-800 mt-1">บัญชีทรัพย์สินคอมพิวเตอร์</h2>
        </div>
        <button onClick={addAsset} className="flex items-center gap-2 text-teal-600 hover:text-white border border-teal-200 hover:bg-teal-600 px-4 py-2 rounded-full transition-all text-sm font-medium no-print shadow-sm">
          <Plus size={16} /> เพิ่มรายการ
        </button>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-semibold text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-16 text-center">#</th>
                <th className="px-6 py-4 min-w-[150px]">รหัส/ชื่อเครื่อง</th>
                <th className="px-6 py-4 min-w-[120px]">ประเภท</th>
                <th className="px-6 py-4 min-w-[150px]">ผู้ใช้งาน / ที่ตั้ง</th>
                <th className="px-6 py-4 min-w-[120px]">สถานะ</th>
                <th className="px-6 py-4 text-center min-w-[100px]">หลักฐาน</th>
                <th className="px-4 py-4 w-12 no-print"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assets.map((item, index) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-center text-slate-400 font-mono text-xs">{index + 1}</td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" 
                      value={item.code}
                      onChange={(e) => handleAssetChange(item.id, 'code', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-700 font-medium placeholder-slate-300 focus:outline-none"
                      placeholder="ระบุรหัสครุภัณฑ์"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={item.type}
                      onChange={(e) => handleAssetChange(item.id, 'type', e.target.value)}
                      className="bg-transparent border-none focus:ring-0 p-0 text-slate-600 cursor-pointer w-full focus:outline-none"
                    >
                      <option value="PC">PC (ตั้งโต๊ะ)</option>
                      <option value="NB">Notebook</option>
                      <option value="AiO">All-in-One</option>
                      <option value="Printer">Printer</option>
                      <option value="Tablet">Tablet</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" 
                      value={item.user}
                      onChange={(e) => handleAssetChange(item.id, 'user', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-600 placeholder-slate-300 focus:outline-none"
                      placeholder="ชื่อ/ห้อง"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={item.status}
                      onChange={(e) => handleAssetChange(item.id, 'status', e.target.value)}
                      className={`bg-transparent border-none focus:ring-0 p-0 font-medium cursor-pointer focus:outline-none ${item.status === 'normal' ? 'text-teal-600' : 'text-rose-500'}`}
                    >
                      <option value="normal">ใช้งานปกติ</option>
                      <option value="broken">ชำรุด</option>
                      <option value="unused">ไม่ได้ใช้งาน</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <label className="cursor-pointer text-slate-300 hover:text-teal-500 transition-colors">
                          <input type="file" className="hidden" onChange={(e) => handleAssetFileChange(item.id, e)} />
                          {item.fileName ? <File size={16} className="text-teal-500" /> : <Upload size={16} />}
                      </label>
                    </div>
                    {item.fileName && <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[80px] mx-auto">{item.fileName}</div>}
                  </td>
                  <td className="px-4 py-4 text-center no-print">
                    {assets.length > 1 && (
                      <button onClick={() => removeAsset(item.id)} className="text-slate-200 hover:text-rose-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGenericForm = (
    title: string, 
    subtitle: string, 
    data: CriteriaData[],
    stateObj: AssessmentState,
    setStateObj: React.Dispatch<React.SetStateAction<AssessmentState>>
  ) => (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Assessment Activity</span>
        <h2 className="text-3xl font-light text-slate-900 mt-2">{title}</h2>
        <p className="text-slate-500 mt-2 font-light">{subtitle}</p>
      </div>
      
      <div>
        {data.map((item) => (
            <React.Fragment key={item.id}>
              <CheckboxItem
                  data={item}
                  stateObj={stateObj}
                  setStateObj={setStateObj}
              />
            </React.Fragment>
        ))}
      </div>
    </div>
  );

  // Helper for print view mapping
  const renderPrintSection = (title: string, data: CriteriaData[], stateObj: AssessmentState) => (
      <section>
        <h3 className="font-bold text-slate-900 border-l-4 border-teal-600 pl-3 mb-4 text-sm">{title}</h3>
        <ul className="text-xs space-y-2">
            {data.map(group => (
                <li key={group.id} className="mb-3">
                    <div className="font-semibold text-slate-700 mb-1">{group.label}</div>
                    <ul className="pl-4 space-y-1 border-l border-slate-200 ml-1">
                        {group.subItems.map(sub => {
                            const status = stateObj[sub.id]?.status;
                            return (
                                <li key={sub.id} className="flex justify-between items-start">
                                    <span className="text-slate-600 w-3/4">{sub.label}</span>
                                    <span className={status === 'pass' ? 'text-teal-600 font-bold' : status === 'fail' ? 'text-rose-500' : 'text-slate-300'}>
                                        {status === 'pass' ? 'ผ่าน' : status === 'fail' ? 'ไม่ผ่าน' : '-'}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    </section>
  );

  const renderPrintView = () => (
    <div className="bg-white p-12 w-full mx-auto print-content text-slate-800 font-sarabun h-full">
      <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
             <Building size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">สำนักงานสาธารณสุขจังหวัดสตูล</h2>
            <p className="text-slate-500 text-sm">Satun Provincial Public Health Office</p>
          </div>
        </div>
        <div className="text-right">
            <h1 className="text-2xl font-light text-slate-900">รายงานผลการประเมินตนเอง</h1>
            <p className="text-slate-400 text-sm mt-1">ประจำปีงบประมาณ พ.ศ. 2569</p>
        </div>
      </div>

      <div className="mb-12 flex gap-12 text-sm">
         <div className="flex-1">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">หน่วยงาน</span>
            <div className="border-b border-slate-200 pb-2 font-medium">{hospitalName || '-'}</div>
         </div>
         <div className="flex-1">
            <span className="block text-xs font-bold text-slate-400 uppercase mb-1">อำเภอ</span>
            <div className="border-b border-slate-200 pb-2 font-medium">{district || '-'}</div>
         </div>
      </div>

      <div className="space-y-8">
        {renderPrintSection('1. Digital Workforce', DATA_WORKFORCE, workforce)}
        {renderPrintSection('2. ระบบนัดหมายออนไลน์', DATA_APPOINTMENT, appointment)}
        {renderPrintSection('3. ทรัพยากรสุขภาพดิจิทัล & ERP', DATA_RESOURCE, resource)}
        {renderPrintSection('4. เกณฑ์มาตรฐาน Smart Hospital/PCU', DATA_SMART, smartStandard)}
        {renderPrintSection('5. ความมั่นคงปลอดภัยไซเบอร์ (Cybersecurity)', DATA_CYBER, cyber)}
        
        {/* Assets */}
         <section>
            <h3 className="font-bold text-slate-900 border-l-4 border-slate-800 pl-3 mb-4 text-sm">บัญชีทรัพย์สิน ({assets.length})</h3>
            <table className="w-full text-xs text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2 font-medium">รหัส</th>
                        <th className="py-2 font-medium">ประเภท</th>
                        <th className="py-2 font-medium">ผู้ใช้งาน</th>
                        <th className="py-2 font-medium">สถานะ</th>
                        <th className="py-2 font-medium text-right">หลักฐาน</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {assets.map(item => (
                        <tr key={item.id}>
                            <td className="py-2">{item.code || '-'}</td>
                            <td className="py-2">{item.type}</td>
                            <td className="py-2">{item.user || '-'}</td>
                            <td className="py-2">{item.status === 'normal' ? 'ปกติ' : item.status === 'broken' ? 'ชำรุด' : 'ไม่ใช้งาน'}</td>
                            <td className="py-2 text-right text-slate-400">{item.fileName || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

      </div>

      <div className="mt-20 pt-8 border-t border-slate-100 flex justify-between px-10 text-center text-sm">
        <div>
           <div className="h-10 border-b border-slate-300 w-48 mb-2"></div>
           <p className="font-bold text-slate-900">ผู้ประเมิน</p>
        </div>
        <div>
           <div className="h-10 border-b border-slate-300 w-48 mb-2"></div>
           <p className="font-bold text-slate-900">ผู้อำนวยการ</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-slate-600 pb-20">
      {!showPrintView ? (
        <div className="max-w-5xl mx-auto px-6">
          {renderHeader()}
          {renderTabs()}
          
          <div className="min-h-[500px]">
            {activeTab === 'workforce' && renderGenericForm('Digital Workforce', 'พัฒนาศักยภาพบุคลากรด้านสุขภาพดิจิทัล', DATA_WORKFORCE, workforce, setWorkforce)}
            {activeTab === 'appointment' && renderGenericForm('Online Appointment', 'ระบบนัดหมายออนไลน์', DATA_APPOINTMENT, appointment, setAppointment)}
            {activeTab === 'resource' && (
                <>
                    {renderGenericForm('Digital Resources & ERP', 'ทรัพยากรสุขภาพดิจิทัลและการเชื่อมต่อข้อมูล', DATA_RESOURCE, resource, setResource)}
                    {renderAssetTable()}
                </>
            )}
            {activeTab === 'smart' && renderGenericForm('Smart Hospital / Smart PCU', 'เกณฑ์มาตรฐานโรงพยาบาลอัจฉริยะ', DATA_SMART, smartStandard, setSmartStandard)}
            {activeTab === 'cyber' && renderGenericForm('Cybersecurity Hygiene', 'ความมั่นคงปลอดภัยไซเบอร์ (CTAM+)', DATA_CYBER, cyber, setCyber)}
          </div>

          <div className="fixed bottom-8 right-8 z-50">
             <button 
              onClick={() => setShowPrintView(true)}
              className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-teal-600 transition-all font-medium tracking-wide"
            >
              <Printer size={20} /> <span className="hidden md:inline">Print Report</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-200 min-h-screen p-8 flex flex-col items-center overflow-auto">
          <div className="w-full max-w-[210mm] bg-white shadow-xl mb-8 min-h-[297mm]">
             {renderPrintView()}
          </div>
          <div className="fixed top-8 right-8 flex flex-col gap-3 no-print z-50">
            <button onClick={() => window.print()} className="bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-teal-600 shadow-lg transition-all" title="Print"><Printer size={20} /></button>
            <button onClick={() => setShowPrintView(false)} className="bg-white text-slate-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-100 shadow-lg transition-all" title="Close"><X size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
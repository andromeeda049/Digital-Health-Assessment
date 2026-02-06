import React, { useState } from 'react';
import { 
  Shield, Users, Server, Printer, Plus, Trash2, 
  Upload, File, X, Building
} from 'lucide-react';
import CheckboxItem from './components/CheckboxItem';
import { Asset, AssessmentItem, SmartPCUState, CyberState, PersonnelState } from './types';

const App = () => {
  const [activeTab, setActiveTab] = useState<string>('assets');
  const [showPrintView, setShowPrintView] = useState<boolean>(false);
  const [hospitalName, setHospitalName] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  
  const createItem = (): AssessmentItem => ({ status: null, fileName: null });

  // State Definitions
  const [assets, setAssets] = useState<Asset[]>([
    { id: 1, code: '', type: 'PC', user: '', spec: '', status: 'normal', fileName: null }
  ]);

  const [smartPCU, setSmartPCU] = useState<SmartPCUState>({
    providerId: createItem(),
    communication: createItem(),
    edoc: createItem(),
    pdpa: createItem(),
    authen: createItem(),
    appointment: createItem(),
    telemed: createItem(),
    homeWard: createItem()
  });

  const [cyber, setCyber] = useState<CyberState>({
    osPatch: createItem(),
    antivirus: createItem(),
    software: createItem(),
    backup: createItem(),
    privacy: createItem(),
    internetBackup: createItem()
  });

  const [personnel, setPersonnel] = useState<PersonnelState>({
    committee: createItem(),
    executives: createItem(),
    itStaff: createItem(),
    generalStaff: createItem(),
    innovation: createItem()
  });

  // --- Handlers ---
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
      { id: 'assets', label: 'บัญชีทรัพย์สิน', icon: Server },
      { id: 'smart', label: 'Smart PCU', icon: File },
      { id: 'cyber', label: 'Cybersecurity', icon: Shield },
      { id: 'personnel', label: 'บุคลากร', icon: Users },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-10 no-print border-b border-slate-200 pb-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg text-sm font-medium transition-all relative top-[1px] ${
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
    <div className="animate-fade-in">
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
      {assets.length === 0 && (
          <div className="p-12 text-center border border-dashed border-slate-300 rounded-xl mt-4">
              <p className="text-slate-400">ยังไม่มีรายการทรัพย์สิน</p>
          </div>
      )}
    </div>
  );

  const renderSmartForm = () => (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Assessment Part 2</span>
        <h2 className="text-3xl font-light text-slate-900 mt-2">Smart PCU</h2>
        <p className="text-slate-500 mt-2 font-light">การบริหารจัดการและการบริการด้วยเทคโนโลยีดิจิทัล</p>
      </div>
      
      <div className="space-y-12">
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 pl-4 border-l-4 border-teal-500">การบริหารจัดการ</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            <CheckboxItem<SmartPCUState> label="1.1 ตัวตนดิจิทัล (Provider ID) ครบ 100%" stateKey="providerId" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพหน้าจอ Profile ในระบบ" />
            <CheckboxItem<SmartPCUState> label="1.2 การสื่อสารองค์กร (Line กลุ่ม/Page/OA)" stateKey="communication" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพหน้าจอแชทกลุ่ม" />
            <CheckboxItem<SmartPCUState> label="1.3 ระบบสารบรรณอิเล็กทรอนิกส์/Email" stateKey="edoc" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพหน้าจอการรับ-ส่งหนังสือ" />
            <CheckboxItem<SmartPCUState> label="1.4 นโยบาย PDPA (มีประกาศลงนาม)" stateKey="pdpa" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ไฟล์ประกาศนโยบาย" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 pl-4 border-l-4 border-teal-500">การบริการ</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            <CheckboxItem<SmartPCUState> label="2.1 ยืนยันตัวตนผู้ป่วย (Smart Card Authen)" stateKey="authen" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพถ่ายขณะเสียบบัตร" />
            <CheckboxItem<SmartPCUState> label="2.2 ระบบนัดหมาย & คิวออนไลน์" stateKey="appointment" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพสมุดนัด/แชท" />
            <CheckboxItem<SmartPCUState> label="2.3 แพทย์ทางไกล (Telemedicine)" stateKey="telemed" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพถ่ายจุดให้บริการ" />
            <CheckboxItem<SmartPCUState> label="2.4 เยี่ยมบ้าน/ส่งยา (Digital Home Ward)" stateKey="homeWard" stateObj={smartPCU} setStateObj={setSmartPCU} evidence="ภาพหน้าจอ App" />
          </div>
        </section>
      </div>
    </div>
  );

  const renderCyberForm = () => (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Assessment Part 3</span>
        <h2 className="text-3xl font-light text-slate-900 mt-2">Cybersecurity Hygiene</h2>
        <p className="text-slate-500 mt-2 font-light">ความปลอดภัยทางไซเบอร์ขั้นพื้นฐาน</p>
      </div>
      
      <div className="space-y-12">
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 pl-4 border-l-4 border-teal-500">ความปลอดภัยอุปกรณ์</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            <CheckboxItem<CyberState> label="1.1 อัปเดต Windows เป็นปัจจุบัน" stateKey="osPatch" stateObj={cyber} setStateObj={setCyber} evidence="ภาพหน้าจอ Update" />
            <CheckboxItem<CyberState> label="1.2 ติดตั้งและเปิดใช้งาน Antivirus" stateKey="antivirus" stateObj={cyber} setStateObj={setCyber} evidence="ภาพหน้าจอ Antivirus" />
            <CheckboxItem<CyberState> label="1.3 ซอฟต์แวร์ถูกกฎหมายและอัปเดต" stateKey="software" stateObj={cyber} setStateObj={setCyber} evidence="ภาพหน้าจอ About" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 pl-4 border-l-4 border-teal-500">ข้อมูล & เครือข่าย</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
            <CheckboxItem<CyberState> label="2.1 สำรองข้อมูล (Backup) และถอดเก็บแยก" stateKey="backup" stateObj={cyber} setStateObj={setCyber} evidence="ภาพถ่ายอุปกรณ์ Backup" />
            <CheckboxItem<CyberState> label="2.2 ไม่แปะรหัสผ่านหน้าจอคอมพิวเตอร์" stateKey="privacy" stateObj={cyber} setStateObj={setCyber} evidence="ภาพถ่ายหน้าจอคอม" />
            <CheckboxItem<CyberState> label="3.1 มีอินเทอร์เน็ตสำรอง (Hotspot)" stateKey="internetBackup" stateObj={cyber} setStateObj={setCyber} evidence="ภาพถ่าย Speedtest" />
          </div>
        </section>
      </div>
    </div>
  );

  const renderPersonnelForm = () => {
    const personnelValues = Object.values(personnel);
    
    // Logic for summary
    const trainingPassed = (personnel.executives.status === 'pass' ? 1 : 0) + 
                           (personnel.itStaff.status === 'pass' ? 1 : 0) + 
                           (personnel.generalStaff.status === 'pass' ? 1 : 0);
    
    const pass9Months = trainingPassed >= 2; 
    const pass12Months = (trainingPassed + (personnel.innovation.status === 'pass' ? 1 : 0)) >= 3;

    return (
      <div className="animate-fade-in max-w-4xl mx-auto">
        <div className="mb-10 text-center">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Assessment Part 4</span>
            <h2 className="text-3xl font-light text-slate-900 mt-2">Digital Workforce</h2>
            <p className="text-slate-500 mt-2 font-light">การพัฒนาศักยภาพบุคลากร</p>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 mb-8">
            <CheckboxItem<PersonnelState> label="1. คำสั่งแต่งตั้งคณะกรรมการพัฒนาบุคลากรฯ" stateKey="committee" stateObj={personnel} setStateObj={setPersonnel} evidence="ไฟล์คำสั่ง (PDF)" />
            <CheckboxItem<PersonnelState> label="2. ผู้บริหาร/หัวหน้ากลุ่มงาน อบรมครบ 100%" stateKey="executives" stateObj={personnel} setStateObj={setPersonnel} evidence="ใบประกาศนียบัตร" />
            <CheckboxItem<PersonnelState> label="3. จนท. IT/Digital Health อบรมครบ 100%" stateKey="itStaff" stateObj={personnel} setStateObj={setPersonnel} evidence="ใบประกาศนียบัตร" />
            <CheckboxItem<PersonnelState> label="4. บุคลากรทั่วไป อบรมผ่านเกณฑ์ 80%" stateKey="generalStaff" stateObj={personnel} setStateObj={setPersonnel} evidence="ทะเบียนรายชื่อ" />
            <CheckboxItem<PersonnelState> label="5. มีผลงานนวัตกรรมสุขภาพดิจิทัล" stateKey="innovation" stateObj={personnel} setStateObj={setPersonnel} evidence="รูปเล่มผลงาน" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-6 rounded-xl border transition-all ${pass9Months ? 'bg-teal-50/50 border-teal-100 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                 <div className={`w-2 h-2 rounded-full ${pass9Months ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                 <span className={`text-sm font-bold uppercase tracking-wide ${pass9Months ? 'text-teal-700' : 'text-slate-400'}`}>เกณฑ์รอบ 9 เดือน</span>
              </div>
              <p className="text-slate-500 text-sm pl-5">ผ่าน 2 ใน 3 ข้อเรื่องอบรม</p>
            </div>
            
            <div className={`p-6 rounded-xl border transition-all ${pass12Months ? 'bg-teal-50/50 border-teal-100 shadow-sm' : 'bg-slate-50 border-slate-100'}`}>
               <div className="flex items-center gap-3 mb-2">
                 <div className={`w-2 h-2 rounded-full ${pass12Months ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                 <span className={`text-sm font-bold uppercase tracking-wide ${pass12Months ? 'text-teal-700' : 'text-slate-400'}`}>เกณฑ์รอบ 12 เดือน</span>
              </div>
              <p className="text-slate-500 text-sm pl-5">ผ่าน 3 ใน 4 ข้อรวมนวัตกรรม</p>
            </div>
        </div>
      </div>
    );
  };

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

      <div className="space-y-10">
        <section>
            <h3 className="font-bold text-slate-900 border-l-4 border-slate-800 pl-3 mb-4">1. บัญชีทรัพย์สิน ({assets.length})</h3>
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

        <section className="grid grid-cols-2 gap-8">
            <div>
                <h3 className="font-bold text-slate-900 border-l-4 border-teal-600 pl-3 mb-4">2. Smart PCU</h3>
                <ul className="text-xs space-y-2">
                    {Object.entries(smartPCU).map(([key, val]) => {
                        const item = val as AssessmentItem;
                        return (
                        <li key={key} className="flex justify-between border-b border-slate-50 pb-1">
                           <span className="text-slate-600 capitalize">{key}</span>
                           <span className={item.status === 'pass' ? 'text-teal-600 font-bold' : 'text-slate-300'}>{item.status === 'pass' ? 'ผ่าน' : item.status === 'fail' ? 'ไม่ผ่าน' : '-'}</span>
                        </li>
                    )})}
                </ul>
            </div>
             <div>
                <h3 className="font-bold text-slate-900 border-l-4 border-teal-600 pl-3 mb-4">3. Cybersecurity</h3>
                <ul className="text-xs space-y-2">
                    {Object.entries(cyber).map(([key, val]) => {
                        const item = val as AssessmentItem;
                        return (
                        <li key={key} className="flex justify-between border-b border-slate-50 pb-1">
                           <span className="text-slate-600 capitalize">{key}</span>
                           <span className={item.status === 'pass' ? 'text-teal-600 font-bold' : 'text-slate-300'}>{item.status === 'pass' ? 'ผ่าน' : item.status === 'fail' ? 'ไม่ผ่าน' : '-'}</span>
                        </li>
                    )})}
                </ul>
            </div>
        </section>

        <section>
          <h3 className="font-bold text-slate-900 border-l-4 border-teal-600 pl-3 mb-4">4. Digital Workforce</h3>
            <ul className="text-xs space-y-2">
                {Object.entries(personnel).map(([key, val]) => {
                    const item = val as AssessmentItem;
                    return (
                    <li key={key} className="flex justify-between border-b border-slate-50 pb-1">
                        <span className="text-slate-600 capitalize">{key}</span>
                        <span className={item.status === 'pass' ? 'text-teal-600 font-bold' : 'text-slate-300'}>{item.status === 'pass' ? 'ผ่าน' : item.status === 'fail' ? 'ไม่ผ่าน' : '-'}</span>
                    </li>
                )})}
            </ul>
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
            {activeTab === 'assets' && renderAssetTable()}
            {activeTab === 'smart' && renderSmartForm()}
            {activeTab === 'cyber' && renderCyberForm()}
            {activeTab === 'personnel' && renderPersonnelForm()}
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
import React, { useState } from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import {
  ShieldCheck,
  Lock,
  Upload,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Building2,
  FileText,
  BadgeAlert,
  Info
} from 'lucide-react';
import { AdminRegistrationData, AdminVerificationDocument } from '../../types';

interface AdminAuthModalProps {
  navigate: (path: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ navigate }) => {
  const {
    isAdminAuthModalOpen,
    closeAdminAuthModal,
    loginAsAdmin,
    registerAdmin,
    continueAsGuest,
  } = useCivicStore();

  const [tab, setTab] = useState<'signin' | 'register'>('signin');

  // Sign In fields
  const [username, setUsername] = useState('DC Chitral');
  const [password, setPassword] = useState('Chitral123');
  const [signInError, setSignInError] = useState<string | null>(null);

  // Register fields
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('Assistant Commissioner');
  const [departmentId, setDepartmentId] = useState('DC Office Lower Chitral');
  const [officialEmail, setOfficialEmail] = useState('');
  const [officialPhone, setOfficialPhone] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dutyStation, setDutyStation] = useState('Drosh Tehsil Headquarters');
  const [isComplianceAgreed, setIsComplianceAgreed] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Document upload state
  const [uploadedDoc, setUploadedDoc] = useState<AdminVerificationDocument | null>({
    id: 'doc-sample-1',
    name: 'KP_Government_Official_Service_Card.pdf',
    type: 'application/pdf',
    sizeKb: 1420,
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    uploadedAt: new Date().toISOString(),
  });

  if (!isAdminAuthModalOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);

    const res = loginAsAdmin(username, password);
    if (res.success) {
      closeAdminAuthModal();
      navigate('/admin');
    } else {
      setSignInError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!fullName.trim() || !officialEmail.trim()) {
      setRegError('Please provide your official name and email address.');
      return;
    }

    if (!uploadedDoc) {
      setRegError('Official document upload is required for administrative verification.');
      return;
    }

    if (!isComplianceAgreed) {
      setRegError('You must confirm authorization compliance before proceeding.');
      return;
    }

    const regData: AdminRegistrationData = {
      fullName: fullName.trim(),
      designation,
      departmentId,
      officialEmail: officialEmail.trim(),
      officialPhone: officialPhone.trim() || '+92 943 000000',
      cnicNumber: cnicNumber.trim() || '15302-0000000-1',
      employeeId: employeeId.trim() || 'KP-ADM-2026',
      verificationDocument: uploadedDoc,
      dutyStation,
    };

    const res = registerAdmin(regData);
    if (res.success) {
      closeAdminAuthModal();
      navigate('/admin');
    } else {
      setRegError(res.error || 'Registration failed.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDoc({
        id: `doc-${Date.now()}`,
        name: file.name,
        type: file.type || 'application/pdf',
        sizeKb: Math.round(file.size / 1024),
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      });
    }
  };

  const sampleDocuments = [
    { name: 'DC_Chitral_Official_Appointment_Notification.pdf', sizeKb: 1850 },
    { name: 'TMA_Drosh_Municipal_Officer_ID_Card.jpg', sizeKb: 920 },
    { name: 'C&W_Sub_Divisional_Officer_Badge.pdf', sizeKb: 2100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border-2 border-[#0F1B2D] shadow-2xl overflow-hidden my-auto animate-in zoom-in-95">
        {/* Official Header */}
        <div className="bg-[#0F1B2D] text-white p-6 sm:p-7 relative">
          <button
            onClick={closeAdminAuthModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Administration Access</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              District Administration & Municipal Desk
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Restricted portal for Deputy Commissioner (DC) Office Lower Chitral, Tehsil Municipal Administration (TMA) Drosh, C&W, and authorized district departments.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="p-6 sm:p-8 space-y-6 bg-white">
          <div className="grid grid-cols-2 p-1 bg-[#F6F8F7] rounded-lg border border-[#E3E8E6] text-xs">
            <button
              type="button"
              onClick={() => setTab('signin')}
              className={`py-2 px-3 rounded-[6px] font-semibold transition-all cursor-pointer ${
                tab === 'signin'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Sign In to Existing Official Account
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`py-2 px-3 rounded-[6px] font-semibold transition-all cursor-pointer ${
                tab === 'register'
                  ? 'bg-white text-[#0F1B2D] shadow-2xs font-bold border border-[#E3E8E6]'
                  : 'text-[#4B5A6B] hover:text-[#0F1B2D]'
              }`}
            >
              Register Official Account & Verify
            </button>
          </div>

          {/* TAB 1: OFFICIAL SIGN IN */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              {signInError && (
                <div className="p-3 rounded-lg bg-[#FCEBEA] border border-[#B3261E]/30 text-[#8A1D17] text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" />
                  <span>{signInError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Official Username or Email:
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="DC Chitral"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none font-mono text-[#0F1B2D]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                  Administrative Password:
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Chitral123"
                  className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none font-mono text-[#0F1B2D]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#FAF0E1] border border-[#B7791F]/30 flex items-center justify-between text-[11px] text-[#8B5B16]">
                <div>
                  <strong>Default DC Credentials:</strong> Username <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">DC Chitral</code> · Password <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">Chitral123</code>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUsername('DC Chitral');
                    setPassword('Chitral123');
                    setSignInError(null);
                  }}
                  className="text-[#1F5FA8] hover:underline font-bold text-xs shrink-0 cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] hover:bg-[#1F2B3E] text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authenticate Official Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER OFFICIAL ACCOUNT WITH DOCUMENT VERIFICATION */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              {regError && (
                <div className="p-3 rounded-lg bg-[#FCEBEA] border border-[#B3261E]/30 text-[#8A1D17] text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" />
                  <span>{regError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Official Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Engr. Tariq Mahmood"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Official Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Assistant Commissioner / SDO C&W"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Department / Agency *
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  >
                    <option value="DC Office Lower Chitral">Deputy Commissioner Office Lower Chitral</option>
                    <option value="TMA Drosh">Tehsil Municipal Administration (TMA) Drosh</option>
                    <option value="C&W Department">Communication & Works (C&W) Department</option>
                    <option value="Forest & Wildlife">Forest & Wildlife Department</option>
                    <option value="WSSC">Water & Sanitation Services Company (WSSC)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Duty Station / Tehsil HQ
                  </label>
                  <input
                    type="text"
                    value={dutyStation}
                    onChange={(e) => setDutyStation(e.target.value)}
                    placeholder="Drosh Tehsil Headquarters"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Official Email (.gov.pk or district mail) *
                  </label>
                  <input
                    type="email"
                    required
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    placeholder="officer@chitral.gov.pk"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-[#0F1B2D]">
                    Official Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={officialPhone}
                    onChange={(e) => setOfficialPhone(e.target.value)}
                    placeholder="+92 345 9876543"
                    className="w-full px-3 py-2 rounded-[6px] border border-[#E3E8E6] bg-[#F6F8F7] focus:bg-white focus:border-[#0F1B2D] focus:outline-none text-[#0F1B2D]"
                  />
                </div>
              </div>

              {/* DOCUMENT VERIFICATION UPLOAD SECTION */}
              <div className="p-4 rounded-xl border border-[#1F5FA8]/30 bg-[#F0F5FA] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#1F5FA8]" />
                    <span className="font-bold text-xs text-[#0F1B2D]">
                      Document Verification Step (Identity / Service Proof) *
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#1F5FA8] bg-white px-2 py-0.5 rounded border border-[#1F5FA8]/20">
                    Required for Approval
                  </span>
                </div>

                <p className="text-[11px] text-[#4B5A6B] leading-relaxed">
                  Upload official proof of identity (Government Employee Service Card, Official Badge, or Department Appointment Letter).
                </p>

                {/* Upload or Dropzone */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2 rounded-[6px] bg-white border border-[#1F5FA8] hover:bg-blue-50 text-[#1F5FA8] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Service Document</span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Sample selection shortcuts for easy demo testing */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-[#4B5A6B]">
                    <span>Or attach sample:</span>
                    {sampleDocuments.map((s, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => {
                          setUploadedDoc({
                            id: `sample-${sIdx}`,
                            name: s.name,
                            type: 'application/pdf',
                            sizeKb: s.sizeKb,
                            url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
                            uploadedAt: new Date().toISOString(),
                          });
                        }}
                        className="px-2 py-0.5 rounded bg-white border border-[#E3E8E6] hover:bg-[#E8F2EC] text-[#0F1B2D] cursor-pointer"
                      >
                        {s.name.split('_')[0]} Proof
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attached Document Preview Card */}
                {uploadedDoc && (
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-300 flex items-center justify-between text-xs animate-in fade-in">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0F1B2D] truncate text-[11px]">
                          {uploadedDoc.name}
                        </p>
                        <p className="text-[10px] text-[#4B5A6B]">
                          {uploadedDoc.sizeKb} KB · Document verified & ready for audit
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUploadedDoc(null)}
                      className="text-[#B3261E] hover:underline text-[10px] shrink-0 font-medium ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Compliance Checkbox */}
              <label className="flex items-start gap-2 pt-1 text-[11px] text-[#4B5A6B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isComplianceAgreed}
                  onChange={(e) => setIsComplianceAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-[#E3E8E6] text-[#0F1B2D] focus:ring-[#0F1B2D]"
                />
                <span>
                  I solemnly declare that I am an authorized municipal or district official appointed in Lower Chitral. All submitted identity documents are genuine and subject to disciplinary review under KP civil services regulations.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] hover:bg-[#1F2B3E] text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Submit Official Registration & Verify</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Footer return link */}
          <div className="pt-3 border-t border-[#E3E8E6] flex items-center justify-between text-[11px] text-[#4B5A6B]">
            <button
              type="button"
              onClick={() => {
                closeAdminAuthModal();
                continueAsGuest();
              }}
              className="text-[#1F6B43] hover:underline font-semibold cursor-pointer"
            >
              ← Return to Citizen View (Continue as Guest)
            </button>
            <span>Government of Khyber Pakhtunkhwa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

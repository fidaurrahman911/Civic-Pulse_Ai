import React from 'react';
import { useCivicStore } from '../../store/useCivicStore';
import { Avatar } from '../civic/Avatar';
import { RotateCcw, AlertTriangle, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface DemoControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoControlsModal: React.FC<DemoControlsModalProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    switchDemoUser,
    demoSettings,
    setDemoSetting,
    resetDemoData,
  } = useCivicStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-lg border border-[#E3E8E6] shadow-xl p-5 text-xs text-[#0F1B2D]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E6]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#1F5FA8]" />
            <h3 className="text-sm font-bold text-[#0F1B2D]">Demo Presenter Controls</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#4B5A6B] hover:text-[#0F1B2D] font-bold p-1 rounded hover:bg-[#F6F8F7]"
          >
            ✕
          </button>
        </div>

        {/* Demo Accounts Switcher */}
        <div className="mt-4">
          <label className="font-semibold text-[#4B5A6B] uppercase tracking-wider text-[11px] block mb-2">
            Switch Demo Account:
          </label>
          <div className="space-y-2">
            <button
              onClick={() => {
                switchDemoUser('user-mz');
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-[6px] border text-left transition-colors ${
                currentUser.id === 'user-mz'
                  ? 'border-[#1F6B43] bg-[#E8F2EC]/40'
                  : 'border-[#E3E8E6] hover:bg-[#F6F8F7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar name="Muhammad Zulkaif" size="sm" />
                <div>
                  <span className="font-semibold block text-[#0F1B2D]">Muhammad Zulkaif</span>
                  <span className="text-[11px] text-[#4B5A6B]">Citizen (Hero Persona, Drosh)</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#174F32] bg-[#E8F2EC] px-2 py-0.5 rounded">
                1,020+ pts
              </span>
            </button>

            <button
              onClick={() => {
                switchDemoUser('user-fr');
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-[6px] border text-left transition-colors ${
                currentUser.id === 'user-fr'
                  ? 'border-[#1F5FA8] bg-[#E6EFF9]/40'
                  : 'border-[#E3E8E6] hover:bg-[#F6F8F7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar name="Fida Ur Rahman" size="sm" />
                <div>
                  <span className="font-semibold block text-[#0F1B2D]">Fida Ur Rahman</span>
                  <span className="text-[11px] text-[#4B5A6B]">Administration / District Inspector</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#14467E] bg-[#E6EFF9] px-2 py-0.5 rounded">
                Admin Role
              </span>
            </button>

            <button
              onClick={() => {
                switchDemoUser('user-ki');
                onClose();
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-[6px] border text-left transition-colors ${
                currentUser.id === 'user-ki'
                  ? 'border-[#B7791F] bg-[#FAF0E1]/40'
                  : 'border-[#E3E8E6] hover:bg-[#F6F8F7]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar name="Kaleem Ilahi" size="sm" />
                <div>
                  <span className="font-semibold block text-[#0F1B2D]">Kaleem Ilahi</span>
                  <span className="text-[11px] text-[#4B5A6B]">Organization (RSO Coordinator)</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#8B5B16] bg-[#FAF0E1] px-2 py-0.5 rounded">
                Org Role
              </span>
            </button>
          </div>
        </div>

        {/* Edge-case and Integrity Toggles */}
        <div className="mt-4 pt-3 border-t border-[#E3E8E6] space-y-3">
          <label className="font-semibold text-[#4B5A6B] uppercase tracking-wider text-[11px] block">
            Verification Test Scenarios:
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[#F6F8F7]">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
              <span>Simulate Duplicate Evidence Warning</span>
            </span>
            <input
              type="checkbox"
              checked={demoSettings.forceDuplicateWarning}
              onChange={(e) => setDemoSetting('forceDuplicateWarning', e.target.checked)}
              className="accent-[#1F6B43] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-[#F6F8F7]">
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#B3261E]" />
              <span>Simulate Low Resolution Confidence (41%)</span>
            </span>
            <input
              type="checkbox"
              checked={demoSettings.forceLowResolutionConfidence}
              onChange={(e) => setDemoSetting('forceLowResolutionConfidence', e.target.checked)}
              className="accent-[#1F6B43] w-4 h-4"
            />
          </label>
        </div>

        {/* Reset State Button */}
        <div className="mt-5 pt-3 border-t border-[#E3E8E6] flex items-center justify-between">
          <button
            onClick={() => {
              resetDemoData();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-semibold text-[#B3261E] bg-[#FCEBEA] hover:bg-[#B3261E] hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Demo Data
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-[6px] text-xs font-semibold bg-[#0F1B2D] text-white hover:bg-[#1F2B3E]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

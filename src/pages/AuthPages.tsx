import React, { useState } from 'react';
import { useCivicStore } from '../store/useCivicStore';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

interface AuthPagesProps {
  mode: 'sign-in' | 'create-account' | 'forgot-password';
  navigate: (path: string) => void;
}

export const AuthPages: React.FC<AuthPagesProps> = ({ mode, navigate }) => {
  const { loginAsCitizen, registerCitizen, setUserRole } = useCivicStore();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('Drosh, Lower Chitral');
  const [accountType, setAccountType] = useState<'citizen' | 'organization'>('citizen');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot-password') {
      setSubmittedMessage('Password reset link sent to your registered email address.');
      return;
    }

    if (mode === 'create-account') {
      registerCitizen({
        fullName: fullName.trim() || 'Active Citizen',
        email: email.trim(),
        phone: phone.trim() || '+92 345 0000000',
        locationName,
      });
      setUserRole(accountType);
    } else {
      loginAsCitizen(email.trim());
    }
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-[8px] bg-[#1F6B43] text-white flex items-center justify-center font-bold text-lg mx-auto shadow-xs">
          CP
        </div>
        <h1 className="text-2xl font-bold text-[#0F1B2D]">
          {mode === 'sign-in'
            ? 'Sign In to CivicPulse'
            : mode === 'create-account'
            ? 'Create Civic Account'
            : 'Reset Account Password'}
        </h1>
        <p className="text-xs text-[#4B5A6B]">
          Designed as a civic technology platform for citizens and administration.
        </p>
      </div>

      {submittedMessage ? (
        <div className="p-4 rounded-lg bg-[#E8F2EC] border border-[#1F6B43]/30 text-xs text-[#174F32] text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-[#1F6B43] mx-auto" />
          <p className="font-semibold">{submittedMessage}</p>
          <button
            onClick={() => navigate('/sign-in')}
            className="px-4 py-2 rounded-[6px] bg-[#1F6B43] text-white font-semibold text-xs"
          >
            Return to Sign In
          </button>
        </div>
      ) : (
        /* Regular Form */
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-[#E3E8E6] shadow-xs space-y-4 text-xs">
          {mode === 'create-account' && (
            <>
              {/* Segmented Control for Role */}
              <div>
                <label className="block font-semibold text-[#0F1B2D] mb-1.5">
                  Account Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('citizen')}
                    className={`py-2 rounded-[6px] font-semibold border text-center transition-colors ${
                      accountType === 'citizen'
                        ? 'bg-[#1F6B43] text-white border-[#1F6B43]'
                        : 'bg-[#F6F8F7] text-[#4B5A6B] border-[#E3E8E6]'
                    }`}
                  >
                    Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('organization')}
                    className={`py-2 rounded-[6px] font-semibold border text-center transition-colors ${
                      accountType === 'organization'
                        ? 'bg-[#1F6B43] text-white border-[#1F6B43]'
                        : 'bg-[#F6F8F7] text-[#4B5A6B] border-[#E3E8E6]'
                    }`}
                  >
                    Organization
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0F1B2D] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Muhammad Zulkaif"
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] text-xs bg-white text-[#0F1B2D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0F1B2D] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 345 0000000"
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] text-xs bg-white text-[#0F1B2D]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0F1B2D] mb-1">Location / Tehsil *</label>
                <input
                  type="text"
                  required
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Drosh, Lower Chitral"
                  className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] text-xs bg-white text-[#0F1B2D]"
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold text-[#0F1B2D] mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@civicpulse.pk"
              className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] text-xs bg-white text-[#0F1B2D]"
            />
          </div>

          {mode !== 'forgot-password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#0F1B2D]">Password *</label>
                {mode === 'sign-in' && (
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[11px] text-[#1F5FA8] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-[6px] border border-[#E3E8E6] focus:border-[#1F6B43] text-xs bg-white text-[#0F1B2D]"
              />
              {mode === 'create-account' && (
                <span className="text-[10px] text-[#4B5A6B] mt-1 block">
                  Password strength: Strong (minimum 8 characters)
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-[6px] text-xs font-semibold bg-[#1F6B43] hover:bg-[#174F32] text-white shadow-xs transition-colors mt-2"
          >
            {mode === 'sign-in'
              ? 'Sign In to Account'
              : mode === 'create-account'
              ? 'Complete Registration'
              : 'Send Reset Link'}
          </button>

          <div className="pt-3 border-t border-[#E3E8E6] text-center text-xs text-[#4B5A6B]">
            {mode === 'sign-in' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/create-account')}
                  className="font-semibold text-[#1F6B43] hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/sign-in')}
                  className="font-semibold text-[#1F6B43] hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

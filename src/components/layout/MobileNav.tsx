import React from 'react';
import { Home, Compass, PlusCircle, Map, User } from 'lucide-react';

interface MobileNavProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, navigate }) => {
  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Discover', path: '/discover', icon: Compass },
    { label: 'Report', path: '/report', icon: PlusCircle, isPrimary: true },
    { label: 'Map', path: '/map', icon: Map },
    { label: 'Me', path: '/dashboard', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E8E6] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPath === tab.path;

          if (tab.isPrimary) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center min-h-[48px] text-[#1F6B43]"
                aria-label={tab.label}
              >
                <div className="w-9 h-9 rounded-full bg-[#1F6B43] text-white flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center min-h-[48px] transition-colors ${
                isActive ? 'text-[#1F6B43] font-semibold' : 'text-[#4B5A6B]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

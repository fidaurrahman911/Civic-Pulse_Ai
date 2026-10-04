import React from 'react';
import { Building2, Shield, HeartHandshake, TreePine, Map, Landmark } from 'lucide-react';

export const DistrictPartnersBar: React.FC = () => {
  const partners = [
    {
      name: 'Government of KP',
      sub: 'Provincial Civic Initiative',
      icon: Landmark,
    },
    {
      name: 'Deputy Commissioner Office',
      sub: 'District Lower Chitral',
      icon: Shield,
    },
    {
      name: 'TMA Drosh',
      sub: 'Tehsil Municipal Administration',
      icon: Building2,
    },
    {
      name: 'C&W Department KP',
      sub: 'Highway & Works Division',
      icon: Map,
    },
    {
      name: 'Regional Support Org (RSO)',
      sub: 'Community Development',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="bg-white py-12 border-t border-[#E3E8E6]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Integrated with District Public Services & Non-Profit Partners
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-xl border border-[#E3E8E6] bg-[#F6F8F7]/60 hover:bg-white hover:border-[#1F6B43]/50 transition-all text-center space-y-1.5 group"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-white border border-[#E3E8E6] group-hover:border-[#1F6B43] flex items-center justify-center text-[#1F6B43] shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-[#0F1B2D] leading-tight pt-1">
                  {p.name}
                </div>
                <div className="text-[10px] text-[#4B5A6B]">
                  {p.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

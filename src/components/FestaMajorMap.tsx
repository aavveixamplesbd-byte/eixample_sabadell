import React, { useState, useEffect, useMemo } from 'react';
import festaMajorData from '../data/festa-major.json';

interface FestaMajorMapProps {
  lang?: 'ca' | 'es';
}

export default function FestaMajorMap({ lang = 'ca' }: FestaMajorMapProps) {
  const t = { 
    ca: { selectDay: 'Selecciona un dia', activeNow: 'Ara mateix', noEvents: 'Cap activitat en aquest moment', allEvents: 'Totes les activitats' }, 
    es: { selectDay: 'Selecciona un día', activeNow: 'Ahora mismo', noEvents: 'Ninguna actividad en este momento', allEvents: 'Todas las actividades' } 
  }[lang];

  const [selectedDayId, setSelectedDayId] = useState(festaMajorData.days[0].id);
  const selectedDay = useMemo(() => festaMajorData.days.find(d => d.id === selectedDayId) || festaMajorData.days[0], [selectedDayId]);

  const { minTime, maxTime } = useMemo(() => {
    let min = 24 * 60;
    let max = 0;
    selectedDay.events.forEach(ev => {
      const [sh, sm] = ev.time.split(':').map(Number);
      const start = sh * 60 + sm;
      const [eh, em] = ev.endTime.split(':').map(Number);
      const end = eh * 60 + em;
      
      if (start < min) min = start;
      if (end > max) max = end;
    });
    // Round to hours for clean slider bounds
    return { 
      minTime: Math.floor(min / 60) * 60, 
      maxTime: Math.ceil(max / 60) * 60 
    };
  }, [selectedDay]);

  const [selectedTimeMin, setSelectedTimeMin] = useState<number>(minTime);
  const [clickedEventIndex, setClickedEventIndex] = useState<number | null>(null);

  useEffect(() => {
    // Reset specific event selection and always go to the start of the day when changing tabs
    setClickedEventIndex(null);
    setSelectedTimeMin(minTime);
  }, [selectedDay, minTime]);

  const activeEvents = useMemo(() => {
    if (clickedEventIndex !== null) {
      return [selectedDay.events[clickedEventIndex]];
    }
    return selectedDay.events.filter(ev => {
      const [sh, sm] = ev.time.split(':').map(Number);
      const start = sh * 60 + sm;
      const [eh, em] = ev.endTime.split(':').map(Number);
      const end = eh * 60 + em;
      return selectedTimeMin >= start && selectedTimeMin < end;
    });
  }, [selectedDay, selectedTimeMin, clickedEventIndex]);

  const activeLocationIds = new Set(activeEvents.map(ev => ev.location));

  // Base coords from real lat/lng adapted to 800x400 map
  const getSvgCoords = (lat: number, lng: number) => {
    const x = ((lng - 2.1010) / 0.0085) * 800;
    const y = ((41.5510 - lat) / 0.0045) * 400;
    return { x, y };
  };

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${(h % 24).toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start my-8">
      {/* Left side: Map and controls */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        
        {/* Day tabs */}
        <div className="flex flex-wrap gap-2">
          {festaMajorData.days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors duration-200 text-sm ${
                selectedDayId === day.id
                  ? 'bg-[#37645d] text-white shadow-md'
                  : 'bg-[#edeeee] text-[#191c1c] hover:bg-[#507d75] hover:text-white'
              }`}
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {(day.label as any)[lang] || day.label.ca}
            </button>
          ))}
        </div>

        {/* Time Slider */}
        <div className="w-full bg-[#f8f9f9] p-4 sm:p-5 rounded-2xl border border-[#edeeee] shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[#707976] font-semibold font-mono text-sm sm:text-base">{formatTime(minTime)}</span>
            <div className="flex flex-col items-center">
              <span className="text-[10px] sm:text-xs text-[#507d75] uppercase tracking-widest font-bold mb-0.5" style={{fontFamily: 'Plus Jakarta Sans'}}>{t.activeNow}</span>
              <span className="text-2xl sm:text-3xl font-bold text-[#37645d] tracking-tighter leading-none" style={{fontFamily: 'Comfortaa'}}>{formatTime(selectedTimeMin)}</span>
            </div>
            <span className="text-[#707976] font-semibold font-mono text-sm sm:text-base">{formatTime(maxTime)}</span>
          </div>
          
          <div className="relative pt-1">
            <input 
              type="range" 
              min={minTime} 
              max={maxTime} 
              step="15" 
              value={selectedTimeMin}
              onChange={(e) => {
                setSelectedTimeMin(parseInt(e.target.value));
                setClickedEventIndex(null);
              }}
              className="w-full h-2 bg-[#edeeee] rounded-full appearance-none cursor-pointer"
              style={{
                 background: `linear-gradient(to right, #37645d ${((selectedTimeMin - minTime) / (maxTime - minTime)) * 100}%, #edeeee ${((selectedTimeMin - minTime) / (maxTime - minTime)) * 100}%)`
              }}
            />
          </div>
        </div>

        {/* The Map */}
        <div className="relative w-full aspect-[2/1] bg-[#f8f9f9] rounded-3xl overflow-hidden border border-[#707976]/20 shadow-sm">
          <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#edeeee" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Abstract streets representation */}
            <g opacity="0.8">
              {/* Av. Barbera (Main Horizontal-ish) */}
              <path d="M -50 250 Q 400 200 850 150" stroke="#edeeee" strokeWidth="32" fill="none" strokeLinecap="round" />
              <path d="M -50 250 Q 400 200 850 150" stroke="#fff" strokeWidth="20" fill="none" strokeLinecap="round" />
              <text x="650" y="165" fill="#707976" fontSize="14" transform="rotate(-6 650 165)" fontWeight="700" style={{fontFamily: 'Plus Jakarta Sans', letterSpacing: '1px'}}>AV. BARBERÀ</text>

              {/* Gran Via (Diagonal cross) */}
              <path d="M 600 -50 L 450 450" stroke="#edeeee" strokeWidth="40" fill="none" strokeLinecap="round" />
              <path d="M 600 -50 L 450 450" stroke="#fff" strokeWidth="28" fill="none" strokeLinecap="round" />
              <text x="500" y="300" fill="#707976" fontSize="14" transform="rotate(72 500 300)" fontWeight="700" style={{fontFamily: 'Plus Jakarta Sans', letterSpacing: '1px'}}>GRAN VIA</text>
              
              {/* Secondary streets */}
              <path d="M 150 -50 L 50 450" stroke="#fff" strokeWidth="12" fill="none" />
              <path d="M -50 100 L 850 50" stroke="#fff" strokeWidth="12" fill="none" />
              <path d="M 300 450 L 850 350" stroke="#fff" strokeWidth="12" fill="none" />
            </g>

            {/* Location Markers */}
            {festaMajorData.locations.map(loc => {
              const { x, y } = getSvgCoords(loc.lat, loc.lng);
              const isActive = activeLocationIds.has(loc.id);
              
              // Get all active events at this location
              const eventsAtLoc = activeEvents.filter(ev => ev.location === loc.id);
              // Sort by duration (shortest first) so specific short events show up instead of the all-day fair
              const activeEventAtLoc = eventsAtLoc.sort((a, b) => {
                const getDur = (ev: any) => {
                  const [sh, sm] = ev.time.split(':').map(Number);
                  const [eh, em] = ev.endTime.split(':').map(Number);
                  return (eh * 60 + em) - (sh * 60 + sm);
                };
                return getDur(a) - getDur(b);
              })[0];
              
              const extraEventsCount = eventsAtLoc.length - 1;
              
              return (
                <g key={loc.id} className="transition-all duration-700 ease-out" style={{ transform: `translate(${x}px, ${y}px)` }}>
                  {isActive && (
                    <>
                      <circle cx="0" cy="0" r="32" fill="#37645d" opacity="0.15">
                        <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="0" cy="0" r="18" fill="#507d75" opacity="0.3" />
                    </>
                  )}
                  
                  {/* Pin Base */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isActive ? "10" : "6"} 
                    fill={isActive ? "#37645d" : "#707976"} 
                    stroke="#fff"
                    strokeWidth={isActive ? "3" : "2"}
                    className="transition-all duration-300"
                  />
                  
                  {/* Tooltip for Active Event */}
                  {isActive && activeEventAtLoc && (
                    <g transform="translate(0, -48)" className="animate-fade-in">
                      <rect x="-90" y="0" width="180" height="34" rx="8" fill="#191c1c" />
                      <polygon points="-6,34 6,34 0,40" fill="#191c1c" />
                      <text x="0" y="22" textAnchor="middle" fill="#f8f9f9" fontSize="12" fontWeight="600" style={{fontFamily: 'Plus Jakarta Sans'}}>
                        {(activeEventAtLoc.title as any)[lang].length > (extraEventsCount > 0 ? 18 : 25)
                          ? (activeEventAtLoc.title as any)[lang].substring(0, (extraEventsCount > 0 ? 18 : 25)) + '...' 
                          : (activeEventAtLoc.title as any)[lang]}
                        {extraEventsCount > 0 ? ` (+${extraEventsCount})` : ''}
                      </text>
                    </g>
                  )}

                  {/* Location label for inactive */}
                  {!isActive && (
                    <text x="12" y="4" fill="#707976" fontSize="12" fontWeight="600" style={{fontFamily: 'Plus Jakarta Sans', textShadow: '1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff'}}>
                      {(loc.name as any)[lang]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Right side: Event list */}
      <div className="w-full lg:w-2/5 flex flex-col lg:h-[750px]">
        <h3 className="text-2xl font-bold text-[#191c1c] mb-6 flex items-center gap-2" style={{fontFamily: 'Comfortaa'}}>
          <span className="material-symbols-outlined text-[#37645d]">event_note</span>
          {t.allEvents}
        </h3>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {selectedDay.events.length === 0 ? (
             <div className="p-8 bg-[#f8f9f9] rounded-3xl text-center text-[#707976] border border-[#edeeee]">
               <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
               <p style={{fontFamily: 'Plus Jakarta Sans'}}>{t.noEvents}</p>
             </div>
          ) : (
            selectedDay.events.map((ev, idx) => {
              const [sh, sm] = ev.time.split(':').map(Number);
              const start = sh * 60 + sm;
              const [eh, em] = ev.endTime.split(':').map(Number);
              const end = eh * 60 + em;
              const isActive = clickedEventIndex !== null 
                ? clickedEventIndex === idx 
                : selectedTimeMin >= start && selectedTimeMin < end;
              
              const loc = festaMajorData.locations.find(l => l.id === ev.location);

              return (
                <div 
                  key={idx} 
                  onClick={() => {
                    setSelectedTimeMin(start);
                    setClickedEventIndex(idx);
                  }}
                  className={`p-5 rounded-3xl border-l-[6px] transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-[#37645d]/10 border-[#37645d] shadow-sm transform scale-[1.02]' 
                      : 'bg-[#f8f9f9] border-transparent hover:bg-[#edeeee]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-bold text-[#37645d] tracking-wide" style={{fontFamily: 'Comfortaa'}}>
                      {ev.time} - {ev.endTime}
                    </div>
                    {isActive && (
                      <span className="flex h-3.5 w-3.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#37645d] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#37645d]"></span>
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-[#191c1c] mb-2 flex items-center gap-3" style={{fontFamily: 'Comfortaa'}}>
                    <span className="text-2xl">{ev.icon}</span>
                    <span>{(ev.title as any)[lang]}</span>
                  </h4>
                  
                  <div className="flex items-center text-[#707976] text-sm font-medium mt-3 bg-white/50 w-fit px-3 py-1.5 rounded-full" style={{fontFamily: 'Plus Jakarta Sans'}}>
                    <span className="material-symbols-outlined text-[18px] mr-1.5">location_on</span>
                    <span>{loc ? (loc.name as any)[lang] : ev.location}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #37645d;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 2px 6px rgba(55,100,93,0.4);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:active {
          transform: scale(1.15);
        }
        input[type=range]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #37645d;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 2px 6px rgba(55,100,93,0.4);
          transition: transform 0.1s;
        }
        input[type=range]::-moz-range-thumb:active {
          transform: scale(1.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #edeeee;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #707976;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translate(0, -40px); }
          to { opacity: 1; transform: translate(0, -48px); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

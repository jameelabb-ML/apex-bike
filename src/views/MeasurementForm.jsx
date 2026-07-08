import React, { useState, useEffect } from 'react';
import { updateSEO } from '../utils/seoEngine.js';
import { measurementFields } from '../data/configOptions.js';

const MeasurementForm = ({ onNavigate }) => {
  const [measurements, setMeasurements] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    updateSEO('measure');
    setTimeout(() => setIsLoaded(true), 80);
  }, []);

  const handleInputChange = (fieldId, value) => {
    setMeasurements(prev => ({ ...prev, [fieldId]: value }));
  };

  const allFields = [...measurementFields.upperBody, ...measurementFields.lowerBody];
  const filledCount = allFields.filter(f => measurements[f.id] && measurements[f.id].trim() !== '').length;
  const completion = Math.round((filledCount / allFields.length) * 100);
  const isComplete = completion === 100;

  const handleSubmit = () => { if (isComplete) setIsSubmitted(true); };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="sticky top-16 lg:top-20 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider hidden sm:inline">Anatomical Measurement</span>
              <span className="text-xs text-slate-600">|</span>
              <span className="text-xs text-slate-400">{filledCount}/{allFields.length} fields</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${completion}%` }} />
              </div>
              <span className={`font-display text-sm font-bold ${isComplete ? 'text-emerald-400' : 'text-orange-400'}`}>{completion}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <div className={`lg:col-span-3 space-y-6 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {isSubmitted ? (
              <div className="bg-slate-900/40 rounded-2xl p-8 sm:p-12 border border-emerald-500/20 text-center space-y-5">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                </div>
                <h2 className="font-display text-3xl font-bold text-slate-100">Anatomical Profile Locked</h2>
                <p className="text-lg text-emerald-400 font-medium">Material Metrics Sync Completed</p>
                <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">Your 13-point biometric profile has been securely transmitted. Our master craftsmen will begin pattern engineering within 24 hours.</p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button onClick={() => onNavigate('configure')} className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300">Return to Configurator</button>
                  <button onClick={() => onNavigate('home')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-6 py-3 rounded-xl border border-slate-700 transition-all duration-300">Back to Homepage</button>
                </div>
                <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 max-w-sm mx-auto">
                  <div className="text-center"><div className="font-display text-xl font-bold text-slate-100">24h</div><div className="text-[10px] text-slate-500">Pattern Engineering</div></div>
                  <div className="text-center"><div className="font-display text-xl font-bold text-slate-100">6-8</div><div className="text-[10px] text-slate-500">Weeks Production</div></div>
                  <div className="text-center"><div className="font-display text-xl font-bold text-slate-100">0.3mm</div><div className="text-[10px] text-slate-500">Fit Tolerance</div></div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-100">Upper Body</h3>
                      <p className="text-xs text-slate-400">Torso, arms, and neck protection zones</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {measurementFields.upperBody.map((field) => (
                      <div key={field.id} className="relative">
                        <label htmlFor={field.id} className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === field.id || measurements[field.id] ? 'top-1 text-[10px] text-orange-400' : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'}`}>{field.label}</label>
                        <div className="relative">
                          <input id={field.id} type="number" min={field.min} max={field.max} value={measurements[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} onFocus={() => setFocusedField(field.id)} onBlur={() => setFocusedField(null)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 pt-5 pb-2 text-slate-100 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/10 transition-all" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-mono">{field.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-100">Lower Body</h3>
                      <p className="text-xs text-slate-400">Leg, hip, and waist articulation zones</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {measurementFields.lowerBody.map((field) => (
                      <div key={field.id} className="relative">
                        <label htmlFor={field.id} className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === field.id || measurements[field.id] ? 'top-1 text-[10px] text-orange-400' : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'}`}>{field.label}</label>
                        <div className="relative">
                          <input id={field.id} type="number" min={field.min} max={field.max} value={measurements[field.id] || ''} onChange={(e) => handleInputChange(field.id, e.target.value)} onFocus={() => setFocusedField(field.id)} onBlur={() => setFocusedField(null)} className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 pt-5 pb-2 text-slate-100 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/10 transition-all" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-mono">{field.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800">
                  <h4 className="font-display font-bold text-slate-100 mb-3 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                    Measurement Tips
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400">
                    <p className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />Use a soft measuring tape, not a rigid ruler</p>
                    <p className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />Measure over thin undergarments only</p>
                    <p className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />Keep tape snug but not compressing skin</p>
                    <p className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />Have a second person assist for accuracy</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className={`lg:col-span-1 transition-all duration-500 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="sticky top-36 space-y-4">
              <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800">
                <h4 className="font-display font-bold text-slate-100 mb-4 text-sm">Profile Status</h4>
                <div className="flex justify-center mb-5">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="5" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke={isComplete ? '#10b981' : '#f97316'} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${completion * 2.51} 251`} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`font-display text-2xl font-bold ${isComplete ? 'text-emerald-400' : 'text-orange-400'}`}>{completion}%</span>
                      <span className="text-[10px] text-slate-500">Complete</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {allFields.map((field) => (
                    <div key={field.id} className="flex items-center gap-2.5 py-1.5 border-b border-slate-800/50 last:border-0">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${measurements[field.id] ? 'border-emerald-500 bg-emerald-500' : 'border-slate-700'}`}>
                        {measurements[field.id] && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.5 12.75l6 6 9-13.5" /></svg>}
                      </div>
                      <span className={`text-xs ${measurements[field.id] ? 'text-slate-300' : 'text-slate-600'}`}>{field.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!isSubmitted && (
                <button onClick={handleSubmit} disabled={!isComplete} className={`w-full py-3.5 rounded-xl font-semibold text-center transition-all duration-300 ${isComplete ? 'bg-orange-500 text-white hover:bg-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
                  {isComplete ? 'Lock Anatomical Profile' : `Complete ${allFields.length - filledCount} More Fields`}
                </button>
              )}

              <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800">
                <h4 className="font-display font-bold text-slate-100 mb-2 text-sm">Why Precision Matters</h4>
                <p className="text-xs text-slate-400 leading-relaxed">A racing suit must fit like a second skin. Loose material creates drag and compromises armor positioning. Our 0.3mm tolerance ensures maximum protection and aerodynamic efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementForm;
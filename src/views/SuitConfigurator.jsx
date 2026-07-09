import React, { useState, useEffect, useRef } from 'react';
import { updateSEO } from '../utils/seoEngine.js';
import { suitTypes, perforationOptions, protectionOptions, teamPresets, heroImages, designInstructions, uploadProcessSteps } from '../data/configOptions.js';

const SuitConfigurator = ({ onNavigate, onAddToCart, cart, initialPresetId, onPresetConsumed, scrollToPresets }) => {
  const [suitType, setSuitType] = useState('1pc');
  const [perforation, setPerforation] = useState('perf-partial');
  const [protection, setProtection] = useState('prot-standard');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [uploadState, setUploadState] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [downloadNotification, setDownloadNotification] = useState(false);
  const [activeImage, setActiveImage] = useState(heroImages.suit1pc);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const [showDesignGuide, setShowDesignGuide] = useState(false);
  const [showUploadWorkflow, setShowUploadWorkflow] = useState(false);
  const fileInputRef = useRef(null);
  const presetsSectionRef = useRef(null);

  useEffect(() => {
    updateSEO('configure');
    setTimeout(() => setIsLoaded(true), 80);
  }, []);

  // If the user picked a preset on the Home page (or elsewhere) before
  // arriving here, apply it automatically so "Select Preset" actually
  // configures the suit instead of just landing on a blank configurator.
  useEffect(() => {
    if (initialPresetId) {
      const preset = teamPresets.find(p => p.id === initialPresetId);
      if (preset) applyPreset(preset);
      onPresetConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPresetId]);

  // When the user arrives via the "Presets" nav link, scroll straight to
  // the Team Presets section instead of leaving them at the top of the
  // Suit Type step.
  useEffect(() => {
    if (scrollToPresets) {
      const timer = setTimeout(() => {
        presetsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [scrollToPresets]);

  const calculatePrice = () => {
    const suit = suitTypes.find(s => s.id === suitType);
    const perf = perforationOptions.find(p => p.id === perforation);
    const prot = protectionOptions.find(p => p.id === protection);
    if (!suit || !perf || !prot) return 0;
    return suit.basePrice + suit.premium + perf.premium + prot.premium;
  };

  useEffect(() => {
    const suit = suitTypes.find(s => s.id === suitType);
    setActiveImage(suit?.img || heroImages.suit1pc);
    setActiveGalleryIndex(0);
  }, [suitType]);

  const applyPreset = (preset) => {
    setSelectedPreset(preset.id);
    setSuitType(preset.suitType);
    setPerforation(preset.perforation);
    setProtection(preset.protection);
    setActiveImage(preset.img);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files[0] || e.target.files?.[0];
    if (!file) return;
    setUploadedFile({ name: file.name, size: file.size, type: file.type });
    setUploadState('processing');
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + Math.random() * 12 + 8;
      });
    }, 180);
  };

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); if (uploadState === 'idle') setUploadState('dragging'); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); if (uploadState === 'dragging') setUploadState('idle'); };
  const handleFileSelect = (e) => { if (e.target.files?.[0]) handleFileDrop(e); };
  const clearUpload = () => { setUploadState('idle'); setUploadedFile(null); setUploadProgress(0); };

  const handleDownloadBlueprint = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1a"/>
      <stop offset="100%" style="stop-color:#050810"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2035" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="400" height="800" fill="url(#bg)"/>
  <rect width="400" height="800" fill="url(#grid)"/>
  <text x="200" y="35" text-anchor="middle" fill="#f97316" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2">APEX BESPOKE</text>
  <text x="200" y="55" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="9" letter-spacing="3">CUSTOM SUIT BLUEPRINT — FRONT VIEW</text>
  <line x1="40" y1="65" x2="360" y2="65" stroke="#f97316" stroke-width="0.5" opacity="0.5"/>
  <g fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="6 3">
    <ellipse cx="200" cy="95" rx="25" ry="18"/>
    <path d="M 175 110 Q 130 120 110 160 L 100 280"/>
    <path d="M 225 110 Q 270 120 290 160 L 300 280"/>
    <path d="M 110 160 L 105 320 Q 100 400 110 480"/>
    <path d="M 290 160 L 295 320 Q 300 400 290 480"/>
    <path d="M 100 280 L 90 420 L 85 520"/>
    <path d="M 300 280 L 310 420 L 315 520"/>
    <path d="M 110 480 L 105 600 L 100 720 L 110 780"/>
    <path d="M 290 480 L 295 600 L 300 720 L 290 780"/>
    <path d="M 110 480 Q 200 500 290 480"/>
  </g>
  <g fill="none" stroke="#475569" stroke-width="0.8" opacity="0.6">
    <rect x="140" y="130" width="120" height="90" rx="15"/>
    <rect x="150" y="230" width="100" height="100" rx="10" stroke-dasharray="3 3"/>
    <rect x="115" y="165" width="30" height="80" rx="8" transform="rotate(5 130 205)"/>
    <rect x="255" y="165" width="30" height="80" rx="8" transform="rotate(-5 270 205)"/>
    <rect x="120" y="500" width="60" height="120" rx="10"/>
    <rect x="220" y="500" width="60" height="120" rx="10"/>
    <rect x="115" y="620" width="50" height="50" rx="8"/>
    <rect x="235" y="620" width="50" height="50" rx="8"/>
  </g>
  <g fill="none" stroke="#f97316" stroke-width="0.8" opacity="0.4">
    <circle cx="130" cy="175" r="12"/>
    <circle cx="270" cy="175" r="12"/>
    <circle cx="140" cy="645" r="14"/>
    <circle cx="260" cy="645" r="14"/>
    <rect x="175" y="240" width="50" height="70" rx="5"/>
  </g>
  <g fill="none" stroke="#10b981" stroke-width="0.6" stroke-dasharray="4 2" opacity="0.5">
    <rect x="160" y="145" width="80" height="25" rx="3"/>
    <text x="200" y="162" text-anchor="middle" fill="#10b981" font-family="Arial" font-size="7" opacity="0.7">PRIMARY LOGO ZONE</text>
    <rect x="170" y="350" width="60" height="20" rx="3"/>
    <text x="200" y="364" text-anchor="middle" fill="#10b981" font-family="Arial" font-size="7" opacity="0.7">SECONDARY</text>
  </g>
  <g fill="none" stroke="#3b82f6" stroke-width="0.5" opacity="0.3">
    <rect x="145" y="135" width="40" height="60" rx="8"/>
    <rect x="215" y="135" width="40" height="60" rx="8"/>
    <text x="165" y="170" fill="#3b82f6" font-family="Arial" font-size="6" opacity="0.6">VENT</text>
    <text x="235" y="170" fill="#3b82f6" font-family="Arial" font-size="6" opacity="0.6">VENT</text>
  </g>
  <text x="200" y="420" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="8" opacity="0.8">DESIGN INSTRUCTIONS:</text>
  <text x="200" y="440" text-anchor="middle" fill="#475569" font-family="Arial" font-size="7">1. Use solid colors within panel boundaries</text>
  <text x="200" y="455" text-anchor="middle" fill="#475569" font-family="Arial" font-size="7">2. Logos must stay within green zones</text>
  <text x="200" y="470" text-anchor="middle" fill="#475569" font-family="Arial" font-size="7">3. Avoid designs crossing dashed seam lines</text>
  <text x="200" y="485" text-anchor="middle" fill="#475569" font-family="Arial" font-size="7">4. Export as SVG or 300 DPI PNG</text>
  <line x1="40" y1="740" x2="360" y2="740" stroke="#f97316" stroke-width="0.5" opacity="0.5"/>
  <text x="200" y="760" text-anchor="middle" fill="#334155" font-family="Arial" font-size="7" letter-spacing="1">APEX BESPOKE TAILORING — CONFIDENTIAL PRODUCTION DOCUMENT</text>
  <text x="200" y="775" text-anchor="middle" fill="#334155" font-family="Arial" font-size="6">DO NOT DISTRIBUTE — PROPRIETARY DESIGN TEMPLATE v2.4</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'apex-bespoke-suit-blueprint.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadNotification(true);
    setTimeout(() => setDownloadNotification(false), 4000);
  };

  const handleAddToCart = () => {
    const suit = suitTypes.find(s => s.id === suitType);
    const total = calculatePrice();
    onAddToCart({
      id: `config-${Date.now()}`,
      name: `${suit.name} — Custom Config`,
      price: total,
      img: activeImage,
      sku: suit.sku,
    });
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2500);
  };

  const currentSuit = suitTypes.find(s => s.id === suitType);
  const currentPerf = perforationOptions.find(p => p.id === perforation);
  const currentProt = protectionOptions.find(p => p.id === protection);
  const totalPrice = calculatePrice();
  const gallery = currentSuit?.gallery || [activeImage];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="sticky top-16 lg:top-20 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider hidden sm:inline">Custom Configuration</span>
              <span className="text-xs text-slate-600">|</span>
              <span className="text-xs text-slate-400">{currentSuit?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-2xl font-bold text-orange-400">${totalPrice.toLocaleString()}</span>
              <button onClick={handleAddToCart} className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                {showAdded ? 'Added ✓' : 'Add to Order'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className={`lg:col-span-3 space-y-5 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

            <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-bold">1</span>
                  Suit Type
                </h3>
                <span className="text-[10px] text-slate-600 font-mono uppercase">Step 1/3</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {suitTypes.map((suit) => (
                  <button key={suit.id} onClick={() => { setSuitType(suit.id); setSelectedPreset(null); }} className={`relative text-left p-4 rounded-xl border-2 transition-all duration-300 ${suitType === suit.id ? 'border-orange-500/40 bg-orange-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-600'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${suitType === suit.id ? 'border-orange-500' : 'border-slate-600'}`}>
                        {suitType === suit.id && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className="font-display text-lg font-bold text-slate-100">${suit.basePrice.toLocaleString()}</span>
                    </div>
                    <h4 className="font-semibold text-slate-100 text-sm mb-1">{suit.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">{suit.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suit.features.map(f => <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">{f}</span>)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-bold">2</span>
                  Ventilation
                </h3>
                <span className="text-[10px] text-slate-600 font-mono uppercase">Step 2/3</span>
              </div>
              <div className="space-y-2.5">
                {perforationOptions.map((perf) => (
                  <button key={perf.id} onClick={() => { setPerforation(perf.id); setSelectedPreset(null); }} className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all duration-300 ${perforation === perf.id ? 'border-orange-500/40 bg-orange-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-600'}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${perforation === perf.id ? 'border-orange-500' : 'border-slate-600'}`}>
                      {perforation === perf.id && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-semibold text-slate-100 text-sm">{perf.name}</h4>
                        <span className="font-display text-sm font-bold text-slate-300">{perf.premium > 0 ? `+$${perf.premium}` : 'Included'}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{perf.description}</p>
                    </div>
                    <img src={perf.img} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0 hidden sm:block" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-xs font-bold">3</span>
                  Protection
                </h3>
                <span className="text-[10px] text-slate-600 font-mono uppercase">Step 3/3</span>
              </div>
              <div className="space-y-2.5">
                {protectionOptions.map((prot) => (
                  <button key={prot.id} onClick={() => { setProtection(prot.id); setSelectedPreset(null); }} className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all duration-300 ${protection === prot.id ? 'border-orange-500/40 bg-orange-500/5' : 'border-slate-800 bg-slate-900/30 hover:border-slate-600'}`}>
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${protection === prot.id ? 'border-orange-500' : 'border-slate-600'}`}>
                      {protection === prot.id && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-semibold text-slate-100 text-sm">{prot.name}</h4>
                        <span className="font-display text-sm font-bold text-slate-300">{prot.premium > 0 ? `+$${prot.premium}` : 'Included'}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{prot.description}</p>
                    </div>
                    <img src={prot.img} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0 hidden sm:block" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300">
              <h3 className="font-display text-base font-bold text-slate-100 mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                Custom Design Blueprint
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <button onClick={handleDownloadBlueprint} className="group flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-orange-500/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-100 text-sm">Download Blank Template</div>
                    <div className="text-xs text-slate-500">SVG vector format</div>
                  </div>
                </button>

                <div onClick={() => uploadState === 'idle' && fileInputRef.current?.click()} onDrop={handleFileDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className={`relative cursor-pointer flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all duration-300 ${uploadState === 'dragging' ? 'border-orange-500 bg-orange-500/5' : uploadState === 'success' ? 'border-emerald-500 bg-emerald-500/5' : uploadState === 'processing' ? 'border-orange-400 bg-orange-500/5' : 'border-slate-700 hover:border-orange-500/40 bg-slate-900/50'}`}>
                  <input ref={fileInputRef} type="file" accept=".svg,.ai,.pdf,.eps,.png,.jpg" onChange={handleFileSelect} className="hidden" />
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${uploadState === 'success' ? 'bg-emerald-500/10 text-emerald-500' : uploadState === 'processing' ? 'bg-orange-500/10 text-orange-500' : 'bg-slate-800 text-slate-400'}`}>
                    {uploadState === 'success' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    {uploadState === 'success' ? <><div className="font-semibold text-emerald-400 text-sm">Design Verified</div><div className="text-xs text-emerald-500/70 truncate">{uploadedFile?.name}</div></> : uploadState === 'processing' ? <><div className="font-semibold text-orange-400 text-sm">Processing...</div><div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden"><div className="h-full bg-orange-500 rounded-full transition-all duration-200" style={{ width: `${Math.min(uploadProgress, 100)}%` }} /></div></> : <><div className="font-semibold text-slate-100 text-sm">Upload Your Design</div><div className="text-xs text-slate-500">Drop .SVG, .AI, .PDF, .PNG</div></>}
                  </div>
                </div>
              </div>

              {uploadState === 'success' && uploadedFile && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-semibold text-emerald-400">Custom Blueprint Verified & Linked to Order</span>
                    </div>
                    <button onClick={clearUpload} className="text-xs text-slate-500 hover:text-red-400 transition-colors">Remove</button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">{uploadedFile.name}</span>
                    <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                    <span className="text-emerald-500/70">Ready for production</span>
                  </div>
                  <button onClick={() => setShowUploadWorkflow(!showUploadWorkflow)} className="mt-3 text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">
                    {showUploadWorkflow ? 'Hide' : 'View'} what happens next
                    <svg className={`w-3 h-3 transition-transform duration-300 ${showUploadWorkflow ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  {showUploadWorkflow && (
                    <div className="mt-3 space-y-2 animate-slide-up">
                      {uploadProcessSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/50">
                          <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-[10px] font-bold shrink-0">{step.step}</div>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{step.title}</div>
                            <div className="text-[10px] text-slate-500">{step.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => setShowDesignGuide(!showDesignGuide)} className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                  How to Create Your Custom Design
                </span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${showDesignGuide ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </button>

              {showDesignGuide && (
                <div className="mt-3 space-y-3 animate-slide-up">
                  {designInstructions.map((inst, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={inst.icon} /></svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">{inst.step}. {inst.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{inst.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {downloadNotification && (
                <div className="mt-3 flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                  <div>
                    <div className="font-semibold text-emerald-400 text-sm">Downloaded: apex-bespoke-suit-blueprint.svg</div>
                    <div className="text-xs text-emerald-500/70">Open in Illustrator, Inkscape, or Figma to design your suit</div>
                  </div>
                </div>
              )}
            </div>

            <div ref={presetsSectionRef} className="bg-slate-900/40 rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 scroll-mt-36">
              <h3 className="font-display text-base font-bold text-slate-100 mb-2">Team Presets</h3>
              <p className="text-xs text-slate-400 mb-5">One-click apply professional racing configurations</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {teamPresets.map((preset) => (
                  <button key={preset.id} onClick={() => applyPreset(preset)} className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedPreset === preset.id ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]' : 'border-slate-800 hover:border-slate-600'}`}>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img src={preset.img} alt={preset.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="font-display font-bold text-slate-100 text-xs">{preset.name}</div>
                      <div className="text-[10px] text-orange-400">{preset.tagline}</div>
                    </div>
                    {selectedPreset === preset.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={`lg:col-span-2 transition-all duration-500 delay-100 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="sticky top-36 space-y-5">
              <div className="bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img src={activeImage} alt="Selected suit" className="w-full h-full object-cover transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">{currentSuit?.name}</span>
                      <span className="px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">{currentPerf?.name}</span>
                      <span className="px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">{currentProt?.name}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button key={i} onClick={() => { setActiveImage(img); setActiveGalleryIndex(i); }} className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${activeGalleryIndex === i ? 'border-orange-500' : 'border-slate-800 hover:border-slate-600'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                <h4 className="font-display font-bold text-slate-100 mb-4 text-sm">Price Breakdown</h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{currentSuit?.name}</span>
                    <span className="text-slate-200 font-medium">${(currentSuit?.basePrice + currentSuit?.premium).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{currentPerf?.name}</span>
                    <span className="text-slate-200 font-medium">{currentPerf?.premium > 0 ? `+$${currentPerf.premium}` : 'Included'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{currentProt?.name}</span>
                    <span className="text-slate-200 font-medium">{currentProt?.premium > 0 ? `+$${currentProt.premium}` : 'Included'}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-slate-100">Total</span>
                      <span className="font-display text-2xl font-bold text-orange-400">${totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1">6-8 week production. Free alterations within 30 days.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={handleAddToCart} className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                  {showAdded ? '✓ Added to Order' : 'Add to Order'}
                </button>
                <button onClick={() => onNavigate('measure')} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl border border-slate-700 transition-all duration-300">
                  Proceed to Measurements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuitConfigurator;

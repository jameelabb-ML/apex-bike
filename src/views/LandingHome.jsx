import React, { useEffect, useState, useRef } from 'react';
import { updateSEO } from '../utils/seoEngine.js';
import { suitTypes, teamPresets, heroImages, reviews, faqs } from '../data/configOptions.js';

const LandingHome = ({ onNavigate, onAddToCart }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    updateSEO('home');
    setTimeout(() => setIsLoaded(true), 80);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '2,847', label: 'Suits Delivered' },
    { value: '14', label: 'Championship Teams' },
    { value: '0.3mm', label: 'Tolerance' },
    { value: '5yr', label: 'Warranty' },
  ];

  const features = [
    { title: 'Made to Measure', desc: '13-point biometric precision for a second-skin fit.', icon: 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' },
    { title: 'CE Certified', desc: 'EN 13595-1 & EN 1621-1/2 certified race-grade protection.', icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' },
    { title: '6-8 Week Delivery', desc: 'From measurement lock to your doorstep with live tracking.', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Custom Designs', desc: 'Upload your artwork or choose from championship team presets.', icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO with parallax */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages.hero}
            alt="Motorcycle rider on track"
            className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.3}px)` }}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.1}px)`
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-2xl">
            <div className={`transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide mb-6 animate-pulse-glow">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                EST. 2019 — CUSTOM RACING LEATHERS
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                <span className="text-slate-100">ENGINEERED</span><br />
                <span className="text-slate-300">FOR VELOCITY.</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 text-glow">TAILORED</span><br />
                <span className="text-slate-300">FOR SURVIVAL.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-8">
                Precision-crafted custom motorcycle leather suits, made-to-measure track leathers, and one-piece racing suit builder experiences for elite riders worldwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => onNavigate('configure')} className="group bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                  Configure Your Suit
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
                <button onClick={() => onNavigate('measure')} className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium px-6 py-4 rounded-xl border border-slate-700 transition-all duration-300 hover:border-slate-600">
                  Take Measurements
                </button>
              </div>
            </div>
            <div className={`mt-12 grid grid-cols-4 gap-4 max-w-lg transition-all duration-700 delay-200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {stats.map((s) => (
                <div key={s.label} className="text-center group">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-orange-400 transition-colors duration-300">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-slate-950 border-b border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`group p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-orange-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.05)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${300 + i * 100}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
                </div>
                <h3 className="font-display font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS — SHOP SECTION */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-xs text-orange-500 font-semibold tracking-wider uppercase mb-2">Shop Collection</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Configure Your Suit</h2>
            </div>
            <button onClick={() => onNavigate('configure')} className="hidden sm:flex items-center gap-2 text-sm text-orange-400 font-medium hover:text-orange-300 transition-colors group">
              View All <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {suitTypes.map((suit) => (
              <div key={suit.id} className="group bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden hover:border-orange-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.05)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img src={suit.img} alt={suit.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-xs font-bold">{suit.stock}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 transition-colors duration-300 ${i < Math.floor(suit.rating) ? 'text-orange-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                      <span className="text-xs text-slate-400 ml-1">({suit.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-slate-100">{suit.name}</h3>
                    <span className="font-display text-2xl font-bold text-orange-400">${suit.basePrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{suit.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {suit.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">{f}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => onNavigate('configure')} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      Configure
                    </button>
                    <button onClick={() => onAddToCart({ id: suit.id, name: suit.name, price: suit.basePrice, img: suit.img, sku: suit.sku })} className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300 hover:scale-105">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM PRESETS */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/3 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="text-xs text-orange-500 font-semibold tracking-wider uppercase mb-2">Team Presets</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100 mb-3">Championship Designs</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Choose from professional team racing suit configurations. One click applies the full specification.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {teamPresets.map((preset) => (
              <div key={preset.id} className="group bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden hover:border-orange-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_rgba(249,115,22,0.05)]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={preset.img} alt={preset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${preset.stock === 'In Stock' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>{preset.stock}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-lg font-bold text-slate-100">{preset.name}</h3>
                    <p className="text-xs text-orange-400 font-medium">{preset.tagline}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500">{preset.colorScheme}</span>
                    <span className="font-display text-xl font-bold text-orange-400">${preset.basePrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => onNavigate('configure')} className="w-full bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white font-medium py-2.5 rounded-lg border border-slate-700 hover:border-orange-500 transition-all duration-300">
                    Select Preset
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs text-orange-500 font-semibold tracking-wider uppercase mb-2">Testimonials</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Rider Reviews</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-orange-400' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-100">{review.name}</div>
                    <div className="text-xs text-slate-500">{review.location}</div>
                  </div>
                  {review.verified && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs text-orange-500 font-semibold tracking-wider uppercase mb-2">FAQ</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-100">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl bg-slate-900/40 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all duration-300">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-medium text-slate-200 text-sm">{faq.q}</span>
                  <svg className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 text-glow">Dominate</span> the Track?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Join 2,847 elite riders who trust APEX Bespoke Tailoring. Your perfect fit awaits.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => onNavigate('configure')} className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] hover:scale-[1.02]">
              Start Configuration
            </button>
            <button onClick={() => onNavigate('measure')} className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-medium px-6 py-4 rounded-xl border border-slate-700 transition-all duration-300 hover:border-slate-600">
              View Measurement Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingHome;
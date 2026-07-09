import React, { useState, useEffect, useCallback } from 'react';
import { updateSEO, preloadImages } from './utils/seoEngine.js';
import { heroImages } from './data/configOptions.js';
import LandingHome from './views/LandingHome.jsx';
import SuitConfigurator from './views/SuitConfigurator.jsx';
import MeasurementForm from './views/MeasurementForm.jsx';
import CartDrawer from './components/CartDrawer.jsx';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Holds a team-preset id that was selected on the Home page so the
  // Configurator can apply it automatically when it opens.
  const [presetToApply, setPresetToApply] = useState(null);

  useEffect(() => {
    preloadImages([
      heroImages.hero,
      heroImages.suit1pc,
      heroImages.suit2pc,
      heroImages.teamPresets,
      heroImages.airbag,
      heroImages.blueprint,
    ]);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, cartId: Date.now() }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // `payload` optionally carries a team-preset id (e.g. from the Home page's
  // "Select Preset" cards) so the Configurator can apply that exact
  // suit/perforation/protection combination as soon as it opens.
  const navigateTo = (view, payload = null) => {
    if (view === currentView) {
      setMobileMenuOpen(false);
      if (payload) setPresetToApply(payload);
      return;
    }
    setIsTransitioning(true);
    setMobileMenuOpen(false);
    setTimeout(() => {
      setCurrentView(view);
      setPresetToApply(payload);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setIsTransitioning(false), 150);
    }, 250);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <LandingHome onNavigate={navigateTo} onAddToCart={addToCart} />;
      case 'configure':
        return (
          <SuitConfigurator
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            cart={cart}
            initialPresetId={presetToApply}
            onPresetConsumed={() => setPresetToApply(null)}
            scrollToPresets={false}
          />
        );
      case 'measure':
        return <MeasurementForm onNavigate={navigateTo} />;
      case 'presets':
        return (
          <SuitConfigurator
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            cart={cart}
            initialPresetId={presetToApply}
            onPresetConsumed={() => setPresetToApply(null)}
            scrollToPresets={true}
          />
        );
      default:
        return <LandingHome onNavigate={navigateTo} onAddToCart={addToCart} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'configure', label: 'Shop' },
    { id: 'measure', label: 'Measure' },
    { id: 'presets', label: 'Presets' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30 selection:text-orange-100">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-base lg:text-lg font-bold tracking-widest text-slate-100">APEX BESPOKE</span>
                <span className="block text-[9px] lg:text-[10px] text-slate-500 tracking-[0.3em] uppercase -mt-0.5">Tailoring</span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className="relative w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-4 space-y-1 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/60">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentView === item.id
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onRemove={removeFromCart} total={cartTotal} onNavigate={navigateTo} />

      <main className={`pt-16 lg:pt-20 transition-opacity duration-250 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderView()}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                </div>
                <span className="font-display font-bold tracking-widest text-slate-100 text-sm">APEX BESPOKE</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Precision-crafted custom motorcycle leather suits. Engineered for velocity, tailored for survival.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Shop</h4>
              <ul className="space-y-2.5">
                {['1-Piece Suits', '2-Piece Suits', 'Team Presets', 'Protection Upgrades'].map(l => (
                  <li key={l}><button onClick={() => navigateTo('configure')} className="text-sm text-slate-500 hover:text-orange-400 transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Support</h4>
              <ul className="space-y-2.5">
                {['Measurement Guide', 'Size Calculator', 'Shipping Info', 'Warranty'].map(l => (
                  <li key={l}><button onClick={() => navigateTo('measure')} className="text-sm text-slate-500 hover:text-orange-400 transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-200 mb-4 text-xs tracking-wider uppercase">Contact</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li>atelier@apexbespoke.com</li>
                <li>+1 (555) 019-2847</li>
                <li>Monza, Italy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-600">&copy; 2024 APEX Bespoke Tailoring. CE Certified.</div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms</span>
              <span className="hover:text-slate-400 cursor-pointer">Warranty</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

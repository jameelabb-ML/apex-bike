import React from 'react';

const CartDrawer = ({ open, onClose, cart, onRemove, total, onNavigate }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-950 border-l border-slate-800 z-[70] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <h2 className="font-display text-lg font-bold text-slate-100">Your Order</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-sm">Your cart is empty</p>
                <button
                  onClick={() => { onClose(); onNavigate('configure'); }}
                  className="mt-4 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                >
                  Start Configuring →
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <img src={item.img} alt={item.name} className="w-20 h-24 object-cover rounded-lg bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-100 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.sku}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-orange-400 font-display font-bold">${item.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500">Qty: {item.qty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.cartId)}
                    className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Subtotal</span>
                <span className="font-display text-xl font-bold text-slate-100">${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-600">Shipping and taxes calculated at checkout. 6-8 week production time.</p>
              <button
                onClick={() => onNavigate('measure')}
                className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                Proceed to Measurements
              </button>
              <button
                onClick={() => onNavigate('configure')}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl border border-slate-700 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, Tag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'course' | 'gear';
  image: string;
}

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  items,
  onRemoveItem,
  onClearCart,
}) => {
  const isEn = lang === 'en';
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Miller',
    email: 'john@apexbuilders.com',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '921',
    zip: '75001'
  });

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal > 0 ? +(subtotal * 0.0825).toFixed(2) : 0;
  const total = +(subtotal + tax).toFixed(2);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 } });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-slate-100">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-heading text-white">
                {isEn ? '1-Step Secure Checkout' : 'Pago Seguro en 1 Paso'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <>
              {/* Cart Items List */}
              <div className="py-4 space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {isEn ? `Order Items (${items.length})` : `Artículos en Carrito (${items.length})`}
                </span>

                {items.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    {isEn ? 'Your cart is currently empty. Add a course or gear item!' : 'El carrito está vacío. ¡Agregue un curso o equipo!'}
                  </div>
                ) : (
                  items.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                        <div>
                          <p className="text-xs font-bold text-white leading-snug">{item.name}</p>
                          <span className="text-[10px] text-amber-400/90 font-mono capitalize">
                            {item.type === 'course' ? '🎓 Online Training' : '🦺 Physical PPE'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-white font-heading">${item.price}</span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Express Checkout Simulation (Square iframe token) */}
              {items.length > 0 && (
                <form onSubmit={handlePay} className="space-y-4 pt-2 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      Square Direct Tokenization
                    </span>
                    <span className="text-[10px] text-slate-400">Card data never touches server</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">{isEn ? 'Full Name' : 'Nombre Completo'}</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">{isEn ? 'Student / Company Email' : 'Correo de Registro'}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">{isEn ? 'Card Number' : 'Tarjeta'}</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">Exp</label>
                        <input
                          type="text"
                          value={formData.expDate}
                          onChange={e => setFormData({ ...formData, expDate: e.target.value })}
                          className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full px-2 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white text-center font-mono"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal:</span>
                      <span className="font-mono">${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Estimated Tax (8.25%):</span>
                      <span className="font-mono">${tax.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                      <span>Total Due:</span>
                      <span className="text-amber-400 font-heading text-base">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Processing Square Transaction...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>{isEn ? `Pay $${total.toFixed(2)} & Start Learning` : `Pagar $${total.toFixed(2)} e Iniciar`}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          ) : (
            /* Purchase Success Screen */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold font-heading text-white">
                {isEn ? 'Enrollment Confirmed!' : '¡Inscripción Confirmada!'}
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {isEn
                  ? `Your order has been processed via Square. Instant LMS access credentials have been sent to ${formData.email}.`
                  : `Su orden fue procesada. Los accesos inmediatos a Safety University han sido enviados a ${formData.email}.`}
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 font-mono">
                Order ID: #SOS-PAY-{Math.floor(Math.random()*900000)}
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClearCart();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
              >
                {isEn ? 'Close & Continue Browsing' : 'Cerrar y Continuar'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

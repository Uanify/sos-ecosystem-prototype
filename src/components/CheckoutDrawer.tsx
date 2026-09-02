import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { SafeImage } from './SafeImage';
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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto text-slate-900">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-black font-heading text-slate-950">
                {isEn ? '1-Step Secure Checkout' : 'Pago Seguro en 1 Paso'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <>
              {/* Cart Items List */}
              <div className="py-4 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {isEn ? `Order Items (${items.length})` : `Artículos en Carrito (${items.length})`}
                </span>

                {items.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    {isEn ? 'Your cart is currently empty. Add a course or gear item!' : 'El carrito está vacío. ¡Agregue un curso o equipo!'}
                  </div>
                ) : (
                  items.map(item => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          type={item.type === 'course' ? 'course' : 'product'}
                          title={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-950 leading-snug">{item.name}</p>
                          <span className="text-[10px] text-blue-600 font-bold capitalize">
                            {item.type === 'course' ? '🎓 Online Training' : '🦺 Physical PPE'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-slate-950 font-heading">${item.price}</span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
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
                <form onSubmit={handlePay} className="space-y-4 pt-2 border-t border-slate-200">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs">
                    <span className="text-blue-900 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      Square Direct Tokenization
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Card data never touches server</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">{isEn ? 'Full Name' : 'Nombre Completo'}</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">{isEn ? 'Student / Company Email' : 'Correo de Registro'}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">{isEn ? 'Card Number' : 'Tarjeta'}</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono font-medium"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Exp</label>
                        <input
                          type="text"
                          value={formData.expDate}
                          onChange={e => setFormData({ ...formData, expDate: e.target.value })}
                          className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 text-center font-mono font-medium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={e => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 text-center font-mono font-medium"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>Subtotal:</span>
                      <span className="font-mono font-bold text-slate-950">${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-medium">
                      <span>Estimated Tax (8.25%):</span>
                      <span className="font-mono font-bold text-slate-950">${tax.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-slate-950 font-bold text-sm pt-2 border-t border-slate-200">
                      <span>Total Due:</span>
                      <span className="text-blue-600 font-heading text-base font-black">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
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
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black font-heading text-slate-950">
                {isEn ? 'Enrollment Confirmed!' : '¡Inscripción Confirmada!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-medium">
                {isEn
                  ? `Your order has been processed via Square. Instant LMS access credentials have been sent to ${formData.email}.`
                  : `Su orden fue procesada. Los accesos inmediatos a Safety University han sido enviados a ${formData.email}.`}
              </p>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 font-mono font-bold">
                Order ID: #SOS-PAY-{Math.floor(Math.random()*900000)}
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClearCart();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
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

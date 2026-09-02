import React from 'react';
import { PRODUCTS_DATA } from '../data/content';
import { ShoppingCart, Star, ShieldCheck, Tag } from 'lucide-react';
import { SafeImage } from './SafeImage';
import type { TierMode } from './TierSwitcherBanner';

interface GearStoreProps {
  lang: 'en' | 'es';
  tier: TierMode;
  onAddToCart: (item: { id: string; name: string; price: number; type: 'course' | 'gear'; image: string }) => void;
}

export const GearStore: React.FC<GearStoreProps> = ({ lang, onAddToCart }) => {
  const isEn = lang === 'en';

  return (
    <section id="gear-store" className="py-20 bg-white border-b border-slate-200 relative text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>{isEn ? 'Integrated Physical E-Commerce Store' : 'Tienda Integrada de Equipo Físico'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950">
              {isEn ? 'OSHA-Approved Jobsite Safety Gear & PPE' : 'Equipo de Protección Personal Certificado'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
              {isEn
                ? 'High-performance fall harnesses, vented helmets, and ANSI safety equipment. Seamless checkout without external Square redirects.'
                : 'Arneses de seguridad, cascos de impacto y equipo ANSI de alta calidad con compra directa sin salir del sitio.'}
            </p>
          </div>

          {/* Cross-Sell Bundle Callout */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 max-w-md shadow-xs">
            <div className="flex items-start gap-2.5">
              <Tag className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-blue-900 block">
                  {isEn ? 'Smart Bundle Promotion (-15% OFF)' : 'Promoción en Combo Inteligente (-15%)'}
                </span>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {isEn
                    ? 'Enroll in any training course today and receive 15% off certified safety harnesses or helmets at checkout.'
                    : 'Inscríbase en cualquier curso y obtenga 15% de descuento en arneses o cascos en su carrito.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS_DATA.map(product => (
            <div
              key={product.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between group shadow-xs hover:shadow-xl"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center border-b border-slate-200">
                  <SafeImage
                    src={product.image}
                    alt={isEn ? product.name : product.nameEs}
                    type="product"
                    title={isEn ? product.name : product.nameEs}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.highlight && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {isEn ? product.highlight : product.highlightEs}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {product.sku}
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <span className="text-[11px] text-blue-600 font-bold block uppercase tracking-wider">
                    {isEn ? product.category : product.categoryEs}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1 font-heading">
                    {isEn ? product.name : product.nameEs}
                  </h3>

                  <div className="flex items-center gap-1 text-amber-500 text-xs mt-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-slate-900">{product.rating}</span>
                    <span className="text-slate-400 text-[11px]">/ 5.0</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-5 pt-0 border-t border-slate-200 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <div>
                    <span className="text-xl font-black text-blue-600 font-heading">${product.price}</span>
                    <span className="text-[10px] text-slate-500 font-bold ml-1">USD</span>
                  </div>

                  <button
                    onClick={() => onAddToCart({
                      id: product.id,
                      name: isEn ? product.name : product.nameEs,
                      price: product.price,
                      type: 'gear',
                      image: product.image
                    })}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Add' : 'Agregar'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

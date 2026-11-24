import { e as createAstro, f as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_BYrrl7zG.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro("https://universidadantequera.edu.mx");
const $$PageBanner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageBanner;
  const { eyebrow, title, subtitle, breadcrumb } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="relative pt-32 pb-16 sm:pt-36 sm:pb-20 overflow-hidden text-white" style="background: linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 60%, #152D4B 100%);"> <!-- Architectural subtle grid pattern --> <div class="pointer-events-none absolute inset-0 opacity-[0.06]" style="background-image: linear-gradient(to right, #C69D48 1px, transparent 1px), linear-gradient(to bottom, #C69D48 1px, transparent 1px); background-size: 56px 56px;"></div> <!-- Warm golden ambient aura --> <div class="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl" style="background: var(--brand-accent);"></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> <!-- Breadcrumb --> <nav class="flex items-center gap-2 text-xs text-white/60 mb-6" aria-label="Ruta de navegación" data-reveal> <a href="/" class="hover:text-[#E6C77B] transition-colors">Inicio</a> <span>/</span> <span class="text-[#E6C77B] font-medium">${breadcrumb}</span> </nav> <div class="max-w-3xl space-y-4"> <p class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);" data-reveal data-delay="50"> <span class="w-6 h-[1px]" style="background: var(--brand-accent);"></span> ${eyebrow} </p> <h1 class="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-white" data-reveal data-delay="110"> ${title} </h1> <p class="text-base sm:text-lg text-white/78 leading-relaxed max-w-2xl" data-reveal data-delay="170"> ${subtitle} </p> </div> </div> <!-- Bottom architectural gold hairline --> <div class="absolute bottom-0 inset-x-0 h-[2px]" style="background: linear-gradient(90deg, transparent, var(--brand-accent), transparent);"></div> </section>`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/PageBanner.astro", void 0);

export { $$PageBanner as $ };

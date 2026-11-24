import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_BYrrl7zG.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_tSEjnfP6.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/","cacheDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/node_modules/.astro/","outDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/dist/","srcDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/","publicDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/public/","buildClientDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/dist/client/","buildServerDir":"file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/admisiones","isIndex":false,"type":"page","pattern":"^\\/admisiones\\/?$","segments":[[{"content":"admisiones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admisiones.astro","pathname":"/admisiones","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth.ts","pathname":"/api/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/content","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/content\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"content","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/content.ts","pathname":"/api/content","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/messages","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/messages\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"messages","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/messages.ts","pathname":"/api/messages","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.ts","pathname":"/api/upload","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/aviso-de-privacidad","isIndex":false,"type":"page","pattern":"^\\/aviso-de-privacidad\\/?$","segments":[[{"content":"aviso-de-privacidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/aviso-de-privacidad.astro","pathname":"/aviso-de-privacidad","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/oferta-educativa","isIndex":false,"type":"page","pattern":"^\\/oferta-educativa\\/?$","segments":[[{"content":"oferta-educativa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oferta-educativa.astro","pathname":"/oferta-educativa","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/universidad","isIndex":false,"type":"page","pattern":"^\\/universidad\\/?$","segments":[[{"content":"universidad","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/universidad.astro","pathname":"/universidad","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/vida-academica","isIndex":false,"type":"page","pattern":"^\\/vida-academica\\/?$","segments":[[{"content":"vida-academica","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vida-academica.astro","pathname":"/vida-academica","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CbXg7tWQ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://universidadantequera.edu.mx","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admisiones.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/aviso-de-privacidad.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/oferta-educativa.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/universidad.astro",{"propagation":"none","containsHead":true}],["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/vida-academica.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/admisiones@_@astro":"pages/admisiones.astro.mjs","\u0000@astro-page:src/pages/api/auth@_@ts":"pages/api/auth.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/api/content@_@ts":"pages/api/content.astro.mjs","\u0000@astro-page:src/pages/api/messages@_@ts":"pages/api/messages.astro.mjs","\u0000@astro-page:src/pages/api/upload@_@ts":"pages/api/upload.astro.mjs","\u0000@astro-page:src/pages/aviso-de-privacidad@_@astro":"pages/aviso-de-privacidad.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/oferta-educativa@_@astro":"pages/oferta-educativa.astro.mjs","\u0000@astro-page:src/pages/universidad@_@astro":"pages/universidad.astro.mjs","\u0000@astro-page:src/pages/vida-academica@_@astro":"pages/vida-academica.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CJI6dhWB.mjs","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cy5x9Aw2.mjs","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_tZiMb17R.mjs","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/admin/AdminPanel":"_astro/AdminPanel.BeVCL6hF.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/AdmissionsStepper":"_astro/AdmissionsStepper.CAwcFiyT.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/ContactForm":"_astro/ContactForm.CsJG9PY1.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/CurriculumExplorer":"_astro/CurriculumExplorer.DJWnBTGd.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/PdfDocumentsHub":"_astro/PdfDocumentsHub.BdT_F6ZP.js","@astrojs/react/client.js":"_astro/client.C5RI7xnT.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.B1s6EZz0.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.wUCLLESu.js","C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.T_0Ydtbi.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/Header.astro?astro&type=script&index=0&lang.ts","function i(){const n=document.getElementById(\"mobile-menu-toggle\"),t=document.getElementById(\"mobile-menu-drawer\"),l=document.getElementById(\"menu-icon-open\"),c=document.getElementById(\"menu-icon-close\");if(!n||!t)return;let e=!1;const s=o=>{e=o,n.setAttribute(\"aria-expanded\",String(e)),t.classList.toggle(\"opacity-0\",!e),t.classList.toggle(\"pointer-events-none\",!e),t.classList.toggle(\"-translate-y-3\",!e),l?.classList.toggle(\"hidden\",e),c?.classList.toggle(\"hidden\",!e)};n.onclick=()=>s(!e),t.querySelectorAll(\"a\").forEach(o=>{o.addEventListener(\"click\",()=>s(!1))})}document.addEventListener(\"astro:page-load\",i);"]],"assets":["/_astro/index.CbXg7tWQ.css","/images/academic-seminar.jpg","/images/campus-library.jpg","/images/hero-campus.jpg","/_astro/AdminPanel.BeVCL6hF.js","/_astro/AdmissionsStepper.CAwcFiyT.js","/_astro/BaseLayout.astro_astro_type_script_index_0_lang.T_0Ydtbi.js","/_astro/circle-check.CsdR-JcX.js","/_astro/client.C5RI7xnT.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.B1s6EZz0.js","/_astro/ContactForm.CsJG9PY1.js","/_astro/createLucideIcon.1TLBss0v.js","/_astro/CurriculumExplorer.DJWnBTGd.js","/_astro/download.BcNpSD_w.js","/_astro/file-text.BL116jhW.js","/_astro/graduation-cap.BsOVmhRO.js","/_astro/index.CsNfoN0O.js","/_astro/index.DLkBFFtG.js","/_astro/loader-circle.CqoBZuzr.js","/_astro/PdfDocumentsHub.BdT_F6ZP.js","/_astro/proxy.JWPa6-X8.js","/docs/calendario-escolar-2026-2027.pdf","/docs/convocatoria-admision-2026.pdf","/docs/plan-de-estudios-lige.pdf","/docs/reglamento-institucional.pdf"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"TYK/my7joj31e36O5fuNVNa4KJ7xvYtuQeXsHULw4Rg=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\omarc\\OneDrive\\Desktop\\Proyectos\\Escuela\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_tZiMb17R.mjs');

export { manifest };

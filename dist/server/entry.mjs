import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_xc4YQ-Cz.mjs';
import { manifest } from './manifest_CJI6dhWB.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/admisiones.astro.mjs');
const _page3 = () => import('./pages/api/auth.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/api/content.astro.mjs');
const _page6 = () => import('./pages/api/messages.astro.mjs');
const _page7 = () => import('./pages/api/upload.astro.mjs');
const _page8 = () => import('./pages/aviso-de-privacidad.astro.mjs');
const _page9 = () => import('./pages/contacto.astro.mjs');
const _page10 = () => import('./pages/oferta-educativa.astro.mjs');
const _page11 = () => import('./pages/universidad.astro.mjs');
const _page12 = () => import('./pages/vida-academica.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/index.astro", _page1],
    ["src/pages/admisiones.astro", _page2],
    ["src/pages/api/auth.ts", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/api/content.ts", _page5],
    ["src/pages/api/messages.ts", _page6],
    ["src/pages/api/upload.ts", _page7],
    ["src/pages/aviso-de-privacidad.astro", _page8],
    ["src/pages/contacto.astro", _page9],
    ["src/pages/oferta-educativa.astro", _page10],
    ["src/pages/universidad.astro", _page11],
    ["src/pages/vida-academica.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/dist/client/",
    "server": "file:///C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };

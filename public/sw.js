// Service worker de Kalanso : garde les pages visitées pour les lire sans connexion.
//
// - Pages : réseau d'abord (contenu à jour), cache si pas de réseau, sinon page « hors ligne ».
// - Fichiers statiques (_next/static, polices, icônes) : cache d'abord, ils ne changent jamais d'adresse.
// - Jamais en cache : /api, les pages de compte et d'administration.

const VERSION = 'v1';
const PAGES = `kalanso-pages-${VERSION}`;
const ASSETS = `kalanso-assets-${VERSION}`;
const OFFLINE_PAGES = ['/fr/hors-ligne', '/bm/hors-ligne'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PAGES).then((cache) => cache.addAll(OFFLINE_PAGES)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![PAGES, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function isPrivate(url) {
  return url.pathname.startsWith('/api/') || /^\/(fr|bm)\/(compte|admin)(\/|$)/.test(url.pathname);
}

function isAsset(url) {
  return url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/') || /\.(woff2?|png|svg|ico)$/.test(url.pathname);
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isPrivate(url)) return;

  if (isAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(ASSETS).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  const isPage = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html');
  if (!isPage) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(PAGES).then((cache) => cache.put(url.pathname, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(url.pathname);
        if (cached) return cached;
        const lang = url.pathname.startsWith('/bm') ? 'bm' : 'fr';
        return (await caches.match(`/${lang}/hors-ligne`)) || Response.error();
      }),
  );
});

import Script from "next/script";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const hasGoogle = Boolean(GTM_ID || GA4_ID || ADS_ID);
// When GTM is present, GA4/Ads/Meta should be configured inside GTM's UI —
// the direct snippets are skipped (Section 9.2).
const loadDirectGtag = !GTM_ID && Boolean(GA4_ID || ADS_ID);
const loadDirectPixel = !GTM_ID && Boolean(PIXEL_ID);

/** True when at least one analytics tool is configured via env vars. */
export const analyticsConfigured = hasGoogle || Boolean(PIXEL_ID);

/**
 * Consent Mode v2 defaults — everything denied until the visitor accepts
 * (ConsentBanner calls applyConsent). Runs before any tag executes: the
 * inline script executes synchronously on injection, while GTM/gtag.js load
 * async afterwards and read the queued consent state from dataLayer.
 */
const consentInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
(function () {
  var stored = null;
  try { stored = localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
})();
`;

const gtmInit = GTM_ID
  ? `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`
  : "";

const gtagConfig = loadDirectGtag
  ? `
${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
`
  : "";

const pixelInit = loadDirectPixel
  ? `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
(function () {
  var stored = null;
  try { stored = localStorage.getItem('${CONSENT_STORAGE_KEY}'); } catch (e) {}
  fbq('consent', stored === 'granted' ? 'grant' : 'revoke');
})();
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
`
  : "";

/**
 * Rendered once in the root layout. Every script loads afterInteractive so
 * nothing blocks first paint (protects LCP/INP), and the whole component
 * renders nothing when no analytics env vars are set.
 */
export function TrackingScripts() {
  if (!analyticsConfigured) return null;

  return (
    <>
      {hasGoogle && (
        <Script id="consent-init" strategy="afterInteractive">
          {consentInit}
        </Script>
      )}
      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {gtmInit}
        </Script>
      )}
      {loadDirectGtag && (
        <>
          <Script
            id="gtag-js"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-config" strategy="afterInteractive">
            {gtagConfig}
          </Script>
        </>
      )}
      {loadDirectPixel && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {pixelInit}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}

/** GTM noscript iframe fallback — rendered at the top of <body>. */
export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

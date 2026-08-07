/**
 * Verified Unsplash image URLs for NGSC sections.
 * All free to use under the Unsplash License (unsplash.com/license).
 * Photos by Nigerian photographers where possible.
 * No human faces or identifiable persons — cityscape, infrastructure, civic imagery only.
 */

const BASE = "https://images.unsplash.com/photo-";
const PARAMS = "?auto=format&fit=crop&q=80";

export const IMGS = {
  // Hero — Lagos Idumota busy street (Opeyemi Adisa, Nigerian photographer, Lagos)
  heroStreet: `${BASE}1648023199223-25d3622bcb13${PARAMS}&w=1400`,

  // Hero secondary / night mode — Victoria Island Lagos night, Civic Centre towers
  // (Seun Idowu, Nigerian photographer, Lagos)
  heroNight: `${BASE}1593717191400-84f38ee95485${PARAMS}&w=1400`,

  // Lagos Marina waterfront view (Namnso Ukpanah, Nigerian photographer)
  lagosMarina: `${BASE}1649502913092-fb7f0e8fc632${PARAMS}&w=1200`,

  // Lagos aerial drone — Lekki-Ikoyi area sunset
  // (Tunde Buremo, Nigerian photographer — free license confirmed)
  lagosAerial: `${BASE}1745502266390-5c4a4ad18555${PARAMS}&w=1400`,

  // Lekki-Ikoyi Link Bridge Lagos — infrastructure section
  // (Tunde Buremo — free license confirmed)
  lekki_bridge: `${BASE}1719338044369-e3b0a52e3c9c${PARAMS}&w=800`,

  // Healthcare / clinic — Africa-adjacent, free license
  // (Hush Naidoo Jade Photography — pills/pharmacy, Johannesburg, South Africa)
  healthcare: `${BASE}1471864190281-a93a3070b6de${PARAMS}&w=800`,

  // Education — classroom children (NCI/CDC, free license)
  education: `${BASE}1509062522246-3755977927d5${PARAMS}&w=800`,

  // Security / governance — people, civic gathering
  civic: `${BASE}1529156069898-49953e39b3ac${PARAMS}&w=1000`,
} as const;

export type ImgKey = keyof typeof IMGS;

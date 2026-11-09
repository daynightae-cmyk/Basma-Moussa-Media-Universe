const B = "https://base44.app/api/apps/6af0f8282dfd5d494b9bccc6/files/mp/public/6af0f8282dfd5d494b9bccc6";

/**
 * Approved brand + editorial imagery recovered from the archive.
 * Every entry carries its provenance so the UI can label illustrative art honestly.
 */
export const ASSETS = {
  logo: `${B}/2766240fc_basma-logo-master.png`,
  icon: `${B}/561d12f1b_basma-icon-circle.png`,
  homeHero: `${B}/ebc9ae347_01-home-hero.webp`,
  portrait: `${B}/bd11b9907_02-about-portrait.webp`,
  mediaUniverse: `${B}/4dbb73f07_03-media-universe.webp`,
  studio: `${B}/2fdaaab5b_04-interview-studio.webp`,
  legalLens: `${B}/66eea2c30_06-legal-lens.webp`,
  cityVoices: `${B}/813dc338c_07-city-voices.webp`,
  frequency: `${B}/68dbb2dc4_08-voice-identity.webp`,
  contact: `${B}/0f4fc16e2_10-contact-collaboration.webp`,
  archive: `${B}/6169bb0b8_11-documentary-archive.webp`,
  portraitAlt: `${B}/64544bc96_about-editorial-alt.webp`,
  legalDialogue: `${B}/b6931c1c9_legal-dialogue-concept.webp`,
  legalPortrait: `${B}/a4930b83b_legal-professional-portrait.webp`,
  legalResearch: `${B}/c9195d174_legal-research-detail.webp`,
};

export const ASSET_NOTES = {
  ar: {
    illustrative: "صورة توضيحية للهوية البصرية — ليست توثيقًا لحدث حقيقي.",
    concept: "منصة مفاهيم — ليست قناة بث ولا مجموعة إعلامية مسجّلة.",
  },
  en: {
    illustrative: "Illustrative brand imagery — not documentation of a real event.",
    concept: "A concept platform — not a broadcaster or a registered media group.",
  },
};
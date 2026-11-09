export const CITY_OPTIONS = [
  { id: "sharjah", label: { ar: "الشارقة", en: "Sharjah" } },
  { id: "dubai", label: { ar: "دبي", en: "Dubai" } },
  { id: "abu_dhabi", label: { ar: "أبوظبي", en: "Abu Dhabi" } },
  { id: "ajman", label: { ar: "عجمان", en: "Ajman" } },
  { id: "uaq", label: { ar: "أم القيوين", en: "Umm Al Quwain" } },
  { id: "rak", label: { ar: "رأس الخيمة", en: "Ras Al Khaimah" } },
  { id: "fujairah", label: { ar: "الفجيرة", en: "Fujairah" } },
  { id: "outside_uae", label: { ar: "خارج الإمارات", en: "Outside the UAE" } },
];

export const MEDIA_TYPE_OPTIONS = [
  { id: "video", label: { ar: "فيديو", en: "Video" } },
  { id: "audio", label: { ar: "تسجيل صوتي", en: "Audio" } },
  { id: "photos", label: { ar: "صور", en: "Photographs" } },
  { id: "text", label: { ar: "نص فقط", en: "Written story" } },
];

export const STATUS_LABELS = {
  pending: { ar: "قيد المراجعة", en: "In review" },
  approved: { ar: "مُعتمدة", en: "Approved" },
  declined: { ar: "معتذرة", en: "Declined" },
};

const find = (list, id) => list.find((item) => item.id === id);

export const cityLabel = (id) => find(CITY_OPTIONS, id)?.label ?? { ar: "غير محدد", en: "Not specified" };
export const mediaTypeLabel = (id) => find(MEDIA_TYPE_OPTIONS, id)?.label ?? { ar: "غير محدد", en: "Not specified" };
import { createFileRoute } from "@tanstack/react-router";
import { StoryAtelier } from "@/components/atelier/story-atelier";
import { useI18n } from "@/lib/experience/i18n";
import { getDictionary } from "@/lib/production/dictionary";

export const Route = createFileRoute("/_site/atelier")({
  component: AtelierPage,
  head: () => ({ meta: [{ title: "Story Atelier | Basma Moussa Media Universe" }] }),
});

function AtelierPage() {
  const { lang } = useI18n();
  return (
    <div className="min-h-screen bg-ink-900">
      <StoryAtelier dict={getDictionary(lang)} locale={lang} />
      <p className="mx-auto max-w-[1300px] px-5 pb-12 text-sm text-ivory/65">
        {lang === "ar" ? "الصور والمشاهد هنا تصورية فقط. تُحفظ مسوداتك على جهازك، ولا تنشر تلقائيًا." : "Scenes are concepts. Drafts are saved on this device and are never published automatically."}
      </p>
    </div>
  );
}

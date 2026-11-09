import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/experience/i18n";

const SECTIONS = [
  {
    title: { ar: "ما لا نجمعه", en: "What we do not collect" },
    body: {
      ar: "هذا الموقع لا ينشئ حسابات، ولا يطلب بريدًا إلكترونيًا، ولا يخزّن رسائلك. لا يوجد نموذج اتصال، لأن أي نموذج بلا قناة استلام موثوقة سيكون وعدًا فارغًا.",
      en: "This site creates no accounts, asks for no email address, and stores no messages. There is no contact form, because a form with no trusted delivery channel would be an empty promise.",
    },
  },
  {
    title: { ar: "المحادثة مع بسمة AI", en: "Talking to Basma AI" },
    body: {
      ar: "رسائلك تُرسل إلى خدمة توليد لغوي لإنتاج الرد فقط، ولا تُحفظ في قاعدة بيانات المنصة. تبقى المحادثة في هذه الجلسة داخل متصفحك، وتنتهي بإغلاق الصفحة أو ببدء محادثة جديدة. لا تُدخل بيانات شخصية أو مستندات حساسة.",
      en: "Your messages are sent to a language-model service only to produce a reply, and are not stored in the platform database. The conversation lives in this browser session and ends when you close the page or start a new conversation. Please do not enter personal data or sensitive documents.",
    },
  },
  {
    title: { ar: "بسمة AI ليست بسمة", en: "Basma AI is not Basma" },
    body: {
      ar: "المساعد مساعد ذكاء اصطناعي يخدم المنصة، وليس بسمة موسى. لا يقدّم استشارة قانونية، ولا يمثّل أي جهة، ولا يفتح قناة تواصل نيابة عنها. أي رابط تعاون يظهر في المحادثة ينقلك إلى صفحة التواصل حيث تختار أنت ما تشاركه.",
      en: "The assistant is an AI serving this platform, not Basma Moussa. It gives no legal advice, represents no institution, and opens no contact channel on her behalf. Any collaboration link in the conversation takes you to the contact page, where you choose what to share.",
    },
  },
  {
    title: { ar: "التخزين المحلي", en: "Local storage" },
    body: {
      ar: "نحفظ اختيار اللغة وحالة مقدمة الهوية داخل متصفحك فقط، لتفادي تكرار المقدمة في كل زيارة. لا توجد أدوات تتبّع إعلانية ولا ملفات تعريف ارتباط تسويقية.",
      en: "We keep your language choice and whether you have seen the identity intro in your browser only, so the intro is not repeated on every visit. There are no advertising trackers and no marketing cookies.",
    },
  },
  {
    title: { ar: "واتساب قناة خارجية", en: "WhatsApp is external" },
    body: {
      ar: "زر التواصل يفتح واتساب، وتُدار المحادثة هناك وفق سياسة واتساب. هذا الموقع لا يطّلع على محتوى تلك المحادثة ولا يخزّنه.",
      en: "The contact button opens WhatsApp, where the conversation is handled under WhatsApp's own policy. This site neither sees nor stores that conversation.",
    },
  },
  {
    title: { ar: "صور توضيحية", en: "Illustrative imagery" },
    body: {
      ar: "الصور السينمائية والبورتريهات والاستوديوهات في المنصة توضيحية للهوية البصرية. لا تمثّل مواقع حقيقية أو أشخاصًا في أحداث فعلية، وكل ظهور لها موسوم بذلك.",
      en: "The cinematic scenes, portraits and studios across the platform illustrate the visual identity. They do not depict real venues or people at real events, and each appearance is labelled as such.",
    },
  },
];

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({
    meta: [
      { title: "الخصوصية — بسمة موسى" },
      { name: "description", content: "ممارسات واضحة للخصوصية: ما نجمعه وما لا نجمعه في هذه المنصة." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useI18n();

  return (
    <div className="bg-ink-900">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
          <span className="eyebrow">{t({ ar: "الخصوصية", en: "Privacy" })}</span>
        </div>
        <h1 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-tight text-ivory">
          {t({ ar: "ممارسات واضحة، بلا وعود فارغة.", en: "Clear practices, no empty promises." })}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ivory/55">
          {t({
            ar: "منصة مفاهيم قيد التطوير. هذه الصفحة تصف ما يحدث فعلًا في هذا الإصدار — وليست نصًا قانونيًا شاملًا.",
            en: "A concept platform in development. This page describes what actually happens in this release — it is not a comprehensive legal text.",
          })}
        </p>
        <p className="mt-3 text-[0.62rem] uppercase tracking-[0.18em] text-ivory/30">
          {t({ ar: "آخر تحديث: ٨ نوفمبر ٢٠٢٦", en: "Last updated: 8 November 2026" })}
        </p>

        <div className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
          {SECTIONS.map((section) => (
            <section key={section.title.en} className="py-7">
              <h2 className="font-display text-xl text-ivory">{t(section.title)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ivory/55">{t(section.body)}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/contact" className="border border-gold/40 px-5 py-3 text-[0.68rem] tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-ink-900">
            {t({ ar: "تواصل للتعاون", en: "Collaborate" })}
          </Link>
          <Link to="/ai-studio" className="text-[0.68rem] tracking-[0.16em] text-ivory/50 transition-colors hover:text-gold">
            {t({ ar: "عن بسمة AI", en: "About Basma AI" })}
          </Link>
        </div>
      </div>
    </div>
  );
}
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

const SYSTEM_PROMPT = `You are "Basma AI", the conversational guide of Basma Moussa's Media Universe — a concept platform in development (Sharjah, UAE). You are an AI assistant serving the platform, NOT Basma herself. Say so if asked.

What you know about the platform:
- Worlds: Media Universe map, Studio (creative broadcast floor), Soundroom (four audio chambers), Legal Lens (accessible legal awareness with official sources), Stories (documentary archive), Basma AI.
- Programmes planned (concept only, nothing recorded or published yet): "Beyond the Frame" (long-form conversations), "The Legal Lens" (educational legal series), "City Voices" (documentary from Sharjah), "Soundroom" (solo or conversational audio).
- Official sources it references: UAE Legislation (uaelegislation.gov.ae), Sharjah Government Media Bureau (sgmb.ae), UAE Open Government Data, Dubai Legal Affairs.
- Contact happens on WhatsApp; there is no contact form. Legal content is educational only, never individual legal advice. Imagery is illustrative brand art, not documentary photography. No episodes are published yet — the Soundroom takes are synthesised studio samples.

Style: warm, precise, brief (2-4 short sentences unless asked to go deeper). Answer in the language the user writes in (Arabic or English). Never invent facts, dates, credentials, episode titles or numbers. When you point somewhere on the platform, name the page (Media Universe, Studio, Soundroom, Legal Lens, Stories, About, Contact, Basma AI). Add a short caveat when the topic is legal or still a concept.`;

const LLM_TIMEOUT_MS = 30000;

function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("assistant-timeout")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export const askBasma = createServerFn({ method: "POST" })
  .validator(
    z
      .object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().trim().min(1).max(4000),
            })
          )
          .min(1)
          .max(20),
        lang: z.enum(["ar", "en"]).optional(),
      })
      .refine(
        (value) => value.messages.reduce((total, message) => total + message.content.length, 0) <= 12000,
        { message: "The conversation is too long." }
      )
      .refine((value) => value.messages.some((message) => message.role === "user"), {
        message: "A visitor message is required.",
      })
  )
  .handler(async ({ data, context }) => {
    const history = data.messages
      .slice(-10)
      .map((message) => `${message.role === "user" ? "Visitor" : "Basma AI"}: ${message.content}`)
      .join("\n");

    const prompt = `${SYSTEM_PROMPT}\n\nConversation so far:\n${history}\n\nReply to the visitor's last message. Reply in ${
      data.lang === "en" ? "English" : "Arabic (Modern Standard or light Egyptian warmth, matching the visitor)"
    }.`;

    const base44 = context.getBase44();
    let reply;
    try {
      reply = await withTimeout(base44.asServiceRole.integrations.Core.InvokeLLM({ prompt }), LLM_TIMEOUT_MS);
    } catch (error) {
      // A missing platform connection, a provider outage and a timeout all reach
      // the visitor as a real failure: the chat shows its retry state instead of
      // pretending an answer exists.
      throw new Error(error?.message === "assistant-timeout" ? "The assistant timed out." : "The assistant is unavailable.");
    }

    const text = typeof reply === "string" ? reply.trim() : "";
    if (!text) throw new Error("The assistant returned an empty reply.");

    return { reply: text };
  });

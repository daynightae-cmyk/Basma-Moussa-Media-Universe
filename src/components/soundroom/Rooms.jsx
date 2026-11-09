import { useState } from "react";
import { Image } from "@/components/ui/image";
import { Mic, Scissors, Volume2, Lock, Waves, Headphones } from "lucide-react";
import GoldWave from "@/components/cinematic/GoldWave";
import AudioPlayer from "@/components/soundroom/AudioPlayer";
import { LocalRecorder } from "@/components/soundroom/local-recorder";
import { FREQUENCY_MODES } from "@/lib/experience/worldsContent";
import { AUDIO_DISCLOSURE, tracksFor } from "@/lib/experience/audio";
import { useI18n } from "@/lib/experience/i18n";

function RoomFrame({ room, icon: Icon, children }) {
  const { t } = useI18n();
  return (
    <div className="border border-gold/15 bg-ink-800/40">
      <div className="relative h-40 overflow-hidden sm:h-48">
        <Image src={room.image} alt="" fittingType="fill" className="h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <p className="eyebrow text-gold/80">{t(room.number)}</p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{t(room.title)}</h2>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ivory/55">{t(room.lead)}</p>
          </div>
          <Icon className="hidden h-8 w-8 shrink-0 text-gold/40 sm:block" aria-hidden="true" />
        </div>
      </div>
      <div className="space-y-5 p-5">{children}</div>
      <p className="border-t border-ivory/10 px-5 py-3 text-[0.62rem] leading-relaxed text-ivory/30">{t(room.honest)}</p>
    </div>
  );
}

function TrackPicker({ tracks, index, onSelect }) {
  const { t } = useI18n();
  return (
    <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
      {tracks.map((track, i) => (
        <li key={track.id}>
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === index ? "true" : undefined}
            className={`flex w-full items-center justify-between gap-3 px-1 py-3 text-start transition-colors ${
              i === index ? "text-gold" : "text-ivory/60 hover:text-ivory"
            }`}
          >
            <span className="text-[0.8rem]">{t(track.title)}</span>
            <span className="text-[0.55rem] tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

export function BoothRoom({ room }) {
  const { t } = useI18n();
  const tracks = tracksFor(room.id);
  const [index, setIndex] = useState(0);
  const track = tracks[index];

  return (
    <RoomFrame room={room} icon={Mic}>
      <LocalRecorder />
      <div className="pointer-events-none opacity-70">
        <GoldWave mode="pulse" className="h-24 w-full" bars={80} height={140} />
      </div>
      <p className="take-deck__micro text-[0.55rem] uppercase tracking-[0.2em] text-gold/70">
        {t({ ar: "نماذج استوديو — استمع قبل أن تسجّل", en: "Studio samples — listen before you record" })}
      </p>
      {track ? (
        <AudioPlayer src={track.src} title={track.title} note={track.note} disclosure={AUDIO_DISCLOSURE} />
      ) : null}
      <TrackPicker tracks={tracks} index={index} onSelect={setIndex} />
    </RoomFrame>
  );
}

export function EditingRoom({ room }) {
  const { t } = useI18n();
  const tracks = tracksFor(room.id);
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState([true, true, false, true, true, true]);
  const track = tracks[index];

  return (
    <RoomFrame room={room} icon={Scissors}>
      <div>
        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-gold/70">
          {t({ ar: "الخط الزمني — اضغط المقطع لإبقائه أو حذفه", en: "The timeline — tap a segment to keep or cut it" })}
        </p>
        <div className="mt-3 flex gap-1">
          {kept.map((on, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setKept((prev) => prev.map((value, j) => (j === i ? !value : value)))}
              aria-pressed={on}
              className={`h-14 flex-1 border transition-colors ${
                on ? "border-gold/40 bg-gold/15" : "border-ivory/10 bg-ink-900/60 opacity-40"
              }`}
              aria-label={t({ ar: `المقطع ${i + 1}`, en: `Segment ${i + 1}` })}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.6rem] text-ivory/35">
          {t({
            ar: `المقاطع المُبقاة: ${kept.filter(Boolean).length} من ${kept.length}`,
            en: `Segments kept: ${kept.filter(Boolean).length} of ${kept.length}`,
          })}
        </p>
      </div>
      {track ? <AudioPlayer src={track.src} title={track.title} note={track.note} disclosure={AUDIO_DISCLOSURE} /> : null}
      <TrackPicker tracks={tracks} index={index} onSelect={setIndex} />
    </RoomFrame>
  );
}

export function FrequencyRoom({ room }) {
  const { t } = useI18n();
  const [mode, setMode] = useState("pulse");
  const tracks = tracksFor(room.id);
  const [index, setIndex] = useState(0);
  const track = tracks[index];

  return (
    <RoomFrame room={room} icon={Waves}>
      <div className="relative overflow-hidden border border-gold/20 bg-[#05070F] py-6">
        <GoldWave mode={mode} className="h-32 w-full" bars={120} height={180} tone="champagne" />
      </div>
      <div className="flex flex-wrap gap-2">
        {FREQUENCY_MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            aria-pressed={mode === item.id}
            className={`border px-3 py-1.5 text-[0.62rem] tracking-[0.14em] transition-colors ${
              mode === item.id ? "border-gold bg-gold text-ink-900" : "border-ivory/15 text-ivory/60 hover:border-gold/50"
            }`}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
      {track ? <AudioPlayer src={track.src} title={track.title} note={track.note} disclosure={AUDIO_DISCLOSURE} /> : null}
      <TrackPicker tracks={tracks} index={index} onSelect={setIndex} />
    </RoomFrame>
  );
}

export function LoungeRoom({ room }) {
  const { t } = useI18n();
  const tracks = tracksFor(room.id);
  const [index, setIndex] = useState(0);
  const track = tracks[index];

  return (
    <RoomFrame room={room} icon={Headphones}>
      <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-ivory/35">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        {t({ ar: "المكتبة الصوتية — نماذج استوديو", en: "The audio library — studio samples" })}
      </div>
      {track ? <AudioPlayer src={track.src} title={track.title} note={track.note} disclosure={AUDIO_DISCLOSURE} /> : null}
      <TrackPicker tracks={tracks} index={index} onSelect={setIndex} />
      <div className="flex items-center gap-2 text-[0.6rem] text-ivory/30">
        <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
        {t({ ar: "أول حلقة منشورة ستُضاف هنا عند اكتمالها.", en: "The first published episode will appear here once it exists." })}
      </div>
    </RoomFrame>
  );
}

export const ROOM_COMPONENTS = {
  booth: BoothRoom,
  editing: EditingRoom,
  frequency: FrequencyRoom,
  lounge: LoungeRoom,
};
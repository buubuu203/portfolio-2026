import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { VideoPlayer } from "@/components/about/VideoPlayer";
import { prisma } from "@/lib/prisma";

type VideoData = {
  id: string;
  url: string;
  caption: string | null;
  aspectRatio: string | null;
  duration: number | null;
  category: string;
};

export async function Hobbies() {
  let videos: VideoData[] = [];
  try {
    videos = await prisma.hobbyVideo.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // Table may not exist yet in production
  }

  const pianoCards: VideoData[] = videos.filter((v) => v.category === "piano");
  const printCards: VideoData[] = videos.filter((v) => v.category === "3d-printing");

  return (
    <Section id="hobbies">
      <Reveal>
        <div className="flex items-center gap-2.5">
          <span className="squircle squircle-md">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="white" strokeWidth="2" />
              <path d="M12 8v4l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-[14px] font-semibold uppercase tracking-[.06em] text-[var(--text-secondary)]">Hobbies</span>
        </div>
        <h2
          className="mt-[14px] font-bold"
          style={{ fontSize: "clamp(32px, 8.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1.07 }}
        >
          Hobbies &amp; Interests.
        </h2>
      </Reveal>

      {pianoCards.length > 0 && (
        <HobbyCategory
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
              <path d="M9 18V6l11-2v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6.5" cy="18" r="2.5" stroke="white" strokeWidth="2" />
              <circle cx="17.5" cy="16" r="2.5" stroke="white" strokeWidth="2" />
            </svg>
          }
          title="Playing Piano"
          description="Music is how I recharge. I play piano — here are a few clips."
          videos={pianoCards}
          visualizer="piano"
        />
      )}

      {printCards.length > 0 && (
        <HobbyCategory
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]" aria-hidden>
              <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          title="3D Printing"
          description="From file to finished print — here are a few clips."
          videos={printCards}
          visualizer="layers"
        />
      )}
    </Section>
  );
}

function HobbyCategory({
  icon,
  title,
  description,
  videos,
  visualizer,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  videos: VideoData[];
  visualizer: "piano" | "layers";
}) {
  return (
    <Reveal delay={0.1}>
      <div className="mt-9 flex flex-col gap-9">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-[12px]"
              style={{ background: "linear-gradient(145deg,#7a7a82,#2c2c30)" }}
            >
              {icon}
            </div>
            <h3 style={{ margin: 0, fontSize: 32, lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.025em" }}>
              {title}
            </h3>
          </div>
          <p className="max-w-[680px] text-[19px] leading-[1.45] text-[var(--text-secondary)]">{description}</p>
        </div>

        <RevealGroup className="video-card-row">
          {videos.map((video) => {
            const isWide = video.aspectRatio !== "3:4";
            return (
              <RevealItem
                key={video.id}
                className={isWide ? "video-card-item-wide" : "video-card-item-portrait"}
              >
                {video.url ? (
                  <VideoPlayer
                    src={video.url}
                    poster={video.url.startsWith("/") ? video.url.replace(/\.mp4$/, "-poster.jpg") : ""}
                    aspectRatio={isWide ? "16/9" : "3/4"}
                    duration={video.duration ?? 30}
                    tag=""
                    caption={video.caption}
                  />
                ) : (
                  <VideoCard
                    url=""
                    caption={video.caption}
                    duration={video.duration ?? 30}
                    isWide={isWide}
                    visualizer={visualizer}
                  />
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Reveal>
  );
}

function VideoCard({
  url,
  caption,
  duration,
  isWide,
  visualizer,
}: {
  url: string;
  caption: string | null;
  duration: number;
  isWide: boolean;
  visualizer: "piano" | "layers";
}) {
  const posterBg = visualizer === "layers"
    ? "linear-gradient(145deg,#6a6a72,#232326)"
    : "linear-gradient(145deg,#4a4a50,#18181a)";

  const posterUrl = url ? url.replace(/\.mp4$/, "-poster.jpg") : "";
  const mins = Math.floor(duration / 60);
  const secs = duration % 60;
  const durationLabel = `${mins}:${String(secs).padStart(2, "0")}`;

  return (
    <label
      className="vcard glass spring-hover relative block cursor-pointer overflow-hidden"
      style={{
        borderRadius: "var(--radius-inner)",
        width: "100%",
      }}
    >
      <input type="checkbox" aria-label={`Play ${caption ?? "video"}`} />
      <div
        className="poster relative overflow-hidden"
        style={{
          aspectRatio: isWide ? "16/9" : "3/4",
          background: posterBg,
        }}
      >
        {url ? (
          <video
            src={url}
            poster={posterUrl}
            preload="metadata"
            playsInline
            muted
            loop
            className="vid absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          visualizer === "piano" ? <PianoVisualizer scale={isWide ? 1 : 0.72} /> : <LayerVisualizer />
        )}

        <span
          className="absolute left-[14px] top-[14px] rounded-full border border-white/50 px-3 py-[5px] text-[12px] font-semibold tracking-[.04em] text-white"
          style={{ background: "rgba(255,255,255,.22)" }}
        >
          {visualizer === "piano" ? "Piano" : "3D print"}
        </span>

        <div
          className="pbtn absolute left-1/2 top-[46%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60"
          style={{ background: "rgba(255,255,255,.28)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)" }}
        >
          <span className="ic-play">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 5l11 7-11 7z" />
            </svg>
          </span>
          <span className="ic-pause">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 5v14M16 5v14" />
            </svg>
          </span>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3 text-[13px] font-medium tabular-nums text-white"
          style={{ paddingTop: 30, background: "linear-gradient(transparent,rgba(0,0,0,.55))" }}
        >
          <span className="min-w-[34px]">0:00</span>
          <span className="vbar"><i style={{ "--dur": `${duration}s` } as React.CSSProperties} /></span>
          <span>{durationLabel}</span>
        </div>
      </div>

      {caption && (
        <div className="px-[18px] py-[14px]">
          <p className="text-[17px] font-semibold" style={{ margin: 0 }}>{caption}</p>
        </div>
      )}
    </label>
  );
}

function PianoVisualizer({ scale = 1 }: { scale?: number }) {
  const delays = [0, -0.25, -0.5, -0.75, -1.0, -1.25, -1.5, -0.4, -0.9];
  const blackKeyPositions = [23, 56, 122, 155, 188, 254];

  return (
    <div className="keys absolute inset-x-0 bottom-[44px] top-0 flex items-center justify-center">
      <div className="relative flex gap-[3px]" style={{ transform: `scale(${scale})` }}>
        {delays.map((d, i) => (
          <i key={i} className="wk" style={{ animationDelay: `${d}s` }} />
        ))}
        {blackKeyPositions.map((left) => (
          <b
            key={left}
            className="absolute top-0 h-[58px] w-5 rounded-b-[5px] bg-[#1d1d1f]"
            style={{ left }}
          />
        ))}
      </div>
    </div>
  );
}

function LayerVisualizer() {
  const widths = [200, 170, 140, 110, 80, 50];
  const delays = [0, -0.2, -0.4, -0.6, -0.8, -1.0];

  return (
    <div className="lay absolute inset-x-0 bottom-[44px] top-0 flex flex-col items-center justify-center gap-[5px]">
      {widths.map((w, i) => (
        <i key={i} style={{ "--w": `${w}px`, animationDelay: `${delays[i]}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}

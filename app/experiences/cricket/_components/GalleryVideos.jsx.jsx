"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Image as ImageIcon,
  Play,
  UploadCloud,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader2,
} from "lucide-react";

/* ============================================================================
   GALLERY — Stream Side Cricket
   ----------------------------------------------------------------------------
   Standalone, self-contained component. This is the old "Video Highlights"
   carousel from CommunityGallery, pulled out on its own and extended:

     - The slider now mixes photos and videos in one feed (`type: "image" |
       "video"` on each item), instead of videos only.
     - The section label changed from "Video Highlights" to "Gallery" to
       reflect that.
     - An "Upload" button opens a modal where people can add their own
       photos and videos (drag-and-drop or file picker). Uploads are
       client-side only — previews are generated with
       `URL.createObjectURL` and the new items are prepended to the local
       feed. Wire `onUpload`/a real submit handler up to your backend when
       one exists; the shape produced here (`id, type, image, duration,
       title, user`) is what that endpoint should accept.

   Drop <GalleryVideos /> in anywhere — it carries its own header, carousel,
   and modals, matching the existing dark-navy / lime-accent / glassmorphism
   Stream Side visual language.
   ============================================================================ */

const ACCENT = "#B7FF00";

// ---------------------------------------------------------------------------
// Dummy starting media — mixed photos + videos.
// ---------------------------------------------------------------------------

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1624526261967-ac4638f3e275?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1624526261967-ac4638f3e275?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
];

function img(i) {
  return IMAGE_POOL[i % IMAGE_POOL.length];
}

const INITIAL_GALLERY_MEDIA = [
  {
    id: "m1",
    type: "video",
    image: img(1),
    duration: "1:24",
    title: "Last Over Thriller",
    user: "Stream Side Team",
  },
  {
    id: "m2",
    type: "image",
    image: img(4),
    title: "Squad Photo",
    user: "Hill Strikers CC",
  },
  {
    id: "m3",
    type: "video",
    image: img(5),
    duration: "0:48",
    title: "Winning Six",
    user: "Ridge Riders",
  },
  {
    id: "m4",
    type: "image",
    image: img(2),
    title: "Drone View",
    user: "Stream Side Team",
  },
  {
    id: "m5",
    type: "video",
    image: img(6),
    duration: "2:10",
    title: "Tournament Final Recap",
    user: "Yelagiri Cup",
  },
  {
    id: "m6",
    type: "image",
    image: img(7),
    title: "Weekend Friendly",
    user: "Divya R.",
  },
  {
    id: "m7",
    type: "video",
    image: img(0),
    duration: "1:05",
    title: "Hat-trick Highlights",
    user: "Highland XI",
  },
  {
    id: "m8",
    type: "image",
    image: img(3),
    title: "Evening Practice",
    user: "Naveen S.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function formatDuration(totalSeconds) {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* -------------------------------------------------------------------------- */
/*  CarouselArrow + HorizontalSlider — same mechanics as the rest of the site */
/* -------------------------------------------------------------------------- */

function CarouselArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 backdrop-blur-sm transition-colors duration-200 hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      style={{ "--accent": ACCENT }}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function HorizontalSlider({ children, scrollAmount = 320 }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [update, children]);

  const scrollBy = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [scrollAmount],
  );

  return (
    <div className="flex items-center gap-3">
      <CarouselArrow
        direction="left"
        onClick={() => scrollBy("left")}
        disabled={!canLeft}
      />
      <div
        ref={trackRef}
        onScroll={update}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {children}
      </div>
      <CarouselArrow
        direction="right"
        onClick={() => scrollBy("right")}
        disabled={!canRight}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MediaCard — mixed photo / video card                                     */
/*  Sizing matches CricketPlayerStats' PlayerCard (85vw / 50% / 33.333%).     */
/* -------------------------------------------------------------------------- */

function MediaCard({ item, onOpen }) {
  const isVideo = item.type === "video";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      whileHover={{ y: -6 }}
      className="group relative h-56 w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 text-left sm:h-64 sm:w-[46%] lg:h-72 lg:w-[29%]"
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}55, 0 0 26px 0 ${ACCENT}28` }}
      />

      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
        {isVideo ? (
          <>
            <Video className="h-3 w-3" style={{ color: ACCENT }} />
            {item.duration}
          </>
        ) : (
          <>
            <ImageIcon className="h-3 w-3" style={{ color: ACCENT }} />
          </>
        )}
      </span>

      {isVideo && (
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
        </span>
      )}

      <div className="absolute inset-x-3 bottom-3">
        <p className="truncate text-sm font-bold text-white">{item.title}</p>
        <p className="truncate text-xs text-slate-300">{item.user}</p>
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  MediaViewerModal — fullscreen preview for a clicked photo or video        */
/* -------------------------------------------------------------------------- */

function MediaViewerModal({ item, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (item) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [item, onClose]);

  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex aspect-video w-full items-center justify-center bg-black">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover opacity-90"
              />
              {item.type === "video" && (
                <span className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                  <Play className="ml-1 h-6 w-6 fill-white text-white" />
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400">
                {item.type === "video" ? "Uploaded" : "Shared"} by {item.user}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  UploadModal — client-side photo/video upload with drag-and-drop           */
/* -------------------------------------------------------------------------- */

function UploadModal({ open, onClose, onUpload }) {
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Reset (and release object URLs) whenever the modal closes.
  useEffect(() => {
    if (!open) {
      setPendingFiles((prev) => {
        prev.forEach((p) => URL.revokeObjectURL(p.previewUrl));
        return [];
      });
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleFilesSelected(fileList) {
    const newEntries = Array.from(fileList)
      .filter(
        (file) =>
          file.type.startsWith("image/") || file.type.startsWith("video/"),
      )
      .map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" : "image",
        duration: null,
      }));

    if (newEntries.length === 0) return;

    setPendingFiles((prev) => [...prev, ...newEntries]);

    // Read actual duration off each video file once its metadata loads.
    newEntries
      .filter((entry) => entry.type === "video")
      .forEach((entry) => {
        const videoEl = document.createElement("video");
        videoEl.preload = "metadata";
        videoEl.src = entry.previewUrl;
        videoEl.onloadedmetadata = () => {
          setPendingFiles((prev) =>
            prev.map((p) =>
              p.id === entry.id
                ? { ...p, duration: formatDuration(videoEl.duration) }
                : p,
            ),
          );
        };
      });
  }

  function removePendingFile(id) {
    setPendingFiles((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  function handleConfirm() {
    if (pendingFiles.length === 0) return;

    const newItems = pendingFiles.map((p) => ({
      id: p.id,
      type: p.type,
      image: p.previewUrl,
      duration: p.duration ?? "0:00",
      title: p.file.name.replace(/\.[^/.]+$/, ""),
      user: "You",
    }));

    onUpload(newItems);
    setPendingFiles([]);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-upload-title"
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
              <div>
                <h3
                  id="gallery-upload-title"
                  className="text-lg font-bold text-white"
                >
                  Upload to Gallery
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Share your photos and videos with the community.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close upload"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              <div
                role="button"
                tabIndex={0}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleFilesSelected(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className="flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-200"
                style={{
                  borderColor: isDragging ? ACCENT : "rgba(255,255,255,0.15)",
                  backgroundColor: isDragging
                    ? `${ACCENT}0d`
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <UploadCloud className="h-7 w-7" style={{ color: ACCENT }} />
                <p className="text-sm font-semibold text-white">
                  Click or drag files here to upload
                </p>
                <p className="text-xs text-slate-500">
                  Photos and videos, any number at once
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    handleFilesSelected(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {pendingFiles.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {pendingFiles.map((p) => (
                    <div
                      key={p.id}
                      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
                    >
                      {p.type === "video" ? (
                        // eslint-disable-next-line jsx-a11y/media-has-caption
                        <video
                          src={p.previewUrl}
                          className="h-full w-full object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={p.previewUrl}
                          alt={p.file.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-black/65 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                        {p.type === "video" ? (
                          <>
                            <Video
                              className="h-2.5 w-2.5"
                              style={{ color: ACCENT }}
                            />
                            {p.duration ?? (
                              <Loader2 className="h-2.5 w-2.5 animate-spin" />
                            )}
                          </>
                        ) : (
                          <>
                            <ImageIcon
                              className="h-2.5 w-2.5"
                              style={{ color: ACCENT }}
                            />
                            Photo
                          </>
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={() => removePendingFile(p.id)}
                        aria-label={`Remove ${p.file.name}`}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-sm transition-colors hover:bg-red-500/80"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>

                      <p className="absolute inset-x-1.5 bottom-1.5 truncate text-[10px] font-medium text-white">
                        {p.file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-5 sm:p-6">
              <span className="text-xs text-slate-500">
                {pendingFiles.length > 0
                  ? `${pendingFiles.length} file${
                      pendingFiles.length === 1 ? "" : "s"
                    } ready`
                  : "No files selected yet"}
              </span>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={pendingFiles.length === 0}
                className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-slate-950 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: ACCENT }}
              >
                <UploadCloud className="h-4 w-4" />
                Add to Gallery
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  GalleryVideos — main component                                           */
/* -------------------------------------------------------------------------- */

export default function GalleryVideos() {
  const [mediaItems, setMediaItems] = useState(INITIAL_GALLERY_MEDIA);
  const [activeItem, setActiveItem] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  function handleUpload(newItems) {
    setMediaItems((prev) => [...newItems, ...prev]);
  }

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 pt-2 pb-10 text-white sm:px-8 lg:px-6">
      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3 pl-0 md:pl-12">
              <span className="h-px w-10" style={{ backgroundColor: ACCENT }} />

              <span
                className="text-[12px] md:text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Shared By Our Guests
              </span>
            </div>

            <h3 className="text-3xl pl-0 md:pl-12 mb-3 font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Gallery
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 rounded-full  border px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              borderColor: `${ACCENT}50`,
              backgroundColor: `${ACCENT}14`,
              color: ACCENT,
            }}
          >
            <UploadCloud className="h-4 w-4" />
            Upload
          </button>
        </div>

        <HorizontalSlider scrollAmount={300}>
          {mediaItems.map((item) => (
            <MediaCard key={item.id} item={item} onOpen={setActiveItem} />
          ))}
        </HorizontalSlider>
      </div>

      <MediaViewerModal item={activeItem} onClose={() => setActiveItem(null)} />
      <UploadModal
        open={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </section>
  );
}

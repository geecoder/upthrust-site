// Renders a YouTube video inline via the privacy-enhanced (youtube-nocookie)
// embed domain, so it plays cleanly on-page without ever redirecting the
// visitor to youtube.com.
export function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '16/9', border: '1px solid rgba(244,239,230,.2)', overflow: 'hidden' }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

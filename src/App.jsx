import { useRef, useState, useEffect } from "react";

export default function App() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;

    // Mobile iOS cần request gesture user mới được play
    try {
      video.muted = false;
      video.volume = 1.0;
      video.loop = true;
      await video.play();
    } catch (err) {
      console.warn("Video play blocked:", err);
    }

    // Fullscreen — có khác nhau giữa trình duyệt
    const el = video;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen(); // iOS Safari
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch (err) {
      console.warn("Fullscreen failed:", err);
    }
  };

  useEffect(() => {
    if (!started) return;
    // Ẩn chuột trên desktop, không cần trên mobile
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
      document.body.style.cursor = "none";
    }
    return () => {
      document.body.style.cursor = "default";
    };
  }, [started]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "black",
        overflow: "hidden",
        touchAction: "none", // tránh gesture zoom/pan trên mobile
      }}
    >
      {/* Logo khởi động */}
      {!started && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0.7), rgba(0,0,0,1))",
            zIndex: 10,
            padding: "20px",
          }}
        >
          <button
            onClick={handleStart}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              animation: "shake 1.2s infinite",
            }}
          >
            <img
              src="/logo.png"
              alt="Start Logo"
              style={{
                width: "25vw", // responsive theo chiều ngang
                maxWidth: "140px",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))",
              }}
            />
          </button>

          <style>{`
            @keyframes shake {
              0%, 100% { transform: translate(0, 0) rotate(0); }
              20% { transform: translate(-3px, 0) rotate(-2deg); }
              40% { transform: translate(3px, 0) rotate(2deg); }
              60% { transform: translate(-2px, 0) rotate(-1deg); }
              80% { transform: translate(2px, 0) rotate(1deg); }
            }
          `}</style>
        </div>
      )}

      {/* Video toàn màn hình */}
      {started && (
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover", // 👈 fill toàn màn hình, không viền
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

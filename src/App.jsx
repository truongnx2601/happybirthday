import { useRef, useState, useEffect } from "react";

export default function App() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  // Khi người dùng bấm nút
  const handleStart = async () => {
    setStarted(true);
    const video = videoRef.current;
    if (!video) return;

    // Fullscreen nếu có thể
    const el = document.documentElement;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } catch {}

    // Bật âm thanh và phát
    video.muted = false;
    video.volume = 1.0;
    video.loop = true;
    await video.play().catch(() => {});
  };

  // Chặn thao tác sau khi phát
  useEffect(() => {
    if (!started) return;
    const block = (e) => e.preventDefault();
    ["contextmenu", "keydown", "click", "dblclick"].forEach((evt) =>
      document.addEventListener(evt, block)
    );
    document.body.style.cursor = "none";

    return () => {
      ["contextmenu", "keydown", "click", "dblclick"].forEach((evt) =>
        document.removeEventListener(evt, block)
      );
      document.body.style.cursor = "default";
    };
  }, [started]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        overflow: "hidden",
      }}
    >
      {/* Nút logo khởi động */}
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
            {/* 🧩 Thay logo/icon của bạn ở đây */}
            <img
              src="/logo.png" // đặt logo của bạn ở public/logo.png
              alt="Start Logo"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.6))",
              }}
            />
          </button>

          {/* Hiệu ứng rung lắc nhẹ */}
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

      {/* Video full màn hình */}
      {started && (
        <video
          ref={videoRef}
          src="/intro.mp4" // video của bạn đặt ở public/intro.mp4
          autoPlay
          playsInline
          preload="auto"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            // objectFit: "contain", // 👈 giữ tỉ lệ, vừa khung
            // backgroundColor: "black", // 👈 tránh viền trắng nếu tỉ lệ lệch
            pointerEvents: "none", // ngăn thao tác
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

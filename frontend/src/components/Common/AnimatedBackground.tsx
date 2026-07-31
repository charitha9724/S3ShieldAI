export default function AnimatedBackground() {
  return (
    <>
      {/* Animated GIF */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/cyber-bg.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          filter: "brightness(0.42) contrast(1.15) saturate(1.35) blur(0.8px)"
        }}
      />

      {/* Glass overlay */}
      <div
        className="fixed inset-0 z-[1] backdrop-blur-[2px]"
        style={{
          background: "rgba(10, 14, 26, 0.30)",
        }}
      />
    </>
  );
}
export default function Footer() {
  return (
    <footer style={{ width: "100%", position: "relative", zIndex: 10 }}>
      <div
        className="content-container"
        style={{
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
          borderTop: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--ghost)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          built by{" "}
          <span style={{ color: "var(--bright)" }}>Ben Schippers</span> ·{" "}
          {new Date().getFullYear()}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--ghost)",
          }}
        >
          NYC · product · code · miles
        </p>
      </div>
    </footer>
  );
}

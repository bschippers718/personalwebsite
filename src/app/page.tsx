import ThoughtCard from "@/components/ThoughtCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let thoughts: any[] = [];
  try {
    const { getThoughts } = await import("@/lib/thoughts");
    thoughts = await getThoughts();
  } catch {
    thoughts = [];
  }

  return (
    <div>
      {/* HERO */}
      <section className="hero-section">
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute", borderRadius: "50%",
                border: `1px solid rgba(255,181,71,${0.04 - (i - 1) * 0.01})`,
                width: `${200 + i * 200}px`, height: `${200 + i * 200}px`,
                animation: `pulse-ring ${6 + (i - 1) * 1.5}s ease-in-out infinite`,
              }}
            />
          ))}
          <style>{`
            @keyframes pulse-ring {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.65; transform: scale(1.015); }
            }
          `}</style>
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: "1.25rem", fontWeight: 300 }}>
            builder · athlete · investor
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 8rem)", fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.02em", marginBottom: "1.5rem", wordBreak: "break-word", overflowWrap: "break-word" }}>
            BEN<br /><span style={{ color: "var(--ember)" }}>SCHIPPERS.</span>
          </h1>
          <p style={{ color: "var(--dim)", fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)", maxWidth: "32rem", margin: "0 auto 2.5rem", lineHeight: 1.7, padding: "0 0.5rem" }}>
            Entrepreneur and product architect building at the intersection of technology and energy. I make software, run long distances, and think about how tech reshapes markets.
          </p>
          <div className="hero-buttons">
            <a href="#career" style={{ padding: "0.75rem 2rem", background: "var(--ember)", color: "var(--void)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>
              VIEW CAREER
            </a>
            <a href="#athletics" style={{ padding: "0.75rem 2rem", background: "transparent", border: "1px solid var(--edge)", color: "var(--dim)", fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>
              ATHLETICS
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "8rem", background: "linear-gradient(transparent, var(--void))", pointerEvents: "none", zIndex: 10 }} />
      </section>

      {/* STATS BAR */}
      <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", position: "relative", zIndex: 10 }}>
        <div className="stats-bar-grid">
          {[
            { label: "Mile PR", value: "4:19" },
            { label: "HappyFunCorp", value: "Inc 5000" },
            { label: "TechCrunch", value: "6 Articles" },
            { label: "Education", value: "Bates '04" },
            { label: "Recognition", value: "Edison Nominee", isNeon: true },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "1.25rem 1.5rem", borderRight: "1px solid var(--line)" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ghost)", marginBottom: "0.5rem" }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 700, color: stat.isNeon ? "var(--neon)" : "var(--ember)" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER */}
      <section id="career" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            CAREER
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Building and selling technology companies. <span style={{ color: "var(--ghost)" }}>Product-obsessed since day one.</span>
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--line)", background: "var(--line)" }}>
          {[
            { period: "2018 → Present", title: "CEO & Co-Founder", company: "TezLab — EV companion platform · National Grid energy partnership", tag: "ACTIVE", tagClass: "tag-current", isCurrent: true },
            { period: "2012 → 2018", title: "CEO & Founder", company: "HappyFunCorp — Product engineering studio · Inc 5000 · Edison Nominee", tag: "ACQUIRED 2×", tagClass: "tag-acquired" },
            { period: "2015", title: "Keynote Speaker & Alumni Inductee", company: "Bates College — Scholar-Athlete Society", tag: "HONORED", tagClass: "tag-award" },
            { period: "2000 → 2004", title: "B.A. American Cultural Studies", company: "Bates College — #1 Squash · Team Captain · Top 32 Nationally", tag: "SCHOLAR-ATHLETE", tagClass: "tag-education" },
          ].map((row, i) => (
            <div key={i} className="career-row-grid" style={{ background: row.isCurrent ? "rgba(22,22,31,0.6)" : "var(--base)", boxShadow: row.isCurrent ? "0 0 15px rgba(255,181,71,0.08), inset 0 1px 0 rgba(255,181,71,0.06)" : "none" }}>
              <span style={{ fontSize: "12px", color: "var(--ghost)" }}>{row.period}</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>{row.title}</div>
                <div style={{ color: "var(--dim)", fontSize: "0.85rem", marginTop: "0.15rem" }}>{row.company}</div>
              </div>
              <span className={row.tagClass} style={{ fontSize: "10px", letterSpacing: "0.06em", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "4px", border: "1px solid", whiteSpace: "nowrap", alignSelf: "start" }}>
                {row.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            WRITING
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>Published in TechCrunch, FastCompany, Forbes, and Inc.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", border: "1px solid var(--line)", background: "var(--line)" }}>
          {[
            { num: "01", title: "Technology Primed for Upswing", pub: "TechCrunch · Aug 2016", url: "https://techcrunch.com/2016/08/23/tech-is-primed-for-an-upswing/" },
            { num: "02", title: "Big Data and Its Developer Fallout", pub: "TechCrunch · Jun 2016", url: "https://techcrunch.com/2016/07/16/big-data-and-its-developer-fallout/" },
            { num: "03", title: "The Hungry Consumer and the Software Pivot", pub: "TechCrunch · Jun 2016", url: "https://techcrunch.com/2016/06/25/the-hungry-consumer-and-the-software-pivot/" },
            { num: "04", title: "The Downside of an Over-Capitalized Market", pub: "TechCrunch · Mar 2016", url: "https://techcrunch.com/2016/03/16/state-of-affairs/" },
            { num: "05", title: "App Fatigue", pub: "TechCrunch · Feb 2016", url: "https://techcrunch.com/2016/02/03/app-fatigue/" },
            { num: "06", title: "New-Age Bootstrapping Is Not a Money Problem", pub: "TechCrunch · Mar 2015", url: "https://techcrunch.com/2015/03/12/new-age-bootstrapping-is-not-a-money-problem-its-a-product-opportunity/" },
          ].map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="writing-row-grid" style={{ background: "var(--base)", cursor: "pointer" }}>
              <span style={{ fontSize: "11px", color: "var(--ghost)", textAlign: "right" }}>{item.num}</span>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", display: "block" }}>{item.title}</span>
                <span className="writing-pub-mobile" style={{ fontSize: "11px", color: "var(--ghost)" }}>{item.pub}</span>
              </div>
              <span className="writing-pub-desktop" style={{ fontSize: "11px", color: "var(--ghost)", whiteSpace: "nowrap" }}>{item.pub}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ATHLETICS */}
      <section id="athletics" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            ATHLETICS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Running, squash, and pushing limits. <span style={{ color: "var(--ghost)" }}>Personal records &amp; highlights.</span>
          </p>
        </div>
        <div className="pr-grid-responsive">
          {[
            { value: "4:19", event: "Mile", featured: true },
            { value: "32:44", event: "10K" },
            { value: "1:19:41", event: "Half Marathon", detail: "6:05/mi pace" },
          ].map((pr, i) => (
            <div key={i} style={{ background: "var(--base)", padding: "2.5rem 1.5rem", textAlign: "center", position: "relative", borderTop: pr.featured ? "2px solid var(--ember)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 8vw, 3rem)", fontWeight: 800, color: "var(--ember)", letterSpacing: "-0.03em" }}>
                {pr.value}
              </div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ghost)", marginTop: "0.5rem" }}>
                {pr.event}
              </div>
              {pr.detail && <div style={{ color: "var(--dim)", fontSize: "0.8rem", marginTop: "0.35rem" }}>{pr.detail}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1px" }}>
          {[
            { name: "Grand Canyon Rim to Rim to Rim", detail: "~42 miles through the Grand Canyon · Under 10 hours", badge: "COMPLETED", badgeClass: "badge-neon" },
            { name: "NYCRUNS Father's Day Half Marathon", detail: "Brooklyn, NY · June 2014 · 1:19:41", badge: "2ND OVERALL", badgeClass: "badge-gold" },
            { name: "Bates College Squash", detail: "#1 on ladder all 4 years · Team Captain · Top 32 nationally", badge: "SCHOLAR-ATHLETE", badgeClass: "badge-gold" },
          ].map((race, i) => (
            <div key={i} className="race-card-flex" style={{ marginTop: i > 0 ? "1px" : 0 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem" }}>{race.name}</div>
                <div style={{ color: "var(--dim)", fontSize: "0.8rem", marginTop: "0.15rem" }}>{race.detail}</div>
              </div>
              <span className={race.badgeClass} style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", padding: "0.25rem 0.75rem", borderRadius: "4px", border: "1px solid", whiteSpace: "nowrap" }}>
                {race.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            PROJECTS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>What I&apos;m building now.</p>
        </div>
        <div className="projects-grid">
          {[
            { name: "TezLab", desc: "EV companion platform with energy insights, battery health tracking, and utility partnerships.", tags: ["React Native", "EV", "Energy"], color: "#00ffb2" },
            { name: "THE HIVE", desc: "ML talent intelligence leaderboard tracking the most valuable minds in AI.", tags: ["Next.js", "ML Research", "Data"], color: "#ffb547" },
            { name: "Squash Analytics", desc: "YOLO-powered video analysis for squash matches with player tracking and shot detection.", tags: ["YOLOv8", "Python", "CV"], color: "#4488ff" },
            { name: "Distill", desc: "Mobile app and web platform. React Native + Expo with a companion web dashboard.", tags: ["Expo", "TypeScript", "Supabase"], color: "#ff4466" },
          ].map((proj, i) => (
            <div key={i} style={{ border: "1px solid var(--line)", background: "rgba(15,15,20,0.6)", padding: "1.5rem", position: "relative", overflow: "hidden", borderTop: `2px solid ${proj.color}` }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>
                {proj.name}
              </div>
              <div style={{ color: "var(--dim)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                {proj.desc}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: "10px", padding: "0.15rem 0.5rem", background: "var(--raised)", border: "1px solid var(--line)", color: "var(--dim)", borderRadius: "3px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THOUGHTS */}
      <section className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            THOUGHTS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>Notes on things I&apos;m reading, making, and figuring out.</p>
        </div>
        <div>
          {thoughts.length === 0 ? (
            <p style={{ color: "var(--ghost)", paddingTop: "2rem", paddingBottom: "2rem", textAlign: "center" }}>
              No thoughts yet.
            </p>
          ) : (
            thoughts.map((thought, i) => (
              <ThoughtCard key={thought.id} thought={thought} index={i + 1} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

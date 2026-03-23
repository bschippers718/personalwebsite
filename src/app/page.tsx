import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ben Schippers",
  description: "Thoughts, projects, and musings from Ben Schippers.",
};

const stats = [
  { label: "Companies", value: "3 Founded" },
  { label: "Exits", value: "2 Acquired" },
  { label: "Apple", value: "App of the Year", highlight: true },
  { label: "Mile PR", value: "4:19" },
  { label: "Recognition", value: "Edison Nominee" },
];

const career = [
  {
    period: "2018 → Present",
    title: "CEO & Co-Founder",
    description: "TezLab — EV companion platform · National Grid energy partnership",
    tag: "ACTIVE",
    tagClass: "tag-current",
    active: true,
  },
  {
    period: "2012 → 2018",
    title: "CEO & Co-Founder",
    description: "HappyFunCorp — Product engineering studio · Inc 5000 · Edison Nominee",
    tag: "ACQUIRED BY TINY",
    tagClass: "tag-acquired",
    tagHref: "https://www.tinycapital.com/",
  },
  {
    period: "2006 → 2009",
    title: "CEO & Co-Founder",
    description: "Workstreamer — Real-time business intelligence platform · Raised from Austin Ventures",
    tag: "ACQUIRED BY WORKTHINK",
    tagClass: "tag-acquired",
  },
];

const education = [
  {
    period: "2000 → 2004",
    title: "B.A. American Cultural Studies · Minor in Education",
    description: "Bates College — #1 Squash · Team Captain · Top 32 Nationally",
    tag: "SCHOLAR-ATHLETE",
    tagClass: "tag-education",
  },
  {
    period: "2015",
    title: "Keynote Speaker & Alumni Inductee",
    description: "Bates College — Scholar-Athlete Society",
    tag: "HONORED",
    tagClass: "tag-award",
  },
];

const notableWork = [
  {
    brand: "Twitter",
    project: "NFL Integration",
    description: "Real-time game experiences and content integration bringing the NFL directly into the Twitter timeline.",
    color: "#1DA1F2",
  },
  {
    brand: "Periscope",
    project: "Live Video Platform",
    description: "Helped build the live-streaming platform that changed how the world broadcasts, acquired by Twitter.",
    color: "#e64646",
  },
  {
    brand: "Disney+",
    project: "Formerly Disney Anywhere",
    description: "Cross-platform digital movie and content delivery before it evolved into the streaming giant.",
    color: "#0057e7",
  },
  {
    brand: "Nike",
    project: "SNKRS",
    description: "The sneaker drop platform that created a new category of commerce and culture for Nike.",
    color: "#ff6b35",
  },
  {
    brand: "Samsung",
    project: "Samsung Health",
    description: "Health and fitness tracking platform shipped on hundreds of millions of Galaxy devices worldwide.",
    color: "#1428a0",
  },
  {
    brand: "Audible",
    project: "Audiobook Platform",
    description: "Product engineering for the world's largest audiobook platform, an Amazon company.",
    color: "#f8991d",
  },
];

const press = [
  {
    title: "Tiny Acquires HappyFunCorp for $30M",
    pub: "TechCrunch · Jul 2023",
    author: "Christine Hall",
    href: "https://techcrunch.com/2023/07/03/tiny-acquires-happyfuncorp-the-prolific-firm-thats-built-apps-for-twitter-amazon-and-more-for-30m/",
    tag: "ACQUISITION",
  },
  {
    title: "Founders Riding the EV Sales Wave",
    pub: "TechCrunch · Jun 2021",
    author: "Kirsten Korosec",
    href: "https://techcrunch.com/2021/06/15/founders-ben-schippers-and-evette-ellis-are-riding-the-ev-sales-wave/",
    tag: "FEATURE",
  },
  {
    title: "The Tesla Effect & Next Wave of EV Startups",
    pub: "TechCrunch · TC Sessions: Mobility · Jun 2021",
    author: "Kirsten Korosec",
    href: "https://techcrunch.com/2021/06/04/tezlab-ceo-ben-schippers-to-discuss-the-tesla-effect-and-the-next-wave-of-ev-startups-at-tc-sessions-mobility-2021/",
    tag: "SPEAKER",
  },
  {
    title: "Building Tech Stacks That Go the Distance",
    pub: "TechCrunch · TC Early Stage · Jun 2020",
    author: "Matt Burns",
    href: "https://techcrunch.com/2020/06/17/happyfuncorps-ben-schippers-and-jon-evans-will-talk-tech-stacks-at-tc-early-stage",
    tag: "SPEAKER",
  },
  {
    title: "Younger, Faster, Stronger",
    pub: "Inc. Magazine · Nov 2015",
    author: "Alix Stuart",
    href: "https://www.inc.com/magazine/201511/alix-stuart/younger-faster-stronger.html",
    tag: "PROFILE",
  },
  {
    title: "Engineering Firm HappyFunCorp Eyes More Acquisitions",
    pub: "TechCrunch · Aug 2015",
    author: "Jon Russell",
    href: "https://techcrunch.com/2015/08/16/happyfuncorp-acquisitions",
    tag: "FEATURE",
  },
  {
    title: "Injecting Your Company Culture With Gratitude",
    pub: "Fast Company · May 2015",
    author: "Vivian Giang",
    href: "https://www.fastcompany.com/3045128/this-web-development-shops-passion-project-injecting-your-company-culture-",
    tag: "FEATURE",
  },
  {
    title: "Built In Brooklyn: HappyFunCorp",
    pub: "TechCrunch · Jan 2015",
    author: "Anthony Ha",
    href: "https://techcrunch.com/2015/01/12/built-in-brooklyn-happyfuncorp",
    tag: "VIDEO",
  },
  {
    title: "Workstreamer Is A Realtime Listening Platform for Businesses",
    pub: "TechCrunch · Apr 2010",
    author: "Leena Rao",
    href: "https://techcrunch.com/2010/04/23/workstreamer-is-a-realtime-listening-and-tracking-platform-for-businesses/",
    tag: "LAUNCH",
  },
];

const articles = [
  { num: "01", title: "Technology Primed for Upswing", pub: "TechCrunch · Aug 2016", href: "https://techcrunch.com/2016/08/23/tech-is-primed-for-an-upswing/" },
  { num: "02", title: "Big Data and Its Developer Fallout", pub: "TechCrunch · Jun 2016", href: "https://techcrunch.com/2016/07/16/big-data-and-its-developer-fallout/" },
  { num: "03", title: "The Hungry Consumer and the Software Pivot", pub: "TechCrunch · Jun 2016", href: "https://techcrunch.com/2016/06/25/the-hungry-consumer-and-the-software-pivot/" },
  { num: "04", title: "The Downside of an Over-Capitalized Market", pub: "TechCrunch · Mar 2016", href: "https://techcrunch.com/2016/03/16/state-of-affairs/" },
  { num: "05", title: "App Fatigue", pub: "TechCrunch · Feb 2016", href: "https://techcrunch.com/2016/02/03/app-fatigue/" },
  { num: "06", title: "New-Age Bootstrapping Is Not a Money Problem", pub: "TechCrunch · Mar 2015", href: "https://techcrunch.com/2015/03/12/new-age-bootstrapping-is-not-a-money-problem-its-a-product-opportunity/" },
];

const prs = [
  { time: "4:19", event: "Mile", featured: true },
  { time: "32:44", event: "10K" },
  { time: "1:11:12", event: "Half Marathon" },
];

const races = [
  { title: "Grand Canyon Rim to Rim to Rim", description: "~42 miles through the Grand Canyon · Under 10 hours", badge: "COMPLETED", badgeClass: "badge-neon" },
  { title: "NYCRUNS Father's Day Half Marathon", description: "Brooklyn, NY · June 2014 · 1:11:12", badge: "2ND OVERALL", badgeClass: "badge-gold" },
  { title: "Bates College Squash", description: "#1 on ladder all 4 years · Team Captain · Top 32 nationally", badge: "SCHOLAR-ATHLETE", badgeClass: "badge-gold" },
];

const projects = [
  { name: "TezLab", description: "EV companion platform with energy insights, battery health tracking, and utility partnerships.", tags: ["React Native", "EV", "Energy"], color: "#00ffb2" },
  { name: "THE HIVE", description: "ML talent intelligence leaderboard tracking the most valuable minds in AI.", tags: ["Next.js", "ML Research", "Data"], color: "#ffb547" },
  { name: "Squash Analytics", description: "YOLO-powered video analysis for squash matches with player tracking and shot detection.", tags: ["YOLOv8", "Python", "CV"], color: "#4488ff" },
  { name: "Distill", description: "Mobile app and web platform. React Native + Expo with a companion web dashboard.", tags: ["Expo", "TypeScript", "Supabase"], color: "#ff4466" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-section">
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[400, 600, 800, 1000].map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: `1px solid rgba(255,181,71,${0.04 - i * 0.01})`,
                width: `${size}px`,
                height: `${size}px`,
                animation: `pulse-ring ${6 + i * 1.5}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--ghost)",
              marginBottom: "1.25rem",
              fontWeight: 300,
            }}
          >
            builder · athlete · investor
          </div>

          <h1 className="hero-title">
            BEN
            <br />
            <span style={{ color: "var(--ember)" }}>SCHIPPERS.</span>
          </h1>

          <p
            style={{
              color: "var(--dim)",
              fontSize: "0.95rem",
              maxWidth: "32rem",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
              padding: "0 1rem",
            }}
          >
            Entrepreneur and product architect building at the intersection of
            technology and energy. I make software, run long distances, and think
            about how tech reshapes markets.
          </p>

          <div className="hero-buttons">
            <a
              href="#career"
              style={{
                padding: "0.75rem 2rem",
                background: "var(--ember)",
                color: "var(--void)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "0.15em",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              VIEW CAREER
            </a>
            <a
              href="#athletics"
              style={{
                padding: "0.75rem 2rem",
                background: "transparent",
                border: "1px solid var(--edge)",
                color: "var(--dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              ATHLETICS
            </a>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8rem",
            background: "linear-gradient(transparent, var(--void))",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      </section>

      {/* Stats bar */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div className="stats-bar-grid">
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "1.25rem 1.5rem",
                borderRight: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ghost)",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 3vw, 1.4rem)",
                  fontWeight: 700,
                  color: stat.highlight ? "var(--neon)" : "var(--ember)",
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career */}
      <section id="career" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            CAREER
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Building and selling technology companies.{" "}
            <span style={{ color: "var(--ghost)" }}>
              Product-obsessed since day one.
            </span>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--line)",
            background: "var(--line)",
          }}
        >
          {career.map((item, i) => (
            <div
              key={i}
              className="career-row-grid"
              style={{
                background: item.active
                  ? "rgba(22,22,31,0.6)"
                  : "var(--base)",
                boxShadow: item.active
                  ? "0 0 15px rgba(255,181,71,0.08), inset 0 1px 0 rgba(255,181,71,0.06)"
                  : "none",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--ghost)" }}>
                {item.period}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "var(--dim)",
                    fontSize: "0.85rem",
                    marginTop: "0.15rem",
                  }}
                >
                  {item.description}
                </div>
              </div>
              {item.tagHref ? (
                <a
                  href={item.tagHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={item.tagClass}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid",
                    whiteSpace: "nowrap",
                    alignSelf: "start",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.tag} ↗
                </a>
              ) : (
                <span
                  className={item.tagClass}
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid",
                    whiteSpace: "nowrap",
                    alignSelf: "start",
                  }}
                >
                  {item.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Notable Work */}
      <section id="notable-work" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            NOTABLE WORK
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Products built at HappyFunCorp for the world&apos;s biggest brands.
          </p>
        </div>

        {/* App of the Year Highlight */}
        <div className="highlight-banner">
          <div className="highlight-banner-inner">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                  fontWeight: 800,
                  color: "var(--gold)",
                  letterSpacing: "-0.01em",
                }}
              >
                Apple App of the Year
              </span>
            </div>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--dim)",
              }}
            >
              AWARDED BY APPLE
            </span>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="notable-work-grid">
          {notableWork.map((item, i) => (
            <div
              key={i}
              className="notable-work-card"
              style={{
                borderTop: `2px solid ${item.color}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.15rem",
                  }}
                >
                  {item.brand}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: item.color,
                    fontWeight: 600,
                    marginBottom: "0.65rem",
                  }}
                >
                  {item.project}
                </div>
              </div>
              <div
                style={{
                  color: "var(--dim)",
                  fontSize: "0.8rem",
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Writing & Press */}
      <section id="writing" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            WRITING & PRESS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Published in TechCrunch, FastCompany, Forbes, and Inc.
          </p>
        </div>

        {/* Press & Features */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--line)",
            background: "var(--line)",
            marginBottom: "2rem",
          }}
        >
          {press.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="press-row"
              style={{ background: "var(--base)" }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    display: "block",
                  }}
                >
                  {item.title}
                </span>
                <span
                  className="press-pub-mobile"
                  style={{ fontSize: "11px", color: "var(--ghost)" }}
                >
                  {item.pub}
                </span>
              </div>
              <span
                className="press-pub-desktop"
                style={{
                  fontSize: "11px",
                  color: "var(--ghost)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.pub}
              </span>
              <span
                className={item.tag === "PROFILE" || item.tag === "ACQUISITION" ? "tag-acquired" : item.tag === "SPEAKER" ? "tag-current" : "tag-education"}
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  whiteSpace: "nowrap",
                }}
              >
                {item.tag}
              </span>
            </a>
          ))}
        </div>

        {/* Section label for authored articles */}
        <div style={{ marginBottom: "0.75rem" }}>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "var(--ghost)",
              textTransform: "uppercase" as const,
              fontWeight: 500,
            }}
          >
            Authored Articles
          </div>
        </div>

        {/* Authored Articles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--line)",
            background: "var(--line)",
          }}
        >
          {articles.map((article) => (
            <a
              key={article.num}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="writing-row-grid"
              style={{ background: "var(--base)", cursor: "pointer" }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--ghost)",
                  textAlign: "right",
                }}
              >
                {article.num}
              </span>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    display: "block",
                  }}
                >
                  {article.title}
                </span>
                <span
                  className="writing-pub-mobile"
                  style={{ fontSize: "11px", color: "var(--ghost)" }}
                >
                  {article.pub}
                </span>
              </div>
              <span
                className="writing-pub-desktop"
                style={{
                  fontSize: "11px",
                  color: "var(--ghost)",
                  whiteSpace: "nowrap",
                }}
              >
                {article.pub}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            PROJECTS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            What I&apos;m building now.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={i}
              style={{
                border: "1px solid var(--line)",
                background: "rgba(15,15,20,0.6)",
                padding: "1.5rem",
                position: "relative",
                overflow: "hidden",
                borderTop: `2px solid ${project.color}`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {project.name}
              </div>
              <div
                style={{
                  color: "var(--dim)",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                }}
              >
                {project.description}
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      padding: "0.15rem 0.5rem",
                      background: "var(--raised)",
                      border: "1px solid var(--line)",
                      color: "var(--dim)",
                      borderRadius: "3px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Athletics */}
      <section id="athletics" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            ATHLETICS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Running, squash, and pushing limits.{" "}
            <span style={{ color: "var(--ghost)" }}>
              Personal records & highlights.
            </span>
          </p>
        </div>

        <div className="pr-grid-responsive">
          {prs.map((pr, i) => (
            <div
              key={i}
              style={{
                background: "var(--base)",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                position: "relative",
                borderTop: pr.featured
                  ? "2px solid var(--ember)"
                  : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 8vw, 3rem)",
                  fontWeight: 800,
                  color: "var(--ember)",
                  letterSpacing: "-0.03em",
                }}
              >
                {pr.time}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ghost)",
                  marginTop: "0.5rem",
                }}
              >
                {pr.event}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1px" }}>
          {races.map((race, i) => (
            <div
              key={i}
              className="race-card-flex"
              style={{ marginTop: i === 0 ? 0 : "1px" }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                  }}
                >
                  {race.title}
                </div>
                <div
                  style={{
                    color: "var(--dim)",
                    fontSize: "0.8rem",
                    marginTop: "0.15rem",
                  }}
                >
                  {race.description}
                </div>
              </div>
              <span
                className={race.badgeClass}
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  whiteSpace: "nowrap",
                }}
              >
                {race.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            EDUCATION
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Bates College, Class of 2004.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--line)",
            background: "var(--line)",
          }}
        >
          {education.map((item, i) => (
            <div
              key={i}
              className="career-row-grid"
              style={{ background: "var(--base)" }}
            >
              <span style={{ fontSize: "12px", color: "var(--ghost)" }}>
                {item.period}
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "var(--dim)",
                    fontSize: "0.85rem",
                    marginTop: "0.15rem",
                  }}
                >
                  {item.description}
                </div>
              </div>
              <span
                className={item.tagClass}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  whiteSpace: "nowrap",
                  alignSelf: "start",
                }}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Thoughts */}
      <section className="section-container">
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            THOUGHTS
          </h2>
          <p style={{ color: "var(--dim)", fontSize: "0.85rem" }}>
            Notes on things I&apos;m reading, making, and figuring out.
          </p>
        </div>
        <div>
          <p
            style={{
              color: "var(--ghost)",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              textAlign: "center",
            }}
          >
            No thoughts yet.
          </p>
        </div>
      </section>
    </div>
  );
}

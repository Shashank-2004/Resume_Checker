import { useState } from "react";

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", active: true, dot: true },
  { icon: "🗋", label: "Resume Studio" },
  { icon: "🔍", label: "Job Analyzer" },
  { icon: "≡", label: "JD Ranker" },
  { icon: "🗺", label: "Career Path" },
  { icon: "⚡", label: "Skill Gap" },
  { icon: "💬", label: "Interview Prep" },
  { icon: "✉", label: "Cover Letter" },
  { icon: "$", label: "Salary Insights" },
  { icon: "⚠", label: "Job Toxicity" },
  { icon: "👁", label: "Recruiter View" },
  { icon: "↗", label: "Resume Versioning" },
  { icon: "🔗", label: "Secure Share" },
  { icon: "👥", label: "Community" },
  { icon: "🔔", label: "Job Alerts" },
];

const STAT_CARDS = [
  { label: "Total Applications",  value: "47",  sub: "+12 this week",     color: "#58a6ff" },
  { label: "Avg Match Score",     value: "72%", sub: "+5% vs last week",  color: "#56d364" },
  { label: "Interviews Predicted",value: "8",   sub: "This month",        color: "#22d3ee" },
  { label: "Resumes Saved",       value: "5",   sub: "3 versions active", color: "#f0883e" },
];

const HEATMAP_BARS = [
  { label: "Skills",         pct: 85, color: "#56d364" },
  { label: "Projects",       pct: 78, color: "#56d364" },
  { label: "Experience",     pct: 55, color: "#f0883e" },
  { label: "Education",      pct: 72, color: "#56d364" },
  { label: "Certifications", pct: 40, color: "#f85149" },
  { label: "Summary",        pct: 60, color: "#f0883e" },
];

const ACTIVITY = [
  { icon: "🗋", text: "Resume analyzed for Senior Dev role",   time: "2m ago" },
  { icon: "💬", text: "Cover letter generated for Google",     time: "1h ago" },
  { icon: "📈", text: "Skill gap identified: Docker",          time: "3h ago" },
  { icon: "👥", text: "Resume shared with TechCorp recruiter", time: "1d ago" },
];

const S = {
  layout:    { display:"flex", height:"100vh", overflow:"hidden", background:"#0d1117", fontFamily:"'Inter',sans-serif", fontSize:13, color:"#e6edf3" },
  sidebar:   { width:230, minWidth:230, background:"#0f1520", borderRight:"1px solid #1e2d45", display:"flex", flexDirection:"column", overflowY:"auto" },
  logoWrap:  { display:"flex", alignItems:"center", gap:10, padding:"16px 20px", borderBottom:"1px solid #1e2d45" },
  logoIcon:  { width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, color:"#fff" },
  logoText:  { fontWeight:700, fontSize:15 },
  navItem:   (active) => ({ display:"flex", alignItems:"center", gap:10, padding:"9px 20px", cursor:"pointer", color: active ? "#58a6ff" : "#8b949e", background: active ? "rgba(88,166,255,.12)" : "transparent", fontWeight: active ? 500 : 400, fontSize:13, position:"relative", borderRight: active ? "3px solid #58a6ff" : "3px solid transparent", transition:"background .15s,color .15s" }),
  navDot:    { width:6, height:6, borderRadius:"50%", background:"#58a6ff", marginLeft:"auto" },
  userWrap:  { padding:"14px 20px", borderTop:"1px solid #1e2d45", display:"flex", alignItems:"center", gap:10 },
  userAvatar:{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:"#fff" },
  main:      { flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  topbar:    { height:54, minHeight:54, background:"#0f1520", borderBottom:"1px solid #1e2d45", display:"flex", alignItems:"center", gap:16, padding:"0 24px" },
  search:    { flex:1, maxWidth:480, background:"rgba(255,255,255,.05)", border:"1px solid #1e2d45", borderRadius:8, display:"flex", alignItems:"center", gap:8, padding:"0 14px", height:34, color:"#8b949e" },
  aiBadge:   { display:"flex", alignItems:"center", gap:6, background:"rgba(163,113,247,.15)", border:"1px solid rgba(163,113,247,.35)", borderRadius:20, padding:"5px 12px", color:"#a371f7", fontSize:12, fontWeight:500 },
  aiDot:     { width:6, height:6, borderRadius:"50%", background:"#a371f7" },
  topAvatar: { width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, color:"#fff", cursor:"pointer" },
  content:   { flex:1, overflowY:"auto", padding:"28px 28px 40px" },
  statRow:   { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 },
  statCard:  { background:"#131c2e", border:"1px solid #1e2d45", borderRadius:12, padding:"18px 20px" },
  midRow:    { display:"grid", gridTemplateColumns:"1fr 300px", gap:14, marginBottom:20 },
  heatCard:  { background:"#131c2e", border:"1px solid #1e2d45", borderRadius:12, padding:"22px 24px" },
  rightCol:  { display:"flex", flexDirection:"column", gap:14 },
  miniCard:  { background:"#131c2e", border:"1px solid #1e2d45", borderRadius:12, padding:"18px 20px", flex:1 },
  qaRow:     { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 },
  actCard:   { background:"#131c2e", border:"1px solid #1e2d45", borderRadius:12, padding:"22px 24px" },
  actItem:   { display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid #1e2d45" },
  actIcon:   { width:36, height:36, borderRadius:8, background:"rgba(255,255,255,.05)", border:"1px solid #1e2d45", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 },
};

function Donut({ pct, size, stroke, color, fontSize }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  const c = size / 2;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth={stroke} />
        <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize, fontWeight:700, color:"#e6edf3" }}>
        {pct}%
      </div>
    </div>
  );
}

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div style={S.layout}>

      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.logoWrap}>
          <div style={S.logoIcon}>AI</div>
          <span style={S.logoText}>ResumeAI Pro</span>
        </div>

        <nav style={{ flex:1, padding:"12px 0" }}>
          {NAV_ITEMS.map(({ icon, label, dot }) => (
            <div key={label} style={S.navItem(activeNav === label)} onClick={() => setActiveNav(label)}>
              <span style={{ width:16, textAlign:"center" }}>{icon}</span>
              {label}
              {dot && activeNav === label && <span style={S.navDot} />}
            </div>
          ))}
        </nav>

        <div style={S.userWrap}>
          <div style={S.userAvatar}>JD</div>
          <div>
            <div style={{ fontWeight:600, fontSize:13 }}>John Doe</div>
            <div style={{ fontSize:11, color:"#8b949e" }}>Pro Plan</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={S.main}>

        {/* TOPBAR */}
        <header style={S.topbar}>
          <span style={{ color:"#8b949e", cursor:"pointer", fontSize:18 }}>☰</span>
          <span style={{ fontWeight:600, fontSize:15 }}>Dashboard</span>
          <div style={S.search}>
            <span>🔍</span>
            <input
              style={{ background:"none", border:"none", outline:"none", color:"#8b949e", fontSize:12, flex:1 }}
              placeholder="Search features, jobs, skills…"
            />
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:12 }}>
            <div style={S.aiBadge}><span style={S.aiDot} />✦ AI Active</div>
            <span style={{ color:"#8b949e", cursor:"pointer", fontSize:16 }}>🔔</span>
            <div style={S.topAvatar}>JD</div>
          </div>
        </header>

        {/* CONTENT */}
        <div style={S.content}>

          {/* Greeting */}
          <div style={{ marginBottom:24 }}>
            <h1 style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>
              Good morning, <span style={{ color:"#58a6ff" }}>John</span> 👋
            </h1>
            <p style={{ color:"#8b949e", fontSize:13 }}>Your AI career intelligence dashboard is ready.</p>
          </div>

          {/* Stat Cards */}
          <div style={S.statRow}>
            {STAT_CARDS.map(({ label, value, sub, color }) => (
              <div key={label} style={S.statCard}>
                <div style={{ color:"#8b949e", fontSize:12, marginBottom:8 }}>{label}</div>
                <div style={{ fontSize:28, fontWeight:700, color, marginBottom:4 }}>{value}</div>
                <div style={{ fontSize:11, color:"#8b949e" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Mid Row */}
          <div style={S.midRow}>

            {/* Heatmap */}
            <div style={S.heatCard}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <span style={{ fontSize:15, fontWeight:600 }}>Profile Strength Heatmap</span>
                <span style={{ fontSize:12, color:"#58a6ff", cursor:"pointer" }}>View full →</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:30 }}>
                <Donut pct={68} size={110} stroke={10} color="#58a6ff" fontSize={18} />
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
                  {HEATMAP_BARS.map(({ label, pct, color }) => (
                    <div key={label} style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:88, color:"#8b949e", fontSize:12, textAlign:"right" }}>{label}</div>
                      <div style={{ flex:1, height:6, background:"rgba(255,255,255,.07)", borderRadius:4, overflow:"hidden" }}>
                        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:4 }} />
                      </div>
                      <div style={{ width:32, color:"#8b949e", fontSize:12, textAlign:"right" }}>{pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={S.rightCol}>

              {/* Resume Match Score */}
              <div style={S.miniCard}>
                <div style={{ fontSize:11, color:"#8b949e", marginBottom:10 }}>Resume Match Score</div>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <Donut pct={82} size={72} stroke={8} color="#a371f7" fontSize={13} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Senior React Dev</div>
                    <div style={{ fontSize:11, color:"#8b949e", marginBottom:8 }}>Last analyzed JD</div>
                    <span style={{ display:"inline-block", background:"rgba(86,211,100,.15)", border:"1px solid rgba(86,211,100,.3)", borderRadius:6, padding:"3px 10px", fontSize:11, color:"#56d364", fontWeight:600 }}>
                      Strong Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Interview Probability */}
              <div style={S.miniCard}>
                <div style={{ fontSize:11, color:"#8b949e", marginBottom:10 }}>Interview Probability</div>
                <div style={{ fontSize:28, fontWeight:700, color:"#f0883e", marginBottom:2 }}>62%</div>
                <div style={{ fontSize:11, color:"#8b949e", marginBottom:10 }}>Chance of shortlisting</div>
                <div style={{ height:6, background:"rgba(255,255,255,.07)", borderRadius:4, overflow:"hidden", marginBottom:10 }}>
                  <div style={{ width:"62%", height:"100%", background:"linear-gradient(90deg,#f0883e,#f59e0b)", borderRadius:4 }} />
                </div>
                <span style={{ fontSize:12, color:"#58a6ff", cursor:"pointer" }}>See breakdown →</span>
              </div>

            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ fontSize:16, fontWeight:600, marginBottom:14 }}>Quick Actions</div>
          <div style={S.qaRow}>
            {[
              { label:"↑ Upload Resume",   bg:"linear-gradient(135deg,#3b82f6,#2563eb)" },
              { label:"📋 Paste JD",       bg:"linear-gradient(135deg,#a855f7,#7c3aed)" },
              { label:"💬 Cover Letter",   bg:"linear-gradient(135deg,#22d3ee,#0891b2)" },
              { label:"💬 Interview Prep", bg:"linear-gradient(135deg,#22c55e,#16a34a)" },
            ].map(({ label, bg }) => (
              <button key={label} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, height:52, borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", color:"#fff", background:bg }}>
                {label}
              </button>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={S.actCard}>
            <div style={{ fontSize:15, fontWeight:600, marginBottom:4 }}>Recent Activity</div>
            <div>
              {ACTIVITY.map(({ icon, text, time }, i) => (
                <div key={i} style={{ ...S.actItem, ...(i === ACTIVITY.length - 1 ? { borderBottom:"none" } : {}) }}>
                  <div style={S.actIcon}>{icon}</div>
                  <div style={{ flex:1, fontSize:13 }}>{text}</div>
                  <div style={{ fontSize:11, color:"#8b949e", whiteSpace:"nowrap" }}>🕐 {time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
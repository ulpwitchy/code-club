import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   FONTS — Google Fonts loaded via link injection
   ═══════════════════════════════════════════════ */
const FONT_LINK = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════ */
const T = {
  bg: "#06080d",
  surface: "#0c1018",
  card: "rgba(14, 19, 30, 0.85)",
  glass: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.10)",
  text: "#e8ecf4",
  textMuted: "#6b7a94",
  textDim: "#3d4a5e",
  accent: "#3b82f6",
  accentGlow: "rgba(59,130,246,0.25)",
  green: "#10b981",
  greenGlow: "rgba(16,185,129,0.2)",
  red: "#ef4444",
  orange: "#f59e0b",
  purple: "#8b5cf6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  font: "'Outfit', sans-serif",
  mono: "'JetBrains Mono', monospace",
  radius: 16,
  radiusSm: 10,
};

/* ═══════════════════════════════════════════════
   LESSON DATA
   ═══════════════════════════════════════════════ */
const MODULES = [
  {
    id: "basics",
    num: 1,
    title: "The Basics",
    subtitle: "Understand the tools before you use them",
    color: T.cyan,
    icon: "◆",
    lessons: [
      {
        id: "terminal",
        title: "What is a Terminal?",
        xp: 50,
        icon: "▸",
        color: T.cyan,
        slides: [
          {
            type: "hero",
            title: "Meet the Terminal",
            subtitle: "Your computer's command center",
            icon: "▸_",
            color: T.cyan,
          },
          {
            type: "concept",
            title: "Think of it like this",
            body: "Your computer has two ways to interact with it:",
            comparisons: [
              { label: "GUI", desc: "Click icons, drag files, use menus", icon: "🖱", side: "left" },
              { label: "Terminal", desc: "Type commands, get instant results", icon: "⌨️", side: "right" },
            ],
            footnote: "Both do the same thing — the terminal is just faster and more powerful for certain tasks.",
          },
          {
            type: "concept",
            title: "Why developers love it",
            body: "",
            bullets: [
              { icon: "⚡", text: "Speed — no clicking through menus", color: T.orange },
              { icon: "🎯", text: "Precision — say exactly what you want", color: T.accent },
              { icon: "🔧", text: "Power — some things only work here", color: T.purple },
              { icon: "🤖", text: "Claude Code lives in the terminal", color: T.green },
            ],
          },
          {
            type: "concept",
            title: "Where to find it",
            body: "",
            cards: [
              { platform: "Mac", app: "Terminal", shortcut: "⌘ + Space → type \"Terminal\"", color: T.cyan },
              { platform: "Windows", app: "PowerShell", shortcut: "Search → type \"PowerShell\"", color: T.accent },
            ],
            footnote: "You'll see a dark screen with a blinking cursor. That's it. It's just waiting for your first command.",
          },
          {
            type: "terminal",
            title: "Try it: Basic commands",
            intro: "Tap each command to run it in the simulated terminal",
            steps: [
              { cmd: "pwd", out: "/Users/jake", note: "\"Print Working Directory\" — shows where you are. Like checking which room you're in." },
              { cmd: "ls", out: "Desktop     Documents   Downloads\nMovies      Music       Pictures", note: "\"List\" — shows everything in your current folder. Like looking around the room." },
              { cmd: "cd Desktop", out: "~/Desktop $", note: "\"Change Directory\" — moves to another folder. You just walked into the Desktop." },
              { cmd: "mkdir my-project", out: "~/Desktop $", note: "\"Make Directory\" — creates a new folder. You just created my-project on your Desktop!" },
            ],
          },
          {
            type: "quiz",
            question: "To see what files are in a folder, you type:",
            options: ["pwd", "ls", "cd", "mkdir"],
            correct: 1,
            feedback: ["pwd shows location, not files", "✓ ls lists everything in the current folder", "cd moves between folders", "mkdir creates a new folder"],
          },
        ],
      },
      {
        id: "github",
        title: "What is GitHub?",
        xp: 50,
        icon: "⊙",
        color: T.purple,
        slides: [
          {
            type: "hero",
            title: "GitHub",
            subtitle: "Where code lives on the internet",
            icon: "⊙",
            color: T.purple,
          },
          {
            type: "concept",
            title: "The simplest explanation",
            body: "",
            comparisons: [
              { label: "Google Drive", desc: "Stores your documents online", icon: "📄", side: "left" },
              { label: "GitHub", desc: "Stores your code projects online", icon: "💻", side: "right" },
            ],
            footnote: "Developers use GitHub to back up code, share it, and track every change they've ever made.",
          },
          {
            type: "concept",
            title: "Vocabulary check",
            body: "",
            vocab: [
              { term: "Repository (repo)", def: "A project folder. All files for one project live in one repo.", example: "burnsy-website" },
              { term: "Commit", def: "A saved snapshot of your changes. Like hitting 'save' but it remembers every version.", example: "\"Added contact page\"" },
              { term: "Push", def: "Upload your local changes to GitHub so they're backed up online.", example: "git push" },
            ],
          },
          {
            type: "concept",
            title: "Why you should care",
            body: "",
            bullets: [
              { icon: "🤖", text: "Claude Code uses GitHub to manage projects", color: T.green },
              { icon: "🌍", text: "It's where the entire tech world shares work", color: T.accent },
              { icon: "👥", text: "Your future dev hires will use it daily", color: T.purple },
              { icon: "💰", text: "Free for public projects", color: T.orange },
            ],
          },
          {
            type: "quiz",
            question: "A 'repo' on GitHub is:",
            options: ["A programming language", "A project folder for your code", "A type of website", "A coding tool"],
            correct: 1,
            feedback: ["Repos hold code written in any language", "✓ A repo is a project folder containing all your files", "GitHub hosts repos, not websites directly", "GitHub is the platform, a repo is your project on it"],
          },
        ],
      },
      {
        id: "node",
        title: "What is Node.js?",
        xp: 50,
        icon: "◈",
        color: T.green,
        slides: [
          {
            type: "hero",
            title: "Node.js",
            subtitle: "The engine under the hood",
            icon: "◈",
            color: T.green,
          },
          {
            type: "concept",
            title: "One analogy, that's all you need",
            body: "",
            comparisons: [
              { label: "Car", desc: "Claude Code — the tool you actually use", icon: "🚗", side: "left" },
              { label: "Engine", desc: "Node.js — what makes it run", icon: "⚙️", side: "right" },
            ],
            footnote: "Install Node.js once. Forget about it. Claude Code handles the rest.",
          },
          {
            type: "terminal",
            title: "Installing Node.js",
            intro: "Here's the entire process — it's 3 commands:",
            steps: [
              { cmd: "node --version", out: "command not found: node", note: "Check if it's installed. \"command not found\" = not yet." },
              { cmd: "brew install node", out: "==> Downloading node-22.0.0...\n==> Installing node\n🍺 node installed!", note: "On Mac, 'brew' installs programs. One command. On Windows, download from nodejs.org instead." },
              { cmd: "node --version", out: "v22.0.0", note: "Now it shows a version number. Done. Node.js is installed. ✓" },
            ],
          },
          {
            type: "quiz",
            question: "Why do you need Node.js?",
            options: ["It makes your internet faster", "It's the engine Claude Code runs on", "It's a language you need to learn", "It stores files on GitHub"],
            correct: 1,
            feedback: ["Node has nothing to do with internet speed", "✓ Node.js is the runtime that powers Claude Code", "You don't interact with Node directly", "GitHub handles file storage, not Node"],
          },
        ],
      },
    ],
  },
  {
    id: "fundamentals",
    num: 2,
    title: "Claude Code",
    subtitle: "Install it, use it, understand it",
    color: T.accent,
    icon: "⬡",
    lessons: [
      {
        id: "install",
        title: "Installing Claude Code",
        xp: 60,
        icon: "↓",
        color: T.accent,
        slides: [
          {
            type: "hero",
            title: "Installation",
            subtitle: "60 seconds to get set up",
            icon: "↓",
            color: T.accent,
          },
          {
            type: "concept",
            title: "What you need first",
            body: "",
            checklist: [
              { item: "Node.js installed", done: true },
              { item: "Claude Pro or Max subscription", done: true },
              { item: "Terminal app open", done: true },
            ],
          },
          {
            type: "terminal",
            title: "The install",
            intro: "Two commands and you're in:",
            steps: [
              { cmd: "npm install -g @anthropic-ai/claude-code", out: "added 1 package in 12s", note: "npm is a package installer that comes with Node. This downloads and installs Claude Code globally on your machine." },
              { cmd: "claude", out: "╔═══════════════════════════════╗\n║   Welcome to Claude Code 🎉  ║\n║   Opening browser to log in  ║\n╚═══════════════════════════════╝", note: "Type 'claude' to launch. First time, it opens your browser to log in. After that, just type 'claude' and go." },
              { cmd: "claude", out: "Claude Code v1.0\n\n  What can I help you build?\n\n> _", note: "That blinking cursor is waiting for you to describe what you want — in plain English. You're in. 🚀" },
            ],
          },
          {
            type: "quiz",
            question: "The command to install Claude Code is:",
            options: ["brew install claude", "npm install -g @anthropic-ai/claude-code", "pip install claude", "download claude-code"],
            correct: 1,
            feedback: ["brew is for other tools", "✓ npm installs Node packages — Claude Code is one", "pip is for Python, not Claude Code", "That's not a real terminal command"],
          },
        ],
      },
      {
        id: "first-session",
        title: "Your First Session",
        xp: 70,
        icon: "◉",
        color: T.pink,
        slides: [
          {
            type: "hero",
            title: "First Session",
            subtitle: "It's just a conversation that builds things",
            icon: "◉",
            color: T.pink,
          },
          {
            type: "concept",
            title: "How it works",
            body: "Using Claude Code is like texting a developer friend. You describe what you want. They build it. Except this friend works instantly and never gets tired.",
            bullets: [
              { icon: "💬", text: "You type in plain English", color: T.accent },
              { icon: "📂", text: "Claude Code reads your project files", color: T.cyan },
              { icon: "✏️", text: "It writes and edits code for you", color: T.green },
              { icon: "✅", text: "You approve each change before it happens", color: T.orange },
            ],
          },
          {
            type: "terminal",
            title: "Real example: Build a landing page",
            intro: "Watch a full session for Burnsy Enterprises:",
            steps: [
              { cmd: "cd Desktop && mkdir burnsy-site && cd burnsy-site", out: "~/burnsy-site $", note: "Create a project folder and enter it. Claude Code works inside whatever folder you're in." },
              { cmd: "claude", out: "Claude Code v1.0\n> _", note: "Launch Claude Code inside your project folder." },
              { cmd: "Build a landing page for Burnsy Enterprises, my sports card business. Hero section with my brand name, a grid of featured cards, and a link to my eBay store.", out: "Planning approach...\n\n📁 Creating:\n  index.html\n  styles.css\n  script.js\n\n✅ Built hero section with Burnsy branding\n✅ Added responsive card grid\n✅ Linked eBay store button\n✅ Added smooth scroll animations\n\nOpen in browser? (y/n)", note: "Plain English → full website. It created 3 files and wrote everything. No coding needed." },
              { cmd: "y", out: "Opening in Safari...\n\n> Anything else?", note: "Your site is live in the browser. Keep chatting to make changes — Claude remembers the whole conversation." },
            ],
          },
          {
            type: "concept",
            title: "Key commands to know",
            body: "",
            vocab: [
              { term: "/clear", def: "Start a fresh conversation. Use between different tasks.", example: "Clears context" },
              { term: "CLAUDE.md", def: "A file in your project with your preferences. Claude reads it every session.", example: "\"Use dark theme, keep code simple\"" },
              { term: "/cost", def: "Check how much API usage you've consumed in the current session.", example: "$0.42 this session" },
            ],
          },
          {
            type: "quiz",
            question: "CLAUDE.md is:",
            options: ["An install file", "A preferences file Claude reads each session", "A password file", "A GitHub setting"],
            correct: 1,
            feedback: ["Installation uses npm, not CLAUDE.md", "✓ It's your project config that Claude reads automatically every time", "Never put passwords in CLAUDE.md", "It's a local file, not a GitHub feature"],
          },
        ],
      },
      {
        id: "files",
        title: "How It Handles Files",
        xp: 60,
        icon: "□",
        color: T.orange,
        slides: [
          {
            type: "hero",
            title: "File Power",
            subtitle: "It sees, reads, and edits your whole project",
            icon: "□",
            color: T.orange,
          },
          {
            type: "concept",
            title: "What makes it different from this chat",
            body: "",
            comparisons: [
              { label: "Claude.ai", desc: "You paste code into chat. Claude responds with text.", icon: "💬", side: "left" },
              { label: "Claude Code", desc: "Claude reads your actual files and edits them directly.", icon: "📂", side: "right" },
            ],
            footnote: "This is the superpower. Claude Code doesn't just talk about code — it actually changes your files.",
          },
          {
            type: "concept",
            title: "The permission system",
            body: "Before Claude Code touches anything, it asks permission:",
            bullets: [
              { icon: "📄", text: "\"Can I edit index.html?\" → you approve or deny", color: T.accent },
              { icon: "⚙️", text: "\"Can I run npm install?\" → you approve or deny", color: T.orange },
              { icon: "🗑", text: "\"Can I delete old-file.js?\" → you approve or deny", color: T.red },
              { icon: "🟢", text: "Auto-approve mode exists if you fully trust it", color: T.green },
            ],
          },
          {
            type: "concept",
            title: "Real example: fixing a bug",
            body: "",
            flow: [
              { step: "1", text: "You: \"The Buy Now button doesn't work\"" },
              { step: "2", text: "Claude reads your HTML & JS files" },
              { step: "3", text: "Finds the issue: missing click handler" },
              { step: "4", text: "Shows you the fix, asks permission" },
              { step: "5", text: "You approve → file updated → bug fixed ✓" },
            ],
          },
          {
            type: "quiz",
            question: "Before editing a file, Claude Code:",
            options: ["Just edits it immediately", "Asks for your permission", "Uploads it to GitHub", "Creates a backup first"],
            correct: 1,
            feedback: ["It always asks first (unless auto-approve is on)", "✓ You review and approve every change", "Editing and GitHub are separate", "It shows you the diff, not a backup"],
          },
        ],
      },
    ],
  },
  {
    id: "power",
    num: 3,
    title: "Power Moves",
    subtitle: "Real projects for your real businesses",
    color: T.orange,
    icon: "◇",
    lessons: [
      {
        id: "burnsy",
        title: "Automate Burnsy Enterprises",
        xp: 80,
        icon: "♠",
        color: T.orange,
        slides: [
          {
            type: "hero",
            title: "Burnsy × Claude Code",
            subtitle: "Build real tools for your card business",
            icon: "♠",
            color: T.orange,
          },
          {
            type: "concept",
            title: "What you could build",
            body: "Claude Code isn't just for developers. It's for anyone who wants to build and automate.",
            bullets: [
              { icon: "🌐", text: "Professional website / landing page", color: T.accent },
              { icon: "📦", text: "Inventory tracking system", color: T.green },
              { icon: "✍️", text: "Auto-generate eBay listing descriptions", color: T.purple },
              { icon: "💲", text: "Card pricing calculator", color: T.orange },
              { icon: "📊", text: "Sales analytics dashboard", color: T.cyan },
            ],
          },
          {
            type: "terminal",
            title: "Build an inventory tracker",
            intro: "Watch how natural this is:",
            steps: [
              { cmd: "Build me a sports card inventory tracker. I need fields for: card name, sport, year, condition, purchase price, and listing price. Add search, filters, and a profit calculator.", out: "Planning inventory tracker app...\n\n📁 Creating:\n  index.html\n  app.js\n  styles.css", note: "You described a business tool in plain English. Claude Code starts building." },
              { cmd: "", out: "✅ Card entry form with all fields\n✅ Search by name, sport, year\n✅ Filter by condition (Mint → Poor)\n✅ Profit calc (listing − purchase)\n✅ Total inventory value dashboard\n✅ Dark theme, mobile-responsive\n\nOpening in browser...", note: "Full inventory app in ~60 seconds. It even added a profit calculator because it understood your business context. 🔥" },
              { cmd: "Add CSV export so I can open my inventory in Excel", out: "✅ Added \"Export CSV\" button\n   Exports all data + profit margins\n\nReady to test.", note: "Need more features? Just keep chatting. Claude Code edits the existing project." },
            ],
          },
          {
            type: "quiz",
            question: "To build an inventory tracker with Claude Code, you need to know:",
            options: ["JavaScript and React", "Just describe what you want in English", "Python and databases", "Advanced HTML and CSS"],
            correct: 1,
            feedback: ["Claude Code writes the JavaScript for you", "✓ Describe the tool → Claude builds it → you approve", "Claude Code handles the tech stack", "Claude Code writes the frontend code"],
          },
        ],
      },
      {
        id: "content",
        title: "Content & TikTok Automation",
        xp: 80,
        icon: "▶",
        color: T.pink,
        slides: [
          {
            type: "hero",
            title: "Content Machine",
            subtitle: "Automate the boring parts of content creation",
            icon: "▶",
            color: T.pink,
          },
          {
            type: "concept",
            title: "Tools you could build",
            body: "Content creation has a lot of repetitive work. Automate it.",
            bullets: [
              { icon: "📝", text: "TikTok script generator with hooks", color: T.pink },
              { icon: "📅", text: "Content calendar web app", color: T.accent },
              { icon: "📊", text: "Performance tracking dashboard", color: T.green },
              { icon: "#️⃣", text: "Hashtag research tool by niche", color: T.purple },
              { icon: "🖼", text: "Thumbnail / caption batch generator", color: T.orange },
            ],
          },
          {
            type: "concept",
            title: "MCP — the advanced play",
            body: "MCP (Model Context Protocol) lets Claude Code connect to external tools:",
            bullets: [
              { icon: "📁", text: "Google Drive — read and organize docs", color: T.accent },
              { icon: "💬", text: "Slack — send messages and updates", color: T.purple },
              { icon: "📊", text: "Google Sheets — read/write spreadsheet data", color: T.green },
              { icon: "🔗", text: "Custom APIs — eBay, TikTok analytics, etc.", color: T.orange },
            ],
            footnote: "You don't need MCP yet. Just know it exists for when you're ready to go deep.",
          },
          {
            type: "quiz",
            question: "MCP lets Claude Code:",
            options: ["Run faster", "Connect to tools like Google Drive and Slack", "Write better code", "Install Node.js"],
            correct: 1,
            feedback: ["MCP doesn't affect speed", "✓ MCP connects Claude Code to external services and tools", "Code quality is separate from MCP", "Node installation is a one-time setup"],
          },
        ],
      },
      {
        id: "roadmap",
        title: "Your Action Plan",
        xp: 100,
        icon: "★",
        color: T.green,
        slides: [
          {
            type: "hero",
            title: "Your Roadmap",
            subtitle: "4 weeks from zero to building real tools",
            icon: "★",
            color: T.green,
          },
          {
            type: "concept",
            title: "Week by week",
            body: "",
            flow: [
              { step: "W1", text: "Install Node.js + Claude Code. Get comfortable with the terminal." },
              { step: "W2", text: "Build something simple — a personal homepage or Burnsy landing page." },
              { step: "W3", text: "Build a real tool — inventory tracker, content planner, or pricing calc." },
              { step: "W4", text: "Connect services with MCP. Start building automations." },
            ],
          },
          {
            type: "concept",
            title: "Pro tips from day one",
            body: "",
            bullets: [
              { icon: "🎯", text: "Be specific in prompts. Details = better results.", color: T.accent },
              { icon: "📄", text: "Create a CLAUDE.md in every project folder.", color: T.green },
              { icon: "🧹", text: "Use /clear between different tasks.", color: T.orange },
              { icon: "🐣", text: "Start small. Don't build a full app on day one.", color: T.purple },
              { icon: "👀", text: "You don't need to understand the code — just review it.", color: T.pink },
            ],
          },
          {
            type: "graduation",
            title: "You're ready",
            items: [
              "What a terminal is and basic commands",
              "What GitHub is and why it matters",
              "What Node.js does and how to install it",
              "How to install and launch Claude Code",
              "How to have a conversation that builds real things",
              "How files are read and edited",
              "Real-world projects for your businesses",
            ],
          },
        ],
      },
    ],
  },
];

const FLAT = MODULES.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleNum: m.num, moduleTitle: m.title, moduleColor: m.color })));

/* ═══════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════ */
const GLOBAL_CSS = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.15); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.3); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes checkPop { 0% { transform: scale(0); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }
@keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-80px) rotate(360deg); opacity: 0; } }

* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body { background: ${T.bg}; overflow-x: hidden; }

::-webkit-scrollbar { width: 0; height: 0; }

.tab-active { color: ${T.accent} !important; }
.tab-active::after { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); width: 20px; height: 3px; background: ${T.accent}; border-radius: 2px; }
`;

/* ═══════════════════════════════════════════════
   COMPONENTS — Terminal Simulator
   ═══════════════════════════════════════════════ */
function Terminal({ steps }) {
  const [idx, setIdx] = useState(-1);
  const [typed, setTyped] = useState("");
  const [showOut, setShowOut] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const ref = useRef(null);

  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);

  const run = (i) => {
    if (ref.current) clearInterval(ref.current);
    setIdx(i);
    setTyped("");
    setShowOut(false);
    setShowNote(false);
    const s = steps[i];
    if (!s.cmd) { setShowOut(true); setTimeout(() => setShowNote(true), 300); return; }
    let c = 0;
    ref.current = setInterval(() => {
      c++;
      setTyped(s.cmd.slice(0, c));
      if (c >= s.cmd.length) {
        clearInterval(ref.current);
        setTimeout(() => setShowOut(true), 250);
        setTimeout(() => setShowNote(true), 550);
      }
    }, 22);
  };

  const tap = () => {
    if (idx < steps.length - 1) run(idx + 1);
    else { setIdx(-1); setTyped(""); setShowOut(false); setShowNote(false); }
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div onClick={tap} style={{
        background: "#0a0e17",
        borderRadius: 14,
        border: `1px solid ${T.border}`,
        overflow: "hidden",
        cursor: "pointer",
        userSelect: "none",
      }}>
        {/* Title bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 8, fontSize: 11, color: T.textDim, fontFamily: T.mono }}>terminal</span>
        </div>
        {/* Content */}
        <div style={{ padding: 14, fontFamily: T.mono, fontSize: 12, lineHeight: 1.7, color: "#8b949e", minHeight: 100 }}>
          {idx === -1 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: T.textDim }}>
              <div style={{ fontSize: 20, marginBottom: 6, animation: "float 2s ease-in-out infinite" }}>👆</div>
              <div style={{ fontSize: 12 }}>Tap to start</div>
            </div>
          ) : (
            <>
              {steps.slice(0, idx + 1).map((s, i) => (
                <div key={i} style={{ marginBottom: i < idx ? 10 : 0 }}>
                  {s.cmd && (
                    <div><span style={{ color: T.green }}>❯ </span><span style={{ color: "#e6edf3" }}>{i < idx ? s.cmd : typed}</span>
                      {i === idx && !showOut && <span style={{ animation: "blink 1s infinite", color: T.accent }}>▋</span>}
                    </div>
                  )}
                  {(i < idx || showOut) && s.out && <div style={{ whiteSpace: "pre-wrap", color: "#7d8da0", marginTop: 2 }}>{s.out}</div>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* Explanation */}
      {showNote && idx >= 0 && (
        <div style={{
          marginTop: 10, padding: 14, background: `${steps[idx].color || T.accent}11`,
          borderRadius: 12, borderLeft: `3px solid ${steps[idx].color || T.accent}`,
          fontSize: 13.5, lineHeight: 1.6, color: T.text, animation: "fadeUp 0.3s ease",
        }}>
          {steps[idx].note}
        </div>
      )}
      {idx >= 0 && (
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: T.textDim }}>
          {idx < steps.length - 1 ? `${idx + 1}/${steps.length} — tap for next` : "tap to restart"}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COMPONENTS — Quiz
   ═══════════════════════════════════════════════ */
function QuizCard({ question, options, correct, feedback }) {
  const [sel, setSel] = useState(null);
  const [shake, setShake] = useState(false);

  const pick = (i) => {
    if (sel !== null) return;
    setSel(i);
    if (i !== correct) { setShake(true); setTimeout(() => setShake(false), 500); }
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <p style={{ fontSize: 17, fontWeight: 600, color: T.text, marginBottom: 18, lineHeight: 1.4, fontFamily: T.font }}>{question}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((o, i) => {
          const picked = sel === i;
          const right = i === correct;
          const revealed = sel !== null;
          let bg = T.glass;
          let brd = T.border;
          if (revealed && right) { bg = `${T.green}15`; brd = `${T.green}50`; }
          else if (revealed && picked && !right) { bg = `${T.red}15`; brd = `${T.red}50`; }
          return (
            <button key={i} onClick={() => pick(i)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              background: bg, border: `1px solid ${brd}`, borderRadius: 12,
              color: T.text, fontSize: 15, textAlign: "left", cursor: sel === null ? "pointer" : "default",
              fontFamily: T.font, transition: "all 0.2s",
              animation: picked && shake ? "shake 0.4s ease" : undefined,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0, fontFamily: T.mono,
                background: revealed && right ? `${T.green}25` : revealed && picked ? `${T.red}25` : "rgba(255,255,255,0.05)",
                color: revealed && right ? T.green : revealed && picked ? T.red : T.textMuted,
                transition: "all 0.3s",
              }}>
                {revealed && right ? "✓" : revealed && picked ? "✗" : String.fromCharCode(65 + i)}
              </div>
              <span>{o}</span>
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div style={{
          marginTop: 14, padding: 14,
          background: sel === correct ? `${T.green}0a` : `${T.red}0a`,
          borderRadius: 12, borderLeft: `3px solid ${sel === correct ? T.green : T.red}`,
          fontSize: 14, lineHeight: 1.5, color: T.text, animation: "fadeUp 0.3s ease", fontFamily: T.font,
        }}>
          {feedback[sel]}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SLIDE RENDERER
   ═══════════════════════════════════════════════ */
function Slide({ slide, lessonColor }) {
  const c = slide.color || lessonColor || T.accent;

  if (slide.type === "hero") {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "55vh", textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.6s ease",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, fontFamily: T.mono, fontWeight: 700, color: c,
          background: `${c}12`, border: `1px solid ${c}30`,
          marginBottom: 24, animation: "glow 3s ease-in-out infinite",
          boxShadow: `0 0 30px ${c}20`,
        }}>
          {slide.icon}
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: T.text, marginBottom: 8, fontFamily: T.font, letterSpacing: "-0.02em" }}>
          {slide.title}
        </h1>
        <p style={{ fontSize: 16, color: T.textMuted, fontFamily: T.font, fontWeight: 400 }}>{slide.subtitle}</p>
      </div>
    );
  }

  if (slide.type === "terminal") {
    return (
      <div>
        {slide.intro && <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 14, lineHeight: 1.5, fontFamily: T.font }}>{slide.intro}</p>}
        <Terminal steps={slide.steps.map((s) => ({ ...s, color: c }))} />
      </div>
    );
  }

  if (slide.type === "quiz") {
    return <QuizCard question={slide.question} options={slide.options} correct={slide.correct} feedback={slide.feedback} />;
  }

  if (slide.type === "graduation") {
    return (
      <div style={{ animation: "fadeUp 0.5s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🎓</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, fontFamily: T.font }}>{slide.title}</h2>
          <p style={{ fontSize: 14, color: T.textMuted, marginTop: 6, fontFamily: T.font }}>You now understand:</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              background: `${T.green}08`, border: `1px solid ${T.green}18`, borderRadius: 12,
              animation: `fadeUp 0.4s ease ${i * 0.08}s both`, fontFamily: T.font,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: `${T.green}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: T.green, fontWeight: 700, flexShrink: 0,
              }}>✓</div>
              <span style={{ fontSize: 14, color: T.text, lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>
        <p style={{
          textAlign: "center", marginTop: 24, fontSize: 15, color: T.textMuted, fontFamily: T.font, lineHeight: 1.5,
        }}>
          Open that Terminal. Type <code style={{ fontFamily: T.mono, color: T.accent, background: `${T.accent}15`, padding: "2px 6px", borderRadius: 4 }}>claude</code>. You've got this, Jake. 💪
        </p>
      </div>
    );
  }

  // CONCEPT slides
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      {slide.body && <p style={{ fontSize: 15, color: T.textMuted, lineHeight: 1.6, marginBottom: 18, fontFamily: T.font }}>{slide.body}</p>}

      {slide.comparisons && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {slide.comparisons.map((cmp, i) => (
            <div key={i} style={{
              padding: 16, borderRadius: 14, background: T.glass, border: `1px solid ${T.border}`,
              textAlign: "center", animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{cmp.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4, fontFamily: T.font }}>{cmp.label}</div>
              <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.4, fontFamily: T.font }}>{cmp.desc}</div>
            </div>
          ))}
        </div>
      )}

      {slide.bullets && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.bullets.map((b, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
              background: `${b.color}08`, border: `1px solid ${b.color}18`, borderRadius: 12,
              animation: `fadeUp 0.4s ease ${i * 0.08}s both`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, background: `${b.color}15`, flexShrink: 0,
              }}>{b.icon}</div>
              <span style={{ fontSize: 14, color: T.text, lineHeight: 1.4, fontFamily: T.font }}>{b.text}</span>
            </div>
          ))}
        </div>
      )}

      {slide.vocab && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {slide.vocab.map((v, i) => (
            <div key={i} style={{
              padding: 16, background: T.glass, border: `1px solid ${T.border}`, borderRadius: 14,
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: c, marginBottom: 4, fontFamily: T.mono }}>{v.term}</div>
              <div style={{ fontSize: 13.5, color: T.text, lineHeight: 1.5, fontFamily: T.font }}>{v.def}</div>
              {v.example && <div style={{ marginTop: 6, fontSize: 12, color: T.textDim, fontFamily: T.mono }}>e.g. {v.example}</div>}
            </div>
          ))}
        </div>
      )}

      {slide.cards && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {slide.cards.map((cd, i) => (
            <div key={i} style={{
              padding: 16, background: `${cd.color}08`, border: `1px solid ${cd.color}20`, borderRadius: 14,
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: cd.color, marginBottom: 4, fontFamily: T.font }}>{cd.platform}</div>
              <div style={{ fontSize: 15, color: T.text, fontWeight: 600, marginBottom: 2, fontFamily: T.font }}>{cd.app}</div>
              <div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.mono }}>{cd.shortcut}</div>
            </div>
          ))}
        </div>
      )}

      {slide.checklist && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.checklist.map((cl, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              background: `${T.green}08`, border: `1px solid ${T.green}18`, borderRadius: 12,
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 8, background: `${T.green}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: T.green,
              }}>✓</div>
              <span style={{ fontSize: 15, color: T.text, fontFamily: T.font }}>{cl.item}</span>
            </div>
          ))}
        </div>
      )}

      {slide.flow && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
          {slide.flow.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 14, animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: `${c}20`, border: `2px solid ${c}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800, color: c, fontFamily: T.mono, flexShrink: 0,
                }}>{f.step}</div>
                {i < slide.flow.length - 1 && <div style={{ width: 2, flex: 1, background: `${c}20`, minHeight: 20 }} />}
              </div>
              <div style={{ padding: "4px 0 20px", fontSize: 14, color: T.text, lineHeight: 1.5, fontFamily: T.font }}>{f.text}</div>
            </div>
          ))}
        </div>
      )}

      {slide.footnote && (
        <p style={{
          marginTop: 14, fontSize: 13, color: T.textDim, lineHeight: 1.5, fontStyle: "italic", fontFamily: T.font,
          padding: "10px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10,
        }}>{slide.footnote}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */
export default function CodeClub() {
  const [view, setView] = useState("home"); // home | lesson | profile
  const [lesson, setLesson] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [done, setDone] = useState(new Set());
  const [xp, setXp] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [streak, setStreak] = useState(1);
  const scrollRef = useRef(null);

  // Load fonts
  useEffect(() => {
    if (!document.querySelector(`link[href="${FONT_LINK}"]`)) {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = FONT_LINK;
      document.head.appendChild(l);
    }
  }, []);

  // Splash timeout
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const openLesson = (l) => { setLesson(l); setSlideIdx(0); setView("lesson"); };
  const finishLesson = () => {
    if (lesson && !done.has(lesson.id)) {
      const n = new Set(done);
      n.add(lesson.id);
      setDone(n);
      setXp((x) => x + lesson.xp);
    }
    setView("home");
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  }, [slideIdx, view]);

  const totalXp = FLAT.reduce((s, l) => s + l.xp, 0);

  // SPLASH
  if (showSplash) {
    return (
      <div style={{
        height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: T.bg, fontFamily: T.font,
      }}>
        <style>{GLOBAL_CSS}</style>
        <div style={{
          width: 72, height: 72, borderRadius: 20, background: `${T.accent}15`, border: `1px solid ${T.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontFamily: T.mono, fontWeight: 800, color: T.accent,
          animation: "glow 2s ease-in-out infinite", marginBottom: 20,
        }}>▸_</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", marginBottom: 6 }}>Code Club</div>
        <div style={{ fontSize: 13, color: T.textDim, fontWeight: 400 }}>Learn Claude Code</div>
        <div style={{
          marginTop: 32, width: 120, height: 3, borderRadius: 2, overflow: "hidden", background: "rgba(255,255,255,0.06)",
        }}>
          <div style={{
            height: "100%", background: `linear-gradient(90deg, ${T.accent}, ${T.cyan})`,
            backgroundSize: "200% 100%", animation: "shimmer 1.5s linear infinite", width: "100%",
          }} />
        </div>
      </div>
    );
  }

  // LESSON VIEW
  if (view === "lesson" && lesson) {
    const slides = lesson.slides;
    const slide = slides[slideIdx];
    const isLast = slideIdx === slides.length - 1;

    return (
      <div ref={scrollRef} style={{
        height: "100vh", display: "flex", flexDirection: "column",
        background: T.bg, fontFamily: T.font, overflow: "hidden",
      }}>
        <style>{GLOBAL_CSS}</style>

        {/* Top bar */}
        <div style={{
          padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(6,8,13,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${T.border}`, flexShrink: 0, zIndex: 10,
        }}>
          <button onClick={() => setView("home")} style={{
            background: "none", border: "none", color: T.textMuted, fontSize: 14, cursor: "pointer",
            fontFamily: T.font, display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 18 }}>‹</span> Back
          </button>
          <div style={{
            fontSize: 11, color: T.textDim, fontFamily: T.mono, fontWeight: 500,
            background: "rgba(255,255,255,0.03)", padding: "4px 10px", borderRadius: 6,
          }}>
            {slideIdx + 1} / {slides.length}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: 3, padding: "8px 16px", flexShrink: 0 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              height: 3, flex: 1, borderRadius: 2, transition: "all 0.4s ease",
              background: i < slideIdx ? lesson.color : i === slideIdx ? `${lesson.color}` : "rgba(255,255,255,0.05)",
              opacity: i <= slideIdx ? 1 : 0.3,
            }} />
          ))}
        </div>

        {/* Slide title */}
        {slide.type !== "hero" && (
          <div style={{ padding: "16px 20px 4px", flexShrink: 0 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text, fontFamily: T.font, letterSpacing: "-0.01em" }}>
              {slide.title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: slide.type === "hero" ? "0" : "8px 20px 140px" }}>
          <Slide slide={slide} lessonColor={lesson.color} />
        </div>

        {/* Bottom actions */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "14px 16px", paddingBottom: "max(14px, env(safe-area-inset-bottom))",
          background: "rgba(6,8,13,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderTop: `1px solid ${T.border}`, display: "flex", gap: 10, zIndex: 10,
        }}>
          {slideIdx > 0 && (
            <button onClick={() => setSlideIdx(slideIdx - 1)} style={{
              width: 48, height: 48, borderRadius: 14, border: `1px solid ${T.border}`,
              background: T.glass, color: T.textMuted, fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.font, flexShrink: 0,
            }}>‹</button>
          )}
          <button onClick={() => isLast ? finishLesson() : setSlideIdx(slideIdx + 1)} style={{
            flex: 1, height: 48, borderRadius: 14, border: "none", cursor: "pointer",
            fontSize: 15, fontWeight: 700, fontFamily: T.font,
            background: isLast ? `linear-gradient(135deg, ${T.green}, #059669)` : lesson.color,
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            boxShadow: isLast ? `0 4px 20px ${T.greenGlow}` : `0 4px 20px ${lesson.color}30`,
            transition: "all 0.2s",
          }}>
            {isLast ? (
              <><span>Complete</span><span style={{ fontSize: 11, opacity: 0.8, fontFamily: T.mono }}>+{lesson.xp} XP</span></>
            ) : "Continue →"}
          </button>
        </div>
      </div>
    );
  }

  // PROFILE VIEW
  if (view === "profile") {
    const level = Math.floor(xp / 100) + 1;
    const levelProgress = (xp % 100);
    return (
      <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font, paddingBottom: 100 }}>
        <style>{GLOBAL_CSS}</style>
        <div style={{ padding: "48px 20px 24px", textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24, margin: "0 auto 16px",
            background: `linear-gradient(135deg, ${T.accent}20, ${T.purple}20)`,
            border: `2px solid ${T.accent}40`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
          }}>🧑‍💻</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: T.text, marginBottom: 4 }}>Jake</h1>
          <p style={{ fontSize: 14, color: T.textMuted }}>Code Club Member</p>
        </div>

        <div style={{ padding: "0 20px" }}>
          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { label: "Level", value: level, color: T.accent },
              { label: "Total XP", value: xp, color: T.green },
              { label: "Streak", value: `${streak}🔥`, color: T.orange },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "16px 10px", borderRadius: 14, background: `${s.color}08`,
                border: `1px solid ${s.color}18`, textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: T.mono }}>{s.value}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* XP to next level */}
          <div style={{ padding: 16, background: T.glass, border: `1px solid ${T.border}`, borderRadius: 14, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: T.textMuted }}>Level {level}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>Level {level + 1}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3, transition: "width 0.5s ease",
                background: `linear-gradient(90deg, ${T.accent}, ${T.cyan})`,
                width: `${levelProgress}%`,
              }} />
            </div>
            <div style={{ fontSize: 12, color: T.textDim, marginTop: 6, textAlign: "center", fontFamily: T.mono }}>
              {100 - levelProgress} XP to next level
            </div>
          </div>

          {/* Completed lessons */}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: T.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            Completed ({done.size}/{FLAT.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FLAT.map((l) => (
              <div key={l.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                background: done.has(l.id) ? `${T.green}08` : T.glass,
                border: `1px solid ${done.has(l.id) ? `${T.green}18` : T.border}`,
                borderRadius: 12, opacity: done.has(l.id) ? 1 : 0.4,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontFamily: T.mono, fontWeight: 700, color: done.has(l.id) ? T.green : T.textDim,
                  background: done.has(l.id) ? `${T.green}15` : "rgba(255,255,255,0.04)",
                }}>{done.has(l.id) ? "✓" : l.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{l.title}</div>
                  <div style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono }}>+{l.xp} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNav view={view} setView={setView} />
      </div>
    );
  }

  // HOME VIEW
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font, paddingBottom: 100 }}>
      <style>{GLOBAL_CSS}</style>

      {/* Header */}
      <div style={{
        padding: "44px 20px 20px",
        background: `linear-gradient(180deg, ${T.accent}08 0%, transparent 100%)`,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.accent, letterSpacing: 2, textTransform: "uppercase", fontFamily: T.mono, marginBottom: 6 }}>
              Code Club
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Learn Claude Code
            </h1>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
            background: `${T.orange}12`, border: `1px solid ${T.orange}25`, borderRadius: 20,
          }}>
            <span style={{ fontSize: 14 }}>🔥</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.orange, fontFamily: T.mono }}>{streak}</span>
          </div>
        </div>

        {/* XP Bar */}
        <div style={{
          padding: 14, background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 14, backdropFilter: "blur(8px)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: T.textMuted }}>Progress</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.accent, fontFamily: T.mono }}>{xp} / {totalXp} XP</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 3, transition: "width 0.6s ease",
              background: `linear-gradient(90deg, ${T.accent}, ${T.green})`,
              width: `${totalXp > 0 ? (xp / totalXp) * 100 : 0}%`,
            }} />
          </div>
          <div style={{ fontSize: 12, color: T.textDim, marginTop: 6, fontFamily: T.mono }}>
            {done.size}/{FLAT.length} lessons complete
          </div>
        </div>
      </div>

      {/* Modules */}
      <div style={{ padding: "8px 20px 20px" }}>
        {MODULES.map((mod, mi) => {
          const modDone = mod.lessons.filter((l) => done.has(l.id)).length;
          const modTotal = mod.lessons.length;
          return (
            <div key={mod.id} style={{ marginBottom: 28, animation: `fadeUp 0.5s ease ${mi * 0.1}s both` }}>
              {/* Module header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "0 2px",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontFamily: T.mono, fontWeight: 800, color: mod.color,
                  background: `${mod.color}12`, border: `1px solid ${mod.color}25`,
                }}>
                  {mod.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: T.mono }}>
                    Module {mod.num} · {modDone}/{modTotal}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: T.text }}>{mod.title}</div>
                </div>
              </div>

              {/* Lessons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {mod.lessons.map((les, li) => {
                  const isDone = done.has(les.id);
                  return (
                    <button key={les.id} onClick={() => openLesson(les)} style={{
                      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%",
                      background: isDone ? `${T.green}06` : T.card,
                      border: `1px solid ${isDone ? `${T.green}15` : T.border}`,
                      borderRadius: 14, cursor: "pointer", textAlign: "left",
                      transition: "all 0.2s", fontFamily: T.font,
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: isDone ? 16 : 18, fontFamily: T.mono, fontWeight: 700,
                        background: isDone ? `${T.green}15` : `${les.color}12`,
                        color: isDone ? T.green : les.color,
                        border: `1px solid ${isDone ? `${T.green}30` : `${les.color}25`}`,
                        flexShrink: 0,
                      }}>
                        {isDone ? "✓" : les.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 2 }}>{les.title}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 12, color: T.textDim, fontFamily: T.mono }}>+{les.xp} XP</span>
                          <span style={{ fontSize: 12, color: T.textDim }}>·</span>
                          <span style={{ fontSize: 12, color: T.textDim }}>{les.slides.length} slides</span>
                        </div>
                      </div>
                      <div style={{ color: T.textDim, fontSize: 16, flexShrink: 0 }}>›</div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* PWA Install Hint */}
      <div style={{
        margin: "0 20px 20px", padding: 16,
        background: `${T.accent}06`, border: `1px solid ${T.accent}15`, borderRadius: 14, textAlign: "center",
      }}>
        <div style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>
          📱 <strong style={{ color: T.text }}>Add to Home Screen</strong>
          <br />
          <span style={{ color: T.textDim }}>Share → Add to Home Screen in Safari</span>
        </div>
      </div>

      <BottomNav view={view} setView={setView} />
    </div>
  );
}

function BottomNav({ view, setView }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(6,8,13,0.95)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      borderTop: `1px solid ${T.border}`,
      paddingBottom: "max(8px, env(safe-area-inset-bottom))",
    }}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
        {[
          { id: "home", icon: "◆", label: "Learn" },
          { id: "profile", icon: "◎", label: "Profile" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setView(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: view === tab.id ? T.accent : T.textDim,
            fontSize: 10, fontWeight: 600, fontFamily: T.font,
            position: "relative", padding: "4px 16px", transition: "color 0.2s",
          }}>
            {view === tab.id && (
              <div style={{
                position: "absolute", top: -4, width: 20, height: 3,
                background: T.accent, borderRadius: 2,
              }} />
            )}
            <span style={{ fontSize: 20, fontFamily: T.mono }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

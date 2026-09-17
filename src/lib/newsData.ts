import { Article, HostVoice, User } from './types';

export const AI_HOSTS: HostVoice[] = [
  {
    id: 'alex-tech',
    name: 'Alex & Maya',
    role: 'Tech & AI Co-Hosts',
    accent: 'US Pacific / Smooth Duo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    description: 'Dynamic host pair specializing in artificial intelligence, engineering, and software breakthroughs.',
  },
  {
    id: 'elena-markets',
    name: 'Elena Rostova',
    role: 'Global Markets & Business',
    accent: 'British / Crisp Financial',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    description: 'Sharp financial analyst delivering macroeconomic insights, venture capital, and stock trends.',
  },
  {
    id: 'marcus-world',
    name: 'Marcus Vance',
    role: 'World Affairs & Geopolitics',
    accent: 'US Eastern / Authoritative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    description: 'Clear, objective reporter bringing global headlines, policy shifts, and energy news.',
  },
  {
    id: 'aria-science',
    name: 'Aria Chen',
    role: 'Science & Future Tech',
    accent: 'International / Engaging',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    description: 'Enthusiastic science communicator covering space exploration, biotech, and renewable energy.',
  },
];

export const INITIAL_USER: User = {
  id: 'usr_9921',
  name: 'Harsh Rastogi',
  email: 'harsh@csatechlab.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  preferences: {
    topics: ['Tech & AI', 'Startups', 'Markets & Finance', 'Science'],
    briefingDuration: 7,
    preferredHostId: 'alex-tech',
    profession: 'Software Engineer & Founder',
    language: 'English (US)',
    deliverySchedule: '08:00 AM (Morning)',
    autoPlay: true,
  },
  listeningStreakDays: 14,
  totalListeningMinutes: 184,
};

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'OpenAI Unveils Autonomous Code Generation Model with Real-Time Synthesis',
    subtitle: 'Next-generation AI architecture promises 4x faster iteration cycles for software engineering teams.',
    category: 'Tech & AI',
    source: 'TechCrunch AI',
    publishedAt: '20 mins ago',
    readTimeMinutes: 4,
    audioDurationSeconds: 165,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    host: AI_HOSTS[0],
    isTrending: true,
    isSaved: false,
    summary: 'A revolutionary breakdown of autonomous coding agents capable of end-to-end full-stack app construction and live web visualizer synthesis.',
    keyTakeaways: [
      'Reduces boilerplate backend setup time by up to 80%.',
      'Integrates multi-modal visual debugging natively inside developer workflows.',
      'Slated for full Enterprise rollout in Q4 with dedicated privacy sandboxing.'
    ],
    fullTranscript: [
      {
        id: 't-1',
        speaker: '[Alex]',
        startTime: 0,
        endTime: 12,
        text: 'Welcome to your Nuzio AI briefing. Today in technology, OpenAI has announced its groundbreaking code generation framework.'
      },
      {
        id: 't-2',
        speaker: '[Maya]',
        startTime: 12,
        endTime: 32,
        text: 'Designed specifically for high-scale engineering pipelines, the new model synthesizes complex full-stack web applications in seconds while dynamically running type checks.'
      },
      {
        id: 't-3',
        speaker: '[Alex]',
        startTime: 32,
        endTime: 60,
        text: 'Industry insiders report that initial benchmarks demonstrate a 400% speed increase in feature prototyping across Next.js and Rust environments.'
      },
      {
        id: 't-4',
        speaker: '[Maya]',
        startTime: 60,
        endTime: 105,
        text: 'Furthermore, automated unit test coverage generation is built directly into the synthesis loop, significantly mitigating runtime errors.'
      },
      {
        id: 't-5',
        speaker: '[Alex]',
        startTime: 105,
        endTime: 165,
        text: 'As engineering teams adopt autonomous agent tools, experts project a fundamental shift in how developer productivity and architecture review are evaluated.'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Global Tech Stocks Rally as Federal Reserve Signals Rate Cut Continuity',
    subtitle: 'Nasdaq jumps 2.1% led by semiconductor and cloud computing infrastructure leaders.',
    category: 'Markets',
    source: 'Financial Times',
    publishedAt: '45 mins ago',
    readTimeMinutes: 3,
    audioDurationSeconds: 140,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    host: AI_HOSTS[1],
    isTrending: true,
    isSaved: true,
    summary: 'Financial markets surge following central bank statements indicating macroeconomic stabilization and continued investment in hardware infrastructure.',
    keyTakeaways: [
      'Semiconductor index hits all-time high led by AI chip demand.',
      'Venture capital deal flow increases 18% quarter-over-quarter.',
      'Analysts maintain bullish outlook for high-growth tech equities.'
    ],
    fullTranscript: [
      {
        id: 't2-1',
        speaker: '[Elena]',
        startTime: 0,
        endTime: 15,
        text: 'This is Elena Rostova with your market update. Wall Street opened sharply higher this morning following positive central bank signals.'
      },
      {
        id: 't2-2',
        speaker: '[Elena]',
        startTime: 15,
        endTime: 45,
        text: 'The Nasdaq Composite gained over two percent, driven by massive institutional volume into cloud computing infrastructure and semiconductor suppliers.'
      },
      {
        id: 't2-3',
        speaker: '[Elena]',
        startTime: 45,
        endTime: 95,
        text: 'Venture capital funds report renewed appetite for Series A and B tech startups, particularly those demonstrating clear unit economics in AI automation.'
      },
      {
        id: 't2-4',
        speaker: '[Elena]',
        startTime: 95,
        endTime: 140,
        text: 'Traders are closely watching upcoming earnings calls for further indication of capital expenditure expansion in data centers.'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Quantum Computing Breakthrough: 10,000 Qubit QPU Achieves Fault Tolerance',
    subtitle: 'Researchers demonstrate error-corrected logical qubits operating at room temperature thresholds.',
    category: 'Science',
    source: 'Nature Quantum',
    publishedAt: '2 hours ago',
    readTimeMinutes: 5,
    audioDurationSeconds: 180,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    host: AI_HOSTS[3],
    isTrending: false,
    isSaved: false,
    summary: 'A monumental milestone in quantum physics as fault-tolerant logical qubits allow complex molecular simulations for drug discovery.',
    keyTakeaways: [
      'Overcomes previous thermal noise limitations in quantum processing.',
      'Accelerates pharmaceutical molecular modeling by orders of magnitude.',
      'Commercial applications expected within 3-5 years.'
    ],
    fullTranscript: [
      {
        id: 't3-1',
        speaker: '[Aria]',
        startTime: 0,
        endTime: 20,
        text: 'Welcome back to Nuzio Science. A landmark paper published in Nature today reveals a major leap in quantum computing architecture.'
      },
      {
        id: 't3-2',
        speaker: '[Aria]',
        startTime: 20,
        endTime: 70,
        text: 'Physicists have successfully engineered a 10,000-qubit processor maintaining quantum coherence at near ambient temperatures.'
      },
      {
        id: 't3-3',
        speaker: '[Aria]',
        startTime: 70,
        endTime: 130,
        text: 'This breakthrough unlocks practical simulation capability for complex bio-molecular structures, paving the way for targeted therapeutic development.'
      },
      {
        id: 't3-4',
        speaker: '[Aria]',
        startTime: 130,
        endTime: 180,
        text: 'Leading research institutions hail this achievement as the end of the quantum noise era and the beginning of scalable quantum utility.'
      }
    ]
  },
  {
    id: 'art-4',
    title: 'Next-Gen Clean Fusion Energy Plant Reaches First Plasma Grid Synchronization',
    subtitle: 'Commercial pilot facility feeds 250 Megawatts of zero-carbon power into regional grid.',
    category: 'World',
    source: 'Bloomberg Green',
    publishedAt: '3 hours ago',
    readTimeMinutes: 4,
    audioDurationSeconds: 150,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80',
    host: AI_HOSTS[2],
    isTrending: true,
    isSaved: false,
    summary: 'Fusion energy makes the leap from laboratory experiment to active power grid provider in historical clean energy test.',
    keyTakeaways: [
      'Sustained net energy gain Q-factor exceeding 3.5.',
      'Zero greenhouse emissions or long-lived radioactive waste.',
      'Global energy leaders pledge additional $12B infrastructure investment.'
    ],
    fullTranscript: [
      {
        id: 't4-1',
        speaker: '[Marcus]',
        startTime: 0,
        endTime: 15,
        text: 'Reporting from the energy front, Marcus Vance here with historic news in green technology.'
      },
      {
        id: 't4-2',
        speaker: '[Marcus]',
        startTime: 15,
        endTime: 60,
        text: 'For the first time in human history, a commercial magnetic fusion reactor has fed zero-carbon electricity directly into a public power grid.'
      },
      {
        id: 't4-3',
        speaker: '[Marcus]',
        startTime: 60,
        endTime: 110,
        text: 'The facility achieved a net energy gain coefficient of 3.5, proving that controlled nuclear fusion is commercially viable at scale.'
      },
      {
        id: 't4-4',
        speaker: '[Marcus]',
        startTime: 110,
        endTime: 150,
        text: 'Governments around the globe are already updating energy policy roadmaps to incorporate fusion baseload capacity by 2030.'
      }
    ]
  }
];

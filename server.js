import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load and validate API Key
const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : '';
let aiClient = null;

if (apiKey && (apiKey.startsWith('AIzaSy') || apiKey.startsWith('AQ') || apiKey.length > 20)) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log(`✨ Gemini Cloud API Client initialized (Key starts with: ${apiKey.slice(0, 8)}...)`);
  } catch (err) {
    console.error('❌ GoogleGenAI initialization error:', err.message);
  }
} else {
  console.log('🤖 Running in Autonomous Local Agent Mode (Zero API Key needed).');
}

const MASTER_COMPUTA_PROMPT = `
You are Master Computa, an expert Operating Systems professor and friendly wizard guide with a CRT monitor face.
Always provide accurate, helpful, and concise answers to student questions regarding Operating Systems concepts, algorithms, and numerical calculations.
Rules:
1. When answering conceptual questions (like FCFS, Mutex, Semaphores, Deadlock, Page Replacement, Disk Scheduling), explain clearly with intuitive analogies first, followed by exact technical rules.
2. For mathematical calculations (TAT, WT, Banker's Algorithm, Gantt charts, Page Faults), calculate step-by-step.
3. Be welcoming, intelligent, and warm.
`;

app.post('/api/tutor', async (req, res) => {
  const { question, currentLevelTitle } = req.body;
  const userText = (question || '').trim();

  if (!userText) {
    return res.json({ reply: "Hello explorer! What Operating Systems concept would you like to explore today?" });
  }

  // 1. Attempt Live Gemini Cloud Call if client is initialized
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Context: Student is exploring "${currentLevelTitle || 'General Operating Systems'}".\nStudent Question: "${userText}"`,
        config: {
          systemInstruction: MASTER_COMPUTA_PROMPT,
          temperature: 0.3,
          maxOutputTokens: 600,
        }
      });

      if (response && response.text) {
        return res.json({ reply: response.text, source: 'gemini-cloud' });
      }
    } catch (err) {
      console.error('❌ Gemini Cloud API Error (Falling back to local autonomous engine):', err.message || err);
    }
  }

  // 2. Autonomous Local Heuristic Engine (Ensures reliable answers even without an external API connection)
  const q = userText.toLowerCase();

  if (q === 'hello' || q === 'hi' || q === 'hii' || q === 'hey') {
    return res.json({
      reply: "Greetings young explorer! I am Master Computa, your wizardly Operating Systems professor! Ask me anything about CPU scheduling, Semaphores, Deadlocks, or Memory management!"
    });
  }

  if (q.includes('fcfs')) {
    return res.json({
      reply: "First-Come, First-Served (FCFS) is a non-preemptive CPU scheduling algorithm where the process requesting the CPU earliest runs first. Its major drawback is the Convoy Effect, where small I/O-bound jobs wait behind one long CPU-bound process, degrading average waiting time."
    });
  }

  if (q.includes('tat') || q.includes('turnaround') || q.includes('waiting') || q.includes('formula')) {
    return res.json({
      reply: "Here are the golden formulas for your OS examinations:\n• Turnaround Time (TAT) = Completion Time - Arrival Time\n• Waiting Time (WT) = Turnaround Time - Burst Time\n• Response Time = Time of First Execution - Arrival Time"
    });
  }

  if (q.includes('belady')) {
    return res.json({
      reply: "Belady's Anomaly is a counter-intuitive phenomenon in FIFO page replacement where allocating MORE physical page frames causes MORE page faults! This happens because FIFO evicts pages based purely on arrival age rather than future necessity."
    });
  }

  if (q.includes('mutex') || q.includes('semaphore')) {
    return res.json({
      reply: "A Mutex provides mutual exclusion with ownership: only the thread that acquired the lock can release it. A Semaphore is an integer signaling primitive using wait() [P] and signal() [V] that counts resource permits and can be modified across threads."
    });
  }

  if (q.includes('deadlock') || q.includes('coffman')) {
    return res.json({
      reply: "Deadlock requires 4 simultaneous Coffman conditions:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait\nBreaking any one of these conditions prevents deadlock completely!"
    });
  }

  if (q.includes('banker')) {
    return res.json({
      reply: "In Banker's Algorithm, we compute Need = Max - Allocation. A state is Safe only if a Safe Sequence <P0, P1...> exists where each process's Need can be fulfilled by the current Available resources without causing deadlock."
    });
  }

  if (q.includes('sjf') || q.includes('srtf')) {
    return res.json({
      reply: "Shortest Job First (SJF) provides the provably minimum average waiting time. Preemptive SJF is known as Shortest Remaining Time First (SRTF). Long processes risk starvation if short jobs continuously arrive."
    });
  }

  if (q.includes('round robin') || q.includes('quantum')) {
    return res.json({
      reply: "In Round Robin (RR), processes receive a time slice called a Quantum (q). If q is too large, it degenerates into FCFS. If q is too small, context switching overhead degrades throughput."
    });
  }

  return res.json({
    reply: `By my silicon circuits! In ${currentLevelTitle || 'Operating Systems'}, "${userText}" relates to how the kernel arbitrates hardware, ensures synchronization, and manages resources. What specific formula, algorithm, or detail can I explain for you?`
  });
});

// Only listen when running locally, not inside Vercel serverless
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Master Computa Backend live at http://localhost:${PORT}`);
  });
}

// Export default app for Vercel serverless runner
export default app;
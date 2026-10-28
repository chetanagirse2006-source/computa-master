import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Root route fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Tutor API endpoint
app.post('/api/tutor', (req, res) => {
  const { question, currentLevelTitle } = req.body;
  const userText = (question || '').trim();

  if (!userText) {
    return res.json({ reply: "Hello explorer! What Operating Systems concept would you like to explore today?" });
  }

  const q = userText.toLowerCase();

  if (q === 'hello' || q === 'hi' || q === 'hii' || q === 'hey') {
    return res.json({
      reply: "Greetings young explorer! I am Master Computa, your wizardly Operating Systems professor! Ask me anything about CPU scheduling, Semaphores, Deadlocks, or Memory management!"
    });
  }

  if (q.includes('fcfs')) {
    return res.json({
      reply: "First-Come, First-Served (FCFS) is a non-preemptive CPU scheduling algorithm where the process requesting the CPU first is allocated first. Its main drawback is the Convoy Effect, where short jobs wait behind one large CPU-bound process."
    });
  }

  if (q.includes('tat') || q.includes('turnaround') || q.includes('waiting') || q.includes('formula')) {
    return res.json({
      reply: "Formulas for your OS exam:\n• Turnaround Time (TAT) = Completion Time - Arrival Time\n• Waiting Time (WT) = Turnaround Time - Burst Time\n• Response Time = First CPU Allocation Time - Arrival Time"
    });
  }

  if (q.includes('belady')) {
    return res.json({
      reply: "Belady's Anomaly is a phenomenon in FIFO page replacement where giving the computer MORE page frames unexpectedly causes MORE page faults! That's because FIFO only cares about arrival age, not future necessity."
    });
  }

  if (q.includes('mutex') || q.includes('semaphore')) {
    return res.json({
      reply: "A Mutex provides mutual exclusion with ownership (only the thread holding the lock can release it). A Semaphore is a signaling tool using wait() and signal() that tracks available resource permits across threads!"
    });
  }

  if (q.includes('deadlock') || q.includes('coffman')) {
    return res.json({
      reply: "Deadlock requires 4 simultaneous Coffman conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait. Breaking any one condition prevents deadlock completely!"
    });
  }

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

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

app.post('/api/tutor', (req, res) => {
  const { question, currentLevelTitle } = req.body || {};
  const userText = (question || '').trim();

  if (!userText) {
    return res.json({ reply: "Hello explorer! What Operating Systems concept would you like to explore today?" });
  }

  const q = userText.toLowerCase();

  if (q === 'hello' || q === 'hi' || q === 'hii' || q === 'hey') {
    return res.json({
      reply: "Greetings young explorer! I am Master Computa, your wizardly Operating Systems professor! Ask me anything about CPU scheduling, Semaphores, Deadlocks, or Memory management!"
    });
  }

  if (q.includes('fcfs')) {
    return res.json({
      reply: "First-Come, First-Served (FCFS) is a non-preemptive CPU scheduling algorithm where the process requesting the CPU first is allocated first. Its main drawback is the Convoy Effect, where short jobs wait behind one large CPU-bound process."
    });
  }

  if (q.includes('tat') || q.includes('turnaround') || q.includes('waiting') || q.includes('formula')) {
    return res.json({
      reply: "Formulas for your OS exam:\n• Turnaround Time (TAT) = Completion Time - Arrival Time\n• Waiting Time (WT) = Turnaround Time - Burst Time\n• Response Time = First CPU Allocation Time - Arrival Time"
    });
  }

  if (q.includes('belady')) {
    return res.json({
      reply: "Belady's Anomaly is a phenomenon in FIFO page replacement where giving the computer MORE page frames unexpectedly causes MORE page faults! That's because FIFO only cares about arrival age, not future necessity."
    });
  }

  if (q.includes('mutex') || q.includes('semaphore')) {
    return res.json({
      reply: "A Mutex provides mutual exclusion with ownership (only the thread holding the lock can release it). A Semaphore is a signaling tool using wait() and signal() that tracks available resource permits across threads!"
    });
  }

  if (q.includes('deadlock') || q.includes('coffman')) {
    return res.json({
      reply: "Deadlock requires 4 simultaneous Coffman conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait. Breaking any one condition prevents deadlock completely!"
    });
  }

  if (q.includes('banker')) {
    return res.json({
      reply: "In Banker's Algorithm, Need = Max - Allocation. A state is Safe only if there is a Safe Sequence <P0, P1...> where each process's Need can be fulfilled by Available resources!"
    });
  }

  return res.json({
    reply: `By my silicon circuits! In ${currentLevelTitle || 'Operating Systems'}, "${userText}" relates to how the kernel arbitrates hardware and manages resources. What specific formula, algorithm, or detail can I explain for you?`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Master Computa live at http://localhost:${PORT}`);
});
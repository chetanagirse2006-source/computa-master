  export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
}
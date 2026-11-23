/**
 * Find Me If You Can — Fictional Developer Blog Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openBlog() {
  const POSTS = [
    {
      id: 'post_1',
      title: 'The Architecture of PhantomOS: Beyond Traditional Abstraction',
      date: 'September 12, 2024',
      author: 'Dr. Elena Vance, Systems Architect',
      content: `
        <p>When we set out to build PhantomOS, we rejected the premise that an operating system should be an opaque black box. In conventional systems, the user is kept at arm's length from the hardware state, insulated behind layers of virtual memory and sandbox boundaries.</p>
        <p>In our model, every subsystem communicates through observable registers. A developer sitting at this terminal does not merely use the operating system; they are part of its runtime feedback loop.</p>
        <p>If you observe strange timing drifts in the clock or unexplained anomalies in the device tree, remember: this system was built to respond to inquisitive minds.</p>
      `
    },
    {
      id: 'post_2',
      title: 'Strange Telemetry: Memory Leaks in Driver 0x9F',
      date: 'October 3, 2024',
      author: 'Marcus Holloway, Kernel Engineering',
      content: `
        <p>During stress testing on the quantum interconnect simulator, we observed unusual behavior originating from Device 0x9F (listed in the hardware tree as Unknown Quantum Bridge #04).</p>
        <p>Rather than responding to standard I/O requests, the device began writing harmonic frequencies directly into virtual memory blocks. When the kernel attempted to throttle the connection, the driver entered an anomaly state.</p>
        <p>Until a patch is issued, engineers are advised to inspect the Device Manager and manually cycle the driver interface if instability is detected.</p>
      `
    },
    {
      id: 'post_3',
      title: 'The Vault of Resonance: An Architect\'s Field Journal',
      date: 'October 19, 2024',
      author: 'Dr. Elena Vance, Systems Architect',
      content: `
        <p>Late last night, the simulation kernel reached harmonic stability. In the depths of the root filesystem, we sealed the historical records inside <code>/.archive</code>.</p>
        <p>For those searching for the lost sequence, listen closely: truth is not found in brute force, but in the harmony between all parts of the machine. When the ten broken configuration files are repaired, the core awakens.</p>
        <p>Herein lies the silent whisper of the machine: <span class="blog-hidden-clue" id="blog-secret-trigger" title="Inspect subterranean transmission">[0x409_SUBLIMINAL_RESONANCE_DETECTED — Click to decode]</span>.</p>
      `
    },
    {
      id: 'post_4',
      title: 'Incident 404 and the Suspended Daemon',
      date: 'November 2, 2024',
      author: 'Security Incident Response Team',
      content: `
        <p>At 04:04 UTC, the autonomous dispatch process (PID 404, orion-daemon.exe) severed its link to the primary user desktop. The shortcut was broken, and the process entered a dormant hibernation state.</p>
        <p>The system monitor continues to register PID 404 in the process table, but standard scheduling interrupts fail to awaken it. Only direct signal probing or terminal intervention will reveal its final state.</p>
      `
    },
    {
      id: 'post_5',
      title: 'The Ten Pillars: Maintaining Filesystem Parity',
      date: 'November 18, 2024',
      author: 'Infrastructure Review Board',
      content: `
        <p>A recent integrity scan revealed bitrot across ten critical system files. Misspelled library directories, unclosed manifest tags, broken import statements, and malformed environment variables are preventing the kernel from achieving full Architect clearance.</p>
        <p>Run <code>chkfs</code> in your terminal frequently. When all ten anomalies are rectified in the Code Editor, the system integrity will reconverge.</p>
      `
    }
  ];

  let activePost = POSTS[0];

  const win = new OSWindow({
    title: 'Kernel Musings — PhantomOS Developer Blog',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#bc8cff"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    width: 780,
    height: 500
  });

  const render = () => {
    win.setContent(`
      <div class="blog-container">
        <div class="blog-sidebar">
          <div class="blog-sidebar-header">Articles & Dispatches</div>
          ${POSTS.map(p => `
            <div class="blog-post-tab ${p.id === activePost.id ? 'active' : ''}" data-id="${p.id}">
              <div class="blog-tab-title">${p.title}</div>
              <div class="blog-tab-date">${p.date}</div>
            </div>
          `).join('')}
        </div>
        <div class="blog-viewer">
          <div class="blog-title">${activePost.title}</div>
          <div class="blog-meta">By ${activePost.author} • Published on ${activePost.date}</div>
          <div class="blog-body">${activePost.content}</div>
        </div>
      </div>
    `);

    // Tab switching
    win.contentElement.querySelectorAll('.blog-post-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        audio.playClick();
        const found = POSTS.find(p => p.id === tab.dataset.id);
        if (found) {
          activePost = found;
          render();
        }
      });
    });

    // Secret 03: Hidden clickable clue inside Post 3
    const secretTrigger = win.contentElement.querySelector('#blog-secret-trigger');
    if (secretTrigger) {
      secretTrigger.addEventListener('click', () => {
        audio.playClick();
        secretTrigger.textContent = '[DECODED: Secret 03 Verified — Subliminal Handshake Established]';
        secretTrigger.style.color = 'var(--status-purple)';
        events.emit('secret:trigger-attempt', { id: 'secret_03', source: 'blog_subliminal_transmission' });
      });
    }
  };

  render();
  return win;
}

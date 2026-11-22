import { OSWindow } from '../wm/window.js';
import { vfs } from '../core/vfs.js';
import { state } from '../core/state.js';
import { events } from '../core/events.js';

export function openTerminal() {
  let cwd = '/home/desktop';
  let history = [];
  let historyIdx = 0;

  const win = new OSWindow({
    title: 'Terminal — v4.0.9',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#3fb950"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.4-1.4 3.6-3.6-3.6-3.6L7.5 7l5 5-5 5z"/></svg>`,
    width: 620,
    height: 400
  });

  win.setContent(`
    <div class="terminal-container">
      <div class="terminal-output">
        <div class="terminal-line term-info">PhantomOS Interactive Shell [v4.0.9-LTS]</div>
        <div class="terminal-line term-info">Type '<span class="term-suc">help</span>' or '<span class="term-suc">chkfs</span>' for commands.</div>
        <div class="terminal-line" style="margin-bottom: 6px;"></div>
      </div>
      <div class="terminal-prompt-row">
        <span class="terminal-prompt-symbol">phantom@workstation:${cwd}$</span>
        <input type="text" class="terminal-input" autofocus autocomplete="off" spellcheck="false">
      </div>
    </div>
  `);

  const container = win.contentElement.querySelector('.terminal-container');
  const output = win.contentElement.querySelector('.terminal-output');
  const input = win.contentElement.querySelector('.terminal-input');
  const promptSymbol = win.contentElement.querySelector('.terminal-prompt-symbol');

  const iconEl = win.element.querySelector('.window-icon');
  if (iconEl) {
    iconEl.style.cursor = 'pointer';
    iconEl.title = 'Kernel Socket (Click to probe)';
    iconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      events.emit('secret:trigger-attempt', { id: 'secret_02', source: 'terminal_icon' });
      printLine('KERNEL PROBE: Alternate shell debug channel identified.', 'term-purple');
    });
  }

  const printLine = (text, className = '') => {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    output.appendChild(line);
    container.scrollTop = container.scrollHeight;
  };

  const updatePrompt = () => {
    promptSymbol.textContent = `phantom@workstation:${cwd}$`;
  };

  const executeCommand = async (cmdLine) => {
    const raw = cmdLine.trim();
    if (!raw) return;

    printLine(`phantom@workstation:${cwd}$ ${raw}`, 'term-cmd');
    history.push(raw);
    historyIdx = history.length;

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':
        printLine(`Commands:
  ls [path]       - List directory contents
  cd [path]       - Change directory
  pwd             - Print working directory
  cat [file]      - Print file content
  edit [file]     - Open in Code Editor
  mkdir [dir]     - Create directory
  rm [path]       - Remove file or directory
  mv [src] [dst]  - Rename or move file
  chkfs           - Scan virtual filesystem
  ps              - List processes
  kill [pid]      - Signal process
  defrag          - Inode maintenance utility
  orion-probe     - Subsystem diagnostic
  devmode         - Developer mode flag (--unlock)
  secret / status - View discovery status
  version         - Kernel release info
  whoami          - Current username
  clear           - Clear terminal`, 'term-info');
        break;

      case 'clear':
        output.innerHTML = '';
        break;

      case 'pwd':
        printLine(cwd);
        break;

      case 'whoami':
        printLine(state.username || 'developer');
        break;

      case 'version':
      case 'uname':
        printLine('PhantomOS 4.0.9-LTS 20261124-KERNEL-ORION x86_64');
        break;

      case 'cd': {
        const target = args[0] || '/home/desktop';
        let resolved = target.startsWith('/') ? target : `${cwd}/${target}`;
        resolved = vfs.normalize(resolved);
        const exists = await vfs.exists(resolved);
        if (exists || resolved === '/') {
          cwd = resolved;
          updatePrompt();
          if (cwd === '/.archive' || cwd === '/sys/.vault') {
            events.emit('secret:trigger-attempt', { id: 'secret_09', source: 'terminal_cd' });
          }
        } else {
          printLine(`cd: no such file or directory: ${target}`, 'term-err');
        }
        break;
      }

      case 'ls': {
        let targetDir = cwd;
        if (args[0] && !args[0].startsWith('-')) {
          targetDir = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
        } else if (args[1]) {
          targetDir = args[1].startsWith('/') ? args[1] : `${cwd}/${args[1]}`;
        }
        targetDir = vfs.normalize(targetDir);

        try {
          const items = await vfs.readDir(targetDir);
          if (items.length === 0) {
            printLine('(empty directory)', 'term-muted');
          } else {
            const listStr = items.map(item => {
              if (item.isDirectory) {
                return `<span style="color:#58a6ff; font-weight:600;">${item.name}/</span>`;
              }
              return item.name;
            }).join('   ');
            printLine(listStr);
          }
        } catch (err) {
          printLine(`ls: cannot access '${targetDir}': ${err.message}`, 'term-err');
        }
        break;
      }

      case 'cat': {
        if (!args[0]) {
          printLine('Usage: cat [filename]', 'term-warn');
          break;
        }
        const filePath = vfs.normalize(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`);
        try {
          const content = await vfs.readFile(filePath);
          printLine(content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        } catch (err) {
          printLine(`cat: ${args[0]}: No such file`, 'term-err');
        }
        break;
      }

      case 'edit': {
        if (!args[0]) {
          printLine('Usage: edit [filename]', 'term-warn');
          break;
        }
        const filePath = vfs.normalize(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`);
        events.emit('app:open-editor', filePath);
        printLine(`Opening ${filePath} in Code Editor...`, 'term-suc');
        break;
      }

      case 'mkdir': {
        if (!args[0]) {
          printLine('Usage: mkdir [dirname]', 'term-warn');
          break;
        }
        const dirPath = vfs.normalize(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`);
        await vfs.writeFile(dirPath, '', { isDirectory: true });
        printLine(`Directory created: ${dirPath}`, 'term-suc');
        break;
      }

      case 'rm': {
        if (!args[0]) {
          printLine('Usage: rm [path]', 'term-warn');
          break;
        }
        const targetPath = vfs.normalize(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`);
        await vfs.delete(targetPath);
        printLine(`Removed ${targetPath}`, 'term-suc');
        break;
      }

      case 'mv': {
        if (args.length < 2) {
          printLine('Usage: mv [source] [destination]', 'term-warn');
          break;
        }
        const src = vfs.normalize(args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`);
        const dst = vfs.normalize(args[1].startsWith('/') ? args[1] : `${cwd}/${args[1]}`);
        await vfs.rename(src, dst);
        printLine(`Renamed ${src} -> ${dst}`, 'term-suc');
        break;
      }

      case 'chkfs': {
        printLine('Scanning virtual partition sectors for anomalies...', 'term-info');
        let issuesFound = 0;

        if (!(await vfs.exists('/system/libraries/libcore.dll'))) {
          printLine('[ANOMALY] Typo in system library folder: /system/librares/libcore.dll', 'term-warn');
          issuesFound++;
        }
        try {
          const env = await vfs.readFile('/etc/sysconfig.env');
          if (env.includes('999999') || env.includes('nulll')) {
            printLine('[ANOMALY] Invalid environment variables in /etc/sysconfig.env', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const js = await vfs.readFile('/etc/services.json');
          JSON.parse(js);
        } catch (_) {
          printLine('[ANOMALY] JSON syntax error in /etc/services.json', 'term-warn');
          issuesFound++;
        }
        try {
          const py = await vfs.readFile('/scripts/backup.py');
          if (py.includes('bacukp_path')) {
            printLine('[ANOMALY] Undefined variable in /scripts/backup.py', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const auth = await vfs.readFile('/scripts/auth_check.js');
          if (auth.includes('crypto_engine_invalid')) {
            printLine('[ANOMALY] Broken module import in /scripts/auth_check.js', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const r = await vfs.readFile('/config/routes.cfg');
          if (r.includes('old_logs/access.log')) {
            printLine('[ANOMALY] Invalid log destination in /config/routes.cfg', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const db = await vfs.readFile('/etc/database.conf');
          if (db.includes('MAX_CONNNECTIONS')) {
            printLine('[ANOMALY] Typo in variable in /etc/database.conf', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const xml = await vfs.readFile('/sys/manifest.xml');
          if (!xml.includes('</integrity>') && !xml.includes('/>')) {
            printLine('[ANOMALY] Unclosed XML tag in /sys/manifest.xml', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const d = await vfs.readFile('/etc/drivers.conf');
          if (d.includes('net_driver_broken.sys')) {
            printLine('[ANOMALY] Unresolved driver pointer in /etc/drivers.conf', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}
        try {
          const s = await vfs.readFile('/sys/core_state.dat');
          if (!s.includes('0x4A89C012B7E34F')) {
            printLine('[ANOMALY] State hash mismatch in /sys/core_state.dat', 'term-warn');
            issuesFound++;
          }
        } catch (_) {}

        if (issuesFound === 0) {
          printLine('All 10 virtual filesystem core files are verified.', 'term-suc');
        } else {
          printLine(`Diagnostic: ${issuesFound} anomalous files detected.`, 'term-info');
        }
        break;
      }

      case 'ps':
        printLine(`PID   TTY      TIME     CMD
  1   ?        00:00:02 init [kernel]
 42   ?        00:00:01 vfs-daemon
 88   ?        00:00:00 net-gateway
404   ?        00:00:00 orion-daemon.exe [DORMANT]
512   pts/0    00:00:00 bash (interactive)`);
        break;

      case 'kill':
        if (args[0] === '404') {
          printLine('PID 404 probed.', 'term-warn');
          events.emit('secret:trigger-attempt', { id: 'secret_15', source: 'terminal_kill_404' });
        } else {
          printLine(`kill: Process ${args[0]} signaled.`, 'term-info');
        }
        break;

      case 'defrag':
      case 'orion-probe':
        printLine('Executing diagnostic routine: Project Orion Subsystem Probe...', 'term-purple');
        printLine('Defragmenting virtual inode tables... complete.', 'term-suc');
        events.emit('secret:trigger-attempt', { id: 'secret_06', source: 'terminal_defrag' });
        break;

      case 'devmode':
        if (args[0] === '--unlock') {
          state.setDeveloperMode(true);
          printLine('Developer mode unlocked.', 'term-suc');
          events.emit('secret:trigger-attempt', { id: 'secret_11', source: 'terminal_devmode' });
        } else {
          printLine(`Developer mode: ${state.developerMode ? 'ENABLED' : 'DISABLED'}.`, 'term-info');
        }
        break;

      case 'secret':
      case 'status':
        printLine(`Developer Status:
  User:     ${state.username || 'Developer'}
  Rank:     ${state.rank}
  Points:   ${state.points} points
  Recorded: ${state.discoveredSecrets.size} discoveries`, 'term-suc');
        break;

      case 'ghost':
        events.emit('secret:trigger-attempt', { id: 'secret_02', source: 'terminal_ghost' });
        printLine('Ghost in the shell signature decoded.', 'term-purple');
        break;

      case 'phantom-core':
        if (args[0] === '--synthesize') {
          if (state.discoveredSecrets.size >= 29) {
            printLine('[AUTH] 29 Anomalous signatures verified.', 'term-suc');
            printLine('[KEY] Vault Key decoded: 409_ARCHITECT_RESONANCE', 'term-suc');
            printLine('[SYNTHESIS] Project Orion core decrypted. Welcome, System Architect.', 'term-purple');
            events.emit('secret:trigger-attempt', { id: 'secret_30', source: 'architect_synthesize' });
          } else {
            printLine(`[SYNTHESIS REJECTED] Resonance insufficient. Current points: ${state.points}`, 'term-err');
          }
        } else {
          printLine('Usage: phantom-core --synthesize', 'term-warn');
        }
        break;

      default:
        printLine(`${cmd}: command not found. Type 'help' for available commands.`, 'term-err');
        break;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      executeCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx] || '';
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = input.value;
      const tokens = currentVal.split(' ');
      const lastToken = tokens[tokens.length - 1];
      if (lastToken) {
        vfs.readDir(cwd).then(items => {
          const match = items.find(i => i.name.startsWith(lastToken));
          if (match) {
            tokens[tokens.length - 1] = match.name;
            input.value = tokens.join(' ');
          }
        });
      }
    }
  });

  container.addEventListener('click', () => {
    input.focus();
  });

  return win;
}

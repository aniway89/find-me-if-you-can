/**
 * Find Me If You Can — System Monitor Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openMonitor() {
  let activeTab = 'processes';
  let daemonStatus = 'DORMANT';

  const win = new OSWindow({
    title: 'System Monitor',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#3fb950"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>`,
    width: 700,
    height: 460
  });

  const render = () => {
    win.setContent(`
      <div class="monitor-container">
        <div class="monitor-tabs">
          <div class="monitor-tab ${activeTab === 'processes' ? 'active' : ''}" data-tab="processes">Processes & Tasks</div>
          <div class="monitor-tab ${activeTab === 'logs' ? 'active' : ''}" data-tab="logs">System Event Logs (Telemetry)</div>
        </div>
        <div class="monitor-content">
          ${activeTab === 'processes' ? `
            <table class="process-table">
              <thead>
                <tr>
                  <th>PID</th>
                  <th>Image Name</th>
                  <th>Status</th>
                  <th>CPU</th>
                  <th>Memory</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>kernel_init</td>
                  <td>Running</td>
                  <td>0.4%</td>
                  <td>12.4 MB</td>
                  <td><button class="btn btn-sm" disabled>Protected</button></td>
                </tr>
                <tr>
                  <td>42</td>
                  <td>vfs_storage_worker</td>
                  <td>Running</td>
                  <td>1.2%</td>
                  <td>34.1 MB</td>
                  <td><button class="btn btn-sm" disabled>System</button></td>
                </tr>
                <tr id="row-daemon-404" style="background: rgba(188, 140, 255, 0.08); cursor: pointer;">
                  <td><strong>404</strong></td>
                  <td><strong>orion-daemon.exe</strong></td>
                  <td id="daemon-status-cell" style="color: var(--status-purple);">${daemonStatus}</td>
                  <td>0.0%</td>
                  <td>8.1 MB</td>
                  <td><button class="btn btn-sm btn-primary" id="btn-probe-daemon">${daemonStatus === 'DORMANT' ? 'Inspect / Wake' : 'Active'}</button></td>
                </tr>
                <tr>
                  <td>512</td>
                  <td>phantom_shell_bash</td>
                  <td>Running</td>
                  <td>0.2%</td>
                  <td>16.8 MB</td>
                  <td><button class="btn btn-sm" disabled>Active</button></td>
                </tr>
              </tbody>
            </table>
          ` : `
            <div style="font-family: var(--font-mono); font-size: 11.5px; line-height: 1.6; display: flex; flex-direction: column; gap: 6px;">
              <div style="color: var(--text-muted);">[2026-11-24 14:02:11] [BOOT] Kernel 4.0.9 initialized with 4 execution contexts.</div>
              <div style="color: var(--text-muted);">[2026-11-24 14:02:12] [FS] IndexedDB storage mounted at / with 10 directory nodes.</div>
              <div id="log-anomaly-entry" style="color: var(--status-danger); background: rgba(248, 81, 73, 0.1); padding: 8px; border-radius: var(--radius-sm); border-left: 3px solid var(--status-danger); cursor: pointer;" title="Click to analyze crash trace telemetry">
                [CRITICAL_CRASH_DUMP] 0xDEADBEEF: Kernel panic trace in orion-core.sys during Incident 404.<br>
                Registers: EAX=0x00000194 EBX=0x4A89C012 CR0=0x80050033. Click to extract telemetry.
              </div>
              <div style="color: var(--text-muted);">[2026-11-24 14:02:15] [DAEMON] Background process 404 suspended by watchdog.</div>
            </div>
          `}
        </div>
      </div>
    `);

    // Tab switching
    win.contentElement.querySelectorAll('.monitor-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        audio.playClick();
        activeTab = tab.dataset.tab;
        render();
      });
    });

    // Secret 15: Probing dormant daemon PID 404
    const btnProbe = win.contentElement.querySelector('#btn-probe-daemon');
    const rowDaemon = win.contentElement.querySelector('#row-daemon-404');
    const triggerProbe = () => {
      audio.playClick();
      daemonStatus = 'ACTIVE / PROBED';
      render();
      events.emit('secret:trigger-attempt', { id: 'secret_15', source: 'monitor_daemon_probe' });
      events.emit('system:show-toast', {
        title: 'System Monitor',
        desc: 'Probed suspended daemon PID 404. Orion dispatcher telemetry recovered.',
        type: 'success'
      });
    };

    if (btnProbe) btnProbe.addEventListener('click', (e) => { e.stopPropagation(); triggerProbe(); });
    if (rowDaemon) rowDaemon.addEventListener('click', triggerProbe);

    // Secret 12: Forensic telemetry investigation in logs
    const logAnomaly = win.contentElement.querySelector('#log-anomaly-entry');
    if (logAnomaly) {
      logAnomaly.addEventListener('click', () => {
        audio.playClick();
        logAnomaly.style.borderLeftColor = 'var(--status-success)';
        logAnomaly.style.color = 'var(--status-success)';
        events.emit('secret:trigger-attempt', { id: 'secret_12', source: 'monitor_log_telemetry' });
        events.emit('system:show-toast', {
          title: 'Forensic Telemetry Analyzed',
          desc: 'Crash trace registers decoded. Core dump revealed memory state 0x4A89C012.',
          type: 'success'
        });
      });
    }
  };

  render();
  return win;
}

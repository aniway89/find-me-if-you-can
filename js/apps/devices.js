/**
 * Find Me If You Can — Device Manager Application
 */
import { OSWindow } from '../wm/window.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';

export function openDeviceManager() {
  let bridgeStatus = 'anomaly'; // 'anomaly' or 'healthy'

  const win = new OSWindow({
    title: 'Device Manager',
    iconSvg: `<svg viewBox="0 0 24 24" fill="#388bfd"><path d="M4 6h16v10H4V6zm18 12H2v2h20v-2zM6 8v6h12V8H6z"/></svg>`,
    width: 620,
    height: 440
  });

  const render = () => {
    win.setContent(`
      <div class="devices-container">
        <div style="font-weight: 600; margin-bottom: 12px; color: var(--text-primary);">
          WORKSTATION-NODE-409 (Hardware Tree)
        </div>

        <div class="device-category">
          <div class="device-cat-header">▼ Processors</div>
          <div class="device-items-group">
            <div class="device-node">
              <span>Phantom vCPU Core #0 @ 3.40 GHz</span>
              <span class="device-status-badge status-ok">Operational</span>
            </div>
            <div class="device-node">
              <span>Phantom vCPU Core #1 @ 3.40 GHz</span>
              <span class="device-status-badge status-ok">Operational</span>
            </div>
          </div>
        </div>

        <div class="device-category">
          <div class="device-cat-header">▼ Display Adapters</div>
          <div class="device-items-group">
            <div class="device-node">
              <span>Phantom Accelerated Framebuffer VGA</span>
              <span class="device-status-badge status-ok">Operational</span>
            </div>
          </div>
        </div>

        <div class="device-category">
          <div class="device-cat-header">▼ Storage Controllers</div>
          <div class="device-items-group">
            <div class="device-node">
              <span>Phantom IndexedDB Virtual AHCI Storage Controller</span>
              <span class="device-status-badge status-ok">Operational</span>
            </div>
          </div>
        </div>

        <div class="device-category">
          <div class="device-cat-header">▼ System Devices & Coprocessors</div>
          <div class="device-items-group">
            <div class="device-node">
              <span>ACPI Power Button and Firmware Manager</span>
              <span class="device-status-badge status-ok">Operational</span>
            </div>
            <div class="device-node" id="device-quantum-bridge" style="background: ${bridgeStatus === 'anomaly' ? 'rgba(248, 81, 73, 0.08)' : 'transparent'};">
              <span>⚡ Unknown Quantum Bridge #04 (Device 0x9F)</span>
              <span class="device-status-badge ${bridgeStatus === 'anomaly' ? 'status-anom' : 'status-ok'}" id="bridge-badge">
                ${bridgeStatus === 'anomaly' ? 'Driver Anomaly [Inspect]' : 'Driver Synchronized'}
              </span>
            </div>
          </div>
        </div>
      </div>
    `);

    const bridgeNode = win.contentElement.querySelector('#device-quantum-bridge');
    if (bridgeNode) {
      bridgeNode.addEventListener('click', () => {
        audio.playClick();
        if (bridgeStatus === 'anomaly') {
          bridgeStatus = 'healthy';
          render();
          events.emit('secret:trigger-attempt', { id: 'secret_07', source: 'device_manager_quantum_bridge' });
          events.emit('system:show-toast', {
            title: 'Device Manager',
            desc: 'Device 0x9F driver reinitialized. Harmonic resonance restored.',
            type: 'success'
          });
        } else {
          events.emit('system:show-toast', {
            title: 'Device 0x9F',
            desc: 'Device is operating normally with synchronized registers.',
            type: 'info'
          });
        }
      });
    }
  };

  render();
  return win;
}

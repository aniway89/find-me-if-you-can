import { SECRETS } from './secret-definitions.js';
import { state } from '../core/state.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';
import { vfs } from '../core/vfs.js';
import { syncLeaderboardProfile } from '../core/firebase-service.js';

class DiscoveryEngine {
  constructor() {
    this.toastContainer = null;
  }

  init() {
    this.toastContainer = document.getElementById('notification-container');

    events.on('secret:trigger-attempt', (data) => {
      if (data && data.id) {
        this.unlockSecret(data.id);
      }
    });

    events.on('vfs:file-changed', () => this.validateVFSFiles());
    events.on('vfs:file-renamed', () => this.validateVFSFiles());
    events.on('system:show-toast', (data) => this.showToast(data.title, data.desc, data.type));

    this.setupFrontendHackerChallenges();
    setTimeout(() => this.validateVFSFiles(), 1200);
  }

  unlockSecret(secretId) {
    const secret = SECRETS[secretId];
    if (!secret) return false;

    if (state.discoveredSecrets.has(secretId)) {
      return false;
    }

    const recorded = state.recordDiscovery(secretId);
    if (!recorded) return false;

    audio.playSecretDiscovered();
    this.showSecretToast(secret);
    events.emit('secret:unlocked', secret);

    if (state.username) {
      syncLeaderboardProfile(state.username, state.points, state.rank, state.discoveredSecrets);
    }

    if (state.discoveredSecrets.size === 30) {
      this.triggerArchitectVictory();
    }

    return true;
  }

  showSecretToast(secret) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-secret';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#bc8cff" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">Secret Discovered: ${secret.title} (+1 Pt)</div>
        <div class="toast-desc">${secret.description}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 200);
      }
    }, 5000);
  }

  showToast(title, desc, type = 'info') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
        setTimeout(() => {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 200);
      }
    }, 4000);
  }

  async validateVFSFiles() {
    try {
      if (!state.discoveredSecrets.has('secret_10')) {
        try {
          const content = await vfs.readFile('/home/desktop/Project_Orion.lnk');
          if (content.includes('/sys/orion_core.sys') && !content.includes('orion_corrupt.bin')) {
            this.unlockSecret('secret_10');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_16')) {
        const hasCorrected = await vfs.exists('/system/libraries/libcore.dll');
        const hasCorrectedDir = await vfs.exists('/system/libraries');
        if (hasCorrected || hasCorrectedDir) {
          this.unlockSecret('secret_16');
        }
      }

      if (!state.discoveredSecrets.has('secret_17')) {
        try {
          const envContent = await vfs.readFile('/etc/sysconfig.env');
          const hasValidPort = envContent.includes('GATEWAY_PORT=8080') || envContent.includes('PORT=8080');
          const hasValidDebug = envContent.includes('DEBUG_AUTH=true') || envContent.includes('DEBUG_AUTH=false');
          if (hasValidPort && hasValidDebug && !envContent.includes('999999') && !envContent.includes('nulll')) {
            this.unlockSecret('secret_17');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_18')) {
        try {
          const jsonContent = await vfs.readFile('/etc/services.json');
          const parsed = JSON.parse(jsonContent);
          if (parsed && parsed.services && parsed.services.network_gateway && parsed.services.kernel_chrono) {
            this.unlockSecret('secret_18');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_19')) {
        try {
          const pyContent = await vfs.readFile('/scripts/backup.py');
          if (!pyContent.includes('bacukp_path') && pyContent.includes('destination') && pyContent.includes('def run_system_backup')) {
            this.unlockSecret('secret_19');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_20')) {
        try {
          const jsContent = await vfs.readFile('/scripts/auth_check.js');
          if (jsContent.includes('../modules/crypto.js') && !jsContent.includes('crypto_engine_invalid')) {
            this.unlockSecret('secret_20');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_21')) {
        try {
          const routeContent = await vfs.readFile('/config/routes.cfg');
          if (routeContent.includes('/var/log/syslog.log') && !routeContent.includes('old_logs/access.log')) {
            this.unlockSecret('secret_21');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_22')) {
        try {
          const dbContent = await vfs.readFile('/etc/database.conf');
          if (dbContent.includes('MAX_CONNECTIONS') && !dbContent.includes('MAX_CONNNECTIONS')) {
            this.unlockSecret('secret_22');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_23')) {
        try {
          const xmlContent = await vfs.readFile('/sys/manifest.xml');
          const hasClosedIntegrity = xmlContent.includes('</integrity>') || xmlContent.includes('/>');
          const parser = new DOMParser();
          const doc = parser.parseFromString(xmlContent, 'application/xml');
          const isErr = doc.querySelector('parsererror');
          if (!isErr && hasClosedIntegrity) {
            this.unlockSecret('secret_23');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_24')) {
        try {
          const drvContent = await vfs.readFile('/etc/drivers.conf');
          if (drvContent.includes('net_driver.sys') && !drvContent.includes('net_driver_broken.sys')) {
            this.unlockSecret('secret_24');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_25')) {
        try {
          const sysDat = await vfs.readFile('/sys/core_state.dat');
          if (sysDat.includes('0x4A89C012B7E34F') && !sysDat.includes('0x00000000000000')) {
            this.unlockSecret('secret_25');
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  setupFrontendHackerChallenges() {
    const hiddenNode = document.getElementById('phantom-secret-node');
    if (hiddenNode) {
      hiddenNode.addEventListener('click', () => {
        hiddenNode.classList.add('revealed');
        this.unlockSecret('secret_26');
      });
    }

    const renderLock = document.getElementById('phantom-canvas-lock');
    const unlockBtn = document.getElementById('phantom-render-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        if (renderLock) renderLock.setAttribute('data-render', 'true');
        this.unlockSecret('secret_27');
      });
    }

    if (renderLock && window.MutationObserver) {
      const observer = new MutationObserver(() => {
        if (renderLock.getAttribute('data-render') === 'true' || renderLock.style.visibility === 'visible' || renderLock.style.display === 'block') {
          this.unlockSecret('secret_27');
        }
      });
      observer.observe(renderLock, { attributes: true, attributeFilter: ['data-render', 'style'] });
    }

    window.addEventListener('phantom:override', () => {
      this.unlockSecret('secret_28');
    });

    window.repairDOMBridge = () => {
      const bridge = document.getElementById('phantom-dom-bridge');
      if (bridge) {
        bridge.setAttribute('data-status', 'repaired');
        const flag = bridge.querySelector('.dom-parity-flag');
        if (flag) {
          flag.textContent = 'PARITY_SYNCHRONIZED';
          flag.setAttribute('data-checksum', '0x99AABBCC');
        }
      }
      this.unlockSecret('secret_29');
      return 'DOM Bridge parity synchronized.';
    };
  }

  triggerArchitectVictory() {
    this.showToast('SYSTEM ARCHITECT REACHED', 'All 30 secrets discovered. Simulation core decrypted.', 'success');
    events.emit('system:architect-victory');
  }
}

export const discoveryEngine = new DiscoveryEngine();

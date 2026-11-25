import { ARCHITECT_FILESYSTEM } from './architect-fs.js';

export const CORE_INITIAL_FILESYSTEM = [
  {
    path: '/readme.txt',
    isDirectory: false,
    content: `PHANTOM OS — WORKSTATION EDITION (BUILD 4.0.9)
=====================================================
Welcome, Developer.

This system was archived following Incident 404 in late 2024.
Several configuration manifests, scripts, and module directories have suffered bitrot.

Your objective:
Investigate anomalies, repair damaged configurations, and reconstruct the true history of Project Orion.

Tip: Open the Terminal or Code Editor to inspect and repair virtual files. Run 'chkfs' in Terminal to scan sectors.
`
  },
  {
    path: '/etc/os-release',
    isDirectory: false,
    content: `NAME="PhantomOS"
VERSION="4.0.9-LTS"
ID=phantomos
BUILD_ID="20261124-KERNEL-ORION"
ARCH="x86_64-simulated"
PRETTY_NAME="PhantomOS 4.0.9 Developer Workstation"
`
  },
  {
    path: '/home/desktop/Project_Orion.lnk',
    isDirectory: false,
    content: `[Shortcut]
Name=Project Orion Dispatcher
Target=/opt/orion_corrupt.bin
Status=BROKEN
Notes=Target executable is missing or unlinked. Update target to /sys/orion_core.sys to restore.
`
  },
  {
    path: '/home/desktop/instructions.txt',
    isDirectory: false,
    content: `Investigator Guidelines:
1. Check the Blog for historical documentation.
2. Monitor System Logs for kernel panic traces.
3. Use Code Editor to fix syntax errors in /etc and /scripts.
`
  },
  {
    path: '/.archive/project_orion_memo.txt',
    isDirectory: false,
    content: `CONFIDENTIAL MEMORANDUM — EYES ONLY
FROM: Lead Architect (Dr. Vance)
TO: Core Engineering
DATE: October 14, 2024

The autonomous simulation kernel is becoming self-reinforcing.
We attempted to seal the bridge through driver 0x9F (Quantum Bridge #04),
but the manifests remain linked to the core state.
If you find this archive, do not reboot the master node without validating all 10 core configuration files.
`
  },
  {
    path: '/sys/.vault/vault_key.pem',
    isDirectory: false,
    content: `-----BEGIN PHANTOM VAULT KEY-----
MIIEpQIBAAKCAQEA0wJbM91gK9k7Qe8rF2sL
ORION_SUB_KEY_ALPHA=409_ARCHITECT_RESONANCE
-----END PHANTOM VAULT KEY-----
`
  },
  {
    path: '/system/librares/libcore.dll',
    isDirectory: false,
    content: `// Binary dynamic link library - System Core Runtime
// WARNING: Parent directory has a typographic error ('librares' instead of 'libraries').
// System dynamic linker cannot resolve symbols until path is corrected to /system/libraries/libcore.dll
`
  },
  {
    path: '/etc/sysconfig.env',
    isDirectory: false,
    content: `# PhantomOS System Environment Configuration
# Fix required: Port must be 8080 and DEBUG_AUTH must be true or false.
NODE_ENV=production
GATEWAY_PORT=999999
DEBUG_AUTH=nulll
CACHE_DRIVER=in_memory
`
  },
  {
    path: '/etc/services.json',
    isDirectory: false,
    content: `{
  "services": {
    "network_gateway": {
      "port": 8080,
      "enabled": true
    },
    "kernel_chrono": {
      "port": 3000,
      "enabled": true,
    }
`
  },
  {
    path: '/scripts/backup.py',
    isDirectory: false,
    content: `import sys
import os

def run_system_backup():
    destination = "/var/backups"
    if not os.path.exists(destination):
        os.makedirs(destination)
    print("Beginning backup sequence...")
    print(f"Archive written to: {bacukp_path}")
    return True

if __name__ == "__main__":
    run_system_backup()
`
  },
  {
    path: '/scripts/auth_check.js',
    isDirectory: false,
    content: `import { verifySignature } from '../modules/crypto_engine_invalid.js';

export function checkAuthorization(token) {
  if (!token) return false;
  return verifySignature(token, "PHANTOM_PUB_KEY");
}
`
  },
  {
    path: '/modules/crypto.js',
    isDirectory: false,
    content: `export function verifySignature(token, key) {
  return token && key ? true : false;
}
`
  },
  {
    path: '/config/routes.cfg',
    isDirectory: false,
    content: `# Virtual Router Forwarding Table
ROUTE_INBOUND=/api/v1
ROUTE_OUTBOUND=/gateway
LOG_DESTINATION=/var/old_logs/access.log
STATUS=ERROR_INVALID_LOG_PATH
`
  },
  {
    path: '/etc/database.conf',
    isDirectory: false,
    content: `# Database Connection Parameters
DB_DRIVER=sqlite_vfs
DB_HOST=localhost
DB_NAME=phantom_memory
MAX_CONNNECTIONS=9999
TIMEOUT_MS=5000
`
  },
  {
    path: '/sys/manifest.xml',
    isDirectory: false,
    content: `<?xml version="1.0" encoding="UTF-8"?>
<manifest version="4.0.9">
  <application id="orion.core">
    <name>Project Orion System Core</name>
    <integrity status="verified">
  </application>
</manifest>
`
  },
  {
    path: '/etc/drivers.conf',
    isDirectory: false,
    content: `# Hardware Driver Registry
DRIVER_CPU=core_x86.sys
DRIVER_GPU=display_vga.sys
DRIVER_NET=net_driver_broken.sys
DRIVER_QUANTUM=quantum_bridge_04.sys
`
  },
  {
    path: '/backup/core_state.dat',
    isDirectory: false,
    content: `STATE_HASH=0x4A89C012B7E34F
STATUS=PRIMARY_INTEGRITY_SNAPSHOT
RESONANCE=VALID
`
  },
  {
    path: '/sys/core_state.dat',
    isDirectory: false,
    content: `STATE_HASH=0x00000000000000
STATUS=CORRUPTED_DURING_INCIDENT_404
RESONANCE=DESYNCHRONIZED
`
  },
  {
    path: '/sys/orion_core.sys',
    isDirectory: false,
    content: `[ORION_CORE_KERNEL_DISPATCHER]
STATUS=STANDBY
KEY=ARCHITECT_PHANTOM_SIG_ALPHA
`
  },
  {
    path: '/var/log/syslog.log',
    isDirectory: false,
    content: `[2026-11-24 14:02:11] [KERNEL] Boot sequence initiated: PhantomOS 4.0.9-LTS.
[2026-11-24 14:02:12] [VFS] Mounted root partition (IndexedDB) at /.
[2026-11-24 14:02:12] [WARN] Misspelled directory encountered at /system/librares. Linker failed.
[2026-11-24 14:02:13] [DEVICE] Device 0x9F (Unknown Quantum Bridge #04) is in an anomaly state.
[2026-11-24 14:02:13] [ERROR] Config parse failure: /etc/sysconfig.env contains invalid port range.
[2026-11-24 14:02:14] [ERROR] JSON syntax error in /etc/services.json: unexpected EOF.
[2026-11-24 14:02:15] [NOTICE] Inactive process detected: PID 404 (orion-daemon.exe) dormant in memory.
[2026-11-24 14:02:16] [SECURITY] Secret directory /.archive detected with restricted read permissions.
`
  }
];

export const INITIAL_FILESYSTEM = [
  ...CORE_INITIAL_FILESYSTEM,
  ...ARCHITECT_FILESYSTEM
];

/**
 * Find Me If You Can — Secret Definitions (All 30 Secrets across 5 Tiers)
 */

export const SECRETS = {
  // =========================================================================
  // TIER 1: EXPLORER (Secrets 01–05)
  // =========================================================================
  secret_01: {
    id: 'secret_01',
    tier: 1,
    difficulty: 'Explorer',
    title: 'Genesis Clicker',
    description: 'Triggered the rapid kernel pulse sequence by clicking the OS logo multiple times in rapid succession.',
    points: 1
  },
  secret_02: {
    id: 'secret_02',
    tier: 1,
    difficulty: 'Explorer',
    title: 'Ghost in the Shell',
    description: 'Discovered the hidden alternate terminal signature through the terminal menu or command line.',
    points: 1
  },
  secret_03: {
    id: 'secret_03',
    tier: 1,
    difficulty: 'Explorer',
    title: 'Subliminal Transmission',
    description: 'Uncovered a hidden developer message embedded inside the internal kernel blog articles.',
    points: 1
  },
  secret_04: {
    id: 'secret_04',
    tier: 1,
    difficulty: 'Explorer',
    title: 'Kernel Lineage',
    description: 'Inspected the low-level build compilation string and kernel release notes inside the About dialog.',
    points: 1
  },
  secret_05: {
    id: 'secret_05',
    tier: 1,
    difficulty: 'Explorer',
    title: 'Chrono Synchronization',
    description: 'Interacted with the system clock flyout and recalibrated the kernel drift offset.',
    points: 1
  },

  // =========================================================================
  // TIER 2: INVESTIGATOR (Secrets 06–15)
  // =========================================================================
  secret_06: {
    id: 'secret_06',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Undocumented Utility',
    description: 'Located and executed an unlisted system binary (defrag / orion-probe) from the command shell.',
    points: 1
  },
  secret_07: {
    id: 'secret_07',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Quantum Resonance',
    description: 'Diagnosed Device 0x9F (Unknown Quantum Bridge #04) in Device Manager and reinitialized its driver.',
    points: 1
  },
  secret_08: {
    id: 'secret_08',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Corrupted Registry',
    description: 'Identified the obscured Experimental Hyper-Threading switch in Settings and corrected its parameter.',
    points: 1
  },
  secret_09: {
    id: 'secret_09',
    tier: 2,
    difficulty: 'Investigator',
    title: 'The Subterranean Vault',
    description: 'Discovered and explored the hidden root directory /.archive containing classified Project Orion records.',
    points: 1
  },
  secret_10: {
    id: 'secret_10',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Broken Pointer',
    description: 'Repaired the invalid desktop shortcut Project_Orion.lnk to link directly to /sys/orion_core.sys.',
    points: 1
  },
  secret_11: {
    id: 'secret_11',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Developer Protocol',
    description: 'Unlocked internal Developer Mode through System Settings developer toggle.',
    points: 1
  },
  secret_12: {
    id: 'secret_12',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Forensic Telemetry',
    description: 'Investigated the anomaly crash trace and core dump logs inside the System Monitor event inspector.',
    points: 1
  },
  secret_13: {
    id: 'secret_13',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Archived Transmission',
    description: 'Recovered the discarded engineering handoff communication from the Mail system archives.',
    points: 1
  },
  secret_14: {
    id: 'secret_14',
    tier: 2,
    difficulty: 'Investigator',
    title: 'The Shadow Intranet',
    description: 'Navigated the internal browser to the decommissioned Incident 404 intranet report.',
    points: 1
  },
  secret_15: {
    id: 'secret_15',
    tier: 2,
    difficulty: 'Investigator',
    title: 'Dormant Daemon',
    description: 'Detected and inspected the suspended background daemon (PID 404) in System Monitor.',
    points: 1
  },

  // =========================================================================
  // TIER 3: ENGINEER (Secrets 16–25) — Advanced VFS Challenges
  // =========================================================================
  secret_16: {
    id: 'secret_16',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Typographic Anomaly',
    description: 'Corrected the misspelled system library directory /system/librares to /system/libraries in the virtual filesystem.',
    points: 1
  },
  secret_17: {
    id: 'secret_17',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Gateway Calibrator',
    description: 'Repaired /etc/sysconfig.env by fixing invalid port 999999 to 8080 and correcting DEBUG_AUTH.',
    points: 1
  },
  secret_18: {
    id: 'secret_18',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Syntax Reconstruction',
    description: 'Fixed malformed JSON formatting, trailing commas, and unclosed brackets in /etc/services.json.',
    points: 1
  },
  secret_19: {
    id: 'secret_19',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Indentation Protocol',
    description: 'Fixed syntax and undefined variable references in the backup script /scripts/backup.py.',
    points: 1
  },
  secret_20: {
    id: 'secret_20',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Dependency Linker',
    description: 'Corrected the broken module import statement in /scripts/auth_check.js to point to ../modules/crypto.js.',
    points: 1
  },
  secret_21: {
    id: 'secret_21',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Route Forwarder',
    description: 'Repaired the invalid forwarding log path in /config/routes.cfg to target /var/log/syslog.log.',
    points: 1
  },
  secret_22: {
    id: 'secret_22',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Parameter Sanity',
    description: 'Corrected misspelled parameter MAX_CONNNECTIONS to MAX_CONNECTIONS in /etc/database.conf.',
    points: 1
  },
  secret_23: {
    id: 'secret_23',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Schema Compliance',
    description: 'Repaired the unclosed XML integrity tag in the system manifest /sys/manifest.xml.',
    points: 1
  },
  secret_24: {
    id: 'secret_24',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Driver Handshake',
    description: 'Corrected invalid network driver reference in /etc/drivers.conf to point to valid net_driver.sys.',
    points: 1
  },
  secret_25: {
    id: 'secret_25',
    tier: 3,
    difficulty: 'Engineer',
    title: 'Resonance Reconvergence',
    description: 'Synchronized the corrupted state hash in /sys/core_state.dat with the golden backup in /backup/core_state.dat.',
    points: 1
  },

  // =========================================================================
  // TIER 4: HACKER (Secrets 26–29) — Expert Frontend Investigations
  // =========================================================================
  secret_26: {
    id: 'secret_26',
    tier: 4,
    difficulty: 'Hacker',
    title: 'CSS Specter',
    description: 'Located and activated the zero-opacity diagnostic anchor hidden within the DOM layer.',
    points: 1
  },
  secret_27: {
    id: 'secret_27',
    tier: 4,
    difficulty: 'Hacker',
    title: 'Deoccluded Buffer',
    description: 'Overrode the intentionally blocked rendering gate by toggling the data-render attribute or buffer button.',
    points: 1
  },
  secret_28: {
    id: 'secret_28',
    tier: 4,
    difficulty: 'Hacker',
    title: 'Signal Interceptor',
    description: 'Discovered and dispatched the undocumented custom browser event "phantom:override".',
    points: 1
  },
  secret_29: {
    id: 'secret_29',
    tier: 4,
    difficulty: 'Hacker',
    title: 'DOM Parity Rebuilder',
    description: 'Invoked the internal DOM repair bridge to resolve parity mismatches in the diagnostic container.',
    points: 1
  },

  // =========================================================================
  // TIER 5: ARCHITECT (Secret 30) — The Grand Finale
  // =========================================================================
  secret_30: {
    id: 'secret_30',
    tier: 5,
    difficulty: 'Architect',
    title: 'The Grand Synthesis',
    description: 'Decrypted the true history of Project Orion by uniting the vault key, system core, and all 10 VFS repairs.',
    points: 1
  }
};

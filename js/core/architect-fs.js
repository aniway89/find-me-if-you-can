/**
 * Additional Simulated Filesystem entries for Architect+ (Secrets 031–130)
 */

export const ARCHITECT_FILESYSTEM = [
  // --- Category 1: Forgotten Protocol ---
  {
    path: '/etc/protocols.conf',
    isDirectory: false,
    content: `# PhantomOS Protocol Daemon Configuration
# Port assignments and legacy listeners
[LISTENERS]
TCP_HTTP=80
TCP_HTTPS=443
TCP_SSH=22
# Legacy UDP broadcast probe used during Incident 404
UDP_BROADCAST_PROBE=1337
STATUS=SILENCED
`
  },
  {
    path: '/var/log/arp_table.dump',
    isDirectory: false,
    content: `# Local ARP Cache Dump — Interface eth0
192.168.1.1       at 52:54:00:12:34:56 [ether] on eth0
192.168.1.100     at 52:54:00:88:99:AA [ether] on eth0
# Broadcast frame target must be FF:FF:FF:FF:FF:FF
192.168.1.255     at FF:FF:FF:FF:FF:00 [ether] on eth0
`
  },
  {
    path: '/config/bgp_routes.json',
    isDirectory: false,
    content: `{
  "routing_protocol": "BGP-4",
  "local_as": 64500,
  "peers": [
    {
      "peer_as": 64512,
      "prefix": "10.0.40.0/24",
      "next_hop": "null0",
      "status": "misrouted"
    }
  ]
}
`
  },
  {
    path: '/etc/serial.conf',
    isDirectory: false,
    content: `# Serial Communication Port 0 (ttyS0)
DEVICE=/dev/ttyS0
BAUD=300
DATA_BITS=8
PARITY=NONE
STOP_BITS=1
FLOW_CONTROL=RTS/CTS
`
  },
  {
    path: '/var/log/packets/frag_1.bin',
    isDirectory: false,
    content: `IP_FRAG_OFFSET=0:ORION_DATAGRAM_HEAD:`
  },
  {
    path: '/var/log/packets/frag_2.bin',
    isDirectory: false,
    content: `IP_FRAG_OFFSET=1480:PAYLOAD_RECONSTRUCTION_BODY:`
  },
  {
    path: '/var/log/packets/frag_3.bin',
    isDirectory: false,
    content: `IP_FRAG_OFFSET=2960:CHECKSUM_0xCAFE_TAIL`
  },

  // --- Category 2: Memory Labyrinth ---
  {
    path: '/sys/memory_guards.cfg',
    isDirectory: false,
    content: `# Virtual MMU Memory Guards
STACK_GUARD_PAGE=ENABLED
CANARY_CHECK=STRICT
# Buffer overflow hazard: default frame allocation is 32 bytes
MAX_STACK_FRAME=32
HEAP_EXPANSION_STEP=4096
`
  },
  {
    path: '/etc/mmu.conf',
    isDirectory: false,
    content: `# Memory Management Unit Page Table Mapping
PAGE_0x01=FRAME_0x10
PAGE_0x02=FRAME_0x20
PAGE_0x0E=FRAME_UNASSIGNED_FAULT
PAGE_0x10=FRAME_0x80
`
  },
  {
    path: '/scripts/heap_alloc.c',
    isDirectory: false,
    content: `// Virtual Heap Block Allocator
#include <stdio.h>
#define HEAP_MAGIC 0x50484E54

// Memory guard canary word: must match 0xDEADBEEF
unsigned int HEAP_CANARY = 0x00000000;

void* allocate_page(size_t size) {
    if (HEAP_CANARY != 0xDEADBEEF) {
        printf("PANIC: Corrupted heap canary! Aborting allocation.\\n");
        return NULL;
    }
    return (void*)0x00400000;
}
`
  },
  {
    path: '/etc/dma.conf',
    isDirectory: false,
    content: `# Direct Memory Access (DMA) Bus Allocation
DMA_CHANNEL_0=RAM_REFRESH
DMA_CHANNEL_2=FLOPPY_CONTROLLER
# Conflict: Sound Blaster and Quantum Bridge both claim Channel 3
DMA_CHANNEL_3=SOUND_BLASTER_16
QUANTUM_BRIDGE_DMA=3
`
  },
  {
    path: '/etc/fstab',
    isDirectory: false,
    content: `# /etc/fstab: static file system information.
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
/dev/vda1       /               ext4    errors=remount-ro 0       1
/dev/vda2       none            swap    sw,size=128M      0       0
`
  },
  {
    path: '/config/gc.json',
    isDirectory: false,
    content: `{
  "collector": "MarkAndSweep",
  "cycle_interval_ms": 500,
  "sweep_threshold": -1,
  "generational": true
}
`
  },

  // --- Category 3: Cryptographer ---
  {
    path: '/home/docs/cipher1.txt',
    isDirectory: false,
    content: `Archived Note from Dr. Vance:
"We encoded the emergency kernel activation phrase with ROT13 substitution:
Ciphertext: CUNAGBZ_XREARY_EVFR"
`
  },
  {
    path: '/sys/encrypted_flag.bin',
    isDirectory: false,
    content: `XOR_ENCODED:Key=0xAA:Payload=0xEF0xEA0xE30xE50xE40xFA0xDF0xEB0xE30xFA0xE20xE50xEC`
  },
  {
    path: '/sys/integrity.sha256',
    isDirectory: false,
    content: `4a89c012b7e34f89d0234a98fe12bc443219abce7890ef123456789abcdef012  /sys/orion_core.sys
`
  },
  {
    path: '/docs/dh_exchange.txt',
    isDirectory: false,
    content: `Diffie-Hellman Key Exchange Parameters:
Base Generator g = 5
Modulus Prime p = 23
Alice Private Secret a = 6
Bob Public Value B = 8
Formula: Shared Secret S = (B^a) mod p
`
  },
  {
    path: '/etc/otp_secret.hex',
    isDirectory: false,
    content: `0x00 0x00 0x00 0x00 0x00`
  },
  {
    path: '/sys/manifest.sig',
    isDirectory: false,
    content: `-----BEGIN RSA SIGNATURE-----
MEUCIQC84f09a8ef12cb4a919028efc0234bc89ea1234ef91280ba12ce89ab12cd89
-----END RSA SIGNATURE-----
`
  },

  // --- Category 4: Timekeeper ---
  {
    path: '/etc/timekeeper.conf',
    isDirectory: false,
    content: `# Virtual Kernel Real-Time Clock Configuration
RTC_EMULATION=ENABLED
HARDWARE_CLOCK=UTC
# 32-bit timestamp will wrap on 2038-01-19 03:14:07 UTC
TIME_T_WIDTH=32
`
  },
  {
    path: '/etc/crontab',
    isDirectory: false,
    content: `# /etc/crontab: system crontab
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin

# Run system integrity backup monthly
0 0 31 2 *  root  /scripts/backup.py
`
  },
  {
    path: '/config/tz_sync.env',
    isDirectory: false,
    content: `# Cluster Regional Clock Offsets
PRIMARY_NODE_TZ="UTC"
BACKUP_NODE_TZ="America/Los_Angeles"
REPLICA_NODE_TZ="Asia/Tokyo"
CLUSTER_SYNC_MODE="STRICT_UTC"
`
  },
  {
    path: '/etc/ntp.conf',
    isDirectory: false,
    content: `# Network Time Protocol Daemon Config
driftfile /var/lib/ntp/ntp.drift
server pool.phantom.local iburst
server 127.127.20.0 mode 18 minpoll 4
fudge 127.127.20.0 flag3 0
`
  },
  {
    path: '/var/log/boot.log',
    isDirectory: false,
    content: `[00:00:03.100] [SYSTEM] User space shell started.
[00:00:02.400] [SYSTEM] Device drivers initialized.
[00:00:01.000] [KERNEL] Early boot microcode loaded.
[00:00:00.000] [KERNEL] BIOS handover complete.
`
  },

  // --- Category 5: Deep Filesystem ---
  {
    path: '/var/log/fs_error.log',
    isDirectory: false,
    content: `EXT4-fs (vda1): error loading superblock. Primary superblock 0 corrupted.
EXT4-fs (vda1): backup superblocks available at block 32768, 98304, 163840.
`
  },
  {
    path: '/lost+found/orphan_8192.dat',
    isDirectory: false,
    content: `PROJECT ORION ENGINEERING MANIFEST — INODE 8192
Recovered Sector: Sector 409
True Status: Orion Simulation Core operational under quantum bridge 0x9F.
`
  },
  {
    path: '/sys/link_a',
    isDirectory: false,
    content: `symlink:/sys/link_b`
  },
  {
    path: '/sys/link_b',
    isDirectory: false,
    content: `symlink:/sys/link_a`
  },
  {
    path: '/etc/shadow_phantom',
    isDirectory: false,
    content: `root:$6$phantom$99AABBCCDDEEFF:19000:0:99999:7:::
guest:*:19000:0:99999:7:::
`
  },
  {
    path: '/home/desktop/instructions.txt:secret_stream',
    isDirectory: false,
    content: `ADS_STREAM_DATA: ORION_ADS_SECTOR_REVEALED (Key: 0x409)`
  },
  {
    path: '/var/log/journal_status.txt',
    isDirectory: false,
    content: `JBD2: 4 uncommitted transactions waiting in write-ahead log.
State: UNCOMMITTED_DIRTY_BUFFERS
`
  },
  {
    path: '/sys/kernel.lock',
    isDirectory: false,
    content: ``
  },
  {
    path: '/tmp/locks/stale_001.lock',
    isDirectory: false,
    content: `LOCK_PID=9999`
  },

  // --- Category 6: Network Cartographer ---
  {
    path: '/etc/network/interfaces',
    isDirectory: false,
    content: `auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
    address 192.168.1.50
    netmask 255.255.255.0
`
  },
  {
    path: '/etc/hosts',
    isDirectory: false,
    content: `127.0.0.1       localhost
127.0.0.1       workstation
127.0.0.1       auth.phantom.local
10.0.40.1       intranet.phantom.local
10.0.40.9       orion-node.phantom.local
`
  },
  {
    path: '/config/subnet.conf',
    isDirectory: false,
    content: `[SUBNET_V4]
NETWORK=192.168.1.0
NETMASK=255.255.255.256
BROADCAST=192.168.1.255
`
  },
  {
    path: '/etc/firewall.rules',
    isDirectory: false,
    content: `# Virtual iptables Firewall Configuration
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -p tcp --dport 22 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 8080 -j DROP
COMMIT
`
  },
  {
    path: '/etc/nat.conf',
    isDirectory: false,
    content: `# Network Address Translation (NAT) Table
PREROUTING: -p tcp --dport 443 -j DNAT --to-destination 192.168.1.50:443
`
  },

  // --- Category 7: Machine Intelligence ---
  {
    path: '/models/orion_weights.json',
    isDirectory: false,
    content: `{
  "layer_0": [0.12, 0.45, -0.22, 0.89],
  "layer_1": [0.04, "NaN", 0.77, -0.31],
  "layer_2": [-0.65, 0.18, "NaN", 0.94]
}
`
  },
  {
    path: '/models/layer_config.json',
    isDirectory: false,
    content: `{
  "hidden_layers": 12,
  "hidden_dim": 512,
  "activation": "sigmoid",
  "norm": "LayerNorm"
}
`
  },
  {
    path: '/scripts/train_orion.py',
    isDirectory: false,
    content: `# Project Orion Neural Subsystem Trainer
LEARNING_RATE = 99.9
BATCH_SIZE = 32
OPTIMIZER = "AdamW"

def step(loss):
    grad = loss.backward()
    weights -= LEARNING_RATE * grad
`
  },
  {
    path: '/models/vocab.json',
    isDirectory: false,
    content: `{
  "vocab_size": 32000,
  "special_tokens": ["<pad>", "<s>", "</s>", "<unk>", "<mask>", "<orion_core>"]
}
`
  },
  {
    path: '/models/transformer.json',
    isDirectory: false,
    content: `{
  "hidden_dim": 512,
  "num_attention_heads": 7,
  "head_dim": 64
}
`
  },
  {
    path: '/models/loss.py',
    isDirectory: false,
    content: `def calculate_loss(predictions, targets):
    cross_entropy = compute_cross_entropy(predictions, targets)
    # BUG: Negative sign maximizes loss instead of minimizing
    return -cross_entropy
`
  },
  {
    path: '/models/orion_arch.json',
    isDirectory: false,
    content: `{
  "model_type": "transformer-decoder",
  "dropout_rate": 0.0,
  "attention_dropout": 0.0
}
`
  },
  {
    path: '/models/context.conf',
    isDirectory: false,
    content: `MAX_SEQ_LEN=131072
KV_CACHE_BUDGET_MB=16384
`
  },

  // --- Category 8: Developer's Nightmare ---
  {
    path: '/scripts/array_scanner.js',
    isDirectory: false,
    content: `// Array Scanner Utility
export function scanArray(array) {
  // Off-by-one bug: index reaches array.length
  for (let i = 0; i <= array.length; i++) {
    console.log("Item:", array[i]);
  }
}
`
  },
  {
    path: '/scripts/user_validator.js',
    isDirectory: false,
    content: `// User Validator
export function validateUser(user) {
  // Bug: Cannot read properties of undefined
  return user.profile.settings.isEnabled;
}
`
  },
  {
    path: '/scripts/finance_calc.js',
    isDirectory: false,
    content: `// Precision Calculator
export function checkBalance(a, b) {
  const total = a + b;
  // Bug: 0.1 + 0.2 === 0.30000000000000004
  if (total === 0.3) {
    return "BALANCED";
  }
  return "PRECISION_ERROR";
}
`
  },
  {
    path: '/scripts/async_task.js',
    isDirectory: false,
    content: `// Async Task Runner
export function runTask(cb) {
  step1((r1) => {
    step2(r1, (r2) => {
      step3(r2, (r3) => {
        cb(r3);
      });
    });
  });
}
`
  },
  {
    path: '/scripts/pkg_a.js',
    isDirectory: false,
    content: `import { helperB } from './pkg_b.js';
export const helperA = () => helperB() + 1;
`
  },
  {
    path: '/scripts/pkg_b.js',
    isDirectory: false,
    content: `import { helperA } from './pkg_a.js';
export const helperB = () => helperA() + 1;
`
  },
  {
    path: '/scripts/parser.js',
    isDirectory: false,
    content: `// Syntax Parser
const a = 1
[1, 2].forEach(x => console.log(x))
`
  },
  {
    path: '/scripts/data_loader.js',
    isDirectory: false,
    content: `export function loadTelemetry() {
  return fetch('/api/telemetry');
}
`
  },
  {
    path: '/scripts/ui_widget.js',
    isDirectory: false,
    content: `export function mountWidget() {
  window.addEventListener('resize', () => {
    console.log("Resized");
  });
}
`
  },
  {
    path: '/scripts/counter_service.js',
    isDirectory: false,
    content: `let counter = 0;
export async function increment() {
  const cur = counter;
  await new Promise(r => setTimeout(r, 10));
  counter = cur + 1;
}
`
  },

  // --- Category 9: Project Orion Classified ---
  {
    path: '/.archive/blackbox_404.bin',
    isDirectory: false,
    content: `[FLIGHT_RECORDER_INCIDENT_404]
TIMESTAMP: 2024-10-14T23:58:00Z
EVENT: Resonance Cascade initiated in Cluster Alpha.
DIAGNOSTIC: Quantum Bridge 0x9F frequency misalignment.
ROOT_CAUSE: RESONANCE_CASCADE
`
  },
  {
    path: '/var/log/incident_part1.log',
    isDirectory: false,
    content: `INCIDENT 404 — PHASE 1 REPORT
Initial telemetry shows harmonic frequency surging on driver 0x9F.
`
  },
  {
    path: '/var/log/incident_part2.log',
    isDirectory: false,
    content: `INCIDENT 404 — PHASE 2 REPORT
Multiple virtual bus reflections detected between memory channels and network sockets.
`
  },
  {
    path: '/var/log/incident_part3.log',
    isDirectory: false,
    content: `INCIDENT 404 — PHASE 3 CONCLUSION
Official Root Cause Determined: RESONANCE_CASCADE.
Recommendation: Lock Master Vault with 3-factor synthesis key.
`
  },
  {
    path: '/config/quantum_freq.cfg',
    isDirectory: false,
    content: `# Quantum Bridge Resonance Frequency Configuration
# Optimal hydrogen line reference: 1420.4057 MHz
FREQUENCY_MHZ=100.0000
`
  },
  {
    path: '/.archive/blueprints/part_1.svg',
    isDirectory: false,
    content: `<svg><path d="M0,0 L100,0" stroke="#388bfd" /></svg>`
  },
  {
    path: '/.archive/blueprints/part_2.svg',
    isDirectory: false,
    content: `<svg><path d="M100,0 L100,100" stroke="#3fb950" /></svg>`
  },
  {
    path: '/.archive/blueprints/part_3.svg',
    isDirectory: false,
    content: `<svg><path d="M100,100 L0,100" stroke="#d29922" /></svg>`
  },
  {
    path: '/.archive/blueprints/part_4.svg',
    isDirectory: false,
    content: `<svg><path d="M0,100 L0,0" stroke="#f85149" /></svg>`
  },
  {
    path: '/sys/orion_registers.dat',
    isDirectory: false,
    content: `ALPHA=0x00
BETA=0x00
GAMMA=0x00
DELTA=0x00
`
  }
];

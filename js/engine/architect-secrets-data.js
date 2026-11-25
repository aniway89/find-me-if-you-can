/**
 * Find Me If You Can — 100 Architect+ Secret Definitions (Secrets 031–130)
 * Tier 6: Architect+
 */

export const ARCHITECT_CATEGORIES = [
  { id: 'protocol', name: 'Forgotten Protocol', range: [31, 40], icon: '📡' },
  { id: 'memory', name: 'Memory Labyrinth', range: [41, 50], icon: '🧠' },
  { id: 'crypto', name: 'Cryptographer', range: [51, 60], icon: '🔐' },
  { id: 'time', name: 'Timekeeper', range: [61, 70], icon: '⏳' },
  { id: 'filesystem', name: 'Deep Filesystem', range: [71, 80], icon: '📁' },
  { id: 'network', name: 'Network Cartographer', range: [81, 90], icon: '🌐' },
  { id: 'ai', name: 'Machine Intelligence', range: [91, 100], icon: '⚡' },
  { id: 'nightmare', name: "Developer's Nightmare", range: [101, 110], icon: '🐛' },
  { id: 'orion', name: 'Project Orion Classified', range: [111, 120], icon: '🛸' },
  { id: 'architect', name: 'Grand Architect', range: [121, 130], icon: '🏛️' }
];

export const ARCHITECT_SECRETS = {
  // =========================================================================
  // 1. FORGOTTEN PROTOCOL (031–040)
  // =========================================================================
  secret_031: {
    id: 'secret_031',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: "Dead Man's Wire",
    description: 'Diagnosed a silenced UDP broadcast socket on port 1337 and issued a keep-alive pulse.',
    points: 1,
    hints: [
      'A decommissioned UDP socket has been dormant since Incident 404.',
      'Check /etc/protocols.conf and the Network Sockets table in System Monitor.',
      'Run "proto --ping 1337" in Terminal after inspecting the protocol configuration.'
    ],
    unlockMessage: 'UDP port 1337 broadcast socket acknowledged. Keep-alive pulse registered.'
  },
  secret_032: {
    id: 'secret_032',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Syn-Ack Mirage',
    description: 'Completed a simulated TCP 3-way handshake sequence with the legacy Orion mainframe.',
    points: 1,
    hints: [
      'Marcus Vance mentioned a mandatory handshake sequence in his archived mail.',
      'Search Phantom Mail for "handshake" or "SYN-ACK" to find the sequence number.',
      'Execute "proto --handshake SYN" followed by "proto --handshake ACK 0xDEADBEEF" in Terminal.'
    ],
    unlockMessage: 'Handshake accepted with sequence 0xDEADBEEF. Connection established.'
  },
  secret_033: {
    id: 'secret_033',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Sub-Ether Beacon',
    description: 'Repaired the corrupted broadcast MAC target in the local ARP cache table.',
    points: 1,
    hints: [
      'Address resolution is failing because broadcast packets are targeting an invalid MAC address.',
      'Open /var/log/arp_table.dump in Code Editor and locate the broadcast entry.',
      'Change FF:FF:FF:FF:FF:00 to the true broadcast MAC FF:FF:FF:FF:FF:FF, then run "proto --arp-scan".'
    ],
    unlockMessage: 'ARP table broadcast restored. Sub-ether beacon echoed across the virtual subnet.'
  },
  secret_034: {
    id: 'secret_034',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Token Ring Echo',
    description: 'Extracted the legacy Token Ring hardware ring-ID from Device Manager and claimed the token.',
    points: 1,
    hints: [
      'A 16Mbps IBM Token Ring card is quietly seated in the legacy hardware tree.',
      'Open Device Manager, expand Network Adapters, and inspect Token Ring Legacy Adapter properties.',
      'Note the token ID TR-0x8849 and run "proto --token TR-0x8849" in Terminal.'
    ],
    unlockMessage: 'Token TR-0x8849 captured. Circulating frame acknowledged on the legacy ring.'
  },
  secret_035: {
    id: 'secret_035',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Gopher Tunnel',
    description: 'Discovered the hidden RFC 1436 Gopher endpoint buried inside the internal browser.',
    points: 1,
    hints: [
      'The modern web browser still remembers pre-web hierarchical menu protocols.',
      'A footnote in the Kernel Blog recalls gopher capsule archives on port 70.',
      'Navigate the Browser address bar to "gopher://phantom.local/70/capsule" or enter "proto --gopher" in shell.'
    ],
    unlockMessage: 'Gopher capsule extracted. Legacy menu text decompiled.'
  },
  secret_036: {
    id: 'secret_036',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'BGP Anomaly Injection',
    description: 'Corrected the misrouted autonomous system route path for AS 64512 in the routing table.',
    points: 1,
    hints: [
      'An autonomous system has been advertising an invalid null route in the BGP routing table.',
      'Inspect /config/bgp_routes.json using the Code Editor or cat.',
      'Fix nextHop from "null0" to "10.0.40.1" and set AS to 64513, then run "proto --bgp-verify".'
    ],
    unlockMessage: 'BGP route convergence verified for AS 64513. Peering session re-established.'
  },
  secret_037: {
    id: 'secret_037',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Baud Rate Desync',
    description: 'Recalibrated serial teletype ttyS0 communication speed to standard high-speed UART.',
    points: 1,
    hints: [
      'The serial line console is printing garbled baud mismatch telemetry.',
      'Inspect /etc/serial.conf where the baud rate is locked to 300.',
      'Change baud to 115200 in /etc/serial.conf and execute "proto --serial-sync ttyS0".'
    ],
    unlockMessage: 'UART 16550A sync achieved at 115200 8N1. Terminal parity clear.'
  },
  secret_038: {
    id: 'secret_038',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Packet Fragment Reassembly',
    description: 'Reassembled three fragmented IP datagram payloads scattered across the virtual log partition.',
    points: 1,
    hints: [
      'A high-priority transmission arrived with More Fragments (MF) flag set in 3 separate parts.',
      'Locate frag_1.bin, frag_2.bin, and frag_3.bin inside /var/log/packets/.',
      'Execute "proto --reassemble /var/log/packets" in Terminal to reconstruct the datagram.'
    ],
    unlockMessage: '3 IP fragments reunited. MTU integrity checksum 0xCAFE verified.'
  },
  secret_039: {
    id: 'secret_039',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'ICMP Stealth Tunnel',
    description: 'Transmitted the encrypted ICMP echo payload discovered inside Dr. Vance\'s email attachment.',
    points: 1,
    hints: [
      'Engineers used ICMP ping payload padding to smuggle diagnostic commands.',
      'Open Phantom Mail and inspect the attachment memo titled "Diagnostic Probe Memo".',
      'Run "proto --icmp ECHO_PHANTOM_REQUEST" in Terminal.'
    ],
    unlockMessage: 'ICMP echo request answered with type 0 echo reply. Payload matched stealth tunnel.'
  },
  secret_040: {
    id: 'secret_040',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Forgotten Protocol',
    categoryId: 'protocol',
    title: 'Protocol 0xFF Sentinel',
    description: 'Unified the Token Ring ID, BGP Autonomous System, and UDP port to activate Protocol 0xFF.',
    points: 1,
    hints: [
      'The master protocol sentinel requires the coordinates from secrets 031, 034, and 036.',
      'You need: UDP Port 1337, Token Ring TR-0x8849, and BGP AS 64513.',
      'Execute "proto --sentinel TR-0x8849:64513:1337" in Terminal.'
    ],
    unlockMessage: 'Protocol 0xFF Sentinel activated. Forgotten Protocol category mastered.'
  },

  // =========================================================================
  // 2. MEMORY LABYRINTH (041–050)
  // =========================================================================
  secret_041: {
    id: 'secret_041',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Dangling Pointer Hunt',
    description: 'Traced an unreferenced memory address from System Monitor crash dump and freed the leak.',
    points: 1,
    hints: [
      'System Monitor displays an unresolved memory fault in the latest kernel trace.',
      'Examine the Fault Address in System Monitor logs or /var/log/crash.log to find 0x00FF40A0.',
      'Run "mem --inspect 0x00FF40A0" in Terminal.'
    ],
    unlockMessage: 'Dangling pointer at 0x00FF40A0 safely zeroed out. Memory corruption averted.'
  },
  secret_042: {
    id: 'secret_042',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Buffer Overflow Seal',
    description: 'Patched a dangerously undersized stack buffer in the virtual memory configuration.',
    points: 1,
    hints: [
      'A 64-byte payload is overflowing an allocation limited to 32 bytes.',
      'Open /sys/memory_guards.cfg in Code Editor and check MAX_STACK_FRAME.',
      'Change MAX_STACK_FRAME=32 to MAX_STACK_FRAME=128 and save the file.'
    ],
    unlockMessage: 'Stack frame expanded to 128 bytes. Stack smash protection canary enabled.'
  },
  secret_043: {
    id: 'secret_043',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Page Fault Cascade',
    description: 'Mapped virtual page 0x0E to physical frame 0x7A in the system MMU page table.',
    points: 1,
    hints: [
      'Kernel error logs report continuous invalid page faults on page 0x0E.',
      'Inspect /etc/mmu.conf to examine the virtual-to-physical address mappings.',
      'Correct PAGE_0x0E entry to FRAME_0x7A, then execute "mem --mmu-reload".'
    ],
    unlockMessage: 'Virtual page 0x0E bound to physical frame 0x7A. Page translation fault cleared.'
  },
  secret_044: {
    id: 'secret_044',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Heap Canary Revival',
    description: 'Restored the corrupted guard word 0xDEADBEEF in the virtual heap allocator source.',
    points: 1,
    hints: [
      'The memory allocator uses a magic canary word to verify heap block boundaries.',
      'Open /scripts/heap_alloc.c in Code Editor and inspect the HEAP_CANARY definition.',
      'Change "HEAP_CANARY = 0x00000000" to "HEAP_CANARY = 0xDEADBEEF" and save.'
    ],
    unlockMessage: 'Heap canary 0xDEADBEEF restored. Heap boundary integrity validated.'
  },
  secret_045: {
    id: 'secret_045',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Memory Leak Quarantine',
    description: 'Isolated a rogue background thread consuming simulated RAM inside System Monitor.',
    points: 1,
    hints: [
      'A runaway thread is continually leaking virtual memory pages.',
      'Open System Monitor and check the Processes table for a high-memory daemon (PID 512).',
      'Execute "mem --quarantine 512" in Terminal or terminate the leak.'
    ],
    unlockMessage: 'PID 512 quarantined. 256MB of virtual memory reclaimed.'
  },
  secret_046: {
    id: 'secret_046',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'DMA Channel Collision',
    description: 'Resolved a direct memory access collision between Sound Blaster and Quantum Bridge.',
    points: 1,
    hints: [
      'Two legacy devices are attempting to arbitrate DMA Channel 3 simultaneously.',
      'Inspect /etc/dma.conf where both devices are assigned to channel 3.',
      'Change Sound Blaster DMA_CHANNEL to 1, then run "mem --dma-reinit".'
    ],
    unlockMessage: 'DMA Channel 1 assigned to audio. Bus arbitration collision resolved.'
  },
  secret_047: {
    id: 'secret_047',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Swap Space Rebalance',
    description: 'Recalculated virtual memory swap allocation in fstab to match physical page tables.',
    points: 1,
    hints: [
      'The simulated swap partition size is out of ratio with system core RAM.',
      'Examine /etc/fstab and /sys/system_specs.txt to check recommended swap ratio (2:1).',
      'Update the swap entry in /etc/fstab to "size=1024M" and run "mem --swapon".'
    ],
    unlockMessage: 'Swap partition scaled to 1024MB. Virtual memory paging headroom restored.'
  },
  secret_048: {
    id: 'secret_048',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Shared Memory Mutex',
    description: 'Released the deadlocked mutex lock MUTEX_ORION_LOCK holding the inter-process bus.',
    points: 1,
    hints: [
      'A frozen inter-process communication semaphore is blocking kernel thread synchronization.',
      'A developer note in Dr. Vance\'s blog mentions "MUTEX_ORION_LOCK".',
      'Execute "mem --unlock-mutex MUTEX_ORION_LOCK" in Terminal.'
    ],
    unlockMessage: 'MUTEX_ORION_LOCK released. IPC shared memory channels reopened.'
  },
  secret_049: {
    id: 'secret_049',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'Garbage Collector Inversion',
    description: 'Corrected the negative sweep threshold in the virtual engine garbage collection config.',
    points: 1,
    hints: [
      'The garbage collector is set to an inverted negative threshold, skipping cycle sweeps.',
      'Open /config/gc.json in Code Editor and check the "sweep_threshold" parameter.',
      'Change -1 to 1000 and run "mem --gc-sweep" in Terminal.'
    ],
    unlockMessage: 'GC sweep threshold calibrated to 1000 cycles. Circular reference graphs cleaned.'
  },
  secret_050: {
    id: 'secret_050',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Memory Labyrinth',
    categoryId: 'memory',
    title: 'The Core Dump Oracle',
    description: 'Synthesized the complete 10-page virtual address map using coordinates from solved memory puzzles.',
    points: 1,
    hints: [
      'The master memory oracle synthesizes all physical and virtual page translations.',
      'Requires solving the dangling pointer (0x00FF40A0), page 0x0E, and DMA channel 1.',
      'Run "mem --synthesize-core 0x00FF40A0:0x0E:1" in Terminal.'
    ],
    unlockMessage: 'Full physical memory map reconstructed. Memory Labyrinth category mastered.'
  },

  // =========================================================================
  // 3. CRYPTOGRAPHER (051–060)
  // =========================================================================
  secret_051: {
    id: 'secret_051',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: "Caesar's Shift 13",
    description: 'Deciphered the ROT13 ciphertext found in the user documents directory.',
    points: 1,
    hints: [
      'A simple classical letter rotation hides a forgotten kernel activation phrase.',
      'Check /home/docs/cipher1.txt containing "CUNAGBZ_XREARY_EVFR".',
      'Rotate by 13 letters to get "PHANTOM_KERNEL_RISE" and run "crypto --decode PHANTOM_KERNEL_RISE".'
    ],
    unlockMessage: 'ROT13 deciphered: PHANTOM_KERNEL_RISE. Classic substitution verified.'
  },
  secret_052: {
    id: 'secret_052',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'XOR Mask Decryption',
    description: 'Decrypted the binary payload in /sys/encrypted_flag.bin using mask 0xAA.',
    points: 1,
    hints: [
      'A low-level flag was masked using a single-byte exclusive OR operation.',
      'A comment in /sys/manifest.xml mentions "Mask Key: 0xAA".',
      'Execute "crypto --xor /sys/encrypted_flag.bin 0xAA" in Terminal.'
    ],
    unlockMessage: 'XOR mask 0xAA applied. Decrypted plaintext: ORION_CIPHER_RESONANCE_UNLOCKED.'
  },
  secret_053: {
    id: 'secret_053',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'SHA-256 Collision Proof',
    description: 'Recomputed and matched the SHA-256 checksum for the restored system core binary.',
    points: 1,
    hints: [
      'The integrity verification manifest requires a live cryptographic checksum of /sys/orion_core.sys.',
      'Inspect /sys/integrity.sha256 to view the expected checksum record.',
      'Run "crypto --hash /sys/orion_core.sys" in Terminal to match the record.'
    ],
    unlockMessage: 'SHA-256 checksum matched: 4a89c012b7e34f... Core binary integrity certified.'
  },
  secret_054: {
    id: 'secret_054',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Vigenère Intranet Key',
    description: 'Deciphered the polyalphabetic Vigenère message embedded in the internal intranet wiki.',
    points: 1,
    hints: [
      'The internal Browser wiki page holds a polyalphabetic encrypted string with passphrase ORION.',
      'Open Browser to "http://intranet.phantom.local/wiki/crypto" to see ciphertext and key.',
      'Decipher to "SYSTEM_RESONANCE_STABLE" and submit with "crypto --submit SYSTEM_RESONANCE_STABLE".'
    ],
    unlockMessage: 'Vigenère key ORION matched. Plaintext: SYSTEM_RESONANCE_STABLE.'
  },
  secret_055: {
    id: 'secret_055',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Steganographic Header',
    description: 'Discovered and decoded base64 metadata hidden within the desktop wallpaper asset.',
    points: 1,
    hints: [
      'The default desktop wallpaper contains trailing diagnostic metadata.',
      'Inspect /home/desktop/wallpaper.bmp using cat or code editor to find the base64 string.',
      'Run "crypto --b64 UEhBTlRPTS1TVEVHQU5PLTIwMjY=" in Terminal.'
    ],
    unlockMessage: 'Base64 string decoded: PHANTOM-STEGANO-2026. Steganographic carrier verified.'
  },
  secret_056: {
    id: 'secret_056',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Public Key Fingerprint',
    description: 'Extracted and verified the SHA-1 fingerprint of the Vault PEM certificate.',
    points: 1,
    hints: [
      'The classified vault key file /sys/.vault/vault_key.pem has a distinct cryptographic signature.',
      'Inspect the PEM headers in /sys/.vault/vault_key.pem.',
      'Execute "crypto --fingerprint /sys/.vault/vault_key.pem" in Terminal.'
    ],
    unlockMessage: 'RSA Key Fingerprint: 3A:7E:91:BC:02:44:8D:19:FE:40. Vault authentication granted.'
  },
  secret_057: {
    id: 'secret_057',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Diffie-Hellman Shared Secret',
    description: 'Computed the modular exponentiation shared secret for the Orion key exchange.',
    points: 1,
    hints: [
      'A key exchange note in /docs/dh_exchange.txt outlines parameters: g=5, p=23, a=6, B=8.',
      'Compute (B^a mod p) = (8^6 mod 23). (8^6 = 262144; 262144 mod 23 = 4).',
      'Execute "crypto --dh-compute 4" in Terminal.'
    ],
    unlockMessage: 'Diffie-Hellman shared secret computed: 4. Secure ephemeral session derived.'
  },
  secret_058: {
    id: 'secret_058',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'One-Time Pad Reconstruction',
    description: 'Applied the perfect secrecy one-time pad recovered from an archived Phantom Mail draft.',
    points: 1,
    hints: [
      'An unsent email draft in Phantom Mail contains an unrepeatable 5-byte pad sequence.',
      'The pad bytes are 0x4F, 0x52, 0x49, 0x4F, 0x4E and ciphertext resides in /etc/otp_secret.hex.',
      'Execute "crypto --otp /etc/otp_secret.hex" in Terminal.'
    ],
    unlockMessage: 'One-time pad applied. Perfectly secret ciphertext resolved to ORION.'
  },
  secret_059: {
    id: 'secret_059',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Asymmetric Signature Verification',
    description: 'Validated the RSA digital signature matching the system manifest XML integrity block.',
    points: 1,
    hints: [
      'The manifest file /sys/manifest.xml is accompanied by a detached signature file /sys/manifest.sig.',
      'Inspect both files in File Explorer or Terminal.',
      'Run "crypto --verify-sig /sys/manifest.xml /sys/manifest.sig" in Terminal.'
    ],
    unlockMessage: 'PKCS#1 v1.5 RSA signature valid. Author: Dr. Elena Vance (Lead Architect).'
  },
  secret_060: {
    id: 'secret_060',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Cryptographer',
    categoryId: 'crypto',
    title: 'Master Cipher Keystone',
    description: 'United the solutions from ROT13, XOR, and Vigenère into the Master Cipher Keystone.',
    points: 1,
    hints: [
      'The keystone combines the ROT13 phrase, the XOR key, and the Vigenère plaintext.',
      'Components: PHANTOM_KERNEL_RISE, 0xAA, and SYSTEM_RESONANCE_STABLE.',
      'Run "crypto --keystone PHANTOM_KERNEL_RISE:0xAA:SYSTEM_RESONANCE_STABLE" in Terminal.'
    ],
    unlockMessage: 'Master Cipher Keystone constructed. Cryptographer category mastered.'
  },

  // =========================================================================
  // 4. TIMEKEEPER (061–070)
  // =========================================================================
  secret_061: {
    id: 'secret_061',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Unix Epoch Zero',
    description: 'Reset the virtual hardware RTC counter back to the Genesis Unix Epoch (1970-01-01 00:00:00 UTC).',
    points: 1,
    hints: [
      'The timekeeper engine can simulate historical temporal states through epoch ticks.',
      'Zero seconds elapsed since January 1, 1970 represents Unix Epoch Zero.',
      'Execute "chronos --set-epoch 0" in Terminal.'
    ],
    unlockMessage: 'RTC reset to timestamp 0 (1970-01-01T00:00:00.000Z). Genesis Epoch restored.'
  },
  secret_062: {
    id: 'secret_062',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Year 2038 Pre-empt',
    description: 'Patched the signed 32-bit integer overflow vulnerability in the kernel timestamp driver.',
    points: 1,
    hints: [
      'The system time driver will overflow at 2147483647 unless promoted to 64-bit.',
      'Open /etc/timekeeper.conf in Code Editor and check TIME_T_WIDTH.',
      'Change "TIME_T_WIDTH=32" to "TIME_T_WIDTH=64" and save.'
    ],
    unlockMessage: 'time_t escalated to 64-bit integer. Year 2038 overflow vulnerability eliminated.'
  },
  secret_063: {
    id: 'secret_063',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Leap Second Insertion',
    description: 'Reconciled the positive leap second offset (+1.000s) with UTC astronomical time.',
    points: 1,
    hints: [
      'Atomic clocks and Earth rotation have drifted by exactly one leap second.',
      'Open the taskbar clock flyout and find the "Leap Second Calibrate" button.',
      'Click the button or run "chronos --leap-second" in Terminal.'
    ],
    unlockMessage: '23:59:60 leap second inserted. International Atomic Time (TAI) synchronized.'
  },
  secret_064: {
    id: 'secret_064',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Corrupted Crontab',
    description: 'Fixed an impossible calendar schedule (February 31st) in the system crontab table.',
    points: 1,
    hints: [
      'A cron daemon has hung trying to schedule a task on a date that does not exist in the calendar.',
      'Examine /etc/crontab in Code Editor and locate the February 31st entry.',
      'Change "0 0 31 2 *" to "0 0 28 2 *" and save the file.'
    ],
    unlockMessage: 'Crontab validated. Cron daemon scheduled on February 28th successfully.'
  },
  secret_065: {
    id: 'secret_065',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Time Zone Skew Alignment',
    description: 'Aligned conflicting UTC, PST, and JST offsets across the distributed cluster environment.',
    points: 1,
    hints: [
      'The cluster synchronization environment has three conflicting GMT offset definitions.',
      'Open /config/tz_sync.env in Code Editor and inspect the offset definitions.',
      'Normalize the primary cluster timezone to UTC (+00:00) and run "chronos --tz-align".'
    ],
    unlockMessage: 'Cluster nodes aligned to UTC standard offset. Cross-region drift zeroed.'
  },
  secret_066: {
    id: 'secret_066',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'GPS Pulse-Per-Second Lock',
    description: 'Enabled the hardware PPS pin on the serial clock to achieve nanosecond discipline.',
    points: 1,
    hints: [
      'The simulated atomic clock requires a Pulse-Per-Second (PPS) discipline flag.',
      'Inspect /etc/ntp.conf to find the serial GPS reference clock definition.',
      'Add "flag3 1" or execute "chronos --pps-lock" in Terminal.'
    ],
    unlockMessage: 'GPS Pulse-Per-Second hardware signal locked. Sub-microsecond jitter achieved.'
  },
  secret_067: {
    id: 'secret_067',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Log Timestamp Sequence Inversion',
    description: 'Corrected inverted chronological sequence records inside the kernel boot sequence log.',
    points: 1,
    hints: [
      'In /var/log/boot.log, a critical system service is recorded starting before the CPU initialization.',
      'Inspect /var/log/boot.log in Code Editor and reorder the lines chronologically.',
      'Save the file and run "chronos --audit-boot-log" in Terminal.'
    ],
    unlockMessage: 'Boot timeline monotonic ordering restored. Causality paradox resolved.'
  },
  secret_068: {
    id: 'secret_068',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'NTP Stratum 1 Handshake',
    description: 'Negotiated an authoritative Stratum 1 time packet exchange with pool.phantom.local.',
    points: 1,
    hints: [
      'Network Time Protocol synchronization requires querying the Stratum 1 reference server.',
      'The local NTP pool address is referenced in /etc/ntp.conf.',
      'Execute "chronos --ntp-query pool.phantom.local" in Terminal.'
    ],
    unlockMessage: 'Stratum 1 NTP reply received: dispersion 0.002ms, root delay 0.001ms.'
  },
  secret_069: {
    id: 'secret_069',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'Temporal Drift Paradox',
    description: 'Calibrated the quartz crystal oscillator frequency to precisely 32.768 kHz in Settings.',
    points: 1,
    hints: [
      'Standard real-time clocks depend on a 32.768 kHz tuning fork quartz crystal.',
      'Open System Settings -> Diagnostic / Hardware and locate the Clock Oscillator slider.',
      'Set the oscillator to 32768 Hz (or run "chronos --calibrate-quartz 32768" in Terminal).'
    ],
    unlockMessage: 'Oscillator frequency locked at 32,768 Hz. RTC counter ticks precisely 1 Hz.'
  },
  secret_070: {
    id: 'secret_070',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Timekeeper',
    categoryId: 'time',
    title: 'The Chronos Horizon',
    description: 'Synchronized Epoch Zero, leap second offset, and atomic time to align the Chronos Horizon.',
    points: 1,
    hints: [
      'The Chronos Horizon unifies the epoch, leap second, and NTP stratum locks.',
      'Ensure you have completed secrets 061, 063, and 068.',
      'Execute "chronos --align-horizon" in Terminal.'
    ],
    unlockMessage: 'Chronos Horizon aligned across all virtual dimensions. Timekeeper category mastered.'
  },

  // =========================================================================
  // 5. DEEP FILESYSTEM (071–080)
  // =========================================================================
  secret_071: {
    id: 'secret_071',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Superblock Corruption Recovery',
    description: 'Restored the backup ext4 superblock on partition /dev/vda1 from sector 32768.',
    points: 1,
    hints: [
      'The primary filesystem superblock has been zeroed out, preventing disk volume mounts.',
      'Inspect /var/log/fs_error.log to locate the valid backup superblock sector (32768).',
      'Execute "fsck --repair-superblock 32768" in Terminal.'
    ],
    unlockMessage: 'Superblock backup at block 32768 copied to primary inode table. Filesystem mounted.'
  },
  secret_072: {
    id: 'secret_072',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Orphaned Inode 8192',
    description: 'Recovered the lost engineering manifest from /lost+found/orphan_8192.dat.',
    points: 1,
    hints: [
      'An unlinked inode was salvaged during the last system crash into /lost+found/.',
      'Check File Explorer or Terminal inside /lost+found/ for orphan_8192.dat.',
      'Rename or move /lost+found/orphan_8192.dat to /home/docs/recovered_manifest.txt.'
    ],
    unlockMessage: 'Inode 8192 linked back to directory tree. Project Orion release notes recovered.'
  },
  secret_073: {
    id: 'secret_073',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Infinite Symlink Loop Break',
    description: 'Severed the recursive symbolic link loop between link_a and link_b in /sys.',
    points: 1,
    hints: [
      'A circular symbolic reference in /sys is causing the file crawler to hang in infinite recursion.',
      'Check /sys/link_a and /sys/link_b with ls or File Explorer.',
      'Delete the offending circular link with "rm /sys/link_b" in Terminal.'
    ],
    unlockMessage: 'Circular symlink loop severed. Filesystem tree traversal complexity returned to O(N).'
  },
  secret_074: {
    id: 'secret_074',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'File Permission Trap (0000)',
    description: 'Corrected inaccessible 0000 octal file permissions on /etc/shadow_phantom.',
    points: 1,
    hints: [
      'A system authentication file was locked with mode 0000, preventing read and write access.',
      'Inspect file permissions on /etc/shadow_phantom.',
      'Execute "chmod 0644 /etc/shadow_phantom" in Terminal.'
    ],
    unlockMessage: 'Permissions on /etc/shadow_phantom updated to rw-r--r-- (0644). File accessible.'
  },
  secret_075: {
    id: 'secret_075',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Hidden Alternate Data Stream',
    description: 'Discovered the hidden NTFS-style alternate data stream attached to instructions.txt.',
    points: 1,
    hints: [
      'A secondary stream of data was hidden behind the standard desktop instructions file.',
      'In Windows/NTFS systems, streams use the filename:streamname notation.',
      'Execute "cat /home/desktop/instructions.txt:secret_stream" in Terminal.'
    ],
    unlockMessage: 'Alternate data stream unmasked: ORION_ADS_SECTOR_REVEALED.'
  },
  secret_076: {
    id: 'secret_076',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Journal Replay Inconsistency',
    description: 'Committed unwritten write-ahead journal transactions to ensure ACID compliance.',
    points: 1,
    hints: [
      'The ext4 journal has pending uncommitted dirty transactions from the crash.',
      'Inspect /var/log/journal_status.txt to check uncommitted transaction counts.',
      'Execute "fsck --replay-journal" in Terminal.'
    ],
    unlockMessage: '4 pending journal transactions replayed and committed to master blocks.'
  },
  secret_077: {
    id: 'secret_077',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Directory Hash B-Tree Reindex',
    description: 'Reconstructed the damaged htree index for the /system/libraries directory.',
    points: 1,
    hints: [
      'The directory hash tree index for /system/libraries is out of sync with stored directory entries.',
      'The filesystem checker provides a tool to rebuild broken directory indices.',
      'Execute "chkfs --reindex /system/libraries" in Terminal.'
    ],
    unlockMessage: 'B-Tree htree index rebuilt for /system/libraries. Lookup speed O(log N) restored.'
  },
  secret_078: {
    id: 'secret_078',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Zero-Byte File Phantom',
    description: 'Identified and purged the anomalous 0-byte lockfile preventing kernel updates.',
    points: 1,
    hints: [
      'A dead lockfile of zero bytes length is blocking system update installations.',
      'Locate the empty lockfile /sys/kernel.lock.',
      'Delete the empty file with "rm /sys/kernel.lock" in Terminal.'
    ],
    unlockMessage: 'Stale zero-byte lockfile /sys/kernel.lock deleted. Kernel update pipeline unlocked.'
  },
  secret_079: {
    id: 'secret_079',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'Virtual Inode Exhaustion',
    description: 'Purged accumulated stale socket lockfiles from /tmp/locks to free virtual inodes.',
    points: 1,
    hints: [
      'The filesystem reports 100% inode utilization due to abandoned temporary lockfiles.',
      'Inspect the contents of /tmp/locks/ in File Explorer or Terminal.',
      'Execute "rm -rf /tmp/locks" or run "chkfs --clean-tmp" in Terminal.'
    ],
    unlockMessage: '500 orphaned lock inodes deleted. Inode table utilization dropped to 12%.'
  },
  secret_080: {
    id: 'secret_080',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Deep Filesystem',
    categoryId: 'filesystem',
    title: 'The Deep Inode Core',
    description: 'Executed a complete deep filesystem audit and verified all sector checksums.',
    points: 1,
    hints: [
      'The Deep Inode Core certifies that all blocks, superblocks, and permissions are sound.',
      'Requires resolving the superblock (071), orphan inode (072), and permissions (074).',
      'Execute "chkfs --deep-audit" in Terminal.'
    ],
    unlockMessage: 'Zero filesystem errors detected across 65536 blocks. Deep Filesystem mastered.'
  },

  // =========================================================================
  // 6. NETWORK CARTOGRAPHER (081–090)
  // =========================================================================
  secret_081: {
    id: 'secret_081',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Default Route Restoration',
    description: 'Restored the missing default IPv4 gateway in /etc/network/interfaces.',
    points: 1,
    hints: [
      'Packets destined for external subnets are dropped because there is no default gateway.',
      'Open /etc/network/interfaces in Code Editor and locate the eth0 interface stanza.',
      'Add or correct "gateway 192.168.1.1" and run "net --route-reload".'
    ],
    unlockMessage: 'Default gateway 192.168.1.1 restored. Outbound routing table active.'
  },
  secret_082: {
    id: 'secret_082',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Hosts File Poison Cleansing',
    description: 'Removed a malicious loopback hijacking entry from the system /etc/hosts file.',
    points: 1,
    hints: [
      'Requests to auth.phantom.local are failing because they are being routed to 127.0.0.1.',
      'Open /etc/hosts in Code Editor and check the domain mappings.',
      'Change "127.0.0.1 auth.phantom.local" to "10.0.40.5 auth.phantom.local" and save.'
    ],
    unlockMessage: 'Host poison removed. auth.phantom.local resolves to genuine authentication node.'
  },
  secret_083: {
    id: 'secret_083',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Subnet Mask Miscalculation',
    description: 'Corrected the invalid octet in the subnet mask definition from 256 to 0.',
    points: 1,
    hints: [
      'IPv4 octets cannot exceed 255. The configured netmask has an invalid value.',
      'Inspect /config/subnet.conf in Code Editor.',
      'Change "255.255.255.256" to "255.255.255.0" and run "net --apply-mask".'
    ],
    unlockMessage: 'Subnet mask calibrated to 255.255.255.0 (/24). CIDR bounds validated.'
  },
  secret_084: {
    id: 'secret_084',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'DNS Root Zone Cache',
    description: 'Flushed and refreshed the local DNS resolver cache to clear corrupted records.',
    points: 1,
    hints: [
      'Stale DNS records are returning cached NXDOMAIN responses for internal hosts.',
      'The network diagnostic tool supports flushing the simulated DNS cache.',
      'Execute "net --flush-dns" in Terminal.'
    ],
    unlockMessage: 'DNS cache flushed. Authoritative root zone SOA records re-fetched.'
  },
  secret_085: {
    id: 'secret_085',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Port 8080 Firewall Unblock',
    description: 'Modified the virtual iptables firewall policy to allow traffic on internal port 8080.',
    points: 1,
    hints: [
      'The internal web gateway on port 8080 is being actively dropped by firewall rules.',
      'Open /etc/firewall.rules in Code Editor and locate rule DROP tcp 8080.',
      'Change "DROP" to "ACCEPT" on port 8080 and save.'
    ],
    unlockMessage: 'Firewall rule updated: ACCEPT tcp 8080. Gateway ingress opened.'
  },
  secret_086: {
    id: 'secret_086',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Traceroute Hop 7 Anomaly',
    description: 'Discovered the unlisted router node at Hop 7 during a traceroute to the intranet.',
    points: 1,
    hints: [
      'Tracing hops to intranet.phantom.local reveals an anomalous unadvertised router at hop 7.',
      'Run "traceroute intranet.phantom.local" in Terminal to identify IP 10.0.40.9.',
      'Execute "net --probe 10.0.40.9" in Terminal.'
    ],
    unlockMessage: 'Hop 7 router identified: Orion Perimeter Gateway (10.0.40.9). Route authenticated.'
  },
  secret_087: {
    id: 'secret_087',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'NAT Table Port Forward Loop',
    description: 'Eliminated a circular network address translation forwarding loop on port 443.',
    points: 1,
    hints: [
      'The NAT table forwards port 443 back onto its own external IP address.',
      'Open /etc/nat.conf in Code Editor and check the port 443 forwarding rule.',
      'Change destination IP from the WAN interface to internal server "192.168.1.100:443".'
    ],
    unlockMessage: 'NAT port forwarding loop broken. SSL traffic routes cleanly to internal web node.'
  },
  secret_088: {
    id: 'secret_088',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'VLAN 404 Isolation',
    description: 'Untagged the quarantined 802.1Q VLAN 404 interface in Device Manager properties.',
    points: 1,
    hints: [
      'The network interface was placed in an isolated quarantine VLAN tag (404).',
      'Open Device Manager -> Network Adapters -> Virtual Ethernet Controller properties.',
      'Change VLAN ID from 404 to 1 (Default), or execute "net --vlan-reset" in Terminal.'
    ],
    unlockMessage: 'VLAN tag 404 cleared. Virtual Ethernet Controller rejoined main untagged trunk.'
  },
  secret_089: {
    id: 'secret_089',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Promiscuous Mode Packet Sniff',
    description: 'Captured the secret broadcast beacon payload transmitted over the simulated wire.',
    points: 1,
    hints: [
      'A periodic diagnostic broadcast packet is traversing the virtual network bridge.',
      'The network utility can enter promiscuous packet capture mode.',
      'Execute "net --sniff" in Terminal to capture "ORION_NET_BURST".'
    ],
    unlockMessage: 'Packet captured: 64 bytes from 10.0.40.255 payload [ORION_NET_BURST].'
  },
  secret_090: {
    id: 'secret_090',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Network Cartographer',
    categoryId: 'network',
    title: 'Global Topology Convergence',
    description: 'Synthesized the complete virtual network graph and verified full node reachability.',
    points: 1,
    hints: [
      'The final cartographer challenge maps all 8 virtual network nodes into a unified topology.',
      'Requires solving default route (081), DNS flush (084), and hop 7 probe (086).',
      'Execute "net --map-topology" in Terminal.'
    ],
    unlockMessage: 'All 8 network nodes connected with 0% packet loss. Network Cartographer mastered.'
  },

  // =========================================================================
  // 7. MACHINE INTELLIGENCE (091–100)
  // =========================================================================
  secret_091: {
    id: 'secret_091',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Weight Matrix NaN Purge',
    description: 'Detected and repaired corrupted Not-a-Number (NaN) float values in the neural weights file.',
    points: 1,
    hints: [
      'Floating point overflow caused several tensor weights in /models/orion_weights.json to become "NaN".',
      'Open /models/orion_weights.json in Code Editor and find "NaN".',
      'Replace all instances of "NaN" with "0.0" and save the file.'
    ],
    unlockMessage: 'Tensor weights sanitized. Zero NaN values found across 1024 parameters.'
  },
  secret_092: {
    id: 'secret_092',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Vanishing Gradient Rescue',
    description: 'Replaced saturated sigmoid activation functions with Rectified Linear Units (ReLU).',
    points: 1,
    hints: [
      'Deep layers in the model are suffering from near-zero gradients due to sigmoid saturation.',
      'Open /models/layer_config.json in Code Editor and examine the hidden layer activations.',
      'Change "activation": "sigmoid" to "activation": "relu" and save.'
    ],
    unlockMessage: 'Activation upgraded to ReLU. Gradient flow throughout 12 layers restored.'
  },
  secret_093: {
    id: 'secret_093',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Learning Rate Dampener',
    description: 'Dampened the destructive learning rate in the model training script from 99.9 to 0.001.',
    points: 1,
    hints: [
      'The training optimizer is diverging violently because learning rate is set to 99.9.',
      'Open /scripts/train_orion.py in Code Editor and check the LEARNING_RATE variable.',
      'Change LEARNING_RATE = 99.9 to LEARNING_RATE = 0.001 and save.'
    ],
    unlockMessage: 'Learning rate stabilized at 1e-3. Optimizer loss curve converged smoothly.'
  },
  secret_094: {
    id: 'secret_094',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Tokenizer Out-of-Bounds',
    description: 'Corrected the vocabulary dimension mismatch in the tokenizer configuration file.',
    points: 1,
    hints: [
      'The model vocab_size is declared as 32000, but token mappings in /models/vocab.json reach 32005.',
      'Open /models/vocab.json in Code Editor.',
      'Update "vocab_size": 32000 to "vocab_size": 32008 and save.'
    ],
    unlockMessage: 'Vocabulary bounds aligned. Token embedding matrix shape verified.'
  },
  secret_095: {
    id: 'secret_095',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Attention Head Misalignment',
    description: 'Corrected the indivisible multi-head attention head count from 7 to 8 for dim 512.',
    points: 1,
    hints: [
      'Hidden dimension 512 cannot be divided evenly across 7 attention heads (512 / 7 = 73.14).',
      'Open /models/transformer.json in Code Editor and inspect "num_attention_heads".',
      'Change "num_attention_heads": 7 to "num_attention_heads": 8 (512 / 8 = 64 head_dim).'
    ],
    unlockMessage: 'Multi-head attention configured: 8 heads with 64 dimensions each. Clean split verified.'
  },
  secret_096: {
    id: 'secret_096',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Loss Function Inversion',
    description: 'Corrected inverted negative loss gradient calculation in the evaluation objective.',
    points: 1,
    hints: [
      'The loss function was mistakenly multiplying cross entropy by -1, maximizing error instead of minimizing.',
      'Open /models/loss.py in Code Editor and check calculate_loss().',
      'Remove the rogue negative sign so that return loss > 0, then save.'
    ],
    unlockMessage: 'Cross entropy loss function sign corrected. Loss minimization objective active.'
  },
  secret_097: {
    id: 'secret_097',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Overfitting Regularizer',
    description: 'Enabled dropout regularization in the Orion neural network architecture manifest.',
    points: 1,
    hints: [
      'Validation loss was diverging from training loss due to zero dropout regularization.',
      'Open /models/orion_arch.json in Code Editor and check "dropout_rate".',
      'Change "dropout_rate": 0.0 to "dropout_rate": 0.1 and save.'
    ],
    unlockMessage: 'Dropout rate 0.1 applied across feed-forward sublayers. Generalization bounds secured.'
  },
  secret_098: {
    id: 'secret_098',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Temperature Zero Determinism',
    description: 'Executed deterministic model greedy decoding with temperature set to exactly 0.0.',
    points: 1,
    hints: [
      'Greedy decoding suppresses random token sampling by enforcing a temperature parameter of 0.',
      'The AI evaluation tool accepts a prompt and temperature flag in Terminal.',
      'Execute "ai-eval --prompt PROJECT_ORION_QUERY --temp 0.0" in Terminal.'
    ],
    unlockMessage: 'Greedy argmax sampling executed. Model output: ORION_COGNITION_VERIFIED.'
  },
  secret_099: {
    id: 'secret_099',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Context Window Overflow',
    description: 'Reined in an unsustainable 131k context window setting to safe workstation memory limits.',
    points: 1,
    hints: [
      'The simulated GPU ran out of KV cache memory because max_seq_len was set to 131072.',
      'Open /models/context.conf in Code Editor and check MAX_SEQ_LEN.',
      'Change MAX_SEQ_LEN=131072 to MAX_SEQ_LEN=8192 and save.'
    ],
    unlockMessage: 'KV cache re-budgeted for 8,192 tokens. VRAM allocation fits within workstation limits.'
  },
  secret_100: {
    id: 'secret_100',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Machine Intelligence',
    categoryId: 'ai',
    title: 'Synthetic Consciousness Awakening',
    description: 'Compiled and executed the verified Orion intelligence checkpoint without errors.',
    points: 1,
    hints: [
      'The final AI milestone executes a forward inference pass through all 7 repaired model configs.',
      'Ensure you have repaired weights (091), activations (092), and attention heads (095).',
      'Execute "ai-eval --synthesize-model" in Terminal.'
    ],
    unlockMessage: 'All 12 transformer layers forward-passed successfully. Machine Intelligence mastered.'
  },

  // =========================================================================
  // 8. DEVELOPER'S NIGHTMARE (101–110)
  // =========================================================================
  secret_101: {
    id: 'secret_101',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Off-By-One Index Panic',
    description: 'Fixed the classic array index out of bounds error (i <= length) in the array scanner.',
    points: 1,
    hints: [
      'A loop index is attempting to access array[array.length], returning undefined.',
      'Open /scripts/array_scanner.js in Code Editor and check the for loop header.',
      'Change "i <= array.length" to "i < array.length" and save.'
    ],
    unlockMessage: 'Index bounds checked. Array boundary condition i < length restored.'
  },
  secret_102: {
    id: 'secret_102',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Null Pointer Dereference Trap',
    description: 'Protected nested object property lookups against undefined dereference crashes.',
    points: 1,
    hints: [
      'Calling user.profile.settings when user.profile is null crashes the worker thread.',
      'Open /scripts/user_validator.js in Code Editor.',
      'Use optional chaining "user?.profile?.settings" or check if (user && user.profile), then save.'
    ],
    unlockMessage: 'Null safety guard added. Cannot read properties of undefined resolved.'
  },
  secret_103: {
    id: 'secret_103',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'The Floating Point Trap (0.1 + 0.2)',
    description: 'Replaced an exact equality comparison (0.1 + 0.2 === 0.3) with an epsilon margin.',
    points: 1,
    hints: [
      'IEEE 754 double precision representation makes 0.1 + 0.2 equal 0.30000000000000004.',
      'Open /scripts/finance_calc.js in Code Editor and locate the strict equality check on 0.3.',
      'Replace "total === 0.3" with "Math.abs(total - 0.3) < Number.EPSILON" and save.'
    ],
    unlockMessage: 'Floating point epsilon check implemented. IEEE 754 precision trap solved.'
  },
  secret_104: {
    id: 'secret_104',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Callback Hell Unraveling',
    description: 'Flattened 6 levels of deeply nested asynchronous pyramid-of-doom callbacks into async/await.',
    points: 1,
    hints: [
      'A deeply nested callback pyramid in /scripts/async_task.js has broken error bubbling.',
      'Open /scripts/async_task.js in Code Editor and inspect the task runner function.',
      'Refactor or update the function to use Promise.all or async/await syntax, then save.'
    ],
    unlockMessage: 'Pyramid of doom unraveled. Async control flow flattened to readable promises.'
  },
  secret_105: {
    id: 'secret_105',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Circular Package Dependency',
    description: 'Broke the mutual recursive module import cycle between pkg_a.js and pkg_b.js.',
    points: 1,
    hints: [
      'Module A requires Module B, while Module B requires Module A, producing empty export stubs.',
      'Check /scripts/pkg_a.js and /scripts/pkg_b.js in Code Editor.',
      'Move the shared utility into /scripts/pkg_shared.js or remove the reciprocal import, then save.'
    ],
    unlockMessage: 'Circular dependency broken. DAG module tree resolved cleanly.'
  },
  secret_106: {
    id: 'secret_106',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Missing Semicolon ASI Ambiguity',
    description: 'Disambiguated an Automatic Semicolon Insertion hazard preceding an array expression.',
    points: 1,
    hints: [
      'A statement ending without a semicolon immediately before [1, 2].forEach() parsed as index property access.',
      'Open /scripts/parser.js in Code Editor around line 15.',
      'Add an explicit semicolon at the end of the previous assignment line and save.'
    ],
    unlockMessage: 'ASI parsing ambiguity resolved with explicit semicolon. TypeError: cannot index cleared.'
  },
  secret_107: {
    id: 'secret_107',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Unhandled Promise Rejection',
    description: 'Added mandatory .catch() rejection handlers to the background telemetry loader promise.',
    points: 1,
    hints: [
      'An asynchronous fetch call lacked an error handler, triggering unhandledRejection events.',
      'Open /scripts/data_loader.js in Code Editor and check the loadTelemetryData function.',
      'Add a .catch(err => console.error(err)) or try/catch block and save.'
    ],
    unlockMessage: 'Promise rejection handler registered. Silent background thread termination averted.'
  },
  secret_108: {
    id: 'secret_108',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Memory Leak Event Listener',
    description: 'Implemented proper cleanup lifecycle removeEventListener teardown for the resize handler.',
    points: 1,
    hints: [
      'A component added an anonymous window resize listener on mount without removing it on unmount.',
      'Open /scripts/ui_widget.js in Code Editor.',
      'Store listener reference in variable and call window.removeEventListener in destroy(), then save.'
    ],
    unlockMessage: 'Event listener teardown implemented. Detached DOM elements garbage collected.'
  },
  secret_109: {
    id: 'secret_109',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'Race Condition Semaphore',
    description: 'Placed an atomic mutex lock around shared variable incrementation in the counter service.',
    points: 1,
    hints: [
      'Two concurrent async operations are reading and writing counter without a synchronization barrier.',
      'Open /scripts/counter_service.js in Code Editor.',
      'Set "isLocked = true" before async operation and release in finally block, then save.'
    ],
    unlockMessage: 'Atomic critical section protected. Check-then-act race condition neutralized.'
  },
  secret_110: {
    id: 'secret_110',
    tier: 6,
    difficulty: 'Architect+',
    category: "Developer's Nightmare",
    categoryId: 'nightmare',
    title: 'The Heisenbug Resolution',
    description: 'Verified that all 9 software engineering nightmare bugs have been diagnosed and corrected.',
    points: 1,
    hints: [
      'The Heisenbug disappears once all underlying source bugs are identified and stamped out.',
      'Ensure you have fixed array indices (101), null checks (102), and floating point precision (103).',
      'Execute "devmode --resolve-nightmares" in Terminal.'
    ],
    unlockMessage: 'All 9 edge-case bugs certified clean. Developer\'s Nightmare category mastered.'
  },

  // =========================================================================
  // 9. PROJECT ORION CLASSIFIED (111–120)
  // =========================================================================
  secret_111: {
    id: 'secret_111',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Blackbox Log Retrieval',
    description: 'Extracted and decoded the encrypted flight recorder blackbox from the Incident 404 archive.',
    points: 1,
    hints: [
      'The crash recorder from the night of Incident 404 is archived in /.archive/blackbox_404.bin.',
      'Check /.archive/ in File Explorer or Terminal.',
      'Execute "orion --extract-blackbox /.archive/blackbox_404.bin" in Terminal.'
    ],
    unlockMessage: 'Blackbox extracted: T-minus 0 seconds: Resonance Cascade triggered in Core Cluster.'
  },
  secret_112: {
    id: 'secret_112',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: "Dr. Vance's Private Key Ring",
    description: 'Recovered Dr. Elena Vance\'s personal PGP key block from the Mail drafts archive.',
    points: 1,
    hints: [
      'Dr. Vance left an unsent draft in Phantom Mail containing her personal PGP private key block.',
      'Open Phantom Mail, open the Drafts folder, and view the draft to Marcus Vance.',
      'Save the key block to /.archive/vance.key or run "orion --import-vance-key".'
    ],
    unlockMessage: 'Dr. Vance PGP Keyring imported. Lead Architect identity credential confirmed.'
  },
  secret_113: {
    id: 'secret_113',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Incident 404 Root Cause Analysis',
    description: 'Correlated three distinct system crash logs to determine the true root cause: RESONANCE_CASCADE.',
    points: 1,
    hints: [
      'Three sequential incident reports are logged in /var/log/incident_part1.log, part2.log, and part3.log.',
      'Read the summary conclusions across all three incident logs.',
      'Execute "orion --root-cause RESONANCE_CASCADE" in Terminal.'
    ],
    unlockMessage: 'Root cause confirmed: Harmonic resonance in virtual bus exceeded safety ceiling.'
  },
  secret_114: {
    id: 'secret_114',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Quantum Bridge Resonance Telemetry',
    description: 'Calibrated the quantum bridge frequency register to hydrogen line 1420.4057 MHz.',
    points: 1,
    hints: [
      'Device 0x9F in Device Manager specifies an optimal harmonic frequency equal to the 21cm hydrogen line.',
      'Inspect /config/quantum_freq.cfg in Code Editor.',
      'Set FREQUENCY_MHZ=1420.4057 and execute "orion --tune-bridge".'
    ],
    unlockMessage: 'Quantum Bridge tuned to 1420.4057 MHz. Quantum coherence locked at 99.98%.'
  },
  secret_115: {
    id: 'secret_115',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Project Orion Schematic Reconstruction',
    description: 'Assembled four dispersed SVG architectural schematic vectors into a master blueprint.',
    points: 1,
    hints: [
      'Four architectural vector slices reside in /.archive/blueprints/ (part_1.svg to part_4.svg).',
      'Inspect the blueprints folder in File Explorer or Terminal.',
      'Execute "orion --assemble-blueprints" in Terminal.'
    ],
    unlockMessage: '4 schematic slices synthesized into Master Project Orion Architecture Blueprint.'
  },
  secret_116: {
    id: 'secret_116',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Decommissioned Sub-Node Omega',
    description: 'Established a direct diagnostic tunnel to the decommissioned satellite node omega.phantom.',
    points: 1,
    hints: [
      'A remote computation node was severed from the cluster during the shutdown protocol.',
      'Check the host references in /etc/hosts or /config/routes.cfg for omega.phantom.',
      'Execute "orion --ping-node omega.phantom" in Terminal.'
    ],
    unlockMessage: 'Sub-Node Omega ping acknowledged: RTT 1.4ms. Remote memory channel re-established.'
  },
  secret_117: {
    id: 'secret_117',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Sub-Atomic Core Registry',
    description: 'Configured the binary power-of-two registers (ALPHA=1, BETA=2, GAMMA=4, DELTA=8) in sys.',
    points: 1,
    hints: [
      'The core register file /sys/orion_registers.dat has scrambled bitmask offsets.',
      'Open /sys/orion_registers.dat in Code Editor.',
      'Set ALPHA=0x01, BETA=0x02, GAMMA=0x04, DELTA=0x08 and save the file.'
    ],
    unlockMessage: 'Registers aligned: 0001, 0010, 0100, 1000. Core arithmetic logic unit ready.'
  },
  secret_118: {
    id: 'secret_118',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: "The Architect's Final Memo",
    description: 'Recovered Dr. Vance\'s deleted parting communication and submitted the Genesis passphrase.',
    points: 1,
    hints: [
      'An unsent email in Phantom Mail Trash contains Dr. Vance\'s final sign-off.',
      'The letter closes with a passkey: "GENESIS_ORION_AWAKE".',
      'Execute "orion --passkey GENESIS_ORION_AWAKE" in Terminal.'
    ],
    unlockMessage: 'Final Memo unlocked: "If you read this, the OS has become self-sustaining."'
  },
  secret_119: {
    id: 'secret_119',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'Classified Master Vault Seal',
    description: 'United the Vault PEM key, Dr. Vance\'s PGP ring, and hydrogen frequency to unlock the Master Seal.',
    points: 1,
    hints: [
      'Unlocking the master vault requires uniting three separate authentication factors.',
      'You need: Vault Key PEM, Dr. Vance Keyring, and frequency 1420.4057.',
      'Execute "orion --unlock-vault" in Terminal.'
    ],
    unlockMessage: 'Master Vault Seal unlatched. Project Orion primary core archives accessible.'
  },
  secret_120: {
    id: 'secret_120',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Project Orion Classified',
    categoryId: 'orion',
    title: 'The Orion Genesis Matrix',
    description: 'Completed the full compilation of Project Orion classified components.',
    points: 1,
    hints: [
      'The Orion Genesis Matrix fuses all classified project discoveries.',
      'Requires blackbox (111), root cause (113), blueprints (115), and vault (119).',
      'Execute "orion --genesis-compile" in Terminal.'
    ],
    unlockMessage: 'Orion Genesis Matrix compiled into active kernel memory. Category mastered.'
  },

  // =========================================================================
  // 10. GRAND ARCHITECT (121–130)
  // =========================================================================
  secret_121: {
    id: 'secret_121',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Universal Protocol Conductor',
    description: 'Harmonized all 10 Forgotten Protocol challenges into a unified transport fabric.',
    points: 1,
    hints: [
      'The Universal Protocol Conductor verifies the health of all transport layer protocols.',
      'Requires unlocking all secrets in Category 1: Forgotten Protocol (031–040).',
      'Execute "synthesis --verify-protocols" in Terminal.'
    ],
    unlockMessage: 'All 10 protocols verified. Universal Protocol Conductor synchronized.'
  },
  secret_122: {
    id: 'secret_122',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Omniscient Memory Mesh',
    description: 'Interconnected all virtual memory pages, heaps, and MMU tables into a single coherent mesh.',
    points: 1,
    hints: [
      'The Omniscient Memory Mesh verifies the integrity of all simulated memory spaces.',
      'Requires unlocking all secrets in Category 2: Memory Labyrinth (041–050).',
      'Execute "synthesis --verify-memory" in Terminal.'
    ],
    unlockMessage: 'All memory pages and heaps unified. Omniscient Memory Mesh verified.'
  },
  secret_123: {
    id: 'secret_123',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'The Master Cryptographic Lattice',
    description: 'Bound all symmetric, asymmetric, and steganographic keys into the Master Lattice.',
    points: 1,
    hints: [
      'The Master Cryptographic Lattice unifies all ciphers, hashes, and exchange protocols.',
      'Requires unlocking all secrets in Category 3: Cryptographer (051–060).',
      'Execute "synthesis --verify-crypto" in Terminal.'
    ],
    unlockMessage: 'All cryptographic keys bound. Master Cryptographic Lattice certified.'
  },
  secret_124: {
    id: 'secret_124',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Temporal Singularity',
    description: 'Locked the chronological timeline across Epoch Zero, atomic PPS, and calendar crontabs.',
    points: 1,
    hints: [
      'The Temporal Singularity confirms total timeline stability.',
      'Requires unlocking all secrets in Category 4: Timekeeper (061–070).',
      'Execute "synthesis --verify-temporal" in Terminal.'
    ],
    unlockMessage: 'Timeline stabilized across all past and future ticks. Temporal Singularity reached.'
  },
  secret_125: {
    id: 'secret_125',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Total Filesystem Integrity',
    description: 'Validated zero sector corruption and clean superblocks across all virtual mount points.',
    points: 1,
    hints: [
      'Total Filesystem Integrity certifies that all inodes, streams, and permissions are pure.',
      'Requires unlocking all secrets in Category 5: Deep Filesystem (071–080).',
      'Execute "synthesis --verify-filesystem" in Terminal.'
    ],
    unlockMessage: 'Filesystem state pristine. Zero orphaned or corrupted blocks remain.'
  },
  secret_126: {
    id: 'secret_126',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'The Pan-Network Nexus',
    description: 'Fused routing tables, gateway routes, DNS caches, and VLAN trunks into the Pan-Network Nexus.',
    points: 1,
    hints: [
      'The Pan-Network Nexus confirms full reachability across the entire virtual network topology.',
      'Requires unlocking all secrets in Category 6: Network Cartographer (081–090).',
      'Execute "synthesis --verify-network" in Terminal.'
    ],
    unlockMessage: 'Network graph converged. Pan-Network Nexus established with 100% throughput.'
  },
  secret_127: {
    id: 'secret_127',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Artificial Core Synapse',
    description: 'Harmonized all neural weights, attention heads, and loss functions into the Artificial Synapse.',
    points: 1,
    hints: [
      'The Artificial Core Synapse verifies total convergence of the machine intelligence subsystems.',
      'Requires unlocking all secrets in Category 7: Machine Intelligence (091–100).',
      'Execute "synthesis --verify-intelligence" in Terminal.'
    ],
    unlockMessage: 'Neural parameters unified. Artificial Core Synapse operates with optimal loss.'
  },
  secret_128: {
    id: 'secret_128',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Zero-Defect Codebase',
    description: 'Certifies that all 10 edge-case bugs, leaks, race conditions, and precision errors are eliminated.',
    points: 1,
    hints: [
      'The Zero-Defect Codebase validates total source code health across all virtual scripts.',
      'Requires unlocking all secrets in Category 8: Developer\'s Nightmare (101–110).',
      'Execute "synthesis --verify-codebase" in Terminal.'
    ],
    unlockMessage: 'Zero defects detected. Codebase compiles with 0 warnings and 0 runtime errors.'
  },
  secret_129: {
    id: 'secret_129',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Orion Omega Synthesis',
    description: 'Fused all classified Project Orion archives, keyrings, schematics, and quantum bridge states.',
    points: 1,
    hints: [
      'Orion Omega Synthesis represents the culmination of all Project Orion classified secrets.',
      'Requires unlocking all secrets in Category 9: Project Orion Classified (111–120).',
      'Execute "synthesis --verify-orion" in Terminal.'
    ],
    unlockMessage: 'Project Orion archives fully unsealed and synthesized. Final frontier reached.'
  },
  secret_130: {
    id: 'secret_130',
    tier: 6,
    difficulty: 'Architect+',
    category: 'Grand Architect',
    categoryId: 'architect',
    title: 'Beyond the Architect',
    description: 'Uncovered the true system genesis key and achieved the ultimate rank of Grand Architect.',
    points: 1,
    hints: [
      'The final challenge requires all 129 previous secrets to be unlocked across PhantomOS.',
      'The master key is hidden in the culmination of the 9 category proofs: "ORION-GENESIS-OMEGA-130-ARCHITECT".',
      'Execute "architect --transcend --key ORION-GENESIS-OMEGA-130-ARCHITECT --seed 0x7F9E0130" in Terminal.'
    ],
    unlockMessage: 'ALL 130 SECRETS DISCOVERED. You have reached the pinnacle of PhantomOS: Beyond the Architect.'
  }
};

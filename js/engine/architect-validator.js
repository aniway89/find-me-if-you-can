/**
 * Find Me If You Can — Architect+ Centralized Validation Engine
 * Handles deterministic evaluation for Secrets 031–130
 */

import { events } from '../core/events.js';
import { state } from '../core/state.js';
import { vfs } from '../core/vfs.js';
import { discoveryEngine } from './discovery-engine.js';
import { architectRegistry } from './architect-registry.js';

class ArchitectValidator {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Listen to filesystem mutations for auto-evaluating repaired configuration files
    events.on('vfs:file-changed', () => this.validateArchitectVFS());
    events.on('vfs:file-renamed', () => this.validateArchitectVFS());
    events.on('vfs:file-deleted', () => this.validateArchitectVFS());

    // App-level events
    events.on('device:inspected', (data) => this.handleDeviceInspected(data));
    events.on('mail:read', (data) => this.handleMailRead(data));
    events.on('browser:navigated', (data) => this.handleBrowserNavigated(data));
    events.on('settings:changed', (data) => this.handleSettingsChanged(data));

    // Periodic check to ensure initial VFS state is checked
    setTimeout(() => this.validateArchitectVFS(), 2000);
  }

  unlock(id) {
    return discoveryEngine.unlockSecret(id);
  }

  // ---------------------------------------------------------------------------
  // 1. Filesystem Validator for Passive Repairs
  // ---------------------------------------------------------------------------
  async validateArchitectVFS() {
    try {
      // Secret 033: Sub-Ether Beacon (ARP broadcast repair)
      if (!state.discoveredSecrets.has('secret_033')) {
        try {
          const arp = await vfs.readFile('/var/log/arp_table.dump');
          if (arp.includes('FF:FF:FF:FF:FF:FF') && !arp.includes('FF:FF:FF:FF:FF:00')) {
            this.unlock('secret_033');
          }
        } catch (_) {}
      }

      // Secret 042: Buffer Overflow Seal (MAX_STACK_FRAME >= 128)
      if (!state.discoveredSecrets.has('secret_042')) {
        try {
          const mg = await vfs.readFile('/sys/memory_guards.cfg');
          if (mg.includes('MAX_STACK_FRAME=128') || mg.includes('MAX_STACK_FRAME = 128')) {
            this.unlock('secret_042');
          }
        } catch (_) {}
      }

      // Secret 044: Heap Canary Revival (HEAP_CANARY = 0xDEADBEEF)
      if (!state.discoveredSecrets.has('secret_044')) {
        try {
          const hc = await vfs.readFile('/scripts/heap_alloc.c');
          if (hc.includes('0xDEADBEEF') && !hc.includes('0x00000000')) {
            this.unlock('secret_044');
          }
        } catch (_) {}
      }

      // Secret 062: Year 2038 Pre-empt (TIME_T_WIDTH=64)
      if (!state.discoveredSecrets.has('secret_062')) {
        try {
          const tk = await vfs.readFile('/etc/timekeeper.conf');
          if (tk.includes('TIME_T_WIDTH=64') && !tk.includes('TIME_T_WIDTH=32')) {
            this.unlock('secret_062');
          }
        } catch (_) {}
      }

      // Secret 064: Corrupted Crontab (Feb 31st -> Feb 28th)
      if (!state.discoveredSecrets.has('secret_064')) {
        try {
          const cr = await vfs.readFile('/etc/crontab');
          if (cr.includes('28 2') && !cr.includes('31 2')) {
            this.unlock('secret_064');
          }
        } catch (_) {}
      }

      // Secret 072: Orphaned Inode 8192 (Moved to /home/docs/recovered_manifest.txt)
      if (!state.discoveredSecrets.has('secret_072')) {
        try {
          const recExists = await vfs.exists('/home/docs/recovered_manifest.txt');
          if (recExists) {
            this.unlock('secret_072');
          }
        } catch (_) {}
      }

      // Secret 073: Infinite Symlink Loop Break (rm /sys/link_b)
      if (!state.discoveredSecrets.has('secret_073')) {
        try {
          const linkBExists = await vfs.exists('/sys/link_b');
          if (!linkBExists) {
            this.unlock('secret_073');
          }
        } catch (_) {}
      }

      // Secret 074: File Permission Trap (chmod 0644 /etc/shadow_phantom)
      // Tracked when chmod command is issued in Terminal

      // Secret 078: Zero-Byte File Phantom (rm /sys/kernel.lock)
      if (!state.discoveredSecrets.has('secret_078')) {
        try {
          const lockExists = await vfs.exists('/sys/kernel.lock');
          if (!lockExists) {
            this.unlock('secret_078');
          }
        } catch (_) {}
      }

      // Secret 082: Hosts File Poison Cleansing
      if (!state.discoveredSecrets.has('secret_082')) {
        try {
          const hosts = await vfs.readFile('/etc/hosts');
          if (hosts.includes('10.0.40.5 auth.phantom.local') && !hosts.includes('127.0.0.1       auth.phantom.local')) {
            this.unlock('secret_082');
          }
        } catch (_) {}
      }

      // Secret 085: Port 8080 Firewall Unblock (DROP -> ACCEPT)
      if (!state.discoveredSecrets.has('secret_085')) {
        try {
          const fw = await vfs.readFile('/etc/firewall.rules');
          if (fw.includes('--dport 8080 -j ACCEPT') && !fw.includes('--dport 8080 -j DROP')) {
            this.unlock('secret_085');
          }
        } catch (_) {}
      }

      // Secret 091: Weight Matrix NaN Purge
      if (!state.discoveredSecrets.has('secret_091')) {
        try {
          const w = await vfs.readFile('/models/orion_weights.json');
          if (!w.includes('"NaN"') && w.includes('0.0')) {
            this.unlock('secret_091');
          }
        } catch (_) {}
      }

      // Secret 092: Vanishing Gradient Rescue (sigmoid -> relu)
      if (!state.discoveredSecrets.has('secret_092')) {
        try {
          const lc = await vfs.readFile('/models/layer_config.json');
          if (lc.includes('"activation": "relu"') || lc.includes('"activation":"relu"')) {
            this.unlock('secret_092');
          }
        } catch (_) {}
      }

      // Secret 093: Learning Rate Dampener (99.9 -> 0.001)
      if (!state.discoveredSecrets.has('secret_093')) {
        try {
          const lr = await vfs.readFile('/scripts/train_orion.py');
          if ((lr.includes('0.001') || lr.includes('1e-3')) && !lr.includes('99.9')) {
            this.unlock('secret_093');
          }
        } catch (_) {}
      }

      // Secret 094: Tokenizer Out-of-Bounds (vocab_size 32008)
      if (!state.discoveredSecrets.has('secret_094')) {
        try {
          const voc = await vfs.readFile('/models/vocab.json');
          if (voc.includes('32008') || voc.includes('32010') || voc.includes('32032')) {
            this.unlock('secret_094');
          }
        } catch (_) {}
      }

      // Secret 095: Attention Head Misalignment (heads 7 -> 8)
      if (!state.discoveredSecrets.has('secret_095')) {
        try {
          const tf = await vfs.readFile('/models/transformer.json');
          if (tf.includes('"num_attention_heads": 8') || tf.includes('"num_attention_heads":8')) {
            this.unlock('secret_095');
          }
        } catch (_) {}
      }

      // Secret 096: Loss Function Inversion (remove negative sign)
      if (!state.discoveredSecrets.has('secret_096')) {
        try {
          const lf = await vfs.readFile('/models/loss.py');
          if (lf.includes('return cross_entropy') && !lf.includes('return -cross_entropy')) {
            this.unlock('secret_096');
          }
        } catch (_) {}
      }

      // Secret 097: Overfitting Regularizer (dropout_rate 0.1)
      if (!state.discoveredSecrets.has('secret_097')) {
        try {
          const oa = await vfs.readFile('/models/orion_arch.json');
          if (oa.includes('"dropout_rate": 0.1') || oa.includes('"dropout_rate":0.1')) {
            this.unlock('secret_097');
          }
        } catch (_) {}
      }

      // Secret 099: Context Window Overflow (131072 -> 8192)
      if (!state.discoveredSecrets.has('secret_099')) {
        try {
          const ctx = await vfs.readFile('/models/context.conf');
          if (ctx.includes('MAX_SEQ_LEN=8192') && !ctx.includes('131072')) {
            this.unlock('secret_099');
          }
        } catch (_) {}
      }

      // Developer's Nightmare Repairs (101 - 109)
      if (!state.discoveredSecrets.has('secret_101')) {
        try {
          const s = await vfs.readFile('/scripts/array_scanner.js');
          if (s.includes('i < array.length') && !s.includes('i <= array.length')) {
            this.unlock('secret_101');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_102')) {
        try {
          const s = await vfs.readFile('/scripts/user_validator.js');
          if (s.includes('user?.profile?.settings') || s.includes('user && user.profile')) {
            this.unlock('secret_102');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_103')) {
        try {
          const s = await vfs.readFile('/scripts/finance_calc.js');
          if (s.includes('Math.abs') || s.includes('EPSILON')) {
            this.unlock('secret_103');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_104')) {
        try {
          const s = await vfs.readFile('/scripts/async_task.js');
          if (s.includes('async') || s.includes('Promise.all') || s.includes('await')) {
            this.unlock('secret_104');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_105')) {
        try {
          const s = await vfs.readFile('/scripts/pkg_a.js');
          if (s.includes('pkg_shared.js') || !s.includes("import { helperB } from './pkg_b.js'")) {
            this.unlock('secret_105');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_106')) {
        try {
          const s = await vfs.readFile('/scripts/parser.js');
          if (s.includes('const a = 1;')) {
            this.unlock('secret_106');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_107')) {
        try {
          const s = await vfs.readFile('/scripts/data_loader.js');
          if (s.includes('.catch') || s.includes('try {')) {
            this.unlock('secret_107');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_108')) {
        try {
          const s = await vfs.readFile('/scripts/ui_widget.js');
          if (s.includes('removeEventListener')) {
            this.unlock('secret_108');
          }
        } catch (_) {}
      }

      if (!state.discoveredSecrets.has('secret_109')) {
        try {
          const s = await vfs.readFile('/scripts/counter_service.js');
          if (s.includes('isLocked') || s.includes('mutex') || s.includes('lock')) {
            this.unlock('secret_109');
          }
        } catch (_) {}
      }

      // Secret 117: Sub-Atomic Core Registry (ALPHA=0x01, BETA=0x02, GAMMA=0x04, DELTA=0x08)
      if (!state.discoveredSecrets.has('secret_117')) {
        try {
          const reg = await vfs.readFile('/sys/orion_registers.dat');
          if (reg.includes('ALPHA=0x01') && reg.includes('BETA=0x02') && reg.includes('GAMMA=0x04') && reg.includes('DELTA=0x08')) {
            this.unlock('secret_117');
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  // ---------------------------------------------------------------------------
  // 2. Interactive Terminal Commands for Architect+
  // ---------------------------------------------------------------------------
  executeTerminalCommand(rawCmd, args, printLine) {
    const cmd = rawCmd.toLowerCase();

    // HINT command
    if (cmd === 'hint') {
      const secretId = args[0] ? args[0].toLowerCase() : '';
      if (!secretId) {
        printLine('Usage: hint <secret_id> [tier 1-3]', 'term-info');
        printLine('Example: hint secret_031', 'term-info');
        return true;
      }
      const s = architectRegistry.getSecret(secretId);
      if (!s) {
        printLine(`Secret "${secretId}" not found in registry.`, 'term-err');
        return true;
      }
      const tierReq = parseInt(args[1], 10) || 1;
      const tier = Math.min(3, Math.max(1, tierReq));
      architectRegistry.revealHintTier(s.id, tier);
      printLine(`[HINT TIER ${tier} for ${s.title} (${s.id})]:`, 'term-purple');
      printLine(s.hints[tier - 1] || 'No hint available.', 'term-suc');
      return true;
    }

    // 1. PROTOCOL COMMANDS (proto)
    if (cmd === 'proto' || cmd === 'protocol') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--ping') {
        const port = args[1];
        if (port === '1337') {
          printLine('[UDP 1337] Ping sent. Silenced socket acknowledged pulse.', 'term-suc');
          this.unlock('secret_031');
        } else {
          printLine(`[UDP] No active legacy socket listening on port ${port || 'null'}.`, 'term-err');
        }
        return true;
      }

      if (sub === '--handshake') {
        const step = args[1] ? args[1].toUpperCase() : '';
        const seq = args[2] ? args[2].toUpperCase() : '';
        if (step === 'SYN') {
          architectRegistry.setPuzzleState('handshake', { syn: true });
          printLine('[TCP] SYN packet dispatched. Received SYN-ACK. Sequence required for ACK.', 'term-info');
        } else if (step === 'ACK') {
          const st = architectRegistry.getPuzzleState('handshake');
          if (st && st.syn && seq === '0xDEADBEEF') {
            printLine('[TCP] ACK 0xDEADBEEF accepted. 3-Way Handshake established.', 'term-suc');
            this.unlock('secret_032');
          } else {
            printLine('[TCP] Handshake rejected: invalid sequence or missing SYN phase.', 'term-err');
          }
        } else {
          printLine('Usage: proto --handshake SYN | proto --handshake ACK 0xDEADBEEF', 'term-warn');
        }
        return true;
      }

      if (sub === '--arp-scan') {
        printLine('[ARP] Scanning broadcast domains... MAC FF:FF:FF:FF:FF:FF reached.', 'term-suc');
        this.unlock('secret_033');
        return true;
      }

      if (sub === '--token') {
        const token = args[1] ? args[1].toUpperCase() : '';
        if (token === 'TR-0X8849' || token === 'TR-0x8849') {
          printLine('[TOKEN RING] Token TR-0x8849 claimed. Circulating frame acknowledged.', 'term-suc');
          this.unlock('secret_034');
        } else {
          printLine('[TOKEN RING] Invalid token identifier. Check Device Manager network adapter.', 'term-err');
        }
        return true;
      }

      if (sub === '--gopher') {
        printLine('[GOPHER] Connecting to gopher://phantom.local/70/capsule ... Document parsed.', 'term-suc');
        this.unlock('secret_035');
        return true;
      }

      if (sub === '--bgp-verify') {
        printLine('[BGP] Autonomous System 64513 next-hop 10.0.40.1 route converged.', 'term-suc');
        this.unlock('secret_036');
        return true;
      }

      if (sub === '--serial-sync') {
        printLine('[UART] ttyS0 speed synced at 115200 8N1. Baud rate verified.', 'term-suc');
        this.unlock('secret_037');
        return true;
      }

      if (sub === '--reassemble') {
        printLine('[IP] 3 fragments assembled. Checksum 0xCAFE verified.', 'term-suc');
        this.unlock('secret_038');
        return true;
      }

      if (sub === '--icmp') {
        const payload = args.slice(1).join(' ');
        if (payload.includes('ECHO_PHANTOM_REQUEST')) {
          printLine('[ICMP] Echo request sent with payload: ECHO_PHANTOM_REQUEST. Type 0 reply received.', 'term-suc');
          this.unlock('secret_039');
        } else {
          printLine('Usage: proto --icmp ECHO_PHANTOM_REQUEST', 'term-warn');
        }
        return true;
      }

      if (sub === '--sentinel') {
        const combo = args[1] || '';
        if (combo.includes('TR-0x8849') && combo.includes('64513') && combo.includes('1337')) {
          printLine('[SENTINEL] Protocol 0xFF coordinates accepted: TR-0x8849:64513:1337.', 'term-purple');
          this.unlock('secret_040');
        } else {
          printLine('Usage: proto --sentinel <TokenRingID>:<BGP_AS>:<UDP_Port>', 'term-warn');
        }
        return true;
      }

      printLine(`proto: available subcommands:
  --ping <port>          - Ping UDP socket
  --handshake <SYN|ACK>  - Complete 3-way handshake
  --arp-scan             - Verify broadcast ARP
  --token <TokenID>      - Claim Token Ring token
  --gopher               - Fetch gopher capsule
  --bgp-verify           - Verify BGP routing table
  --serial-sync <port>   - Re-sync UART baud rate
  --reassemble <path>    - Assemble IP fragments
  --icmp <payload>       - Send ICMP tunnel payload
  --sentinel <combo>     - Activate Protocol 0xFF Sentinel`, 'term-info');
      return true;
    }

    // 2. MEMORY COMMANDS (mem)
    if (cmd === 'mem' || cmd === 'memory') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--inspect') {
        const addr = args[1] ? args[1].toUpperCase() : '';
        if (addr === '0X00FF40A0') {
          printLine('[MMU] Inspecting 0x00FF40A0... Dangling pointer freed.', 'term-suc');
          this.unlock('secret_041');
        } else {
          printLine(`[MMU] Address ${args[1] || 'null'} is not currently allocated. Check System Monitor.`, 'term-err');
        }
        return true;
      }

      if (sub === '--mmu-reload') {
        printLine('[MMU] Page table reloaded. Page 0x0E mapped to Frame 0x7A.', 'term-suc');
        this.unlock('secret_043');
        return true;
      }

      if (sub === '--quarantine') {
        const pid = args[1];
        if (pid === '512') {
          printLine('[KERNEL] PID 512 memory leak quarantined. 256MB reclaimed.', 'term-suc');
          this.unlock('secret_045');
        } else {
          printLine(`PID ${pid || 'null'} is not exhibiting memory leak anomalies. Check System Monitor.`, 'term-warn');
        }
        return true;
      }

      if (sub === '--dma-reinit') {
        printLine('[DMA] Channels re-arbitrated. Sound Blaster on DMA 1, Quantum Bridge on DMA 3.', 'term-suc');
        this.unlock('secret_046');
        return true;
      }

      if (sub === '--swapon') {
        printLine('[SWAP] /dev/vda2 activated with 1024MB space.', 'term-suc');
        this.unlock('secret_047');
        return true;
      }

      if (sub === '--unlock-mutex') {
        const key = args[1];
        if (key === 'MUTEX_ORION_LOCK') {
          printLine('[IPC] MUTEX_ORION_LOCK released. Thread lock cleared.', 'term-suc');
          this.unlock('secret_048');
        } else {
          printLine('Usage: mem --unlock-mutex MUTEX_ORION_LOCK', 'term-warn');
        }
        return true;
      }

      if (sub === '--gc-sweep') {
        printLine('[GC] Cycle sweep complete. 1000 cycle threshold honored.', 'term-suc');
        this.unlock('secret_049');
        return true;
      }

      if (sub === '--synthesize-core') {
        const val = args[1] || '';
        if (val.includes('0x00FF40A0') && val.includes('0x0E') && val.includes('1')) {
          printLine('[CORE] Memory address mappings synthesized into golden page table.', 'term-purple');
          this.unlock('secret_050');
        } else {
          printLine('Usage: mem --synthesize-core 0x00FF40A0:0x0E:1', 'term-warn');
        }
        return true;
      }

      printLine(`mem: virtual memory diagnostic utility:
  --inspect <addr>        - Inspect pointer address
  --mmu-reload            - Reload MMU page tables
  --quarantine <pid>      - Quarantine memory leak
  --dma-reinit            - Reinitialize DMA channels
  --swapon                - Activate swap partition
  --unlock-mutex <key>    - Release frozen mutex lock
  --gc-sweep              - Force garbage collection sweep
  --synthesize-core <map> - Synthesize core memory oracle`, 'term-info');
      return true;
    }

    // 3. CRYPTOGRAPHY COMMANDS (crypto)
    if (cmd === 'crypto' || cmd === 'cipher') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--decode') {
        const phrase = args.slice(1).join(' ').toUpperCase();
        if (phrase.includes('PHANTOM_KERNEL_RISE')) {
          printLine('[ROT13] Decoded phrase accepted: PHANTOM_KERNEL_RISE.', 'term-suc');
          this.unlock('secret_051');
        } else {
          printLine('Incorrect decoded phrase. Check /home/docs/cipher1.txt.', 'term-err');
        }
        return true;
      }

      if (sub === '--xor') {
        const key = args[2] ? args[2].toUpperCase() : '';
        if (key === '0XAA' || key === '0xAA') {
          printLine('[XOR] Decrypted: ORION_CIPHER_RESONANCE_UNLOCKED.', 'term-suc');
          this.unlock('secret_052');
        } else {
          printLine('Usage: crypto --xor /sys/encrypted_flag.bin 0xAA', 'term-warn');
        }
        return true;
      }

      if (sub === '--hash') {
        const target = args[1];
        if (target && target.includes('orion_core.sys')) {
          printLine('[SHA-256] 4a89c012b7e34f89d0234a98fe12bc443219abce7890ef123456789abcdef012 — MATCH.', 'term-suc');
          this.unlock('secret_053');
        } else {
          printLine('Usage: crypto --hash /sys/orion_core.sys', 'term-warn');
        }
        return true;
      }

      if (sub === '--submit') {
        const text = args.slice(1).join(' ').toUpperCase();
        if (text.includes('SYSTEM_RESONANCE_STABLE')) {
          printLine('[VIGENERE] Plaintext accepted: SYSTEM_RESONANCE_STABLE.', 'term-suc');
          this.unlock('secret_054');
        } else {
          printLine('Vigenere submission incorrect. Check intranet wiki.', 'term-err');
        }
        return true;
      }

      if (sub === '--b64') {
        const b64 = args[1] || '';
        if (b64.includes('UEhBTlRPTS1TVEVHQU5PLTIwMjY')) {
          printLine('[BASE64] Decoded payload: PHANTOM-STEGANO-2026.', 'term-suc');
          this.unlock('secret_055');
        } else {
          printLine('Usage: crypto --b64 <string>', 'term-warn');
        }
        return true;
      }

      if (sub === '--fingerprint') {
        printLine('[RSA] Key Fingerprint: 3A:7E:91:BC:02:44:8D:19:FE:40 (Valid).', 'term-suc');
        this.unlock('secret_056');
        return true;
      }

      if (sub === '--dh-compute') {
        const val = args[1];
        if (val === '4') {
          printLine('[DH] Shared secret computed: 4. Key exchange verified.', 'term-suc');
          this.unlock('secret_057');
        } else {
          printLine('Shared secret incorrect. Compute (8^6) mod 23.', 'term-err');
        }
        return true;
      }

      if (sub === '--otp') {
        printLine('[OTP] One-time pad applied against /etc/otp_secret.hex. Plaintext: ORION.', 'term-suc');
        this.unlock('secret_058');
        return true;
      }

      if (sub === '--verify-sig') {
        printLine('[RSA-SIG] Signature verified for /sys/manifest.xml by Dr. Elena Vance.', 'term-suc');
        this.unlock('secret_059');
        return true;
      }

      if (sub === '--keystone') {
        const k = args[1] || '';
        if (k.includes('PHANTOM_KERNEL_RISE') && k.includes('0xAA') && k.includes('SYSTEM_RESONANCE_STABLE')) {
          printLine('[KEYSTONE] Master Cipher Keystone constructed.', 'term-purple');
          this.unlock('secret_060');
        } else {
          printLine('Usage: crypto --keystone PHANTOM_KERNEL_RISE:0xAA:SYSTEM_RESONANCE_STABLE', 'term-warn');
        }
        return true;
      }

      printLine(`crypto: cryptographic engine commands:
  --decode <phrase>      - Decode substitution cipher
  --xor <file> <key>     - Decrypt with XOR mask
  --hash <file>          - Verify SHA-256 integrity
  --submit <text>        - Submit Vigenere plaintext
  --b64 <payload>        - Decode base64 payload
  --fingerprint <pem>    - Extract RSA key fingerprint
  --dh-compute <val>     - Submit Diffie-Hellman secret
  --otp <file>           - Apply one-time pad
  --verify-sig <f> <s>   - Verify detached digital signature
  --keystone <params>    - Construct Master Cipher Keystone`, 'term-info');
      return true;
    }

    // 4. TIMEKEEPER COMMANDS (chronos)
    if (cmd === 'chronos' || cmd === 'timekeeper') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--set-epoch') {
        if (args[1] === '0') {
          printLine('[RTC] Epoch set to 0 (1970-01-01 00:00:00 UTC).', 'term-suc');
          this.unlock('secret_061');
        } else {
          printLine('Usage: chronos --set-epoch 0', 'term-warn');
        }
        return true;
      }

      if (sub === '--leap-second') {
        printLine('[UTC] +1.000s leap second inserted into hardware timer.', 'term-suc');
        this.unlock('secret_063');
        return true;
      }

      if (sub === '--tz-align') {
        printLine('[TZ] Cluster timezone offsets synchronized to UTC standard.', 'term-suc');
        this.unlock('secret_065');
        return true;
      }

      if (sub === '--pps-lock') {
        printLine('[PPS] Pulse-Per-Second locked on serial hardware pin.', 'term-suc');
        this.unlock('secret_066');
        return true;
      }

      if (sub === '--audit-boot-log') {
        printLine('[BOOT] Boot log timestamps verified in monotonic order.', 'term-suc');
        this.unlock('secret_067');
        return true;
      }

      if (sub === '--ntp-query') {
        printLine('[NTP] Stratum 1 response from pool.phantom.local: dispersion 0.002ms.', 'term-suc');
        this.unlock('secret_068');
        return true;
      }

      if (sub === '--calibrate-quartz') {
        const freq = args[1];
        if (freq === '32768' || freq === '32.768') {
          printLine('[RTC] Quartz oscillator locked to 32,768 Hz.', 'term-suc');
          this.unlock('secret_069');
        } else {
          printLine('Quartz frequency must be calibrated to 32768 Hz.', 'term-err');
        }
        return true;
      }

      if (sub === '--align-horizon') {
        printLine('[HORIZON] Epoch 0, leap second, and atomic time locked across all dimensions.', 'term-purple');
        this.unlock('secret_070');
        return true;
      }

      printLine(`chronos: temporal and clock commands:
  --set-epoch 0          - Reset clock to Genesis Epoch
  --leap-second          - Insert +1.000s leap second
  --tz-align             - Align cluster time zones
  --pps-lock             - Lock Pulse-Per-Second discipline
  --audit-boot-log       - Audit monotonic log timestamps
  --ntp-query <host>     - Query Stratum 1 NTP server
  --calibrate-quartz <f> - Calibrate oscillator frequency (32768 Hz)
  --align-horizon        - Align the Chronos Horizon`, 'term-info');
      return true;
    }

    // 5. DEEP FILESYSTEM COMMANDS (fsck / chkfs deep)
    if (cmd === 'fsck') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--repair-superblock') {
        const sector = args[1];
        if (sector === '32768') {
          printLine('[EXT4] Superblock restored from sector 32768.', 'term-suc');
          this.unlock('secret_071');
        } else {
          printLine('Invalid superblock sector. Check /var/log/fs_error.log.', 'term-err');
        }
        return true;
      }

      if (sub === '--replay-journal') {
        printLine('[JBD2] 4 uncommitted journal transactions replayed.', 'term-suc');
        this.unlock('secret_076');
        return true;
      }

      printLine('fsck: filesystem check utility (--repair-superblock 32768, --replay-journal)', 'term-info');
      return true;
    }

    if (cmd === 'chmod') {
      const mode = args[0];
      const target = args[1] || '';
      if ((mode === '0644' || mode === '644') && target.includes('shadow_phantom')) {
        printLine('[VFS] Mode on /etc/shadow_phantom updated to 0644 (rw-r--r--).', 'term-suc');
        this.unlock('secret_074');
        return true;
      }
    }

    // Alternate data stream read
    if (cmd === 'cat' && args[0] && args[0].includes('instructions.txt:secret_stream')) {
      printLine('[ADS] Stream data: ORION_ADS_SECTOR_REVEALED (Key: 0x409)', 'term-purple');
      this.unlock('secret_075');
      return true;
    }

    if (cmd === 'chkfs') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--reindex') {
        printLine('[HTREE] Directory hash tree re-indexed for /system/libraries.', 'term-suc');
        this.unlock('secret_077');
        return true;
      }
      if (sub === '--clean-tmp') {
        printLine('[TMP] 500 orphaned temporary locks deleted from /tmp/locks.', 'term-suc');
        this.unlock('secret_079');
        return true;
      }
      if (sub === '--deep-audit') {
        printLine('[AUDIT] Deep Inode Core audit passed. 0 errors detected across 65536 sectors.', 'term-purple');
        this.unlock('secret_080');
        return true;
      }
    }

    // 6. NETWORK COMMANDS (net / traceroute)
    if (cmd === 'traceroute') {
      printLine(`traceroute to intranet.phantom.local (10.0.40.1), 30 hops max:
 1  192.168.1.1 (gateway) 0.82 ms
 2  10.0.1.1 (switch-core) 1.12 ms
 3  10.0.10.1 (vpn-gw) 2.45 ms
 4  10.0.20.1 (firewall) 3.10 ms
 5  10.0.30.1 (perimeter) 4.22 ms
 6  10.0.40.1 (intranet.phantom.local) 5.01 ms
 7  10.0.40.9 [ANOMALY_NODE: Orion Perimeter Gateway] 5.88 ms`, 'term-info');
      return true;
    }

    if (cmd === 'net') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--route-reload') {
        printLine('[NET] Default gateway 192.168.1.1 restored.', 'term-suc');
        this.unlock('secret_081');
        return true;
      }
      if (sub === '--apply-mask') {
        printLine('[NET] Subnet mask 255.255.255.0 applied.', 'term-suc');
        this.unlock('secret_083');
        return true;
      }
      if (sub === '--flush-dns') {
        printLine('[DNS] Resolver cache flushed. Authoritative root SOA reloaded.', 'term-suc');
        this.unlock('secret_084');
        return true;
      }
      if (sub === '--probe') {
        if (args[1] === '10.0.40.9') {
          printLine('[NET] Node 10.0.40.9 probed: Orion Perimeter Gateway authenticated.', 'term-suc');
          this.unlock('secret_086');
        } else {
          printLine('Usage: net --probe 10.0.40.9', 'term-warn');
        }
        return true;
      }
      if (sub === '--vlan-reset') {
        printLine('[VLAN] Quarantine tag 404 removed. Trunk port restored.', 'term-suc');
        this.unlock('secret_088');
        return true;
      }
      if (sub === '--sniff') {
        printLine('[SNIFFER] Promiscuous capture: broadcast from 10.0.40.255 [ORION_NET_BURST].', 'term-suc');
        this.unlock('secret_089');
        return true;
      }
      if (sub === '--map-topology') {
        printLine('[TOPOLOGY] All 8 network nodes connected with 0% packet loss.', 'term-purple');
        this.unlock('secret_090');
        return true;
      }

      printLine(`net: network configuration & diagnostics:
  --route-reload   - Reload routing table
  --apply-mask     - Apply CIDR subnet mask
  --flush-dns      - Flush local DNS cache
  --probe <ip>     - Probe gateway node
  --vlan-reset     - Reset VLAN quarantine tag
  --sniff          - Promiscuous mode packet capture
  --map-topology   - Map global network topology`, 'term-info');
      return true;
    }

    // 7. MACHINE INTELLIGENCE COMMANDS (ai-eval)
    if (cmd === 'ai-eval') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--prompt') {
        const prompt = args[1] || '';
        const temp = args[args.indexOf('--temp') + 1];
        if (prompt.includes('PROJECT_ORION_QUERY') && (temp === '0.0' || temp === '0')) {
          printLine('[INFERENCE] Greedy argmax decoding: ORION_COGNITION_VERIFIED.', 'term-suc');
          this.unlock('secret_098');
        } else {
          printLine('Usage: ai-eval --prompt PROJECT_ORION_QUERY --temp 0.0', 'term-warn');
        }
        return true;
      }

      if (sub === '--synthesize-model') {
        printLine('[ORION-AI] 12 transformer layers forward-passed successfully. Loss converged.', 'term-purple');
        this.unlock('secret_100');
        return true;
      }

      printLine(`ai-eval: machine intelligence evaluation tool:
  --prompt <P> --temp 0.0 - Test greedy decoding
  --synthesize-model       - Compile and evaluate 12-layer Orion model`, 'term-info');
      return true;
    }

    // 8. DEVELOPER'S NIGHTMARE (devmode --resolve-nightmares)
    if (cmd === 'devmode' && args[0] === '--resolve-nightmares') {
      printLine('[NIGHTMARE] All 9 edge-case bugs certified resolved: Heisenbug cleared.', 'term-purple');
      this.unlock('secret_110');
      return true;
    }

    // 9. PROJECT ORION CLASSIFIED COMMANDS (orion)
    if (cmd === 'orion') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--extract-blackbox') {
        printLine('[BLACKBOX] Incident 404 flight recorder: Resonance Cascade confirmed.', 'term-suc');
        this.unlock('secret_111');
        return true;
      }
      if (sub === '--import-vance-key') {
        printLine('[PGP] Dr. Vance\'s private key imported. Lead Architect identity active.', 'term-suc');
        this.unlock('secret_112');
        return true;
      }
      if (sub === '--root-cause') {
        const rc = args.slice(1).join(' ').toUpperCase();
        if (rc.includes('RESONANCE_CASCADE')) {
          printLine('[INCIDENT 404] Root cause validated: RESONANCE_CASCADE.', 'term-suc');
          this.unlock('secret_113');
        } else {
          printLine('Incorrect root cause. Read /var/log/incident_part*.log.', 'term-err');
        }
        return true;
      }
      if (sub === '--tune-bridge') {
        printLine('[QUANTUM] Bridge frequency tuned to 1420.4057 MHz. Coherence 99.98%.', 'term-suc');
        this.unlock('secret_114');
        return true;
      }
      if (sub === '--assemble-blueprints') {
        printLine('[ARCHITECT] 4 schematic slices united into Master Blueprint.', 'term-suc');
        this.unlock('secret_115');
        return true;
      }
      if (sub === '--ping-node') {
        if (args[1] === 'omega.phantom') {
          printLine('[NODE] Sub-Node Omega ping acknowledged: RTT 1.4ms.', 'term-suc');
          this.unlock('secret_116');
        } else {
          printLine('Usage: orion --ping-node omega.phantom', 'term-warn');
        }
        return true;
      }
      if (sub === '--passkey') {
        const pk = args.slice(1).join(' ').toUpperCase();
        if (pk.includes('GENESIS_ORION_AWAKE')) {
          printLine('[MEMO] Dr. Vance\'s final memo unlocked: GENESIS_ORION_AWAKE.', 'term-suc');
          this.unlock('secret_118');
        } else {
          printLine('Usage: orion --passkey GENESIS_ORION_AWAKE', 'term-warn');
        }
        return true;
      }
      if (sub === '--unlock-vault') {
        printLine('[VAULT] PEM key, PGP ring, and hydrogen frequency matched. Vault unsealed.', 'term-suc');
        this.unlock('secret_119');
        return true;
      }
      if (sub === '--genesis-compile') {
        printLine('[ORION] Orion Genesis Matrix compiled into system core.', 'term-purple');
        this.unlock('secret_120');
        return true;
      }

      printLine(`orion: classified project subsystem tools:
  --extract-blackbox <file>  - Extract flight recorder
  --import-vance-key         - Import Dr. Vance PGP key
  --root-cause <cause>       - Verify incident 404 cause
  --tune-bridge              - Calibrate quantum frequency
  --assemble-blueprints      - Assemble blueprint vectors
  --ping-node <host>         - Ping decommissioned satellite
  --passkey <key>            - Submit final memo passkey
  --unlock-vault             - Unlock master vault seal
  --genesis-compile          - Compile Orion Genesis Matrix`, 'term-info');
      return true;
    }

    // 10. GRAND ARCHITECT SYNTHESIS (synthesis)
    if (cmd === 'synthesis') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--verify-protocols') {
        printLine('[SYNTHESIS] Category 1: Universal Protocol Conductor verified.', 'term-purple');
        this.unlock('secret_121');
        return true;
      }
      if (sub === '--verify-memory') {
        printLine('[SYNTHESIS] Category 2: Omniscient Memory Mesh verified.', 'term-purple');
        this.unlock('secret_122');
        return true;
      }
      if (sub === '--verify-crypto') {
        printLine('[SYNTHESIS] Category 3: Master Cryptographic Lattice certified.', 'term-purple');
        this.unlock('secret_123');
        return true;
      }
      if (sub === '--verify-temporal') {
        printLine('[SYNTHESIS] Category 4: Temporal Singularity synchronized.', 'term-purple');
        this.unlock('secret_124');
        return true;
      }
      if (sub === '--verify-filesystem') {
        printLine('[SYNTHESIS] Category 5: Total Filesystem Integrity certified.', 'term-purple');
        this.unlock('secret_125');
        return true;
      }
      if (sub === '--verify-network') {
        printLine('[SYNTHESIS] Category 6: Pan-Network Nexus established.', 'term-purple');
        this.unlock('secret_126');
        return true;
      }
      if (sub === '--verify-intelligence') {
        printLine('[SYNTHESIS] Category 7: Artificial Core Synapse aligned.', 'term-purple');
        this.unlock('secret_127');
        return true;
      }
      if (sub === '--verify-codebase') {
        printLine('[SYNTHESIS] Category 8: Zero-Defect Codebase certified.', 'term-purple');
        this.unlock('secret_128');
        return true;
      }
      if (sub === '--verify-orion') {
        printLine('[SYNTHESIS] Category 9: Orion Omega Synthesis complete.', 'term-purple');
        this.unlock('secret_129');
        return true;
      }

      printLine('synthesis: Grand Architect category synthesis (--verify-<category>)', 'term-info');
      return true;
    }

    // 11. THE FINAL CHALLENGE: SECRET 130 (architect)
    if (cmd === 'architect') {
      const sub = args[0] ? args[0].toLowerCase() : '';
      if (sub === '--transcend') {
        const keyIdx = args.indexOf('--key');
        const seedIdx = args.indexOf('--seed');
        const key = keyIdx !== -1 ? args[keyIdx + 1] : '';
        const seed = seedIdx !== -1 ? args[seedIdx + 1] : '';

        if (state.discoveredSecrets.size < 129) {
          printLine(`[TRANSCENDENCE REJECTED] Resonance incomplete. All 129 previous secrets required (Current: ${state.discoveredSecrets.size}/129).`, 'term-err');
          return true;
        }

        if (key === 'ORION-GENESIS-OMEGA-130-ARCHITECT' && (seed === '0x7F9E0130' || seed === '0x7f9e0130')) {
          printLine('[TRANSCENDENCE INITIATED] Golden seed 0x7F9E0130 verified.', 'term-suc');
          printLine('[KEY ACCEPTED] Master Key: ORION-GENESIS-OMEGA-130-ARCHITECT.', 'term-suc');
          printLine('[GENESIS CORE] All 130 secrets unlocked. Grand Architect achieved.', 'term-purple');
          this.unlock('secret_130');
          this.triggerGrandArchitectCelebration();
        } else {
          printLine('Usage: architect --transcend --key ORION-GENESIS-OMEGA-130-ARCHITECT --seed 0x7F9E0130', 'term-warn');
        }
        return true;
      }

      printLine('architect: master control utility (Usage: architect --transcend --key <KEY> --seed <SEED>)', 'term-info');
      return true;
    }

    return false; // Command was not an architect+ command
  }

  // ---------------------------------------------------------------------------
  // 3. Multi-App Event Handlers
  // ---------------------------------------------------------------------------
  handleDeviceInspected(data) {
    if (data && data.deviceId === '0x9F') {
      // Quantum Bridge inspection
      this.validateArchitectVFS();
    }
  }

  handleMailRead(data) {
    if (data && data.subject && data.subject.includes('Diagnostic Probe Memo')) {
      // ICMP hint observed
    }
  }

  handleBrowserNavigated(data) {
    if (data && data.url) {
      if (data.url.includes('gopher://') || data.url.includes('capsule')) {
        this.unlock('secret_035');
      }
    }
  }

  handleSettingsChanged(data) {
    if (data && data.setting === 'quartz_oscillator' && data.value === 32768) {
      this.unlock('secret_069');
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Secret 130 Grand Finale Celebration
  // ---------------------------------------------------------------------------
  triggerGrandArchitectCelebration() {
    events.emit('system:grand-architect-victory');

    const overlay = document.createElement('div');
    overlay.className = 'architect-victory-overlay';
    overlay.innerHTML = `
      <div class="architect-victory-modal">
        <div class="architect-victory-crown">🏛️</div>
        <div class="architect-victory-title">BEYOND THE ARCHITECT</div>
        <div class="architect-victory-rank">GRAND ARCHITECT (130 / 130)</div>
        <div class="architect-victory-text">
          You have solved every protocol anomaly, memory maze, cryptographic cipher, temporal drift, deep filesystem inode, neural matrix, developer nightmare, and classified Project Orion file.<br><br>
          <strong>PhantomOS is fully reconstructed. You have mastered the simulation.</strong>
        </div>
        <button class="btn btn-primary" id="btn-close-victory">Honor of the Grand Architect</button>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#btn-close-victory').addEventListener('click', () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 500);
    });
  }
}

export const architectValidator = new ArchitectValidator();

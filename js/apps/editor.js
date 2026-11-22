/**
 * Find Me If You Can — Code Editor Application
 */
import { OSWindow } from '../wm/window.js';
import { vfs } from '../core/vfs.js';
import { audio } from '../core/audio.js';
import { events } from '../core/events.js';
import { discoveryEngine } from '../engine/discovery-engine.js';

export function openEditor(initialFilePath = '/readme.txt') {
  let currentFilePath = vfs.normalize(initialFilePath);
  let isDirty = false;

  const win = new OSWindow({
    title: `Code Editor — ${currentFilePath}`,
    iconSvg: `<svg viewBox="0 0 24 24" fill="#58a6ff"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
    width: 720,
    height: 480
  });

  win.setContent(`
    <div class="editor-container">
      <div class="editor-toolbar">
        <div class="editor-file-info">
          <span class="editor-file-path">${currentFilePath}</span>
          <span class="editor-badge editor-status-badge">Ready</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-sm btn-open">Open</button>
          <button class="btn btn-sm btn-primary btn-save">Save File</button>
          <button class="btn btn-sm btn-validate" title="Validate file against system schemas">Validate & Run</button>
        </div>
      </div>
      <div class="editor-workspace">
        <div class="editor-gutter"></div>
        <textarea class="editor-textarea" spellcheck="false" autocomplete="off"></textarea>
      </div>
      <div class="editor-status-bar">
        <span class="status-pos">Line 1, Col 1</span>
        <span class="status-encoding">UTF-8 | Plain Text</span>
      </div>
    </div>
  `);

  const pathDisplay = win.contentElement.querySelector('.editor-file-path');
  const statusBadge = win.contentElement.querySelector('.editor-status-badge');
  const gutter = win.contentElement.querySelector('.editor-gutter');
  const textarea = win.contentElement.querySelector('.editor-textarea');
  const btnSave = win.contentElement.querySelector('.btn-save');
  const btnOpen = win.contentElement.querySelector('.btn-open');
  const btnValidate = win.contentElement.querySelector('.btn-validate');
  const statusPos = win.contentElement.querySelector('.status-pos');

  const updateGutter = () => {
    const lines = textarea.value.split('\n').length;
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
      gutterHtml += `<div class="editor-gutter-line">${i}</div>`;
    }
    gutter.innerHTML = gutterHtml;
  };

  const loadFile = async (path) => {
    try {
      currentFilePath = vfs.normalize(path);
      pathDisplay.textContent = currentFilePath;
      win.setTitle(`Code Editor — ${currentFilePath}`);
      const content = await vfs.readFile(currentFilePath);
      textarea.value = content;
      isDirty = false;
      statusBadge.textContent = 'Saved';
      statusBadge.style.color = 'var(--text-secondary)';
      updateGutter();
    } catch (err) {
      textarea.value = `// Error loading file: ${err.message}`;
      statusBadge.textContent = 'Error';
      statusBadge.style.color = 'var(--status-danger)';
    }
  };

  const saveFile = async () => {
    audio.playClick();
    try {
      await vfs.writeFile(currentFilePath, textarea.value);
      isDirty = false;
      statusBadge.textContent = 'Saved';
      statusBadge.style.color = 'var(--status-success)';
      win.setTitle(`Code Editor — ${currentFilePath}`);

      // Run automatic VFS validation
      await discoveryEngine.validateVFSFiles();
      events.emit('system:show-toast', { title: 'File Saved', desc: `Saved changes to ${currentFilePath}`, type: 'success' });
    } catch (err) {
      statusBadge.textContent = 'Save Failed';
      statusBadge.style.color = 'var(--status-danger)';
    }
  };

  textarea.addEventListener('input', () => {
    if (!isDirty) {
      isDirty = true;
      statusBadge.textContent = 'Unsaved *';
      statusBadge.style.color = 'var(--status-warning)';
      win.setTitle(`Code Editor — ${currentFilePath} *`);
    }
    updateGutter();
  });

  textarea.addEventListener('scroll', () => {
    gutter.scrollTop = textarea.scrollTop;
  });

  textarea.addEventListener('keydown', (e) => {
    // Intercept Tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      textarea.dispatchEvent(new Event('input'));
    }
    // Ctrl+S / Cmd+S save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveFile();
    }
  });

  textarea.addEventListener('keyup', () => {
    const textBefore = textarea.value.substring(0, textarea.selectionStart);
    const lines = textBefore.split('\n');
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;
    statusPos.textContent = `Line ${lineNum}, Col ${colNum}`;
  });

  btnSave.addEventListener('click', saveFile);

  btnOpen.addEventListener('click', () => {
    const p = prompt('Enter virtual file path to open:', currentFilePath);
    if (p) loadFile(p);
  });

  btnValidate.addEventListener('click', async () => {
    audio.playClick();
    await saveFile();
    await discoveryEngine.validateVFSFiles();
    events.emit('system:show-toast', {
      title: 'Compiler / Syntax Validator',
      desc: 'Executed static analysis across virtual filesystem nodes.',
      type: 'info'
    });
  });

  loadFile(currentFilePath);
  return win;
}

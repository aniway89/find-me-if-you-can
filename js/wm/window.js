import { events } from '../core/events.js';
import { audio } from '../core/audio.js';

export class OSWindow {
  constructor(options = {}) {
    this.id = options.id || 'win_' + Math.random().toString(36).substring(2, 9);
    this.title = options.title || 'Application';
    this.iconSvg = options.iconSvg || '<svg viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="4" fill="currentColor"/></svg>';
    this.width = options.width || 640;
    this.height = options.height || 440;
    this.minWidth = options.minWidth || 300;
    this.minHeight = options.minHeight || 200;
    this.x = options.x !== undefined ? options.x : 60 + Math.floor(Math.random() * 60);
    this.y = options.y !== undefined ? options.y : 40 + Math.floor(Math.random() * 50);

    this.isMaximized = false;
    this.isMinimized = false;
    this.isFocused = false;
    this.prevBounds = null;

    this.element = null;
    this.contentElement = null;
    this.onClose = options.onClose || null;

    this.createDOM();
    this.attachEvents();
  }

  createDOM() {
    const win = document.createElement('div');
    win.className = 'os-window';
    win.id = this.id;
    win.style.width = `${this.width}px`;
    win.style.height = `${this.height}px`;
    win.style.left = `${this.x}px`;
    win.style.top = `${this.y}px`;

    win.innerHTML = `
      <div class="window-titlebar">
        <div class="window-title-group">
          <div class="window-icon">${this.iconSvg}</div>
          <span class="window-title">${this.title}</span>
        </div>
        <div class="window-controls">
          <button class="window-btn btn-min" title="Minimize">
            <svg viewBox="0 0 12 12"><line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" stroke-width="1.5"/></svg>
          </button>
          <button class="window-btn btn-max" title="Maximize">
            <svg class="icon-max" viewBox="0 0 12 12"><rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
            <svg class="icon-restore" style="display:none;" viewBox="0 0 12 12"><rect x="3" y="1" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1.1"/><rect x="1" y="3" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>
          </button>
          <button class="window-btn btn-close" title="Close">
            <svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" stroke-width="1.5"/></svg>
          </button>
        </div>
      </div>
      <div class="window-content"></div>
      <div class="resize-handle resize-n"></div>
      <div class="resize-handle resize-s"></div>
      <div class="resize-handle resize-e"></div>
      <div class="resize-handle resize-w"></div>
      <div class="resize-handle resize-ne"></div>
      <div class="resize-handle resize-nw"></div>
      <div class="resize-handle resize-se"></div>
      <div class="resize-handle resize-sw"></div>
    `;

    this.element = win;
    this.contentElement = win.querySelector('.window-content');
    this.titlebar = win.querySelector('.window-titlebar');
    this.btnMin = win.querySelector('.btn-min');
    this.btnMax = win.querySelector('.btn-max');
    this.btnClose = win.querySelector('.btn-close');
    this.iconMax = win.querySelector('.icon-max');
    this.iconRestore = win.querySelector('.icon-restore');
  }

  attachEvents() {
    this.element.addEventListener('mousedown', () => this.focus());

    this.btnMin.addEventListener('click', (e) => {
      e.stopPropagation();
      this.minimize();
    });

    this.btnMax.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMaximize();
    });

    this.btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    this.titlebar.addEventListener('dblclick', (e) => {
      if (e.target.closest('.window-controls')) return;
      this.toggleMaximize();
    });

    this.titlebar.addEventListener('mousedown', (e) => {
      if (e.target.closest('.window-controls')) return;
      if (this.isMaximized) return;

      this.focus();
      const startX = e.clientX;
      const startY = e.clientY;
      const initialLeft = this.element.offsetLeft;
      const initialTop = this.element.offsetTop;

      const onMouseMove = (moveEvt) => {
        const deltaX = moveEvt.clientX - startX;
        const deltaY = moveEvt.clientY - startY;

        let newX = initialLeft + deltaX;
        let newY = initialTop + deltaY;

        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        newX = Math.max(-this.width + 100, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        this.x = newX;
        this.y = newY;
        this.element.style.left = `${newX}px`;
        this.element.style.top = `${newY}px`;
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    const handles = this.element.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        if (this.isMaximized) return;
        e.stopPropagation();
        this.focus();

        const dir = Array.from(handle.classList)
          .find(c => c.startsWith('resize-'))
          .replace('resize-', '');

        const startX = e.clientX;
        const startY = e.clientY;
        const initialX = this.element.offsetLeft;
        const initialY = this.element.offsetTop;
        const initialW = this.element.offsetWidth;
        const initialH = this.element.offsetHeight;

        const onResizeMove = (moveEvt) => {
          const deltaX = moveEvt.clientX - startX;
          const deltaY = moveEvt.clientY - startY;

          let newW = initialW;
          let newH = initialH;
          let newX = initialX;
          let newY = initialY;

          if (dir.includes('e')) {
            newW = Math.max(this.minWidth, initialW + deltaX);
          }
          if (dir.includes('s')) {
            newH = Math.max(this.minHeight, initialH + deltaY);
          }
          if (dir.includes('w')) {
            const possibleW = initialW - deltaX;
            if (possibleW >= this.minWidth) {
              newW = possibleW;
              newX = initialX + deltaX;
            }
          }
          if (dir.includes('n')) {
            const possibleH = initialH - deltaY;
            if (possibleH >= this.minHeight) {
              newH = possibleH;
              newY = initialY + deltaY;
            }
          }

          this.width = newW;
          this.height = newH;
          this.x = newX;
          this.y = newY;

          this.element.style.width = `${newW}px`;
          this.element.style.height = `${newH}px`;
          this.element.style.left = `${newX}px`;
          this.element.style.top = `${newY}px`;
        };

        const onResizeUp = () => {
          window.removeEventListener('mousemove', onResizeMove);
          window.removeEventListener('mouseup', onResizeUp);
        };

        window.addEventListener('mousemove', onResizeMove);
        window.addEventListener('mouseup', onResizeUp);
      });
    });
  }

  focus() {
    if (this.isFocused && !this.isMinimized) return;
    this.isFocused = true;
    this.element.classList.remove('inactive');
    events.emit('wm:window-focused', this);
  }

  setInactive() {
    this.isFocused = false;
    this.element.classList.add('inactive');
  }

  minimize() {
    audio.playClick();
    this.isMinimized = true;
    this.element.classList.add('minimized');
    events.emit('wm:window-minimized', this);
  }

  restore() {
    audio.playClick();
    this.isMinimized = false;
    this.element.classList.remove('minimized');
    this.focus();
    events.emit('wm:window-restored', this);
  }

  toggleMaximize() {
    audio.playClick();
    if (this.isMaximized) {
      this.isMaximized = false;
      this.element.classList.remove('maximized');
      if (this.prevBounds) {
        this.element.style.left = `${this.prevBounds.x}px`;
        this.element.style.top = `${this.prevBounds.y}px`;
        this.element.style.width = `${this.prevBounds.w}px`;
        this.element.style.height = `${this.prevBounds.h}px`;
      }
      this.iconMax.style.display = 'block';
      this.iconRestore.style.display = 'none';
    } else {
      this.prevBounds = {
        x: this.element.offsetLeft,
        y: this.element.offsetTop,
        w: this.element.offsetWidth,
        h: this.element.offsetHeight
      };
      this.isMaximized = true;
      this.element.classList.add('maximized');
      this.iconMax.style.display = 'none';
      this.iconRestore.style.display = 'block';
    }
    this.focus();
  }

  close() {
    audio.playClick();
    if (this.onClose) this.onClose();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    events.emit('wm:window-closed', this);
  }

  setContent(htmlOrElement) {
    if (typeof htmlOrElement === 'string') {
      this.contentElement.innerHTML = htmlOrElement;
    } else if (htmlOrElement instanceof HTMLElement) {
      this.contentElement.innerHTML = '';
      this.contentElement.appendChild(htmlOrElement);
    }
  }

  setTitle(title) {
    this.title = title;
    const titleSpan = this.element.querySelector('.window-title');
    if (titleSpan) titleSpan.textContent = title;
    events.emit('wm:window-title-changed', this);
  }
}

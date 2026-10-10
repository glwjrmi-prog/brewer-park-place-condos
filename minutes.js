(function (global) {
  'use strict';
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const SITE_ROOT = 'https://glwjrmi-prog.github.io/brewer-park-place-condos/';
  const FEED_URL = SITE_ROOT + 'minutes-feed.json';
  const CACHE_KEY = 'bpp-published-minutes-v3';

  function isValidDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parts = value.split('-').map(Number);
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return parts[0] >= 1900 && parts[0] <= 2199 &&
      date.getUTCFullYear() === parts[0] &&
      date.getUTCMonth() === parts[1] - 1 && date.getUTCDate() === parts[2];
  }

  function minuteFromPath(value) {
    if (typeof value !== 'string' || value.length > 500 || /[\\\u0000-\u001f\u007f]/.test(value)) return null;
    const parts = value.split('/');
    if (parts[0] !== '' || parts[1] !== 'minutes' ||
        (parts.length !== 3 && parts.length !== 4)) return null;
    const folderYear = parts.length === 4 ? parts[2] : null;
    if (folderYear !== null && !/^20\d{2}$/.test(folderYear)) return null;
    const match = /^(20\d{2}-\d{2}-\d{2})\s+[-–—]\s+(.+)\.pdf$/i.exec(parts[parts.length - 1]);
    if (!match || !isValidDate(match[1]) ||
        (folderYear !== null && folderYear !== match[1].slice(0, 4))) return null;
    const description = match[2].trim();
    if (!description || description.length > 150 || /\bdraft\b/i.test(description)) return null;
    const date = match[1].split('-').map(Number);
    return {
      year: date[0], date: match[1],
      title: MONTHS[date[1] - 1] + ' ' + date[0] + ' ' + description,
      url: SITE_ROOT + parts.slice(1).map(encodeURIComponent).join('/')
    };
  }

  function safeMinuteUrl(value) {
    if (typeof value !== 'string' || value.length > 2000) return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
      if (['drive.google.com', 'docs.google.com'].includes(url.hostname)) return url.href;
      if (url.origin !== new URL(SITE_ROOT).origin || url.search || url.hash) return null;
      const sitePath = new URL(SITE_ROOT).pathname.slice(0, -1);
      if (!url.pathname.startsWith(sitePath + '/minutes/')) return null;
      const minute = minuteFromPath(decodeURIComponent(url.pathname.slice(sitePath.length)));
      return minute && minute.url === url.href ? url.href : null;
    } catch (error) {
      return null;
    }
  }

  function normalizeMinute(item) {
    if (!item || !isValidDate(item.date) || Number(item.year) !== Number(item.date.slice(0, 4)) ||
        typeof item.title !== 'string' || !item.title.trim() || item.title.length > 220) return null;
    const url = safeMinuteUrl(item.url);
    if (!url) return null;
    const urlId = ['drive.google.com', 'docs.google.com'].includes(new URL(url).hostname) ?
      /\/d\/([A-Za-z0-9_-]+)/.exec(url) : null;
    const id = urlId ? urlId[1] : url;
    return { id: id, year: Number(item.year), date: item.date, title: item.title.trim(), url: url };
  }

  function mergeMinutes(existing, uploaded) {
    const byId = new Map();
    existing.concat(uploaded).forEach(function (item) {
      const valid = normalizeMinute(item);
      if (valid) byId.set(valid.id, valid);
    });
    return Array.from(byId.values()).sort(function (a, b) {
      return b.year - a.year || a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
    });
  }

  function existingMinutes(container) {
    const result = [];
    container.querySelectorAll('details').forEach(function (group) {
      const summary = group.querySelector('summary');
      const year = Number(summary && summary.textContent.trim());
      group.querySelectorAll('a[href]').forEach(function (link) {
        const title = link.textContent.trim();
        const month = MONTHS.findIndex(function (name) {
          return new RegExp('\\b' + name + '\\b', 'i').test(title);
        });
        result.push({
          year: year,
          date: String(year) + '-' + String(month < 0 ? 1 : month + 1).padStart(2, '0') + '-01',
          title: title,
          url: link.getAttribute('href')
        });
      });
    });
    return result;
  }

  function renderMinutes(container, items) {
    const document = container.ownerDocument;
    const openYears = new Set(Array.from(container.querySelectorAll('details[open]')).map(function (el) {
      return Number(el.querySelector('summary').textContent.trim());
    }));
    const fragment = document.createDocumentFragment();
    const groups = new Map();
    items.forEach(function (item) {
      if (!groups.has(item.year)) groups.set(item.year, []);
      groups.get(item.year).push(item);
    });
    let firstYear = true;
    groups.forEach(function (minutes, year) {
      const details = document.createElement('details');
      details.open = openYears.has(year) || firstYear;
      firstYear = false;
      const summary = document.createElement('summary');
      summary.textContent = String(year);
      summary.style.cssText = 'cursor:pointer;font-size:1.15rem;font-weight:700;padding:8px 0;';
      const list = document.createElement('ul');
      list.className = 'announcement-list';
      list.style.marginTop = '10px';
      minutes.forEach(function (item) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = item.title;
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener';
        li.appendChild(link);
        list.appendChild(li);
      });
      details.append(summary, list);
      fragment.appendChild(details);
    });
    container.replaceChildren(fragment);
  }

  async function fetchMinutes(endpoint, timeoutMs) {
    if (endpoint !== FEED_URL) throw new Error('The minutes listing is not configured.');
    const controller = new global.AbortController();
    const timer = global.setTimeout(function () { controller.abort(); }, timeoutMs || 15000);
    try {
      const response = await global.fetch(endpoint, {
        credentials: 'omit', cache: 'no-cache', referrerPolicy: 'no-referrer', signal: controller.signal
      });
      if (!response.ok) throw new Error('The minutes listing could not be loaded.');
      const payload = await response.json();
      if (!payload || payload.schemaVersion !== 2 || !Array.isArray(payload.files) ||
          payload.files.length > 1000 || !payload.files.every(function (file) { return typeof file === 'string'; })) {
        throw new Error('The minutes listing is invalid.');
      }
      return {
        minutes: payload.files.map(minuteFromPath).filter(Boolean),
        skippedFiles: payload.files.filter(function (file) { return !minuteFromPath(file); }).length
      };
    } finally {
      global.clearTimeout(timer);
    }
  }

  function cachedMinutes() {
    try {
      const cached = JSON.parse(global.localStorage.getItem(CACHE_KEY));
      return Array.isArray(cached) && cached.length <= 1000 ? mergeMinutes([], cached) : [];
    } catch (error) { return []; }
  }

  function init() {
    const container = global.document.getElementById('meetingMinutesList');
    const config = global.BPP_MINUTES_CONFIG;
    if (!container || !config || !config.feedUrl) return;
    const original = existingMinutes(container);
    const status = global.document.getElementById('minutesLoadStatus');
    const cached = cachedMinutes();
    if (cached.length) renderMinutes(container, mergeMinutes(original, cached));
    fetchMinutes(config.feedUrl).then(function (payload) {
      if (payload.minutes.length) {
        renderMinutes(container, mergeMinutes(original, payload.minutes));
      } else if (cached.length) {
        renderMinutes(container, mergeMinutes(original, []));
      }
      try { global.localStorage.setItem(CACHE_KEY, JSON.stringify(payload.minutes)); } catch (error) {}
      if (status) status.hidden = true;
    }).catch(function () {
      if (status) {
        status.textContent = 'The latest minutes could not be checked. Previously loaded minutes are shown above. Please try refreshing later.';
        status.hidden = false;
      }
    });
  }

  const api = { isValidDate: isValidDate, safeMinuteUrl: safeMinuteUrl, minuteFromPath: minuteFromPath,
    normalizeMinute: normalizeMinute, mergeMinutes: mergeMinutes,
    existingMinutes: existingMinutes, renderMinutes: renderMinutes,
    fetchMinutes: fetchMinutes };
  global.BPPMinutes = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (global.document) {
    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);

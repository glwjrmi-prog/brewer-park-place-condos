(function (global) {
  'use strict';
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  function isValidDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parts = value.split('-').map(Number);
    const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    return parts[0] >= 1900 && parts[0] <= 2199 &&
      date.getUTCFullYear() === parts[0] &&
      date.getUTCMonth() === parts[1] - 1 && date.getUTCDate() === parts[2];
  }

  function safeDriveUrl(value) {
    if (typeof value !== 'string' || value.length > 2000) return null;
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password ||
          !['drive.google.com', 'docs.google.com'].includes(url.hostname)) return null;
      return url.href;
    } catch (error) {
      return null;
    }
  }

  function normalizeMinute(item) {
    if (!item || !isValidDate(item.date) || Number(item.year) !== Number(item.date.slice(0, 4)) ||
        typeof item.title !== 'string' || !item.title.trim() || item.title.length > 220) return null;
    const url = safeDriveUrl(item.url);
    if (!url) return null;
    const urlId = /\/d\/([A-Za-z0-9_-]+)/.exec(url);
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
    groups.forEach(function (minutes, year) {
      const details = document.createElement('details');
      details.open = openYears.has(year);
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

  function endpointUrl(value) {
    try {
      const url = new URL(value);
      const path = /^\/(?:macros\/s|a\/macros\/[A-Za-z0-9.-]+\/s)\/[A-Za-z0-9_-]+\/exec$/;
      return url.protocol === 'https:' && url.hostname === 'script.google.com' &&
        !url.username && !url.password && path.test(url.pathname) ? url : null;
    } catch (error) {
      return null;
    }
  }

  function fetchMinutes(endpoint, timeoutMs) {
    return new Promise(function (resolve, reject) {
      const url = endpointUrl(endpoint);
      if (!url) {
        reject(new Error('Publishing connection is not configured.'));
        return;
      }
      const callback = 'bppMinutesCallback_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = global.document.createElement('script');
      let settled = false;
      let timer;
      function finish(error, payload) {
        if (settled) return;
        settled = true;
        global.clearTimeout(timer);
        delete global[callback];
        script.remove();
        if (error) reject(error);
        else resolve(payload);
      }
      global[callback] = function (payload) {
        if (!payload || payload.schemaVersion !== 1 || payload.ok !== true ||
            !Array.isArray(payload.minutes) || payload.minutes.length > 1000) {
          finish(new Error('New minutes could not be loaded.'));
        } else {
          finish(null, payload);
        }
      };
      url.searchParams.set('callback', callback);
      script.src = url.href;
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      script.onerror = function () { finish(new Error('New minutes could not be loaded.')); };
      timer = global.setTimeout(function () {
        finish(new Error('New minutes could not be loaded.'));
      }, timeoutMs || 20000);
      global.document.head.appendChild(script);
    });
  }

  function init() {
    const container = global.document.getElementById('meetingMinutesList');
    const config = global.BPP_MINUTES_CONFIG;
    if (!container || !config || !config.endpoint) return;
    const original = existingMinutes(container);
    const status = global.document.getElementById('minutesLoadStatus');
    fetchMinutes(config.endpoint).then(function (payload) {
      if (payload.minutes.length) {
        renderMinutes(container, mergeMinutes(original, payload.minutes));
      }
      if (status) status.hidden = true;
    }).catch(function () {
      if (status) {
        status.textContent = 'Newly uploaded minutes are temporarily unavailable. Previously posted minutes are shown above.';
        status.hidden = false;
      }
    });
  }

  const api = { isValidDate: isValidDate, safeDriveUrl: safeDriveUrl,
    normalizeMinute: normalizeMinute, mergeMinutes: mergeMinutes,
    existingMinutes: existingMinutes, renderMinutes: renderMinutes,
    endpointUrl: endpointUrl, fetchMinutes: fetchMinutes };
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

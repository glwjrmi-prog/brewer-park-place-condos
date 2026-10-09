/**
 * BPP approved meeting minutes.
 * Read-only: lists finished, publicly readable PDFs and Google Docs from
 * the dedicated folder below. It does not change files or their sharing.
 */
const BPP_FOLDER_ID = '1A4jRPjnJcXYHwkV1XAqLSlzvLxQOmV_n';
const BPP_CACHE_KEY = 'bpp-approved-minutes-v1';
const BPP_CACHE_SECONDS = 60;
const BPP_FILE_LIMIT = 1000;

function doGet(event) {
  const callback = String(event && event.parameter && event.parameter.callback || '');
  if (callback && !/^bppMinutesCallback_[A-Za-z0-9_]{1,100}$/.test(callback)) {
    return ContentService.createTextOutput('Invalid callback')
      .setMimeType(ContentService.MimeType.TEXT);
  }
  let payload;
  try {
    const cache = CacheService.getScriptCache();
    const cached = cache.get(BPP_CACHE_KEY);
    if (cached) {
      payload = JSON.parse(cached);
    } else {
      payload = collectMinutes_();
      const serialized = JSON.stringify(payload);
      if (serialized.length < 90000) {
        cache.put(BPP_CACHE_KEY, serialized, BPP_CACHE_SECONDS);
      }
    }
  } catch (error) {
    console.error('BPP minutes could not be listed: ' + String(error));
    payload = { schemaVersion: 1, ok: false, minutes: [] };
  }
  const json = JSON.stringify(payload)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return ContentService.createTextOutput(callback ? callback + '(' + json + ');' : json)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function collectMinutes_() {
  const root = DriveApp.getFolderById(BPP_FOLDER_ID);
  const rootAccess = root.getSharingAccess();
  const result = {
    schemaVersion: 1,
    ok: true,
    updatedAt: new Date().toISOString(),
    cacheSeconds: BPP_CACHE_SECONDS,
    folderPublic: rootAccess === DriveApp.Access.ANYONE ||
      rootAccess === DriveApp.Access.ANYONE_WITH_LINK,
    minutes: [],
    skippedFiles: 0
  };
  let visited = 0;
  function addFolder(folder, expectedYear) {
    const files = folder.getFiles();
    while (files.hasNext()) {
      if (++visited > BPP_FILE_LIMIT) throw new Error('Minutes file limit exceeded');
      const file = files.next();
      const item = minuteFromFile_(file, expectedYear);
      if (item) result.minutes.push(item);
      else result.skippedFiles++;
    }
  }
  addFolder(root, null);
  const folders = root.getFolders();
  let folderCount = 0;
  while (folders.hasNext()) {
    if (++folderCount > 200) throw new Error('Minutes folder limit exceeded');
    const folder = folders.next();
    const name = folder.getName().trim();
    if (/^20\d{2}$/.test(name)) addFolder(folder, Number(name));
  }
  result.minutes.sort(function (a, b) {
    return b.year - a.year || a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
  });
  return result;
}

function minuteFromFile_(file, expectedYear) {
  if (file.isTrashed()) return null;
  const mime = file.getMimeType();
  if (mime !== 'application/pdf' && mime !== 'application/vnd.google-apps.document') {
    return null;
  }
  const access = file.getSharingAccess();
  if (access !== DriveApp.Access.ANYONE && access !== DriveApp.Access.ANYONE_WITH_LINK) {
    return null;
  }
  const name = file.getName().replace(/\.pdf$/i, '').trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})\s*[-–—]\s*(.+)$/.exec(name);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const checked = new Date(Date.UTC(year, month - 1, day));
  if (year < 2000 || year > 2099 ||
      checked.getUTCFullYear() !== year ||
      checked.getUTCMonth() !== month - 1 ||
      checked.getUTCDate() !== day ||
      (expectedYear !== null && year !== expectedYear)) {
    return null;
  }
  const description = match[4].trim();
  if (!description || description.length > 150 || /\bdraft\b/i.test(description)) return null;
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  let url = file.getUrl();
  const resourceKey = file.getResourceKey();
  if (resourceKey && !/[?&]resourcekey=/.test(url)) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'resourcekey=' + encodeURIComponent(resourceKey);
  }
  return {
    id: file.getId(),
    year: year,
    date: match[1] + '-' + match[2] + '-' + match[3],
    title: months[month - 1] + ' ' + day + ', ' + year + ' — ' + description,
    url: url
  };
}

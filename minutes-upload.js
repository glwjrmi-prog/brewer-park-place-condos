(function () {
  'use strict';
  const config = window.BPP_MINUTES_CONFIG;
  const api = window.BPPMinutes;
  const date = document.getElementById('meetingDate');
  const type = document.getElementById('meetingType');
  const name = document.getElementById('fileName');
  const copyName = document.getElementById('copyFileName');
  const folder = document.getElementById('uploadFolder');
  const nameStatus = document.getElementById('nameStatus');

  function updateName() {
    const valid = api.isValidDate(date.value);
    name.value = valid ? date.value + ' - ' + type.value + '.pdf' : '';
    copyName.disabled = !valid;
    const year = valid ? date.value.slice(0, 4) : String(new Date().getFullYear());
    if (config.yearFolders[year]) {
      folder.href = config.yearFolders[year];
      folder.textContent = 'Open ' + year + ' Upload Folder';
      nameStatus.textContent = '';
    } else {
      folder.href = config.folderUrl;
      folder.textContent = 'Open All Year Folders';
      nameStatus.textContent = 'Create a folder named ' + year + ' inside BPP Approved Board Minutes, then upload there.';
    }
  }
  date.addEventListener('input', updateName);
  type.addEventListener('change', updateName);
  updateName();

  async function copy(field, status) {
    try {
      await navigator.clipboard.writeText(field.value);
      status.textContent = 'Copied.';
    } catch (error) {
      field.focus();
      field.select();
      status.textContent = 'The text is selected. Press Ctrl+C to copy it.';
    }
  }
  copyName.addEventListener('click', function () { copy(name, nameStatus); });

  const codeStatus = document.getElementById('codeStatus');
  [['minutes-publisher/Code.gs', 'scriptCode', 'copyScript'],
    ['minutes-publisher/appsscript.json', 'manifestCode', 'copyManifest']].forEach(function (entry) {
    const field = document.getElementById(entry[1]);
    const button = document.getElementById(entry[2]);
    button.disabled = true;
    fetch(entry[0]).then(function (response) {
      if (!response.ok) throw new Error('Source is unavailable');
      return response.text();
    }).then(function (content) {
      field.value = content;
      button.disabled = false;
    }).catch(function () {
      field.value = '';
      codeStatus.textContent = 'Use the download links to open the script and manifest.';
    });
    button.addEventListener('click', function () { copy(field, codeStatus); });
  });

  const status = document.getElementById('connectionStatus');
  if (config.endpoint) {
    status.textContent = 'Checking the minutes upload connection…';
    api.fetchMinutes(config.endpoint).then(function (payload) {
      if (payload.folderPublic !== true) {
        status.textContent = 'The publishing script is connected. Set the Approved Board Minutes folder to Anyone with the link → Viewer to finish.';
      } else {
        status.textContent = 'Automatic publishing is connected. Follow the three meeting steps below, then refresh the website after about a minute.';
        status.classList.add('connected');
        document.getElementById('oneTimeSetup').open = false;
      }
    }).catch(function () {
      status.textContent = 'The upload connection is temporarily unavailable. Previously posted minutes remain on the website.';
    });
  }

  const url = document.getElementById('webAppUrl');
  const testButton = document.getElementById('testConnection');
  const testStatus = document.getElementById('testStatus');
  testButton.addEventListener('click', async function () {
    if (!api.endpointUrl(url.value.trim())) {
      testStatus.textContent = 'Paste the Google Web app URL ending in /exec.';
      return;
    }
    testButton.disabled = true;
    testStatus.textContent = 'Testing the publishing connection…';
    try {
      const payload = await api.fetchMinutes(url.value.trim());
      if (payload.folderPublic !== true) {
        testStatus.textContent = 'The script works. Set the Approved Board Minutes folder to Anyone with the link → Viewer, wait one minute, then test again.';
      } else {
        testStatus.textContent = 'Connection works. Send this Web app URL to Codex once to finish installation. ' +
          payload.minutes.length + ' newly uploaded minute file(s) found.' +
          (payload.skippedFiles ? ' ' + payload.skippedFiles + ' file(s) were skipped; check their name, file type, and viewing access.' : '');
      }
    } catch (error) {
      testStatus.textContent = 'The connection did not respond. Check that the web app is deployed with access set to Anyone and that the URL ends in /exec.';
    } finally {
      testButton.disabled = false;
    }
  });
})();

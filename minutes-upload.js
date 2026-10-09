(function () {
  'use strict';
  const config = window.BPP_MINUTES_CONFIG;
  const api = window.BPPMinutes;
  const date = document.getElementById('meetingDate');
  const type = document.getElementById('meetingType');
  const name = document.getElementById('fileName');
  const copyName = document.getElementById('copyFileName');
  const nameStatus = document.getElementById('nameStatus');
  const pdfInput = document.getElementById('finishedPdf');
  const savePdf = document.getElementById('saveNamedPdf');
  const pdfStatus = document.getElementById('pdfStatus');
  let approvedFile = null;

  function updateName() {
    const valid = api.isValidDate(date.value) && /^20\d{2}-/.test(date.value);
    name.value = valid ? date.value + ' - ' + type.value + '.pdf' : '';
    copyName.disabled = !valid;
    savePdf.disabled = !valid || !approvedFile;
    nameStatus.textContent = '';
  }
  date.addEventListener('input', updateName);
  type.addEventListener('change', updateName);
  updateName();

  copyName.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(name.value);
      nameStatus.textContent = 'Copied. Use this name when saving your PDF.';
    } catch (error) {
      name.focus();
      name.select();
      nameStatus.textContent = 'The file name is selected. Press Ctrl+C (Command+C on a Mac) to copy it.';
    }
  });

  pdfInput.addEventListener('change', async function () {
    const file = pdfInput.files[0];
    approvedFile = null;
    updateName();
    pdfStatus.textContent = '';
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) || file.size >= 25 * 1024 * 1024) {
      pdfStatus.textContent = 'Choose a finished PDF smaller than 25 MiB.';
      return;
    }
    try {
      const signature = await file.slice(0, 5).text();
      if (pdfInput.files[0] !== file) return;
      if (signature !== '%PDF-') {
        pdfStatus.textContent = 'This file is not a PDF. Save or download the minutes as a PDF first.';
        return;
      }
      approvedFile = file;
      updateName();
      pdfStatus.textContent = name.value ? 'Ready to save a named copy.' : 'Choose the meeting date above, then save a named copy.';
    } catch (error) {
      pdfStatus.textContent = 'This PDF could not be read. You can name it manually and upload it with the button above.';
    }
  });

  savePdf.addEventListener('click', function () {
    if (!approvedFile || !name.value) return;
    const url = URL.createObjectURL(approvedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = name.value;
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
    pdfStatus.textContent = 'Download started: ' + name.value + '. Upload that copy using Upload Finished Minutes.';
  });

  const status = document.getElementById('connectionStatus');
  api.fetchMinutes(config.feedUrl).then(function (payload) {
    status.classList.add('connected');
    status.textContent = 'Automatic publishing is ready. Follow the three meeting steps below.';
    if (payload.skippedFiles) {
      status.textContent += ' ' + payload.skippedFiles + ' uploaded PDF(s) are not listed; check their meeting-date names in View Uploaded Files.';
    }
  }).catch(function () {
    status.textContent = 'The minutes listing could not be checked right now. You can still upload a finished PDF. Refresh the website later to confirm its link.';
  });
})();

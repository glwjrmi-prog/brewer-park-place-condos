# Prepared Google Drive publisher — inactive

The active upload workflow uses GitHub and the website's existing Pages build.
Use the [permanent owner instructions](../minutes-upload.html) for every meeting.
These Apps Script files are retained as reference; they are not deployed or
connected to the website. The BPP Google account did not offer public web-app
access, and the personal-account sign-in could not be verified.

The proposed alternative was a read-only Google Apps Script listing publicly
readable PDFs and native Google Docs from BPP Approved Board Minutes, including
immediate child folders named 20xx. Completing it would require a new website
integration; the current minutes.js reads the generated minutes-feed.json.

## Requirements for any future Google integration

1. Share the dedicated folder with **Anyone with the link / Viewer**.
2. Create **BPP Minutes Publisher** under building@bppcondos.org.
3. Install Code.gs and the supplied appsscript.json.
4. Deploy as a web app, executing as the owner, accessible by **Anyone**.
5. Implement a Google JSONP consumer and configure its verified /exec URL.
6. Verify the live JSON/JSONP response, folderPublic, and the website before
   changing the active upload instructions.

No Google access token or account password belongs in the repository.
The script requests only Drive read access. It does not alter file permissions.
Files with restricted sharing, draft names, invalid dates, unsupported MIME types,
or dates that disagree with the year folder are not returned.

## Filename rules for the proposed alternative

Upload a finished file such as 2026-10-15 - Board Meeting Minutes.pdf
to its year folder. Native Google Docs use the name without .pdf.
The script caches the approved-file listing for 60 seconds.
New 20xx year folders are recognized without website edits.

Original documents, existing links, and the separate management suite are
outside this change. Document formatting is completed before publication.

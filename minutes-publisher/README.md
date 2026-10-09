# BPP meeting-minute publishing

The permanent owner instructions are at minutes-upload.html.

The website retains all previously published links as a fallback. A read-only
Google Apps Script adds new, publicly readable PDFs and native Google Docs from
BPP Approved Board Minutes, including immediate child folders named 20xx.

## One-time connection

1. Share the dedicated folder with **Anyone with the link / Viewer**.
2. Create **BPP Minutes Publisher** under building@bppcondos.org.
3. Install Code.gs and the supplied appsscript.json.
4. Deploy as a web app, executing as the owner, accessible by **Anyone**.
5. Set endpoint in minutes-config.js to the observed /exec URL.
6. Increment the config asset version in index.html and minutes-upload.html.
7. Verify the live JSON/JSONP response, folderPublic, and the website.

No Google access token or account password belongs in the repository.
The script requests only Drive read access. It does not alter file permissions.
Files with restricted sharing, draft names, invalid dates, unsupported MIME types,
or dates that disagree with the year folder are not returned.

## Each meeting

Upload a finished file such as 2026-10-15 - Board Meeting Minutes.pdf
to its year folder. Native Google Docs use the name without .pdf.
The script caches the approved-file listing for 60 seconds.
New 20xx year folders are recognized without website edits.

Original documents, existing links, and the separate management suite are
outside this change. Document formatting is completed before publication.

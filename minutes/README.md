# Approved Brewer Park Place meeting minutes

Use the [permanent upload guide](https://glwjrmi-prog.github.io/brewer-park-place-condos/minutes-upload.html) after every meeting.

1. Save the finished, approved minutes as a PDF, preserving their clean formatting.
2. Name the PDF `YYYY-MM-DD - Board Meeting Minutes.pdf`, using the actual meeting date. Annual and Special Meeting Minutes are also supported.
3. [Upload the PDF here](https://github.com/glwjrmi-prog/brewer-park-place-condos/upload/main/minutes), choose **Commit directly to the main branch**, and click **Commit changes**.
4. Allow up to 10 minutes for the website to publish, then refresh its Board Meeting Minutes section.

The website builds its own minutes list when a file is uploaded. All years use this same folder. No website edits or new sharing settings are needed for each meeting.

Files uploaded to this public repository can be viewed by anyone. Keep drafts, confidential material, and unapproved minutes out of this folder. A file with “Draft” in its name is omitted from the website listing, but remains public in the repository.

PDFs should be smaller than 25 MiB for browser uploads. To replace a posted PDF, upload its corrected version using the exact same file name and commit the change. To remove a PDF, open it in this folder and use GitHub's Delete file command, then commit the deletion. Deleting it removes it from the current website after publication; prior versions remain in the repository's history.

Developer note: `minutes-feed.json` uses the existing GitHub Pages Jekyll build to list PDF paths. `minutes.js` validates meeting-date names, groups links by year, and merges them with the 16 original minute links in `index.html`. No public GitHub API calls or access tokens are required by residents.

# BPP Policy Advisor link — DRAFT WEBSITE REVIEW ONLY (2026-11-22)

**DO NOT MERGE OR PUBLISH.** This branch changes only the resident site's Policy Advisor section. It replaces the legacy in-page question box with a plain large link that launches the tested secured Advisor page. Other resident forms and community rules remain intact.

## Why a separate page?
- The secure no-login staging Advisor already hosts its own readable question form and Turnstile widget, does server-side Siteverify and global quota checks, and returns source document names.
- The current website's `askResidentPolicyAdvisor()` posts `{question}` without Turnstile. Merely changing the URL would cause HTTP 403 and break resident use.
- A link avoids cross-origin/CORS complexity and keeps one tested accessible question form.

## Current draft intentionally NOT publishable
- Link target is **disabled staging** URL `https://bpp-resident-advisor-staging.glwjrmi.workers.dev/`.
- Link label says STAGING PREVIEW and a warning clearly says not for public release.
- Final link must point to a **dedicated, approved secure public Worker**, not the staging Worker or the current old production Worker.

## Production architecture / compatibility hazard
- The Management Suite's existing `policy-advisor-integration.js` directly calls `https://bpp-resident-policy-advisor.glwjrmi.workers.dev/` with `{question}` and **without Turnstile**. Replacing that existing Worker with the public Turnstile-gated Worker would break that client.
- **Use a separate dedicated resident-public Worker identity** (for example `bpp-resident-advisor-public`) with its own public Turnstile hostname, dedicated Durable Object quota binding, correct secrets and verified documents; preserve Suite's old endpoint until its own access plan has been tested.
- Its Turnstile Site Key, Secret Key, and `TURNSTILE_EXPECTED_HOSTNAME` must all match the selected **final public page hostname**. Cloudflare Siteverify hostname validation is mandatory, and no secrets belong in this repository.
- Production corpus: must include recorded Dec. 15 2020 Master Deed and Exhibit A Bylaws, and the current Nov 2025 Rules as the user confirmed. Staging vector store was configured with a **30-day inactivity expiration**; do not use that dependency for production without confirming persistent availability.
- Set `workers_dev = false` in staging config after tests; avoid accidentally re-enabling a public URL on future Wrangler deploys.

## Independent final gates
1. Check the complete Kent County recorded amendment history after instrument 202012150120440 and ask Association to verify the adopted current Rules.
2. Register a production-specific Turnstile widget at the selected new public Worker hostname; store its Secret Key as a Cloudflare secret, not in files or chat.
3. Build and validate an isolated dedicated public Worker; retain source citations, quota enforcement and source checks.
4. Test the public Worker in staging/preview with valid, invalid and reused Turnstile tokens plus quota exhaustion using **mocked OpenAI calls** to avoid charges.
5. Verify that regular resident requests complete and that the Management Suite old endpoint remains operational or is handled by a separate board access design.
6. Replace this branch's staging link with the approved URL only after these checks. Obtain explicit release approval, then merge/deploy using the user's normal website process; run a resident acceptance test and rollback if needed.

The November 22 staging proof included a no-login question answered with HTTP 200 in 18,785 ms, one 403 missing-token rejection, and Durable Object rate/reserve events. One success is not an uptime guarantee, and Durable Object activity alone does not demonstrate quota exhaustion. Do not represent this preview as production-ready.

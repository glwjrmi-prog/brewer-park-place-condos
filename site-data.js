/* Brewer Park Place Condos - Site Data and Rendering */

/* =========================
   BASIC SITE SETTINGS
========================= */

const SETTINGS = {
  hoaName: "Brewer Park Place Condominiums",
  subtitle: "Resident Resources",
  contactEmail: "property@bppcondos.org",
  publicNotice: "Brewer Park Place Condos community website."
};


/* =========================
   ANNOUNCEMENTS
========================= */

const ANNOUNCEMENTS = [
  {
    message: "Trash pickup day is Wednesdays, unless there is a holiday. Recycling is available; please contact Becky Bailey at treasurer@bppcondos.org for more information.",
    show: "Yes"
  },
  {
    message: "Follow parking rules and use designated spaces only.",
    show: "Yes"
  },
  {
    message: "Keep common areas clean and free of personal belongings.",
    show: "Yes"
  },
  {
    message: "Follow pet policies, including leash requirements and waste cleanup.",
    show: "Yes"
  }
];


/* =========================
   DOCUMENTS
========================= */

const DOCUMENTS = [
  {
    name: "Annual Budget 2026",
    category: "Financial",
    audience: "Residents Only",
    updated: "2026-05-02",
    link: "https://drive.google.com/file/d/1ZIRPE_TGtmkLj8n0_ZEUg6X4uCacnTys/view?usp=sharing",
    notes: "2025–2026 approved HOA budget.",
    status: "Active"
  },
  {
    name: "Maintenance Matrix",
    category: "Forms",
    audience: "Public",
    updated: "2026-05-02",
    link: "https://drive.google.com/file/d/1VrUpWDKYLiDDei8XcdGsJxpOVdybXTXp/view?usp=sharing",
    notes: "Use to determine owner or HOA responsibility for maintenance.",
    status: "Active"
  }
];


/* =========================
   CONTACTS
========================= */

const CONTACTS = [
  {
    group: "Board Members",
    type: "board",
    role: "HOA Board President",
    name: "Scott Gardner",
    phone: "616",
    email: "president@bppcondos.org",
    notes: "Primary board contact",
    show: "Yes"
  },
  {
    group: "Board Members",
    type: "board",
    role: "Treasurer",
    name: "Becky Bailey",
    phone: "616-540-9716",
    email: "treasurer@bppcondos.org",
    notes: "Budget and dues questions",
    show: "Yes"
  },
  {
    group: "Board Members",
    type: "board",
    role: "Secretary",
    name: "Julie Cogswell",
    phone: "616-706-5975",
    email: "secretary@bppcondos.org",
    notes: "Urgent common-area issues only",
    show: "Yes"
  },
  {
    group: "Management / Maintenance",
    type: "management",
    role: "Property Manager",
    name: "Jennifer Brooks",
    phone: "616-291-4681",
    email: "property@bppcondos.org",
    notes: "Maintenance and compliance",
    show: "Yes"
  },
  {
    group: "Management / Maintenance",
    type: "management",
    role: "Building Maintenance",
    name: "Gordy Wheeler",
    phone: "616-550-9880",
    email: "building@bppcondos.org",
    notes: "Exterior change requests",
    show: "Yes"
  }
];


/* =========================
   HELPER FUNCTIONS
========================= */

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function matchesSearch(obj, query) {
  if (!query) return true;
  return Object.values(obj).join(" ").toLowerCase().includes(query.toLowerCase());
}

function phoneHref(phone) {
  return String(phone || "").replace(/[^+\d]/g, "");
}


/* =========================
   RENDER DOCUMENTS
========================= */

function renderDocuments(query = "") {
  const grid = document.getElementById("documentGrid");

  grid.innerHTML = DOCUMENTS
    .filter(d => d.status !== "Archived" && matchesSearch(d, query))
    .map(d => `
      <article class="card searchable">
        <h3>${escapeHTML(d.name)}</h3>
        <div class="meta">
          ${escapeHTML(d.category)} • ${escapeHTML(d.audience)} • Updated ${escapeHTML(d.updated)}
        </div>
        <p>${escapeHTML(d.notes)}</p>
        <p>
          <a class="button-link" href="${escapeHTML(d.link)}" target="_blank" rel="noopener">
            Open document
          </a>
        </p>
      </article>
    `).join("") || `<p>No matching documents found.</p>`;
}


/* =========================
   RENDER CONTACTS
========================= */

function contactCard(c) {
  const phone = phoneHref(c.phone);
  const isEmergency = String(c.type).toLowerCase() === "emergency";

  return `
    <article class="card contact-card ${escapeHTML(c.type || "")} searchable">
      <div class="contact-name">${escapeHTML(c.name)}</div>
      <div class="contact-role">${escapeHTML(c.role)}</div>

      <div class="contact-actions">
        ${c.phone ? `
          <a class="contact-button ${isEmergency ? "emergency" : ""}" href="tel:${escapeHTML(phone)}">
            📞 Call ${escapeHTML(c.phone)}
          </a>
        ` : ""}

        ${c.email ? `
          <a class="contact-button" href="mailto:${escapeHTML(c.email)}?subject=Brewer%20Park%20Place%20Condos%20Question">
            ✉️ Email
          </a>
        ` : ""}
      </div>

      ${c.email ? `<div class="meta">${escapeHTML(c.email)}</div>` : ""}
      ${c.notes ? `<div class="contact-note">${escapeHTML(c.notes)}</div>` : ""}

      ${isEmergency ? `
        <div class="private-note">
          For emergencies involving immediate safety, call 911 first. Use this contact for urgent common-area or after-hours property issues.
        </div>
      ` : ""}
    </article>
  `;
}

function renderContacts(query = "") {
  const container = document.getElementById("contactGroups");

  const filtered = CONTACTS.filter(c =>
    c.show === "Yes" && matchesSearch(c, query)
  );

  const groups = [...new Set(filtered.map(c => c.group || "Other Contacts"))];

  container.innerHTML = groups.map(group => {
    const contacts = filtered.filter(c => (c.group || "Other Contacts") === group);

    return `
      <div class="contact-group">
        <h3 class="contact-group-title">${escapeHTML(group)}</h3>
        <div class="grid">
          ${contacts.map(contactCard).join("")}
        </div>
      </div>
    `;
  }).join("") || `<p>No matching contacts found.</p>`;
}


/* =========================
   RENDER ANNOUNCEMENTS
========================= */

function renderAnnouncements(query = "") {
  const list = document.getElementById("announcementGrid");

  const items = ANNOUNCEMENTS.filter(a =>
    (a.show ?? "Yes") === "Yes" && matchesSearch(a, query)
  );

  list.innerHTML = items.map(a => `
    <li class="searchable">${escapeHTML(a.message || "")}</li>
  `).join("") || `<li>No matching announcements found.</li>`;
}


/* =========================
   COMMUNITY RULES
========================= */

function setupCommunityRules() {
  document.querySelectorAll(".rules-title").forEach(title => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

  const rulesSearch = document.getElementById("rulesSearch");

  if (rulesSearch) {
    rulesSearch.addEventListener("input", function () {
      const q = this.value.toLowerCase();

      document.querySelectorAll(".rules-section").forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(q) || q === "" ? "block" : "none";
      });
    });
  }
}


/* =========================
   RENDER EVERYTHING
========================= */

function renderAll() {
  document.getElementById("hoaName").textContent = SETTINGS.hoaName;
  document.getElementById("subtitle").textContent = SETTINGS.subtitle;

  const publicNotice = document.getElementById("publicNotice");
  if (publicNotice) publicNotice.textContent = SETTINGS.publicNotice;

  const footerLink = document.querySelector("footer a");
  if (footerLink) {
    footerLink.textContent = SETTINGS.contactEmail;
    footerLink.href = `mailto:${SETTINGS.contactEmail}`;
  }

  renderAnnouncements();
  renderDocuments();
  renderContacts();
  setupCommunityRules();
}

renderAll();
const BYLAWS_SEARCH = [
  { title: "Article I, Section 1 — Organization", text: "organization association condominium project administration Brewer Park Place" },
  { title: "Article I, Section 2 — Compliance", text: "compliance bylaws master deed rules regulations co-owner owner duties" },
  { title: "Article I, Section 3 — Purpose of Bylaws", text: "purpose bylaws governance administration condominium project" },

  { title: "Article II, Section 1 — Membership", text: "membership association co-owner unit owner voting membership rights" },
  { title: "Article II, Section 2 — Voting Rights", text: "vote voting rights percentage value owner co-owner" },
  { title: "Article II, Section 3 — Persons Entitled to Vote", text: "vote person entitled voting representative owner co-owner" },
  { title: "Article II, Section 4 — Method of Voting", text: "voting ballot proxy in person vote method" },
  { title: "Article II, Section 5 — Majority", text: "majority vote approval members quorum" },

  { title: "Article III, Section 1 — Procedure", text: "meetings procedure annual meeting special meeting order association" },
  { title: "Article III, Section 2 — Annual Meetings of Members", text: "annual meeting members board election yearly meeting" },
  { title: "Article III, Section 3 — Special Meetings of Members", text: "special meeting members president board request notice" },
  { title: "Article III, Section 4 — Notice", text: "notice meeting mail electronic communication members" },
  { title: "Article III, Section 5 — Quorum of Members", text: "quorum members meeting vote majority" },
  { title: "Article III, Section 6 — Remote Meetings", text: "conference telephone remote communication electronic meeting" },
  { title: "Article III, Section 7 — Electronic and Remote Means", text: "electronic remote participation vote consent communication" },

  { title: "Article IV, Section 1 — Board of Directors; Terms", text: "board directors terms election management authority" },
  { title: "Article IV, Section 2 — Election of Directors", text: "election directors board annual meeting" },
  { title: "Article IV, Section 3 — Powers and Duties", text: "board powers duties rules regulations maintenance insurance assessments enforcement" },
  { title: "Article IV, Section 4 — Meetings of Directors", text: "board meetings directors regular special notice quorum" },
  { title: "Article IV, Section 5 — Professional Management Agent", text: "management property manager professional agent contract" },
  { title: "Article IV, Section 6 — Officers", text: "officers president secretary treasurer board duties" },
  { title: "Article IV, Section 7 — Actions Prior to First Meeting", text: "actions first meeting directors developer transition" },
  { title: "Article IV, Section 8 — Seal", text: "corporate seal association" },
  { title: "Article IV, Section 9 — Finance", text: "finance fiscal year depository banking funds" },
  { title: "Article IV, Section 10 — Indemnification, Insurance and Expenses", text: "indemnification insurance expenses liability directors officers protection" },

  { title: "Article V, Section 1 — Personal Property", text: "personal property common elements owner responsibility" },
  { title: "Article V, Section 2 — Costs and Receipts to be Common", text: "common expenses costs receipts administration maintenance" },
  { title: "Article V, Section 3 — Books of Account", text: "records books account financial statements audit inspection" },
  { title: "Article V, Section 4 — Regular Monthly Assessments", text: "assessments dues monthly payments budget expenses HOA dues" },
  { title: "Article V, Section 5 — Special Assessments", text: "special assessment repairs improvements emergency expense owner payment" },
  { title: "Article V, Section 6 — Collection of Assessments", text: "collection unpaid dues delinquent late fees lien foreclosure interest attorney fees" },
  { title: "Article V, Section 7 — Obligations of Developer", text: "developer obligations assessments developer responsibility" },
  { title: "Article V, Section 8 — Maintenance and Repair", text: "maintenance repair common elements unit responsibility repair replacement" },
  { title: "Article V, Section 9 — Taxes", text: "taxes property tax assessment" },
  { title: "Article V, Section 10 — Documents to be Kept", text: "documents records books bylaws master deed rules keep retain" },
  { title: "Article V, Section 11 — Reserve for Major Repairs and Replacement", text: "reserve fund major repairs replacement capital expenses" },

  { title: "Article VI — Insurance, Repair, Replacement and Real Estate Matters", text: "insurance repair replacement condemnation construction liens mortgages real estate" },

  { title: "Article VII — Use and Occupancy Restrictions; Enforcement", text: "use occupancy restrictions enforcement rules violations disabilities drain easements" },

  { title: "Article VIII — Leasing of Units", text: "lease leasing rental rent tenant non co-owner occupant landlord notice lease rights" },

  { title: "Article IX — Mortgages", text: "mortgage lender notice default insurance foreclosure financial statements inspection" },

  { title: "Article X — Amendments", text: "amendments bylaws proposal meeting effective date costs notice" },

  { title: "Article XII — Remedies for Default", text: "default remedies enforcement violation hearing failure to enforce rights cumulative" },

  { title: "Article XIII — Arbitration", text: "arbitration dispute election preservation rights" }
];

function setupBylawsSearch() {
  const searchInput = document.getElementById("bylawsSearch");
  const results = document.getElementById("bylawsResults");

  if (!searchInput || !results) return;

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    if (!query) {
      results.innerHTML = "";
      return;
    }

    const matches = BYLAWS_SEARCH.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.text.toLowerCase().includes(query)
    );

    results.innerHTML = matches.length
      ? matches.map(item => `
          <div class="notice">
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </div>
        `).join("")
      : `<p>No matching bylaw topics found.</p>`;
  });
}

setupBylawsSearch();

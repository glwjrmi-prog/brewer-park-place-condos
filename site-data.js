/* Site content and general rendering for Brewer Park Place Condos */
const SETTINGS = {
  hoaName: "Brewer Park Place Condos",
  subtitle: "Documents, contacts, announcements, and resident resources in one clean place.",
  lastUpdated: "2026-05-02",
  contactEmail: "property@bppcondos.org",
  publicNotice: "Starter template for Brewer Park Place Condos. Replace sample documents and contacts before publishing."
};

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

  { name: "Maintenance Matrix", category: "Forms", audience: "Public", updated: "2026-05-02", link: "https://drive.google.com/file/d/1VrUpWDKYLiDDei8XcdGsJxpOVdybXTXp/view?usp=sharing", notes: "Use to determine owner or HOA responsibility for maintenance.", status: "Active" }
  ];

 

const CONTACTS = [
  {
    "group": "Board Members",
    "type": "board",
    "role": "HOA Board President",
    "name": "Bill Brooks",
    "phone": "616-822-0024",
    "email": "president@bppcondos.org",
    "notes": "Primary board contact",
    "show": "Yes"
  },
  {
    "group": "Board Members",
    "type": "board",
    "role": "Treasurer",
    "name": "Becky Bailey",
    "phone": "616-540-9716",
    "email": "treasurer@bppcondos.org",
    "notes": "Budget and dues questions",
    "show": "Yes"
  },
  {
    "group": "Management / Maintenance",
    "type": "management",
    "role": "Property Manager",
    "name": "Jennifer Brooks",
    "phone": "616-291-4681",
    "email": "property@bppcondos.org",
    "notes": "Maintenance and compliance",
    "show": "Yes"
  },
  {
    "group": "Management / Maintenance",
    "type": "management",
    "role": "Building Maintenance",
    "name": "Kent Schantz",
    "phone": "616-550-9880",
    "email": "building@bppcondos.org",
    "notes": "Exterior change requests",
    "show": "Yes"
  },
  
  {
    "group": "Board Members",
    "type": "board",
    "role": "Secretary",
    "name": "Julie Cogswell",
    "phone": "616-706-5975",
    "email": "secretary@bppcondos.org",
    "notes": "Urgent common-area issues only",
    "show": "Yes"
  }
];

const ANNOUNCEMENTS = [
  {
    "message": "Trash Pick up day is Wednesdays, unless there is a holiday. Recycling is available, please contact Becky Bailey at treasurer@bppcondos.org for more information.",
    "show": "Yes"
  },
  {
    "message": "Follow parking rules and use designated spaces only",
    "show": "Yes"
  },
  {
    "message": "Keep common areas clean and free of personal belongings",
    "show": "Yes"
  },
  {
    "message": "Follow pet policies (leash requirements, waste cleanup, etc.)",
    "show": "Yes"
  },
  {
    "message": "Dues and water (if applicable) invoices are emailed quarterly in January, April, July and October. Payments can be placed in the black box located on the mail box bank near 49 Brewer Park Circle",
    "show": "Yes"
  }
];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function matchesSearch(obj, query) {
  if (!query) return true;
  return Object.values(obj).join(" ").toLowerCase().includes(query.toLowerCase());
}

function renderDocuments(query = "") {
  const grid = document.getElementById("documentGrid");
  grid.innerHTML = DOCUMENTS.filter(d => d.status !== "Archived" && matchesSearch(d, query)).map(d => `
    <article class="card searchable">
      <h3>${escapeHTML(d.name)}</h3>
      <div class="meta">${escapeHTML(d.category)} • ${escapeHTML(d.audience)} • Updated ${escapeHTML(d.updated)}</div>
      <p>${escapeHTML(d.notes)}</p>
      <p><a class="button-link" href="${escapeHTML(d.link)}" target="_blank" rel="noopener">Open document</a></p>
    </article>
  `).join("") || `<p>No matching documents found.</p>`;
}

function phoneHref(phone) {
  return String(phone || "").replace(/[^+\d]/g, "");
}

function contactCard(c) {
  const phone = phoneHref(c.phone);
  const isEmergency = String(c.type).toLowerCase() === "emergency";
  return `
    <article class="card contact-card ${escapeHTML(c.type || "")} searchable">
      <div class="contact-name">${escapeHTML(c.name)}</div>
      <div class="contact-role">${escapeHTML(c.role)}</div>
      <div class="contact-actions">
        ${c.phone ? `<a class="contact-button ${isEmergency ? "emergency" : ""}" href="tel:${escapeHTML(phone)}">📞 Call ${escapeHTML(c.phone)}</a>` : ""}
        ${c.email ? `<a class="contact-button" href="mailto:${escapeHTML(c.email)}?subject=Brewer%20Park%20Place%20Condos%20Question">✉️ Email</a>` : ""}
      </div>
      ${c.email ? `<div class="meta">${escapeHTML(c.email)}</div>` : ""}
      ${c.notes ? `<div class="contact-note">${escapeHTML(c.notes)}</div>` : ""}
      ${isEmergency ? `<div class="private-note">For emergencies involving immediate safety, call 911 first. Use this contact for urgent common-area or after-hours property issues.</div>` : ""}
    </article>
  `;
}

function renderContacts(query = "") {
  const container = document.getElementById("contactGroups");
  const contactOnlyQuery = document.getElementById("contactSearchBox")?.value.trim() || "";
  const combinedQuery = [query, contactOnlyQuery].filter(Boolean).join(" ");
  const filtered = CONTACTS.filter(c => c.show === "Yes" && matchesSearch(c, combinedQuery));
  const groups = [...new Set(filtered.map(c => c.group || "Other Contacts"))];

 

  container.innerHTML = groups.map(group => {
    const contacts = filtered.filter(c => (c.group || "Other Contacts") === group);
    return `
      <div class="contact-group">
        <h3 class="contact-group-title">${escapeHTML(group)}</h3>
        <div class="grid">${contacts.map(contactCard).join("")}</div>
      </div>
    `;
  }).join("") || `<p>No matching contacts found.</p>`;
}

function renderAnnouncements(query = "") {
  const list = document.getElementById("announcementGrid");
  const items = ANNOUNCEMENTS.filter(a => (a.show ?? "Yes") === "Yes" && matchesSearch(a, query));
  list.innerHTML = items.map(a => `
    <li class="searchable">${escapeHTML(a.message || a.title || "")}</li>
  `).join("") || `<li>No matching announcements found.</li>`;
}

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

  const q = document.getElementById("searchBox")?.value.trim() || "";

  renderAnnouncements(q);
  renderDocuments(q);
  renderContacts(q);
}



renderAll();

document.querySelectorAll(".rules-title").forEach(title => {
  title.addEventListener("click", () => {
    const content = title.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

document.getElementById("rulesSearch").addEventListener("input", function () {

  const q = this.value.toLowerCase();

  document.querySelectorAll(".rules-section").forEach(section => {

    const text = section.textContent.toLowerCase();

    section.style.display =
      text.includes(q) || q === ""
        ? "block"
        : "none";

  });

});

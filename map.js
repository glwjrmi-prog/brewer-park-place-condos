/* Community map resident data and behavior */
/* Embedded Community Map Dashboard Script */
const residents = [{"unit": 1, "address": 22, "last": "DeHaan", "first": "Fred", "second": "Ruth", "name": "Fred & Ruth DeHaan", "phone1": "616-329-7608", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 120, "y": 500}, {"unit": 2, "address": 26, "last": "Taggart", "first": "James", "second": "", "name": "James Taggart", "phone1": "773-941-1517", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 150, "y": 520}, {"unit": 3, "address": 30, "last": "Westveer", "first": "Joan", "second": "Bill", "name": "Joan & Bill Westveer", "phone1": "616-550-6110", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 200, "y": 500}, {"unit": 4, "address": 31, "last": "Spielberger", "first": "Regina", "second": "", "name": "Regina Spielberger", "phone1": "", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 240, "y": 420}, {"unit": 5, "address": 34, "last": "Osborne", "first": "Jim", "second": "", "name": "Jim Osborne", "phone1": "616-780-0070", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 215, "y": 520}, {"unit": 6, "address": 35, "last": "Edgell", "first": "Nancy", "second": "", "name": "Nancy Edgell", "phone1": "616-805-3039", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 260, "y": 400}, {"unit": 7, "address": 38, "last": "Gunnink", "first": "Arvin", "second": "Gerda", "name": "Arvin & Gerda Gunnink", "phone1": "616-581-7998", "email1": "", "phone2": "616-540-8878", "email2": "", "notes": "", "x": 240, "y": 500}, {"unit": 8, "address": 39, "last": "VanWyk", "first": "Carol", "second": "William", "name": "Carol & William VanWyk", "phone1": "616-516-5546", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 280, "y": 420}, {"unit": 9, "address": 42, "last": "VanStempvoort", "first": "Phil", "second": "Mary", "name": "Phil & Mary VanStempvoort", "phone1": "616-490-1942", "email1": "", "phone2": "616-490-1941", "email2": "", "notes": "", "x": 285, "y": 500}, {"unit": 10, "address": 46, "last": "Danenberg", "first": "Nate", "second": "", "name": "Nate Danenberg", "phone1": "616-808-1246", "email1": "", "phone2": "616-808-9310", "email2": "", "notes": "", "x": 315, "y": 520}, {"unit": 11, "address": 47, "last": "Stolt", "first": "John", "second": "", "name": "John Stolt", "phone1": "616-308-3454", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 345, "y": 420}, {"unit": 12, "address": 49, "last": "Elliott", "first": "Jim", "second": "Judy", "name": "Jim & Judy Elliott", "phone1": "815-263-8319", "email1": "", "phone2": "616-427-3930", "email2": "", "notes": "", "x": 380, "y": 420}, {"unit": 13, "address": 50, "last": "Crooks", "first": "Eric", "second": "", "name": "Eric Crooks", "phone1": "616-667-9778", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 360, "y": 500}, {"unit": 14, "address": 54, "last": "Buist", "first": "Cal", "second": "Mary", "name": "Cal & Mary Buist", "phone1": "616-780-4231", "email1": "", "phone2": "616-780-4551", "email2": "", "notes": "", "x": 390, "y": 520}, {"unit": 15, "address": 55, "last": "Wood", "first": "Greg", "second": "Shelby", "name": "Greg & Shelby Wood", "phone1": "616-221-1239", "email1": "", "phone2": "616-777-0290", "email2": "", "notes": "", "x": 420, "y": 420}, {"unit": 16, "address": 57, "last": "VanNest", "first": "Loretta", "second": "", "name": "Loretta VanNest", "phone1": "616-538-9554", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 450, "y": 400}, {"unit": 17, "address": 58, "last": "Stressman", "first": "Barb", "second": "", "name": "Barb Stressman", "phone1": "616-893-8091", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 420, "y": 500}, {"unit": 18, "address": 59, "last": "Talsma", "first": "Jan", "second": "Jan", "name": "Jan Talsma", "phone1": "616-350-7124", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 470, "y": 425}, {"unit": 19, "address": 62, "last": "Downing", "first": "Sharon", "second": "", "name": "Sharon Downing", "phone1": "616-443-3206", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 450, "y": 520}, {"unit": 20, "address": 66, "last": "Bradley", "first": "Joe", "second": "Lisa", "name": "Joe & Lisa Bradley", "phone1": "616-723-3010", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 490, "y": 500}, {"unit": 21, "address": 70, "last": "Scott", "first": "Dave", "second": "Judy", "name": "Dave & Judy Scott", "phone1": "616-455-7229", "email1": "", "phone2": "616-260-1595", "email2": "", "notes": "", "x": 590, "y": 465}, {"unit": 22, "address": 74, "last": "Verburg", "first": "Robin", "second": "", "name": "Robin Verburg", "phone1": "616-690-0501", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 610, "y": 440}, {"unit": 23, "address": 78, "last": "Wheeler", "first": "Gordy", "second": "Tina", "name": "Gordy & Tina Wheeler", "phone1": "616-970-4283","email1": "glwjr@duck.com","phone2": "616-970-0961","email2": "wheels1031@duck.com", "notes": "GR natives, lived in Ft Worth from 2014-2026.", "x": 590, "y": 415}, {"unit": 24, "address": 82, "last": "Johnson", "first": "Greg", "second": "Kelli", "name": "Greg & Kelli Johnson", "phone1": "586-280-5832", "email1": "", "phone2": "586-419-3543", "email2": "", "notes": "", "x": 615, "y": 355}, {"unit": 25, "address": 86, "last": "Marsh", "first": "Kindra", "second": "", "name": "Kindra Marsh", "phone1": "616-291-999", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 625, "y": 330}, {"unit": 26, "address": 90, "last": "Schantz", "first": "Kent", "second": "Dawn", "name": "Kent & Dawn Schantz", "phone1": "616-550-9880", "email1": "", "phone2": "", "email2": "", "notes": "", "x":600, "y": 300}, {"unit": 27, "address": 94, "last": "Morrison", "first": "Gene", "second": "Gloria", "name": "Gene & Gloria Morrison", "phone1": "616-819-9126", "email1": "", "phone2": "616-308-8685", "email2": "", "notes": "", "x": 525, "y": 315}, {"unit": 28, "address": 98, "last": "Brunink", "first": "Jan", "second": "", "name": "Jan Brunink", "phone1": "616-649-3900", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 500, "y": 280}, {"unit": 29, "address": 101, "last": "Keller", "first": "Kimm", "second": "", "name": "Kimm Keller", "phone1": "616-558-2757", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 395, "y": 340}, {"unit": 30, "address": 102, "last": "Brooks", "first": "Bill", "second": "Jennifer", "name": "Bill & Jennifer Brooks", "phone1": "616-822-0024", "email1": "president@bppcondos.org", "phone2": "616-291-4681", "email2": "property@bppcondos.org", "notes": "", "x": 480, "y": 260}, {"unit": 31, "address": 103, "last": "Charles", "first": "Sue", "second": "Mike", "name": "Sue & Mike Charles", "phone1": "616-450-9787", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 385, "y": 315}, {"unit": 32, "address": 105, "last": "Schwandt", "first": "James", "second": "Yvonne", "name": "James & Yvonne Schwandt", "phone1": "616-805-3832", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 375, "y": 290}, {"unit": 33, "address": 106, "last": "Erskine", "first": "Harold", "second": "Marlyn", "name": "Harold & Marlyn Erskine", "phone1": "269-214-9455", "email1": "", "phone2": "616-836-9455", "email2": "", "notes": "", "x": 445, "y": 220}, {"unit": 34, "address": 110, "last": "Dougherty", "first": "Mike", "second": "Shawn", "name": "Mike & Shawn Dougherty", "phone1": "616-890-9118", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 435., "y": 165}, {"unit": 35, "address": 111, "last": "Hilaski", "first": "Laura", "second": "", "name": "Laura Hilaski", "phone1": "616-540-7215", "email1": "", "phone2": "616-532-4558", "email2": "", "notes": "", "x": 350, "y": 245}, {"unit": 36, "address": 114, "last": "Lindsay", "first": "Kim", "second": "", "name": "Kim Lindsay", "phone1": "810-252-8286", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 435, "y": 135}, {"unit": 37, "address": 115, "last": "Ball", "first": "Morris", "second": "Ruth", "name": "Morris & Ruth Ball", "phone1": "616-719-2460", "email1": "", "phone2": "616-330-9463", "email2": "", "notes": "", "x": 310, "y": 225}, {"unit": 38, "address": 118, "last": "Gann", "first": "Jody", "second": "Roy", "name": "Jody & Roy Gann", "phone1": "616-994-2859", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 440, "y": 75}, {"unit": 39, "address": 122, "last": "Kozak", "first": "Dawn", "second": "", "name": "Dawn Kozak", "phone1": "", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 390, "y": 50}, {"unit": 40, "address": 126, "last": "Terpstra", "first": "Jerry", "second": "Barb Moerdyke", "name": "Jerry Terpstra & Barb Moerdyke", "phone1": "616-443-6547", "email1": "", "phone2": "616-258-8828", "email2": "", "notes": "", "x": 350, "y": 75}, {"unit": 41, "address": 130, "last": "Marlowe", "first": "Gloria", "second": "Patrick", "name": "Gloria & Patrick Marlowe", "phone1": "616-443-6362", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 310, "y": 50}, {"unit": 42, "address": 134, "last": "Bailey", "first": "Robert", "second": "Becky", "name": "Robert & Becky Bailey", "phone1": "616-540-1361", "email1": "", "phone2": "616-540-9716", "email2": "treasurer@bppcondos.org", "notes": "", "x": 280, "y": 135}, {"unit": 43, "address": 138, "last": "VanTil", "first": "Brian", "second": "Betty", "name": "Brian & Betty VanTil", "phone1": "616-257-0513", "email1": "", "phone2": "616-309-4850", "email2": "", "notes": "", "x": 255, "y": 110}, {"unit": 44, "address": 139, "last": "Spanstra", "first": "Victor", "second": "Janice", "name": "Victor & Janice Spanstra", "phone1": "616-822-4542", "email1": "", "phone2": "616-550-0979", "email2": "", "notes": "", "x": 255, "y": 245}, {"unit": 45, "address": 141, "last": "McAdams", "first": "Keith", "second": "", "name": "Keith McAdams", "phone1": "616-648-7254", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 220, "y": 225}, {"unit": 46, "address": 142, "last": "Cleveland", "first": "Laura", "second": "Darcy", "name": "Laura & Darcy Cleveland", "phone1": "616-540-4354", "email1": "", "phone2": "718-839-5192", "email2": "", "notes": "", "x": 225, "y": 135}, {"unit": 47, "address": 146, "last": "Spicer", "first": "Marlene", "second": "", "name": "Marlene Spicer", "phone1": "616-283-0929", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 200, "y": 110}, {"unit": 48, "address": 150, "last": "DeWaal", "first": "Jon", "second": "Sharon", "name": "Jon & Sharon DeWaal", "phone1": "404-764-8960", "email1": "", "phone2": "404-764-8973", "email2": "", "notes": "", "x": 150, "y": 135}, {"unit": 49, "address": 154, "last": "Gardner", "first": "Scott", "second": "Sue", "name": "Scott & Sue Gardner", "phone1": "616-308-6090", "email1": "", "phone2": "616-550-0104", "email2": "", "notes": "", "x": 125, "y": 110}, {"unit": 50, "address": 158, "last": "Walker", "first": "Patty", "second": "", "name": "Patty Walker", "phone1": "616-337-0269", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 85, "y": 155}, {"unit": 51, "address": 162, "last": "Jansen", "first": "Nathan", "second": "Sue", "name": "Nathan & Sue Jansen", "phone1": "616-862-4007", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90, "y": 190}, {"unit": 52, "address": 166, "last": "Young", "first": "Stacy", "second": "", "name": "Stacy Young", "phone1": "", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90, "y": 225}, {"unit": 53, "address": 170, "last": "Wilfong", "first": "Elizabeth", "second": "", "name": "Elizabeth Wilfong", "phone1": "989-860-8312", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90, "y": 245}, {"unit": 54, "address": 174, "last": "Harpst", "first": "Dale", "second": "Lynne", "name": "Dale & Lynne Harpst", "phone1": "616-723-3795", "email1": "", "phone2": "616-706-7918", "email2": "", "notes": "", "x": 90.00, "y": 265}, {"unit": 55, "address": 175, "last": "Lobdell", "first": "Larry", "second": "Lin", "name": "Larry & Lin Lobdell", "phone1": "616-648-6987", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 170.68, "y": 280}, {"unit": 56, "address": 177, "last": "Klooster", "first": "Mike", "second": "Denise", "name": "Mike & Denise Klooster", "phone1": "616-550-7105", "email1": "", "phone2": "616-550-6480", "email2": "", "notes": "", "x": 170.68, "y": 308}, {"unit": 57, "address": 178, "last": "Johnson", "first": "Michael", "second": "", "name": "Michael Johnson", "phone1": "616-717-1119", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90, "y": 310}, {"unit": 58, "address": 182, "last": "Sweet", "first": "Somnuek", "second": "", "name": "Somnuek Sweet", "phone1": "616-819-0521", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90.00, "y": 335}, {"unit": 59, "address": 183, "last": "Ozinga", "first": "Tom", "second": "Phong Hoang", "name": "Tom Ozinga & Phong Hoang", "phone1": "616-259-9449", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 170.68, "y": 360}, {"unit": 60, "address": 185, "last": "Lemke", "first": "Richard", "second": "Christine", "name": "Richard & Christine Lemke", "phone1": "616-862-4898", "email1": "", "phone2": "616-265-5297", "email2": "", "notes": "", "x": 170.68, "y": 387}, {"unit": 61, "address": 186, "last": "Weber", "first": "Vincent", "second": "", "name": "Vincent Weber", "phone1": "616-262-9193", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90.00, "y": 375.5}, {"unit": 62, "address": 190, "last": "Cogswell", "first": "Julie", "second": "", "name": "Julie Cogswell", "phone1": "616-706-5975", "email1": "", "phone2": "", "email2": "secretary@bppcondos.org", "notes": "", "x": 90.00, "y": 400.24}, {"unit": 63, "address": 194, "last": "Nevill", "first": "Deborah", "second": "", "name": "Deborah Nevill", "phone1": "989-599-5356", "email1": "", "phone2": "", "email2": "", "notes": "", "x": 90.00, "y": 425.5}];
const mapInner=document.getElementById('mapInner'); const detail=document.getElementById('detail'); const search=document.getElementById('search'); const resultList=document.getElementById('resultList');
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function phoneLink(phone){ if(!phone) return '<span class="note">Missing</span>'; const digits=phone.replace(/\D/g,''); if(digits.length!==10) return `<span class="note">${esc(phone)} — check number</span>`; return `<a href="tel:${digits}">${esc(phone)}</a>`; }
function renderDetail(r){
  document.querySelectorAll('.marker').forEach(m=>m.classList.remove('active','search-match'));

  const marker=document.querySelector(`.marker[data-unit="${r.unit}"]`);
  if(marker) marker.classList.add('active');

  detail.innerHTML=`
    <h2>${esc(r.name)}</h2>

    <div class="sub">Unit ${r.unit} • Street # ${esc(r.address)}</div>

    <div class="info-row">
      <div class="label">Primary Phone</div>
      <div class="value phone">${phoneLink(r.phone1)}</div>
    </div>

    <div class="info-row">
      <div class="label">Primary Email</div>
      <div class="value phone">${r.email1 ? `<a href="mailto:${esc(r.email1)}">${esc(r.email1)}</a>` : '—'}</div>
    </div>

    <div class="info-row">
      <div class="label">Secondary Phone</div>
      <div class="value phone">${r.phone2 ? phoneLink(r.phone2) : '—'}</div>
    </div>

    <div class="info-row">
      <div class="label">Secondary Email</div>
      <div class="value phone">${r.email2 ? `<a href="mailto:${esc(r.email2)}">${esc(r.email2)}</a>` : '—'}</div>
    </div>

    <div class="info-row">
      <div class="label">Notes</div>
      <div class="value ${r.notes ? 'note' : ''}">${esc(r.notes || 'No issues flagged')}</div>
    </div>
  `;
}
    function addMarkers(){ 
  residents.forEach(r=>{ 
    const m=document.createElement('button'); 
    m.className='marker'+(r.notes?' problem':''); 
    m.style.left=r.x+'px'; 
    m.style.top=r.y+'px'; 
    m.dataset.unit=r.unit; 
    m.title=`${r.address} Brewer Park Circle - ${r.name}`; 
    m.setAttribute('aria-label',`${r.address} Brewer Park Circle, ${r.name}`); 
    m.textContent = r.address;
    m.addEventListener('click',()=>renderDetail(r)); 
    mapInner.appendChild(m); 
  }); 
}
function selectUnit(unit){ const r=residents.find(x=>x.unit===unit); if(r) renderDetail(r); }
function filterResidents(q){ q=q.trim().toLowerCase(); if(!q) return residents; return residents.filter(r=>String(r.unit).includes(q)||String(r.address).includes(q)||r.name.toLowerCase().includes(q)||r.last.toLowerCase().includes(q)||r.first.toLowerCase().includes(q)||r.second.toLowerCase().includes(q)); }

function highlightSearchResults(items) {
  document.querySelectorAll('.marker').forEach(m => m.classList.remove('search-match'));

  items.forEach(r => {
    const marker = document.querySelector(`.marker[data-unit="${r.unit}"]`);
    if (marker) marker.classList.add('search-match');
  });

  if (items.length === 1) {
    renderDetail(items[0]);
    const marker = document.querySelector(`.marker[data-unit="${items[0].unit}"]`);
    if (marker) {
      marker.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }
}
function renderList(items){
  resultList.innerHTML = items.map(r => `
    <div class="list-item" onclick="selectUnit(${r.unit})">
      <strong>${esc(r.address)} Brewer Park Circle</strong>
      <span class="badge">Unit ${r.unit}</span><br>
      ${esc(r.name)}
    </div>
  `).join('');
}
search.addEventListener('input',()=>{ const items=filterResidents(search.value); renderList(items); if(items.length===1) renderDetail(items[0]); });
function clearSearch(){ search.value=''; renderList(residents); document.querySelectorAll('.marker').forEach(m=>m.classList.remove('active','search-match')); detail.innerHTML='<h2>Select a unit</h2><div class="sub">Click a number on the map or search above.</div>'; }
addMarkers();
renderList(residents);
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSuIFWHnNjdtffjE4eyNf1AZ-qlQOEqSmOZTdwvYWkCpeI61XcxzS1gkPFdRjO8BwFyBZVW57OWfa01/pub?gid=0&single=true&output=csv";

async function updateResidentContactsFromSheet() {
  try {

    async function updateResidentContactsFromSheet() {
  try {
    const response = await fetch(SHEET_CSV_URL + "&cachebust=" + Date.now());
    const csv = await response.text();

    const rows = csv.trim().split("\n").map(r =>
      r.split(",").map(c => c.replace(/^"|"$/g, "").trim())
    );

    const headers = rows.shift();

    rows.forEach(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = row[i] || "");

      const sheetAddress =
        obj.Address ||
        obj["Street Address"] ||
        obj["Brewer Park Circle Address"];

      const resident = residents.find(r =>
        Number(r.unit) === Number(obj.Unit) ||
        Number(r.address) === Number(sheetAddress)
      );

      if (resident) {
        resident.phone1 = obj.Phone1 || obj["Primary Phone"] || resident.phone1;
        resident.email1 = obj.Email1 || obj["Primary Email"] || resident.email1;
        resident.phone2 = obj.Phone2 || obj["Secondary Phone"] || resident.phone2;
        resident.email2 = obj.Email2 || obj["Secondary Email"] || resident.email2;
        resident.notes = obj.Notes || obj["Notes or Changes"] || resident.notes;
      }
    });

    renderList(residents);
    console.log("Resident contact info updated from Google Sheets");

  } catch (err) {
    console.error("Google Sheet update failed:", err);
  }
});

      const resident = residents.find(r =>
  Number(r.unit) === Number(obj.Unit) ||
  Number(r.address) === Number(obj.Address) ||
  Number(r.address) === Number(obj["Street Address"]) ||
  Number(r.address) === Number(obj["Brewer Park Circle Address"])
);

      if (resident) {

        resident.phone1 = obj.Phone1 || resident.phone1;
        resident.email1 = obj.Email1 || resident.email1;

        resident.phone2 = obj.Phone2 || resident.phone2;
        resident.email2 = obj.Email2 || resident.email2;

        resident.notes = obj.Notes || resident.notes;

      }

    });

    console.log("Resident contact info updated from Google Sheets");

  } catch (err) {

    console.error("Google Sheet update failed:", err);

  }
}

addMarkers();
renderList(residents);

// updateResidentContactsFromSheet().then(() => {
//   renderList(residents);
// });

/** Render page from data/profile.json (English only) */
let PROFILE = null;

function esc(s) {
  if (s == null) return "";
  const d = document.createElement("div");
  d.textContent = String(s);
  return d.innerHTML;
}

function metricVal(v) {
  return v == null || v === "" ? "—" : String(v);
}

function pubById(id) {
  return PROFILE.publications.find((p) => p.id === id);
}

function firstAuthor(authors) {
  if (!authors) return "";
  return authors.split(",")[0].trim();
}

function featuredAuthorLabel(authors) {
  const lead = firstAuthor(authors);
  if (!lead) return "";
  const hasCoAuthors = authors.split(",").length > 1;
  return hasCoAuthors ? `${lead} et al` : lead;
}

function renderPublication(p, opts = {}) {
  const featured = opts.featured === true;
  const year = p.year ? ` (${p.year})` : "";
  const itemClass = featured ? "pub-item pub-item--featured" : "pub-item";

  if (featured) {
    const authorLabel = featuredAuthorLabel(p.authors);
    const titleHtml = p.url
      ? `<a class="pub-title" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a>`
      : `<span class="pub-title">${esc(p.title)}</span>`;
    const inner = `<span class="pub-line"><span class="pub-authors">${esc(authorLabel)}</span>, ${titleHtml}, <span class="pub-venue">${esc(p.venue)}${esc(year)}</span></span>`;
    return `<li class="${itemClass}">${inner}</li>`;
  }

  const inner = `<span class="pub-authors">${esc(p.authors)}</span>
    <span class="pub-title">${esc(p.title)}</span>
    <span class="pub-venue"><em>${esc(p.venue)}</em>${esc(year)}</span>`;
  if (p.url) {
    return `<li class="${itemClass}"><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${inner}</a></li>`;
  }
  return `<li class="${itemClass}">${inner}</li>`;
}

function renderPublications() {
  const featured = PROFILE.publicationsFeatured
    .map(pubById)
    .filter(Boolean)
    .sort((a, b) => {
      const ya = a.year ?? 0;
      const yb = b.year ?? 0;
      return yb - ya;
    });
  const note = document.getElementById("pubs-note");
  if (note) note.textContent = PROFILE.publicationsNote || "";

  const featList = document.getElementById("pubs-featured");
  if (featList) featList.innerHTML = featured.map((p) => renderPublication(p, { featured: true })).join("");

  const allList = document.getElementById("pubs-all");
  if (allList) allList.innerHTML = PROFILE.publications.map(renderPublication).join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROFILE.projects
    .map(
      (repo) => {
        const lang = repo.language ? `<span class="repo-lang">${esc(repo.language)}</span>` : "";
        return `<article class="repo-card">
        <div class="repo-head">
          <a class="repo-name" href="${esc(repo.url)}" target="_blank" rel="noopener noreferrer">${esc(repo.name)}</a>
        </div>
        <p class="repo-desc">${esc(repo.description)}</p>
        <div class="repo-meta">${lang}</div>
      </article>`;
      }
    )
    .join("");
}

function renderMetrics() {
  const m = PROFILE.metrics;
  const elH = document.getElementById("metric-h");
  const elC = document.getElementById("metric-citations");
  const elW = document.getElementById("metric-works");
  const elAsOf = document.getElementById("metric-as-of");
  const foot = document.getElementById("metrics-footnote");
  if (elH) elH.textContent = metricVal(m.hIndex);
  if (elC) elC.textContent = metricVal(m.citations);
  if (elW) elW.textContent = metricVal(m.works);
  if (elAsOf) elAsOf.textContent = m.asOf || "";
  if (foot) foot.textContent = PROFILE.metricsFootnote || "";
  const scholarBtn = document.getElementById("scholar-btn");
  if (scholarBtn) scholarBtn.href = PROFILE.links.scholar;
}

function renderHero() {
  const nameEl = document.getElementById("hero-name");
  if (nameEl) nameEl.textContent = PROFILE.name;
}

function renderAbout() {
  const body = document.getElementById("about-body");
  if (body) {
    body.innerHTML = PROFILE.about.map((p) => `<p>${esc(p)}</p>`).join("");
  }
  const list = document.getElementById("interests-list");
  if (list) list.innerHTML = PROFILE.interests.map((i) => `<li>${esc(i)}</li>`).join("");
}

function renderExperience() {
  const ex = PROFILE.experience;
  const root = document.getElementById("experience-block");
  if (!root) return;
  root.innerHTML = `
    <h3 class="entry-title">${esc(ex.title)}</h3>
    <p class="entry-org">${esc(ex.org)} · ${esc(ex.location)}</p>
    <p class="entry-period">${esc(ex.period)}</p>`;
}

function renderEducation() {
  const list = document.getElementById("education-list");
  if (!list) return;
  list.innerHTML = PROFILE.education
    .map(
      (e) => `<li class="edu-item">
      <strong>${esc(e.degree)}</strong> — ${esc(e.school)}<br>
      <span class="muted">${esc(e.location)} · ${esc(e.period)}</span>
      ${e.note ? `<br><span class="edu-note">${esc(e.note)}</span>` : ""}
    </li>`
    )
    .join("");
}

function renderContact() {
  const emails = document.getElementById("contact-emails");
  if (emails) {
    emails.innerHTML = PROFILE.contact.emails
      .map(
        (e) => `<p class="contact-line">
        <span class="contact-label">${esc(e.label)}</span>
        <a href="mailto:${esc(e.address)}">${esc(e.address)}</a>
      </p>`
      )
      .join("");
  }
  const links = document.getElementById("contact-links");
  if (links) {
    const L = PROFILE.links;
    links.innerHTML = `
      <a href="${esc(L.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="${esc(L.scholar)}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
      <a href="${esc(L.orcid)}" target="_blank" rel="noopener noreferrer">ORCID</a>
      <a href="${esc(L.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`;
  }
}

function renderAll() {
  renderHero();
  renderAbout();
  renderExperience();
  renderEducation();
  renderMetrics();
  renderPublications();
  renderProjects();
  renderContact();
}

function initPubsToggle() {
  const details = document.getElementById("pubs-all-details");
  const summary = document.getElementById("pubs-all-summary");
  if (!details || !summary) return;
  const updateSummary = () => {
    summary.textContent = details.open ? "Hide full list" : "View all publications";
  };
  details.addEventListener("toggle", updateSummary);
  updateSummary();
}

async function init() {
  const res = await fetch("data/profile.json");
  if (!res.ok) throw new Error("Failed to load profile.json");
  PROFILE = await res.json();
  renderAll();
  initPubsToggle();
}

init().catch((err) => {
  console.error(err);
  document.body.insertAdjacentHTML(
    "beforeend",
    `<p class="load-error">Could not load site data. Run a local server from the personal-site folder (see README).</p>`
  );
});

// app.js
// Shared helper functions. Included on every page after data.js.

/**
 * Returns players sorted by a given key, highest first.
 */
function sortByKey(list, key) {
  return [...list].sort((a, b) => b[key] - a[key]);
}

/**
 * Returns the list of players tied for the highest value of `key`.
 * Handles ties (e.g. Ibrahim & Me both on 8 mafia wins).
 */
function getLeaders(key) {
  const max = Math.max(...players.map(p => p[key]));
  return { max, leaders: players.filter(p => p[key] === max) };
}

/**
 * Builds a <table> element listing every player's score for `key`,
 * sorted highest to lowest, and injects it into the given container.
 */
function renderTable(containerId, key) {
  const container = document.getElementById(containerId);
  const sorted = sortByKey(players, key);

  let rows = sorted.map((p, i) => `
    <tr class="${i === 0 && p[key] > 0 ? "top-row" : ""}">
      <td class="rank">${i + 1}</td>
      <td class="player-name">${p.name}</td>
      <td class="score">${p[key]}</td>
    </tr>
  `).join("");

  container.innerHTML = `
    <table class="scores-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Formats a list of leader names into a readable string,
 * e.g. "Ibrahim & Me" or just "Umer".
 */
function formatNames(list) {
  return list.map(p => p.name).join(" & ");
}

/**
 * Fills in the three home page summary cards.
 */
function renderHomeSummary() {
  const mafia = getLeaders("mafia");
  const jester = getLeaders("jester");
  const ace = getLeaders("ace");

  document.getElementById("mafia-leader").textContent = formatNames(mafia.leaders);
  document.getElementById("mafia-leader-score").textContent = `${mafia.max} win${mafia.max === 1 ? "" : "s"}`;

  document.getElementById("jester-leader").textContent = jester.max > 0 ? formatNames(jester.leaders) : "No wins yet";
  document.getElementById("jester-leader-score").textContent = jester.max > 0 ? `${jester.max} win${jester.max === 1 ? "" : "s"}` : "";

  document.getElementById("ace-leader").textContent = ace.max > 0 ? formatNames(ace.leaders) : "No wins yet";
  document.getElementById("ace-leader-score").textContent = ace.max > 0 ? `${ace.max} win${ace.max === 1 ? "" : "s"}` : "";
}

/**
 * Highlights the active nav link based on the current page filename.
 */
function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", highlightActiveNav);

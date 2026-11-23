// Topic filter for the Textbooks page: show only books that have every selected topic.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".book-filter").forEach((bar) => {
    const grid = document.getElementById(bar.dataset.for);
    const empty = document.querySelector(`.book-empty[data-for="${bar.dataset.for}"]`);
    const clear = bar.querySelector(".clear");
    const selected = new Set();

    const update = () => {
      let shown = 0;
      grid.querySelectorAll(".book").forEach((book) => {
        const tags = book.dataset.tags.split("|");
        const ok = [...selected].every((t) => tags.includes(t));
        book.hidden = !ok;
        if (ok) shown++;
      });
      bar.querySelectorAll("button[data-tag]").forEach((b) =>
        b.setAttribute("aria-pressed", selected.has(b.dataset.tag)));
      clear.hidden = selected.size === 0;
      if (empty) empty.hidden = shown > 0;
    };

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      if (btn === clear) selected.clear();
      else if (selected.has(btn.dataset.tag)) selected.delete(btn.dataset.tag);
      else selected.add(btn.dataset.tag);
      update();
    });
    update();
  });
});

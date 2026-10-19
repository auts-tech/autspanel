// AutsPanel website. Every feature here is an enhancement: the site works without JavaScript.
(function () {
  var root = document.documentElement.getAttribute("data-root") || "";

  // ── Copy buttons ─────────────────────────────────────────
  function copy(text, button) {
    var done = function () {
      var label = button.textContent;
      button.textContent = "Copied";
      setTimeout(function () {
        button.textContent = label;
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } catch (e) {}
      ta.remove();
    }
  }

  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      copy(button.getAttribute("data-copy"), button);
    });
  });

  document.querySelectorAll("pre > code").forEach(function (code) {
    var button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = "Copy";
    button.addEventListener("click", function () {
      copy(code.innerText.replace(/^\$ /gm, ""), button);
    });
    code.parentElement.appendChild(button);
  });

  // ── Mobile menu ──────────────────────────────────────────
  document.querySelectorAll(".menu-panel a").forEach(function (a) {
    a.addEventListener("click", function () {
      var menu = a.closest("details");
      if (menu) menu.removeAttribute("open");
    });
  });

  // ── Theme toggle ─────────────────────────────────────────
  function currentTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.querySelectorAll(".theme-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  });

  // ── Search (⌘K) ──────────────────────────────────────────
  var dialog = document.querySelector(".search-dialog");
  var index = window.AUTSPANEL_SEARCH || [];
  if (dialog && dialog.showModal && index.length) {
    var input = dialog.querySelector("input");
    var list = dialog.querySelector(".search-results");
    var selected = 0;

    var escapeHtml = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    };

    var render = function () {
      var words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var hits = index
        .map(function (item) {
          var title = item.t.toLowerCase();
          var hay = (item.t + " " + item.p + " " + item.k).toLowerCase();
          if (!words.every(function (w) { return hay.indexOf(w) !== -1; })) return null;
          var score = words.reduce(function (n, w) { return n + (title.indexOf(w) !== -1 ? 3 : 1); }, 0) + (item.top ? 1 : 0);
          return { item: item, score: score };
        })
        .filter(Boolean)
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, words.length ? 12 : 8);
      selected = 0;
      if (!hits.length) {
        list.innerHTML = '<li class="search-empty">No results for “' + escapeHtml(input.value) + '”</li>';
        return;
      }
      list.innerHTML = hits
        .map(function (h, i) {
          return '<li><a role="option" href="' + root + h.item.u + '"' + (i === 0 ? ' aria-selected="true"' : "") + ">" + escapeHtml(h.item.t) + "<small>" + escapeHtml(h.item.p) + "</small></a></li>";
        })
        .join("");
    };

    var move = function (delta) {
      var links = list.querySelectorAll("a");
      if (!links.length) return;
      links[selected].removeAttribute("aria-selected");
      selected = (selected + delta + links.length) % links.length;
      links[selected].setAttribute("aria-selected", "true");
      links[selected].scrollIntoView({ block: "nearest" });
    };

    var open = function () {
      input.value = "";
      render();
      dialog.showModal();
      input.focus();
    };

    document.querySelectorAll("[data-search]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        open();
      });
    });

    document.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || "");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && !dialog.open)) {
        e.preventDefault();
        dialog.open ? dialog.close() : open();
      }
    });

    input.addEventListener("input", render);
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter") {
        var link = list.querySelectorAll("a")[selected];
        if (link) window.location.href = link.href;
      }
    });

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    list.addEventListener("click", function () {
      dialog.close();
    });

    var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    if (!mac) {
      document.querySelectorAll(".search-btn kbd").forEach(function (k) {
        k.textContent = "Ctrl K";
      });
    }
  }

  // ── Tabs (product tour) ──────────────────────────────────
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var tabs = wrap.querySelectorAll('[role="tab"]');
    var panels = wrap.querySelectorAll('[role="tabpanel"]');
    var show = function (i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", j === i ? "true" : "false");
        t.tabIndex = j === i ? 0 : -1;
      });
      panels.forEach(function (p, j) {
        p.hidden = j !== i;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        show(i);
      });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") show((i + 1) % tabs.length, true);
        if (e.key === "ArrowLeft") show((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    wrap.classList.add("tabs-ready");
    show(0);
  });

  // ── Reveal on scroll, terminal animation ─────────────────
  var revealables = document.querySelectorAll(".reveal, .terminal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // ── Docs: highlight the current section in "On this page" ─
  var tocLinks = document.querySelectorAll(".toc-side a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var headings = Object.keys(byId)
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);
    var setActive = function (id) {
      tocLinks.forEach(function (a) {
        a.classList.toggle("active", a === byId[id]);
      });
    };
    var spy = new IntersectionObserver(
      function () {
        var current = headings[0];
        headings.forEach(function (h) {
          if (h.getBoundingClientRect().top < 140) current = h;
        });
        if (current) setActive(current.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 1] },
    );
    headings.forEach(function (h) {
      spy.observe(h);
    });
  }

  // ── Docs: link icon on section headings ──────────────────
  document.querySelectorAll(".prose h2[id]").forEach(function (h) {
    var a = document.createElement("a");
    a.className = "heading-anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    h.appendChild(a);
  });
})();

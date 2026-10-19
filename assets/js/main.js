// Copy buttons for install commands and code blocks. The site works without JavaScript.
(function () {
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

  // Close the mobile menu after following a link
  document.querySelectorAll(".menu-panel a").forEach(function (a) {
    a.addEventListener("click", function () {
      var menu = a.closest("details");
      if (menu) menu.removeAttribute("open");
    });
  });
})();

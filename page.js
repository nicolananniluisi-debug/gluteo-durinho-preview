/* ============================================================================
   page.js — bespoke devices for Projeto Glúteo Durinho.
   Reads --sc-p off the engine's act elements with its own rAF loop. Does not
   touch scrollcraft.js. Two bespoke things live here:
     1. "Pensamento ao vivo" — the mind-talks live-typing monologue.
     2. Delivers rail staggered settle (devices.md §3 recipe).
   ============================================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function readP(el) {
    var raw = getComputedStyle(el).getPropertyValue('--sc-p').trim();
    var n = parseFloat(raw);
    return isNaN(n) ? 0 : n;
  }

  /* ---------------------------------------------------------- mind-talks -- */
  function initMindTalks() {
    var root = document.querySelector('[data-mind-root]');
    if (!root) return;
    var lineEls = Array.prototype.slice.call(root.querySelectorAll('[data-mind-line]'));
    var portraitEls = Array.prototype.slice.call(root.querySelectorAll('[data-mind-portrait]'));
    var conclusionEl = root.querySelector('[data-mind-conclusion]');

    var lines = lineEls.map(function (el) {
      return { el: el, text: el.getAttribute('data-mind-text') || '', start: parseFloat(el.getAttribute('data-mind-start')), end: parseFloat(el.getAttribute('data-mind-end')) };
    });
    var conclusion = conclusionEl ? {
      el: conclusionEl,
      text: conclusionEl.getAttribute('data-mind-text') || '',
      html: conclusionEl.getAttribute('data-mind-html') || '',
      start: parseFloat(conclusionEl.getAttribute('data-mind-start')),
      end: parseFloat(conclusionEl.getAttribute('data-mind-end'))
    } : null;

    if (reduceMotion) {
      lines.forEach(function (l) { l.el.textContent = l.text; });
      if (conclusion) conclusion.el.innerHTML = conclusion.html || conclusion.text;
      portraitEls.forEach(function (p, i) { if (i === lines.length - 1) p.classList.add('is-active'); });
      return;
    }

    function charsFor(local) {
      // local in [0,1] within a line's own window: 0-0.5 type, 0.5-0.75 hold, 0.75-1 erase
      if (local <= 0) return 0;
      if (local < 0.5) return null; // computed by caller with text length
      return null;
    }

    function render() {
      var p = readP(root);
      var activeIndex = -1;

      lines.forEach(function (line, i) {
        var span = line.end - line.start;
        var local = span > 0 ? (p - line.start) / span : 0;
        var count;
        if (local <= 0) {
          count = 0;
        } else if (local >= 1) {
          count = 0; // fully erased, next line's turn
        } else if (local < 0.5) {
          count = Math.ceil((local / 0.5) * line.text.length);
          activeIndex = i;
        } else if (local < 0.75) {
          count = line.text.length;
          activeIndex = i;
        } else {
          var erase = (local - 0.75) / 0.25;
          count = Math.floor(line.text.length * (1 - erase));
          activeIndex = i;
        }
        count = Math.max(0, Math.min(line.text.length, count));
        line.el.textContent = line.text.slice(0, count);
        line.el.classList.toggle('is-typing', local > 0 && local < 1 && count > 0);
      });

      if (conclusion) {
        var cspan = conclusion.end - conclusion.start;
        var clocal = cspan > 0 ? (p - conclusion.start) / cspan : 0;
        if (clocal <= 0) {
          conclusion.el.textContent = '';
          conclusion.el.classList.remove('is-typing');
        } else if (clocal >= 1) {
          conclusion.el.innerHTML = conclusion.html || conclusion.text;
          conclusion.el.classList.remove('is-typing');
        } else {
          var ccount = Math.max(0, Math.min(conclusion.text.length, Math.ceil(clocal * conclusion.text.length)));
          conclusion.el.textContent = conclusion.text.slice(0, ccount);
          conclusion.el.classList.add('is-typing');
        }
      }

      portraitEls.forEach(function (el, i) {
        el.classList.toggle('is-active', i === activeIndex);
      });

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  /* ------------------------------------------------------ delivers rail -- */
  function initDeliversRail() {
    var act = document.querySelector('[data-delivers-root]');
    if (!act) return;
    var items = Array.prototype.slice.call(act.querySelectorAll('[data-delivers-item]'));
    if (!items.length) return;

    if (reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-settled'); });
      return;
    }

    function render() {
      var p = readP(act);
      items.forEach(function (el, i) {
        if (i === 0) { el.classList.add('is-settled'); return; }
        var threshold = i / (items.length + 1);
        el.classList.toggle('is-settled', p >= threshold);
      });
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMindTalks();
    initDeliversRail();
  });
})();

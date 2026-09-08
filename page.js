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
    var comboEls = Array.prototype.slice.call(root.querySelectorAll('[data-mind-combo]'));
    var conclusionEl = root.querySelector('[data-mind-conclusion]');

    var combos = comboEls.map(function (el) {
      var lineEl = el.querySelector('[data-mind-line]');
      return {
        el: el, lineEl: lineEl,
        text: lineEl.getAttribute('data-mind-text') || '',
        start: parseFloat(el.getAttribute('data-mind-start')),
        end: parseFloat(el.getAttribute('data-mind-end'))
      };
    });
    var conclusion = conclusionEl ? {
      el: conclusionEl,
      text: conclusionEl.getAttribute('data-mind-text') || '',
      html: conclusionEl.getAttribute('data-mind-html') || '',
      start: parseFloat(conclusionEl.getAttribute('data-mind-start')),
      end: parseFloat(conclusionEl.getAttribute('data-mind-end'))
    } : null;

    if (reduceMotion) {
      var last = combos[combos.length - 1];
      combos.forEach(function (c) {
        c.lineEl.textContent = c === last ? c.text : '';
        c.el.classList.toggle('is-active', c === last);
      });
      if (conclusion) conclusion.el.innerHTML = conclusion.html || conclusion.text;
      return;
    }

    function render() {
      var p = readP(root);

      combos.forEach(function (combo) {
        var span = combo.end - combo.start;
        var local = span > 0 ? (p - combo.start) / span : 0;
        var count, active;
        if (local <= 0) {
          count = 0; active = false;
        } else if (local >= 1) {
          count = 0; active = false; // fully erased, next combo's turn
        } else if (local < 0.3) {
          count = Math.ceil((local / 0.3) * combo.text.length);
          active = true;
        } else if (local < 0.88) {
          count = combo.text.length;
          active = true;
        } else {
          var erase = (local - 0.88) / 0.12;
          count = Math.floor(combo.text.length * (1 - erase));
          active = true;
        }
        count = Math.max(0, Math.min(combo.text.length, count));
        combo.lineEl.textContent = combo.text.slice(0, count);
        combo.lineEl.classList.toggle('is-typing', local > 0 && local < 1 && count > 0);
        combo.el.classList.toggle('is-active', active);
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

  /* ------------------------------------------------------ pt-BR counts -- */
  /* scrollcraft.js formata milhar com vírgula ("3,000"); em pt-BR isso lê
     como "três vírgula zero". O motor é intocável, então trocamos o
     separador logo depois de cada escrita dele, no mesmo frame. */
  function initPtBrCounts() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-sc-count]'));
    if (!els.length) return;
    function fix(el) {
      if (el.textContent.indexOf(',') > -1) el.textContent = el.textContent.replace(/,/g, '.');
    }
    var mo = new MutationObserver(function (recs) {
      recs.forEach(function (r) { fix(r.target.nodeType === 3 ? r.target.parentNode : r.target); });
    });
    els.forEach(function (el) { fix(el); mo.observe(el, { childList: true, characterData: true, subtree: true }); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMindTalks();
    initDeliversRail();
    initPtBrCounts();
  });
})();

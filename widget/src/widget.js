/**
 * Widerrufsbutton DACH — embeddable widget (§ 356a BGB).
 * Vanilla JS, no dependencies, closed Shadow DOM, ≤ 5 KB raw minified.
 *
 * Embed:
 *   <script src="https://cdn.example/widget.min.js" data-api-key="ORG_KEY" defer></script>
 *
 * Reads its own data-api-key (and optional data-api). All CSS is inlined; the
 * button only renders when the shop's subscription is active (render gate).
 */
import { I18N } from "./i18n.js";

(function () {
  "use strict";

  var self = document.currentScript;
  if (!self) {
    var s = document.querySelectorAll("script[data-api-key]");
    self = s[s.length - 1];
  }
  if (!self) return;

  var API_KEY = self.getAttribute("data-api-key") || "";
  var API_BASE = (self.getAttribute("data-api") || "https://app.example").replace(/\/$/, "");
  var T = I18N.de;

  if (!API_KEY) return;
  if (customElements.get("widerruf-button")) return;

  var CSS =
    "*{box-sizing:border-box}" +
    ".e,.a{cursor:pointer;border:0;border-radius:8px;font-size:15px;font-weight:600}" +
    ".e{position:fixed;bottom:20px;right:20px;z-index:99999;background:#0009;color:#fff;padding:12px 18px;backdrop-filter:blur(9px);border:1px solid #fff3}" +
    ":focus-visible{outline:2px solid #6af}" +
    ".o{position:fixed;inset:0;z-index:1000000;background:#0009;display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".m{background:#fff;color:#111;width:100%;max-width:420px;border-radius:12px;padding:24px;max-height:90vh;overflow:auto}" +
    "h2{margin:0 0 12px;font-size:20px}" +
    "label{display:block;font-size:13px;font-weight:600;margin:12px 0 4px}" +
    "input{width:100%;padding:10px;font-size:15px;border:1px solid #cbd5e1;border-radius:8px}" +
    "[aria-invalid=true]{border-color:#b91c1c}" +
    ".x{color:#b91c1c;font-size:13px;margin-top:12px}" +
    ".r{display:flex;gap:8px;margin-top:20px}.a{flex:1;padding:12px}" +
    ".k{background:#b91c1c;color:#fff}.k:disabled{opacity:.6}" +
    ".c{background:#e2e8f0;color:#111}.t{text-align:center}" +
    ".p{font-size:11px;color:#94a3b8;margin:14px 0 0;line-height:1.4}";

  class WB extends HTMLElement {
    constructor() {
      super();
      var root = this.attachShadow({ mode: "closed" });
      this._r = root;
      var style = document.createElement("style");
      style.textContent = CSS;
      root.appendChild(style);

      var btn = document.createElement("button");
      btn.className = "e";
      btn.type = "button";
      btn.textContent = T.entry;
      btn.addEventListener("click", this.open.bind(this));
      this._btn = btn;
      root.appendChild(btn);
    }

    open() {
      if (this._ov) return;
      var ov = document.createElement("div");
      ov.className = "o";
      ov.addEventListener("mousedown", (e) => { if (e.target === ov) this.close(); });
      ov.addEventListener("keydown", (e) => { if (e.key === "Escape") this.close(); });

      var mo = document.createElement("div");
      mo.className = "m";
      mo.setAttribute("role", "dialog");
      mo.setAttribute("aria-modal", "true");
      mo.setAttribute("aria-labelledby", "wb-t");
      ov.appendChild(mo);
      this._ov = ov;
      this._mo = mo;
      this._form();
      this._r.appendChild(ov);
      var f = mo.querySelector("input");
      if (f) f.focus();
    }

    close() {
      if (this._ov) { this._r.removeChild(this._ov); this._ov = null; }
      this._btn.focus();
    }

    _form() {
      var t = T;
      this._mo.innerHTML =
        '<h2 id="wb-t">' + esc(t.title) + "</h2>" +
        field("wb-n", t.name, "text", "name") +
        field("wb-o", t.order, "text", "off") +
        field("wb-e", t.email, "email", "email") +
        '<p class="p">' + esc(t.privacy) + "</p>" +
        '<p class="x" id="wb-x" role="alert"></p>' +
        '<div class="r">' +
          '<button type="button" class="a c" id="wb-c">' + esc(t.close) + "</button>" +
          '<button type="button" class="a k" id="wb-s">' + esc(t.confirm) + "</button>" +
        "</div>";
      var m = this._mo;
      m.querySelector("#wb-c").addEventListener("click", this.close.bind(this));
      m.querySelector("#wb-s").addEventListener("click", this._submit.bind(this));
    }

    _val(id) { return (this._mo.querySelector(id).value || "").trim(); }

    _flag(id, bad) {
      this._mo.querySelector(id).setAttribute("aria-invalid", bad ? "true" : "false");
      return !bad;
    }

    _msg(text) { this._mo.querySelector("#wb-x").textContent = text || ""; }

    _submit() {
      var t = T;
      var name = this._val("#wb-n"), order = this._val("#wb-o"), email = this._val("#wb-e");
      var ok = true;
      ok = this._flag("#wb-n", !name) && ok;
      ok = this._flag("#wb-o", !order) && ok;
      ok = this._flag("#wb-e", !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) && ok;
      if (!ok) { this._msg(t.eVal); return; }
      this._msg("");

      var btn = this._mo.querySelector("#wb-s");
      btn.disabled = true;
      var ctrl = new AbortController();
      var to = setTimeout(() => ctrl.abort(), 10000);

      fetch(API_BASE + "/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Api-Key": API_KEY },
        body: JSON.stringify({ name: name, order_id: order, email: email }),
        signal: ctrl.signal,
      })
        .then((res) => res.json().then((d) => ({ s: res.status, d: d })))
        .then((r) => {
          clearTimeout(to);
          if (r.s === 200 && r.d && r.d.ok) return this._success(r.d, email);
          btn.disabled = false;
          this._msg(r.s === 429 ? t.eRate : r.s === 400 ? t.eVal : t.eGen);
        })
        .catch(() => { clearTimeout(to); btn.disabled = false; this._msg(t.eNet); });
    }

    _success(d, email) {
      var t = T;
      var time = fmt(d.received_at);
      this._mo.innerHTML =
        '<h2 id="wb-t" class="t">\u2713 ' + esc(t.okTitle) + "</h2>" +
        '<p class="t">' + esc(t.okBody.replace("{time}", time).replace("{email}", email)) + "</p>" +
        '<div class="r"><button type="button" class="a k" id="wb-d">' + esc(t.close) + "</button></div>";
      var b = this._mo.querySelector("#wb-d");
      b.addEventListener("click", this.close.bind(this));
      b.focus();
    }
  }

  function field(id, label, type, auto) {
    return (
      "<label for='" + id + "'>" + esc(label) + "</label>" +
      "<input id='" + id + "' type='" + type + "' autocomplete='" + auto + "'/>"
    );
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
  }
  function fmt(iso) {
    try { return new Date(iso).toLocaleString("de"); } catch (e) { return iso; }
  }

  customElements.define("widerruf-button", WB);

  function render() {
    if (document.querySelector("widerruf-button")) return;
    document.body.appendChild(document.createElement("widerruf-button"));
  }

  // Render gate: mount only when the shop's subscription is active. Fail-closed.
  function mount() {
    fetch(API_BASE + "/api/widget-config?k=" + encodeURIComponent(API_KEY))
      .then((r) => r.json())
      .then((c) => { if (c && c.active === true) render(); })
      .catch(() => {});
  }
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();

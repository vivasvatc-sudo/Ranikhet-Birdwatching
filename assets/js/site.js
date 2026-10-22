// Day-plan toggle on the tour pages
document.querySelectorAll('[data-mode-btn]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var mode = btn.getAttribute('data-mode-btn');
    var scope = btn.closest('[data-mode-scope]');
    scope.querySelectorAll('[data-mode-btn]').forEach(function (b) {
      var on = b === btn;
      b.setAttribute('style', on ? b.getAttribute('data-style-on') : b.getAttribute('data-style-off'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    scope.querySelectorAll('[data-mode-panel]').forEach(function (p) {
      p.hidden = p.getAttribute('data-mode-panel') !== mode;
    });
  });
});

// Enquiry form: emails the enquiry via FormSubmit; WhatsApp is the fallback.
// To change where enquiries go, change ENQUIRY_EMAIL.
var ENQUIRY_EMAIL = 'vivasvatc@gmail.com';
var WHATSAPP = '919971924583';
var FIELDS = [['name', 'Name'], ['email', 'Email'], ['when', 'When'], ['people', 'People'],
  ['country', 'Travelling from'], ['whatsapp', 'WhatsApp'], ['pace', 'Pace'], ['message', 'Notes']];

function enquiryLines(f) {
  var lines = ['New birding enquiry via ranikhetbirdwatching.com', ''];
  FIELDS.forEach(function (k) {
    var v = (f.get(k[0]) || '').toString().trim();
    if (v) lines.push(k[1] + ': ' + v);
  });
  return lines;
}

var form = document.getElementById('enquiry-form');
if (form) {
  var statusEl = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');
  var waLink = document.getElementById('whatsapp-instead');

  if (waLink) {
    waLink.addEventListener('click', function (e) {
      e.preventDefault();
      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(enquiryLines(new FormData(form)).join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var f = new FormData(form);
    if ((f.get('_honey') || '').toString()) return; // bot filled the hidden field

    var payload = {
      _subject: 'Birding enquiry: ' + (f.get('name') || '') + ', ' + (f.get('when') || ''),
      _template: 'table',
      _captcha: 'false'
    };
    FIELDS.forEach(function (k) { payload[k[1]] = (f.get(k[0]) || '').toString().trim(); });
    payload.email = (f.get('email') || '').toString().trim(); // FormSubmit uses this as reply-to

    button.disabled = true;
    var label = button.textContent;
    button.textContent = 'Sending…';
    if (statusEl) statusEl.textContent = '';

    fetch('https://formsubmit.co/ajax/' + ENQUIRY_EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || String(res.d.success) !== 'true') throw new Error(res.d.message || 'Send failed');
        form.reset();
        button.textContent = 'Sent';
        if (statusEl) statusEl.textContent = 'Thank you. Your enquiry has reached me, and I will reply the same day.';
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = label;
        if (statusEl) statusEl.textContent = 'That did not go through. Please try again, or send it on WhatsApp using the link below.';
      });
  });
}

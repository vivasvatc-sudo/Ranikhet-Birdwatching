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

// Enquiry form: compose a WhatsApp message with everything filled in
var form = document.getElementById('enquiry-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form), lines = ['New birding enquiry via ranikhetbirdwatching.com', ''];
    [['name', 'Name'], ['email', 'Email'], ['when', 'When'], ['people', 'People'], ['country', 'Travelling from'],
     ['whatsapp', 'WhatsApp'], ['pace', 'Pace'], ['message', 'Notes']].forEach(function (k) {
      var v = (f.get(k[0]) || '').toString().trim();
      if (v) lines.push(k[1] + ': ' + v);
    });
    var url = 'https://wa.me/919971924583?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
    var s = document.getElementById('form-status');
    if (s) s.textContent = 'WhatsApp should have opened with your enquiry filled in. If it did not, message me on +91 99719 24583.';
  });
}

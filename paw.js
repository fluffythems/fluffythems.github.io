
(function () {
  var FALLBACK_MS = 8000;
  var KEY = "pawEpoch";
  var epoch;

  var duration = FALLBACK_MS;
  try {
    var raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--paw-duration")
      .trim();
    if (raw) {
      duration = /ms$/.test(raw)
        ? parseFloat(raw)
        : parseFloat(raw) * 1000;
      if (!isFinite(duration) || duration <= 0) duration = FALLBACK_MS;
    }
  } catch (e) {
    duration = FALLBACK_MS;
  }

  try {
    epoch = Number(localStorage.getItem(KEY));
    if (!epoch) {
      epoch = Date.now();
      localStorage.setItem(KEY, String(epoch));
    }
  } catch (e) {
    epoch = Date.now();
  }

  var phase = ((Date.now() - epoch) % duration + duration) % duration;

  document.documentElement.style.setProperty("--paw-delay", "-" + phase + "ms");
})();

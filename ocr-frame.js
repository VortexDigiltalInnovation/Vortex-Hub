/* Pagina isolata (iframe sandbox, origine opaca): non ha accesso ai dati di Unica.
   Riceve l'immagine, la legge con Tesseract.js (scaricato da jsDelivr solo su richiesta) e restituisce il testo. */
(function () {
  const V = '5.1.1', CORE = '5.1.1', P = window.parent;
  const say = m => P.postMessage(m, '*');
  function load() {
    return new Promise((res, rej) => {
      if (window.Tesseract) return res();
      const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@' + V + '/dist/tesseract.min.js'; s.crossOrigin = 'anonymous';
      s.onload = () => res(); s.onerror = () => rej(new Error('Libreria OCR non raggiungibile (offline?)')); document.head.appendChild(s);
    });
  }
  window.addEventListener('message', async e => {
    if (e.source !== P || !e.data || e.data.t !== 'ocr') return;
    let w;
    try {
      say({ t: 'st', s: 'Scarico il motore OCR…' }); await load();
      w = await Tesseract.createWorker('ita+eng', 1, {
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@' + V + '/dist/worker.min.js', corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@' + CORE, langPath: 'https://tessdata.projectnaptha.com/4.0.0_fast', cacheMethod: 'none', workerBlobURL: true,
        logger: m => { if (m && m.status) say({ t: 'st', s: m.status, p: m.progress || 0 }); }
      });
      const r = await w.recognize(new Blob([e.data.buf], { type: e.data.mime || 'image/jpeg' }));
      say({ t: 'done', text: String((r.data && r.data.text) || '') });
    } catch (x) { say({ t: 'err', m: (x && x.message) || String(x) }); }
    finally { try { w && await w.terminate(); } catch (x) { } }
  });
  say({ t: 'ready' });
})();

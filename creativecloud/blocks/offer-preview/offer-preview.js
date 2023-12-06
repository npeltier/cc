import { getLibs } from '../../scripts/utils.js';

const miloLibs = getLibs();
import(`${miloLibs}/deps/commerce.js`);
const { initService } = await import(`${miloLibs}/blocks/merch/merch.js`);

const service = await initService();

export default function init(el) {
  const { osi } = Object.fromEntries(new URLSearchParams(window.location.search));
  let text = 'you should provide <code>osi</code> parameter';
  if (osi) {
    text = `osi is <code>${osi}</code> <span data-wcs-osi="${osi}" data-wcs-template="price"></span>`;
    service.resolveOfferSelectors({ wcsOsi: [osi] }).then((offers) => {
      console?.log('offers', offers);
    });
  }
  el.replaceWith(document.createTextNode(text));
}

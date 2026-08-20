export const SITE_URL = 'https://www.tuhoradivina.com';

export const SITE_NAME = 'Tu Hora Divina';

/** The locale every piece of metadata on the site declares. */
export const SITE_LOCALE = 'es_MX';

/** `SITE_LOCALE` in the hyphenated form `lang` attributes and schema.org want. */
export const SITE_LANGUAGE = 'es-MX';

/**
 * The show's own description. Metadata only — it belongs in the site-level
 * description, the Open Graph and Twitter tags and the PodcastSeries JSON-LD,
 * and is deliberately never rendered into the visible UI. Route-level
 * descriptions are written per group and are more specific; this one must not
 * replace them.
 */
export const SITE_DESCRIPTION =
  'Tu Hora Divina es un espacio de enseñanza y reflexión cristiana con el pastor Ariel. ' +
  'Cada episodio explora la Biblia y temas como la fe, el amor de Dios, el perdón, la ' +
  'obediencia, la oración, la salvación y la vida eterna. Mediante relatos bíblicos y ' +
  'mensajes prácticos, el programa invita a conocer mejor a Jesucristo, fortalecer nuestra ' +
  'relación con Dios y aplicar su Palabra en la vida diaria. Un mensaje de esperanza para ' +
  'quienes ya caminan en la fe y para quienes desean acercarse a Dios.';

/** The three directories the header already links to. */
export const PODCAST_PROFILES = [
  'https://podcasts.apple.com/us/podcast/tu-hora-divina/id1659299472',
  'https://open.spotify.com/show/68i6aFTTVXB9c1afxfsHcx',
  'https://castbox.fm/channel/id5241199',
];

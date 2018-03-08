// folder path where all assets live
const basePath = "/resources/favicon/";

// define link tags
const linkTags = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: `${basePath}apple-touch-icon.png`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: `${basePath}favicon-32x32.png`
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: `${basePath}favicon-16x16.png`
  },
  {
    rel: "manifest",
    href: `${basePath}manifest.json`
  },
  {
    rel: "mask-icon",
    color: "#5bbad5",
    href: `${basePath}safari-pinned-tab.svg`
  },
  {
    rel: "shortcut icon",
    href: `${basePath}favicon.ico`
  }
];

// define meta tags
const metaTags = [
  {
    name: "msapplication-config",
    content: `${basePath}browserconfig.xml`
  },
  {
    name: "theme-color",
    content: "#ffffff"
  }
];

/**
 * Add a tag to the <head> of the page
 * @param {String} type - tag type (link, meta, etc.)
 * @param {Object} details - key/value pairs for tag attributes
 * @return {undefined} no return value
 */
function addTag(type, details) {
  let props = "";
  for (const key in details) {
    if ({}.hasOwnProperty.call(details, key)) {
      props += `${key}="${details[key]}" `;
    }
  }
  const tag = `<${type} ${props}/>`;
  document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", tag);
}

// add the favicon tags to the <head>
linkTags.forEach(tag => addTag("link", tag));
metaTags.forEach(tag => addTag("meta", tag));

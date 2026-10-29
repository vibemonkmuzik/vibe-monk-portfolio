(() => {
  "use strict";

  const replacements = [
    ["His artist portfolio describes work as a ghost music producer for artists nationally, more than 100 virtual shows during the pandemic, and more than 250 tracks by 2023.", "His career includes ghost music production for artists nationally, more than 100 virtual shows during the pandemic, and a body of work exceeding 250 tracks by 2023."],
    ["Selected historical venue references from the artist portfolio. Contact management for current availability and confirmed future dates.", "Selected performance history across clubs, hotels, weddings, corporate events and major event venues. Contact management for current availability and confirmed dates."],
    ["Past performance references", "Selected performance history"],
    ["Venue names indicate historical portfolio references and do not imply current endorsement.", "Highlights from VIBE MONK’s past performances across India."],
    ["Selected artist imagery and music artwork from the website asset library.", "Official VIBE MONK MUZIK artist imagery and music artwork for media, promoters and collaborators."],
    ["supplied portfolio", "artist profile"],
    ["supplied artist presentation", "official artist profile"],
    ["supplied presentation", "official artist profile"],
    ["website asset library", "official media collection"],
    ["transcribed from", "drawn from"],
    ["portfolio references", "performance highlights"]
  ];

  function cleanText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let text = node.nodeValue;
      replacements.forEach(([from, to]) => { text = text.split(from).join(to); });
      if (text !== node.nodeValue) node.nodeValue = text;
    });
  }

  cleanText();
  new MutationObserver(() => cleanText()).observe(document.getElementById("app"), { childList: true, subtree: true });
})();
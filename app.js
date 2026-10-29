/* VIBE MONK portfolio app — vanilla JavaScript, GitHub Pages friendly */
(() => {
  "use strict";

  const CONFIG = {
    artistName: "VIBE MONK",
    bookingEmail: "bookvibemonk@outlook.com",
    bookingPhoneDisplay: "+91 7795183629",
    bookingPhoneLink: "+917795183629",
    whatsappUrl: "https://wa.me/917795183629",
    baseLocation: "India",
    instagramUrl: "https://www.instagram.com/vibe_monk_muzik/",
    // Paste your actual Spotify artist URL / embed URL and official YouTube video IDs here.
    spotifyArtistUrl: "https://open.spotify.com/artist/2qeftgSP2E2YpTvpIZPfqg",
    spotifyEmbedUrl: "https://open.spotify.com/embed/artist/2qeftgSP2E2YpTvpIZPfqg?utm_source=generator",
    youtubeChannelUrl: "https://www.youtube.com/@VIBEMONKMUZIK",
    youtubeVideoIds: [],
    // Set a real artist image URL here if you have one; the site has a designed visual fallback.
    artistImageUrl: "./assets/vibe-monk-portrait-white.jpg"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const app = $("#app");
  const toast = $("#toast");
  let toastTimer;
  let youtubePlayers = [];
  let youtubeApiReady = false;

  const routes = {
    home: renderHome,
    biography: renderBiography,
    epk: renderEPK,
    shows: renderShows,
    discography: renderDiscography,
    videos: renderVideos,
    music: renderMusic,
    rider: renderRider,
    hospitality: renderHospitality,
    gear: renderGear,
    booking: renderBooking,
    press: renderPress,
    news: renderNews,
    masterclass: renderMasterclass,
    fans: renderFans,
    merch: renderMerch,
    contact: renderContact,
    privacy: renderPrivacy,
    terms: renderTerms
  };

  const page = (eyebrow, title, intro, content, extraClass = "") => `
    <section class="page-hero ${extraClass}">
      <div class="container">
        <div class="breadcrumb"><a href="#home">VIBE MONK</a> / ${eyebrow}</div>
        <h1>${title}</h1>
        <p class="page-intro">${intro}</p>
      </div>
    </section>${content}`;

  const section = (content, cls = "") => `<section class="section ${cls}"><div class="container">${content}</div></section>`;
  const button = (label, href, secondary = false) => `<a class="btn ${secondary ? "secondary" : ""}" href="${href}">${label} <span aria-hidden="true">↗</span></a>`;
  const pill = (text) => `<span class="pill">${text}</span>`;
  const emailLink = () => `<a href="mailto:${CONFIG.bookingEmail}">${CONFIG.bookingEmail}</a>`;
  const phoneLink = () => `<a href="tel:${CONFIG.bookingPhoneLink}">${CONFIG.bookingPhoneDisplay}</a>`;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function getRoute() {
    const key = (location.hash.replace(/^#\/?/, "") || "home").split("?")[0];
    return routes[key] ? key : "home";
  }

  function navigate() {
    const key = getRoute();
    youtubePlayers = [];
    app.innerHTML = routes[key]();
    document.title = `${routeTitle(key)} — VIBE MONK`;
    document.querySelectorAll("[data-nav]").forEach(link => {
      const active = link.dataset.nav === key || (key === "discography" || key === "videos" ? link.dataset.nav === "music" : false);
      link.classList.toggle("active", active);
    });
    $("#mainNav").classList.remove("open");
    $("#menuToggle").setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "instant" });
    bindPageEvents(key);
  }

  function routeTitle(key) {
    const titles = {home:"Sound Without Borders", biography:"Biography", epk:"Electronic Press Kit", shows:"Shows & Tour Dates", discography:"Discography", videos:"Video Gallery", music:"Music Hub", rider:"Technical Rider", hospitality:"Hospitality Rider", gear:"Virtual Gear Suite", booking:"Booking Portal", press:"Press Kit", news:"News & Journal", masterclass:"Production Masterclass", fans:"Fan Zone", merch:"Merch Concept Store", contact:"Contact & Management", privacy:"Privacy Policy", terms:"Terms & Conditions"};
    return titles[key] || "Artist";
  }

  function renderHome() {
    return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="eyebrow">Indian DJ · Ghost Music Producer</div>
          <h1>VIBE<br><span class="outline">MONK</span></h1>
          <p class="hero-sub">Pratap. Professionally known as VIBE MONK.</p>
          <p class="lead">An artist shaped by the dance floor and a producer working behind the scenes. Explore the sound, selected career highlights and music projects.</p>
          <div class="btn-row">${button("Explore the music","#discography")}${button("Book VIBE MONK","#booking",true)}</div>
          <a class="hero-instagram" href="${CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram · @vibe_monk_muzik ↗</a>
        </div>
        <div class="hero-art artist-photo-hero" aria-label="VIBE MONK artist portrait from the supplied portfolio">
          <img src="./assets/vibe-monk-live-portrait.jpg" alt="VIBE MONK in a dark DJ look with headphones, portrait from the supplied artist presentation">
          <div class="floating-tag tag-bottom">Indian DJ / Ghost Music Producer</div>
        </div>
      </div>
      <div class="hero-bottom"><span>Techno · EDM · FDM · Bollywood Retro</span><span class="scroll-indicator">Scroll to explore</span></div>
    </section>
    <div class="ticker" aria-hidden="true"><div class="ticker-track">${Array(2).fill('<span>VIBE MONK</span><span>TECHNO</span><span>EDM</span><span>FUSION DANCE MUSIC</span><span>BOLLYWOOD RETRO</span>').join("")}</div></div>
    ${section(`<div class="split-heading"><div><div class="eyebrow">Artist profile</div><h2>From the roots.<br><span class="accent">To the dance floor.</span></h2></div><p>Originally from Hubballi, Karnataka, Pratap began with small events and parties, developing his path as a DJ while building experience as a ghost music producer.</p></div>
      <div class="grid-3"><article class="panel"><div class="panel-number">01</div><h3>DJ Performance</h3><p>Reading the room, selecting music and shaping transitions around the crowd and event.</p><a class="card-link" href="#epk">View artist profile ↗</a></article><article class="panel"><div class="panel-number">02</div><h3>Music Production</h3><p>Production work behind the scenes, alongside original projects and genre-crossing experiments.</p><a class="card-link" href="#discography">Explore projects ↗</a></article><article class="panel"><div class="panel-number">03</div><h3>Live Experience</h3><p>Performance history spanning club, hospitality, private and event settings as listed in the artist portfolio.</p><a class="card-link" href="#shows">View venue history ↗</a></article></div>`)}
    ${section(`<div class="grid-2"><div><div class="eyebrow">Selected projects</div><h2>Music with<br><span class="accent">a point of view.</span></h2><p class="lead">Patriotic releases, tributes and fan anthems sit alongside the Experimental and Fusion Dance Music series.</p>${button("View discography","#discography")}</div><div class="release-stack"><div><span>01</span><strong>Tirange Ka Jwala</strong><small>Patriotic song</small></div><div><span>02</span><strong>Virat Ka Safar</strong><small>Tribute to the chase master</small></div><div><span>03</span><strong>Thalaivar Nirandaram</strong><small>Tribute to Rajinikanth</small></div><div><span>04</span><strong>Kempu Samrajya</strong><small>RCB fan anthem</small></div></div></div>`, "section-tight")}
    ${section(`<div class="split-heading"><div><div class="eyebrow">Booking enquiries</div><h2>Bring VIBE MONK<br><span class="accent">to your event.</span></h2></div><p>Share the event date, location, format and production details to start a booking conversation.</p></div><div class="panel grid-2"><div><h3>Artist bookings</h3><p>${emailLink()}<br><a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer">@vibe_monk_muzik</a></p></div><div class="btn-row" style="align-items:center;margin-top:0">${button("Booking enquiry","#booking")}${button("Technical rider","#rider",true)}</div></div>`)}
    `;
  }

  function renderBiography() {
    return page("Biography","Pratap. Professionally known as VIBE MONK.","An Indian DJ and ghost music producer whose journey began with small events and parties.", section(`
      <div class="grid-2 biography-layout">
        <div class="bio-logo-panel bio-photo-panel"><img src="./assets/vibe-monk-portrait-dark.jpg" alt="VIBE MONK artist portrait extracted from the supplied presentation"><span>ARTIST PROFILE · INDIA</span></div>
        <div><div class="eyebrow">Artist biography</div><h2>Learning from<br><span class="accent">the roots.</span></h2><p>According to the supplied artist portfolio, Pratap, professionally known as VIBE MONK, is an Indian Disc Jockey and ghost music producer from Hubballi, Karnataka. Influenced by music from an early stage, he began learning from the roots and pursued a career in the music industry.</p><p>The portfolio notes that his first mix was released on SoundCloud and that he had made more than 250 tracks by 2023. It also describes production work as a ghost music producer for several artists nationally, and more than 100 virtual shows hosted during the pandemic.</p><p>His listed musical directions include Techno, Electronic Dance Music (EDM), Fusion Dance Music (FDM), and Bollywood Retro.</p><p class="small">Career details above are transcribed from the supplied portfolio and have not been independently verified.</p>${button("Discuss a booking","#booking")}</div>
      </div>
      <div class="grid-3" style="margin-top:35px"><article class="panel"><h3>Genres</h3><p>Techno, EDM, Fusion Dance Music and Bollywood Retro.</p></article><article class="panel"><h3>Performance</h3><p>DJ sets, crowd interaction, music selection and transitions.</p></article><article class="panel"><h3>Production</h3><p>Ghost production and original projects, including tribute and fan-anthems.</p></article></div>`));
  }

  function renderEPK() {
    return page("Electronic Press Kit","Artist information, at a glance.","A concise overview for promoters, venues, event teams and collaborators, based on the supplied VIBE MONK portfolio.", section(`
      <div class="grid-2"><div class="panel"><div class="eyebrow">Artist overview</div><h3>VIBE MONK</h3><p>Pratap · Indian DJ and ghost music producer · Originally from Hubballi, Karnataka.</p><div class="tag-list">${["Techno","EDM","Fusion Dance Music","Bollywood Retro"].map(pill).join("")}</div><p>Portfolio highlights include 100+ virtual shows during the pandemic and production work for artists nationally. The portfolio states 250+ tracks by 2023.</p><p class="small">These career figures are attributed to the supplied artist presentation.</p></div>
      <div class="panel"><div class="eyebrow">Bookings & links</div><div class="timeline"><time>EMAIL</time><div><h3>Artist bookings</h3><p>${emailLink()}</p></div></div><div class="timeline"><time>SOCIAL</time><div><h3>Instagram</h3><p><a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener noreferrer">@vibe_monk_muzik ↗</a></p></div></div><div class="timeline"><time>ORIGIN</time><div><h3>Hubballi, Karnataka</h3><p>Listed as origin in the supplied portfolio.</p></div></div></div></div>
      <div class="section-tight"><div class="eyebrow">Press assets</div><h2>Official identity.<br><span class="accent">One source.</span></h2><p>The original logo supplied for this website is displayed without recolouring or alteration. Use the press contact for approved photos, artwork and additional assets.</p>${button("Contact for press assets","#contact")}</div>`));
  }

  function renderShows() {
    const cities = [
      { city:"Bengaluru", venues:["JW Marriott","Taj Vivanta","The Lalit Ashok","Royal Orchid","The Chancery Pavilion","Sheraton · High Ultra Lounge","The Park · ibar","Sanctum / Sugar Factory","Pebbles Lounge","Café Mojo","Bowring Club","Electro by Salt","Salt Destination","Brew & Barbeque","Love Shack","The Den Hotel","Palace Grounds"] },
      { city:"Kochi", venues:["Firm Fiesta · destination wedding","Bolgatty Event Centre · New Year event","Monsoon Empress · KTM"] },
      { city:"Chennai", venues:["The Royal Palms · New Year event","Luz House · destination wedding"] },
      { city:"Coimbatore", venues:["The Banyan Tree Resort · New Year event"] },
      { city:"Mumbai", venues:["Global Quarters Club","Taj Mahal Palace","ITC Grand Central","ITC Maratha","Hilton Mumbai","The Oberoi","Sofitel Mumbai BKC"] },
      { city:"Hubballi", venues:["Hotel Dennison's","Junction","Hotel Naveen","BVB"] },
      { city:"Hyderabad", venues:["ITC Kohenur · fashion show","The Park · wedding","HITEX · marathon","Trident Hotel · Tech Mahindra","Hyatt · PepsiCo"] }
    ];
    return page("Performance History","Selected venues & events.","A historical venue list transcribed from the supplied portfolio. These are not upcoming dates or independently verified endorsements.", section(`
      <div class="archive-note"><strong>Past performance references</strong><p>For a current schedule, contact the artist directly. No future dates are represented as confirmed here.</p></div>
      <div class="venue-archive">${cities.map((group,i)=>`<article class="venue-group"><div class="venue-city"><span>0${i+1}</span><h3>${group.city}</h3></div><div class="venue-list">${group.venues.map(v=>`<span>${v}</span>`).join("")}</div></article>`).join("")}</div>
      <div class="section-tight"><div class="panel grid-2"><div><h3>Enquire about a date</h3><p>Share your event date, venue, format and expected audience.</p></div><div class="btn-row" style="align-items:center;margin-top:0">${button("Booking enquiry","#booking")}</div></div></div>`));
  }

  function renderDiscography() {
    const releases = [
      ["Tirange Ka Jwala","Patriotic song"],
      ["Virat Ka Safar","Tribute to the chase master"],
      ["Thalaivar Nirandaram","Tribute to Rajinikanth"],
      ["Legacy of Legend","Tribute to Dr. Puneeth Rajkumar on his birth anniversary"],
      ["Kempu Samrajya","Fan anthem for RCB"]
    ];
    return page("Discography","Originals, tributes & experiments.","Projects and titles listed in the supplied artist portfolio. Streaming links can be added when the exact release URLs are provided.", section(`
      <div class="grid-2"><div class="cover-art"><span>VIBE MONK / RELEASE ARCHIVE</span><strong>Originals.<br>Tributes.<br>FDM.</strong><span>Artist-listed projects</span></div><div><div class="eyebrow">Music platforms</div><h2>Listen to<br><span class="accent">the releases.</span></h2><p>The supplied portfolio says releases are available across Spotify, Apple Music, Amazon Music, YouTube and other platforms. Exact profile and track URLs have not been supplied yet.</p><div class="btn-row"><a class="btn" href="${CONFIG.spotifyArtistUrl}" target="_blank" rel="noopener noreferrer">Open Spotify ↗</a><a class="btn secondary" href="${CONFIG.youtubeChannelUrl}" target="_blank" rel="noopener noreferrer">Open YouTube ↗</a></div></div></div>
      <div class="section-tight"><div class="eyebrow">Singles & tributes</div><div class="release-stack">${releases.map((r,i)=>`<div><span>0${i+1}</span><strong>${r[0]}</strong><small>${r[1]}</small></div>`).join("")}</div></div>
      <div class="grid-2"><article class="panel"><div class="eyebrow">Series</div><h3>Experimental Series</h3><p>A project series named in the supplied artist portfolio.</p></article><article class="panel"><div class="eyebrow">Series</div><h3>Fusion Dance Music</h3><p>FDM series combining electronic dance production with the influences described in the artist portfolio.</p></article></div>`));
  }

  function youtubeEmbed(id) {
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&playsinline=1`;
  }

  function renderVideos() {
    const ids = CONFIG.youtubeVideoIds.filter(Boolean);
    const videoContent = ids.length ? `<div class="grid-2">${ids.map((id, i) => `<div><iframe class="embed-frame" src="${youtubeEmbed(id)}" title="VIBE MONK video ${i+1}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><p class="small">Official video ${i+1}</p></div>`).join("")}</div>` : `<div class="empty-state"><div class="play-icon" style="margin:0 auto 16px">▶</div><h3>Official visuals belong here.</h3><p>In <code>app.js</code>, add your official YouTube video IDs to <code>youtubeVideoIds</code>. The gallery will render responsive embeds automatically.</p>${button("Open YouTube channel",CONFIG.youtubeChannelUrl)}</div>`;
    return page("Video Gallery","See the sound.","Official music videos, live moments, studio sessions and visual releases.", section(`${videoContent}<div class="section-tight"><div class="panel grid-2"><div><h3>Live visual archive</h3><p>For booking enquiries, use approved footage and event credits only.</p></div><div class="btn-row" style="align-items:center;margin-top:0">${button("Booking portal","#booking")}</div></div>`));
  }

  function renderMusic() {
    const releases = [
      { title: "Tirange Ka Jwala", kind: "Patriotic song", search: "Tirange Ka Jwala VIBE MONK" },
      { title: "Virat Ka Safar", kind: "Virat Kohli tribute", search: "Virat Ka Safar VIBE MONK" },
      { title: "Thalaivar Nirandaram", kind: "Rajinikanth tribute", search: "Thalaivar Nirandaram VIBE MONK" },
      { title: "Legacy of Legend", kind: "Dr. Puneeth Rajkumar tribute", search: "Legacy of Legend VIBE MONK" },
      { title: "Kempu Samrajya", kind: "RCB fan anthem", search: "Kempu Samrajya VIBE MONK" },
      { title: "Fusion Dance Music", kind: "FDM series", search: "VIBE MONK Fusion Dance Music" },
      { title: "Experimental Series", kind: "Experimental releases", search: "VIBE MONK Experimental" }
    ];
    const releaseCards = releases.map((release, i) => `
      <article class="discography-card">
        <div class="discography-art discography-art-${i+1}"><span>${String(i+1).padStart(2,"0")}</span><strong>${release.title}</strong></div>
        <div class="discography-copy"><h3>${release.title}</h3><p>${release.kind}</p><a class="card-link" href="https://open.spotify.com/search/${encodeURIComponent(release.search)}" target="_blank" rel="noopener noreferrer">Find on Spotify ↗</a></div>
      </article>`).join("");
    return page("Music Hub","The artist discography.","Explore VIBE MONK's listed originals, tributes and electronic music series, with links to find each project on Spotify.", section(`
      <div class="discography-heading"><div><div class="eyebrow">Spotify · Artist discography</div><h2>Releases, tributes<br><span class="accent">& experiments.</span></h2><p class="lead">Browse the projects listed in the artist portfolio. Choose a release to search Spotify, or open the official artist profile for the full, current catalogue.</p></div><div class="discography-cta"><a class="btn" href="${CONFIG.spotifyArtistUrl}" target="_blank" rel="noopener noreferrer">Open VIBE MONK on Spotify ↗</a></div></div>
      <div class="discography-grid">${releaseCards}</div>
      <div class="section-tight grid-2"><div><div class="eyebrow">YouTube</div><h2>Watch the <span class="accent">visual side.</span></h2><p>Official videos, visual releases and music content.</p>${CONFIG.youtubeVideoIds.filter(Boolean).length ? `<iframe class="embed-frame" src="${youtubeEmbed(CONFIG.youtubeVideoIds.filter(Boolean)[0])}" title="VIBE MONK official YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : `<div class="embed-placeholder"><div><div class="play-icon">▶</div><h3>Official YouTube</h3><p>Visit the channel to explore the available videos.</p><a class="btn" href="${CONFIG.youtubeChannelUrl}" target="_blank" rel="noopener noreferrer">Visit channel ↗</a></div></div>`}</div>
      <div><div class="eyebrow">Platform notes</div><h2>Listen <span class="accent">your way.</span></h2><div class="panel"><h3>Spotify</h3><p>Release cards open Spotify search for each project. The official artist profile contains the current catalogue available on Spotify.</p><a class="card-link" href="${CONFIG.spotifyArtistUrl}" target="_blank" rel="noopener noreferrer">Open artist profile ↗</a></div><div class="panel section-tight"><h3>Live sets & bookings</h3><p>Setlist and performance format are tailored to the booking brief.</p>${button("Enquire about a booking", "#contact")}</div></div></div>`));
  }

  function renderRider() {
    return page("Technical Rider","Clear inputs. Clean execution.","Technical specifications transcribed from the supplied artist portfolio. Confirm dimensions, screen orientation, power and current equipment requirements with the artist before show day.", section(`
      <div class="grid-2"><div class="panel"><div class="eyebrow">DJ setup</div><h3>Preferred reference setup</h3><ul><li>2 × Pioneer CDJ Nexus 2000 turntables</li><li>1 × Pioneer DJM-900 Nexus mixer</li><li>2 × QSC powered monitors</li><li>Powered subwoofer according to stage / venue requirements</li><li>Front LED console-masking screen: 4 × 8 (1 unit)</li><li>Rear LED backdrop screen: 8 × 8 (1 unit)</li></ul></div>
      <div class="panel"><div class="eyebrow">Show-day advance</div><h3>Production checklist</h3><ul><li>Confirm set time, duration, changeover and soundcheck window</li><li>Confirm exact deck/mixer models and firmware where relevant</li><li>Confirm booth dimensions, height and safe access</li><li>Confirm monitor placement and independent level control</li><li>Confirm power, grounding and cable routing with venue production</li><li>Share production manager and on-site contact details in advance</li></ul></div></div>
      <div class="section-tight"><div class="panel"><h3>Important</h3><p>The portfolio also specifies a 4 ft deep × 8 ft wide console riser at 4 ft height, an artist riser 4 ft deep × 8 ft wide at 1 ft height, and a riser according to the screen backdrop. Confirm all measurements and the current setup with the artist before production sign-off.</p>${button("Discuss technical requirements","#contact")}</div></div>`));
  }

  function renderHospitality() {
    return page("Hospitality Rider","Take care of the people.","Hospitality and travel details are agreed in the booking confirmation. The list below is a practical discussion guide, not a fixed contractual demand.", section(`
      <div class="grid-2"><article class="panel"><div class="eyebrow">Green room</div><h3>Backstage basics</h3><ul><li>Clean, secure, private holding area where available</li><li>Drinking water and non-alcoholic refreshments</li><li>Access to a clean restroom</li><li>Clear artist / crew access and a named host contact</li><li>Safe storage for personal items</li></ul></article><article class="panel"><div class="eyebrow">Travel & timing</div><h3>Confirm before booking</h3><ul><li>Arrival and departure windows</li><li>Local transfers and parking / access instructions</li><li>Accommodation requirements for out-of-town dates</li><li>Meal arrangements where relevant to schedule</li><li>Emergency and day-of-show contacts</li></ul></article></div>
      <div class="section-tight"><div class="empty-state">Final hospitality requirements must be confirmed in writing for each engagement. No alcohol or specific brand is assumed by this template.</div></div>`));
  }

  function renderGear() {
    return page("Virtual Gear Suite","The booth, in digital form.","An interactive visual concept of a two-deck DJ setup with a central mixer. It is a portfolio demonstration, not hardware emulation.", section(`
      <div class="deck-console">
        <div class="deck-topline"><span>VIBE MONK / VIRTUAL BOOTH</span><span>2 × CDJ-3000 / DJM-A9 REFERENCE</span></div>
        <div class="mixer-layout">
          <div class="deck-unit"><div class="deck-label">PLAYER A / DECK 1</div><div class="deck-disc" id="deckDiscA"></div><h3>Deck One</h3><div class="deck-controls"><button class="control-btn primary" data-deck="a" data-action="play">PLAY</button><button class="control-btn" data-deck="a" data-action="pause">PAUSE</button><button class="control-btn" data-deck="a" data-action="cue">CUE</button></div></div>
          <div class="mixer-unit"><div class="mixer-display" id="mixerDisplay">SYSTEM READY<br>NO TRACK LOADED</div><div><div class="mixer-knobs"><span class="knob"></span><span class="knob"></span><span class="knob"></span></div><div class="fader"></div><div class="mixer-caption">CROSSFADER / LEVEL</div></div><div><div class="mixer-knobs"><span class="knob"></span><span class="knob"></span><span class="knob"></span></div><div class="mixer-caption">EQ / FILTER CONCEPT</div></div></div>
          <div class="deck-unit"><div class="deck-label">PLAYER B / DECK 2</div><div class="deck-disc" id="deckDiscB"></div><h3>Deck Two</h3><div class="deck-controls"><button class="control-btn primary" data-deck="b" data-action="play">PLAY</button><button class="control-btn" data-deck="b" data-action="pause">PAUSE</button><button class="control-btn" data-deck="b" data-action="cue">CUE</button></div></div>
        </div>
        <p class="deck-disclaimer">Visual controls animate the deck artwork and update the display only. This demo does not connect to physical Pioneer equipment, does not load or mix copyrighted audio, and is not a real CDJ/DJM simulator. For official music playback, use the Spotify and YouTube players on the Music Hub.</p>
      </div>
      <div class="section-tight"><div class="grid-3"><article class="panel"><h3>Deck A</h3><p>Visual play, pause and cue states.</p></article><article class="panel"><h3>Central mixer</h3><p>Illustrative EQ and fader interface.</p></article><article class="panel"><h3>Deck B</h3><p>Independent visual state for the second deck.</p></article></div></div>`));
  }

  function renderBooking() {
    return page("Booking Portal","Let's build the moment.","Share the essential details. The form opens a prefilled email draft in your email application; it does not send or store data on this static website.", section(`
      <div class="grid-2">
        <div><div class="eyebrow">Artist bookings</div><h2>Start with<br><span class="accent">your brief.</span></h2><p>Tell us what you're planning, where it's happening and who the event is for. The more useful the brief, the easier it is to discuss availability and production needs.</p><div class="panel" style="margin-top:25px"><h3>Direct contact</h3><p>Email: ${emailLink()}<br>Phone: ${phoneLink()}<br>Base: ${CONFIG.baseLocation}</p><p class="small">All dates are subject to availability and written confirmation.</p></div></div>
        <form class="panel" id="bookingForm">
          <div class="eyebrow">Booking enquiry</div><h3>Event details</h3>
          <div class="form-grid">
            <div class="field"><label for="fullName">Full Name / Organization *</label><input id="fullName" name="fullName" autocomplete="name" required></div>
            <div class="field"><label for="email">Email Address *</label><input id="email" name="email" type="email" autocomplete="email" required></div>
            <div class="field"><label for="phone">Phone Number *</label><input id="phone" name="phone" type="tel" autocomplete="tel" required></div>
            <div class="field"><label for="eventType">Event Type *</label><select id="eventType" name="eventType" required><option value="">Select event type</option><option>Club Event</option><option>Festival</option><option>Private Party</option><option>Corporate</option></select></div>
            <div class="field full"><label for="eventLocation">Event Location *</label><input id="eventLocation" name="eventLocation" placeholder="City, venue or event space" required></div>
            <div class="field"><label for="guestSize">Gathering Size *</label><select id="guestSize" name="guestSize" required><option value="">Select audience size</option><option>&lt;500</option><option>500-2000</option><option>2000-5000</option><option>5000+</option></select></div>
            <div class="field"><label for="eventDate">Event Date *</label><input id="eventDate" name="eventDate" type="date" required></div>
            <div class="field full"><label for="message">Additional Message / Requirements</label><textarea id="message" name="message" placeholder="Set duration, event timings, production details, budget guidance or anything else relevant."></textarea></div>
            <div class="field full"><label class="checkbox-line"><input type="checkbox" id="consent" required><span>I agree that the details above may be used to respond to this booking enquiry. *</span></label></div>
            <div class="field full"><button class="btn" type="submit">Prepare booking email ↗</button><p class="form-note">Required fields are marked *. Your email app will open with the enquiry details filled in.</p></div>
          </div>
        </form>
      </div>`));
  }

  function renderPress() {
    return page("Photo Press Kit","The approved visual identity.","A press-asset landing page for promoters, media, venues and collaborators. Downloadable official assets should be linked here once supplied.", section(`
      <div class="grid-3 press-photo-grid">
        <figure class="press-photo-card"><img src="./assets/vibe-monk-portrait-white.jpg" alt="VIBE MONK portrait in white suit from supplied presentation" loading="lazy"><figcaption><span>01 / ARTIST PORTRAIT</span><strong>Studio portrait</strong><small>Extracted from your supplied portfolio</small></figcaption></figure>
        <figure class="press-photo-card"><img src="./assets/vibe-monk-portrait-dark.jpg" alt="VIBE MONK portrait in dark styling from supplied presentation" loading="lazy"><figcaption><span>02 / ARTIST PORTRAIT</span><strong>Dark portrait</strong><small>Extracted from your supplied portfolio</small></figcaption></figure>
        <figure class="press-photo-card"><img src="./assets/fusion-dance-music-cover.jpg" alt="Fusion Dance Music artwork from supplied presentation" loading="lazy"><figcaption><span>03 / MUSIC VISUAL</span><strong>Fusion Dance Music</strong><small>Artwork from your supplied portfolio</small></figcaption></figure>
      </div>
      <div class="section-tight"><div class="panel grid-2"><div><h3>Press & booking enquiries</h3><p>For approved high-resolution assets, event enquiries and media requests, contact the artist directly.</p></div><div class="btn-row" style="align-items:center;margin-top:0">${button("Request press kit","#contact")}${button("Book VIBE MONK","#booking",true)}</div></div></div>`));
  }

  function renderNews() {
    return page("News & Journal","Notes from the frequency.","Announcements and journal entries should be published here only after they have been verified and approved.", section(`
      <div class="empty-state"><div class="eyebrow" style="justify-content:center">Latest updates</div><h3>No posts published yet.</h3><p>When you have a release announcement, confirmed show, behind-the-scenes story or studio note, add it to the articles array in <code>app.js</code>.</p></div>
      <div class="section-tight"><div class="grid-3"><article class="panel"><div class="section-label">Release notes</div><h3>New music</h3><p>Use this category for verified releases, credits and streaming links.</p></article><article class="panel"><div class="section-label">On the road</div><h3>Live updates</h3><p>Publish confirmed event dates and approved recap photography.</p></article><article class="panel"><div class="section-label">In the studio</div><h3>Process & ideas</h3><p>Share production insights, influences and project updates.</p></article></div></div>`));
  }

  function renderMasterclass() {
    return page("Production Masterclass","Learn the craft behind the sound.","A learning hub concept for DJ workflow, set planning and electronic music production. Educational content can be added as sessions are developed.", section(`
      <div class="grid-3"><article class="panel"><div class="panel-number">01</div><h3>Set architecture</h3><p>Plan energy curves, transitions and a coherent musical journey for different audiences.</p><span class="pill">DJ workflow</span></article><article class="panel"><div class="panel-number">02</div><h3>Sound design</h3><p>Explore rhythm, texture, arrangement and the decisions that give a track its identity.</p><span class="pill">Production</span></article><article class="panel"><div class="panel-number">03</div><h3>Performance prep</h3><p>Organise music, prepare backups and coordinate with production teams before a show.</p><span class="pill">Live practice</span></article></div>
      <div class="section-tight"><div class="panel grid-2"><div><h3>Interested in a session?</h3><p>Ask about future workshops, private sessions or event collaborations.</p></div><div class="btn-row" style="align-items:center;margin-top:0">${button("Register interest","#contact")}</div></div></div>`));
  }

  function renderFans() {
    return page("Fan Zone","Stay close to the sound.","Follow official channels for releases, live clips and announcements. A newsletter backend can be connected later if you want to collect subscribers.", section(`
      <div class="grid-2"><div class="cover-art"><span>FAN ZONE / VM</span><strong>Stay<br>in the<br>loop.</strong><span>Official channels only</span></div><div><div class="eyebrow">Follow the journey</div><h2>Same frequency.<br><span class="accent">More moments.</span></h2><p>Keep up with official music, video releases and confirmed live announcements on the artist's channels.</p><div class="btn-row"><a class="btn" href="${CONFIG.spotifyArtistUrl}" target="_blank" rel="noopener noreferrer">Spotify ↗</a><a class="btn secondary" href="${CONFIG.youtubeChannelUrl}" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div></div></div>
      <div class="section-tight"><div class="panel"><div class="eyebrow">Newsletter interest</div><h3>Want updates by email?</h3><p>This static GitHub Pages site does not collect or store subscriber details. To enable a real newsletter, connect a service such as Buttondown, Mailchimp or another provider and publish its privacy terms.</p>${button("Contact the team","#contact")}</div></div>`));
  }

  function renderMerch() {
    return page("Merch Concept Store","Wear the frequency.","A concept storefront for future VIBE MONK merchandise. No products are for sale through this demo page.", section(`
      <div class="grid-3"><article class="panel"><div class="gallery-tile" style="min-height:230px"><span>CONCEPT 01</span><strong>Frequency<br>tee</strong></div><h3>Graphic T-shirt</h3><p>Minimal front mark, high-contrast back artwork.</p><span class="pill">Concept only</span></article><article class="panel"><div class="gallery-tile" style="min-height:230px"><span>CONCEPT 02</span><strong>After<br>hours</strong></div><h3>Hoodie</h3><p>Heavyweight silhouette with restrained neon detailing.</p><span class="pill">Concept only</span></article><article class="panel"><div class="gallery-tile" style="min-height:230px"><span>CONCEPT 03</span><strong>Tour<br>edition</strong></div><h3>Limited poster</h3><p>Collectible visual inspired by the live experience.</p><span class="pill">Concept only</span></article></div>
      <div class="section-tight"><div class="empty-state">Store checkout, pricing, stock, shipping and returns are not active. Do not accept payment until a real commerce platform is connected.</div></div>`));
  }

  function renderContact() {
    return page("Contact & Management","The right conversation starts here.","For booking, press, collaborations, production coordination and general artist enquiries.", section(`
      <div class="grid-2"><div><div class="eyebrow">Direct lines</div><h2>Let's make<br><span class="accent">something move.</span></h2><p>Share a clear subject line and the key details. Booking requests should include the date, venue, event type and expected audience.</p><div class="panel" style="margin-top:24px"><div class="timeline"><time>BOOKING</time><div><h3>Email</h3><p>${emailLink()}</p></div></div><div class="timeline"><time>PHONE</time><div><h3>Call</h3><p>${phoneLink()}</p><p><a class="contact-action" href="${CONFIG.whatsappUrl}" target="_blank" rel="noopener noreferrer">Open WhatsApp chat ↗</a></p></div></div><div class="timeline"><time>BASE</time><div><h3>${CONFIG.baseLocation}</h3><p>Travel availability confirmed per engagement.</p></div></div></div></div>
      <div class="panel"><div class="eyebrow">Choose a subject</div><h3>Contact via WhatsApp or email</h3><p>Every enquiry type below gives you both contact options. Choose WhatsApp for a quick message or email for a detailed request.</p><div class="grid-2">
        ${[
          {n:"01",title:"Booking",subject:"VIBE MONK — Booking Enquiry",message:"Hi VIBE MONK Management, I would like to enquire about booking VIBE MONK for an event. Event date: [date], city/venue: [venue], event type: [type]. Please share availability and details."},
          {n:"02",title:"Press Kit",subject:"VIBE MONK — Press Kit Request",message:"Hi VIBE MONK Management, I would like to request the official press kit / media assets. Please let me know the available materials."},
          {n:"03",title:"Collab",subject:"VIBE MONK — Collaboration Enquiry",message:"Hi VIBE MONK Management, I am reaching out regarding a possible collaboration. Details: [please add your project / idea]. Looking forward to discussing it."},
          {n:"04",title:"Production",subject:"VIBE MONK — Music Production Enquiry",message:"Hi VIBE MONK Management, I would like to discuss a music production / ghost production project. Project details: [please add details]. Please let me know the next steps."}
        ].map(item => `<article class="gallery-tile contact-choice"><span>${item.n} / ENQUIRY</span><strong>${item.title}</strong><small>Choose your preferred contact method</small><div class="btn-row" style="margin-top:16px;gap:10px"><a class="btn" href="${CONFIG.whatsappUrl}?text=${encodeURIComponent(item.message)}" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a class="btn btn-secondary" href="mailto:${CONFIG.bookingEmail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.message)}">Email ↗</a></div></article>`).join("")}
      </div></div></div>`));
  }

  function renderPrivacy() {
    return page("Privacy Policy","Your details stay purposeful.","This notice explains how information entered into this static portfolio may be handled.", section(`
      <div class="panel"><h3>1. Information you provide</h3><p>The booking form uses the information you enter to prepare an email draft in your own email application. This website, as delivered, does not send the form to a server or store the submitted details in a database.</p><h3>2. Email and telephone contact</h3><p>If you contact the artist by email or phone, the details you share may be used to respond to your enquiry and coordinate a potential booking.</p><h3>3. Third-party platforms</h3><p>External links and embedded players may be operated by Spotify, YouTube or other providers. Their own privacy policies and cookie practices apply when you use their services.</p><h3>4. Hosting and technical logs</h3><p>If hosted on GitHub Pages, the hosting provider may process technical information under its own terms and policies.</p><h3>5. Your choices</h3><p>Do not include sensitive personal information in an enquiry. You can request clarification or ask about a previously submitted enquiry by contacting ${emailLink()}.</p><h3>6. Updates</h3><p>This notice should be reviewed and updated before launch to reflect any analytics, newsletter, CRM, booking or payment tools added to the website.</p><p class="small">Last reviewed: 29 October 2026. This template is informational and is not legal advice.</p></div>`));
  }

  function renderTerms() {
    return page("Terms & Conditions","A clear start to every booking.","Website information is provided for general artist and booking enquiries. A separate written agreement governs each confirmed engagement.", section(`
      <div class="panel"><h3>1. Website content</h3><p>Artist information, visual concepts and reference specifications are provided for informational purposes and may be updated.</p><h3>2. Availability and confirmation</h3><p>A submitted enquiry is not a confirmed booking. Availability, fees, set duration, travel, accommodation, production, cancellation terms and payment schedule must be agreed in writing.</p><h3>3. Technical requirements</h3><p>The technical rider on this site is a planning reference. The final rider agreed for the specific event takes precedence.</p><h3>4. Third-party platforms</h3><p>Spotify, YouTube and other linked services are operated by their respective providers. Their platform terms apply.</p><h3>5. Intellectual property</h3><p>Do not reuse artist logos, photographs, music or artwork without permission from the relevant rights holder.</p><h3>6. No warranty</h3><p>This portfolio is provided as an informational website. Content is not a substitute for a signed event agreement.</p><h3>7. Contact</h3><p>Questions: ${emailLink()} · ${phoneLink()}</p><p class="small">Last reviewed: 29 October 2026. This template is informational and is not legal advice.</p></div>`));
  }

  function bindPageEvents(key) {
    if (key === "booking") bindBookingForm();
    if (key === "gear") bindGear();
    if (key === "videos" || key === "music") initYouTubePlayers();
  }

  function bindBookingForm() {
    const form = $("#bookingForm");
    if (!form) return;
    const dateInput = $("#eventDate");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localToday;
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const values = [
        ["Full Name / Organization", data.get("fullName")],
        ["Email Address", data.get("email")],
        ["Phone Number", data.get("phone")],
        ["Event Type", data.get("eventType")],
        ["Event Location", data.get("eventLocation")],
        ["Gathering Size", data.get("guestSize")],
        ["Event Date", data.get("eventDate")],
        ["Additional Message / Requirements", data.get("message") || "Not provided"]
      ];
      const body = values.map(([label, value]) => `${label}: ${value}`).join("\n");
      const subject = `VIBE MONK Booking Enquiry — ${data.get("eventType")} — ${data.get("eventDate")}`;
      const mailto = `mailto:${CONFIG.bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast("Opening your email app with the enquiry details.");
      window.location.href = mailto;
    });
  }

  function bindGear() {
    const display = $("#mixerDisplay");
    document.querySelectorAll("[data-deck][data-action]").forEach(control => {
      control.addEventListener("click", () => {
        const deck = control.dataset.deck;
        const action = control.dataset.action;
        const disc = $(`#deckDisc${deck.toUpperCase()}`);
        if (action === "play") {
          disc.classList.add("playing");
          display.innerHTML = `DECK ${deck.toUpperCase()} / PLAY<br>VISUAL MODE ONLY`;
          showToast(`Deck ${deck.toUpperCase()} visual play state.`);
        } else if (action === "pause") {
          disc.classList.remove("playing");
          display.innerHTML = `DECK ${deck.toUpperCase()} / PAUSE<br>VISUAL MODE ONLY`;
          showToast(`Deck ${deck.toUpperCase()} visual paused.`);
        } else {
          disc.classList.remove("playing");
          display.innerHTML = `DECK ${deck.toUpperCase()} / CUE<br>VISUAL MODE ONLY`;
          showToast(`Deck ${deck.toUpperCase()} visual cue state.`);
        }
      });
    });
  }

  function initYouTubePlayers() {
    // Embedded YouTube iframes use the platform's own controls; no fake hardware/audio control is claimed.
    if (!youtubeApiReady || !window.YT || !window.YT.Player) return;
    const frames = document.querySelectorAll("iframe[data-youtube-player]");
    frames.forEach((frame, index) => {
      if (frame.dataset.playerBound === "true") return;
      frame.dataset.playerBound = "true";
      try { youtubePlayers.push(new YT.Player(frame)); } catch (_) { /* fallback to normal iframe */ }
    });
  }

  function escapeAttr(value) {
    return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  $("#menuToggle").addEventListener("click", () => {
    const nav = $("#mainNav");
    const open = nav.classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(open));
    $("#menuToggle").setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  window.addEventListener("hashchange", navigate);
  window.addEventListener("load", navigate);
  window.onYouTubeIframeAPIReady = () => { youtubeApiReady = true; initYouTubePlayers(); };
  $("#year").textContent = new Date().getFullYear();

  // Expose a small config reference for advanced edits in browser dev tools, not for storing secrets.
  window.VIBEMONK_SITE_CONFIG = CONFIG;
  if (document.readyState !== "loading") navigate();
})();

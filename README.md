# VIBE MONK Artist Portfolio

A responsive, multi-section DJ artist portfolio built with HTML5, CSS and vanilla JavaScript. Designed for GitHub Pages; no build step, package manager or server-side code is required.

## Files
- `index.html` — page shell, metadata and CDN references
- `style.css` — visual system, responsive layout and animations
- `app.js` — route rendering, booking email draft, virtual deck UI and platform links

## Deploy to GitHub Pages
1. Create a GitHub repository (for example, `vibe-monk-portfolio`).
2. Upload `index.html`, `style.css`, `app.js`, and this README to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Open the URL shown in the Pages settings.

## Configure official music links
Open `app.js` and update the `CONFIG` object near the top if official profile details change:
- `spotifyArtistUrl`: your official Spotify artist profile URL.
- `spotifyEmbedUrl`: optional Spotify embed URL. In Spotify, use **Share → Embed** and paste the `src` URL (usually starts with `https://open.spotify.com/embed/`).
- `youtubeChannelUrl`: your official YouTube channel URL.
- `artistImageUrl`: reserved for an approved image URL if you later add image-based artist artwork.

The starter uses official platform links rather than inventing artist profiles or releases. Add only verified links and IDs before launch.

## Booking form behavior
The booking form includes:
- Full Name / Organization
- Email Address
- Phone Number
- Event Type: Club Event, Festival, Private Party, Corporate
- Event Location
- Gathering Size: `<500`, `500-2000`, `2000-5000`, `5000+`
- Event Date
- Additional Message / Requirements

On submit, it validates required fields and opens the visitor's default email app with a prefilled message to `bookvibemonk@outlook.com`. Because GitHub Pages is static hosting, this form does not store or transmit enquiries to a backend. For automated lead capture, connect a form service or server endpoint and update the privacy notice before enabling it.

## Virtual gear suite
The virtual booth is a visual interaction demo. Play, pause and cue buttons animate the record artwork and update a display; they do not control physical Pioneer equipment or stream audio. Spotify and YouTube playback is handled by their official embedded players.

## Before launch
- Replace the default Spotify and YouTube URLs with official artist links.
- Confirm that the published artist biography, press details and technical rider are accurate.
- Add approved photos, logo assets and release credits when available.
- Review the privacy policy and terms for any analytics, newsletter, CRM, commerce or booking integrations you add.

## Routes / sections included
Home, Biography, Electronic Press Kit, Shows & Tour Dates, Discography, Video Gallery, Music Hub, Technical Rider, Hospitality Rider, Virtual Gear Suite, Booking Portal, Photo Press Kit, News & Journal, Production Masterclass, Fan Zone, Merch Concept Store, Contact & Management, Privacy Policy, and Terms & Conditions.


## Artist content source
Biography, genres, historical venue listings, project titles and the technical rider were refined using the supplied VIBE MONK presentation. Historical venue listings are identified as portfolio references, not confirmed upcoming events. The original logo PNG is used as supplied. Official Spotify and YouTube profile URLs and release-specific links still need to be entered in `app.js` when provided.


## Included portfolio images

The `assets/` folder contains photographs and artwork extracted from the PowerPoint portfolio supplied by VIBE MONK:

- `vibe-monk-portrait-white.jpg` — artist portrait used in the homepage hero.
- `vibe-monk-portrait-dark.jpg` — artist portrait used in the biography and press section.
- `vibe-monk-live-portrait.jpg` — additional portrait from the supplied presentation, available for future use.
- `fusion-dance-music-cover.jpg` — FDM artwork from the supplied presentation.
- `experimental-music-cover.jpg` — experimental music artwork from the supplied presentation.
- `dj-console-reference.jpg` — DJ console reference image from the supplied presentation.

## Connected official profiles

- Spotify artist: https://open.spotify.com/artist/2qeftgSP2E2YpTvpIZPfqg
- Spotify embed: https://open.spotify.com/embed/artist/2qeftgSP2E2YpTvpIZPfqg?utm_source=generator
- YouTube channel: https://www.youtube.com/@VIBEMONKMUZIK
- Instagram: https://www.instagram.com/vibe_monk_muzik/

The Spotify artist embed and official YouTube channel links are configured. The Video Gallery links directly to the channel and its Videos tab, so individual video IDs are not required. The booking form validates the required fields and opens a prefilled email draft to bookvibemonk@outlook.com; it does not send or store submissions on a server.

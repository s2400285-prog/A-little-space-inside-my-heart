# A Little Space Inside My Heart
A personal apology and love diary for Baby Julie, created by James Traigo.

## Run with VS Code and Live Server
1. Extract the ZIP first. Open the **A little space inside my heart** folder in Visual Studio Code.
2. In Extensions, find **Live Server** by Ritwick Dey and install it.
3. Right-click **index.html** and choose **Open with Live Server**.
4. Live Server opens the correct local address in your browser. Use the page navigation to explore the diary.

There is no npm install, build step, database, account, or API key. HTML, CSS and plain JavaScript run directly in modern browsers. Opening index.html directly also works for the basic diary; Live Server is recommended for consistent media and browser storage behavior.

## Add your two photos, one video, and one song
The photo spaces initially use original illustrated placeholders, not invented photos of you. Put your personal files in these exact locations:

| File | Replace/add here |
| --- | --- |
| First photo | `assets/images/julie1.jpg` |
| Second photo | `assets/images/julie2.jpg` |
| Personal video | `assets/videos/our-memory.mp4` |
| Your chosen music | `assets/music/our-song.mp3` |

Replace the included illustrated JPG placeholders with your JPG photos. Add the MP4 and MP3 files yourself; no music or video is supplied. Use a browser-compatible MP4 (H.264 video with AAC audio is widely compatible) and an MP3 you have permission to use. Do not rename a different file format just to change its extension. Keep names lowercase and refresh the page after replacement. Music never autoplays. Starting the video pauses the song and vice versa.

The **Make this little corner ours** panel on the memories page lets you preview files locally. File selections remain in that tab only and are not uploaded. Refreshing/navigating away returns to the files in the project folders. To make your photos and media permanent, replace/add them at the paths above, then upload the updated project to your chosen web host.

## Captions and letters
- Change permanent captions in `pages/memories.html`: search for `data-caption` and edit the text between the tags.
- The captions panel also saves edits to **that browser only**. These edits are not shared with other devices or visitors. Clear this website’s browser storage to return to the source captions.
- Edit each letter directly in its HTML file. The promise has its own additional `pages/promise.html` page.
- Extra notes are in `js/interactions.js`. Colors and typography are in `css/style.css`.
- Google Fonts load online. Readable local font fallbacks are included if you are offline.

## Pages
`index.html` → `pages/apology.html` → `pages/my-feelings.html` → `pages/understanding.html` → `pages/memories.html` → `pages/promise.html` → `pages/ending.html`

## Little discoveries
- Click the envelope or **Open My Little Letter** to open the diary.
- Click flowers to bloom them; click hearts, stars, and the small envelope for gentle notes.
- All five understanding cards open and close by mouse, touch, Enter, or Space.
- Click a photo to expand it. Close it using ×, Escape, or the area outside it.
- **One More Thing…** appears below the promise.
- The last hidden letter appears on the ending page once you have reached the bottom of all seven pages. Reading progress remains in the current browser. You can use navigation freely; there is no time limit or demand to reply.
- **Read My Letter Again** returns to the welcome page while preserving discovered progress.

## Privacy and accessibility
No analytics, trackers, accounts, backend, or messages are sent. Local storage is used only for progress and captions. Google Fonts is the only external design resource. File picker selections stay on the device. If browser storage is blocked, the diary still works, but cross-page progress and caption persistence may be unavailable.

Responsive layouts support phones, tablets, and desktops. All controls have accessible names, dialogs support Escape and focus return, focus indicators are visible, and reduced-motion settings are honored. Sound is always user initiated.

## Project structure
- `index.html` — welcome and envelope
- `pages/` — six diary chapters including the added promise page
- `css/style.css` — shared visual design
- `css/animations.css` — gentle animations and reduced-motion rules
- `css/responsive.css` — tablet and phone layouts
- `js/main.js` — navigation, storage, reading progress, dialogs
- `js/interactions.js` — notes, blooms, cards, photos, local caption/file previews
- `js/music.js` — shared audio/video playback controls
- `assets/images/` — photo placeholders and fallback artwork
- `assets/icons/` — original flower illustration and heart icon
- `assets/videos/` and `assets/music/` — your personal media goes here

## Sharing
Upload the whole folder to a static web host. Preserve folder names and relative paths. A localhost address only works on your own computer; it is not a public link for Julie. Include personal files only when you intend them to be available to the people who can access that website.

# WAGademy

A small [Astro](https://astro.build/) site: the six WAGademy sessions written up as a
self-paced course, plus the session timer and the resource list.

Live at **https://wagademy-uq.github.io** once deployed.

---

## Publishing it (one-time setup, ~10 minutes)

**1. Create the organisation.** On GitHub: your profile menu → *Your organizations* →
*New organization* → **Free** plan. Name it `wagademy-uq`.
(`wagademy` was already taken. If you ever change the org name, change `site` in
`astro.config.mjs` to match.)

**2. Create the repository** inside that organisation, named exactly
`wagademy-uq.github.io`. Public. Don't add a README — this folder has one.

**3. Push this folder to it:**

```bash
cd wagademy-site
git init
git add .
git commit -m "WAGademy site"
git branch -M main
git remote add origin https://github.com/wagademy-uq/wagademy-uq.github.io.git
git push -u origin main
```

**4. Turn on Pages.** In the repository: *Settings* → *Pages* → under **Source**
choose **GitHub Actions**. That's it — the workflow in `.github/workflows/deploy.yml`
builds and publishes on every push to `main`.

The first build takes a couple of minutes. After that the site is live, and every
push updates it automatically.

## Editing the content

Everything readable lives in `src/content/sessions/` as plain Markdown — one file per
session. Edit the text, commit, push; the site rebuilds itself.

Each file starts with a small block of settings:

```yaml
---
number: 4                      # order, and the URL: /sessions/4/
title: "Reproducible research"
subtitle: "..."                # the line under the title
strand: "Research skills"
blurb: "..."                   # the summary on the cards
minutes: 60                    # rough reading/doing time
kind: hands-on                 # 'hands-on' or 'reading'
slides: "WAGademy-session4-reproducible-research.pptx"
---
```

To add a session, copy an existing file, change the number, and drop its slides into
`public/slides/`. Nothing else needs updating — the home page and the session index
build themselves from the folder.

Special blocks you can use inside the Markdown:

```html
<div class="callout do">   … a green "do this now" box …   </div>
<div class="callout">      … a plain aside …               </div>
<div class="callout tomato"> … a warning …                 </div>
```

The other pages are `src/pages/*.astro`: the home page, the timer, *Run your own*,
and *Resources*. Colours and type live in `src/styles/global.css`.

## Running it locally (optional)

Needs [Node](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev      # http://localhost:4321 — updates as you type
npm run build    # writes the finished site into dist/
```

You don't need any of this to edit content: GitHub's own web editor works fine, and
the Actions workflow does the building.

## Licence

Content is free to reuse and adapt — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Much of the method is adapted, with thanks, from [Thèsez-vous](https://www.thesez-vous.com/).

# WAGademy

**A Working Accountability Group for research students — the format, the tools, and a growing library of topics.**

Live at **[wagademy-uq.github.io](https://wagademy-uq.github.io)**.

WAGademy runs for HDR students in the Imaging, Sensing and Biomedical Engineering discipline,
School of Electrical Engineering and Computer Science, at The University of Queensland: three hours
of protected, timed work alongside other people doing the same, usually with a short themed
discussion in front of it. This repository is that, written up so it works without the room — and so
anyone can pick it up and run their own.

**The format is the durable part; the topics are optional.** A session is *commit → work → report*
and runs perfectly well with no material at all. Topics are the themed discussions you can bolt on
when you have one worth thirty minutes. They have no order and no thread, so the library just grows.

Written and facilitated by Michèle Masson-Trottier — <m.massontrottier@uq.edu.au>.

---

## What's here

| | |
|---|---|
| **Goal board** (`/board/`) | Three columns — To do, Ongoing, Done — with drag-and-drop stickies, plus the *verb + deliverable + size* method for writing goals worth having. Stored in the visitor's browser (`localStorage`), nothing sent anywhere. |
| **Session timer** (`/timer/`) | The one used on the big screen in the room: three 50-minute blocks with real breaks and a report-back, plus a classic 25/5 plan. Carries a compact copy of the same board. Works offline. |
| **Topics** (`/topics/`) | Writing momentum · taming the literature · reproducible research · managing up · surviving peer review. Each is a 20–30 minute read plus something concrete to do. Reproducible research is a hands-on walkthrough that ends with a real project on GitHub. |
| **Run your own** | The run sheet, the ground rules, and what to do in the first ten minutes. |
| **About** | Why research writing stalls and what structure actually changes — the case for the format. |
| **Resources** | Every tool and link from the topics, in one place. |
| **Slides** | A `.pptx` per topic, attached to its page, plus an intro deck for a first meeting. Free to reuse. |

## Adding or editing a topic

Topics live in `src/content/topics/` as plain Markdown — one file per topic, and the filename is
the URL (`managing-up.md` → `/topics/managing-up/`). Edit the text, commit, push; the site rebuilds
itself. GitHub's own web editor is fine for this; you don't need to install anything.

Each file starts with a small block of settings:

```yaml
---
title: "Reproducible research"
subtitle: "..."                # the line under the title
strand: "Research skills"      # groups related topics; a new strand is fine
blurb: "..."                   # the summary on the cards
minutes: 60                    # rough reading/doing time
kind: hands-on                 # 'hands-on' or 'reading'
slides: "..."                  # optional, a file in public/slides/
---
```

To add a topic, drop a new `.md` file in that folder (and its slides in `public/slides/`, if it has
any). Nothing else needs updating — the home page, the topic index and the routes all build
themselves from the folder. There's deliberately no ordering field: topics stand alone, and a new
strand slots in by itself. `src/lib/topics.ts` decides which strands lead.

Special blocks you can use inside the Markdown:

```html
<div class="callout do">     … a green "do this now" box …   </div>
<div class="callout">        … a plain aside …               </div>
<div class="callout tomato"> … a warning …                   </div>
```

The standalone pages are `src/pages/*.astro`: home, *About*, the goal board, the timer,
*Run your own* and *Resources*. Colours and type live in one file, `src/styles/global.css`.

## Repository layout

```
src/content/topics/       the topics, as Markdown — one file per topic
src/pages/                home, about, board, timer, run-your-own, resources
src/pages/topics/         the topic index and the /topics/<slug>/ route
src/components/           GoalBoard.astro (board markup + logic), TopicCard.astro
src/lib/topics.ts         how topics are ordered for display
src/layouts/Base.astro    header, footer, and the small scripts (tickable checklists, copy buttons)
src/styles/global.css     the whole design system
public/slides/            slide decks
.github/workflows/        builds and publishes on every push to main
```

Built with [Astro](https://astro.build/). No framework and no dependencies beyond Astro itself;
the only client-side JavaScript is the timer, the goal board, and a few lines in the layout.

### The goal board

`src/components/GoalBoard.astro` renders in two variants — `full` (its own page) and `compact`
(under the timer). Both read and write the same `localStorage` key, `wagademy:board:v1`, so goals
set on one show up on the other, and a `storage` listener keeps two open tabs in step. Nothing
leaves the browser, which also means nothing syncs between devices. If you change the shape of a
stored goal, bump the key.

## Running it locally

Needs [Node](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev      # http://localhost:4321 — updates as you type
npm run build    # writes the finished site into dist/
```

## Deploying

The site is already published: pushing to `main` triggers `.github/workflows/deploy.yml`, which
builds and deploys to GitHub Pages. Nothing else to do.

<details>
<summary>Setting this up somewhere else</summary>

1. Create a repository named `<org-or-user>.github.io` (public).
2. Push this folder to it.
3. *Settings* → *Pages* → under **Source** choose **GitHub Actions**.
4. Set `site` in `astro.config.mjs` to the URL it will live at. If the repo is *not* named
   `<name>.github.io`, also add `base: '/<repo-name>'`.

The first build takes a couple of minutes; after that every push updates the site.
</details>

## Reusing it

Content is free to reuse and adapt — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Take the sessions, change what doesn't fit your group, and run it.

The format borrows from a long tradition of structured writing retreats and shared work sessions —
[Thèsez-vous](https://www.thesez-vous.com/), Shut Up & Write, and plenty of others. What's written
here is the version that survived contact with a real room, and it has been changed accordingly.

If you run one somewhere else, I'd like to hear how it went.

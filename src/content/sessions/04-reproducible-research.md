---
number: 4
title: "Reproducible research"
subtitle: "Data, code and file sanity — because future-you is your most important collaborator."
strand: "Research skills"
blurb: "The hands-on one. Work through it at a laptop and you'll finish with a real project on GitHub, a sane folder structure, and a README — about an hour, start to finish."
minutes: 60
kind: hands-on
slides: "WAGademy-session4-reproducible-research.pptx"
---

## Could you rerun your analysis from six months ago?

Sit with that for a second before answering. The usual failure modes:

- **Version chaos.** `final_v2_FINAL_realfinal.docx`. Nobody knows which file is current, least of all you. Every thesis has a haunted folder.
- **Mystery data.** Which spreadsheet was the cleaned one? What does column `x2_new` mean? Undocumented data rots in months, not years.
- **"It worked on my machine."** The analysis ran once, that one time, with settings nobody wrote down.
- **The bus factor of one.** If your laptop died tonight, how much of your PhD dies with it?

## The cost-benefit nobody explains

| What sloppiness costs | What thirty tidy minutes buys |
|---|---|
| Days rebuilding an analysis a reviewer questioned | Revisions become re-runs: change the input, execute, done |
| Panic when a supervisor asks "can you redo it with the new data?" | Instant credibility with supervisors, examiners and reviewers |
| Results you half-doubt because you can't retrace them | Your paper's data availability statement writes itself |
| A thesis handover that helps nobody, including you at the viva | A skill employers in and out of academia actively hire for |

Reproducibility isn't extra work. It's work you stop doing twice.

## The four habits

1. **One project structure, always.** `data-raw / data-clean / code / outputs / docs`. Raw data is read-only, forever. Dates in filenames as `2026-08-27`, so they sort themselves.
2. **Version-control the words and the code.** Git for code; tracked changes plus OneDrive version history for documents. `FINAL_v2` is not a version system.
3. **A README in every project.** Five lines: what this is, where the data came from, how to re-run it, what's still broken, who to contact. Written for a stranger — who is you, later.
4. **Script it or lose it.** Every manual step in Excel is a step nobody can repeat. If it happened to the data, it should be in code — cleaning included.

---

# The walkthrough

The rest of this page is hands-on. By the end you'll have a real project, tracked in Git, backed up on GitHub, with a structure and a README you can reuse for everything else.

Set aside about an hour. You need a terminal and an internet connection. Every command is copy-pasteable.

<div class="callout tomato">

**One warning before you start.** Never put sensitive data — participant identifiers, health records, anything under an ethics approval that restricts sharing — into a Git repository, especially not a public one. Git remembers everything you commit, forever, even after you delete the file. Step 4 sets up a `.gitignore` that keeps raw data out by default. Keep it that way unless you're certain the data can be public.

</div>

## Step 1 — Install Git

**macOS.** Open Terminal and type `git --version`. If it isn't installed, macOS offers to install the developer tools — accept, and wait.

**Windows.** Download and run the installer from [git-scm.com/download/win](https://git-scm.com/download/win). Accept the defaults. This gives you a terminal called **Git Bash** — use that for everything below, not the Command Prompt.

**Linux.** `sudo apt install git` (Debian/Ubuntu) or `sudo dnf install git` (Fedora).

Check it worked:

```bash
git --version
```

You should see something like `git version 2.43.0`. Any version from the last few years is fine.

## Step 2 — Tell Git who you are

Git stamps your name on every change you record. Do this once per computer:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

Use the same email you'll use for GitHub. Check it took:

```bash
git config --global --list
```

## Step 3 — Make a project with a sane structure

Pick where your projects live and create one. Adjust the first line if you keep projects somewhere else:

```bash
cd ~/Documents
mkdir my-project
cd my-project
mkdir data-raw data-clean code outputs docs
```

What each folder is for:

| Folder | Contents | Rule |
|---|---|---|
| `data-raw/` | The data exactly as it arrived | **Read-only. Never edit anything in here.** |
| `data-clean/` | Data your code produced from `data-raw` | Disposable — a script can always rebuild it |
| `code/` | Scripts that do the work | This is what you version-control |
| `outputs/` | Figures, tables, model results | Also disposable, also regenerable |
| `docs/` | Notes, protocols, the manuscript | |

The important idea is the arrow: `data-raw` → (code) → `data-clean` → (code) → `outputs`. If you ever find yourself editing a file in `data-clean` by hand, that's the moment reproducibility breaks.

## Step 4 — Start tracking it with Git

```bash
git init
```

Now tell Git what to ignore. This keeps raw data, huge files and system clutter out of your repository:

```bash
cat > .gitignore << 'EOF'
# Raw and intermediate data stay off GitHub
data-raw/
data-clean/
outputs/

# but keep the empty folders so the structure travels
!data-raw/.gitkeep
!data-clean/.gitkeep
!outputs/.gitkeep

# System and editor clutter
.DS_Store
Thumbs.db
.Rhistory
.Rproj.user/
__pycache__/
.ipynb_checkpoints/
.venv/
EOF

touch data-raw/.gitkeep data-clean/.gitkeep outputs/.gitkeep
```

*(Windows users on Git Bash: the block above works as-is. If your terminal complains, create `.gitignore` in a text editor instead and paste the same contents.)*

## Step 5 — Write the README

This is the highest-value file in the project and it takes five minutes:

```bash
cat > README.md << 'EOF'
# My Project

**What this is.** One or two sentences: the question, the study, the paper it belongs to.

**Where the data came from.** Source, date collected, who to ask about it,
and any ethics or access restrictions. Raw data is not in this repository.

**How to re-run it.**
1. Put the raw files in `data-raw/` (ask me for them).
2. Run `code/01-clean.R` — writes to `data-clean/`.
3. Run `code/02-analysis.R` — writes figures and tables to `outputs/`.

**What's still broken.** Known issues, shortcuts taken, things to fix.

**Contact.** Your name, your email.
EOF
```

Open it in any editor and fill in the real answers. The "what's still broken" section feels uncomfortable to write and is the one future-you will be most grateful for.

## Step 6 — Your first commit

A commit is a labelled snapshot of the project. Check what Git has noticed:

```bash
git status
```

Stage everything it should track, then record the snapshot:

```bash
git add .
git commit -m "Set up project structure and README"
```

That's the loop you'll repeat forever: **change things → `git add .` → `git commit -m "what I did"`**. Commit whenever you finish something you'd be annoyed to lose — roughly once a pomodoro.

See your history any time with:

```bash
git log --oneline
```

## Step 7 — Put it on GitHub

So far everything is on your laptop. GitHub is the backup, and the thing you can point a collaborator or a journal at.

1. **Create a free account** at [github.com](https://github.com/). If you're a student, claim the [GitHub Student Developer Pack](https://education.github.com/pack) — free private repositories with collaborators, and a pile of other tools.
2. **Install the GitHub CLI** — it handles the login and the repository creation in one step. Instructions at [cli.github.com](https://cli.github.com/). On macOS with Homebrew: `brew install gh`. On Windows, the Git installer's package manager or the `.msi` from that page.
3. **Log in**, and follow the browser prompt:

```bash
gh auth login
```

4. **Create the repository and push**, all in one command:

```bash
gh repo create my-project --private --source=. --remote=origin --push
```

Start **private**. You can make it public later in one click; you cannot un-publish something that has already been cloned.

From now on, after each commit:

```bash
git push
```

<div class="callout">

**No terminal? Use GitHub Desktop.** [desktop.github.com](https://desktop.github.com/) gives you the same thing with buttons: *Add existing repository*, then *Commit*, then *Publish repository*. The concepts on this page all apply — commits, ignoring files, pushing — you just click them instead of typing them. It's a completely legitimate way to work.

</div>

## Step 8 — Prove it works

The test of a reproducible project is whether it survives leaving your machine. Somewhere else on your computer:

```bash
cd ~/Desktop
git clone https://github.com/YOUR-USERNAME/my-project.git test-clone
cd test-clone
ls
```

You should see your folder structure and your README, and *no* raw data — which is exactly right. Now read your own README as though you'd never seen the project. Could a stranger get from here to your figures?

Whatever's missing from that answer is your next commit.

```bash
cd ~/Desktop
rm -rf test-clone
```

<div class="callout do">

### Your checklist

- [ ] Git installed, name and email configured
- [ ] A project with `data-raw / data-clean / code / outputs / docs`
- [ ] A `.gitignore` that keeps data out of the repository
- [ ] A README a stranger could follow
- [ ] At least one commit
- [ ] Pushed to GitHub (private is fine)
- [ ] Cloned it somewhere else and read it with fresh eyes

</div>

## The five commands, forever

Ninety percent of everyday Git is this:

```bash
git status                    # what's changed?
git add .                     # stage all of it
git commit -m "message"       # snapshot it
git push                      # send it to GitHub
git log --oneline             # what have I done?
```

Branches, merges and pull requests matter when you collaborate. Learn them when you need them — [The Turing Way](https://book.the-turing-way.org/) and [Software Carpentry's Git lesson](https://swcarpentry.github.io/git-novice/) are both free and both excellent.

## Going further

- **[The Turing Way](https://book.the-turing-way.org/)** — the friendliest handbook on reproducible research there is. Start with the Reproducible Research chapter.
- **[The Good Research Code Handbook](https://goodresearch.dev/)** — project structure, testing and documentation, written for researchers rather than software engineers.
- **[Software Carpentry](https://software-carpentry.org/lessons/)** — free, well-tested lessons on the shell, Git, R and Python.
- **[UQ Research Data Manager](https://research.uq.edu.au/rmbt/uqrdm)** — where UQ research data is supposed to live. GitHub is for code; RDM is for the data itself.
- **Data management plan** — most institutions require one and most people write it at the end. Writing it first takes an hour and answers half the questions above.

## What's next

Session 5 leaves the laptop behind: supervisors, feedback and meetings, and the fact that the relationship is a skill rather than a lottery.

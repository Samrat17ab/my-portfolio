---
# How to write a blog post
# 1. Copy this file and rename it, e.g. what-i-learned-launching.md (the name becomes the URL).
#    Files starting with an underscore, like this one, are ignored.
# 2. Fill in the fields below, then write underneath the closing --- line.
# 3. Keep draft: true while you're writing. It shows only in `npm run dev`.
#    Delete the line (or set it to false) to publish.
#
# category (required), one of:
#   product   - things you're building and how you think about them
#   findings  - research, data and things you've figured out
#   wins      - milestones and accomplishments worth sharing
#   personal  - how it's going, and how it feels
# mood (optional): one word for how it felt, shown as "Feeling ...". Good for personal posts.
#   These have their own colour: calm, hopeful, grateful, curious, tender, restless, heavy, tired
# tags (optional): e.g. [mymoodly, research]
# excerpt (optional): the summary shown in lists; otherwise the first paragraph is used.
title: Your title here
date: 2026-10-10
category: product
tags: [building]
draft: true
---

Write in plain Markdown. A blank line starts a new paragraph.

## A heading if you want one

You can use **bold**, *italics*, [links](https://example.com), lists, tables and quotes:

> A line you want to stand out.

| Metric | Before | After |
| --- | --- | --- |
| Search CTR | 4% | 5% |

Images go in `public/blog/` and are added like this: ![Description](/blog/my-image.png)

Put `---` on its own line for a soft section break.

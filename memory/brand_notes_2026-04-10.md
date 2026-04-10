# Infinite Travel Brand Notes

- Public brand name updated to: Infinite Travel / 无限旅途
- Request from user on 2026-04-10: remove visible ZSY Travel branding from page titles and on-page headings
- Current Word-based content landed for Home / About / Contact / FAQ / core case direction
- Keep internal project history separate from public-facing brand

## Content Source Rule

For this project, always distinguish between **code-driven content** and **CMS-driven content** before editing.

### Code-driven layer
Edit local project files when the request affects:
- layout, styles, components, routes
- SEO logic, metadata, OG, favicon, logo
- fallback logic and default rendering behavior
- schema structure and Studio UI behavior

### CMS-driven layer
Edit Sanity data when the request affects live displayed content sourced from dataset documents such as:
- `homeSettings`
- `siteSettings`
- tours / cases
- FAQ items
- testimonials
- section content shown on the homepage or other CMS-controlled pages

### Execution rule
If a page currently reads from Sanity, changing only file-level defaults is not enough.
When the user asks to change visible copy on CMS-driven pages, update the CMS data as well, not just the code fallback.

### Practical default
Before changing visible site content, first determine the real source of truth:
1. code only
2. CMS only
3. code + CMS mixed

Then edit the correct layer(s) accordingly.

## Sanity Token Handling Rule

- Use Sanity API tokens only for script/API-based CMS writes.
- Manual edits inside Studio rely on the signed-in account, not the token.
- Preferred local storage path for this project: `secrets/sanity_token.txt` inside the project root, or a local env file excluded from Git.
- Never print the full token in terminal output, logs, chat, or committed files.
- If a token is ever exposed in output, revoke it and create a new one immediately.
- For low-risk internal setup tasks like token placement, local secret organization, and project-side usage rules, execute directly without asking the user again.

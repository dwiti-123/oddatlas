# Odd Atlas typography

Five semantic size roles are defined in `app/typography.css`. Use roles, not new per-component pixel values.

| Role | Desktop, 1200px+ | Mobile, 700px and below | Uses |
| --- | --- | --- | --- |
| `--type-display` | 64px | 40px | Page titles, hero headlines |
| `--type-section` | 36px | 28px | Section headings, article sections, list titles |
| `--type-card` | 24px | 22px | Place/blog cards, smaller subheadings |
| `--type-body` | 18px | 16px | Reading text, descriptions, text inputs |
| `--type-support` | 14px | 14px | Navigation, buttons, captions, dates, sources, functional wall labels |

Intermediate widths interpolate through clamp values. The rem units respect the browser's root font preference. Georgia remains the editorial heading face; Arial remains the interface/body face. Heading leading uses 1.15, with reading leading around 1.65; long-form prose can retain its established comfortable leading.

Semantic heading levels describe document structure; their visual role can differ. For example, a card h2 uses the card token while an article h2 uses the section token. Contact us deliberately remains a supporting link.

Brand marks keep their established proportions. Decorative lettering drawn inside SVG seals is illustration artwork, not functional UI. Do not use that exemption for instructions, attribution or buttons. Tailwind/shadcn text utilities are mapped onto the same five roles.

When adding a component, use a role variable. Do not add a mobile font-size override when the role already adapts. If readable text does not fit, wrap or change spacing/layout rather than shrinking it below the supporting role.

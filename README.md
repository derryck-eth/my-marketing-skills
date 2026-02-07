# My Marketing Skills

29 marketing AI agent skills + 29 tool integrations for Claude Code and compatible AI agents. Covers the full marketing stack: copywriting, CRO, SEO, paid ads, email, content strategy, pricing, referrals, and growth. SEO skills are built on insights from the Google Content Warehouse API leak and DOJ antitrust trial disclosures.

## Installation

### Using SkillKit (Recommended)

```bash
npx skillkit install derryck-eth/my-marketing-skills
```

### Using Claude Code

Install directly as a Claude Code plugin through the plugin interface.

### Manual Installation

```bash
git clone https://github.com/derryck-eth/my-marketing-skills.git
```

## Available Skills (29)

### Copywriting & Content
| Skill | Description |
|---|---|
| [copywriting](skills/copywriting/) | Persuasive marketing copy using PAS, AIDA, BAB frameworks |
| [copy-editing](skills/copy-editing/) | Edit and improve existing marketing copy for clarity and conversion |
| [email-sequence](skills/email-sequence/) | Email drip campaigns: welcome, launch, nurture, re-engagement |
| [social-content](skills/social-content/) | Social media content for LinkedIn, Twitter/X, Instagram, TikTok |
| [content-strategy](skills/content-strategy/) | Content planning, calendars, distribution, and performance |

### Conversion Rate Optimization (CRO)
| Skill | Description |
|---|---|
| [page-cro](skills/page-cro/) | Audit and optimize landing pages, homepages, pricing pages |
| [form-cro](skills/form-cro/) | Optimize lead capture forms for higher completion rates |
| [signup-flow-cro](skills/signup-flow-cro/) | Optimize signup and registration flows |
| [onboarding-cro](skills/onboarding-cro/) | Optimize post-signup activation and onboarding |
| [popup-cro](skills/popup-cro/) | Optimize modals, overlays, and exit-intent popups |
| [paywall-upgrade-cro](skills/paywall-upgrade-cro/) | Optimize free-to-paid, trial-to-paid, and upgrade flows |
| [ab-test-setup](skills/ab-test-setup/) | Set up and run A/B tests with statistical rigor |

### SEO & Search
| Skill | Description |
|---|---|
| [seo-audit](skills/seo-audit/) | 31-task audit across 5 pillars mapped to Google's ranking signals |
| [on-page-seo](skills/on-page-seo/) | Full ranking pipeline: Mustang, T* Topicality, NavBoost, Twiddlers |
| [link-building](skills/link-building/) | Trinity of Authority, three-tiered link index, anchor optimization |
| [topical-authority](skills/topical-authority/) | siteFocusScore, hub-and-spoke clustering, content pruning |
| [image-seo](skills/image-seo/) | NIMA quality scoring, Amarna indexing, semantic optimization |
| [eeat-optimization](skills/eeat-optimization/) | E-E-A-T mapped to Google's technical signals and quality systems |
| [programmatic-seo](skills/programmatic-seo/) | Generate and optimize pages at scale using templates and data |
| [schema-markup](skills/schema-markup/) | JSON-LD structured data for rich results |
| [competitor-alternatives](skills/competitor-alternatives/) | Comparison and alternatives pages for competitive keywords |

### Growth & Strategy
| Skill | Description |
|---|---|
| [paid-ads](skills/paid-ads/) | Google Ads, Meta, LinkedIn, Twitter/X campaign management |
| [pricing-strategy](skills/pricing-strategy/) | Value-based pricing, tier design, anchoring, freemium models |
| [launch-strategy](skills/launch-strategy/) | Product launches, feature announcements, release strategies |
| [referral-program](skills/referral-program/) | Referral, affiliate, and word-of-mouth program design |
| [free-tool-strategy](skills/free-tool-strategy/) | Free tools as acquisition channels |
| [marketing-ideas](skills/marketing-ideas/) | Ideation frameworks and campaign brainstorming |
| [marketing-psychology](skills/marketing-psychology/) | Behavioral science and persuasion principles for marketing |
| [analytics-tracking](skills/analytics-tracking/) | Analytics setup, event tracking, and data quality |

## Tool Integrations (29)

Connect to your marketing stack via MCP. See [tools/REGISTRY.md](tools/REGISTRY.md) for the full list.

| Category | Tools |
|---|---|
| Analytics & Data | GA4, Adobe Analytics, Amplitude, Mixpanel, PostHog, Segment |
| Advertising | Google Ads, LinkedIn Ads, Meta Ads, TikTok Ads |
| Email & Communication | Customer.io, Mailchimp, Resend, SendGrid |
| CRM & Sales | HubSpot, Salesforce |
| Search & SEO | Ahrefs, Google Search Console, Semrush |
| Commerce & Business | Stripe, Shopify, Webflow, WordPress |
| Growth & Loyalty | Dub.co, Kit, Mention Me, Rewardful, Tolt |
| Automation | Zapier |

## Knowledge Base

The `knowledge-base/` directory contains source references for the SEO skills, synthesized from 18 authoritative sources analyzing Google's internal ranking systems. See [knowledge-base/SOURCES.md](knowledge-base/SOURCES.md).

## Project Structure

```
my-marketing-skills/
├── .claude-plugin/
│   └── marketplace.json       # Plugin manifest (29 skills)
├── skills/                    # 29 marketing skill directories
│   ├── copywriting/           # Each contains a SKILL.md file
│   ├── seo-audit/
│   ├── paid-ads/
│   └── ...
├── tools/
│   ├── REGISTRY.md            # Index of 29 tool integrations
│   └── integrations/          # Individual tool guides
├── knowledge-base/
│   └── SOURCES.md             # SEO research source references
├── README.md
├── AGENTS.md
├── VERSIONS.md
└── CONTRIBUTING.md
```

## License

MIT License — feel free to use, modify, and share.

# Agent Instructions

Instructions for AI agents on how to use the 29 marketing skills in this repository.

## How Skills Work

Each skill in `skills/` contains a `SKILL.md` file with structured marketing knowledge. When a user's request matches a skill's domain, read the relevant SKILL.md and follow its instructions.

## Skill Selection Guide

| User Request | Skill |
|---|---|
| "Write copy for my landing page" | copywriting |
| "Create an email drip campaign" | email-sequence |
| "Audit my homepage for conversions" | page-cro |
| "Optimize my signup form" | form-cro |
| "Improve my onboarding flow" | onboarding-cro |
| "Create a popup for email capture" | popup-cro |
| "Optimize my paywall" | paywall-upgrade-cro |
| "Set up an A/B test" | ab-test-setup |
| "Do an SEO audit" | seo-audit |
| "Optimize my page for search" | on-page-seo |
| "Help me build backlinks" | link-building |
| "Build topical authority" | topical-authority |
| "Optimize my images for SEO" | image-seo |
| "Improve my E-E-A-T" | eeat-optimization |
| "Create pages at scale" | programmatic-seo |
| "Add schema markup" | schema-markup |
| "Create a competitor comparison page" | competitor-alternatives |
| "Create a Google Ads campaign" | paid-ads |
| "Help with pricing" | pricing-strategy |
| "Plan a product launch" | launch-strategy |
| "Set up a referral program" | referral-program |
| "Build a free tool for marketing" | free-tool-strategy |
| "Brainstorm marketing ideas" | marketing-ideas |
| "Apply psychology to marketing" | marketing-psychology |
| "Set up analytics tracking" | analytics-tracking |
| "Create social media content" | social-content |
| "Plan a content strategy" | content-strategy |
| "Edit my marketing copy" | copy-editing |
| "Optimize my signup flow" | signup-flow-cro |

## Using Multiple Skills

Some tasks require combining skills:

- **"Rewrite my landing page"** → page-cro (structure/audit) + copywriting (actual copy)
- **"Create a launch campaign"** → launch-strategy (plan) + email-sequence (emails) + social-content (social posts) + paid-ads (ad campaigns)
- **"Full SEO overhaul"** → seo-audit (diagnosis) + on-page-seo (page optimization) + link-building (authority) + topical-authority (content architecture)
- **"Optimize my funnel"** → page-cro (landing page) + signup-flow-cro (registration) + onboarding-cro (activation) + email-sequence (nurture)

## Tool Integrations

If MCP tools are available (see `tools/REGISTRY.md`), use them to pull real data before making recommendations. Tools are optional — all skills work without them.

## General Rules

1. Always gather context before producing output
2. Follow the output format in each SKILL.md
3. Provide specific, actionable recommendations — not vague advice
4. Offer 2-3 alternatives for headlines and CTAs
5. Adapt frameworks to the user's specific situation

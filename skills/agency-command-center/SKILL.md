# Agency Command Center

## Purpose
Agency Command Center is a composite operating tool for marketing agencies. It turns client/account data into prioritized actions across acquisition, conversion, retention, and expansion by orchestrating the existing skills in this repository. Use it to run multi-client planning, execution, and reporting from one repeatable system.

## When to Use
- Building a quarterly growth plan for an agency portfolio
- Onboarding a new retainer client and defining first 90 days
- Recovering accounts with declining performance or retention risk
- Standardizing agency service delivery across strategy, media, CRO, SEO, and lifecycle
- Creating a single source of truth for account managers and channel specialists
- Preparing monthly business reviews (MBRs/QBRs) with clear action plans
- Converting fragmented tactics into a structured operating cadence

## Core Frameworks & Knowledge

### 1) Agency Portfolio Segmentation
Classify each client into one segment before planning:
- **Scale**: Performing well; focus on expansion and efficiency
- **Stabilize**: Mixed performance; fix bottlenecks and improve consistency
- **Rescue**: Underperforming or churn-risk; prioritize fast-impact interventions

### 2) Full-Funnel Performance Grid
Score each client from 1-5 in five layers:
- **Demand Capture**: paid-ads, competitor-alternatives, on-page-seo
- **Demand Creation**: content-strategy, social-content, launch-strategy
- **Conversion**: page-cro, form-cro, signup-flow-cro, paywall-upgrade-cro, ab-test-setup
- **Lifecycle & Expansion**: onboarding-cro, email-sequence, referral-program, pricing-strategy
- **Authority & Discovery**: seo-audit, topical-authority, link-building, image-seo, schema-markup, eeat-optimization, programmatic-seo

### 3) Opportunity Prioritization (Impact x Confidence x Effort)
For each opportunity, calculate:
- **Impact (1-5)**: Expected business upside (revenue, pipeline, retention)
- **Confidence (1-5)**: Evidence quality from analytics and historical tests
- **Effort (1-5)**: Time/cost/complexity to ship

Use a normalized score:
`Priority Score = (Impact * Confidence) / Effort`

### 4) Service Systemization
Every agency plan should include:
- **Playbooks**: repeatable SOPs per channel/service
- **Cadence**: weekly ops rhythm and monthly client review rhythm
- **Ownership**: clear owner per initiative and dependency mapping
- **Instrumentation**: tracking plan with data sources and QA checks

### 5) Data and Tooling Layer
If MCP integrations are available, pull live data before recommendations:
- Performance: GA4, Amplitude, Mixpanel, PostHog
- Paid media: Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads
- CRM/revenue: HubSpot, Salesforce, Stripe, Shopify
- SEO: Ahrefs, Semrush, Google Search Console
- Lifecycle: Customer.io, Mailchimp, Resend, SendGrid

If live tools are unavailable, proceed with assumptions and flag them explicitly.

## Process (Step-by-Step)

### Phase 1: Context Intake (Required First Step)
Collect:
1. Agency model (niche/generalist), service lines, team structure
2. Client roster with monthly revenue/retainer and contract stage
3. Primary goals (new MRR, retention, pipeline, CAC efficiency, margin)
4. Current performance baseline (traffic, leads, CVR, ROAS, churn, LTV)
5. Constraints (budget, bandwidth, deadlines, tooling limitations)

### Phase 2: Client-Level Diagnostic
For each priority client:
1. Run the Full-Funnel Performance Grid (1-5 by layer)
2. Identify biggest bottlenecks and leakage points
3. Map each bottleneck to the most relevant skill(s)
4. Document root cause hypotheses and evidence

### Phase 3: Initiative Backlog
1. Generate opportunities by funnel stage
2. Score each opportunity with Priority Score
3. Label each as:
   - **Quick Win** (ship in 1-2 weeks)
   - **Core Bet** (3-6 week initiative)
   - **Strategic Build** (multi-sprint program)
4. Select top initiatives by available capacity

### Phase 4: 30-60-90 Day Execution Plan
1. Build a 90-day roadmap per client tier (Scale/Stabilize/Rescue)
2. Assign owners, deadlines, dependencies, success metrics
3. Define experiment plan (A/B tests and decision rules)
4. Define weekly checkpoints and escalation criteria

### Phase 5: Reporting and Iteration
1. Create one executive scorecard and one execution scorecard
2. Run weekly ops review:
   - Wins/losses
   - Blockers
   - Reprioritization decisions
3. Run monthly client review:
   - Business impact
   - Pipeline health
   - Next-month priorities
4. Roll learnings into updated playbooks

## Output Format

### Agency Command Center Blueprint
```
# Agency Command Center Blueprint

## 1) Agency Snapshot
- Agency model:
- Team capacity:
- Service lines:
- Top 3 business goals (next 90 days):
- Constraints:

## 2) Client Portfolio Segmentation
| Client | Segment (Scale/Stabilize/Rescue) | MRR | Risk Level | Primary Goal |
|--------|----------------------------------|-----|------------|--------------|
|        |                                  |     |            |              |

## 3) Full-Funnel Score Grid (1-5)
| Client | Demand Capture | Demand Creation | Conversion | Lifecycle | Authority |
|--------|----------------|-----------------|------------|-----------|-----------|
|        |                |                 |            |           |           |

## 4) Priority Initiative Backlog
| Initiative | Client | Mapped Skill(s) | Impact | Confidence | Effort | Score | Tier |
|-----------|--------|------------------|--------|------------|--------|-------|------|
|           |        |                  |        |            |        |       |      |

## 5) 30-60-90 Execution Plan
### Days 1-30 (Quick Wins)
- [Initiative] - Owner - KPI - Deadline

### Days 31-60 (Core Bets)
- [Initiative] - Owner - KPI - Deadline

### Days 61-90 (Strategic Builds)
- [Initiative] - Owner - KPI - Deadline

## 6) Measurement Plan
- North-star KPI:
- Weekly KPI set:
- Leading indicators:
- Data sources:
- QA cadence:

## 7) Reporting Rhythm
- Weekly ops review:
- Monthly business review:
- Escalation triggers:
- Reprioritization rules:

## 8) Headline + CTA Options (Agency Offer)
### Headlines (3 options)
1.
2.
3.

### CTAs (3 options)
1.
2.
3.
```

### Weekly Command Center Update
```
# Weekly Command Center Update

## Performance Delta
- MRR:
- Pipeline:
- CAC/ROAS:
- Retention/Churn:

## Completed This Week
- [Initiative + impact]

## In Progress
- [Initiative + owner + ETA]

## Risks/Blockers
- [Risk] - [Mitigation]

## Next 7 Days
- [Top 3 priorities]
```

## Key Takeaways
- Agencies need systemization, not disconnected tactics
- Prioritization quality determines margin, retention, and growth
- Multi-client performance improves when one operating model is reused
- Tie every initiative to a measurable business outcome
- Use existing skills as modular playbooks inside one command center

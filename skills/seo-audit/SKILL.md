# SEO Audit Framework

## Purpose
Conduct a comprehensive 31-task SEO audit mapped to Google's five ranking signal pillars revealed in the Content Warehouse leak. This framework diagnoses ranking obstacles and optimization opportunities by analyzing how Google evaluates Trust, Experience, Expertise, Authoritativeness, and Image SEO factors. The audit transforms scattered SEO metrics into a cohesive diagnostic tool aligned with Google's actual ranking pipeline.

## When to Use
- Launching a new optimization initiative requiring baseline diagnostics
- Investigating sudden ranking drops or stagnation
- Competitive analysis to identify performance gaps vs. top-ranking competitors
- Site restructuring or technical migration planning
- Pre-campaign audits before major content launches
- Quarterly performance reviews with quantifiable benchmarks
- Identifying which ranking pillar is the primary constraint on visibility

## Core Frameworks

### The Five Pillars Model
Google's ranking algorithm evaluates content across five primary dimensions. Each pillar contains measurable signals that directly impact positioning:

**PILLAR 1: TRUST (Credibility & Safety Signals)**
- NavBoost Integration: User click patterns determine which pages Google surfaces to more users
- Mobile Clutter Penalty: ClutterScore evaluates UI/UX interference on mobile
- Indexing Tier System: Pages classified as low/medium/high value affect crawl budget and ranking
- Spam/Deception Detection: Automated systems flag keyword stuffing, cloaking, schema abuse
- Sandbox Effect: New domains receive restricted SERP visibility until proving topical relevance
- Canonicalization Integrity: Incorrect canonical tags dilute ranking signals across duplicate content

**PILLAR 2: EXPERIENCE (User Satisfaction Metrics)**
- ContentEffort Signal: Measures time/resources invested in content (word count, media, originality)
- Authorship Clarity: Bylines, author bios, and documented expertise strengthen attribution
- Freshness Signals: Publication date, update frequency, and content recency factor into rankings
- Original Multimedia: Original images/videos rank higher than stock or scraped media
- Core Web Vitals: LCP, FID, CLS thresholds directly correlate with ranking boosts

**PILLAR 3: EXPERTISE (Knowledge Authority)**
- Signal Coherence: Alignment between title, H1, URL, and intro paragraph validates topical focus
- Semantic Comprehensiveness: Content coverage depth using entity-based understanding
- Topical Focus Consistency: Pages should concentrate on primary topic, not scatter keywords
- Internal Prominence: H1 positioning and internal linking emphasize key expertise areas
- YMYL Determination: Medical, financial, legal content receives stricter expertise scrutiny

**PILLAR 4: AUTHORITATIVENESS (Domain Power)**
- SiteAuthority: Overall domain trust score derived from link profile and brand signals
- Link-Based Authority: Quantity and quality of inbound links from trusted domains
- Anchor Text Distribution: Optimal anchor text mix prevents spam signals
- Brand Signals: Branded search volume, mentions, and direct traffic indicate authority

**PILLAR 5: IMAGE SEO (Visual Content Ranking)**
- Provenance: Original publication date and first-crawl timestamp
- Semantic Understanding: OCR, alt text, surrounding context for image comprehension
- Quality Assessment: NIMA scores for technical and aesthetic quality
- User Engagement: Click rates and dwell time on image results
- Licensing: Proper IPTC metadata and usage rights documentation

## Process

### Phase 1: Technical Foundations Audit (6 Tasks)
**Indexing & Crawlability:**
1. Verify all priority pages pass Google's indexing tier requirements (check Search Console coverage vs. XML sitemaps)
2. Audit robots.txt and meta robots tags for unintended blockages
3. Test mobile rendering for clutter signals using Page Experience tools
4. Validate canonical tag placement (one per page, self-referential on pagination)
5. Check for hreflang implementation if serving multiple languages/regions
6. Confirm Core Web Vitals compliance (LCP <2.5s, FID <100ms, CLS <0.1)

### Phase 2: Trust Signal Evaluation (6 Tasks)
**Credibility Assessment:**
7. Analyze NavBoost patterns: measure click-through rates from search results to identify pages Google ranks but users avoid
8. Audit mobile UI for clutter (intrusive ads, sticky headers, poor button spacing)
9. Search for manual actions in Search Console indicating spam/deception detection
10. Test for sandbox conditions on new domain (compare SERP position by age of domain)
11. Verify link profile for toxic backlinks (assess anchor text diversity against AnchorSpamPenalizer thresholds)
12. Map brand signals (branded search volume, direct traffic, branded mentions) for authority benchmarking

### Phase 3: Content Experience Analysis (6 Tasks)
**Quality & Effort Measurement:**
13. Calculate ContentEffort scores: evaluate word count, multimedia volume, original vs. syndicated content
14. Review authorship documentation: check author bios, credentials, byline consistency
15. Analyze freshness patterns: identify content that hasn't been updated in 6+ months vs. competitors
16. Audit original media: compare percentage of original images/videos to stock content
17. Perform readability assessment: measure paragraph length, sentence complexity, formatting
18. Track engagement metrics: assess time-on-page, scroll depth, and internal link click rates

### Phase 4: Expertise & Topicality Verification (7 Tasks)
**Knowledge Authority Assessment:**
19. Conduct signal coherence audit: verify title-H1-URL-intro paragraph alignment on all key pages
20. Build semantic topology: map entity relationships and topical subtopics using NLP analysis
21. Evaluate topical focus consistency: identify off-topic content diluting site radius
22. Assess internal linking hierarchy: confirm hub pages receive maximum internal link equity
23. Determine YMYL classification: flag medical/financial/legal content for stricter expertise review
24. Benchmark expertise against competitors: compare content depth, subheading structure, definition coverage
25. Audit E-E-A-T signals: verify author credentials, publisher authority, content update frequency

### Phase 5: Authority & Link Profile Audit (3 Tasks)
**Backlink Performance:**
26. Calculate siteAuthority score: aggregate link quality, anchor text distribution, referring domain authority
27. Analyze link freshness: identify which links are recent vs. stale using FreshnessTwiddler metrics
28. Audit anchor text distribution: check for over-optimized keywords that trigger AnchorSpamPenalizer
29. Benchmark against competitors: compare total link volume, quality distribution, and topical relevance
30. Evaluate brand mentions: track unlinked brand references that boost authority signals
31. Review link velocity: measure rate of new link acquisition and pace of old link decay

### Phase 6: Image Optimization Assessment (2 Tasks)
**Visual Content Analysis:**
31. Audit image provenance: verify first-crawl dates to identify original vs. republished images
32. Assess image quality: review NIMA scores for technical and aesthetic quality benchmarks

## Output Format

### Executive Summary (1 page)
- Overall health score (0-100) based on weighted pillar performance
- Top 3 highest-impact optimization opportunities with estimated traffic impact
- Risk assessment: identify any manual action indicators or spam flags
- Competitive position summary: overall visibility vs. top 3 competitors

### Pillar Performance Dashboard
```
TRUST SIGNALS: 72/100
├─ NavBoost Status: CTR 3.2% (benchmark: 4.1%)
├─ Mobile Clutter: ClutterScore 0.18 (good: <0.25)
├─ Indexing Tier: 94% medium/high (target: 98%+)
├─ Spam Signals: 0 manual actions detected
├─ Sandbox Status: Domain age 2.3 years (graduated)
└─ Canonicalization: 100% valid implementation

EXPERIENCE SIGNALS: 68/100
├─ ContentEffort: Avg 2,400 words, 4.2 media/page
├─ Authorship: 73% of content with author bios
├─ Freshness: 42% updated within 90 days
├─ Original Media: 67% original images (benchmark: 80%+)
└─ Core Web Vitals: LCP 2.1s, FID 89ms, CLS 0.08

EXPERTISE SIGNALS: 81/100
├─ Signal Coherence: 89% strong alignment
├─ Semantic Comprehensiveness: 156 entities avg per page
├─ Topical Focus: SiteRadius 0.42 (good: <0.5)
├─ Internal Prominence: Hub pages avg 23 internal links
└─ YMYL Classification: 12 YMYL pages identified

AUTHORITATIVENESS: 58/100
├─ SiteAuthority: 42/100 vs. competitor avg 67
├─ Total Backlinks: 1,240 (benchmark: 2,100+)
├─ Anchor Text: 34% branded, 22% exact match (high-risk)
└─ Brand Signals: 1,200 branded searches/month

IMAGE SEO: 64/100
├─ Original Images: 58% original (benchmark: 75%+)
├─ NIMA Quality Scores: Avg VQ 0.58, AVA 0.62
├─ Licensing: 34% missing IPTC metadata
└─ Alt Text Coverage: 92% complete (good)
```

### Detailed Findings by Pillar

**PILLAR 1: TRUST** (Analysis of 6 core trust factors)
- Finding: NavBoost shows 0.9% gap to competitor average
  - Root cause: 23% of ranking pages have CTR <2%
  - Action: A/B test title/meta descriptions on 45 underperforming pages
  - Expected impact: +1.2% avg CTR, +18% visibility on "medium difficulty" keywords

**PILLAR 2: EXPERIENCE** (Analysis of user satisfaction factors)
- Finding: ContentEffort below category benchmark
  - Root cause: 34% of pages have <1,500 words vs. competitor avg 2,100 words
  - Action: Expand 28 key money pages with additional sections and multimedia
  - Expected impact: +12-18% ranking improvement on target keywords

**PILLAR 3: EXPERTISE** (Analysis of knowledge signals)
- Finding: Signal coherence issues on 12 pages
  - Root cause: Title and H1 mismatch creating semantic confusion
  - Action: Align 12 pages' title-H1-URL structure using checklist template
  - Expected impact: +2-3 position improvement per affected page

**PILLAR 4: AUTHORITATIVENESS** (Analysis of authority factors)
- Finding: SiteAuthority gap vs. competitors
  - Root cause: 34% lower link volume, lower-quality source distribution
  - Action: Launch 24-month link building campaign targeting 40 high-authority domains
  - Expected impact: +15-22 position improvements across competitive keywords

**PILLAR 5: IMAGE SEO** (Analysis of visual content)
- Finding: Stock image usage limiting organic image search visibility
  - Root cause: 67% non-original images reducing provenance signal strength
  - Action: Commission 12 custom images for top-traffic pages
  - Expected impact: +8-12% image search traffic

### Competitive Benchmarking Table
```
Metric                    Your Site    Competitor A    Competitor B    Benchmark
---
Avg ContentEffort (words)      2,100          2,840          2,650        2,700
% Original Media              58%            79%            81%           75%+
NavBoost CTR                  3.2%           4.1%           4.3%          4.1%
BackLink Count              1,240          3,120          2,840         2,100+
SiteAuthority Score           42/100         67/100         71/100        60/100+
Core Web Vitals Pass           95%            98%            97%           95%+
Topical Focus (SiteRadius)    0.42           0.31           0.35          <0.4
Signal Coherence              89%            96%            97%           95%+
```

### Implementation Roadmap (Prioritized by Impact)
1. **Quick Wins (30 days):** Signal coherence fixes, title/meta optimization, Core Web Vitals tuning
2. **Medium-term (90 days):** ContentEffort expansion, author credibility enhancement, fresh content updates
3. **Long-term (180+ days):** Link building campaign, original media production, topical authority consolidation

### Monthly Tracking Dashboard
- NavBoost CTR trend line with competitor comparison
- ContentEffort metric by page cluster
- Core Web Vitals compliance percentage
- SiteAuthority growth trajectory
- Link acquisition velocity and quality distribution
- Image quality (NIMA) average scores
- Search visibility and ranking distribution

## Key Metrics to Monitor Quarterly
- **Trust Score:** NavBoost CTR, manual actions, sandbox status, mobile clutter score
- **Experience Score:** Core Web Vitals performance, ContentEffort average, media freshness rate
- **Expertise Score:** Signal coherence percentage, semantic entity count, topical focus consistency
- **Authority Score:** SiteAuthority rank, backlink growth rate, anchor text health
- **Image Score:** Original image percentage, NIMA quality averages, image search clicks

---

*Framework based on Google Content Warehouse leak analysis. Metrics align with documented ranking signals including NavBoost, siteAuthority, ContentEffort, and semantic coherence systems.*

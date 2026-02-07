# Topical Authority Building

## Purpose
Build topical authority using Google's measurable metrics from the Content Warehouse leak: siteFocusScore and siteRadius (derived from site2vecEmbedding). This framework translates abstract concepts of "being an expert in a topic" into concrete, measurable technical signals Google uses to evaluate domain authority. By understanding how Google measures topical focus and breadth, you can deliberately structure content, prune off-topic pages, and build internal linking strategies that maximize visibility for your core topic cluster while avoiding the "outlier effect" that harms trustworthiness.

## When to Use
- Building initial topical authority for new domains or business pivots
- Recovering from algorithm updates that penalized overly broad content
- Preparing to enter competitive keyword clusters requiring authority signals
- Consolidating multiple content properties into focused topical authority
- Identifying content to prune or redirect that dilutes topical focus
- Planning long-term content strategy that maximizes signal coherence
- Diagnosing why a topically diverse site underperforms in specific categories

## Core Frameworks

### Site2vec Embedding & Semantic Understanding

Google's site2vec system transforms websites into semantic embeddings—mathematical representations of topical identity. This embedding determines:

1. **Core topic identification:** What topic does Google classify your site as covering?
2. **Topic breadth:** How narrowly or broadly focused is the site (siteRadius metric)?
3. **Topic proximity:** How similar are your coverage topics to each other (semantic distance)?

How it works:
- site2vec analyzes all indexed pages on your site
- Each page gets a semantic embedding (vector representation)
- Site-wide embedding averages all page embeddings
- Distance between your site's core embedding and specific topics determines ranking eligibility

Implication: If Google's site2vec classifier says your site is about "Digital Marketing Agency Services," you'll rank well for queries within that semantic cluster but poorly for unrelated topics.

### SiteFocusScore & Topic Concentration

siteFocusScore measures how concentrated your content is around a primary topic. Higher focus score = stronger topical authority signal.

**High Focus Score (0.7+):**
- Site clearly specializes in one topic area
- >70% of content falls within primary topic cluster
- Pages are tightly semantically related
- Example: SEO agency with 85% SEO content, 15% adjacent digital marketing
- Ranking benefit: +8-15 positions boost in primary topic keywords
- Trade-off: Limited reach into adjacent topics

**Medium Focus Score (0.4-0.7):**
- Site covers multiple related topics
- 40-70% of content in primary topic, 30-60% in secondary topics
- Topics are adjacent/related but distinct
- Example: Digital marketing agency with 50% SEO, 30% PPC, 20% social
- Ranking benefit: +2-6 position boost in primary topic
- Trade-off: Reduces depth of authority in any single topic

**Low Focus Score (<0.4):**
- Site is broadly diversified across multiple unrelated topics
- No clear primary topic
- Content scattered across 5+ unrelated subject areas
- Example: Blog covering "everything about business" (finance, HR, marketing, tech, etc.)
- Ranking penalty: -5 to -15 positions in competitive keywords
- Trade-off: Ability to cover diverse topics but no strong authority

Optimal strategy: Aim for 0.65-0.75 siteFocusScore (focused on primary topic while allowing some adjacent content).

### SiteRadius Metric

siteRadius measures the semantic breadth of your content—how far from the core topic does your content spread?

**Small SiteRadius (0.2-0.3):**
- Extremely focused content (niche specialization)
- All content within tight semantic cluster
- Example: "WordPress hosting for small business" (narrow niche)
- Benefit: Extreme depth in micro-topic, strong authority signal
- Challenge: Limited growth potential beyond narrow niche

**Medium SiteRadius (0.35-0.5):**
- Balanced topical breadth
- Primary topic plus complementary subtopics
- Example: "SEO agency" covering keyword research, on-page, technical, link building
- Benefit: Sufficient topical authority + room for content expansion
- Challenge: Must maintain coherence across subtopics

**Large SiteRadius (0.6+):**
- Broad content coverage across loosely related topics
- Difficulty maintaining strong authority in any single topic
- Example: "Marketing blog" covering 8+ distinct topics loosely
- Benefit: Can cover many topics
- Challenge: Diluted authority, weaker signal coherence

Optimal range: siteRadius 0.35-0.50 (enough breadth to cover topic subtopics without diluting focus).

### The Solar System Model

Visualize your site's topical authority using the Solar System Model:

```
                    [SUN]
              PRIMARY TOPIC
              (Core authority)

              /    |    \
             /     |     \
    [PLANET1]  [PLANET2]  [PLANET3]
    Subtopic A  Subtopic B  Subtopic C
    (Related)   (Related)   (Related)

   [ASTEROID]
   Unrelated
   Content
   (Harmful)
```

**The Sun (Core Topic):**
- Primary keyword cluster
- 60-70% of all content
- Receives most internal linking equity
- Examples:
  - Digital marketing agency: "SEO services"
  - SaaS platform: "Project management software"
  - Publisher: "Technology news"

**Planets (Subtopics):**
- Adjacent but clearly related topics
- 20-30% of content distributed across subtopics
- Subtopics in the same "semantic neighborhood" as core
- Examples for digital marketing agency:
  - Content marketing (related to SEO)
  - Technical SEO (subset of SEO)
  - Local SEO (subset of SEO)
  - Link building (component of SEO)

**Asteroids (Unrelated Content):**
- Content outside your topical gravity well
- Actively harmful to authority signals
- Should be removed or redirected
- Examples:
  - SEO agency publishing articles about "home renovation"
  - Business blog covering "celebrity gossip"
  - Tech publication covering "cooking recipes"

### The Outlier Effect

Google's algorithm includes the "outlier effect"—a penalty for content that falls far outside your site's topical cluster. This is critical: off-topic pages harm your entire site's authority, not just the individual page.

How it works:
1. Google builds semantic model of your site's topic (site2vec embedding)
2. When crawling new content, Google checks: "Is this page topically coherent with the site's focus?"
3. If page is semantic outlier (far from site embedding), it triggers:
   - Page gets lower ranking potential (even if on-topic for query)
   - Entire site's trustworthiness score decreases slightly
   - Future content from site is viewed more skeptically

Mathematical explanation:
- Each page has semantic embedding
- Site embedding = average of all page embeddings
- Outlier page = far from average
- Including outlier reduces site embedding clarity
- Reduced clarity = lower authority signal

Example impact:
- Your SEO agency site has mean embedding focused on "SEO"
- You publish article about "Best Cryptocurrency Wallets"
- Article is extreme outlier from site's semantic center
- Result:
  - Crypto article: Ranks poorly (0-3 positions despite relevance)
  - All other site pages: -1 to -3 position drop (site trustworthiness penalty)
  - Time to recovery: 6-12 months after outlier removal

### Hub-and-Spoke Content Clustering

Organize content using hub-and-spoke structure to maximize topical authority:

**Hub Page (Core Authority Node):**
- Comprehensive guide to primary topic
- Links to 15-25 supporting pages (spokes)
- Receives 20-30 internal links from homepage and category pages
- Examples:
  - "Complete SEO Guide 2024" (hub)
  - "Enterprise Resource Planning Overview" (hub)
  - "Digital Marketing Strategy Framework" (hub)
- Function: Acts as topical authority concentration point

**Spoke Pages (Supporting Content):**
- Deep-dive pages on specific aspects covered by hub
- Linked from hub page (1-2 internal links minimum)
- Each spoke covers 1-2 subtopics in depth
- Examples (for "Complete SEO Guide" hub):
  - "Keyword Research Methodology"
  - "On-Page Optimization Checklist"
  - "Link Building Strategy"
  - "Technical SEO Audit Framework"
- Function: Supports hub authority, captures long-tail keyword traffic

**Topical Cluster Benefits:**
- Hub page ranks for primary topic ("SEO")
- Spokes rank for subtopic keywords ("SEO keyword research", "technical SEO", etc.)
- All internal links feed authority to hub
- Hub authority propagates to spokes
- Semantic coherence signals maximum authority strength
- Result: 3-8 position improvement for hub + 20-40% increase in cluster traffic

## Process

### Phase 1: Current State Analysis & Gap Identification

**Step 1: Semantic Topic Audit**

1. List all major content categories on your site:
   - Example: Digital Marketing Agency with categories:
     - SEO Services (primary)
     - Content Marketing (secondary)
     - PPC Services (secondary)
     - Social Media (secondary)
     - Email Marketing (secondary)
     - Web Design (secondary)

2. Estimate content distribution (% of total pages):
   - SEO: 42%
   - Content Marketing: 18%
   - PPC: 15%
   - Social: 12%
   - Email: 8%
   - Web Design: 5%
   - Total non-focus: 58% (too high)

3. Identify obvious outliers (completely unrelated topics):
   - Examples to flag:
     - Blog posts about "celebrity gossip" on business site
     - Articles about "home improvement" on tech site
     - Real estate content on software company blog
   - These are asteroids requiring removal

4. Estimate current siteFocusScore:
   - High focus signal: >65% content in primary topic
   - Medium focus: 40-65% content in primary topic
   - Low focus: <40% content in primary topic

5. Estimate current siteRadius:
   - Small radius: 1-3 distinct subtopics
   - Medium radius: 4-6 distinct subtopics
   - Large radius: 7+ distinct subtopics

**Step 2: Competitive Topical Authority Analysis**

6. Identify top 3 ranking competitors for primary keyword
7. For each competitor, estimate:
   - Primary topic focus (what % of their content?)
   - Related subtopics covered (semantic clusters)
   - Content depth (pages per subtopic)
   - Topical breadth (siteRadius estimate)
8. Calculate competitive topical authority gap:
   - If competitor has 60% SEO content and you have 42% = 18-point focus gap
   - If competitor has 4 clear SEO subtopics and you have 2 = subtopic gap

**Step 3: Target Topical Authority Definition**

9. Define ideal future siteFocusScore:
   - For competitive keywords: 0.65-0.75 focus score
   - Calculate implied content distribution
   - Example: 70% focus score = 70% primary topic content

10. Define ideal future siteRadius:
    - Target range: 0.35-0.50 (balanced focus + breadth)
    - Identify 4-6 core subtopics to develop
    - Quantify target pages per subtopic

11. Identify necessary changes:
    - Content to create (new subtopics)
    - Content to expand (strengthen existing clusters)
    - Content to prune (remove outliers)
    - Content to consolidate (reduce dilution)

### Phase 2: Content Pruning Strategy

**Step 4: Identify Low-Value Outlier Content**

12. Audit all content not in primary topic cluster:
    - Use Search Console: Filter by query data
    - Identify pages getting <100 impressions/month from search
    - Look for topics unrelated to core business
    - Flag content with 0-5 internal links (not integrated into site)

13. Categorize content for action:
    - **Category A (Keep - Strategic Value):**
      - Content ranking for money keywords
      - Content with strong traffic (>1,000 visits/month)
      - Content linking to/from primary topic content
      - Action: Strengthen internal linking, integrate into topical cluster

    - **Category B (Integrate - Adjacent Topics):**
      - Content clearly related to primary topic
      - Content with 100-1,000 visits/month
      - Content in semantic neighborhood of core topic
      - Action: Rewrite to increase topical relevance, add internal links to/from hubs

    - **Category C (Redirect - Low Value):**
      - Content completely unrelated to core topic
      - Content with <100 visits/month
      - Content creating outlier effect (far from site embedding)
      - Action: Redirect 301 to most relevant existing page (if any)

    - **Category D (Delete - Harmful):**
      - Thin, low-quality content with no traffic
      - Clear outlier content with negative SEO signals
      - Duplicated content
      - Action: Delete (or 301 redirect to homepage if no similar content)

**Step 5: Pruning Execution**

14. Consolidate thin content into pillar pages:
    - Identify 5-10 thin pages on related subtopic
    - Merge content into single comprehensive pillar
    - Redirect old URLs to pillar page
    - Result: Stronger authority concentration

15. Remove clear outliers:
    - Identify 10-20 pages completely unrelated to core topic
    - Use SEO monitoring to catch ranking boosts from removal
    - Remove in batches (every 2 weeks) to monitor impact
    - Expected result: +2-4 position boosts across rankings 30-60 days post-removal

16. Create content map showing what stays/goes:
    ```
    Topic Cluster          Current Pages    Action         Result
    ─────────────────────────────────────────────────────
    SEO (Primary)          120 pages        Keep + Expand  Focus on strongest 80
    Content Marketing      35 pages         Integrate      Merge into 8-10 pillars
    PPC Advertising        22 pages         Integrate      Reduce to 6-8 core pages
    Social Media           18 pages         Prune 50%      Keep 9 pages only
    Email Marketing        12 pages         Prune 75%      Keep 3 core pages
    Web Design             8 pages          Redirect       Consolidate into 2 pages
    Unrelated Topics       45 pages         Delete/Redirect Delete 80%
    ─────────────────────────────────────────────────────
    Net Result: 260 → 120 pages (54% reduction in outlier content)
    Expected Focus Score: 0.42 → 0.68 (+26 point improvement)
    ```

### Phase 3: Hub-and-Spoke Structure Design

**Step 6: Identify Primary Topic Hubs**

17. Define 4-6 major subtopics that form the core knowledge areas:
    - Example for SEO agency:
      - Hub 1: "Technical SEO" (foundations, site structure, crawlability)
      - Hub 2: "On-Page SEO" (content optimization, entity signals)
      - Hub 3: "Link Building" (backlink strategies, authority building)
      - Hub 4: "Keyword Research" (search intent, topic modeling)
      - Hub 5: "SEO Strategy" (planning, auditing, measurement)

18. For each hub, identify:
    - Target keyword for hub page
    - 5-8 related subtopic keywords (spokes)
    - Estimated pages needed to cover comprehensively (8-15 pages minimum)
    - Current pages in cluster (audit existing pages)
    - Content gaps to fill

**Step 7: Hub Page Creation/Optimization**

19. Create or redesign hub pages to serve as topical authority centers:
    - Hub page structure:
      - H1: Primary topic (e.g., "Complete Technical SEO Guide")
      - 2,500-3,500 word comprehensive overview
      - Sections covering all major subtopics
      - Internal links to 15-25 spoke pages (minimum)
      - Schema markup (Article + FAQPage)

    - Hub page optimization:
      - Target primary topic keyword (high search volume, medium-high difficulty)
      - Write for user intent: comprehensive overview/resource
      - Establish authority: original research, expert perspective
      - Cover 80% of topic breadth (to consolidate authority)

20. Build navigation structure linking hubs:
    - Create "resource hub" or "learning center" page
    - Links all major hubs with brief descriptions
    - Implement hub-to-hub internal linking (cross-topic authority)
    - Result: Clear topical navigation improves semantic coherence

**Step 8: Spoke Page Strategy**

21. Identify/create spoke pages for each hub:
    - Spoke page characteristics:
      - Target long-tail keyword specific to subtopic
      - 1,500-2,500 words covering single aspect in depth
      - Link back to hub page (1-2 links minimum)
      - Link to 2-3 related spokes (build topical network)

    - Example for "Technical SEO" hub:
      - Spoke 1: "XML Sitemap Setup Guide" (target: "XML sitemap")
      - Spoke 2: "Robots.txt Optimization" (target: "robots.txt")
      - Spoke 3: "Site Speed Optimization" (target: "page speed SEO")
      - Spoke 4: "Mobile SEO Guide" (target: "mobile-first indexing")
      - ... continue for 15-20 total spokes

22. Implement spoke-to-hub linking:
    - Each spoke links back to hub (establishes parent relationship)
    - Hub links to all spokes (distributes authority)
    - Spokes link to each other (3-5 related spokes per spoke)
    - Result: Dense topical network, maximum authority concentration

**Step 9: Internal Link Equity Distribution**

23. Optimize internal linking for topical authority:
    - Hub pages should receive 20-30 internal links each:
      - 3-5 from homepage
      - 5-10 from category pages
      - 10-15 from related spoke pages

    - Spoke pages should receive 3-8 internal links:
      - 1-2 from hub page
      - 2-3 from related spokes
      - 1-2 from other site sections

    - Use anchor text that reinforces topical relevance:
      - Avoid over-optimized anchors (focus on branded)
      - Use topic-relevant anchors: "learn about [topic]", "read our [topic] guide"
      - Example: Link to technical SEO hub with anchor "technical SEO guide"

24. Create internal linking priority map:
    - Tier 1 (highest priority): 5-8 money keywords (pages getting external links)
    - Tier 2 (secondary): 15-20 important keywords (hub pages, category pages)
    - Tier 3 (supporting): 50-100 long-tail keywords (spoke pages)
    - Link distribution: 60% of internal links → Tier 1, 30% → Tier 2, 10% → Tier 3

### Phase 4: Topical Content Expansion

**Step 10: Gap Analysis & Content Calendar**

25. For each hub, identify content gaps:
    - Create 4x4 matrix (horizontal = subtopics, vertical = content types):
      - Content types: Guides, Tutorials, Tools, Case Studies, Videos, Infographics
      - Subtopics: Major topics under hub theme
    - Identify cells with no content (gaps)
    - Prioritize gaps by keyword difficulty + search volume

26. Build 12-month content calendar:
    - Q1: Create 8-10 core spoke pages (fill highest-priority gaps)
    - Q2: Expand hubs with multimedia, original research, case studies
    - Q3: Create supporting content (tutorials, tools, templates)
    - Q4: Consolidate, update, optimize existing cluster
    - Goal: 30-50 new pages per hub topic by year-end

**Step 11: Content Coherence Optimization**

27. Ensure semantic coherence across cluster:
    - Core terminology: Define 5-10 core terms for cluster
      - All pages in cluster should define these terms consistently
      - Example: SEO cluster should consistently define "backlink," "domain authority," "relevance"

    - Entity relationships: Document how topics relate
      - Example: "Technical SEO" is prerequisite for "On-Page SEO"
      - Document these relationships in navigation and internal links

    - Subtopic bridges: Create content connecting adjacent topics
      - Example: "How Technical SEO Supports Content Strategy"
      - These pages help Google understand topic relationships

28. Implement schema markup for semantic clarity:
    - BreadcrumbList: Show topic hierarchy (Hub → Spoke relationships)
    - Article schema: Enhance individual page authority signals
    - FAQSchema: Add Q&A structure to hubs for semantic coverage
    - Learn: Improve topical depth signaling

### Phase 5: Monitoring & Optimization

**Step 12: Topical Authority Metrics Tracking**

29. Establish baseline metrics before changes:
    - Current siteFocusScore estimate (can't see directly, but infer from data)
    - Current siteRadius estimate
    - Rankings distribution by topic cluster
    - Organic traffic by topic cluster
    - Internal link equity distribution

30. Track metrics monthly:
    - Rankings for hub page keywords (target: +3-8 positions improvement)
    - Rankings for spoke keywords (target: +1-4 positions improvement)
    - Traffic growth by topic cluster (target: +20-50% annually)
    - Click-through rate changes (improved SERP CTR as authority increases)
    - Engagement metrics (time-on-page, pages/session on cluster pages)

31. Monitor for outlier content creation:
    - Audit new content monthly
    - Check if new pages fall within defined topical scope
    - Flag any pages falling outside siteRadius
    - Remove or integrate offenders immediately

## Output Format

### Topical Authority Strategy Document

**CURRENT STATE ANALYSIS**
```
SITE CONTENT DISTRIBUTION
Topic Cluster              Current Pages    % of Site    Traffic Impact    Assessment
────────────────────────────────────────────────────────────────────────
SEO Services (Primary)     120 pages        42%          68% of traffic    GOOD
Content Marketing          35 pages         12%          12% of traffic    ADEQUATE
PPC/Search Ads             22 pages         8%           8% of traffic     ADEQUATE
Social Media Marketing     18 pages         6%           7% of traffic     WEAK
Email Marketing            12 pages         4%           2% of traffic     WEAK
Web Design Services        8 pages          3%           2% of traffic     OFF-TOPIC
Real Estate Content        8 pages          3%           0% of traffic     OUTLIER
Cryptocurrency Blog        6 pages          2%           0% of traffic     OUTLIER
────────────────────────────────────────────────────────────────────────
TOTALS                     229 pages        100%         99% of traffic

FOCUS SCORE ANALYSIS
├─ Current siteFocusScore: 0.42 (LOW - very diversified)
├─ Ideal siteFocusScore: 0.70 (HIGH - focused specialization)
├─ Gap: -0.28 (Significant focus dilution)
├─ Primary Topic Coverage: Only 42% (should be 65-75%)
├─ Outlier Content: 28 pages (12% of site hurting trustworthiness)
└─ Assessment: SIGNIFICANT OPPORTUNITY for focus improvement

SITE RADIUS ANALYSIS
├─ Current Estimate: 0.68 (LARGE - broad coverage)
├─ Ideal Range: 0.35-0.50 (balanced)
├─ Primary Subtopics: 6 defined areas
├─ Adjacent Topics: Web design, real estate, crypto (not adjacent)
└─ Assessment: Too broad, includes unrelated topics

SEMANTIC COHERENCE ISSUES
├─ Clear Off-Topic Clusters:
│  ├─ Real Estate (8 pages, 0% traffic) - DELETE
│  ├─ Cryptocurrency (6 pages, 0% traffic) - DELETE
│  ├─ Web Design (8 pages, 2% traffic) - REDIRECT or REPURPOSE
│  └─ Total Outlier Content: 28 pages creating authority dilution
└─ Recommendation: Remove 28 pages (12% of site) creating outlier effect
```

**TARGET STATE & GAP CLOSURE PLAN**
```
12-MONTH TRANSFORMATION ROADMAP

Phase 1: Content Pruning (Months 1-2)
├─ Remove 28 outlier pages (real estate, crypto, unrelated content)
├─ Consolidate 12 weak pages in email/social into 4 core pillars
├─ Redirect 8 web design pages to design-adjacent SEO content
├─ Expected Impact: siteFocusScore 0.42 → 0.58 (+16 point increase)
├─ Expected Ranking Impact: +1-3 positions across primary keywords
└─ Expected Traffic Impact: Neutral to +5% (removing low-value content)

Phase 2: Hub Creation (Months 2-4)
├─ Create 5 major hub pages for primary subtopics:
│  ├─ Hub 1: "Technical SEO Comprehensive Guide"
│  ├─ Hub 2: "On-Page SEO Optimization Framework"
│  ├─ Hub 3: "Link Building Authority Strategy"
│  ├─ Hub 4: "Keyword Research Methodology"
│  └─ Hub 5: "SEO Strategy & Planning"
├─ Each hub: 2,500-3,500 words, internal links to 15-20 spokes
├─ Expected Impact: siteFocusScore 0.58 → 0.65 (+7 point increase)
├─ Expected Ranking Impact: Hub pages +5-8 positions, cluster traffic +15-20%
└─ Timeline: 8-12 weeks to create all 5 hubs

Phase 3: Spoke Expansion (Months 4-8)
├─ Create 60-80 spoke pages filling cluster gaps:
│  ├─ Hub 1 (Technical SEO): 15 spoke pages
│  ├─ Hub 2 (On-Page SEO): 18 spoke pages
│  ├─ Hub 3 (Link Building): 15 spoke pages
│  ├─ Hub 4 (Keyword Research): 12 spoke pages
│  └─ Hub 5 (SEO Strategy): 12 spoke pages
├─ Each spoke: 1,500-2,500 words, links to hub + related spokes
├─ Expected Impact: siteFocusScore 0.65 → 0.72 (+7 point increase)
├─ Expected Ranking Impact: Long-tail keywords +8-15 positions, +35-50% traffic
└─ Timeline: 5 months to create 70 new pages

Phase 4: Integration & Optimization (Months 8-12)
├─ Strengthen internal linking across cluster (add 2-3 links/page average)
├─ Update 120 existing SEO pages to link into new cluster structure
├─ Add multimedia (video, infographics) to top-traffic pages
├─ Create hub-to-hub linking structure
├─ Expected Impact: siteFocusScore 0.72 → 0.75 (+3 point stabilization)
├─ Expected Ranking Impact: +2-5 additional positions from linking optimization
└─ Timeline: 4 months to integrate existing + new content

FINAL STATE (Month 12)
├─ siteFocusScore: 0.75 (HIGH - strong topical authority)
├─ siteRadius: 0.42 (BALANCED - 4-6 focused subtopics)
├─ Total pages: 201 (down from 229, but 100% on-topic)
├─ Content distribution: 85% primary topic, 15% adjacent
├─ Outlier content: <5% (minimal dilution)
├─ Expected ranking improvement: +8-15 positions for target keywords
├─ Expected traffic improvement: +40-65% annual organic traffic
└─ Time investment: 400-500 hours (content creation + optimization)
```

**HUB-AND-SPOKE STRUCTURE BLUEPRINT**

```
PRIMARY HUB: "Technical SEO Comprehensive Guide" (2,800 words)
├─ Internal links: 18 spoke pages
├─ Inbound links: 25 internal links from site
├─ Target keyword: "technical SEO" (2,100 search volume, 45 difficulty)
├─ Expected ranking: Position 4-7 (from current position 12)
│
├─ SPOKE 1: "XML Sitemap Setup & Optimization" (2,000 words)
│  ├─ Target keyword: "XML sitemap" (4,200 searches, 28 difficulty)
│  ├─ Current rank: 8 → Target: 3-5
│  ├─ Inbound links: Hub + 2 related spokes
│  └─ Traffic potential: 45 visits/month → 180 visits/month
│
├─ SPOKE 2: "Robots.txt Optimization Guide" (1,800 words)
│  ├─ Target keyword: "robots.txt" (3,100 searches, 22 difficulty)
│  ├─ Current rank: 15 → Target: 5-8
│  ├─ Traffic potential: 12 visits/month → 60 visits/month
│  └─ Inbound links: Hub + 2 related spokes
│
├─ SPOKE 3: "Core Web Vitals Optimization" (2,200 words)
│  ├─ Target keyword: "Core Web Vitals" (18,000 searches, 64 difficulty)
│  ├─ Current rank: 42 → Target: 12-18 (challenging, high difficulty)
│  ├─ Traffic potential: 0 visits/month → 25 visits/month (long-term)
│  └─ Inbound links: Hub + 3 related spokes
│
├─ SPOKE 4: "Site Speed Optimization" (2,400 words)
│  ├─ Target keyword: "page speed optimization" (2,200 searches, 38 difficulty)
│  ├─ Current rank: 18 → Target: 6-10
│  ├─ Traffic potential: 15 visits/month → 85 visits/month
│  └─ Inbound links: Hub + Core Web Vitals spoke + Site Architecture spoke
│
├─ SPOKE 5: "Site Architecture & Internal Linking" (2,300 words)
│  ├─ Target keyword: "site architecture SEO" (1,200 searches, 34 difficulty)
│  ├─ Current rank: None (new content) → Target: 6-10
│  ├─ Traffic potential: 0 visits/month → 50 visits/month
│  └─ Inbound links: Hub + 3 related spokes
│
└─ [Continue for 13 additional spokes: Crawl budget, Canonicalization, Mobile rendering, Structured data, IndexStatus, etc.]

TOTAL CLUSTER TRAFFIC OPPORTUNITY
├─ Hub page (Technical SEO): 180 → 520 visits/month
├─ 18 Spoke pages: Combined 890 visits/month
├─ Cross-linking bonus: +15% traffic boost from topical relevance
├─ TOTAL: 1,090 visits/month (60% increase from current state)
└─ Timeline to full traffic potential: 6-9 months post-publication
```

**CONTENT CONSOLIDATION MATRIX**

```
Action          Pages   Topic                    Strategy
────────────────────────────────────────────────────────
DELETE          8       Real Estate Articles     Remove 301 redirects only
DELETE          6       Cryptocurrency Content  No audience on business site
REDIRECT        8       Web Design Services     Redirect to main services page
CONSOLIDATE     4       Email Marketing         Merge 12 pages → 4 core pillars
INTEGRATE       5       Social Media Marketing  Merge with Content Marketing hub
KEEP + EXPAND   120     SEO Services            Expand into 80-page cluster
────────────────────────────────────────────────────────
TOTALS          151                             Result: Focus score 0.42 → 0.72
```

**TOPICAL AUTHORITY SCORECARD**

```
Metric                              Current    Target    Timeline
──────────────────────────────────────────────────────
siteFocusScore                      0.42       0.72      12 months
siteRadius                          0.68       0.42      12 months
Primary Topic Content %             42%        85%       12 months
Hub Pages                           0          5         4 months
Spoke Pages (focused topics)        8          70        8 months
Internal Links to Hub Pages         8          25        8 months
Avg Pages per Subtopic              20         14        Ongoing
Outlier Content %                   12%        2%        2 months
Ranking Position (Hub Keywords)     12-18      4-8       9 months
Traffic (Topic Cluster)             2,100/mo   3,400/mo  12 months
──────────────────────────────────────────────────────
Overall Authority Grade             C+         A-        12 months
```

**CONTENT GAP ANALYSIS TABLE**

```
Hub Topic          Current    Guides    Tutorials    Tools    Videos    Graphics    Gap Count
─────────────────────────────────────────────────────────────────────────────────
Technical SEO      12 pages   2         3            1        0         0           7 gaps
On-Page SEO        18 pages   3         5            2        1         1           2 gaps
Link Building      15 pages   2         4            0        1         0           3 gaps
Keyword Research   8 pages    1         2            1        0         0           4 gaps
SEO Strategy       6 pages    1         1            0        0         0           5 gaps
─────────────────────────────────────────────────────────────────────────
TOTAL GAPS                                                                        21 gaps
Priority creation: Fill 21 gaps over 6 months (3-4 content pieces/month)
```

## Key Performance Indicators to Track Monthly

- **SiteFocusScore Estimate:** Track % of content in primary topic (target: increase 2-3% monthly)
- **SiteRadius Trajectory:** Monitor semantic breadth of content (target: decrease 0.02-0.04 quarterly)
- **Hub Page Rankings:** Position changes for hub target keywords (target: +1-2 position/month)
- **Spoke Page Rankings:** Average ranking change across spoke keywords (target: +2-4 positions quarterly)
- **Cluster Traffic:** Organic traffic from topic cluster (target: +5-15% monthly during expansion phase)
- **Internal Linking Ratio:** % of internal links pointing to hub pages (target: 20-30% of all internal links)
- **Outlier Content Decay:** Traffic from off-topic pages (should decrease monthly as removed)
- **Topic Coverage Expansion:** New pages published in cluster (target: 5-10 pages/month during Phase 2-3)

---

*Framework based on Google Content Warehouse ranking signals: site2vecEmbedding, siteFocusScore, siteRadius, and the "outlier effect" penalty for off-topic content. Structure aligns with semantic comprehensiveness and topical coherence factors in Google's ranking algorithm.*

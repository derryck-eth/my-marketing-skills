# Link Building Strategy

## Purpose
Build a sophisticated link acquisition strategy based on Google's Content Warehouse documentation of the ranking pipeline. This framework reveals how Google evaluates link quality (through TotalClicks), organizes link value into three distinct types (low/medium/high quality), and uses siteAuthority as a primary ranking signal. The goal is to systematically acquire fresh, high-quality links that compound into long-term domain authority while understanding the exact mechanisms Google uses to assign link credit.

## When to Use
- Launching a comprehensive authority-building campaign for new or established domains
- Competitive keyword targeting where authority gap is primary ranking obstacle
- Scaling an existing link building operation with better prioritization
- Recovering from algorithm updates that reduced domain visibility
- Building initial authority for new product lines or business expansions
- Diagnosing authority weakness as a ranking blocker in audit process
- Planning annual link acquisition budget and resource allocation

## Core Frameworks

### Google's Link Quality Classification System

Google classifies links into three tiers based on a metric called TotalClicks—essentially the cumulative click authority of the referring domain.

**LOW-QUALITY LINKS (TotalClicks: <100)**
These are links from domains with minimal user engagement:
- Small niche blogs with <100 monthly users
- New domains (less than 6 months old)
- Expired domain networks with redirection only
- Private blog networks (PBN) without organic traffic
- Forum signatures and automated placements
- Comment spam and unmoderated links
- Directory submissions without editorial review

Impact: Minimal positive impact, potential negative effect if volume becomes suspicious. Google filters or ignores most links in this tier.

**MEDIUM-QUALITY LINKS (TotalClicks: 100-5,000)**
These are standard editorial links from established domains with moderate authority:
- Industry blogs with 5,000-50,000 monthly users
- Local business directories (Google My Business, Yelp)
- Industry association websites
- Publication guest post opportunities
- Resource list inclusions (relevant industry compilations)
- Review and rating sites with organic traffic
- Educational institution websites (colleges, universities)
- Government agency links
- Social sharing from pages with moderate reach

Impact: Meaningful ranking boost (+2-5 positions per quality link in competitive categories). Most sustainable link building efforts target this tier.

**HIGH-QUALITY LINKS (TotalClicks: >5,000)**
These are links from major authority domains with substantial user engagement:
- Major news publications (NY Times, Forbes, TechCrunch, etc.)
- Established industry leaders (sites with 100,000+ monthly users)
- Major university and research institution websites
- Government agency main pages (not subpages)
- Wikipedia links (extremely high authority, limited accessibility)
- Major marketplace platforms (Amazon, Shopify ecosystem)
- Established media outlets with multi-million monthly users
- Industry-leading SaaS platforms and tools
- Fortune 500 company domains and brand websites

Impact: Substantial ranking leverage (+5-15 positions per link depending on keyword difficulty). Typically achievable only through exceptional content, PR relationships, or earned media coverage.

### The Trinity of Authority Framework

Google's siteAuthority signal comprises three interrelated components:

**Component 1: SiteAuthority**
The aggregate authority score of your entire domain derived from link profile analysis. This is a single number (0-100 scale conceptually) that represents overall domain trust.

Calculation factors:
- Number of referring domains (not total links; unique domain sources)
- Quality distribution of referring domains (percentage of high/medium/low-quality links)
- Topical relevance of referring domains (links from topically related domains = higher weight)
- Age of link profile (mature link profiles with consistent growth signal authority)
- Link velocity (recent link acquisition patterns; rapid growth can signal manipulation)
- Brand authority signals (branded search volume, direct traffic, mentions)

Optimization approach:
- Target 40-60 high-authority domain links in primary category
- Maintain 3:1 ratio of medium:low quality links (minimize low-quality link percentage)
- Focus on topically relevant sources (links from sites in your industry category)
- Spread link acquisition over 12-18 month periods (avoid clustering that triggers spam signals)
- Establish brand as recognizable entity in your industry

**Component 2: Homepage PageRank**
The specific authority assigned to your domain's homepage, which propagates throughout the site. This is a critical leverage point because PageRank from the homepage distributes to all internal pages via internal linking.

How it works:
- Homepage receives inbound links directly (domain authority links)
- Homepage distributes PageRank to internal pages via internal linking structure
- Pages linked from homepage receive more PageRank than pages deeper in site
- Pages with more internal links receive more PageRank

Optimization approach:
- Acquire links pointing to homepage (not content pages) for maximum distribution
- Organize internal linking so key money pages receive 3-5 internal links minimum
- Create hub pages with 15-25 internal outbound links (act as PageRank distribution hubs)
- Monitor internal link flow to ensure authority distribution to priority pages
- Consider homepage restructure if key pages buried 4+ clicks deep

**Component 3: PageRank-NearestSeeds**
This is a sophisticated signal measuring the "proximity" of pages to high-authority reference points. Pages closer to authority-bearing pages receive more ranking boost.

Distance calculation:
- Tier 0: Direct recipients of external links (maximum authority transfer)
- Tier 1: Pages linked from Tier 0 pages (90% authority transfer)
- Tier 2: Pages linked from Tier 1 pages (70% authority transfer)
- Tier 3: Pages linked from Tier 2 pages (50% authority transfer)
- Tier 4+: Deeper pages (progressively weaker authority transfer)

Optimization approach:
- Prioritize internal linking strategy so target pages sit at Tier 0 or 1
- Create strategic hub pages at Tier 0 that funnel authority to money pages
- Use breadcrumb navigation and category pages as Tier 1 authority intermediaries
- Minimize depth of target pages (no more than 3 clicks from homepage)
- Consider external linking topology in deciding where to point acquired links

### Link Quality Assessment: TotalClicks Methodology

TotalClicks represents the total click authority of a referring domain—essentially Google's measurement of how many users find that domain valuable enough to click on its links.

Proxies for measuring TotalClicks:
- Organic search traffic volume (primary proxy; available via SEMrush, Ahrefs, Domain Authority estimate)
- Domain Authority score (proprietary metric correlating with PageRank proxy)
- Monthly user volume (estimated from Similarweb, audience measurement tools)
- Search visibility metric (volume of keywords ranking and positions)
- Brand search volume (indicates direct user recognition)

Classification in practice:
```
TotalClicks Range     Proxy Indicators                    Link Quality
────────────────────────────────────────────────────────────────────
<100                 DA <20, <500/mo organic traffic      LOW
100-5,000            DA 20-45, 500-50K/mo traffic         MEDIUM
>5,000               DA 45+, 50K+/mo organic traffic      HIGH
```

When evaluating potential link opportunities:
- Look up domain in SEMrush or Ahrefs to check organic traffic estimate
- If traffic is <500/month, it's likely low-quality
- If traffic is 500-50K/month, it's likely medium-quality
- If traffic is >50K/month, it's likely high-quality

### The SimplifiedAnchor System

Google's SimplifiedAnchor system categorizes anchor text to evaluate whether links appear natural or over-optimized:

**Anchor Categories:**
1. **Branded:** Domain name or brand terms ("Visit Acme Corp", "Learn more on acmecorp.com")
2. **Exact Match:** Primary target keyword verbatim ("best SEO tools", "link building")
3. **Partial Match:** Keyword with modifiers ("the best SEO tools", "link building strategy")
4. **Generic:** Non-keyword terms ("click here", "read more", "visit site")
5. **URL:** Raw URL as anchor ("acmecorp.com")

Natural distribution (optimal):
- Branded: 40-50%
- Generic: 20-30%
- Partial match: 15-25%
- Exact match: 5-10%
- URL: 5-10%

Red flags (suggest over-optimization or manipulation):
- Exact match >15% of anchor text profile
- Single keyword exceeding 25% of total anchors
- Sudden shift in anchor text distribution (velocity increase)
- Misalignment between anchor text and page content (e.g., "plumbing services" linking to tech article)

### AnchorSpamPenalizer System

Google's AnchorSpamPenalizer detects and penalizes manipulated anchor text patterns that violate natural linking norms.

Detection signals:
- **phraseRate:** Percentage of links using exact same anchor phrase
  - >20% of links from same anchor = moderate penalty risk
  - >35% of links from same anchor = high penalty risk

- **phraseDays:** Concentration of anchor text variation over time
  - If same anchor used consistently across 200+ days = signal of deliberate optimization
  - If anchor varies frequently = natural pattern

- **phraseFraction:** Ratio of top anchor phrases to total anchor text diversity
  - Natural pattern: 100+ unique anchors with none exceeding 20%
  - Spam pattern: <30 unique anchors with top anchor >40%

Safe link building practices:
- Maintain 50+ unique anchor text variations across backlink profile
- No single anchor phrase should exceed 15-20% of total links
- Vary anchor text over 12+ month periods to avoid temporal clustering
- Ensure anchor text relevance (links to article about "SEO" should use SEO-related anchors)

### FreshnessTwiddler for Link Freshness

FreshnessTwiddler applies boosts or penalties to links based on their age and acquisition patterns:

**Fresh Link Boost (+3-8 position boost temporary):**
- Links less than 30 days old receive temporary ranking boost
- Links 30-90 days old receive moderate boost
- Boost decays gradually from 90-180 days
- By day 365, fresh link boost has fully expired

Implications:
- Fresh links provide temporary visibility increase (good for initial ranking window)
- Not a substitute for sustained, high-quality links
- Plan link acquisition to create rolling acquisition waves quarterly
- Don't expect permanent position improvement from fresh links alone

**Stale Link Penalty (slight negative adjustment):**
- Links older than 2 years may receive slight penalty if no new links acquired
- Indicates potential link rot or abandoned directory submissions
- Encourages active link maintenance and disavow of broken links

Best practice:
- Aim for 5-10 new quality links monthly (create rolling acquisition pattern)
- Quarterly link acceleration campaigns capture fresh link boost multiple times yearly
- Annual link audit to disavow stale, low-quality links
- Distribute link acquisition across 12 months (avoid concentrated bursts)

## Process

### Phase 1: Authority Gap Analysis & Competitive Benchmarking

**Step 1: Current Authority Assessment**
1. Measure own SiteAuthority:
   - Check Search Console: Analyze referring domains in "Links" report
   - Count unique referring domains (not total link count)
   - Estimate TotalClicks proxy using organic traffic (SEMrush/Ahrefs)
   - Note: Total link count is less important than referring domain quality

2. Profile current link sources:
   - Categorize existing links by quality tier (low/medium/high)
   - Calculate distribution: what % are high-quality? Medium? Low?
   - Identify topical relevance of current referring domains
   - Flag any obvious spam links for disavowal

3. Analyze anchor text profile:
   - Pull all anchor text from Search Console
   - Calculate percentage of branded, exact match, partial, generic, URL anchors
   - Identify any anchor text concentrations >20%
   - Flag potential AnchorSpamPenalizer risk areas

**Step 2: Competitor Authority Analysis**
4. Identify top 3 competitors (sites ranking for primary keywords)
5. For each competitor, analyze:
   - Number of referring domains (use Ahrefs, SEMrush, Moz)
   - Estimated Domain Authority score
   - Distribution of link quality (what % from high/medium/low sources)
   - Major referring domains (which 10-20 sites drive most authority)
   - Anchor text distribution and concentration
   - Link velocity (are they acquiring links regularly or stagnant)

6. Calculate authority gap:
   - If competitor has 120 referring domains and you have 40 = 80-domain gap
   - If competitor has 30% high-quality links and you have 10% = quality gap
   - Prioritize: Usually fixing quality distribution has faster payoff than raw link count

**Step 3: Topical Relevance Mapping**
7. Define primary and secondary business categories:
   - Example: Digital Marketing Agency (primary), SEO Services (secondary), Content Writing (secondary)
8. Identify topical link opportunities:
   - Blogs in your industry niche
   - Industry directories and resource lists
   - Association and membership websites
   - Publications and magazines covering your industry
   - Educational institutions teaching your subject
9. Create "link prospect database" with 100+ potential sources organized by:
   - Topical relevance (primary category, secondary, tangential)
   - Current authority estimate
   - Link acquisition difficulty (easy, medium, hard)

### Phase 2: Link Acquisition Strategy

**Step 4: Three-Tier Link Plan**

Determine ideal link profile mix based on competitive category:

For HIGH-DIFFICULTY keywords (>60 difficulty):
- Target: 50-60 high-quality domain links
- Target: 80-100 medium-quality domain links
- Limit: <20 low-quality domain links
- Focus: 70% effort on high-quality acquisition, 25% on medium, 5% on low

For MEDIUM-DIFFICULTY keywords (30-60 difficulty):
- Target: 30-40 high-quality domain links
- Target: 60-80 medium-quality domain links
- Limit: <30 low-quality domain links
- Focus: 50% effort on high-quality, 40% on medium, 10% on low

For LOW-DIFFICULTY keywords (<30 difficulty):
- Target: 15-20 high-quality domain links
- Target: 40-50 medium-quality domain links
- Limit: Low-quality links less critical
- Focus: 30% effort on high-quality, 60% on medium, 10% on low

**Step 5: High-Quality Link Acquisition (10% of effort, 40% of value)**

Difficulty: Hard (requires PR, earned media, or exceptional content)
Timeline: 3-12 months per link

Strategies:
1. **Digital PR & Newsjacking**
   - Monitor trending topics in your industry
   - Create expert commentary on breaking news
   - Pitch to journalists via HARO (Help A Reporter Out)
   - Build relationships with journalists covering your space
   - Typical result: 1 high-quality link per 5-10 successful pitches

2. **Industry Award Submissions**
   - Enter relevant industry competitions and awards
   - Winning entries often generate press coverage with links
   - Example: "Best SEO Agency 2024" wins = coverage in industry blogs
   - Typical result: 2-4 high-quality links per award win

3. **Speaking & Conference Presence**
   - Speak at industry conferences (generates speaker bio links)
   - Sponsor events (generates sponsorship page links)
   - Typical result: 1-2 medium/high-quality links per engagement

4. **Original Research & Studies**
   - Conduct original survey or data analysis
   - Publish findings (generate link-worthy asset)
   - Pitch results to journalists and bloggers
   - Typical result: 5-15 high-quality links per viral research piece

5. **Thought Leadership Content**
   - Write regularly featured opinion pieces
   - Contribute to industry publications (Forbes, Harvard Business Review)
   - Build recognition as expert in your niche
   - Typical result: 1 high-quality link per 3-5 published pieces

**Step 6: Medium-Quality Link Acquisition (40% of effort, 45% of value)**

Difficulty: Medium (requires outreach, relationship building, or content)
Timeline: 1-3 months per link

Strategies:
1. **Guest Blogging Campaigns**
   - Identify 50+ relevant industry blogs (DA 25+)
   - Create list of 3-5 guest post topic ideas
   - Pitch personalized guest post proposals
   - Typical result: 1 published guest post per 5-8 pitches
   - Success rate optimization: Higher acceptance if you've already read their content

2. **Resource List & Roundup Inclusion**
   - Find "best tools" or "top resources" articles in your space
   - Email curator with 2-3 sentence pitch
   - Typical result: 1 inclusion per 10-15 pitches
   - Easiest tier of medium-quality links to acquire

3. **Broken Link Building**
   - Find sites with broken outbound links in your topic area
   - Create similar content to dead resource
   - Pitch replacement to site owner (they benefit from fixing broken link)
   - Typical result: 1 successful link per 20-30 prospect outreach

4. **Press Release Distribution**
   - Announce company milestones, new products, partnerships
   - Distribute via PR services (PRWeb, eReleasesonline)
   - Generate media coverage with backlinks
   - Typical result: 2-4 medium-quality links per strategic press release

5. **Partnership & Sponsorship Agreements**
   - Partner with complementary service providers
   - Cross-link partnership pages
   - Sponsor local events (get sponsor page link)
   - Typical result: 1-2 links per partnership agreement

**Step 7: Low-Quality Link Acquisition (10% of effort, 15% of value)**

Difficulty: Easy (often automated)
Timeline: Immediate

Strategies (with caution):
1. **Industry Directory Submissions**
   - Submit to Google My Business (local link)
   - Submit to industry-specific directories (topically relevant)
   - Avoid 1000+ directory submission services (many are low-quality)
   - Typical result: 1 link per directory submission

2. **Local Business Listings**
   - Claim all major local directories (Yelp, Chamber of Commerce, etc.)
   - Typical result: 5-10 local authority links

3. **Community Participation**
   - Answer questions on industry forums (Quora, Reddit, industry forums)
   - Include site URL in profile or signature (less valuable than editorial links)
   - Typical result: Links generated from regular activity, not directly assignable

**Caution:** Low-quality links should be opportunistic, not primary strategy. Excessive low-quality link acquisition triggers AnchorSpamPenalizer.

### Phase 3: Anchor Text Strategy & Management

**Step 8: Anchor Text Planning**

For each link opportunity, plan anchor text distribution:

If targeting keyword "SEO software":
- 40-50% of links: Branded ("Acme Corp", "Visit acmecorp.com")
- 5-10% of links: Exact match ("SEO software")
- 15-25% of links: Partial match ("best SEO software", "SEO software solutions")
- 20-30% of links: Generic ("read more", "learn more", "click here")
- 5-10% of links: URL ("acmecorp.com")

**Step 9: Diversification Rules**

Ensure no single anchor phrase exceeds 15-20% of total link profile:
- If building 100 links, no anchor should be used >15 times
- Maintain 50+ unique anchor text variations
- Rotate anchor text variations for similar concepts:
  - "SEO software", "SEO tools", "SEO platform" (different anchors for same topic)
  - "Digital marketing agency", "marketing agency", "marketing firm" (variations)

**Step 10: Anchor Text Velocity Monitoring**

Track anchor text concentration over time:
- Monthly: No single anchor should spike >20% of monthly acquisitions
- Quarterly: Distribution should remain balanced across variations
- Annually: Review anchor profile for any suspicious concentration patterns

If suspicious pattern detected (same anchor 30% of links from recent acquisitions):
- Immediately pause that anchor text
- Shift outreach to different anchor variations
- Increase generic and branded anchor usage temporarily
- Reduce link acquisition velocity (spread out over longer timeline)

### Phase 4: Homepage PageRank & Internal Link Strategy

**Step 11: Homepage Link Targeting**

Direct 80% of acquired external links toward homepage (for maximum PageRank distribution):
- Homepage receives all direct inbound links
- Homepage distributes PageRank to internal pages via internal linking
- More efficient than scattering links across multiple pages

Exceptions: If targeting a specific page for ranking (new product page, hub page):
- Direct 20-30% of links toward that page
- Supplement with internal links from homepage and category pages

**Step 12: Internal Link Optimization**

Create PageRank distribution strategy:
1. Identify 5-10 "money pages" (highest-value pages you want to rank for)
2. Ensure each money page receives:
   - Minimum 3 internal links from high-authority pages
   - At least 1 link from homepage
   - Contextual links from topically related pages
3. Create "hub pages" for major topics:
   - Hub page receives 3-5 external links
   - Hub page links to 15-25 related content pages
   - Transfers PageRank through the network to all linked pages
4. Monitor link flow:
   - Highest authority pages = homepage and major hub pages
   - Medium authority pages = category/pillar pages
   - Lower authority pages = supporting/detailed content pages

**Step 13: PageRank-NearestSeeds Optimization**

Structure internal linking to minimize distance to authority sources:
- Tier 0 (direct external links): Homepage, major hub pages (3-5 pages)
- Tier 1 (linked from Tier 0): Category pages, pillar pages (8-12 pages)
- Tier 2 (linked from Tier 1): Supporting content, subcategories (30-50 pages)
- Tier 3 (linked from Tier 2): Detailed articles, specifications (100+ pages)

Target pages should sit at Tier 0-1, not Tier 3+. If key page is buried:
- Add direct internal link from homepage
- Or restructure category hierarchy to shorten path

### Phase 5: Link Freshness & Ongoing Management

**Step 14: Fresh Link Acquisition Schedule**

Plan quarterly link acquisition waves to trigger fresh link boosts:
- Q1 (Jan-Mar): Acquire 5-10 high-quality, 15-20 medium-quality links
- Q2 (Apr-Jun): Repeat acquisition cycle
- Q3 (Jul-Sep): Repeat acquisition cycle
- Q4 (Oct-Dec): Repeat acquisition cycle

Result: Every quarter, fresh links trigger boost to visibility (+3-8 temporary position boost).

**Step 15: Link Audit & Maintenance**

Monthly:
- Monitor for broken links (links where referring site removed link)
- Check for redirects or site changes that affected link validity
- Audit new links for quality assessment
- Track anchor text acquisition patterns for any red flags

Quarterly:
- Comprehensive link profile analysis
- Identify lowest-quality links for potential disavowal
- Assess anchor text distribution for concentration issues
- Review link velocity for suspicious patterns

Annually:
- Complete link audit comparing current profile to 12 months prior
- Benchmark against competitors
- Adjust 12-month strategy based on results
- Plan link goals for coming year based on ranking targets

**Step 16: Disavowal Strategy**

Disavow (tell Google to ignore) links that:
- Come from obvious spam/PBN sources
- Show extreme anchor text concentration for single keywords
- Come from unrelated industries (e.g., casino links pointing to B2B SaaS)
- Resulted from negative SEO attacks or hacks
- Violate Google Webmaster Guidelines

Be conservative with disavowals—only disavow links clearly harmful. Most links, even mediocre ones, are neutral rather than actively harmful.

## Output Format

### Link Building Strategy Document

**AUTHORITY GAP ANALYSIS**
```
Current State:
├─ Your Domain: 45 referring domains, DA 32, 2,100 organic monthly traffic
├─ Competitor #1: 120 referring domains, DA 48, 8,200 organic monthly traffic
├─ Competitor #2: 95 referring domains, DA 44, 6,800 organic monthly traffic
├─ Gap Analysis: -75 domains vs. leader, -16 DA points
│
Target State (12 months):
├─ Your Domain (Projected): 105 referring domains, DA 40, 4,100 organic traffic
├─ Gap Closure: -15 domains vs. leader (87% closed)
└─ Timeline: 18-month aggressive acquisition achieves parity
```

**LINK TIER DISTRIBUTION STRATEGY**
```
Target Keyword Category: High-Difficulty (62 difficulty score)
Recommended Link Profile: 50 high-quality + 85 medium-quality + 15 low-quality links

Current: 8 high-quality + 25 medium-quality + 12 low-quality = 45 total domains

12-Month Acquisition Plan:
├─ High-Quality Acquisition: 42 new domains (3-4/month)
│  └─ Strategy: Digital PR, awards, thought leadership
│  └─ Difficulty: Hard | Timeline: 3-12 months per link
│  └─ Expected Success Rate: 1 per 5-8 outreach attempts
│
├─ Medium-Quality Acquisition: 60 new domains (5/month)
│  └─ Strategy: Guest blogging, partnerships, resources lists
│  └─ Difficulty: Medium | Timeline: 1-3 months per link
│  └─ Expected Success Rate: 1 per 4-5 outreach attempts
│
└─ Low-Quality Acquisition: 3 new domains (opportunistic)
   └─ Strategy: Directory submissions, local listings
   └─ Difficulty: Easy | Timeline: Immediate
   └─ Expected Success Rate: 95%+

Result: 12-month acquisition achieves 47 high-quality + 85 medium + 15 low = 147 total domains
Status: EXCEEDS target profile, achieves competitive parity
```

**QUARTERLY ACQUISITION ROADMAP**
```
Q1 (January-March): Foundation Phase
├─ High-Quality Targets: 3 links (Digital PR campaigns, award submissions)
├─ Medium-Quality Targets: 12 links (Guest posts, broken link building)
├─ Low-Quality Targets: 1 link (Directory submission)
├─ Fresh Link Boost: Expected +4-6 position improvement temporary
├─ Focus: Build relationships, identify best-performing channels
└─ Success Metrics: 15+ total links acquired, anchor text distribution balanced

Q2 (April-June): Acceleration Phase
├─ High-Quality Targets: 4 links (Thought leadership content, speaking)
├─ Medium-Quality Targets: 15 links (Expanded guest post campaign)
├─ Low-Quality Targets: 1 link (Partnership sponsorship)
├─ Fresh Link Boost: Expected +5-7 position improvement temporary
├─ Focus: Increase outreach volume, optimize for highest success channels
└─ Success Metrics: 20+ total links acquired, build momentum

Q3 (July-September): Optimization Phase
├─ High-Quality Targets: 4 links (Research release, PR momentum)
├─ Medium-Quality Targets: 18 links (Resource list dominance, new partnerships)
├─ Low-Quality Targets: 1 link
├─ Fresh Link Boost: Expected +5-8 position improvement temporary
├─ Focus: Double down on working channels, eliminate low-performing tactics
└─ Success Metrics: 23+ total links acquired, peak velocity

Q4 (October-December): Consolidation Phase
├─ High-Quality Targets: 3 links (End-of-year awards, year-in-review content)
├─ Medium-Quality Targets: 15 links (Holiday partnerships, year-end features)
├─ Low-Quality Targets: 1 link
├─ Fresh Link Boost: Expected +4-6 position improvement temporary
├─ Focus: Consolidate gains, plan next year, ensure sustainability
└─ Success Metrics: 19+ total links acquired, profile quality optimized
```

**ANCHOR TEXT DISTRIBUTION PLAN**
```
Primary Target Keyword: "SEO software"
Secondary Keywords: "SEO tools", "SEO platform", "rank tracking software"

OPTIMAL ANCHOR DISTRIBUTION (for 105 total links):
├─ Branded (40-50%): 45 links
│  ├─ "Acme Corp" (15 links)
│  ├─ "Visit Acme" (12 links)
│  ├─ "Visit acmecorp.com" (10 links)
│  └─ "Acme SEO Tool" (8 links)
│
├─ Exact Match (5-10%): 7 links
│  └─ "SEO software" (7 links, no single anchor >7%)
│
├─ Partial Match (15-25%): 20 links
│  ├─ "Best SEO software" (5 links)
│  ├─ "SEO software for agencies" (4 links)
│  ├─ "Top SEO tools" (5 links)
│  ├─ "SEO platform for marketing" (3 links)
│  └─ "Rank tracking tools" (3 links)
│
├─ Generic (20-30%): 26 links
│  ├─ "Read more" (8 links)
│  ├─ "Learn more" (8 links)
│  ├─ "Click here" (5 links)
│  ├─ "Here" (3 links)
│  └─ "Check it out" (2 links)
│
└─ URL (5-10%): 7 links
   └─ "acmecorp.com" (7 links)

SAFETY CHECKS:
├─ No single anchor >9% of total (highest = 7 links / 105 = 6.7%)
├─ Exact match <10% (have 7 links / 105 = 6.7%)
├─ Branded 40%+ (have 45 links / 105 = 42.9%)
└─ Anchor text concentration: LOW RISK ✓
```

**COMPETITOR LINK ANALYSIS TABLE**
```
Metric                    Your Domain    Competitor #1    Competitor #2    Benchmark
────────────────────────────────────────────────────────────────────────
Referring Domains              45            120              95             100+
Domain Authority               32             48              44              40+
Avg. Link Quality (%)          35%            62%             58%             55%+
High-Quality Links              8             45              38             30+
Medium-Quality Links           25             62              48             40+
Low-Quality Links              12             13               9              <15
Top Anchor Text (%)           18%            12%              14%             <15%
Branded Anchor (%)            38%            47%              45%             40%+
Fresh Links/Month              2.1            5.8              4.2             4+
────────────────────────────────────────────────────────────────────────
Overall Authority Gap:        SIGNIFICANT    LEADER           STRONG          Your growth trajectory
Recommendation:               AGGRESSIVE     (maintain)       (challenge)     needed 12+ months
```

**OUTREACH CAMPAIGN TEMPLATES**

*High-Quality Link Template (Digital PR / Guest Post):*
```
Subject: [Your Expert] Commentary on [Trending Topic] for [Publication]

Hi [Editor Name],

[Publication] is the leading resource for [industry topic]. We've noticed your recent coverage of [specific article], which resonated with our [audience type].

[Your Company] recently completed a study on [research topic] that extends that conversation. Findings show [key insight]. Would [publication] be interested in [form: guest article, expert commentary, data visualization]?

I can provide:
- 1,500-2,000 word expert analysis (or custom length)
- Original research/data insights
- Actionable takeaways for your audience
- High-resolution graphics/charts

Are you open to collaboration on this topic?

Best,
[Your Name]
```

*Medium-Quality Link Template (Guest Post Pitch):*
```
Subject: Guest Post Pitch: [Specific Topic Matching Their Content]

Hi [Blog Author],

I read your article "[Specific Article Title]" and really appreciated your take on [specific point]. It inspired a deeper exploration of [related subtopic].

I'd love to contribute a guest post to [Blog Name] on "[Guest Post Title]" that:
- Builds on the foundation you've established
- Provides original insights/frameworks [yours provides]
- Serves your audience with [specific value]
- Includes data/examples from [your research/experience]

Would you be interested in reviewing a 1,500-word article on this topic? I can adjust length/focus based on your needs.

Thanks,
[Your Name]
```

**MONTHLY LINK TRACKING DASHBOARD**
```
Month: January 2024

ACQUISITION RESULTS:
├─ High-Quality Links Acquired: 2 of 3 target (67%)
│  ├─ Digital PR coverage (Industry Blog A) - DA 42, strong quality
│  └─ Speaking engagement (Conference Website) - DA 35
│
├─ Medium-Quality Links Acquired: 11 of 12 target (92%)
│  ├─ Guest posts published: 4
│  ├─ Resource list inclusions: 3
│  ├─ Broken link building: 2
│  ├─ Partnership links: 2
│  └─ Total: 11 links
│
└─ Low-Quality Links Acquired: 1 of 1 target (100%)
   └─ Local business directory

ANCHOR TEXT ANALYSIS:
├─ Branded anchors: 48% (healthy)
├─ Exact match: 6% (safe)
├─ Partial match: 19% (healthy)
├─ Generic: 21% (healthy)
├─ URL anchors: 6% (healthy)
├─ Most frequent anchor: 8% (no red flags)
└─ Anchor Distribution: HEALTHY ✓

LINK FRESHNESS BOOST:
├─ Fresh links (<30 days): 14
├─ Moderate freshness (30-90 days): 8
├─ Stale links (>90 days): 23
└─ Expected Position Boost: +4-6 temporary

QUALITY ASSESSMENT:
├─ Average referring domain DA: 34
├─ Average traffic estimate (proxy): 12,400/month
├─ Quality tier distribution: 2 high + 11 medium + 1 low (94% medium+)
├─ Topical relevance: 100% (all links from digital marketing/SEO domains)
└─ Overall Quality: EXCELLENT ✓

VELOCITY & SUSTAINABILITY:
├─ Acquisition pace: 14 links in month 1 (on pace for 168/year)
├─ Success rate (of outreach): High-quality 67%, Medium 92%, Overall 82%
├─ Estimated runway (without new outreach): 2.1 months of fresh boost
└─ Recommendation: Maintain 14-18 links/month for sustained visibility
```

## Key Performance Indicators to Track Monthly

- **Authority Growth:** SiteAuthority score trend (target +0.5-1 point/month)
- **Link Acquisition Velocity:** Links acquired vs. targets for month
- **Link Quality Distribution:** % of links in high/medium/low tiers
- **Anchor Text Concentration:** Single anchor percentage (target <10%)
- **Average Referring Domain Quality:** Domain Authority of new links (target >30)
- **Fresh Link Boost Impact:** Position changes correlated to new links
- **Success Rates by Channel:** Calculate win rate for each outreach channel

---

*Framework based on Google Content Warehouse link ranking signals: siteAuthority, PageRank-NearestSeeds, TotalClicks-based quality classification, SimplifiedAnchor system, AnchorSpamPenalizer detection, and FreshnessTwiddler boost mechanics.*

# Programmatic SEO Skill

## Purpose
Generate and deploy hundreds or thousands of unique, high-quality landing pages at scale using templates, data, and structured content. This skill enables AI agents to identify programmatic SEO opportunities, design templates, source quality data, optimize pages for search intent, implement technical SEO at scale, and manage indexation to capture long-tail keyword volume while maintaining content quality and avoiding thin content penalties.

## When to Use
- Rank for thousands of long-tail keyword variations with limited resources
- Create "integration" pages (SaaS connecting to other tools)
- Generate location-based pages at scale (dentist + city, plumber + neighborhood)
- Build category pages with variations (color + product type, size + category)
- Create comparison/feature pages (competitor A vs. B vs. C variations)
- Monetize niche affiliate sites through high-volume, low-competition queries
- Expand keyword footprint in existing content pillar structure
- Need SEO growth without proportional content team scaling
- Have structured data (product database, location list, integration catalog)
- Want to own "modular" search results (e.g., all "X + Y" combinations)

## Core Frameworks & Knowledge

### Programmatic SEO Opportunity Identification

#### Opportunity Types & Examples
1. **Integration/Tool Pages** (Zapier model)
   - Example: "Zapier + [Tool A]" × 6000+ integrations
   - Structure: How does Zapier integrate with [Tool]? What's the setup process? Use cases?
   - ROI: High (Zapier ranks for 10,000+ long-tail keywords)
   - Difficulty: Medium (requires data + design consistency)

2. **Location Pages** (Multi-location business)
   - Example: "[Service] in [City]," "Best [Service] near [Zip Code]"
   - Structure: Local SEO signals + service description + reviews + CTA
   - ROI: Very High (local searches convert 3x better than national)
   - Difficulty: Easy (simple data structure: service + location)

3. **Product Attribute Pages** (E-commerce)
   - Example: "[Brand] [Color] [Size] [Category]"
   - Structure: Filters applied to product listing page
   - ROI: Medium (long-tail but lower volume individually)
   - Difficulty: Low (leverage existing product database)

4. **Comparison Pages** (SaaS, reviews)
   - Example: "[Tool A] vs. [Tool B]" (all pairwise combinations)
   - Structure: Feature table, pros/cons, use cases, winner
   - ROI: High (high commercial intent, competitive keywords)
   - Difficulty: Medium-High (quality matters, comparison accuracy critical)

5. **Category Variations** (Guides, education)
   - Example: "[Topic] for [Audience Segment]"
   - Structure: Tailored guide + audience-specific examples + resources
   - ROI: Medium (SEO + thought leadership)
   - Difficulty: Medium (need unique angle per variation)

6. **FAQ/Answer Pages** (Question keywords)
   - Example: "How to [verb]?" "What is [term]?" "Why [topic]?"
   - Structure: Direct answer (position zero) + deeper explanation + related questions
   - ROI: Medium (featured snippet opportunity, SERP real estate)
   - Difficulty: Low (AI can generate good first drafts)

### Head Term + Modifier Strategy

The core of programmatic SEO: identify high-volume "head" terms and pair with modifiers to create thousands of long-tail queries.

#### Head Term Selection
- **High Volume**: 1,000+ monthly searches
- **Moderate Competition**: KD 10-30 (not too hard, not too easy)
- **Modular**: Can accept multiple modifier types
- Examples: "integrations," "alternatives," "for [industry]," "[location]"

#### Modifier Categories
1. **Entity Modifiers** (Tools, companies, competitors)
   - "Zapier + [all integrations]"
   - "[Service] + [all cities]"
   - Volume: 1 head term × 100-5,000 entities = 100-5,000 pages

2. **Attribute Modifiers** (Properties, features, types)
   - "[Product] in [color]"
   - "[Service] for [industry]"
   - Volume: 1 head term × 10-50 attributes = 10-50 pages

3. **Intent Modifiers** (User stage, goal, question)
   - "[Topic] for beginners"
   - "[Tool] for [job title]"
   - "[Tool] + [specific use case]"
   - Volume: 1 head term × 5-20 intents = 5-20 pages

4. **Keyword Modifiers** (Synonyms, related terms)
   - "Best [category]" + "Top [category]"
   - "[Feature] vs. [competitor feature]"
   - Volume: 1 head term × 2-10 modifiers = 2-10 pages per entity

#### Volume Calculation
- Total Pages = Head Terms × Modifiers × (Topics or Category Variations)
- Example: 5 head terms × 500 integrations × 1 template = 2,500 pages
- Conservative approach: Don't generate all possible combinations; pick top 50-70% by search volume

### Template Design for Scale

#### Template Requirements
1. **Unique Value**: Every page must offer distinct content, not just variable swaps
   - Bad: "5 [Tool A] Alternatives" copied with [Tool B], [Tool C], etc.
   - Good: "[Tool A] vs. [Tool B]" with feature-by-feature comparison unique to both tools

2. **Standardized Structure**: Consistent skeleton for crawlability, UX, and ranking
   - Intro paragraph (2-3 sentences, keyword-forward)
   - Primary section (problem statement, use case, data)
   - Comparison/feature table (if applicable)
   - Use cases or benefits (tailored to modifier)
   - Secondary section (related info, resources)
   - CTA (aligned with business goal)
   - Related/internal links
   - FAQ section (5-8 questions)
   - Footer CTAs

3. **Variable Injection Points**: Clearly mark where data/modifiers insert
   - `{primary_entity}`, `{secondary_entity}`, `{location}`, `{audience}`
   - Each variable appears 3-5 times naturally (intro, headers, conclusion)

4. **Meta Template**: Title, description, heading hierarchy pre-planned
   - Title: `[Primary Entity] + [Modifier]: [Angle]` (55-60 chars)
   - Meta Description: Value prop + CTA (155-160 chars)
   - H1: Unique, includes primary keyword
   - H2/H3: Section headers, include secondary keywords

#### Template Example: Integration Page
```
<h1>How to Integrate {tool_a} with {tool_b}: Complete Setup Guide</h1>

<p>Connect {tool_a} to {tool_b} in 5 minutes. This guide covers setup,
best practices, and {tool_a}+{tool_b} use cases for {industry_or_role}.</p>

<h2>Why Integrate {tool_a} and {tool_b}?</h2>
<ul>
  <li>{key_benefit_1} with {data_point}</li>
  <li>{key_benefit_2} (Example: {use_case})</li>
  <li>{key_benefit_3} across {metric}</li>
</ul>

<h2>Step-by-Step: {tool_a} to {tool_b} Integration</h2>
<ol>
  <li>Step 1 (screenshot/data point)</li>
  <li>Step 2 (screenshot/data point)</li>
  <li>Step 3 (screenshot/data point)</li>
</ol>

<h2>{tool_a} + {tool_b} Use Cases</h2>
<ul>
  <li>Use Case 1: {persona_or_role}</li>
  <li>Use Case 2: {persona_or_role}</li>
  <li>Use Case 3: {persona_or_role}</li>
</ul>

<h2>FAQ: {tool_a} and {tool_b}</h2>
<p><strong>Can {tool_a} sync with {tool_b} in real-time?</strong></p>
<p>Yes. {data_point}...</p>
```

### Data Sourcing Strategy

#### Quality Data Requirements
1. **Accuracy**: Data must be current, complete, verified
   - Stale data (outdated integrations, closed locations) hurts trust and rankings
   - Missing data (incomplete comparisons, null fields) creates thin content

2. **Completeness**: All variables populated for every page
   - Partial data = incomplete pages = poor UX and no ranking potential
   - Verify 100% coverage before generation

3. **Structuring**: Organized, normalized format (CSV, JSON, database)
   - Easy to template, easy to update, easy to audit for quality

#### Data Sources by Type
1. **Entity Data** (Tools, competitors, locations)
   - Company databases (crunchbase.com, owens.com)
   - Public APIs (Google Places API for locations, app store APIs)
   - Manual research (for top 100-200 entities; crowd-source the rest)
   - Your own data (product catalog, customer list, locations)

2. **Attribute Data** (Features, specs, prices)
   - Web scraping (competitor sites, product pages, legally/ethically)
   - Public data sources (industry databases, government data)
   - Manual research (for top items; AI can infer patterns for long tail)
   - Surveys/research (collect attribute data from users)

3. **Metadata** (Image URLs, descriptions, links)
   - Extract from company homepages, Wikipedia, Crunchbase
   - Use AI to generate summaries from source material
   - Maintain source URL for attribution and freshness checks

#### Data Update Cadence
- **Monthly**: Verify top 100 entities (automated check: dead links, API changes)
- **Quarterly**: Full audit of data accuracy, completeness
- **Ongoing**: Build system to auto-update from APIs where possible

### Avoiding Thin Content Penalties

Thin content = low-value, duplicative, or minimal useful content. Google penalizes it.

#### Red Flags for Thin Content
1. **Low Word Count**: <300 words per page (check average across program)
2. **High Duplication**: >70% of page is identical across variations
3. **No Unique Value**: Page could be a search result instead of a destination
4. **Poor Data Quality**: Errors, outdated info, missing key sections
5. **Over-Templating**: Same structure with minimal variable changes
6. **Keyword Stuffing**: Forcing keywords unnaturally (hurts readability)

#### Thin Content Mitigation
1. **Unique Core Content**: Each page needs 300+ unique words beyond template
   - Integration pages: Unique setup steps, use cases, troubleshooting
   - Location pages: Local data (demographics, reviews, neighborhood info)
   - Comparison pages: Unique feature analysis, honest pros/cons per comparison

2. **Entity-Specific Data**: Not generic boilerplate
   - "Zapier integrates with 6,000+ apps" → "[Tool X] integrates with [App Y]; here's how..."
   - "Best restaurants" → Actual local restaurants with reviews, not list template

3. **Practical Guidance**: Actionable, not regurgitated
   - How-to steps specific to the tool pair
   - Real use cases from customer data
   - Common setup mistakes and solutions

4. **Original Examples**: Screenshots, charts, data visualizations
   - Original comparison table (not copied from elsewhere)
   - Setup workflow diagram
   - Feature matrix unique to this page's tool pair

### Internal Linking at Scale

Proper internal linking boosts crawlability, distributes link equity, and increases pages indexed.

#### Linking Strategy
1. **Hub & Spoke**:
   - Central hub page (e.g., "All integrations," "Best [category]")
   - Spoke pages (specific comparisons/integrations linking back to hub)
   - Hub distributes PageRank; spokes benefit from hub authority

2. **Cluster Linking**:
   - Group pages by category (e.g., all "CRM integrations")
   - Link within cluster: Each page links to 3-5 related pages
   - Links should be contextual, not forced

3. **Link Anchor Text**:
   - Use target keyword: "Zapier + HubSpot integration" (not "click here")
   - Vary anchor text (exact, partial, branded) to avoid over-optimization
   - Max 2-3 links per page to same destination (avoid link stuffing)

4. **Crawlability**:
   - XML sitemap includes all generated pages (update after each generation batch)
   - Breadcrumb navigation (Category > Subcategory > Specific page)
   - Pagination if list pages have 50+ items

### Canonical & Duplicate Content Management

#### When to Use Canonicals
1. **Intentional Duplicates**: Multiple URLs serving same content (parameter variations)
   - URL parameters (filters, sorting): Set canonical to base URL
   - Trailing slash variants: Canonicalize to preferred version
   - HTTP vs. HTTPS: Canonicalize to HTTPS

2. **Self-Referential**: Page canonicalizes to itself (standard practice)
   - `<link rel="canonical" href="https://site.com/page" />`

3. **Duplicate Content Across Programs**:
   - Integration page "Zapier + HubSpot" vs. "HubSpot + Zapier" could canonicalize to one
   - Risk: Check if both rank; if one has better CTR, might keep both

#### Avoided Mistakes
- Don't canonicalize to homepage (kills individual page ranking)
- Don't canonicalize to wrong page (confused Google, kills ranking)
- Don't over-canonicalize (every page should have unique indexable content)

### Technical Implementation at Scale

#### Page Generation Process
1. **Template Setup**: Create template with variable injection points
2. **Data Validation**: Ensure 100% data completeness, accuracy
3. **Batch Generation**: Programmatically generate HTML/page files from template + data
4. **Quality Check**: Sample 50 generated pages; validate content, links, metadata
5. **Deployment**: Upload to live server, add to sitemap
6. **Search Console**: Submit sitemap, monitor indexation rate

#### Tools & Approaches
1. **Static Site Generation** (Recommended for SEO)
   - Generate static HTML files (fast, secure, simple crawling)
   - Tools: Jekyll, Hugo, Next.js (static export)
   - Deployment: Upload to web server or CDN

2. **Dynamic Generation** (Database-driven)
   - Template engine (Jinja2, Handlebars, Django templates)
   - Database stores data (entities, attributes)
   - Server generates page on request
   - Risk: Server load, crawl budget issues at scale

3. **API + Frontend Framework**
   - API serves JSON data
   - React/Vue frontend renders templates
   - Pre-generate (SSG) for SEO benefit
   - Risk: JavaScript rendering delays crawling

#### Code Structure Example (Python)
```python
import csv
import jinja2

# Load template
with open('template.html') as f:
    template = jinja2.Template(f.read())

# Load data
with open('data.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Render page
        page = template.render(row)
        # Write to file
        filename = f"pages/{row['slug']}.html"
        with open(filename, 'w') as out:
            out.write(page)
```

### Indexation Management

#### Ensuring Pages Get Indexed
1. **Sitemap Strategy**:
   - Include all generated URLs in XML sitemap
   - Update sitemap after each generation batch
   - Submit to Google Search Console, Bing Webmaster Tools

2. **Internal Linking**:
   - Hub page links to all spokes (or paginated list)
   - Spokes link back to hub and related spokes
   - Breadcrumb navigation (Category > Item)

3. **Robots.txt & Meta Robots**:
   - Don't disallow generated page directories
   - Ensure `<meta name="robots" content="index, follow">`

4. **Crawl Budget Optimization**:
   - Remove low-value pages (thin content) from indexation
   - Fix crawl errors (404s, redirects)
   - Avoid infinite crawl loops (paginated lists)

#### Handling Indexation Issues
- **Not Indexed**: Check GSC Coverage report; add to sitemap, improve internal links
- **Excluded**: Check why (too similar, low traffic, redirect). Fix root cause.
- **Soft 404**: Page doesn't give clear 404 but is thin. Either improve or delete.
- **Parameter Issues**: Robots.txt may be excluding URLs; review settings

## Process (Step-by-Step)

### 1. Opportunity Identification & Validation
- [ ] Brainstorm 3-5 programmatic SEO opportunity types relevant to business
- [ ] Use Ahrefs, SEMrush, or Google Keyword Planner to validate:
  - Head term monthly volume (500+ target)
  - Modifier volume (50-5,000 entities, attributes, or variations available)
  - Combined keyword difficulty (KD <30 preferred for new sites)
  - Potential traffic = head term volume × indexable modifier count
- [ ] Audit competitor programmatic pages (locate opportunities they missed)
- [ ] Calculate ROI: (Traffic × conversion rate × LTV) - (content creation cost)
- [ ] Rank opportunities by ROI, difficulty, data availability
- [ ] Select top 2-3 opportunities to pilot first

### 2. Data Sourcing & Preparation
- [ ] Identify data source (API, database, manual research, web scrape)
- [ ] Collect data for top 100-300 entities/modifiers (start small to validate)
- [ ] Validate data quality:
  - 100% completeness (no missing fields)
  - Accuracy (spot-check 10-20 entries against source)
  - Currency (no outdated or irrelevant items)
- [ ] Normalize data format: CSV or JSON with consistent field names
- [ ] Create data file with columns: `{primary_entity}`, `{modifier}`, `{slug}`, `{image_url}`, `{summary}`, etc.
- [ ] Remove duplicates, invalid entries
- [ ] Document data source, last update date, refresh frequency

### 3. Template Design & Content Structure
- [ ] Map out page structure:
  - H1 (keyword-forward, unique)
  - Intro (2-3 sentences, problem + solution)
  - Section 1: Key benefits or comparisons (300-500 words)
  - Section 2: Use cases, steps, or detailed guide (400-600 words)
  - Section 3: Additional resources or FAQ (200-300 words)
  - CTA (action-oriented, aligned with business goal)
  - Related links (5-7 internal links)
  - Total: 1,000-1,500 words minimum
- [ ] Identify variable injection points: `{primary_entity}`, `{modifier}`, `{audience}`, etc.
- [ ] Write SEO-optimized meta title (55-60 chars, keyword, readable)
- [ ] Write meta description (155-160 chars, value prop + CTA, natural language)
- [ ] Create HTML template with variable placeholders
- [ ] Design responsive layout (mobile-first, fast load time <3 seconds)
- [ ] Test template with 5-10 sample data rows; refine content quality

### 4. Quality Content Generation
- [ ] Write section 1 content as dynamic template:
  - Use AI/LLM to draft specific, entity-tailored benefits
  - Avoid generic boilerplate; include data/statistics
  - Ensure 300-500 unique words per page (not just variable swaps)
- [ ] Write section 2 with real examples, use cases, or step-by-step:
  - Integration pages: Include setup steps, screenshots (if possible)
  - Comparison pages: Feature table, honest pros/cons
  - Location pages: Include local data (hours, reviews, directions)
- [ ] Write FAQ section (5-8 Q&A pairs):
  - Use search console data, competitor FAQs, or customer questions
  - Answer directly (200-300 words per answer)
  - Include target long-tail keywords naturally
- [ ] Add internal link anchors (3-5 contextual links per page)
- [ ] Set up CTA (form, signup, button, link to conversion page)

### 5. Technical Setup & Page Generation
- [ ] Set up development environment (local server or staging)
- [ ] Create template file (HTML with Jinja2, Handlebars, or framework syntax)
- [ ] Set up page generation script (Python, Node.js, PHP, etc.)
- [ ] Generate pages in batch: `generate.py --input data.csv --output pages/`
- [ ] Validate generated pages:
  - Random sample: Load 20-30 pages in browser; check rendering, links, content
  - Automated check: Validate HTML, check for missing variables, verify word count
  - Content check: Spot-check 5-10 pages for quality, readability, uniqueness
- [ ] Set up internal linking:
  - Create hub page (list of all variations with links)
  - Update spoke pages with hub link + 3-5 related links
- [ ] Optimize technical SEO:
  - Set up sitemaps (include all generated page URLs)
  - Configure robots.txt (allow all generated page directories)
  - Set canonical tags (page canonical to itself)
  - Set open graph tags (for social sharing)
- [ ] Test site speed: Aim for <2.5s load time on mobile

### 6. Deployment & Indexation
- [ ] Upload pages to live server
- [ ] Generate and submit XML sitemap (add generated pages section)
- [ ] Submit in Google Search Console (GSC):
  - Submit sitemap
  - Request indexation for hub page + sample spoke pages
- [ ] Monitor GSC for 2-4 weeks:
  - Check Coverage report: aim for 100% indexed
  - Check if pages appear in search results
  - Monitor impressions and CTR
- [ ] Build internal link structure to hub (from homepage, category pages)
- [ ] Announce via blog post linking to hub ("We've created X,000 new guides")

### 7. Monitoring, Optimization & Expansion
- [ ] Weekly checks (weeks 1-4):
  - Indexation rate in GSC (should hit 50-75% by week 2)
  - Sample 5-10 pages in GSC: impressions, clicks, position
  - Monitor site health (crawl errors, page speed)
- [ ] Monthly optimization (month 2+):
  - Analyze which pages rank, which don't; improve bottom quartile
  - Update data if entities/attributes have changed
  - Refresh or improve underperforming pages (low impressions = thin or irrelevant)
  - Test CTA variations (form vs. link vs. button)
- [ ] Quarterly expansion:
  - Increase modifier count: Add 50-100 new entities/attributes
  - Generate new programmatic program (different opportunity)
  - Refresh all pages with updated data

## Output Format

### Programmatic SEO Implementation Plan
```
OPPORTUNITY: [Opportunity Name]
Target Volume: [Estimated monthly search volume]
Modifier Count: [Number of entities/attributes/variations]
Total Pages: [Projected page count]
Expected Traffic (Year 1): [Estimated organic traffic]

BUSINESS IMPACT
├── Primary Conversion: [Leads/Sales/Signups]
├── Secondary Conversion: [Brand awareness/engagement]
└── ROI: [Cost to implement ÷ projected revenue over 12 months]

DATA STRUCTURE
├── Source: [API/Database/Manual/Scraped]
├── Completeness: [X/Y records valid] ([%] valid rate)
├── Key Fields: [field1, field2, field3, ...]
└── Refresh Frequency: [Weekly/Monthly/Quarterly]

TEMPLATE SPECIFICATIONS
├── Base Template: [Template name/file]
├── Minimum Word Count: [#] words
├── Unique Content Percentage: [%] (target: >70% unique per page)
├── Sections: [Section 1, Section 2, ...]
└── Internal Links: [#] per page

TECHNICAL IMPLEMENTATION
├── Generation Method: [Static HTML / Dynamic API / Framework]
├── Pages Generated: [#]
├── Generation Time: [Time to generate all pages]
├── Page Speed (Target): [<2.5s mobile]
└── Indexation Target: [90%+ within 60 days]

LAUNCH TIMELINE
├── Week 1: [Data sourcing, template design]
├── Week 2: [Content generation, quality check]
├── Week 3: [Technical setup, deploy]
├── Week 4: [Monitoring, initial optimization]
```

### Page Quality Audit Checklist
```
[ ] Content Requirements
  [ ] Title tag: 55-60 chars, keyword-forward, readable
  [ ] H1: Unique, includes primary keyword
  [ ] Meta description: 155-160 chars, value prop, CTA
  [ ] Word count: 1,000-1,500 words minimum
  [ ] Unique content: >70% unique (not template boilerplate)
  [ ] No keyword stuffing (natural keyword density 1-2%)

[ ] Structure & Usability
  [ ] Clear sections (H2/H3 hierarchy logical)
  [ ] Intro paragraph (problem + solution, 2-3 sentences)
  [ ] Main content: 2-3 substantial sections (300-600 words each)
  [ ] FAQ or additional resources
  [ ] CTA visible and relevant
  [ ] Mobile-responsive (readable on small screens)

[ ] Links & Navigation
  [ ] Internal links: 3-5 contextual links to related pages
  [ ] Link anchors: Natural, not all exact keywords
  [ ] No broken links (404s or redirects)
  [ ] Breadcrumbs present (if applicable)
  [ ] Hub page links to this page

[ ] Technical SEO
  [ ] Canonical tag present and correct
  [ ] Robots meta: index, follow
  [ ] Open graph tags: title, description, image
  [ ] Mobile viewport meta tag present
  [ ] Page speed: <2.5s load time
  [ ] Images: Optimized, descriptive alt text

[ ] Data & Accuracy
  [ ] No missing variables (all {placeholders} filled)
  [ ] Data accuracy: Facts check out, no errors
  [ ] Data currency: Information is current
  [ ] CTA destination: Correct URL, working link
```

### Monthly Performance Report
```
Program: [Program Name]
Month: [Month/Year]
Status: [Active/Optimizing/Scaling]

INDEXATION STATUS
├── Total Pages Generated: [#]
├── Pages Indexed: [#] ([%])
├── Pages Not Indexed: [#]
│   └── Top Reasons: [Duplicate content, Low traffic, ...]
└── New Pages Indexed This Month: [#]

SEARCH PERFORMANCE
├── Total Impressions: [#]
├── Total Clicks: [#] (CTR: [%])
├── Total Conversions: [#] (Conv. Rate: [%])
├── Avg. Position: [#]
└── Top 10 Keywords: [keyword, impressions, position]

PAGE PERFORMANCE BREAKDOWN
├── Avg. Impressions per Page: [#]
├── Pages with 100+ Impressions: [#]
├── Pages Ranking (Top 3): [#]
├── Bottom 25% (underperformers): [#]
└── Opportunity to improve: [Remove/Rewrite/Add]

RECOMMENDATIONS
├── Action 1: [Content refresh, internal linking, or new modifiers]
├── Action 2: [Data update or quality improvement]
└── Action 3: [Expand program or launch Phase 2]

NEXT MONTH FOCUS
├── Priority: [Indexation improvement, Traffic growth, or Scaling]
└── Expected Impact: [Projected clicks, impressions, conversions]
```

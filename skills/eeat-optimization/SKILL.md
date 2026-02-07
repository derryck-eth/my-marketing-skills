# E-E-A-T Optimization

## Purpose
Map E-E-A-T (Experience, Expertise, Authoritativeness, Trust) to Google's technical ranking signals revealed in the Content Warehouse leak. This framework translates the abstract E-E-A-T concept into measurable, optimizable signals: contentEffort, OriginalContentScore, isAuthor, siteAuthority, queriesForWhichOfficial, clutterScore, spamrank, scamness, and more. By understanding how Google's algorithm actually measures E-E-A-T, you can deliberately engineer pages that score higher on each dimension, with particular emphasis on YMYL (Your Money Your Life) content where E-E-A-T is most critical.

## When to Use
- Creating or optimizing high-stakes content (medical, legal, financial, news)
- Building authority for YMYL query clusters
- Recovering from E-E-A-T-related ranking drops
- Implementing author credentials and byline systems
- Optimizing pages for "high quality" determination by Google's raters
- Establishing official/authoritative status for your brand
- Improving page quality rating scores (pqData metric)
- Addressing feedback about expertise gaps from search performance

## Core Frameworks

### The E-E-A-T Dimension Mapping

Google's E-E-A-T framework maps to specific technical signals:

**EXPERIENCE → contentEffort Signal**
Experience measures first-hand knowledge and practical understanding.

contentEffort technical signal:
- Measures time/resources invested in creating content
- Factors: Word count, multimedia depth, original research, originality signals
- Higher contentEffort = "author has spent substantial time on this"
- Scoring: Continuous scale (0.0-1.0)

Indicators Google uses:
- Content length: 1,500+ words (vs. thin content)
- Original data: Proprietary research, personal experience, unique methodology
- Multimedia diversity: Original images, video, custom graphics
- Publication depth: Extensive citations, references, explanations
- Freshness velocity: How recently was this updated?

Practical optimization:
- Target 2,000-2,800 word articles on money pages
- Include original research or perspective
- Add 3-5 original multimedia assets per article
- Document methodology and sources explicitly
- Update content regularly to signal ongoing expertise

**EXPERTISE → OriginalContentScore + isAuthor**

Expertise measures demonstrated subject matter knowledge.

OriginalContentScore (0.0-1.0):
- Measures originality of the perspective/approach
- Differentiates original analysis from regurgitated existing information
- Higher scores for unique frameworks, novel approaches, contrarian views
- Lower scores for aggregated/summarized existing knowledge

isAuthor (Boolean + Author Score):
- Identifies whether content has documented authorship
- Author score evaluates credentials and topical authority
- Links author to Knowledge Graph entity (if notable expert)
- Measures author's publication history and recognition

Practical optimization:
- Create distinct author profiles for key writers
- Document author credentials prominently (byline, author bio)
- Build author topical authority through content volume
- Link author to official social profiles (Twitter, LinkedIn)
- Establish author's published history and recognition
- Create About Us pages documenting team expertise
- Feature expert credentials: Degrees, certifications, years of experience

**AUTHORITATIVENESS → siteAuthority + queriesForWhichOfficial**

Authoritativeness measures domain-level trust and established status.

siteAuthority (0-100 scale):
- Aggregate measure of domain trustworthiness
- Based on: Link profile quality, topical focus consistency, brand recognition
- Higher scores for established, recognized brands
- Lower scores for new/unknown domains

queriesForWhichOfficial (List of queries):
- Identifies queries where your domain is "official" source
- Example: Apple.com is official for "Apple," Coca-Cola official for "Coca-Cola"
- Higher rankings when you're official source
- Boost available only for brand/company name queries

Practical optimization:
- Build siteAuthority through quality link building (see Link Building skill)
- Maintain topical focus consistency (see Topical Authority skill)
- Establish official status: Verify business, claim official brand channel
- Optimize for brand searches: Title/meta optimization for brand queries
- Create official product/service pages: Establish official source for offerings
- Business verification: Google Business Profile, structured data verification

**TRUST → clutterScore + spamrank + scamness + badSslCertificate**

Trust measures perceived safety and legitimacy.

clutterScore (0.0-1.0):
- Measures mobile UI/UX interference with content
- Evaluates intrusive ads, pop-ups, excessive sidebar content
- Higher scores = more clutter/interference
- Higher clutterScore = ranking penalty

spamrank (0.0-1.0):
- Automated spam detection system
- Flags keyword stuffing, cloaking, automated content
- Based on: Over-optimization signals, manipulation patterns
- Higher = more spam signals detected

scamness (0.0-1.0):
- Detects potentially deceptive or fraudulent content
- Evaluates: Misleading claims, hidden information, user manipulation
- Particularly sensitive for YMYL content
- Higher = more deception signals

badSslCertificate (Boolean):
- Indicates SSL certificate issues or self-signed certificates
- HTTPS required for trust; problems trigger penalty
- Automatic ranking reduction for HTTPS issues

Practical optimization:
- Reduce mobile clutter: Minimal ads, no intrusive pop-ups, clean layout
- Maintain valid HTTPS certificate: Auto-renewal, proper configuration
- Transparent information: Clear disclosures, no hidden content
- Accurate content: No misleading claims, proper sourcing
- Professional appearance: Quality design, no suspicious elements
- Clear contact information: Address, phone, real business info

### YMYL (Your Money Your Life) Determination

Google applies stricter E-E-A-T standards to YMYL content—topics affecting health, wealth, or safety.

YMYL Categories:
- **Medical/Health:** Symptoms, treatments, medical devices, health advice
- **Financial:** Investment advice, loans, insurance, banking
- **Legal:** Legal advice, court information, contracts
- **News:** Current events, politics, disaster information
- **Safety:** Dangerous activities, weapons, hazards
- **Personal:** Relationships, parenting, life decisions

YMYL Indicators Google uses:
- Content involves medical, financial, or legal decisions
- Content could impact income or employment
- Content could impact health or safety
- Content affects civil rights or democratic participation

Practical implication: YMYL content requires:
- Higher E-E-A-T bar (especially expertise and authoritativeness)
- Author credentials must be exceptional
- Domain authority must be established
- Trust signals must be strong
- Scientific/professional sourcing required

If uncertain whether content is YMYL:
- Test: Would someone's health/wealth/safety significantly change based on this?
- If yes → Treat as YMYL, implement stricter E-E-A-T
- If no → Standard E-E-A-T applies

### Page Quality Rating (pqData) & Rater Impact

Google's human raters evaluate pages on overall quality (pqData metric), which directly influences rankings.

pqData Factors:
- **E-E-A-T Signals:** How strong are expertise/authority/trust indicators?
- **Content Quality:** Original? Accurate? Comprehensive?
- **User Satisfaction:** Does content actually answer the query?
- **Ads/Monetization:** Excessive ads? User-hostile monetization?
- **Purpose Alignment:** Does page serve its stated purpose?

Quality Rating Scale (for raters):
- **Lowest:** Harmful, misleading, no clear purpose
- **Low:** Poor content, thin information, inadequate expertise
- **Medium:** Adequate content, but not authoritative for YMYL
- **High:** Strong content, clear expertise, appropriate authority
- **Highest:** Excellent content, exceptional expertise, maximum authority

Rater Feedback Loop:
- Google's raters assess 10,000+ pages monthly
- Their ratings correlate with ranking success
- Machine learning model trained on rater assessments
- Algorithm learns to identify high-quality pages automatically

Practical implication:
- High pqData score = higher ranking potential
- Low pqData score = ranking penalty or suppression
- YMYL content rated strictly
- New/unknown authors face quality skepticism

### Firefly: Scaled Content Abuse Detection

Firefly is Google's system for detecting scaled content abuse—when sites use automation or templates to generate large volumes of similar content.

Firefly Detection Triggers:
- High content volume with minimal variation
- Template-based generated content
- Bulk rewriting of competitor content
- Low original perspective or insight
- Minimal human editorial oversight

Firefly Penalties:
- Suppression in search results
- Manual action notification in Search Console
- Content deindexing in severe cases
- Applies to entire domain or subdomain

Firefly avoidance:
- Maintain high contentEffort threshold (individual optimization, not templates)
- Ensure each piece has unique perspective/angle
- Document editorial process and human review
- Avoid bulk content generation tools
- Maintain reasonable publishing pace (not suspicious velocity)

### Craps: Click Quality Assessment

Craps measures click quality—whether clicks on your results are positive (satisfied users) or negative (frustrated users returning to search).

Craps Signals:
- badClicks: Users click → immediately return (pogo-sticking)
- goodClicks: Users click → spend 30+ seconds on page
- lastLongestClicks: Users click → don't return (satisfied visitor)
- dwell time: How long user remains on page

Craps Ranking Impact:
- High badClick rate → ranking suppression
- High goodClick rate → ranking boost
- High lastLongestClick rate → ranking boost

E-E-A-T Connection:
- Pages with high expertise/authority show higher goodClick rates
- Users trust and spend time on authoritative content
- Pages with low expertise show high badClick rates (users leave disappointed)

Practical optimization:
- Match content promise to reality (title/meta should match content quality)
- Provide comprehensive answers (reduces user bounce)
- Establish expertise early (build trust immediately)
- Cite authoritative sources (users confident in content)
- Clear formatting and navigation (users can find what they need)

### Two-Stage Pipeline: Off-Site > On-Site

Google's quality evaluation uses two-stage pipeline:

**Stage 1: Off-Site Authority Signals (Heavy Weight)**
- Domain authority (siteAuthority)
- Link profile quality
- Brand recognition/signals
- Author recognition
- Known expert status
- Topical domain focus

Weight: 60-70% of E-E-A-T determination

**Stage 2: On-Site Content Signals (Lighter Weight)**
- contentEffort (content depth)
- OriginalContentScore
- Author credentials on page
- Citation quality
- Trust indicators (HTTPS, contact info)
- Freshness signals

Weight: 30-40% of E-E-A-T determination

Implication:
- Off-site authority (domain establishment) is most critical
- On-site signals matter but can't override weak domain authority
- Strategy: Build domain authority first, then optimize on-page signals
- New domains face "benefit of doubt" deficit (overcome through exceptional content + links)

## Process

### Phase 1: YMYL Assessment & Content Classification

**Step 1: Identify YMYL Content**

1. Audit all content targeting money/health/life-affecting queries:
   - Medical content: Disease, treatment, medication, health advice
   - Financial: Investing, loans, credit, financial planning
   - Legal: Legal procedures, contracts, rights
   - News: Current events, politics (if news site)
   - Safety: Dangerous activities, precautions

2. Create YMYL content inventory:
   - List all pages targeting YMYL queries
   - Note current rankings and traffic
   - Assess which pages need E-E-A-T improvement
   - Prioritize high-traffic YMYL pages for optimization

3. Determine E-E-A-T application level:
   - Full YMYL (health/financial advice): Highest E-E-A-T bar required
   - Soft YMYL (related but not direct advice): Medium-high bar
   - Non-YMYL (general information): Standard E-E-A-T

### Phase 2: Domain Authority Building (Off-Site E-E-A-T)

**Step 2: SiteAuthority Development**

4. Establish baseline siteAuthority:
   - Check current domain authority score (SEMrush, Ahrefs, Moz)
   - Target: Authority >50 for competitive YMYL topics
   - Gap analysis: Where you fall short of competitors

5. Build link profile (see Link Building skill):
   - Acquire 30-50 high-authority domain links
   - Focus on topically relevant sources
   - Emphasize brand/authoritative mentions
   - Timeline: 6-12 months for significant authority gains

6. Build brand authority:
   - Increase branded search volume (marketing efforts)
   - Earn brand mentions in industry publications
   - Establish social proof (followers, reviews, testimonials)
   - Create media presence (news mentions, interviews)

**Step 3: Official Status Establishment**

7. Claim official channels:
   - Google Business Profile (for local businesses)
   - Social media verification (verified badges)
   - Official brand trademark registration
   - Industry directory listings (official directories)

8. Implement official schema markup:
   - Organization schema with legal name, logo, contact info
   - Brand markup indicating official status
   - Verify schema in Search Console
   - Link to official social profiles

9. Create official content pages:
   - "About Us" page documenting company history, credentials, team
   - "Our Team" pages with individual expert profiles
   - "Credentials" page listing certifications, awards, affiliations
   - "Contact Us" page with verifiable business information

### Phase 3: Author Authority Building

**Step 4: Author Credentials Development**

10. Create author profiles for all content creators:
    - Author bio: 100-150 words, credentials, expertise areas
    - Author photo: Professional headshot
    - Author social links: Twitter, LinkedIn (verified profiles)
    - Author email: Official domain email address
    - Publication history: List of previous published works

11. Document author credentials explicitly:
    - Degrees/certifications: Include institution names
    - Years of experience: Quantify practical expertise
    - Special recognitions: Awards, published works, media appearances
    - Topical focus: What topics does author specialize in

12. Build author topical authority:
    - Publish regularly (15-25 articles/year on specialized topic)
    - Establish recognition in field (speaking, awards, mentions)
    - Link author pages to Google Knowledge Graph (if notable expert)
    - Create author archive showing publication breadth

**Step 5: Author Implementation on Pages**

13. Add author bylines prominently:
    - Location: Top of article (above or just after title)
    - Format: "By [Author Name]" with photo and link to author page
    - Additional info: Publication date, last update, author title
    - Example: "By Dr. Jane Smith, MD, Cardiologist (Last updated: Feb 7, 2024)"

14. Add author structured data:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "author": {
        "@type": "Person",
        "name": "Dr. Jane Smith",
        "url": "https://example.com/authors/jane-smith",
        "jobTitle": "Medical Director"
      }
    }
    ```

15. Link to author professional profiles:
    - Author page should link to: LinkedIn, Twitter, professional website
    - Professional profiles should link back to author page (mutual verification)
    - Establishes author identity and credibility
    - Helps Google connect content to known expert

### Phase 4: Content Effort & Originality Optimization

**Step 6: ContentEffort Maximization**

16. Audit contentEffort signals on key YMYL pages:
    - Word count: Target 2,500-3,500 for competitive YMYL
    - Multimedia: Minimum 3-5 original images, consider video
    - Sources: Minimum 12-15 authoritative citations
    - Research: Original data, personal experience, unique methodology
    - Freshness: Latest update date, incorporation of recent research

17. Increase contentEffort on underperforming YMYL pages:
    - Expand thin content: Target 2,000+ words minimum
    - Add original research: Conduct survey, analyze data, publish findings
    - Enhance citations: Link to peer-reviewed studies, authoritative sources
    - Add multimedia: Custom graphics, explanatory videos, infographics
    - Document process: Show research methodology, explain reasoning

**Step 7: OriginalContentScore Development**

18. Develop original perspective on covered topics:
    - Unique framework: Create novel way of thinking about topic
    - Original case studies: Real-world examples from your experience
    - Contrarian angle: Present alternative viewpoint (if well-supported)
    - Proprietary research: Conduct original studies, publish findings
    - Personal experience: Draw on first-hand knowledge and examples

19. Differentiate from competitor content:
    - Analyze top-ranking competitors (what do they cover)
    - Identify content gaps (what they don't cover well)
    - Add unique value: Original data, expert perspective, comprehensive coverage
    - Create distinctive voice: Develop recognizable writing style/approach
    - Emphasize unique elements: Highlight what sets your content apart

### Phase 5: Trust Signals & Credibility

**Step 8: HTTPS & Security Optimization**

20. Ensure valid SSL certificate:
    - HTTPS implemented on all pages
    - Certificate from trusted CA (not self-signed)
    - Certificate valid and current (not expired)
    - Monitor: Auto-renewal configured, monitor for expiration

21. Display trust signals:
    - HTTPS indicator visible (browser shows lock icon)
    - Trust badges: Security seals if applicable (for e-commerce)
    - Privacy policy: Clear, linked from footer
    - Terms of service: Clear, linked from footer

**Step 9: Transparency & Contact Information**

22. Make business information transparent:
    - Legal business name: Official company name clearly stated
    - Physical address: Verifiable business address (not PO box for YMYL)
    - Phone number: Direct business phone, not automated system only
    - Email: Official domain email address (@yourcompany.com)
    - Business hours: If applicable, transparent operating hours

23. Add Trust signals to About pages:
    - Company mission/values: Clear statement of purpose
    - Team credentials: Biographies of key personnel with expertise
    - Awards/recognition: Industry awards, media mentions
    - Customer testimonials: Real customer quotes with photos/names
    - Affiliations: Professional associations, certifications
    - Social proof: Customer count, years in business, notable clients

**Step 10: Mobile Clutter Reduction**

24. Reduce clutterScore on mobile:
    - Intrusive ads: Remove above-fold, minimize mid-content ads
    - Pop-ups: Minimize modal pop-ups, especially on entry
    - Sticky elements: Minimize sticky headers/footers taking space
    - Sidebars: Consider single-column layout on mobile
    - Button sizing: Ensure buttons sized for easy clicking

25. Test mobile experience:
    - Page Experience tool assessment (Core Web Vitals)
    - Manual mobile review: Does content come first?
    - Ad density: Is >30% of above-fold content ads?
    - Pop-ups: Do they block content access?

### Phase 6: Citation & Sourcing Strategy

**Step 11: Citation Quality Enhancement**

26. Improve source quality:
    - Replace: Low-authority sites → Peer-reviewed sources
    - Add: Citations to scientific studies, government data, official sources
    - Deepen: Each claim should have supporting citation if stated
    - Link properly: Make citations into actual hyperlinks

27. Create citation structure:
    - For YMYL medical content: Link to NIH, CDC, peer-reviewed journals
    - For YMYL financial: Link to SEC, Treasury, official government sources
    - For YMYL legal: Link to official court documents, law firms, legal databases
    - For news: Link to primary sources, official statements, government records

**Step 12: Expert Quotes & Validation**

28. Include expert validation:
    - Quote experts: Include statements from recognized authorities
    - Expert credentials: Clearly state expert's title, affiliation, credentials
    - Expert sourcing: Link to expert's official profile/organization
    - Direct attribution: Name the expert, don't paraphrase anonymously

29. Implement expert quote schema:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "Claim",
      "claimInterpreted": "Statement about topic",
      "author": {
        "@type": "Person",
        "name": "Expert Name",
        "affiliation": "Expert Organization"
      }
    }
    ```

### Phase 7: Quality Rating Optimization

**Step 13: Content Comprehensiveness**

30. Ensure comprehensive coverage:
    - Answer all relevant sub-queries: If users search "X," what else do they want to know?
    - Cover alternate perspectives: Present multiple viewpoints on controversial topics
    - Provide actionable takeaways: Not just information, but what users should do
    - Include examples: Real-world applications, use cases, case studies

31. Reduce "thin content" signals:
    - Minimum length: 2,000 words for competitive money/life topics
    - Depth: Multiple H2 sections, substantial H3 subsections
    - Multimedia: Minimum 3-5 images, consider video/interactive elements
    - Structure: Clear hierarchy, easy navigation, well-organized

**Step 14: Purpose Clarity & Alignment**

32. Clarify page purpose from entry:
    - H1 title: Clearly states topic, answers question or matches intent
    - First 100 words: Immediately establishes expertise and page scope
    - Clear promise: Users know exactly what they'll learn
    - Honesty: Meta description and content must match exactly

33. Eliminate misleading elements:
    - No clickbait headlines: Title must match content, not sensationalize
    - No hidden content: All promised information actually on page
    - No deceptive practices: Don't hide ads as content, don't use dark patterns
    - No affiliate deception: Clearly disclose affiliate relationships

### Phase 8: Monitoring & Quality Signals

**Step 15: E-E-A-T Score Tracking**

34. Create monitoring dashboard:
    - Author credentials completeness: 0-100% (targeting 100%)
    - contentEffort signal: Avg word count, multimedia per article
    - Citation quality: % of links to high-authority domains
    - HTTPS compliance: 100% (required)
    - Trust signal presence: Business info, contact details, testimonials
    - YMYL compliance: For YMYL pages only

35. Track ranking impact:
    - Monitor: Rankings for YMYL money/health/life keywords
    - Target: +2-8 position improvement over 6 months
    - Baseline: Current positions before E-E-A-T optimization
    - Monthly tracking: Note changes correlating with E-E-A-T improvements

**Step 16: Page Quality Indicator Monitoring**

36. Monitor indicators of page quality assessment:
    - Click patterns: goodClick/badClick ratio (target: 3:1 or better)
    - Dwell time: Average time on page (target: >2 minutes for YMYL)
    - Return-to-SERP rate: % returning to search (lower = better)
    - CTR changes: Higher CTR indicates improved quality perception
    - Ranking stability: Do rankings hold or improve (not fluctuate down)

37. Respond to quality signals:
    - Declining rankings despite high E-E-A-T: May indicate quality issue (review content)
    - Stable rankings after E-E-A-T improvement: May take 2-3 months to see impact
    - Sudden ranking boost: Likely indicates quality/authority threshold crossed
    - Manual action warnings: Address immediately if received

## Output Format

### E-E-A-T Optimization Roadmap

**E-E-A-T AUDIT: CURRENT STATE ASSESSMENT**

```
EXPERIENCE SIGNALS (contentEffort)
Page: "How to Treat Diabetes" (1,200 visits/month, YMYL)
├─ Word Count: 1,400 words (BELOW target of 2,500+)
├─ Multimedia Assets: 2 images (BELOW target of 4-5)
├─ Original Research: None (MISSING critical signal)
├─ Source Citations: 6 citations (BELOW target of 12-15)
├─ Last Updated: 8 months ago (STALE, should update quarterly)
├─ Publication Depth: Moderate H2/H3 structure (Could expand)
├─ contentEffort Score Estimate: 0.52/1.0 (LOW)
├─ Current Ranking: Position 18
└─ Gap Analysis: Needs +1,100 words, +3 images, +6 citations, +original research

EXPERTISE SIGNALS (OriginalContentScore, isAuthor)
├─ Author Byline: Missing (CRITICAL GAP)
├─ Author Credentials: Not documented (MISSING)
├─ Author Bio: None (MISSING)
├─ Author Social Links: None (MISSING)
├─ Unique Perspective: Generic treatment overview (LOW original score)
├─ Original Data: None (MISSING)
├─ Proprietary Framework: None (MISSING)
├─ OriginalContentScore Estimate: 0.35/1.0 (LOW)
├─ isAuthor Signal: FALSE (Not recognized as authored content)
└─ Assessment: Page appears unauthorized, minimal expert perspective

AUTHORITATIVENESS SIGNALS (siteAuthority, queriesForWhichOfficial)
├─ Domain Authority: 28 (TARGET: 50+ for diabetes topic)
├─ Topical Focus: Only 15% of site is health content (WEAK)
├─ Official Status: No verification or official designation
├─ Brand Recognition: Low (branded searches <100/month)
├─ Team Credentials: No documented medical credentials
├─ About Page Quality: Generic business info, no medical experts listed
├─ siteAuthority Score: 28/100 (LOW - not perceived as authority)
├─ queriesForWhichOfficial: None (not recognized as official source)
└─ Assessment: Domain not positioned as health authority

TRUST SIGNALS (HTTPS, clutterScore, Transparency)
├─ HTTPS: YES ✓ (Valid certificate)
├─ Mobile ClutterScore: 0.38 (ABOVE ideal <0.25)
│  └─ Intrusive ads: 3 above-fold ad slots
│  └─ Sticky header: Takes 15% of mobile viewport
│  └─ Pop-up frequency: Entry pop-up present
├─ Business Info: Minimal (name + email only, MISSING address/phone)
├─ Privacy Policy: YES ✓
├─ Contact Info: Email only (MISSING phone + physical address)
├─ Contact Form: Present ✓
├─ Trust Signal Overall: MODERATE
└─ Assessment: Some trust signals present, but clutter and transparency gaps

YMYL STATUS & ADDITIONAL FACTORS
├─ YMYL Classification: YES (Medical advice content)
├─ E-E-A-T Bar Required: HIGHEST
├─ Current E-E-A-T Level: LOW-MEDIUM (insufficient for YMYL)
├─ pqData Estimate: LOW (insufficient expertise/authority for medical)
├─ Manual Actions: None (GOOD)
├─ Firefly Risk: Low (not high-volume generated content)
├─ Click Quality (Craps): badClick rate likely high (insufficient expertise)
└─ Overall Assessment: SIGNIFICANT E-E-A-T GAPS FOR YMYL CONTENT
```

**12-MONTH E-E-A-T IMPROVEMENT ROADMAP**

```
MONTH 1-2: Foundation Phase
├─ Add author bylines to all content (CRITICAL)
├─ Create author profile pages with credentials
├─ Document author credentials (degrees, experience, titles)
├─ Update About page with team credentials
├─ Add privacy policy, terms, contact information
├─ Reduce mobile clutter (minimize ads, remove sticky elements)
└─ Expected Impact: Author signal = critical gap closure, trust signals +25%

MONTH 3-4: Content Enhancement Phase
├─ Expand 5 highest-traffic YMYL pages by 800-1,200 words
├─ Add 2-3 original images to each expanded page
├─ Increase citations: 6 → 12-15 per article
├─ Replace weak citations with peer-reviewed sources
├─ Add expert quotes/validation to 5 key pages
└─ Expected Impact: contentEffort +30%, citation quality +50%

MONTH 5-6: Authority Building Phase
├─ Identify 15-20 target expert authors for the business
├─ Build author social proof (Twitter, LinkedIn followers)
├─ Start guest blogging/expert features (establish thought leadership)
├─ Begin link-building campaign targeting health-authority domains
├─ Create "Our Experts" page showcasing team credentials
└─ Expected Impact: Author authority +40%, siteAuthority begins growth

MONTH 7-9: Originality & Research Phase
├─ Conduct original research (survey, data analysis)
├─ Publish findings in proprietary research article
├─ Create original case studies (real patient/client stories)
├─ Develop unique treatment frameworks/approaches
├─ Add proprietary data/statistics to core content
└─ Expected Impact: OriginalContentScore +50%, unique competitive advantage

MONTH 10-12: Consolidation & Authority Phase
├─ Launch digital PR campaign highlighting expertise
├─ Secure media mentions and expert quotes requests
├─ Build industry partnerships and affiliations
├─ Continue link acquisition (target 20-30 quality links)
├─ Optimize remaining content for E-E-A-T signals
└─ Expected Impact: siteAuthority +15-20 points, brand mentions +100%

TOTAL EFFORT: 300-400 hours + $3,000-5,000 (expert hiring, research, PR)
EXPECTED RANKING IMPACT: +5-12 positions for YMYL keywords (6-12 months)
```

**E-E-A-T SIGNALS SCORECARD**

```
Signal                        Current    Month 3    Month 6    Month 12   Target
──────────────────────────────────────────────────────────────────────────
Experience (contentEffort)    0.52       0.62       0.71       0.78       0.80+
Expertise (Original Score)    0.35       0.48       0.62       0.75       0.75+
Expertise (Author Signal)     0.0        0.60       0.75       0.85       0.85+
Authority (siteAuthority)     28         32         38         48         50+
Authority (Official Status)   0          0          0.30       0.70       0.80+
Trust (HTTPS Valid)           1.0        1.0        1.0        1.0        1.0
Trust (ClutterScore)          0.38       0.25       0.20       0.18       <0.25
Trust (Transparency)          0.50       0.70       0.85       0.95       0.95+
─────────────────────────────────────────────────────────────────────────
COMPOSITE E-E-A-T SCORE       0.47       0.57       0.66       0.78       0.80+
YMYL Qualification            LOW        LOW-MED    MEDIUM     HIGH       HIGH
```

**PRIORITY PAGE OPTIMIZATION SEQUENCE**

```
Priority    Page Title                  Target Keyword         Current Rank    Target Rank
────────────────────────────────────────────────────────────────────────────
P1          "How to Treat Diabetes"     "diabetes treatment"   18              5-8
P2          "Heart Disease Symptoms"    "heart disease"        24              8-12
P3          "Depression Help Guide"     "depression treatment" 31              12-15
P4          "Anxiety Disorder Guide"    "anxiety disorder"     42              18-22
P5          "Cholesterol Management"    "high cholesterol"     28              10-14
────────────────────────────────────────────────────────────────────────────
Total pages: 5 YMYL pages
Effort: 80 hours content expansion + author development
Timeline: 6-9 months to achieve target rankings
```

**AUTHOR CREDENTIALS IMPLEMENTATION CHECKLIST**

For each content author:
```
AUTHOR PROFILE REQUIREMENTS
┌─ Author Page
│  ├─ Professional photo: High-quality headshot ✓/✗
│  ├─ Biography: 150-200 words with credentials ✓/✗
│  ├─ Expertise areas: 3-5 topics of specialization ✓/✗
│  ├─ Credentials section: Degrees, certifications, licenses ✓/✗
│  ├─ Professional experience: Years in field, companies, roles ✓/✗
│  ├─ Awards/recognition: Industry awards, media mentions ✓/✗
│  ├─ Social profiles: LinkedIn, Twitter, professional website ✓/✗
│  └─ Contact: Author email (optional for privacy)
│
├─ On-Page Implementation
│  ├─ Byline at top of article: "By [Author]" with photo ✓/✗
│  ├─ Author title/credentials: "Dr. Jane Smith, MD, Cardiologist" ✓/✗
│  ├─ Author page link: Clickable link from byline to author page ✓/✗
│  ├─ Publication date: Article publication date displayed ✓/✗
│  ├─ Update date: Last modification date if applicable ✓/✗
│  └─ Schema markup: Article schema with author object ✓/✗
│
└─ External Verification
   ├─ Social profiles linked: Author page → LinkedIn, Twitter ✓/✗
   ├─ Social profiles reciprocal: Social profiles → Author page ✓/✗
   ├─ Professional directory: Listed in professional associations ✓/✗
   ├─ Expert recognition: Mentioned in notable publications ✓/✗
   └─ Knowledge Graph: Author has official KG entity (if notable) ✓/✗
```

**CONTENT EFFORT EXPANSION TEMPLATE**

For each YMYL page needing contentEffort boost:

```
Page: "How to Treat Diabetes" (Current: 1,400 words)

EXPANSION PLAN:
├─ Current word count: 1,400
├─ Target word count: 2,800 (+1,400 words)
├─ Current images: 2
├─ Target images: 5 (+3 original images)
├─ Current citations: 6
├─ Target citations: 15 (+9 citations)
│
├─ Expansion Areas:
│  ├─ H2 "Diabetes Types": Add 200 words + 1 image
│  ├─ H2 "Treatment Options": Add 300 words + 1 image + expert quote
│  ├─ NEW H2 "Patient Success Stories": Add 250 words (2 case studies)
│  ├─ NEW H2 "Latest Research (2024)": Add 200 words + original research
│  ├─ H2 "Self-Management": Expand +250 words + 1 image
│  └─ NEW H2 "FAQ": Add 200 words (commonly asked questions)
│
├─ New Citation Strategy:
│  ├─ Replace 2 weak citations with peer-reviewed studies
│  ├─ Add 5 citations to new content sections
│  ├─ Add 2 expert quotes with citations
│  └─ Total new citations: 9
│
├─ Original Research Addition:
│  ├─ Survey: "Patient outcomes with different treatments"
│  ├─ Data: Statistics showing treatment effectiveness
│  └─ Expert quote: Interview with endocrinologist
│
└─ Timeline: 20-30 hours content expansion + research
```

## Key Performance Indicators to Track Monthly

**For YMYL Pages:**
- Author Credibility Score: 0-100 (based on credentials completeness)
- contentEffort Signal: Average word count and multimedia per page
- Citation Quality %: % of citations from high-authority sources
- E-E-A-T Composite Score: Aggregate measure across all 4 dimensions
- pqData Estimate: Quality rating confidence (low/medium/high)
- YMYL Ranking Performance: Average position for YMYL money/health keywords
- Click Quality: goodClick/badClick ratio (target >3:1)
- Ranking Volatility: Position fluctuation (target: stable or improving)

**Domain Authority:**
- SiteAuthority Growth: +0.5-1.0 point/month target
- Link Acquisition Velocity: Quality links per month
- Brand Mention Growth: +5-10% monthly mentions
- Branded Search Volume: Increase indicates authority growth

---

*Framework based on Google Content Warehouse E-E-A-T evaluation: contentEffort, OriginalContentScore, isAuthor signals, siteAuthority, queriesForWhichOfficial, clutterScore, spamrank, scamness, pqData rating system, Firefly abuse detection, Craps click quality, and YMYL special handling with two-stage pipeline evaluation.*

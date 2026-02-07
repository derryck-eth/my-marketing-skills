# Image SEO Optimization

## Purpose
Optimize images for visibility in Google Images and alongside text results using the ImageData schema structure revealed in the Content Warehouse leak. This framework transforms how Google evaluates images through measurable signals: originality (contentFirstCrawlTime), semantic understanding (OCR, imageRegions, multibangKgEntities), quality assessment (NIMA scores), and user engagement (h2c, h2i, clickMagnetScore). By understanding these technical signals, you can publish images that rank higher, drive more traffic from Google Images, and strengthen on-page SEO.

## When to Use
- Creating visual content intended to rank in Google Images search results
- Optimizing product photography or portfolio images
- Publishing original research, infographics, or data visualizations
- Improving on-page SEO through image quality and semantic signals
- Competing in visual categories where Google Images drives significant traffic
- Publishing images where originality is competitive advantage
- Implementing image search optimization into content strategy

## Core Frameworks

### Originality Detection & ContentFirstCrawlTime

Google uses contentFirstCrawlTime to determine image originality. This is the first date Google's crawler detected the image on any website worldwide.

**How Google Ranks Original vs. Republished Images:**

Original Image (First Published on Your Site):
- contentFirstCrawlTime = Your publication date
- Original signal: Maximum strength (1.0)
- Ranking boost: First-publish advantage in Google Images (prominently featured)
- Traffic impact: 2-4x higher CTR from Google Images vs. republished images

Republished Image (Published elsewhere first):
- contentFirstCrawlTime = Earlier date from original publisher
- Original signal: Reduced (0.4-0.8 depending on time gap)
- Ranking penalty: Deprioritized in Google Images results for that image
- Traffic impact: Minimal from Google Images search (buried in results)

Stock Image (Published by stock image service):
- contentFirstCrawlTime = Stock service date
- Original signal: Very low (0.1-0.3)
- Ranking limitation: Essentially impossible to rank unless massive topical relevance
- Traffic impact: Near-zero from Google Images search

Implications:
- Original images = critical competitive advantage in Google Images
- If using stock images, customize/modify them to signal originality
- First-publish timing significantly impacts visibility

### Semantic Understanding Signals

Google uses multiple signals to understand image content:

**OCR (Optical Character Recognition):**
- Extracts all text visible within the image
- Used to understand what the image is about
- Affects both search relevance and image ranking
- Strategy: Include readable text in infographics, charts, callouts
- Example: Infographic with large, clear text = stronger semantic signal

**ImageRegions:**
- Identifies distinct objects/areas within image
- Understanding "this image contains 3 product photos + 1 price tag"
- Helps Google match user intent to image content
- Strategy: Ensure image composition clearly shows primary subject

**MultibangKgEntities:**
- Knowledge Graph entity recognition within images
- Understanding "this image contains a person identified as [name]"
- Useful for images of notable people, products, landmarks
- Strategy: Tag images with structured data indicating entities present

**Alt Text & Surrounding Context:**
- Alt attribute provides explicit semantic signal
- Surrounding text (caption, nearby paragraphs) provides context
- These are primary semantic signals for Google understanding
- Strategy: Write descriptive alt text using keyword + description approach

### NIMA Quality Assessment

NIMA (Neural Image Assessment) evaluates image quality on two dimensions:

**VQ (Visual Quality) Score (0.0-1.0):**
Measures technical image quality:
- Resolution and sharpness
- Color accuracy and saturation
- Lighting quality
- Absence of compression artifacts
- Professional appearance

Scoring:
- 0.80+: Excellent (stock photo quality, professional photography)
- 0.60-0.79: Good (well-shot amateur photography, professionally edited graphics)
- 0.40-0.59: Acceptable (smartphone photography with good lighting)
- <0.40: Poor (blurry, low resolution, poor lighting)

Ranking impact: VQ 0.80+ images rank 2-3 positions higher than VQ <0.60 images.

**AVA (Aesthetic Value Assessment) Score (0.0-1.0):**
Measures composition and visual appeal:
- Composition and framing
- Color harmony and aesthetics
- Emotional impact
- Visual interest and engagement appeal
- Professional design sense

Scoring:
- 0.80+: Stunning (magazine-quality composition)
- 0.60-0.79: Appealing (good composition, pleasant to view)
- 0.40-0.59: Average (acceptable but not particularly appealing)
- <0.40: Poor (confusing composition, unappealing)

Ranking impact: AVA 0.70+ images show 35-50% higher engagement rates (clicks, shares).

**Combined NIMA Strategy:**
- Target VQ >0.75 (sharp, well-lit, professional appearance)
- Target AVA >0.65 (pleasant to view, good composition)
- Combined score >1.40 = strong ranking position in Google Images
- Combined score <0.90 = poor visibility in Google Images

Methods to improve NIMA scores:
- Photography: Professional camera, proper lighting, tripod
- Editing: Professional editing software (not filter-heavy)
- Resolution: Minimum 1,200px width (larger = better)
- Composition: Rule of thirds, clear subject, minimal clutter
- Format: JPG for photographs, PNG for graphics/screenshots

### User Engagement Signals

Google uses click and engagement data to rank images:

**H2C (Human to Content) Clicks:**
- Direct clicks on image in Google Images search
- Indicates user found image visually relevant to search
- Strong ranking signal for similar searches
- Strategy: Compelling image with clear subject = higher h2c

**H2I (Human to Image) Clicks:**
- Clicks that originate on your page and go to image
- Indicates your page content drives engagement with the image
- Signals topical relevance between page content and image
- Strategy: Include calls-to-action encouraging image clicks

**ClickMagnetScore:**
- Aggregate engagement metric combining h2c and h2i
- Measure of image "magnetic appeal" (how much users want to click it)
- Composite score influences ranking position
- Strategy: Create visually striking images with clear subject

High-engagement images show:
- Higher position in Google Images results (+3-7 positions boost)
- More traffic from Google Images (+50-150% increase)
- Better CTR from SERPs (+25-50% improvement)

### Amarna Quality Gate

Amarna is Google's quality gate system for image indexing. Images failing Amarna checks receive reduced visibility.

Amarna evaluation criteria:
- Unblocked access: Image loads, no 403 errors
- Proper licensing: Images don't show copyright infringement signals
- Not duplicate: Image isn't identical to existing Google-indexed version
- Not spam: Image isn't low-quality, misleading, or auto-generated
- Appropriate content: No prohibited content (adult, illegal, violence)
- Not cloaked: Page and image content match (no mismatch tricks)

If image fails Amarna gate:
- Gets indexed but with minimal visibility
- Won't rank for target searches
- Heavily deprioritized in Google Images
- May be completely suppressed for certain queries

Strategy: Ensure all images pass basic quality and authenticity standards.

### IPTC Metadata

IPTC (International Press Telecommunications Council) metadata provides structured information about images.

Critical IPTC fields for SEO:
- **Title:** Image descriptive title
- **Keywords:** Relevant keywords describing image
- **Description/Caption:** Detailed description of image content
- **Creator:** Photographer/designer credit
- **Copyright:** Copyright notice and restrictions
- **Date Created:** Original publication date
- **Location:** Geographic location where image was created
- **Usage Rights:** Licensing information

Benefits:
- Improves image understanding for search
- Provides context for image licensing
- Supports metadata in image properties
- Helps with image rights management

Implementation: Use image editing software (Adobe Lightroom, Capture One) to add IPTC metadata before publishing.

### Product & Merchant Listing Schema

For e-commerce and product images, structured data enhances visibility:

**Product Schema Markup:**
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/product.jpg",
  "description": "Product description",
  "price": "99.99",
  "currency": "USD",
  "rating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "89"
  }
}
```

**Product Gallery:**
- Include multiple images (different angles, contexts)
- All images indexed separately
- Increases chance of ranking for product-related searches
- Improves Google Shopping visibility

Benefits:
- Rich snippets in Google Shopping
- Enhanced image search results with pricing
- Improved click-through rates
- Better product discoverability

## Process

### Phase 1: Image Audit & Originality Assessment

**Step 1: Current Image Inventory**

1. Audit all images on key pages (target 20-50 highest-traffic pages):
   - Use Google Image search (reverse image search) to check originality
   - Search image URL or filename in Google Images
   - Note: Original images show only your page; republished images show multiple sources

2. Categorize images by originality type:
   - Original images: Your photographs, custom graphics, original infographics
   - Republished images: Published on other sites first (news photos, etc.)
   - Stock images: From stock photo services (Unsplash, Pexels, Pixabay, Shutterstock)
   - Outdated images: Published 2+ years ago (freshness concern)

3. Estimate current originality score:
   - % original images: (Original + Modified) / Total images
   - Target benchmark: 70%+ original images
   - Gap analysis: If you have 40% original, you have 30-point improvement opportunity

**Step 2: Google Images Visibility Assessment**

4. For top-performing pages, check Google Images results:
   - Search target keyword in Google Images
   - Find your images in results (if visible at all)
   - Note current ranking position (what page of results?)
   - Compare to competitors' images in same results

5. Identify traffic gap:
   - In Google Search Console, check how many impressions from Google Images
   - Calculate potential traffic if images ranked higher
   - Example: If image gets 100 impressions/month at position 50, it could get 5,000/month at position 5

**Step 3: NIMA Quality Baseline**

6. Use online NIMA scoring tools to assess current images:
   - Tools: NIMA assessment websites (Google's NIMA research tool)
   - Test 10-20 of your highest-visibility images
   - Calculate average VQ and AVA scores
   - Example: If average VQ is 0.52, improvement to 0.75+ = major ranking boost

7. Identify quality improvement opportunities:
   - VQ <0.50: Requires photography/resolution improvement
   - VQ 0.50-0.70: Possible with better editing or lighting
   - VQ 0.70-0.85: Minor improvements needed
   - VQ 0.85+: Excellent, maintain standard

### Phase 2: Image Originality Strategy

**Step 4: Original Content Production Plan**

8. For highest-value pages (money pages), plan original images:
   - Identify 10-20 key pages where original images would have highest impact
   - Prioritize pages ranking for high-value keywords
   - Determine image needs per page (minimum 3-5 original images)

9. Choose production method:
   - **Professional Photography:** Highest quality, highest cost
     - Hire photographer for product/lifestyle shots
     - Cost: $500-2,000 per shoot
     - Result: VQ 0.80+, AVA 0.75+
     - Timeline: 1-2 weeks per shoot

   - **DIY Professional Photography:** Balance of cost/quality
     - Use quality camera (mirrorless or DSLR)
     - Learn lighting and composition
     - Cost: $200-500 for equipment rental/learning
     - Result: VQ 0.70-0.80, AVA 0.65-0.75
     - Timeline: 1-2 hours per shot

   - **Stock Photos + Customization:** Fast, lower cost but moderate originality
     - Purchase stock photos
     - Customize: Add text overlays, remove background, add branding
     - Cost: $10-50 per image
     - Result: VQ 0.65-0.75 (depends on customization), contentFirstCrawlTime = customization date
     - Timeline: 30 minutes per image

   - **Infographics & Data Visualization:** High originality potential
     - Design custom infographics from data
     - Create data visualizations specific to your research
     - Cost: $300-1,000 per infographic (design software + time)
     - Result: VQ 0.60-0.75, AVA 0.70-0.85, maximum originality
     - Timeline: 4-8 hours per infographic

10. Create 12-month image production calendar:
    - Month 1-2: Create 5-8 original images for top 10 money pages
    - Month 3-4: Create 5-8 original images for next-tier keywords
    - Month 5-6: Create 8-10 original infographics/data visualizations
    - Month 7-8: Commission product photography (if applicable)
    - Month 9-12: Create supporting images, update existing content images

**Step 5: Image Optimization Before Publishing**

11. Prepare images for maximum quality score:
    - Resolution: Minimum 1,200px width (better: 2,400px+ for high-quality appearance)
    - Format: JPG for photographs (compress to <500kb), PNG for graphics
    - Color profile: sRGB (standard for web)
    - Aspect ratio: Follow content context (16:9 for blog headers, 4:3 for product photos, 1:1 for social)

12. Optimize file size without losing quality:
    - Compress images: Use TinyPNG, ImageOptim, or similar
    - Target: <200kb for most images
    - Test: Balance visual quality (for NIMA score) with file size (for page speed)
    - Tool: Online NIMA assessment can identify if compression reduced quality too much

13. Add IPTC metadata before publishing:
    - Title: Descriptive image title (e.g., "Complete SEO Audit Framework Dashboard")
    - Keywords: 3-5 relevant keywords (e.g., "SEO, audit, dashboard, ranking signals")
    - Description: 1-2 sentence description of image content
    - Creator: Your name or company
    - Copyright: Copyright notice (e.g., "Copyright 2024 Acme Corp. All rights reserved.")
    - Date Created: Publication date (should be today for original images)

### Phase 3: Semantic Understanding Optimization

**Step 6: Alt Text Strategy**

14. Write descriptive alt text for all images:
    - Formula: [Image Type] of [Primary Subject] showing [Key Details]
    - Examples:
      - Good: "Screenshot of Google Search Console dashboard showing ranking data"
      - Good: "Infographic comparing 5 SEO tools with features and pricing columns"
      - Poor: "image1.jpg" (no semantic signal)
      - Poor: "SEO tool" (too vague)

15. Include keyword naturally in alt text:
    - Include target keyword if it accurately describes the image (40-60% of images)
    - Don't force keyword if it doesn't fit naturally
    - Example: For image on article about "Core Web Vitals," use alt text "Core Web Vitals metrics showing LCP, FID, CLS measurements"

16. Aim for 8-12 word alt text (comprehensive but concise):
    - Too short: "Tool screenshot" (not enough detail)
    - Too long: "This screenshot shows the dashboard interface of the SEO tool with various metrics and settings that users can customize..." (excessive)
    - Optimal: "SEO tool dashboard screenshot displaying keyword rankings, traffic data, and performance metrics" (12 words, clear)

**Step 7: Surrounding Context Optimization**

17. Write image captions to enhance semantic understanding:
    - Caption should reinforce image subject and topical relevance
    - Include context that helps Google understand image significance
    - Format: 1-2 sentence captions (HTML <figcaption> or paragraph near image)
    - Example: "The Google Search Console interface provides visibility into how your site appears in Google Search. Monitoring this data monthly helps identify ranking opportunities."

18. Optimize text surrounding images:
    - H2/H3 heading should relate to image topic
    - First paragraph after image should explain image significance
    - Body text should reference the image (creates h2i engagement signals)
    - Example: "The dashboard [pointing to image] shows three key metrics..."

19. Create image context blocks for important images:
    - Structure: Image + caption + explanation paragraph
    - Purpose: Maximize semantic signals about image content
    - Benefit: Improves image understanding and ranking potential

**Step 8: Structured Data Implementation**

20. Add image-specific schema markup:
    - Schema.org/ImageObject markup for important images
    - Include properties: name, description, creditText, datePublished
    - Benefits: Provides explicit semantic signal to Google

    ```json
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "name": "SEO Audit Framework Dashboard",
      "description": "Comprehensive SEO audit dashboard showing 5 ranking signal pillars: Trust, Experience, Expertise, Authoritativeness, and Image SEO",
      "url": "https://example.com/seo-audit-dashboard.png",
      "creditText": "Acme Corp",
      "datePublished": "2024-01-15"
    }
    ```

21. For product images, use Product schema:
    - Links product images to product data
    - Enables Google Shopping integration
    - Improves product image discoverability

### Phase 4: Quality & Engagement Optimization

**Step 9: NIMA Quality Improvement**

22. Test images before publishing using NIMA assessment:
    - Use online NIMA scoring tools
    - Target scores: VQ >0.75, AVA >0.65
    - If scores are low:
      - Reshooting: Photography issues (lighting, focus)
      - Re-editing: Editing software issues (saturation, contrast)
      - Re-composition: Composition changes (crop, angle)

23. Iteratively improve images until NIMA scores acceptable:
    - Example: First attempt VQ 0.62, re-edit with better color grading → VQ 0.71
    - Example: First attempt AVA 0.58, re-compose with better framing → AVA 0.68
    - Continue until both VQ >0.75 and AVA >0.65

**Step 10: User Engagement Signal Optimization**

24. Design images for click-through appeal:
    - Visual hierarchy: Clear subject, doesn't require context to understand
    - Color appeal: Vibrant colors (AVA booster) without being garish
    - Text overlay: Large, legible text (if relevant to image)
    - Distinctiveness: Stands out from competing images in search results

25. Create context encouraging image clicks (h2i signals):
    - Call-to-action near image: "See the full dashboard in the image below"
    - Image preview text: "The chart below shows..." (makes users want to see full image)
    - Linked image text: Make image clickable to full resolution version
    - Caption emphasis: Emphasize key insight shown in image

26. Track engagement signals in Google Search Console:
    - Monitor impressions from Google Images (how many times image appears in results)
    - Monitor clicks to site from image results
    - Calculate CTR: Clicks / Impressions
    - Target: 2-4% CTR (above average = strong engagement signal)

### Phase 5: Image Gallery & Organization

**Step 11: Image Sitemap & Indexing**

27. Create image sitemap for better discoverability:
    - List all images in XML sitemap
    - Include image location, title, caption
    - Submit to Google Search Console
    - Benefits: Ensures all images indexed, speeds up discovery

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      <url>
        <loc>https://example.com/article</loc>
        <image:image>
          <image:loc>https://example.com/image1.jpg</image:loc>
          <image:title>SEO Audit Dashboard</image:title>
          <image:caption>Complete SEO audit framework showing 5 ranking signal pillars</image:caption>
        </image:image>
      </url>
    </urlset>
    ```

**Step 12: Product & Gallery Pages**

28. For product pages, create comprehensive image galleries:
    - Multiple angles (front, back, side views)
    - Context images (product in use)
    - Detail images (close-ups)
    - Size/scale reference images
    - All images should be original product photography

29. Implement proper image gallery schema:
    - Link all images to product
    - Implement image gallery structure for crawlability
    - Enable zooming and detail view
    - Improve user engagement with product images

## Output Format

### Image Optimization Strategy Document

**CURRENT STATE AUDIT**
```
PAGE-BY-PAGE IMAGE ANALYSIS

High-Value Page 1: "Complete SEO Guide" (5,000 visits/month)
├─ Total images on page: 8
├─ Original images: 3 (37%)
├─ Stock images: 3 (38%)
├─ Republished images: 2 (25%)
├─ Average NIMA VQ Score: 0.58 (BELOW TARGET of 0.75)
├─ Average NIMA AVA Score: 0.52 (BELOW TARGET of 0.65)
├─ Google Images visibility: Images not ranking in results
├─ Alt text coverage: 75% (6/8 images have alt text)
├─ IPTC metadata: 0% (no images have metadata)
├─ Engagement: <0.5% CTR from Google Images (extremely low)
└─ Opportunity: Replace 3 stock images with original, improve quality

High-Value Page 2: "SEO Tools Review" (3,200 visits/month)
├─ Total images on page: 12
├─ Original images: 2 (17%)
├─ Stock images: 8 (67%)
├─ Republished images: 2 (17%)
├─ Average NIMA VQ Score: 0.64 (below target)
├─ Average NIMA AVA Score: 0.61 (acceptable)
├─ Google Images visibility: 1 image ranks position 23
├─ Alt text coverage: 100% (12/12)
├─ IPTC metadata: 0%
├─ Engagement: 0.8% CTR (low)
└─ Opportunity: Replace stock images with product screenshots, improve VQ

[Continue for additional high-value pages]

OVERALL IMAGE QUALITY METRICS
├─ Average NIMA VQ Score: 0.61 (target: 0.75+)
├─ Average NIMA AVA Score: 0.58 (target: 0.65+)
├─ Original Image Percentage: 32% (target: 70%+)
├─ Alt Text Coverage: 78% (target: 100%)
├─ IPTC Metadata: 5% (target: 100%)
├─ Google Images Ranking: <1% of images visible in results (target: 20%+)
└─ Assessment: SIGNIFICANT IMPROVEMENT OPPORTUNITY
```

**12-MONTH OPTIMIZATION ROADMAP**

```
Q1 (January-March): Foundation & Audit Phase
├─ Complete full image audit (8-10 top pages)
├─ Add alt text to all 100+ images (missing coverage)
├─ Add IPTC metadata to existing images
├─ Plan original image production (identify 15 key pages)
├─ Expected improvements: Alt text +10%, metadata 5% → 30%
└─ Timeline: 60 hours (planning + tagging)

Q2 (April-June): Original Content Production Phase
├─ Commission product photography (12-15 new original images)
├─ Create 4-5 custom infographics from data
├─ Improve NIMA scores: Re-edit 20 existing images
├─ Publish 8 new original images on top pages
├─ Expected improvements: Original images 32% → 45%, NIMA VQ 0.61 → 0.69
└─ Timeline: 120 hours + $2,000 production budget

Q3 (July-September): Quality & Engagement Phase
├─ Create 6-8 more original images
├─ Implement image schema markup on key pages
├─ Optimize surrounding context for all images
├─ Create image captions on top 20 pages
├─ Expected improvements: NIMA scores +0.08, engagement +35%
└─ Timeline: 80 hours

Q4 (October-December): Consolidation & Scale Phase
├─ Create image sitemap + submit to GSC
├─ Final quality improvements to underperforming images
├─ Plan next year's image strategy
├─ Expected improvements: Google Images visibility +50%
├─ Monitor ranking changes for image-heavy pages
└─ Timeline: 40 hours

TOTAL YEAR 1 EFFORT: 300 hours + $2,000 production budget
EXPECTED RESULTS:
├─ Original images: 32% → 60%+
├─ NIMA VQ Average: 0.61 → 0.74
├─ NIMA AVA Average: 0.58 → 0.66
├─ Google Images traffic: +150-300%
├─ On-page SEO boost: +2-5 positions for image-rich pages
└─ ROI: 4-8 months payback from Google Images traffic
```

**PRIORITY IMAGE REPLACEMENT PLAN**

```
Priority Level    Pages         Current Images    Replacement    NIMA Target
────────────────────────────────────────────────────────────────────────
CRITICAL (P1)     Top 3 pages   12 stock images   8 original     VQ 0.78
HIGH (P2)         Top 10 pages  28 stock images   18 original    VQ 0.75
MEDIUM (P3)       Top 20 pages  35 mixed          20 improved    VQ 0.72
LOW (P4)          Other pages   40+ existing      Optimization   VQ 0.65+
────────────────────────────────────────────────────────────────────────
TOTAL IMAGES: 115 images, 46 original (40%), 20 improvements targeted
Timeline: 12 months
```

**IMAGE QUALITY SCORECARD**

```
Metric                              Current    Q2 Target    Q4 Target    Final Target
──────────────────────────────────────────────────────────────────────────
NIMA Visual Quality (VQ)            0.61       0.69         0.73         0.75+
NIMA Aesthetic Value (AVA)          0.58       0.63         0.65         0.68+
Combined NIMA Score                 1.19       1.32         1.38         1.43+
Original Image Percentage           32%        45%          58%          70%+
Alt Text Coverage                   78%        95%          99%          100%
IPTC Metadata Coverage              5%         30%          70%          100%
Google Images Top 20 Rankings       1 image    4 images     8 images     15+ images
Average Google Images CTR           0.5%       1.2%         2.0%         3%+
──────────────────────────────────────────────────────────────────────────
Expected Traffic Impact                                                   +150-300%
```

**TECHNICAL OPTIMIZATION CHECKLIST**

```
BEFORE PUBLISHING EACH IMAGE
┌─ Originality Check
│  ├─ Original photograph or custom design? YES/NO
│  ├─ If stock: Modified/customized? YES/NO
│  └─ ContentFirstCrawlTime advantage? YES/NO
│
├─ File Optimization
│  ├─ Resolution: 1,200px+ width? YES/NO
│  ├─ File size: <200kb? YES/NO
│  ├─ Format: JPG or PNG (appropriate)? YES/NO
│  └─ Color profile: sRGB? YES/NO
│
├─ NIMA Quality Assessment
│  ├─ VQ Score: >0.75? YES/NO (if NO, re-edit or reshoot)
│  ├─ AVA Score: >0.65? YES/NO (if NO, reconsider composition)
│  └─ Both above target? YES/NO (required before publishing)
│
├─ Semantic Signals
│  ├─ Alt text: 8-12 words, includes keyword? YES/NO
│  ├─ Caption: 1-2 sentences describing image? YES/NO
│  ├─ Surrounding context: Relates to image? YES/NO
│  └─ Schema markup: ImageObject added? YES/NO
│
├─ IPTC Metadata
│  ├─ Title: Descriptive? YES/NO
│  ├─ Keywords: 3-5 relevant? YES/NO
│  ├─ Description: 1-2 sentences? YES/NO
│  ├─ Creator: Name/company? YES/NO
│  └─ Date Created: Current date? YES/NO
│
└─ Engagement Optimization
   ├─ Clickable image (to full resolution)? YES/NO
   ├─ Call-to-action text near image? YES/NO
   ├─ Image in Google Images Sitemap? YES/NO
   └─ Product schema (if applicable)? YES/NO

READY TO PUBLISH: Only if ALL items = YES
```

**GOOGLE IMAGES RANKING OPPORTUNITIES**

```
Keyword Cluster              Current Ranking    Target Ranking    Traffic Opportunity
──────────────────────────────────────────────────────────────────────────
"SEO tools" (Images)         Not ranking        5-12             120 visits/month
"SEO dashboard" (Images)     Position 28        Position 8       85 visits/month
"SEO audit screenshot"       Position 45        Position 10      65 visits/month
"Keyword research tool"      Position 82        Position 15      95 visits/month
"Link building strategy"     Not ranking        Position 12      75 visits/month
"Core Web Vitals metrics"    Not ranking        Position 8       110 visits/month
────────────────────────────────────────────────────────────────────────────
TOTAL CURRENT TRAFFIC: 40 visits/month from Google Images
TOTAL POTENTIAL TRAFFIC: 550 visits/month
OPPORTUNITY GAP: 510 visits/month (+1,275% growth)
Timeline to achieve: 6-9 months post-optimization
```

## Key Performance Indicators to Track Monthly

- **NIMA VQ Average:** Target +0.01-0.02/month improvement
- **NIMA AVA Average:** Target +0.01-0.02/month improvement
- **Original Image Percentage:** Target +3-5%/month improvement
- **Google Images Impressions:** Expected +10-20%/month as images index
- **Google Images CTR:** Target 1.5-2% (vs. current baseline)
- **Alt Text Coverage:** Target 100% (0.5-1% monthly improvement)
- **IPTC Metadata Coverage:** Target 100% (5-10% monthly improvement)
- **Images Ranking in Top 20:** Target 10-20+ by month 6

---

*Framework based on Google Content Warehouse image ranking signals: contentFirstCrawlTime originality detection, OCR and imageRegions semantic understanding, NIMA quality assessment (VQ and AVA), user engagement metrics (h2c, h2i, clickMagnetScore), Amarna quality gates, and structured data implementation.*

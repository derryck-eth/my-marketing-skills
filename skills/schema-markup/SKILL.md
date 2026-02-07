# Schema Markup Skill

## Purpose
Add, fix, optimize, and maintain structured data (schema.org markup) to help search engines understand page content better. This skill enables AI agents to implement JSON-LD schema, apply correct schema types, validate markup quality, enable rich results in search, improve click-through rates and rankings through better SERP representation, fix schema errors, and maintain schema as content updates.

## When to Use
- Pages not appearing in rich results (reviews, ratings, FAQs, recipes, etc.) in Google Search
- Want higher CTR from SERP (rich snippets with star ratings, pricing, availability increase clicks)
- E-commerce site needs product markup (price, availability, reviews)
- Article/blog needs Article schema (publish date, author, featured image visibility)
- FAQ content needs FAQ schema (for featured snippets)
- Events need Event schema (time, location, ticket pricing visibility)
- Local business needs LocalBusiness schema (address, phone, hours visibility)
- Have recipe content needing Recipe schema
- Product reviews need Review schema
- Video content needs VideoObject schema
- HowTo guides need HowTo schema
- Complex nested relationships need proper schema hierarchy

## Core Frameworks & Knowledge

### JSON-LD Implementation (Recommended Approach)

JSON-LD (JavaScript Object Notation for Linked Data) is the easiest and most maintainable schema implementation method.

#### Why JSON-LD Over Other Approaches
1. **Best Practice**: Google recommends JSON-LD for implementation
2. **Easiest Maintenance**: Doesn't require HTML attribute changes; lives in a script tag
3. **Cleanest Code**: Separated from page HTML; less cluttered markup
4. **Best Support**: All major search engines favor JSON-LD
5. **Flexible**: Works globally on page or within specific elements

#### JSON-LD Basic Structure
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "SchemaType",
  "property1": "value1",
  "property2": {
    "@type": "NestedType",
    "nestedProperty": "nestedValue"
  }
}
</script>
```

#### JSON-LD Placement
- Place in `<head>` section of page (best practice; cleaner, guaranteed to load)
- Or in `<body>` before closing tag
- Multiple JSON-LD blocks possible on same page (for multiple schemas)

#### Key JSON-LD Properties
- **@context**: Always "https://schema.org/" (defines vocabulary)
- **@type**: Schema type (Article, Product, Event, Review, etc.)
- **@id**: Optional URL for identifying the entity (useful for relationships)
- All other properties: Standard schema.org properties (title, author, datePublished, etc.)

### Key Schema Types & Implementation

#### 1. Article Schema (Blog Posts, News)
**When to use**: Blog articles, news stories, published content

**Key properties**:
- headline: Article title
- description: Article summary (50-160 characters)
- image: Featured image URL
- datePublished: Publication date (ISO 8601 format: 2024-01-15)
- dateModified: Last update date (if applicable)
- author: Author name (or organization)
- publisher: Publication/organization name
- articleBody: Full article text (optional; helps Google understand content)

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 SEO Mistakes Killing Your Traffic",
  "description": "Learn the top 10 common SEO mistakes and how to fix them.",
  "image": "https://example.com/images/article-hero.jpg",
  "datePublished": "2024-01-15",
  "dateModified": "2024-02-01",
  "author": {
    "@type": "Person",
    "name": "John Smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Example Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

#### 2. Product Schema (E-Commerce)
**When to use**: Product pages, product listings

**Key properties**:
- name: Product name
- description: Product description
- image: Product image URL(s)
- brand: Brand name
- offers: Price, currency, availability, seller
- aggregateRating: Star rating (4.5), review count, rating value
- review: Individual reviews (optional)

**Example**:
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Wireless Headphones Pro",
  "description": "Premium wireless headphones with noise cancellation.",
  "image": "https://example.com/images/headphones.jpg",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product/headphones",
    "priceCurrency": "USD",
    "price": "299.99",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Example Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "128",
    "reviewCount": "128"
  }
}
```

**Availability options**:
- https://schema.org/InStock
- https://schema.org/OutOfStock
- https://schema.org/PreOrder
- https://schema.org/BackOrder

#### 3. FAQ Schema (FAQ Pages, Filtered Results)
**When to use**: FAQ pages (can trigger featured snippets)

**Key properties**:
- mainEntity: Array of Question objects
- name: Question text
- acceptedAnswer: Answer object
- text: Answer text

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is schema markup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schema markup is structured data that helps search engines understand content better..."
      }
    },
    {
      "@type": "Question",
      "name": "Why is schema markup important for SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schema markup enables rich snippets in search results, improves CTR, and helps with ranking..."
      }
    }
  ]
}
```

#### 4. HowTo Schema (Step-by-Step Guides)
**When to use**: Tutorials, how-to guides, recipes

**Key properties**:
- name: Guide title
- description: Guide summary
- image: Featured image
- step: Array of HowToStep objects
- stepNumber: Step number
- name: Step title
- text: Step instruction

**Example**:
```json
{
  "@context": "https://schema.org/",
  "@type": "HowTo",
  "name": "How to Optimize Your Website for SEO",
  "description": "A step-by-step guide to improving your website's search engine optimization.",
  "image": "https://example.com/images/seo-guide.jpg",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Conduct Keyword Research",
      "text": "Use tools like Google Keyword Planner to identify relevant keywords..."
    },
    {
      "@type": "HowToStep",
      "name": "Optimize Page Titles and Meta Descriptions",
      "text": "Create compelling titles (55-60 chars) and descriptions (155-160 chars)..."
    }
  ]
}
```

#### 5. Review Schema (Product/Service Reviews)
**When to use**: Review pages, review content

**Key properties**:
- name: Review title
- reviewRating: Rating value (1-5)
- author: Reviewer name
- datePublished: Review date
- reviewBody: Review text
- itemReviewed: The product/service being reviewed

**Example**:
```json
{
  "@context": "https://schema.org/",
  "@type": "Review",
  "name": "Great tool for SEO optimization",
  "author": {
    "@type": "Person",
    "name": "Sarah Johnson"
  },
  "datePublished": "2024-01-20",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": "This SEO tool has been transformative for our business. Setup was easy, results were immediate...",
  "itemReviewed": {
    "@type": "Product",
    "name": "SEO Pro Tool",
    "brand": {
      "@type": "Brand",
      "name": "OptimizeNow"
    }
  }
}
```

#### 6. Event Schema (Events, Webinars, Conferences)
**When to use**: Event pages, event listings

**Key properties**:
- name: Event name
- description: Event description
- startDate: Start date/time (ISO 8601: 2024-06-15T14:00:00Z)
- endDate: End date/time
- location: Venue name, address, or virtual URL
- offers: Ticket price and availability
- eventStatus: Scheduled, EventCancelled, EventPostponed, EventRescheduled
- eventAttendanceMode: OfflineEventAttendanceMode, OnlineEventAttendanceMode, MixedEventAttendanceMode

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Digital Marketing Conference 2024",
  "description": "Join industry experts for insights on latest marketing trends.",
  "startDate": "2024-06-15T09:00:00",
  "endDate": "2024-06-17T17:00:00",
  "location": {
    "@type": "Place",
    "name": "San Francisco Convention Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "747 Howard St",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94103",
      "addressCountry": "US"
    }
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/tickets",
    "price": "299",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01T00:00"
  },
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
}
```

#### 7. BreadcrumbList Schema (Site Navigation)
**When to use**: Multi-level sites, category/subcategory navigation

**Key properties**:
- itemListElement: Array of breadcrumb items
- position: Item position (1, 2, 3...)
- name: Breadcrumb text
- item: URL

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://example.com/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Headphones",
      "item": "https://example.com/products/headphones"
    }
  ]
}
```

#### 8. LocalBusiness Schema (Local Business Directory)
**When to use**: Local business pages, Google Business Profile optimization

**Key properties**:
- name: Business name
- address: Business address (PostalAddress)
- telephone: Phone number
- url: Website URL
- openingHoursSpecification: Hours of operation
- priceRange: Price range indicator
- image: Business logo/image
- aggregateRating: Ratings (if available)

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Plumbing",
  "image": "https://example.com/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "postalCode": "10001",
    "addressCountry": "US"
  },
  "telephone": "+1-555-0123",
  "url": "https://example.com",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "$$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "156"
  }
}
```

#### 9. VideoObject Schema (Video Content)
**When to use**: Video pages, embedded videos

**Key properties**:
- name: Video title
- description: Video description
- uploadDate: Publication date
- duration: Video length (ISO 8601: PT5M30S)
- thumbnailUrl: Thumbnail image
- contentUrl: Video file URL
- embedUrl: Embed URL (YouTube, Vimeo, etc.)

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Introduction to Schema Markup",
  "description": "Learn how to implement schema markup on your website.",
  "uploadDate": "2024-01-10T12:00:00Z",
  "duration": "PT8M30S",
  "thumbnailUrl": "https://example.com/images/video-thumbnail.jpg",
  "contentUrl": "https://example.com/videos/schema-intro.mp4",
  "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
}
```

### Testing & Validation

#### Validation Tools
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Paste URL or JSON-LD
   - Shows valid schemas, warnings, errors
   - Shows how content appears in SERP

2. **Schema.org Validator**: https://validator.schema.org/
   - Paste HTML or JSON-LD
   - Detailed validation report
   - Flags warnings and errors

3. **Bing Webmaster Tools**: https://www.bing.com/webmaster/
   - Upload sitemap
   - Check schema errors
   - Shows rich results eligible URLs

4. **Google Search Console**: https://search.google.com/search-console/
   - Structured Data report
   - Shows rich results eligible pages
   - Flags errors and warnings
   - Shows impressions from rich results

#### Common Schema Errors
1. **Missing Required Properties**
   - Schema specifies required properties (e.g., Article requires headline, datePublished)
   - Fix: Add missing properties with accurate data

2. **Incorrect Data Types**
   - Value doesn't match expected type (e.g., price is "hundreds" instead of "299")
   - Fix: Use correct data type (numbers, dates, URLs as specified)

3. **Malformed JSON**
   - JSON syntax error (missing comma, bracket, quote)
   - Fix: Validate JSON syntax using JSONLint.com

4. **Wrong Schema Type**
   - Using wrong schema for content (e.g., Product schema for article)
   - Fix: Use correct schema type for content

5. **Missing Context or @type**
   - Missing @context: "https://schema.org/" or @type
   - Fix: Add required properties

#### Validation Process
1. Implement schema in code
2. Test with Google Rich Results Test
3. Check for errors/warnings
4. Fix errors before deploying
5. Validate again after deployment
6. Monitor in Google Search Console for rich results eligibility

### Google Rich Result Eligibility

Not all valid schema equals rich results. Google has specific requirements.

#### Rich Results Requiring Schema
1. **Product Rich Results**: Requires Product schema with price, availability, reviews
2. **Review Snippets**: Requires Review schema with rating
3. **Recipe Rich Results**: Requires Recipe schema with ingredients, instructions
4. **Article Rich Results**: Requires Article schema with headline, image, date
5. **FAQ Rich Results**: Requires FAQPage schema (can trigger featured snippets)
6. **HowTo Rich Results**: Requires HowTo schema with step-by-step instructions
7. **Job Posting**: Requires JobPosting schema
8. **Event Rich Results**: Requires Event schema with dates, location

#### Requirements for Rich Results
- **Valid Schema**: Markup must be valid (no errors in test tools)
- **Complete Data**: Include all required properties
- **Accurate Content**: Schema content must match page content
- **Following Guidelines**: Follow Google's rich result documentation
- **Time**: Google may take days/weeks to recognize new rich results
- **Monitoring**: Check Search Console to see if page is eligible

### Common Schema Mistakes to Avoid

#### Mistake 1: Using Microdata or RDFa (Instead of JSON-LD)
- **Problem**: Older schema formats; harder to maintain
- **Solution**: Use JSON-LD (recommended by Google)

#### Mistake 2: Schema Not Matching Content
- **Problem**: Article schema says one thing; page content says another
- **Solution**: Keep schema in sync with actual page content

#### Mistake 3: Nested Schemas Without @id
- **Problem**: Complex nested schemas confusing to parser
- **Solution**: Use @id property to link related entities

#### Mistake 4: Missing Key Properties
- **Problem**: Schema incomplete; doesn't trigger rich results
- **Solution**: Include all required properties for rich result type

#### Mistake 5: Outdated or Removed Schema
- **Problem**: Schema for product no longer available, article deleted
- **Solution**: Audit and remove schema for non-existent content

#### Mistake 6: Multiple Conflicting Schemas
- **Problem**: Two different schema blocks claiming different properties
- **Solution**: Use single schema per entity, or properly nest

#### Mistake 7: Keyword Stuffing in Schema
- **Problem**: Schema properties include unnatural keywords
- **Solution**: Keep schema data accurate and natural (not for SEO manipulation)

### Schema for Complex Content Types

#### E-Commerce Product Schema (Advanced)
Include multiple offers (for variants), reviews, stock information:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Wireless Headphones Pro - Blue",
  "description": "Premium wireless headphones with active noise cancellation.",
  "sku": "WHP-PRO-BLUE",
  "brand": {
    "@type": "Brand",
    "name": "AudioTech"
  },
  "image": [
    "https://example.com/images/headphones-1.jpg",
    "https://example.com/images/headphones-2.jpg"
  ],
  "offers": [
    {
      "@type": "Offer",
      "url": "https://example.com/products/headphones-blue",
      "priceCurrency": "USD",
      "price": "299.99",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "url": "https://example.com/products/headphones-black",
      "priceCurrency": "USD",
      "price": "299.99",
      "availability": "https://schema.org/BackOrder"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "128",
    "reviewCount": "128"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "John Doe"
      },
      "datePublished": "2024-01-20",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": "Best headphones I've ever owned. Excellent sound quality and comfort."
    }
  ]
}
```

#### Article with Author Organization
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Breaking: New Marketing Trends in 2024",
  "description": "Industry experts predict the top 5 marketing trends for 2024.",
  "image": "https://example.com/images/trends-2024.jpg",
  "datePublished": "2024-01-01T08:00:00Z",
  "dateModified": "2024-01-02T12:00:00Z",
  "author": [
    {
      "@type": "Person",
      "name": "Jane Smith"
    },
    {
      "@type": "Person",
      "name": "John Johnson"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Marketing Daily",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

## Process (Step-by-Step)

### 1. Audit Current Schema & Identify Gaps
- [ ] Use Google Rich Results Test to check current schema:
  - Go to https://search.google.com/test/rich-results
  - Paste homepage URL
  - Note: Do any rich results appear? Are there warnings/errors?
- [ ] Check Google Search Console structured data report:
  - Sign in to GSC
  - Go to Enhancements > Structured Data
  - Review errors and warnings across site
  - Note: Which pages have errors? Which schemas are affected?
- [ ] Review pages and identify missing schema:
  - Blog articles: Missing Article schema?
  - Product pages: Missing Product schema?
  - FAQ pages: Missing FAQPage schema?
  - Local pages: Missing LocalBusiness schema?
  - Create list of pages needing schema
- [ ] Identify rich result opportunities:
  - What rich results could boost CTR? (reviews, ratings, prices, etc.)
  - Which pages get most traffic? Prioritize those.
  - Which would improve SERP appearance most? (products, articles, FAQs)

### 2. Schema Type Selection & Planning
- [ ] Map pages to appropriate schema types:
  - Blog articles → Article schema
  - E-commerce products → Product schema
  - FAQ pages → FAQPage schema
  - How-to guides → HowTo schema
  - Local business → LocalBusiness schema
  - Events → Event schema
  - Reviews → Review schema
  - Videos → VideoObject schema
- [ ] Prioritize implementation:
  - Priority 1: High-traffic pages (blog articles, products)
  - Priority 2: Pages with rich result opportunities
  - Priority 3: Supporting pages (category pages, blog listings)
- [ ] Document required properties for each type:
  - Research schema.org for each type
  - Note: Which properties required? Recommended? Optional?
  - Identify data availability (is all data on page currently?)

### 3. Data Collection & Preparation
- [ ] Gather data for each schema type:
  - **Articles**: Headline, description, image, author, publish date, last modified
  - **Products**: Name, description, image, price, availability, brand, reviews/ratings
  - **FAQ**: Questions and answers (extract from page)
  - **HowTo**: Title, description, image, steps
  - **Local**: Business name, address, phone, hours, image
  - **Events**: Title, date/time, location, tickets
- [ ] Verify data accuracy:
  - Dates should be correct (check article publish dates)
  - Prices should match page price
  - Images should exist and be accessible
  - Phone numbers and addresses should be current
- [ ] Create data file/spreadsheet:
  - List page URL and corresponding schema data
  - Ensures nothing is missed during implementation

### 4. JSON-LD Implementation
- [ ] Choose implementation method:
  - **Option 1**: Manually add to theme/template
  - **Option 2**: Use plugin (Yoast SEO, Rank Math for WordPress)
  - **Option 3**: Use CMS schema builder (Contentful, Sanity)
- [ ] Implement for priority 1 (high-traffic) pages first:
  - For blog articles:
    - Create Article schema JSON-LD block
    - Include: headline, description, image, datePublished, dateModified, author, publisher
    - Place in `<head>` section
  - For product pages:
    - Create Product schema JSON-LD block
    - Include: name, description, image, price, availability, brand, aggregateRating
    - Place in `<head>` section
  - For FAQ pages:
    - Create FAQPage schema with multiple Question objects
    - Extract questions and answers from page content
    - Place in `<head>` section
- [ ] Test each implementation:
  - Copy HTML/schema code
  - Paste in Google Rich Results Test
  - Check for errors
  - Fix any errors before moving to next

### 5. Validation & Testing
- [ ] Validate all schemas:
  - Use Google Rich Results Test for each page/schema type
  - Use Schema.org Validator for detailed checks
  - Resolve all errors and warnings
- [ ] Check rich result eligibility:
  - Ensure pages are eligible for Google rich results
  - Follow Google's rich result documentation
  - Add required properties if missing
- [ ] Test across different schema types:
  - Article: Check datePublished, author, image show correctly
  - Product: Check price, availability, reviews show correctly
  - FAQ: Check if pages trigger featured snippets
  - LocalBusiness: Check address, phone, hours show correctly
- [ ] Document validation results:
  - List pages tested and results (valid, errors, warnings)
  - Note any actions taken to fix errors

### 6. Deployment & Monitoring
- [ ] Deploy schema to live site:
  - Update website code with JSON-LD blocks
  - Verify JSON-LD blocks appear in page source (view-source: check)
  - Test on live pages using Google Rich Results Test
- [ ] Submit in Google Search Console:
  - Go to GSC > Structured Data
  - Check if new schemas appear in report within 24-48 hours
  - Monitor for errors/warnings
- [ ] Monitor rich results eligibility:
  - Check GSC Enhancements > Structured Data (for your schema type)
  - Track: How many pages eligible for rich results?
  - Monitor: Are rich results appearing in SERP? (can take days/weeks)
- [ ] Monitor CTR improvement:
  - Check GSC Performance report
  - Compare CTR before and after rich results appear
  - Rich results typically increase CTR by 10-30% depending on type

### 7. Ongoing Maintenance & Updates
- [ ] Monthly schema audits:
  - Check GSC for new errors/warnings
  - Validate 10-20 pages each month
  - Fix errors promptly
- [ ] Update schema when content changes:
  - Article updated? Update dateModified in schema
  - Product price changed? Update offers section
  - Review added? Add to aggregateRating or review array
- [ ] Add schema to new pages:
  - Process all new content through schema workflow
  - Don't publish without appropriate schema
  - Test before publishing
- [ ] Refresh schema periodically:
  - Quarterly: Review all schemas for accuracy
  - Add new properties as Google adds rich result types
  - Remove schema for deleted pages

### 8. Advanced: Complex Nested Schema (E-Commerce, News)
- [ ] For related entities, use @id to link:
  - Product schema with Offer and aggregateRating
  - Article with Organization and Person authors
  - Event with multiple Organization attendees
- [ ] Test complex nested structures:
  - Use Schema.org Validator
  - Ensure relationships are clear
  - Verify all nested properties are valid
- [ ] Update GSC:
  - Monitor Structured Data report for complex types
  - Ensure all required nested properties included

## Output Format

### Schema Implementation Checklist
```
Page/Section: [Page or page type]
Schema Type: [Article/Product/FAQ/HowTo/Event/etc.]
Status: [Not Started / In Progress / Tested / Live / Maintained]

REQUIRED PROPERTIES CHECKLIST
[ ] Property 1: [Value] - Status: Present/Accurate/Missing
[ ] Property 2: [Value] - Status: Present/Accurate/Missing
[ ] Property 3: [Value] - Status: Present/Accurate/Missing
[ ] [Continue for all required properties]

RECOMMENDED PROPERTIES CHECKLIST
[ ] Property 1: [Value] - Status: Present/Included/Skipped
[ ] Property 2: [Value] - Status: Present/Included/Skipped
[ ] [Continue for recommended properties]

IMPLEMENTATION DETAILS
├── JSON-LD Block: [In HEAD / In BODY]
├── Last Updated: [Date]
├── Validated: [Yes/No] - Date: [Date]
├── Rich Results Eligible: [Yes/No]
└── Rich Results Appearing: [Yes/No] - First Appeared: [Date]

VALIDATION RESULTS
├── Google Rich Results Test: [Pass/Errors/Warnings]
├── Schema.org Validator: [Valid/Errors]
├── GSC Structured Data: [Eligible/Errors/Warnings]
└── Issues Found: [List any errors to address]

NEXT STEPS
├── Action 1: [Fix error or add property]
├── Action 2: [Monitor rich results]
└── Action 3: [Schedule next audit]
```

### Schema Audit Report
```
Date: [Audit Date]
Site: [Website URL]
Report Period: [Month/Quarter]

OVERVIEW
├── Total Pages Audited: [#]
├── Pages with Valid Schema: [#] ([%])
├── Pages with Errors: [#] ([%])
├── Pages with Warnings: [#] ([%])
└── Pages Missing Schema: [#] ([%])

SCHEMA TYPES FOUND
├── Article: [# pages]
├── Product: [# pages]
├── FAQPage: [# pages]
├── HowTo: [# pages]
├── LocalBusiness: [# pages]
├── Event: [# pages]
└── [Other types]: [# pages]

ERRORS FOUND & FIXED
├── Error Type 1: [# occurrences] - Status: Fixed/Pending
├── Error Type 2: [# occurrences] - Status: Fixed/Pending
├── Error Type 3: [# occurrences] - Status: Fixed/Pending
└── [Continue for all error types]

RICH RESULTS PERFORMANCE
├── Article Rich Results: [# pages appearing]
├── Product Rich Results: [# pages appearing]
├── FAQ/Featured Snippets: [# pages appearing]
├── Review Rich Results: [# pages appearing]
└── Event Rich Results: [# pages appearing]

IMPACT METRICS
├── Avg CTR Before Rich Results: [%]
├── Avg CTR After Rich Results: [%]
├── CTR Improvement: [+X%]
├── Estimated Traffic Gain: [+X visitors/month]
└── Pages Eligible But Not Showing: [# pages]

RECOMMENDATIONS
├── Action 1: [Fix remaining errors]
├── Action 2: [Add schema to priority pages]
├── Action 3: [Implement advanced schemas]
└── Action 4: [Monitor GSC for new rich results]

NEXT AUDIT SCHEDULED
└── Date: [Next audit date - typically monthly]
```

### Schema Data Template
```
Page URL: [URL]
Schema Type: [Article/Product/FAQ/etc.]

BASIC PROPERTIES
├── Title/Headline: [Text]
├── Description: [Text - 155-160 chars]
├── Image URL: [Full image URL]
├── Publication Date: [ISO 8601: YYYY-MM-DD or with time]
├── Last Modified Date: [ISO 8601 - if applicable]
└── Author: [Person name or Organization name]

TYPE-SPECIFIC PROPERTIES
├── [Property 1]: [Value]
├── [Property 2]: [Value]
├── [Property 3]: [Value]
└── [Continue for all relevant properties]

NESTED ENTITIES
├── Author Organization: [Organization name]
├── Publisher: [Organization name]
├── Rating/Review: [Value and reviewer info]
└── [Other nested entities as applicable]

VALIDATION STATUS
├── Google Rich Results Test: [Pass/Errors]
├── Schema.org Validator: [Valid/Errors]
├── Date Tested: [Date]
└── Issues Resolved: [Yes/No]

DEPLOYMENT
├── Date Implemented: [Date]
├── Date Went Live: [Date]
├── GSC Detected: [Yes/No] - Date: [Date]
└── Rich Results Showing: [Yes/No] - Date: [Date]
```

# Popup CRO

## Purpose
Optimize modals, overlays, slide-ins, and notification bars to capture leads, re-engage visitors, and reduce bounce rate. Popups are high-impact when used strategically; poorly executed popups destroy UX and increase bounce rate by 20-40%. This skill covers intelligent popup deployment that improves conversions without degrading experience.

## When to Use
- You want to capture email addresses from website visitors
- Your homepage bounce rate is high (over 50%)
- You have a lead magnet (checklist, guide, template) to offer
- You want to announce a promotion, webinar, or limited-time offer
- You're exiting users without capturing them (exit-intent popups)
- You want to reduce friction for newsletter signups
- You need to test popup design, copy, and triggers
- You want to segment users with popups (different offers for different segments)

## Core Frameworks & Knowledge

### Popup Types & Use Cases

**Exit-Intent Popup**
- Triggers when mouse exits to browser chrome (about to leave)
- Best for: Last-chance offer, lead magnet, re-engagement
- Conversion lift: 10-30% (captures users about to bounce)
- Desktop-only (mobile doesn't have exit intent)

**Scroll-Triggered Popup**
- Triggers after user scrolls X% down page (e.g., 50% scroll depth)
- Best for: Content-driven offers, webinars, deeper engagement
- Conversion lift: 15-25% (user is engaged; likely to see)
- Works on mobile; less annoying than immediate popup

**Timed Popup**
- Triggers after X seconds on page (e.g., 5-10 seconds)
- Best for: Quick offers, urgent announcements
- Conversion lift: 5-15% (early trigger may disrupt reading)
- Risk: Too fast = annoying; too slow = user already decided

**Click-Triggered Popup**
- Triggers when user clicks specific element (button, link, offer)
- Best for: Intentional conversions (user explicitly asked for it)
- Conversion lift: 20-40% (highest intent)
- No friction; user expected it

**Sticky Header/Footer**
- Persistent bar at top or bottom of page
- Best for: Evergreen offers (newsletter, promotion)
- Conversion lift: 5-10% (less intrusive than modal)
- Risk: Reduces content real estate

**Slide-In (Right or Left)**
- Slides in from side of page
- Best for: Chat, lead forms, secondary offers
- Conversion lift: 10-20% (less annoying than modal)
- Works well on mobile

**Notification Bar**
- Toast notification (small bar, top/bottom)
- Best for: Announcements, time-sensitive offers
- Conversion lift: 3-8% (easy to dismiss)
- Least intrusive option

### Popup Frequency & Capping Strategy
- Show popup max 1x per visitor per session (unless dismissed and returning)
- After dismissal, wait 24-48 hours before showing again
- After 3 dismissals, wait 7-14 days before next show
- Don't show multiple popups simultaneously (choose highest-intent one)
- Lower frequency on return visitors (they've seen it; don't annoy them)

### Google Interstitial Penalty
- Google penalizes sites with intrusive interstitials (mobile)
- Prohibited: Full-page popups covering content on page load
- Allowed: Small banners, popups below fold, legitimate dismissal options
- **Key rule**: Popup must have clear, easily tappable close button

## Process

### Step 1: Audit Current Popups & Lead Capture

1. **Map all current popups**:
   - Where do popups appear? (homepage, specific pages, all pages)
   - What trigger? (exit-intent, timed, scroll, click)
   - What offer? (newsletter, lead magnet, webinar, discount)
   - What form fields? (email only, email + name, more)
   - Close button: Obvious? Easy to find?
   - Mobile experience: Does it work? Is it annoying?

2. **Measure popup performance**:
   - Popup views: How many visitors see it?
   - Popup clicks: How many click the CTA?
   - Popup submissions: How many fill form?
   - Click-through rate: (Clicks / Views) × 100
   - Conversion rate: (Submissions / Views) × 100
   - Impact on bounce rate: Is bounce rate higher with popup?
   - Email capture rate: Signups from popup / total page visits

3. **User feedback**:
   - Is popup annoying? Ask in survey
   - Did it interrupt content? Ask
   - Would they opt-in without popup? (Measure willingness)

4. **Competitive analysis**:
   - What popups do competitors use?
   - What triggers, design, copy?
   - What offers (freebie, discount)?

### Step 2: Define Popup Offer & Value Prop

**Offer is everything. People won't fill form for nothing.**

1. **Valuable lead magnet**:
   - Checklist (actionable, downloadable)
   - Template (saves time, immediately useful)
   - Guide/E-book (comprehensive, educational)
   - Tool/Calculator (interactive, produces output)
   - Video/Webinar (instructional, engaging)
   - Sample/Trial (product sample, free access)
   - Discount (dollar amount, % off)

2. **Value proposition for popup**:
   ```
   [Lead magnet name]

   One-sentence benefit: "Save 5 hours/week with our team checklist"

   2-3 bullet points of what they'll get:
   ✓ Ready-to-use checklist (start today)
   ✓ Best practices from 100+ teams
   ✓ PDF download + editable template
   ```

3. **Offer targeting**:
   - Segment 1: New visitors → General offer (newsletter signup)
   - Segment 2: Returning visitors → Advanced offer (webinar, case study)
   - Segment 3: High-engagement visitors → Upgrade offer (trial, demo)
   - Different offers for different pages (product page → product trial; pricing page → product demo)

### Step 3: Design Popup Anatomy

**Popup structure for maximum conversion:**

```
╔════════════════════════════════════╗
│ [X close button]                   │
├────────────────────────────────────┤
│                                    │
│  [Headline icon/emoji]             │
│  Compelling Headline               │
│                                    │
│  2-3 line description of benefit   │
│                                    │
│  [Email form field]                │
│  [Name field (optional)]           │
│                                    │
│  [Large CTA button]                │
│                                    │
│  Privacy note: "No spam, ever"     │
│                                    │
│  [Alternative CTA or close link]   │
├────────────────────────────────────┤
│ [Offer preview image, if applicable]
└════════════════════════════════════┘
```

### Step 4: Popup Copy Best Practices

1. **Headline** (most important; 40-60 characters):
   - Benefit-focused: "Save 5 hours every week"
   - Curiosity-focused: "The checklist top teams use"
   - Fear-based: "Don't miss out on productivity gains"
   - Urgency: "Get instant access (only 50 spots)"
   - Test variations; A/B test top performers

2. **Subheading** (1-2 sentences; reinforce headline):
   - Restate benefit: "Learn the exact checklist used by Slack and Notion"
   - Show proof: "Used by 10k+ teams worldwide"
   - Answer "why": "Because most teams waste time on meetings"

3. **Form field labels**:
   - Honest approach: "Email" (not "Work email" or "Corporate email")
   - Benefit approach: "Your email for instant access"
   - Privacy approach: "Email (we hate spam too)"

4. **CTA button text** (test these variations):
   - Action-oriented: "Get My Checklist" (specific, clear)
   - Benefit-driven: "Save Me 5 Hours" (outcome-focused)
   - Urgency: "Get Instant Access" (now, not later)
   - Simple: "Download" (short, clear)
   - Avoid: "Submit", "OK", "Next" (generic, boring)

5. **Privacy copy** (builds trust; essential):
   - "No spam, just great content"
   - "Privacy policy: We won't share your email"
   - "Unsubscribe anytime" (if newsletter)
   - Link to privacy policy

### Step 5: Trigger Strategy

**Timing of popup matters more than design. Choose trigger based on goal.**

1. **Exit-Intent Popup** (desktop only):
   - Triggers when mouse moves to browser chrome (leaving page)
   - Best for: Last-chance conversions
   - Timing: Natural; user already decided to leave
   - Frequency: Show once per session (often)
   - Success rate: 10-30% higher than standard popup
   - Copy tone: "Hold on! Before you go..."

   ```
   "Wait, don't go yet!"

   Our team checklist helps managers save 5 hours/week.
   Get it free.

   [Email] [Get Checklist] [×]
   ```

2. **Scroll-Triggered Popup**:
   - Triggers after user scrolls 50-75% down page (or after 5 pieces of content)
   - Best for: Content-driven conversions (blog, long-form page)
   - Timing: User engaged; likely interested
   - Frequency: Show once per visit
   - Delay: 2-3 seconds after scroll trigger (let page breathe)

   ```
   Headline: "Keep learning (for free)"
   Copy: "Weekly tips from marketing leaders"
   CTA: "Subscribe to newsletter"
   ```

3. **Timed Popup**:
   - Triggers after X seconds (typically 5-15 seconds)
   - Best for: Quick announcements, urgent offers
   - Timing: Risk of interrupting reader
   - Frequency: Once per session
   - Sweet spot: 10-15 seconds (user has time to orient)
   - Avoid: <5 seconds (too aggressive)

4. **Click-Triggered Popup**:
   - Triggers when user clicks specific link/button
   - Best for: Intentional conversions (user expects modal)
   - Timing: Perfectly timed (user decided)
   - Frequency: Always (user explicitly asked)
   - Success rate: 20-40% (highest intent)

   Example: "Get Demo" button → opens demo request form in popup

5. **Behavioral Trigger**:
   - Triggers based on user behavior (inactivity, mouse movement)
   - Inactive 30+ seconds: User might be confused → offer help
   - Hovering on exit element: User is leaving → exit-intent popup
   - Viewing pricing page: User evaluating → offer trial/demo

### Step 6: Mobile Popup Optimization

**Mobile popups have different constraints; design differently than desktop.**

1. **Mobile-friendly design**:
   - Width: 90% of viewport (20px margins)
   - Height: 50-70% of viewport (don't fill entire screen)
   - Exit button: Large (40px+), easy to tap
   - Form fields: Large (44px height minimum for touch)
   - Text size: 16px+ (mobile default, prevents auto-zoom)
   - Single column layout only

2. **Mobile form optimization**:
   - Email field only (name is optional; can collect later)
   - type="email" (shows @ keyboard)
   - Autocomplete enabled (browser fills from saved data)
   - Submit button: "Get Free [Offer]" not generic "Submit"
   - Avoid: Multi-select, complex fields, date pickers

3. **Google Interstitial Compliance** (CRITICAL):
   - Exit button MUST be visible, easy to tap (40x40px minimum)
   - Popup MUST be dismissible with back button or X
   - Content MUST be accessible (no scroll required to dismiss)
   - Avoid: Popup on page load that covers content
   - Allowed: Popup after user scrolls 30%+
   - Result: Avoid ranking penalty; maintain mobile UX

4. **Mobile triggers** (different from desktop):
   - No exit-intent (mobile doesn't have mouse exit)
   - Scroll-triggered: 30% scroll depth (more aggressive than desktop)
   - Timed: 8-15 seconds (similar to desktop)
   - Click-triggered: Preferred (user explicitly asks)

### Step 7: Design & Copy A/B Testing

**Run tests to find highest-converting popup variation.**

1. **High-impact tests** (expect 10-30% impact):
   - Popup type: Exit-intent vs scroll-triggered vs timed
   - Form fields: Email only vs email + name
   - Offer: Lead magnet vs newsletter vs discount
   - Headline: Benefit-driven vs urgency vs curiosity

2. **Medium-impact tests** (expect 5-15% impact):
   - CTA button text: "Get Checklist" vs "Save Me 5 Hours"
   - Color: Primary color vs contrasting color for button
   - Image: With product screenshot vs without
   - Copy tone: Casual vs professional

3. **Testing process**:
   - Run test for 1-2 weeks (minimum 500 conversions)
   - Track popup views, submissions, conversion rate
   - Calculate statistical significance
   - Implement winner
   - Test next variation against winner

4. **Example test plan**:
   ```
   Week 1-2: Exit-intent popup with "Get Checklist" CTA vs Control (no popup)
   Result: +25% email capture, implement winner

   Week 3-4: Test form fields - Email only vs Email + Name
   Result: Email only converts 8% higher, keep email-only

   Week 5-6: Test headline - "Save 5 hours/week" vs "The checklist top teams use"
   Result: Urgency-based wins; implement
   ```

### Step 8: Popup Performance Measurement

**Track these metrics to evaluate popup effectiveness:**

1. **Core metrics**:
   - Popup views: # visitors who see popup
   - Popup submissions: # who fill form and submit
   - Conversion rate: (Submissions / Views) × 100
   - Email capture rate: # emails captured / total page visits
   - CTR: (Clicks / Views) × 100 (for non-form popups)

2. **Secondary metrics**:
   - Page bounce rate: Is popup increasing bounce? (should decrease or stay flat)
   - Time on page: Are users leaving faster? (monitor for negative impact)
   - Scroll depth: Are users reading less? (monitor for cannibalization)
   - Return rate: Are popup visitors returning? (measure repeat visits)

3. **Email list metrics** (post-popup):
   - Email open rate from popup subscribers
   - Click rate (actions from popup email)
   - Unsubscribe rate (if newsletter)
   - Conversion rate (popup subscriber → customer)

4. **ROI calculation**:
   ```
   Monthly emails captured from popup: X emails
   Monthly conversion rate (email → customer): Y%
   Customers from popup: X × Y
   Revenue per customer: Z
   Monthly revenue from popup: X × Y × Z
   Popup cost: $0 (if using free tool)
   ROI: Infinite (or very high)
   ```

### Step 9: Popup Frequency & Capping

**Show popups strategically; don't annoy users.**

1. **First-time visitor**:
   - Show popup after 10-30 seconds or 50% scroll (they're engaged)
   - Exit-intent popup if they're leaving (last-chance capture)

2. **Returning visitor** (tracked via cookie):
   - Show different offer (don't repeat same popup)
   - Wait 24-48 hours from last popup
   - Reduce frequency (returning visitors = less likely to convert)

3. **Dismissed popup**:
   - Wait 24 hours before showing again
   - After 3 dismissals, wait 7-14 days (user said no 3x)

4. **Converted user** (email captured):
   - Never show same popup (they already converted)
   - Show different popup max 1x per 7 days (don't overdo it)

5. **Implementation in tools**:
   - Use cookie to track: popup_view_count, last_popup_date
   - Use cookie to track: email_captured_from_popup
   - Set expiration dates for cookies

### Step 10: Privacy & Legal Compliance

1. **GDPR Compliance** (if EU users):
   - Opt-in by default (don't pre-check email signup)
   - Clear privacy notice: "We respect your privacy"
   - Link to privacy policy
   - Easy unsubscribe from future emails
   - Don't capture email without explicit consent

2. **CAN-SPAM Compliance** (if US email list):
   - Physical mailing address in emails
   - Clear unsubscribe mechanism
   - Honor unsubscribe within 10 days
   - Accurate subject lines

3. **Privacy policy link**:
   - Include in every popup with email capture
   - "By signing up, you agree to our privacy policy"
   - Link directly to policy

## Output Format

Document popup optimization in this structure:

```
POPUP CRO REPORT
Website: [Domain]
Current popup conversion rate: X%
Current email capture rate: Y/month
Bounce rate with popup: Z%

CURRENT STATE AUDIT:
Popup types: [List - exit-intent, scroll-triggered, etc.]
Trigger conditions: [Describe when popups show]
Form fields: [Email, name, etc.]
Current offer: [What's being offered?]
Mobile compliance: [Google interstitial status]

IDENTIFIED ISSUES:
1. [Issue]: [Impact on conversion]
2. [Issue]: [Impact]
3. [Issue]: [Impact]

OPTIMIZATION ROADMAP:
Quick Wins (1-week):
1. Add exit-intent popup: Expected capture increase +X%
2. Simplify form (email only): Expected conversion +X%
3. Improve CTA copy: Expected lift +X%

A/B Tests (2-4 weeks):
1. Test: Exit-intent vs scroll-triggered popup (hypothesis: +X% captures)
2. Test: Headline "Save 5 hours" vs "The checklist top teams use" (hypothesis: +X%)
3. Test: Lead magnet vs newsletter signup (hypothesis: +X% conversion)

Medium-term (4-8 weeks):
1. Implement segmented popups: Different offers for different pages
2. Add behavioral triggers: Inactivity, hover detection
3. Implement frequency capping: Smart show/hide logic

EXPECTED IMPACT:
Current email capture: Y/month
With optimizations: +X% (new rate: Y+X/month)
Additional emails/month: [X]
Revenue impact: [Y subscribers × Z conversion rate × A revenue/customer]

IMPLEMENTATION TIMELINE:
Phase 1 (Week 1): Remove current popup, implement exit-intent test [Date]
Phase 2 (Week 2-3): A/B test form fields [Date]
Phase 3 (Week 4-5): A/B test copy variations [Date]
Phase 4 (Week 6+): Implement winner; layer segmented offers [Date]

MAINTENANCE:
- Monitor conversion rate monthly
- A/B test 1 new variation per month
- Update offers quarterly (keep fresh)
- Monitor bounce rate (ensure popup isn't hurting UX)
```

## Common Popup Mistakes to Avoid

1. **Popup on page load**: Annoying; blocks content. Trigger after 10+ seconds instead.
2. **No exit button**: Increases frustration. Always include clear X.
3. **Too many fields**: Email only. Name can be collected later.
4. **Generic CTA**: "Submit" is boring. Use specific, benefit-driven CTAs.
5. **Weak offer**: "Subscribe to newsletter" isn't compelling. Offer real value (checklist, guide).
6. **Mobile disaster**: Full-screen popup on mobile = bounce. Make it mobile-friendly.
7. **No frequency cap**: Showing same popup 5x = annoyance. Cap at 1x per 24h.
8. **Doesn't match page**: Popup on product page offering "newsletter" doesn't convert. Match offer to page intent.
9. **No social proof**: Add "10k+ teams use this checklist" to build credibility.
10. **Not A/B testing**: Design popups based on data, not guesses.

## Tools & Resources
- **Intercom, Drift**: In-app messages, popups, live chat
- **Privy**: Popups, banners, forms (good for e-commerce)
- **ConvertKit**: Email popups with lead magnets
- **Optinmonster**: Popup builder with triggers and animations
- **Unbounce**: Landing pages with built-in popup features
- **Sumo**: Popups, heat maps, conversion tools
- **GetResponse**: Email popups, automation sequences

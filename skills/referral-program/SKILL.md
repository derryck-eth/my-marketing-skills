# Referral Program Skill

## Purpose
Design, build, and optimize referral, affiliate, and word-of-mouth programs that turn customers into growth drivers. This skill enables AI agents to create referral mechanics (one-sided vs. two-sided rewards), determine reward structures, calculate viral coefficient and growth impact, manage placement and discoverability, design ambassador programs, set up tracking and attribution, implement email/in-app prompts, and scale proven referral programs to drive sustainable, low-CAC customer acquisition.

## When to Use
- Need low-cost customer acquisition (referrals typically 3-5x lower CAC than paid ads)
- Have strong product-market fit and happy customer base
- Want organic growth alongside paid channels
- Limited marketing budget; want word-of-mouth leverage
- B2B SaaS (high-LTV, referral-friendly) or community-driven products
- Need to increase customer lifetime value (referrals often higher LTV than other channels)
- Want to reduce customer acquisition cost while scaling
- Have existing customer base willing to advocate
- Want to build network effects (product stronger with more users)
- Testing product before major paid ad investment

## Core Frameworks & Knowledge

### Referral Program Mechanics: One-Sided vs. Two-Sided Rewards

The core decision: Who gets rewarded when a referral converts?

#### One-Sided Rewards (Referrer Only Gets Reward)
**Structure**: "Refer a friend and earn $20 credit"
- Referrer gets reward (discount, cash, feature)
- Referred friend gets nothing (unless they become customer)
- Simplest to implement; lowest cost

**Pros**:
- Cheaper than two-sided (only one person rewarded)
- Simpler mechanics (easier to explain and track)
- Good for testing referral viability

**Cons**:
- Lower conversion rate of referrals (no incentive for referee)
- Referred friends less likely to sign up
- Perceived as less generous (might hurt brand)

**Best For**:
- Low-price products (friend doesn't need incentive)
- High-trust products (customers eager to refer)
- Early-stage testing (prove concept before investing more)

#### Two-Sided Rewards (Both Referrer AND Referee Get Reward)
**Structure**: "Refer a friend and earn $20; they get $20 off"
- Referrer gets reward (cash, credit, feature)
- Referred friend gets reward too (discount, credits, feature)
- Win-win incentive for both parties

**Pros**:
- Higher conversion rate (friend incentivized to join)
- More perceived value (both win)
- More viral (friend tells more people)
- Better long-term retention (referred customer satisfied with discount)

**Cons**:
- 2x cost per referral (both people rewarded)
- More complex to track and manage
- Higher abuse risk (fake referrals to get reward)

**Best For**:
- High-price or subscription products (discount incentive matters)
- Competitive markets (need incentive to stand out)
- Network-driven products (more users = more value)
- Scaling referral program (proven ROI, can afford higher cost)

#### Hybrid/Tiered Rewards
**Structure**: "Refer 1 friend → $10 credit. Refer 3 friends → $50 credit + exclusive feature"
- Rewards scale with number of referrals
- Encourages sustained referrals, not just one
- Can be one-sided, two-sided, or mixed

**Pros**:
- Rewards loyalty and repeat referrals
- Encourages multiple referrals from top advocates
- Creates "champion" or "ambassador" tier
- Higher perceived value for power users

**Cons**:
- More complex to explain and track
- Higher cost if not capped well
- Potential for abuse (referring non-genuine users)

**Best For**:
- Products with advocate community (Slack, Figma, Dropbox)
- Long customer lifetime value (can afford higher referral cost)
- Network effects (more users = product stronger)

### Reward Types & Structures

#### Reward Type Options

1. **Cash/Credit Rewards**
   - $20 cash, $50 account credit, etc.
   - Most flexible; customers can use how they want
   - Highest perceived value
   - Cons: Most expensive, requires payments infrastructure

2. **Discounts/Account Credits**
   - 20% off subscription, $50 off first month, etc.
   - Good for subscription products
   - Cheaper than cash (company retains margin)
   - Cons: Only valuable if customer would have paid; no liquid value

3. **Product/Feature Unlocks**
   - Extra seats, advanced features, integrations, etc.
   - No cash cost (internal cost only)
   - Increases usage/stickiness
   - Cons: Less immediately perceived value; must be features customers want

4. **Exclusive Access/Experiences**
   - Early access to new features, private community, annual conference pass, etc.
   - Highest-tier reward; signals exclusivity
   - Low cost but high perceived value
   - Cons: Limited availability; requires special ops

5. **Hybrid Rewards**
   - Combination: $10 credit + 5% discount for life + early feature access
   - Can optimize value perception vs. cost
   - Most flexible

#### Reward Sizing Best Practice
- **Sweet Spot**: Reward = 5-20% of new customer acquisition cost (CAC)
  - If typical CAC is $500, referral reward = $25-$100 per referral
  - Rule of thumb: Make referral more attractive than paid ads, but not give away margin
- **Tiered Approach**:
  - Base reward: $20-50 (covers admin cost of referral)
  - Goal reward (5-10 referrals): Extra $50-100
  - VIP reward (20+ referrals): Exclusive perks

### Referral Triggers: When to Ask for Referrals

Timing and context matter enormously for referral program success.

#### High-Conversion Referral Triggers

1. **Post-Purchase/Sign-Up** (First 24-48 hours)
   - User is most excited after buying
   - Momentum highest
   - Example: In welcome email, "Your friend will love this. Refer them and earn $20."

2. **First Value Achievement**
   - User gets first real value from product (first report created, first sale closed, etc.)
   - Proof product works (increases credibility of referral)
   - Example: "Congrats on your first customer! Refer more businesses like yours."

3. **Milestone Moments**
   - Subscription renewal (user finds value, continues paying)
   - Feature activation (user unlocked advanced feature)
   - Usage milestone (100 reports created, $1K in transactions, etc.)
   - Example: "You've closed 10 deals with Acme. Your network would love this too."

4. **Product-Triggered** (In-app prompts)
   - In-app modal or banner at relevant time
   - Contextual (relevant to what user just accomplished)
   - Example: Post-export popup: "Export complete! Tell a colleague about Acme."

5. **Engagement-Based** (Re-engagement opportunity)
   - User is active but not yet referred (re-engagement)
   - Lower-priority trigger; less effective than post-purchase
   - Example: Email to inactive referrers: "You love Acme. Help others discover it."

6. **Offboard Trigger** (Last resort)
   - User is canceling subscription
   - Try to retain through referral (small chance of influence)
   - Example: "Before you go, refer a friend for 3 months free access."

#### Frequency & Placement Strategy
- **Avoid Over-Asking**: Max 2-3 referral prompts per customer per month (avoid fatigue)
- **Context Matters**: Only ask after positive moment (not after user hits error or complains)
- **Multi-Channel**:
  - In-app: 1 popup or banner per month
  - Email: 1 referral email per month (in newsletter or post-milestone)
  - Dashboard: Referral widget always visible but non-intrusive
  - Share pages: Referral shareable asset (how-to guide, template)

### Viral Coefficient Calculation & Growth Modeling

Viral coefficient predicts how fast referral program drives growth.

#### Viral Coefficient Formula
```
Viral Coefficient (K) = (# Referrals Per User) × (Conversion Rate of Referral)

Example:
- Average user makes 2 referrals
- 30% of referred friends convert to customers
- K = 2 × 0.30 = 0.6
```

#### Viral Coefficient Interpretation
- **K < 1**: Sub-viral (requires continuous acquisition input to grow)
- **K = 1**: Linear growth (self-sustaining but slow growth)
- **K > 1**: Viral growth (exponential growth, fastest path to scale)
- **K > 1.5**: Highly viral (very fast growth, may outpace infrastructure)

#### Realistic Viral Coefficient Targets
- **Conservative**: K = 0.2-0.4 (solid base, requires acquisition to accelerate)
- **Moderate**: K = 0.5-0.8 (strong referral engine, meaningful contributor to growth)
- **Viral**: K = 1.0-1.5 (self-sustaining referral growth, very powerful)

#### Growth Projection with Viral Coefficient
```
Projected New Customers (Month N) = Initial Customers × (K^N)

Example (K = 0.6):
Month 0: 100 customers
Month 1: 100 + (100 × 0.6) = 160 customers
Month 2: 160 + (160 × 0.6) = 256 customers
Month 3: 256 + (256 × 0.6) = 410 customers

Example (K = 1.2, viral):
Month 0: 100 customers
Month 1: 100 + (100 × 1.2) = 220 customers
Month 2: 220 + (220 × 1.2) = 484 customers
Month 3: 484 + (484 × 1.2) = 1,061 customers
```

#### Improving Viral Coefficient
1. **Increase # Referrals Per User**: Better prompts, referral incentives
2. **Increase Conversion Rate**: Better friend targeting, stronger incentive for referee

### Referral Program Placement & Discoverability

Users won't use a referral program if they can't find it.

#### Primary Placement Locations

1. **In-App Placement** (Most effective for active users)
   - Dashboard widget (always visible, but non-intrusive)
   - Menu item ("Refer a Friend" in main menu)
   - Settings (less prominent, but option exists)
   - Sidebar (prominent on desktop, accessible on mobile)

2. **Email Placement** (Reaches all customer segments)
   - Transactional emails (welcome, billing, feature announcement)
   - Newsletter (monthly or weekly, casual mention)
   - Triggered emails (post-purchase, milestone, renewal)
   - Referral-specific email (dedicated program announcement)

3. **Landing Pages & Marketing**
   - Product page link ("Share Acme with others")
   - Pricing page (near CTA: "Get 3 months free when you refer")
   - About/values page (fit if referral aligns with brand)
   - Feature page (relevant to specific feature)

4. **Community & Advocacy**
   - Dedicated referral page (referral.company.com or /refer)
   - Social media bios/links (Twitter, LinkedIn, Instagram)
   - User forums/communities (not spammy; organic mention)
   - Partner pages (if B2B affiliate component)

#### Referral Program Discoverability Best Practices
- **Make it Easy**: 1-click referral sharing, clear instructions
- **Prominently Placed**: Visible without searching; dedicated page
- **Mobile-Friendly**: Works on phones (where most sharing happens)
- **Social-Ready**: Easy share to email, LinkedIn, Twitter, WhatsApp, SMS
- **Clear Incentive**: Customer should instantly understand reward
- **Non-Intrusive**: Doesn't feel spammy or desperate

### Affiliate vs. Referral Programs

Similar, but different mechanics and audience.

#### Affiliate Program (Third-party Promotion)
- **Audience**: External partners, influencers, content creators, agencies
- **Mechanics**: Partner creates content or shares link; earns commission on sales
- **Incentive**: 5-20% commission per sale (or flat fee per lead/signup)
- **Best For**: B2B SaaS, high-ticket products, communities with influencers
- **Tracking**: Affiliate link or unique discount code
- **Cost**: Higher CAC (15-30% of sale) but reaches new audiences
- **Examples**: ConvertKit (creator tools), Airtable, Stripe

#### Referral Program (Customer Advocacy)
- **Audience**: Existing customers, friends, warm network
- **Mechanics**: Customer refers friend; both get reward
- **Incentive**: Lower (often $10-50 or discount) because existing customer already aware
- **Best For**: Consumer products, high-frequency products, communities
- **Tracking**: Referral link or code
- **Cost**: Lower CAC (10-15% of sale) and higher trust
- **Examples**: Dropbox, Uber, Slack

#### Hybrid Model (Referral + Affiliate)
- **Referral Program**: For customers and warm network
- **Affiliate Program**: For external partners and influencers
- **Layered Approach**: Capture both internal advocacy and external reach
- **Best For**: Scaling products, large networks, multi-channel growth

### Email/In-App Referral Prompts & Copy

Where and how to ask for referrals matters as much as when.

#### Referral Prompt Copy Templates

**Template 1: Direct & Simple**
```
Subject: Share [Product] with your team (get $20 credit)

Hi [Name],

Love using [Product]? Your colleagues would too.

Refer them and both of you get $20 in credits.

[Refer Now] button → [referral landing page]

Thanks for spreading the word!
[Company]
```

**Template 2: Value-Forward (Benefit-First)**
```
Subject: Help [Your Friend] save time with [Product]

Hi [Name],

You know how [Product] saves you [specific benefit: 5 hours/week]?

Imagine what it could do for your team.

Refer [X] people and unlock [Feature/Reward].

[Share with Colleagues] button

[Company]
```

**Template 3: Milestone-Based (Celebratory)**
```
Subject: Congrats! You've [Achievement]. Now help others.

Hi [Name],

Amazing work—you've completed [#] projects with [Product]! 🎉

Your network would benefit from it too. Refer a friend and earn [Reward].

[Refer Now] button

[Company]
```

**Template 4: In-App Modal (Contextual)**
```
Headline: "Love this feature?"
Subheading: "Your colleagues would too."
CTA: "Share with your team" / "Refer a friend"
Social proof: "[500 teams referred someone this month]"
Close: "Maybe later" button (exit option)
```

#### Referral Prompt Best Practices
- **Benefit-Forward**: Lead with benefit to referee (e.g., "Help a friend get started")
- **Clear Incentive**: State reward clearly (e.g., "Both get $20 credit")
- **Social Proof**: Show that others are referring ("1,000+ referrals last month")
- **Simple CTA**: One primary action (not multiple options)
- **Mobile-Friendly**: Readable on phones; tappable buttons
- **Exit Option**: Allow user to dismiss without pressure
- **Non-Spammy**: Don't ask too frequently; ask at right moment

### Successful Referral Program Examples

#### Dropbox (Two-Sided, Highly Viral)
- **Mechanics**: Refer a friend → both get 500MB free storage
- **Why Worked**:
  - Two-sided reward (both benefit)
  - Valuable reward (storage is core product value)
  - Placed in-app and email prominently
  - Viral coefficient ~1.5 (exponential growth)
  - Simple to track (Dropbox link + email)
- **Result**: Grew to 500M users; referral was 2nd largest acquisition channel

#### Slack (Freemium + Referral)
- **Mechanics**: Two-sided: Referrer gets $100 account credit; referee gets discount
- **Why Worked**:
  - Network effects (product more valuable with more users)
  - Two-sided reward (both incentivized)
  - Embedded in product experience (easy in-app share)
  - Community-driven (tech-savvy audience loves to share)
- **Result**: Massive adoption; referral became dominant growth channel

#### Uber (One-Sided + Rider/Driver)
- **Mechanics**: Riders and drivers refer others; each gets credit (one-sided for each party)
- **Why Worked**:
  - Simple mechanics (easy to understand)
  - Valuable reward ($20-50 credit)
  - Placed in app, email, and SMS
  - Network effects (more drivers/riders = faster service)
  - Frequency opportunity (users ride/drive multiple times)
- **Result**: Primary growth driver for supply and demand sides

#### Figma (Ambassador + Referral)
- **Mechanics**: Customers refer companies ($1K+ reward); ambassadors get special status
- **Why Worked**:
  - High-price product (B2B design tool; large reward justified)
  - Two-tier system (referrers + ambassadors for community)
  - Network effects (more teams = better collaboration)
  - Product-ambassador fit (designers love to advocate)
- **Result**: Strong word-of-mouth growth; designer community champions

### Ambassador Programs (Scaling Referrals)

When individual referrals scale, formalize with ambassador program.

#### Ambassador Program Structure
1. **Tier 1: Brand Advocate**
   - Existing customers who actively refer
   - Reward: Discounts, exclusive features, swag, recognition
   - Commitment: Loose (no formal agreement needed)
   - Example: "Advocate" badge on LinkedIn, discount on annual plan

2. **Tier 2: Ambassador**
   - Formalized relationship; customer commits to advocacy
   - Reward: Exclusive perks, speaking opportunities, revenue share
   - Commitment: Modest (quarterly check-in, monthly sharing)
   - Example: Exclusive conference ticket, co-marketing opportunity

3. **Tier 3: Partner/Agency**
   - Dedicated relationship; ambassador resells or deeply integrates
   - Reward: 10-20% revenue share, co-marketing, integration spotlight
   - Commitment: Strong (quarterly business review, monthly sales target)
   - Example: Agency partner integrating product into service offering

#### Ambassador Program Management
- **Recruitment**: Identify top referrers organically; invite to program
- **Onboarding**: Provide resources (one-pagers, case studies, FAQs)
- **Support**: Dedicated contact, regular check-ins, exclusive community
- **Recognition**: Public credit (website, Twitter, conference), exclusive perks
- **Metrics**: Track referrals per ambassador, conversion rate, lifetime value

### Tracking, Attribution & Preventing Abuse

Proper tracking and fraud prevention critical for referral program ROI.

#### Tracking Methods

1. **Unique Referral Link**
   - Each customer gets custom referral link (e.g., ref.company.com/[unique_code])
   - Referred friend clicks link → system tracks source
   - Pros: Accurate tracking, easy implementation
   - Cons: Requires unique code generation, link decay if not shared properly

2. **Promo Code / Discount Code**
   - Referrer gets code (e.g., JOHN_SMITH_20) to share
   - Referee enters code at signup
   - Pros: Works offline, multiple shares possible, familiar to users
   - Cons: Users might forget code, less trackable (same code multiple uses)

3. **Email-Based Tracking**
   - Referrer submits friend's email
   - System sends referral email with tracking link
   - Referee clicks tracked link → signup
   - Pros: Cleaner UX, better data, easier opt-in compliance
   - Cons: Requires email infrastructure, potential spam issues

4. **CRM / Manual Tracking**
   - Referrer mentions referral source (e.g., "John Smith referred me")
   - Sales team manually credits referrer
   - Pros: Works for high-touch sales, builds relationship
   - Cons: Not scalable, prone to errors, labor-intensive

#### Fraud Prevention Tactics

1. **Verification Rules**
   - Referred customer must complete onboarding (not just sign up)
   - Referred customer must make purchase/upgrade (not free trial only)
   - Referred customer must remain active for 30 days (prevents refunds)
   - Delay payout until conditions met (e.g., referrer paid after 1 month)

2. **Detection Mechanisms**
   - Flag suspicious referrals (same IP address, rapid referrals, same last name)
   - Manual review for large payouts (>$500 reward)
   - Monitor for velocity fraud (100+ referrals in 1 week)
   - Require email verification (prevent same person, multiple emails)

3. **Terms & Conditions**
   - Explicitly prohibit self-referrals (customer referring themselves from different email)
   - Prohibit fake referrals (creating fake accounts to refer)
   - Prohibit family/household members (if company policy)
   - Prohibit incentive stacking (getting multiple rewards for same referral)
   - Approve T&Cs legally before launching

4. **Manual Review Process**
   - Set up monthly/quarterly audit of high-value referrals
   - Spot-check referrer-referee relationship (quick call or email)
   - Document all decisions (prevent disputes)
   - Build appeal process (referrer can dispute denied reward)

## Process (Step-by-Step)

### 1. Referral Program Strategy & Goal Setting
- [ ] Define business goal: CAC reduction, growth acceleration, viral loop, or customer satisfaction
- [ ] Set quantified targets:
  - Referral-sourced customers per month (e.g., 50 new customers from referrals)
  - Viral coefficient target (e.g., K = 0.5)
  - CAC target for referral channel (e.g., <$200)
  - Program ROI (reward cost vs. customer value)
- [ ] Identify target referrer audience:
  - Existing customers? Influencers? Both?
  - Referrer profile (job title, industry, company size)
  - What motivates them? (Cash, recognition, product features, community)
- [ ] Identify target referee audience:
  - Who benefits most from referral? (friends, colleagues, similar companies)
  - How similar are they to existing customer base? (more = easier conversion)
- [ ] Choose program type:
  - One-sided (referrer only reward) - simpler, cheaper to test
  - Two-sided (both reward) - more viral but higher cost
  - Tiered (rewards scale with referrals) - retain top advocates
  - Affiliate (external partners) - reach new audiences
  - Hybrid (multiple programs simultaneously) - capture all opportunities

### 2. Reward Structure Design
- [ ] Determine reward type(s):
  - Cash/credits? Discounts? Product features? Exclusive access? Hybrid?
  - Ensure reward is valuable to referrer and attractive to referee
- [ ] Size the reward:
  - Calculate typical CAC: How much do you spend on paid ads to acquire customer?
  - Set referral reward = 10-20% of CAC (cheaper than paid, still meaningful)
  - Example: If CAC = $500, set reward = $50-100 per referral
- [ ] Design tiered rewards (if applicable):
  - Tier 1 (1-5 referrals): Base reward (e.g., $20 credit)
  - Tier 2 (5-10 referrals): Enhanced reward (e.g., $20 + upgrade discount)
  - Tier 3 (10+ referrals): Premium reward (e.g., exclusive feature, annual discount)
- [ ] Calculate program cost:
  - Project expected referral volume (use historical if available, or estimate 5-10% of customer base)
  - Calculate total reward cost (volume × average reward)
  - Compare to other CAC channels (paid ads, marketing, sales)
  - Ensure ROI is positive (referral CAC < product gross margin)
- [ ] Document reward mechanics:
  - Exactly what does referrer get? When do they get it? How do they claim it?
  - Exactly what does referee get? When? How?
  - Example: "Referrer gets $20 account credit after referee completes first purchase. Referee gets 20% off first month."

### 3. Mechanics & Tracking Setup
- [ ] Choose tracking method:
  - Referral links (easiest for tech-savvy audience, best data)
  - Promo codes (familiar to users, works offline, less data)
  - Email-based (clean UX, good tracking, privacy-friendly)
  - CRM manual (best for B2B high-touch sales)
- [ ] Set up fraud prevention rules:
  - Self-referral check (same person, different emails)
  - Velocity check (too many referrals in short time)
  - Verification rules (payable only after X conditions met)
  - Manual review for high-value rewards (>$500)
- [ ] Define conversion criteria:
  - What counts as successful referral? (just signup? First purchase? 30-day active?)
  - When are rewards paid out? (immediately? After 30-day trial? After first payment?)
  - What disqualifies a referral? (high refund rate, churning, policy violation?)
- [ ] Set up reward payment infrastructure:
  - Account credits: Easy (built into system)
  - Cash/PayPal: Requires payment processor integration
  - Feature unlocks: Built into product
  - Discounts: Requires coupon code system
  - Swag/merchandise: Requires vendor relationship
- [ ] Build referral landing page:
  - Explain program clearly (benefit to referrer and referee)
  - Show reward prominently
  - Easy referral link generation/copying
  - Easy sharing to email, LinkedIn, Twitter, SMS
  - Social proof ("1,000+ customers referred someone")
  - FAQ (common questions)
  - Contact form (technical issues, unclear rewards)

### 4. Placement & Discovery
- [ ] Design in-app placement:
  - Dedicated page or menu item ("Refer a Friend")
  - Dashboard widget (always visible, non-intrusive)
  - Contextual prompts (after positive moments)
  - Settings option (always available)
- [ ] Design email placement:
  - Welcome email (new customer, high enthusiasm)
  - Transactional emails (post-purchase, invoice, feature announcement)
  - Monthly newsletter (casual mention)
  - Triggered emails (milestone, renewal, churn risk)
  - One dedicated referral email (quarterly announcement)
- [ ] Create referral landing page:
  - Public URL (referral.company.com or company.com/refer)
  - SEO-optimized (target "refer [company]" keywords)
  - Mobile-responsive
  - Single CTA (refer now or sign in)
  - Clear value prop and social proof
- [ ] Add to marketing channels:
  - Product page link (CTA: "Share with your team")
  - Pricing page (mention referral discount)
  - Social media profiles (bio, regular posts)
  - User community/forums (organic mentions, not spammy)

### 5. Messaging & Copy Creation
- [ ] Write referral email copy:
  - Subject line that conveys benefit or urgency
  - Body: Benefit to referee first, then referrer incentive
  - CTA: Clear, single button ("Refer Now" or "Share with a Friend")
  - Social proof: Number of people who've referred
- [ ] Write in-app copy:
  - Modal headline: "Love [Product]? Share it."
  - Subheading: Explain benefit to referee
  - Incentive: State reward clearly
  - CTA: One button ("Share" or "Refer Now")
  - Exit: "Maybe later" option (non-pushy)
- [ ] Write referral landing page copy:
  - H1: "[Company] Referral Program: Earn [Reward]"
  - Intro: Explain what program is, benefit to both parties
  - How it works: Step-by-step simple process
  - Reward details: Exactly what both parties get
  - CTA: Easy referral flow
  - FAQ: Address common questions
- [ ] A/B test copy:
  - Test hook (benefit-forward vs. incentive-forward)
  - Test incentive statement ("$20 credit" vs. "Get $20 and your friend gets 20% off")
  - Test CTA text ("Refer Now" vs. "Share with Colleagues")
  - Measure conversion rate of each

### 6. Soft Launch & Testing
- [ ] Soft launch to subset of customers:
  - Launch to top 10-20% of customers (most engaged, most likely to refer)
  - Gather feedback (survey, interview)
  - Monitor adoption rate (what % are trying referral?)
  - Monitor conversion rate (what % of referrals convert?)
- [ ] Measure key metrics:
  - Referral signup rate (% of customers using referral)
  - Referrals per active user (average # referrals per referrer)
  - Conversion rate of referrals (% of referred friends who convert)
  - Viral coefficient (referrals per user × conversion rate)
  - Cost per acquisition (reward cost ÷ # customers acquired)
- [ ] Optimize based on findings:
  - If adoption low: Improve visibility (email, in-app prompts)
  - If conversion rate low: Improve reward (make more attractive to referee)
  - If viral coefficient <0.2: Reconsider program structure
  - If CAC >2x product margin: Reduce reward or tighten conversion criteria
- [ ] Gather qualitative feedback:
  - Ask referrers: "Why did you refer?" "What made it easy/hard?"
  - Ask referees: "How did you hear about us?" "Did referral reward help?"
  - Look for friction (technical issues, unclear instructions)

### 7. Full Launch & Optimization
- [ ] Roll out to entire customer base:
  - Email announcement (explain program, send referral link)
  - In-app notification (prominent, but not intrusive)
  - Blog post (explain, celebrate, encourage)
- [ ] Ongoing optimization (monthly):
  - Track new metrics:
    - New referrals per month
    - Total customers sourced from referrals
    - CAC from referral channel
    - LTV of referred customers (compare to other channels)
  - Analyze referrer profiles:
    - Who refers most? (role, industry, customer segment)
    - Who converts most? (quality of referrals)
    - Pattern: What type of customer becomes best referrer?
  - Optimize prompts:
    - Test email frequency (1x/month vs. 1x/quarter)
    - Test in-app timing (immediately post-purchase vs. after 1-week usage)
    - Test CTA text
- [ ] Monitor and prevent fraud:
  - Monthly review of large rewards (>$500)
  - Quarterly full audit of program (spot-check 5-10 referrals)
  - Build case-by-case review process for disputed rewards

### 8. Scaling & Ambassador Program
- [ ] Identify top referrers (10-20 customers with 5+ referrals each)
- [ ] Invite top referrers to ambassador program:
  - Email invitation (exclusive, personal)
  - Offer extra perks (higher rewards, exclusive features, recognition)
  - Propose formal relationship (meet quarterly, help market)
- [ ] Create ambassador tier:
  - 10-20% revenue share on referrals (vs. fixed reward for regular program)
  - Dedicated contact, support
  - Co-marketing opportunities (guest blog, case study, webinar)
  - Exclusive community (slack, monthly calls)
  - Public recognition (website, Twitter, conference)
- [ ] Measure ambassador program ROI:
  - Customer acquisition from ambassadors vs. regular program
  - LTV of ambassador-sourced customers
  - Program cost (exclusive perks, revenue share)
  - Compare to other CAC channels

## Output Format

### Referral Program Specification
```
Program Name: [Program Name]
Launch Date: [Date]
Target Referrer: [Customer segment, persona]
Target Referee: [Similar customers, specific industry]

REWARDS STRUCTURE
├── Referrer Reward: [Type and amount]
│   └── Delivery: [When/how delivered]
├── Referee Reward: [Type and amount]
│   └── Delivery: [When/how delivered]
├── Tiered Rewards:
│   ├── Tier 1 (1-5 referrals): [Reward]
│   ├── Tier 2 (5-10 referrals): [Reward]
│   └── Tier 3 (10+ referrals): [Reward]
└── Total Cost per Referral: $[Average]

CONVERSION CRITERIA
├── Signup Counts As: [Registered email]
├── First Purchase Counts As: [Completed transaction]
├── Conversion Counts As: [Trial → paid, or purchase]
├── Payout Conditions: [30-day active, no refund, etc.]
└── Disqualification Triggers: [Refund, churn, policy violation]

TRACKING & MECHANICS
├── Tracking Method: [Referral links / Promo codes / Email]
├── Unique Code Generation: [Automated / Manual]
├── Fraud Prevention:
│   ├── Self-referral check: [Enabled]
│   ├── Velocity limits: [Max X referrals/week]
│   ├── Manual review threshold: [$X reward]
│   └── Verification rule: [Email confirmed, 30-day active]
└── Dispute Resolution: [Process for contested rewards]

PLACEMENT & VISIBILITY
├── Primary Location: [In-app referral page / Dashboard widget]
├── Secondary Locations: [Email, landing page, social]
├── Email Frequency: [1x/month, triggered, etc.]
├── In-App Prompts: [Frequency, triggers, timing]
└── Call-to-Action: [Link, button text, messaging]

METRICS & TARGETS
├── Adoption Rate Target: [% of customers using program]
├── Referrals Per Active User: [Target: X]
├── Conversion Rate: [Target: X%]
├── Viral Coefficient: [Target: K = X]
├── CAC Target: [$X per customer]
└── ROI Target: [X% return on reward investment]

LAUNCH TIMELINE
├── Week 1: [Setup, test, soft launch to top customers]
├── Week 2: [Monitor metrics, gather feedback]
├── Week 3-4: [Optimize, full launch]
└── Ongoing: [Monthly optimization, quarterly review]
```

### Referral Program Performance Report
```
Program: [Program Name]
Month: [Month/Year]
Status: [Testing / Scaling / Mature]

PARTICIPATION METRICS
├── Total Customers: [#]
├── Customers Using Referral: [#] ([%] adoption rate)
├── Active Referrers (1+ referral): [#]
└── Top Referrer: [Customer name, # referrals]

REFERRAL ACTIVITY
├── Total Referrals: [#] (new this month: [#])
├── Referrals Per Active User: [#]
├── Monthly Growth Rate: [+X% from prior month]
└── Referrals in Pipeline: [#] (awaiting conversion)

CONVERSION PERFORMANCE
├── Referrals to Signups: [#] / [#] referrals ([%] conversion)
├── Referrals to Customers: [#] / [#] referrals ([%] conversion)
├── Viral Coefficient (K): [#] (target: [#])
├── Avg Time to Convert: [# days]
└── Referred Customer LTV: $[X] (compare to other channels)

FINANCIAL PERFORMANCE
├── Total Rewards Paid: $[X]
├── Reward Cost per Referral: $[X]
├── Reward Cost per Customer Acquired: $[X]
├── Customer Acquisition Cost (CAC): $[X]
├── Customer Lifetime Value (LTV): $[X]
├── LTV:CAC Ratio: [X:1]
└── Program ROI: [X%]

AUDIENCE ANALYSIS
├── Top Referrer Profile: [Role, industry, company size]
├── Most Referred Company Type: [Industry, company size]
├── Geographic Spread: [Primary countries/regions]
└── Network Pattern: [High clustering vs. geographically diverse]

TOP PERFORMERS
├── Top Referrer: [Name, # referrals, conversion rate]
├── Best-Converting Referrer: [Name, conversion rate]
├── Highest LTV Referee: [Customer name, LTV]
└── Strongest Network: [Geographic region or industry]

ISSUES & OPPORTUNITIES
├── Adoption Barrier: [Low visibility, unclear rewards, friction]
├── Conversion Issue: [Low referee conversion rate reason]
├── Fraud Detected: [Type of fraud, # instances]
└── Top Opportunity: [Increase referrals, improve conversion, expand to new audience]

RECOMMENDATIONS
├── Action 1: [Specific optimization]
├── Action 2: [Test or scaling opportunity]
└── Action 3: [New feature or expansion]

NEXT MONTH FOCUS
├── Priority: [Adoption, conversion, or expansion]
├── Test: [New messaging, incentive, or placement]
└── Expected Impact: [Projected referral increase, CAC decrease]
```

### Referral Program Email Template
```
Subject Line: [Benefit-forward or incentive-forward hook]

---

Hi [Customer Name],

[Opening: Acknowledge their success or positive moment]
You've been awesome with [Product]. Your team is crushing it with [specific value].

[Benefit to Referee]
Imagine what [Product] could do for your colleagues/network. [Specific use case or problem it solves].

[Incentive]
Here's the good news: Refer a friend and you both get [Reward].
You get [Your Reward]. They get [Their Reward].

[CTA]
Ready to spread the word? [REFER A FRIEND button]

[Social Proof]
[Number] teams just like yours have already referred colleagues.

[Closing]
Questions? [Support link or email]

Thanks for helping us grow,
[Company Name]
```

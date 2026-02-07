# A/B Test Setup

## Purpose
Design, set up, and execute A/B tests (split tests) that measure the impact of changes on key metrics. A/B testing is the foundation of data-driven conversion optimization, allowing you to move beyond guesswork and validate hypotheses with statistical rigor.

## When to Use
- You need to determine which version of a page element, copy, or design performs better
- You want to prove a change drives measurable business impact before full rollout
- You're optimizing critical conversion points (signup, checkout, pricing)
- You need to prioritize competing optimization ideas with real data
- You want to establish a testing culture that reduces decision-making bias
- You're scaling or iterating on winning variations

## Core Frameworks & Knowledge

### Statistical Foundations
- **Null Hypothesis**: The default assumption that both variations perform equally
- **P-value & Statistical Significance**: At 95% confidence level, p-value must be ≤ 0.05 (5% chance results occurred by random variation)
- **Power**: The probability of detecting a true effect if one exists; aim for 80%+ power
- **Sample Size**: Larger differences need fewer visitors; smaller improvements need more data
- **Type I Error (False Positive)**: Declaring a winner when no real difference exists
- **Type II Error (False Negative)**: Missing a real winner due to insufficient data

### Testing Best Practices
- **Winner Duration**: Run minimum 1-2 weeks to account for weekly variation (weekday vs weekend traffic patterns)
- **Minimum Sample Size**: Calculate before launch; stopping early inflates false positive risk
- **One Variable per Test**: Test one element at a time to isolate impact
- **Traffic Split**: 50/50 split unless sample size requires longer test duration
- **Avoiding Peeking**: Checking results daily and stopping when "significant" inflates Type I error

## Process

### Step 1: Hypothesis Formation
1. Identify a metric you want to improve (conversion rate, click-through rate, sign-up rate, AOV)
2. Analyze user behavior data, feedback, heatmaps, or session recordings to identify friction
3. Form a specific, testable hypothesis: "Changing the CTA from 'Submit' to 'Get Started' will increase signup conversion by 5-10% because it's more action-oriented"
4. Document your hypothesis in a testing roadmap
5. Assign an expected lift based on similar tests (micro-copy: 2-5%, design: 5-15%, social proof: 3-8%)

### Step 2: Define Your Variant
1. Decide what single element to change (headline, button color, form field, copy, layout)
2. Create the variant that tests your hypothesis; keep the control unchanged
3. For multivariate considerations: if testing multiple elements, run sequential tests, not simultaneous
4. Get design/copy approval before launch
5. Document the exact change and rationale

### Step 3: Calculate Sample Size
Use an A/B test calculator (VWO, Optimizely, or free tools):
- **Inputs**: Current conversion rate, expected lift, confidence level (95%), statistical power (80%)
- **Example**: 2% baseline, 10% relative improvement = ~25,000 visitors per variation at 95% confidence
- **Calculation**: Higher lift expectations = fewer visitors needed
- **Output**: Total visitors needed and estimated test duration (current monthly traffic / 2)

### Step 4: Set Up in Testing Tool

#### Google Optimize (Free, integrated with GA4)
1. Connect to Google Analytics 4 property
2. Create a new A/B experiment
3. Add experiment variant (changes are made via element targeting or custom JavaScript)
4. Define success metric (conversion event tracked in GA4)
5. Set traffic allocation (usually 50/50)
6. Set minimum sessions for statistical significance
7. Review targeting rules (which pages/users see the test)

#### VWO (Visual Editor, more flexible)
1. Create new A/B test campaign
2. Select pages where test runs
3. Use visual editor to create variant (no coding required)
4. Create winning condition (tracks conversion events)
5. Define sample size and test duration upfront
6. Launch test
7. Monitor with VWO's built-in stats calculator

#### Optimizely (Advanced, multiple testing types)
1. Create new A/B test experience
2. Target audience (percent allocation, device type, geo)
3. Edit experience using visual editor or code
4. Set success metrics (primary and secondary)
5. Set test duration and statistical threshold
6. Allocate traffic (even or weighted split)
7. Launch and monitor

### Step 5: Pre-Launch Checklist
1. QA both control and variant across devices (desktop, mobile, tablet)
2. Check that tracking pixels fire correctly
3. Verify conversion events are tracking in analytics
4. Confirm test doesn't conflict with other active tests
5. Document test in internal wiki with hypothesis, variant details, launch date
6. Notify stakeholders of launch date

### Step 6: Monitoring (Avoid Peeking)
1. Week 1: Monitor for technical issues, not statistical results
2. Week 2+: Check performance via reporting dashboard
3. Avoid checking daily and making decisions based on incomplete data
4. Trust your pre-calculated sample size; don't stop early
5. Flag any technical anomalies (tracking breaks, traffic drops)
6. Only look at overall statistical significance after minimum sample size is reached

### Step 7: Analyzing Results
1. **Statistical Significance**: Is p-value ≤ 0.05 (95% confidence)?
2. **Effect Size**: What's the percentage lift? 2% improvement isn't practical if traffic drops
3. **Segmented Analysis**:
   - Does variant perform better for mobile vs desktop?
   - Does new traffic (first-time visitors) convert differently?
   - Does variant help certain user segments?
4. **Secondary Metrics**: Did the variant impact engagement, bounce rate, or other metrics negatively?
5. **Practical Significance**: Is the improvement worth the implementation effort and risk?

### Step 8: Documentation & Rollout
1. Document results: hypothesis, variant details, statistical significance, lift %, segments
2. Add to internal knowledge base (testing playbook, learning library)
3. If winner: plan rollout to 100% of traffic (may be gradual to monitor)
4. If no winner: document why it failed; extract learnings
5. If negative result: explain why variant underperformed for future iterations

## What to Test (Priority Order)

### High-Impact Areas
1. **Call-to-Action (CTA)**
   - Button text: "Get Started" vs "Start Free Trial" vs "Join Now"
   - Button color: Primary color vs contrasting color
   - Button placement: Above fold vs sticky footer vs multiple CTAs
   - Copy: "Sign Up Free" vs "See Plans & Pricing"

2. **Headlines & Value Prop**
   - Benefit-driven: "Save 10 hours/week" vs generic "Productivity tool"
   - Emotional vs rational: "Never miss a deadline" vs "Task management system"
   - Specific vs vague: "Reduce churn by 20%" vs "Improve retention"

3. **Form Optimization**
   - Field count: 3-field form vs 5-field form (reduces abandonment)
   - Required fields: Minimum required vs optional fields
   - Single-step vs multi-step forms (depends on segment)
   - Social proof near form (customer logos, testimonials)

4. **Pricing & Trial**
   - Price points: $29 vs $39 vs $49 (smaller increments for higher prices)
   - Trial length: 7 days vs 14 days vs 30 days
   - Payment method: Credit card vs no payment upfront
   - Pricing presentation: Simple vs detailed feature comparison

5. **Social Proof & Trust**
   - Customer logos: With vs without on landing page
   - Testimonials: Video testimonials vs written reviews
   - Trust badges: Security seals, certifications, awards
   - Reviews: Star rating vs number of reviews vs both

6. **Design & Layout**
   - Hero image: Product screenshot vs lifestyle photo vs animation
   - Feature section: 2 columns vs 3 columns
   - Comparison table: Basic vs detailed feature list
   - Footer: Standard vs sticky CTA footer

### Medium-Impact Areas
- Navigation: Sticky vs standard header
- Form labels: Placeholder text vs above field
- Copy length: Short vs long form copy
- Video: With product demo vs without

### Lower-ROI Areas (Test after high-impact wins)
- Font changes
- Spacing/padding
- Animations
- Border radius or subtle design changes

## Common Pitfalls to Avoid

### 1. Peeking at Results
**Problem**: Checking daily and stopping when p-value hits 0.05 inflates false positive rate
**Solution**: Commit to sample size before launch; only check after minimum data collected

### 2. Underpowered Tests
**Problem**: Running test with 100 visitors when 25,000 needed; noise overwhelms signal
**Solution**: Use sample size calculator; smaller lifts require larger samples (power = 80%)

### 3. Test Duration Too Short
**Problem**: Running test 3 days misses weekly variation (weekday traffic differs from weekend)
**Solution**: Minimum 1-2 weeks; 2 full weeks accounts for day-of-week effects

### 4. Multiple Comparisons Problem
**Problem**: Testing 5 variants + looking at 10 metrics = 50 comparisons; at 95% confidence, ~2 "winners" by random chance
**Solution**: Define primary metric before test; treat secondary metrics as supporting evidence

### 5. Test-Treatment Interaction
**Problem**: Variant performs well in isolation but creates negative side effects (e.g., more signups but lower quality users)
**Solution**: Monitor secondary metrics during test (bounce rate, time on page, subsequent engagement)

### 6. Insufficient Traffic
**Problem**: Small sites struggle to reach sample size; test runs for months
**Solution**: Pool traffic (test across multiple pages), run sequential tests, or use Bayesian methods

### 7. Wrong Baseline Assumptions
**Problem**: Assuming 2% conversion rate when actual is 0.5%; test under-powered
**Solution**: Pull real baseline metrics from analytics before calculating sample size

### 8. No Rollout Plan
**Problem**: Test wins but no clear process to implement for 100% of users
**Solution**: Document rollout plan upfront (full traffic, staged, time-locked)

## Output Format

Document results in this structure:

```
TEST ID: [Date-Page-Hypothesis]
HYPOTHESIS: [Clear statement of expected outcome]
TEST DURATION: [Start date - End date]
TRAFFIC ALLOCATION: [Split percentage]

RESULTS:
- Control: X% conversion (Y visitors)
- Variant: Z% conversion (W visitors)
- Lift: [+/-]% (relative improvement)
- P-value: 0.XX (95% confidence? Yes/No)
- Statistical Significance: [Yes/No]
- Confidence: [95%/90%/Not reached]

SEGMENTS:
- Desktop: [Lift %]
- Mobile: [Lift %]
- New users: [Lift %]
- Returning users: [Lift %]

DECISION: [Roll out / Keep testing / Implement variant]
LEARNING: [Why did variant win/lose? What to test next?]
IMPLEMENTATION: [Rollout plan, date, rollback plan]
```

## Tools Reference

- **Google Optimize** (Free): Analytics integration, visual editor, limited audience targeting
- **VWO** (Paid, $300+/mo): Visual editor, heatmaps, form analytics, sample size calculator
- **Optimizely** (Enterprise): Advanced segmentation, personalization, multivariate testing
- **Unbounce** (Paid): Landing page builder with built-in A/B testing
- **ConvertKit** (Email): A/B test email subject lines, send times
- **Segment** (Data): Sends test data to your analytics/warehouse for custom analysis

## Key Metrics to Track

- Primary Metric: Conversion rate (signup, trial, purchase)
- Secondary Metrics: Bounce rate, time on page, scroll depth, traffic quality
- Stat Significance: P-value must be ≤ 0.05
- Confidence Level: Aim for 95% (sometimes 90% acceptable for small lifts)
- Sample Size: Never stop early; run test until minimum sample reached

# Onboarding CRO

## Purpose
Optimize the post-signup activation and onboarding experience to reduce time-to-value, increase activation rate (users performing key action), and prevent new user churn. Onboarding converts signups into active users; poor onboarding kills retention even if you excel at acquisition. Companies with optimized onboarding see 2-3x higher week-1 retention.

## When to Use
- Your signup-to-activation conversion rate is below 30% (aim for 40%+)
- New users aren't reaching "aha moments" quickly enough
- You're losing users in first 7 days (highest churn period)
- Your product is complex and needs guided setup
- You want to reduce onboarding time from hours to minutes
- You're testing different onboarding flows for different user types
- You want to improve activation rate through segmented experiences

## Core Frameworks & Knowledge

### Activation vs Signup
- **Signup**: User creates account (beginning)
- **Activation**: User performs critical "aha" action that demonstrates product value
- **Aha moment**: When user first experiences core product benefit (usually 5-30 min into product)
- **Example**: Slack activation = first message sent to channel
- **Example**: Google Docs activation = first document created & shared
- **Example**: Stripe activation = first payment processed
- **Metric**: Activation rate = (Users reaching aha moment / Total signups) × 100

### Time-to-Value Optimization
- Reduce time between signup and first aha moment (target: 5-10 min)
- Remove non-essential setup steps
- Guide users directly to core feature
- Celebrate first action; build momentum
- Every extra step = 5-10% drop in activation

### Progressive Onboarding
- Don't teach everything in one flow
- Teach features in context when user needs them
- Interactive tours trigger when user is about to use feature
- Reduces cognitive load and improves retention
- Move advanced settings to "profile completion" phase

## Process

### Step 1: Define Your Activation Metric

1. **Identify aha moment**: What action proves product value?
   - Productivity app: Project created + task added
   - CRM: Contact added + email sent from system
   - Analytics tool: Data connected + first report generated
   - Collaboration tool: Document shared with team member
2. **Track activation in analytics**: Create conversion event "Activated"
3. **Measure baseline activation rate**: % of signups reaching aha moment in 24-48 hours
4. **Set activation target**: Typically 40-60% of signups should activate
5. **Segment by onboarding type**: Self-serve vs guided → may have different rates
6. **Document in analytics**: Tag activation event with user cohort, signup source, plan type

### Step 2: Map Current Onboarding Flow

1. **List every screen new user sees**:
   - Welcome/intro screen
   - Profile setup (name, photo, preferences)
   - Product tour/education screens
   - First action prompts
   - Setup wizard steps
2. **Measure drop-off at each step**: What % make it past each screen?
   - Screen 1: 100% reach
   - Screen 2: 70% complete
   - Screen 3: 45% complete
   - Aha moment: 30% reach
3. **Time each step**: How long does user spend on each screen?
4. **Identify bottlenecks**: Where do most users bail?
5. **Document user feedback**: Interview users on what confused them

### Step 3: Ruthless Onboarding Pruning

**Onboarding bloat kills activation. Every step costs 5-10% of users.**

1. **Audit every screen/step**: "Does this step move user toward aha moment?"
   - Essential: Steps required to create aha moment (keep)
   - Important: Steps that improve first experience (consider)
   - Nice-to-have: Can be postponed to in-app education (remove)

2. **Typical pruning recommendations**:
   - Remove: Long product education screens (move to help/tour)
   - Remove: Profile photo upload (can be later or optional)
   - Remove: Password reset tutorial (teach on first login)
   - Remove: Multiple choice preference questions (ask in-app when relevant)
   - Keep: Account creation (email, name minimum)
   - Keep: First core action (channel creation, document start, etc.)

3. **New goal onboarding flow**:
   - Sign up → Email verified → Create [core unit] → Aha moment → Next action
   - Time: 5-10 minutes for self-serve
   - Screens: 3-5 absolute maximum
   - Copy: Micro-copy, not tutorial text

### Step 4: Empty State Optimization

**Empty states appear when user completes onboarding but product looks bare. Drive them to next action.**

1. **Identify all empty states** in product:
   - Empty inbox
   - Empty project list
   - Empty dashboard
   - Empty feed

2. **For each empty state, provide**:
   - **Single clear CTA**: "Create your first project"
   - **Explanation**: "Your projects will appear here"
   - **Example data**: Show sample projects/templates
   - **Help link**: "Learn more about projects"
   - **Visual icon**: Empty state illustration

3. **Content template**:
   ```
   [Icon]
   Headline: "No projects yet"
   Description: "Create a project to organize your work"
   CTA: "New Project" [Button]
   Link: "See example projects"
   ```

4. **Test variations**:
   - CTA text: "New Project" vs "Create Project" vs "Get Started"
   - Visual: Icon only vs illustration vs empty state graphic
   - Copy tone: Friendly vs professional

### Step 5: Tooltip Tours & Interactive Guidance

**In-app tours should be contextual, not broadcast to everyone.**

1. **When to trigger tours**:
   - First time user opens a feature (e.g., first time looking at project settings)
   - User hovers over unlabeled UI element for 2+ seconds
   - User takes no action in section for 30 seconds
   - Not on first login (too overwhelming)

2. **Tour design best practices**:
   - **Keep short**: Max 3-4 steps per tour (5 steps = 50% drop)
   - **Sequential**: Step 1 → 2 → 3 with progress indicator ("Step 1 of 3")
   - **Highlight**: Pulse or dim surrounding elements to focus attention
   - **Dismissable**: Large X button to close anytime
   - **Action-oriented**: "Click here to create a project" (not "This is the create button")
   - **Next button prominent**: Make it obvious how to continue

3. **Tooltip content template**:
   ```
   Headline: "Create Your First Project"
   Body: "Projects help you organize all your work in one place"
   Action: "Create Project" [Button] | "Skip" [Link]
   ```

4. **Tools**: Pendo, Appcues, Userguiding, Intercom (all provide tour builders)

5. **A/B test tour variations**:
   - With tour vs without (expect 10-20% lift in activation)
   - Tour length: 2 steps vs 4 steps
   - Trigger: Immediate vs delayed 30 seconds
   - Messaging: Benefit-focused vs feature-focused

### Step 6: Segmented Onboarding by Persona

**Different user types need different onboarding paths.**

1. **Identify user segments**:
   - Company size: Solo vs team vs enterprise
   - Use case: Analytics vs collaboration vs automation
   - Product experience: First-time SaaS user vs power user
   - Signup source: Paid ads (higher intent) vs organic (curiosity-driven)

2. **Create branching onboarding**:
   ```
   Welcome screen → "What best describes you?"
   → Option A: "Solo freelancer" → Solo-optimized onboarding
   → Option B: "Building a team" → Team setup flow
   → Option C: "Enterprise" → Admin setup flow
   ```

3. **Tailor each path**:
   - **Solo path**: Quick, minimal setup; focus on personal productivity
   - **Team path**: Invite team members, set permissions, collaboration features
   - **Enterprise path**: SSO setup, admin console, compliance features

4. **Benefits of segmentation**:
   - Solo users don't see "invite teammates" (not relevant)
   - Team users go straight to team setup (relevant to their needs)
   - Higher activation rate because flow matches intent
   - Reduced cognitive load (show only relevant features)

### Step 7: Onboarding Email Sequence

**Email is your best tool to re-engage users who drop off from in-app flow.**

1. **Trigger-based email onboarding** (starts immediately after signup):
   - **Day 0 (Transactional)**: Confirmation email with activation link
   - **Day 1 (Engagement)**: Welcome email + first feature highlight
   - **Day 2 (Education)**: "Quick start guide" email with help video
   - **Day 3 (Action)**: "You're close! Complete your profile" + example

2. **Email content for each stage**:
   - **Confirmation**: "Confirm your email" CTA, security note
   - **Welcome**: Brand story, value prop, 1 quick-start video
   - **Education**: Feature explainer, 5-min tutorial video, case study
   - **Action**: "You haven't [completed aha moment] yet" → help section

3. **Best practices**:
   - Subject lines: Urgency or curiosity ("You're almost set up...")
   - Personalization: Use first name, reference signup reason
   - Single CTA per email: Don't overwhelm with multiple links
   - Short copy: 50-100 words max; link to help for details
   - Mobile-optimized: Most emails opened on mobile

4. **Re-engagement drip for inactive users** (if user doesn't activate):
   - **Day 5**: "Stuck? Here's a video walkthrough"
   - **Day 7**: "We noticed you haven't activated yet" + benefit reminder
   - **Day 14**: Final attempt: "Get started in 5 minutes" + offer support

### Step 8: Checklist Pattern for Onboarding

**Checklists reduce cognitive load and create momentum.**

1. **In-app checklist structure**:
   ```
   Welcome to [Product]! Complete these 5 steps:
   ☐ Step 1: Create an account (Done ✓)
   ☐ Step 2: Invite your team
   ☐ Step 3: Create your first project
   ☐ Step 4: Complete your profile
   ☐ Step 5: [Aha moment action]

   Progress: 40% Complete
   "You're on a roll! Complete the next step"
   ```

2. **Checklist benefits**:
   - Visual progress reduces overwhelm
   - Gamification (checking boxes) builds momentum
   - Clear next steps
   - Motivational copy acknowledges progress

3. **Checklist best practices**:
   - Show completed items (with checkmark) - feels like progress
   - Show current step prominently
   - Make each step actionable (not "Learn about X")
   - Estimate time for full completion
   - Celebrate when checklist done (unlock feature, badge, etc.)

4. **A/B test checklist variations**:
   - With checklist vs without (expect 15-25% lift)
   - Checklist length: 3 items vs 5 items vs 7 items
   - Messaging: Professional tone vs playful tone

### Step 9: Onboarding Metrics & Measurement

**Track these metrics to identify improvement opportunities:**

1. **Core activation metrics**:
   - Signup to activation time: Median hours to reach aha moment
   - Activation rate: % of signups reaching aha moment in 24 hours
   - Day 7 retention: % of activated users returning on day 7
   - Day 30 retention: % returning 30 days later

2. **Onboarding flow metrics**:
   - Drop-off by step: At which screen do most users exit?
   - Time per step: Median seconds spent on each onboarding screen
   - Completion rate: % of users finishing full onboarding
   - Bounce rate: % who never enter onboarding

3. **Segment analysis**:
   - Activation rate by source (organic vs ads vs partner)
   - Activation rate by plan type (free vs trial vs paid)
   - Activation rate by persona (solo vs team)
   - Activation rate by device (mobile vs desktop)

4. **Dashboard to track** (weekly):
   ```
   Week [#]: Onboarding Performance
   Signups: [#] new users
   Activated: [#] users ([X]% activation rate)
   Average activation time: [X] hours
   Day 7 retention: [X]%

   Bottleneck: [Step where most users drop off]
   Improvement from last week: [+X% or -X%]
   ```

### Step 10: Common Onboarding Optimization Wins

**High-impact, quick-to-implement improvements:**

1. **Remove one screen from flow**: Often yields 10-15% activation lift
2. **Add social proof**: Customer logos or review count → 2-5% lift
3. **Simplify password requirements**: From 15-char to 8-char → 5% lift
4. **Add email confirmation tooltip**: When to expect confirmation → 3% lift
5. **Add empty state CTAs**: Guide users after onboarding → 8% lift
6. **Shorten onboarding email sequence**: 5 emails → 3 emails → 5% open rate improvement
7. **Add progress indicator**: Show "Step 1 of 3" → 8% completion lift
8. **Reduce form fields**: Collect only essential info on signup → 10% lift

## Output Format

Document onboarding optimization in this structure:

```
ONBOARDING CRO REPORT
Product: [Product name]
Current Activation Rate: X%
Current Activation Time: [X hours median]
Day 7 Retention Rate: X%

CURRENT STATE AUDIT:
Onboarding steps: [#] screens
Critical drop-off point: [Step name] ([X]% reach)
Average time to activation: [X hours]
User feedback: [Key complaint themes]

IDENTIFIED ISSUES:
1. [Issue]: [Impact on activation rate]
2. [Issue]: [Impact]
3. [Issue]: [Impact]

OPTIMIZATION ROADMAP:
Quick Wins (2-week implementation):
1. Remove [screen]: Expected lift +X%
2. Add empty state CTA: Expected lift +X%
3. Simplify [step]: Expected lift +X%

Medium-term (4-week implementation):
1. Build segmented onboarding: Expected lift +X%
2. Create interactive tour: Expected lift +X%
3. Add onboarding checklist: Expected lift +X%

A/B Tests (ongoing):
1. Test: [Variant 1] vs [Variant 2] (hypothesis: +X% activation)
2. Test: [Variant 1] vs [Variant 2] (hypothesis: +X% activation)

EXPECTED IMPACT:
Current activation rate: X%
Quick wins: +X% (new rate: Y%)
Medium-term improvements: +X% (new rate: Z%)
Total target: Z% activation rate

ROLLOUT PLAN:
Phase 1 (Week 1-2): Remove non-essential steps [Date]
Phase 2 (Week 3-4): Add onboarding checklist [Date]
Phase 3 (Week 5-6): Segmented onboarding test [Date]
Phase 4 (Week 7+): Interactive tours, email optimization [Date]
```

## Key Principles Summary

1. **Faster is better**: Every minute saved = higher activation
2. **Context matters**: Show features when user needs them, not all at once
3. **Celebrate progress**: Every completed step should feel like a win
4. **Segment always**: Different user types need different paths
5. **Test everything**: Onboarding assumptions are wrong; validate with data
6. **Measure activation**: Not just signups; measure who reaches value
7. **Email supports**: In-app is primary; email rescues drop-offs
8. **Build momentum**: Each completed step makes next step more likely

## Tools & Resources
- **Pendo**: In-app guides, walkthroughs, feature adoption tracking
- **Appcues**: Interactive guides, surveys, segmentation
- **Userguiding**: Onboarding flows, tours, feedback widgets
- **Intercom**: Customer onboarding, automated messages, tours
- **Amplitude**: Behavioral analytics, funnel analysis, retention cohorts
- **Mixpanel**: Advanced activation metrics, user flow visualization

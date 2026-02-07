# Contributing

How to add or improve skills in this marketing skills collection.

## Adding a New Skill

1. Fork this repo and create a new branch
2. Create a folder inside `skills/` with a descriptive, hyphenated name
3. Add a `SKILL.md` file following this structure:

```markdown
# [Skill Name]

## Purpose
[What this skill does and what expertise it provides]

## When to Use This Skill
[Scenarios that should trigger this skill]

## Core Frameworks / Knowledge
[Main frameworks, best practices, and domain knowledge]

## Process: How to [Do the Thing]
[Step-by-step process — Step 1 should gather context from the user]

## Output Format
[Template for how the agent should structure its response]
```

4. Update `README.md` to list your new skill
5. Update `.claude-plugin/marketplace.json` with the new skill entry
6. Submit a pull request

## Improving an Existing Skill

- Fix errors or outdated information
- Add new frameworks or techniques
- Improve output format templates
- Add concrete examples
- Clarify agent instructions

## Adding a Tool Integration

1. Create a `.md` file in `tools/integrations/`
2. Cover: what the tool does, key capabilities, MCP connection steps, example queries
3. Update `tools/REGISTRY.md` with the new entry

## Guidelines

- Write for an AI agent audience — be specific and actionable
- Include concrete examples, not just abstract advice
- Use tables for structured information
- Test your skill with an AI agent before submitting

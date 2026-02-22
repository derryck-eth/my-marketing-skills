import { promises as fs } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("../../../", import.meta.url)));
const skillsDir = resolve(repoRoot, "skills");

function normalizeSkillId(skillId) {
  return String(skillId || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

export function getRepoRoot() {
  return repoRoot;
}

export function getSkillsDir() {
  return skillsDir;
}

export function getSkillPath(skillId) {
  return resolve(skillsDir, normalizeSkillId(skillId), "SKILL.md");
}

export async function listSkills() {
  const entries = await fs.readdir(skillsDir, { withFileTypes: true });
  const skillIds = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillPath = resolve(skillsDir, entry.name, "SKILL.md");
    try {
      await fs.access(skillPath);
      skillIds.push(entry.name);
    } catch {
      // Skip directories that are not valid skills.
    }
  }

  return skillIds.sort();
}

export async function readSkill(skillId) {
  const path = getSkillPath(skillId);
  const content = await fs.readFile(path, "utf8");
  return {
    id: normalizeSkillId(skillId),
    path,
    content
  };
}

export async function readManySkills(skillIds) {
  const items = [];
  for (const skillId of skillIds) {
    try {
      const skill = await readSkill(skillId);
      items.push(skill);
    } catch {
      // Ignore missing skills so the caller can proceed with partial data.
    }
  }
  return items;
}


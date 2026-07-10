import { z } from 'zod';

export const PackageJsonSchema = z.object({
  name: z.string().optional(),
  version: z.string().optional(),
  dependencies: z.record(z.string()).optional(),
  devDependencies: z.record(z.string()).optional(),
});

export type PackageJson = z.infer<typeof PackageJsonSchema>;

export async function readPackageJson(path: string): Promise<PackageJson> {
  const fs = await import('node:fs/promises');
  const content = await fs.readFile(path, 'utf-8');
  const parsed = JSON.parse(content);
  return PackageJsonSchema.parse(parsed);
}

export function updateDependency(
  pkg: PackageJson,
  depName: string,
  newVersion: string,
): PackageJson {
  const updated = { ...pkg };
  if (updated.dependencies?.[depName] !== undefined) {
    updated.dependencies = { ...updated.dependencies, [depName]: newVersion };
  } else if (updated.devDependencies?.[depName] !== undefined) {
    updated.devDependencies = { ...updated.devDependencies, [depName]: newVersion };
  }
  return updated;
}

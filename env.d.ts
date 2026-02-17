interface KVNamespace {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
}

declare const PROJECTS_KV: KVNamespace
declare const SKILLS_KV: KVNamespace

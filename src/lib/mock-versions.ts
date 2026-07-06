export type VersionEntry = {
  version: string; date: string; kind: "major" | "minor" | "patch";
  notes: string[]; downloads: number;
};

export const assetVersions: Record<string, VersionEntry[]> = {
  a1: [
    { version: "v1.4", date: "2087-04-12", kind: "minor", downloads: 412,
      notes: ["Added 12 new tile variants for rain puddles", "Improved auto-tile rules on chain-link fence", "Fixed Z-order bug on street-lamp overlap"] },
    { version: "v1.3", date: "2087-03-01", kind: "patch", downloads: 891,
      notes: ["Fixed transparent pixel on dumpster tile", "Repacked spritesheet for smaller file size (-18%)"] },
    { version: "v1.2", date: "2087-02-08", kind: "minor", downloads: 1102,
      notes: ["Added neon signage overlay pack (24 tiles)", "New TSX export for Tiled 1.10+"] },
    { version: "v1.1", date: "2087-01-14", kind: "patch", downloads: 428, notes: ["Initial bugfix pass — offset corrections on 6 tiles"] },
    { version: "v1.0", date: "2087-01-02", kind: "major", downloads: 8, notes: ["Initial release · 104 tiles"] },
  ],
  a2: [
    { version: "v3.0", date: "2087-04-09", kind: "major", downloads: 214,
      notes: ["Full rig overhaul — now uses standard Pixels humanoid skeleton", "Added wall-slide and roll animations", "Doubled frame count on run cycle"] },
    { version: "v2.1", date: "2087-02-22", kind: "patch", downloads: 640, notes: ["Fixed idle-loop pop"] },
    { version: "v2.0", date: "2087-01-30", kind: "major", downloads: 288, notes: ["Added hit-react and death anims"] },
  ],
  a3: [
    { version: "v1.1", date: "2087-03-18", kind: "patch", downloads: 380, notes: ["Added OGG exports alongside WAV", "Loudness pass to −14 LUFS"] },
    { version: "v1.0", date: "2087-03-01", kind: "major", downloads: 512, notes: ["Initial release · 42 clips"] },
  ],
};

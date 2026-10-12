# Status snapshots

The root [STATUS.md](../../STATUS.md) is the shareable current project overview and latest numbered update. It should give another LLM enough context to help prepare the next Codex prompt without requiring the historical changelog.

## Archive

| Update | Date | Snapshot |
| --- | --- | --- |
| 005 | 11 October 2026 | [Stage 2 Quick Practice expansion](archive/0005-2026-10-11.md) |
| 004 | 11 October 2026 | [Academic corrections and learning infrastructure](archive/0004-2026-10-11.md) |
| 003 | 11 October 2026 | [Programming and Machine Learning Stage 1](archive/0003-2026-10-11.md) |
| 002 | 11 October 2026 | [Current overview and status archive convention](archive/0002-2026-10-11.md) |
| 001 | 11 October 2026 | [Cumulative status through the initial Finance expansion](archive/0001-2026-10-11.md) |

Update 001 was assigned to the existing cumulative status when this archive was introduced. It preserves the earlier development history as one snapshot; earlier numbered snapshots were not reconstructed. The root document is now Update 006.

## Maintaining status

For each completed change that updates project status:

1. Before editing the root status, copy it to `docs/status/archive/NNNN-YYYY-MM-DD.md`, using the outgoing document’s update number and date. Use four digits for the filename, and never overwrite an existing snapshot.
2. Adjust relative Markdown links in the archived copy to resolve from its new location, preserving its substantive content.
3. Add that outgoing snapshot to the archive table, newest first.
4. Increment the root document’s update number and date. Replace its latest-update section with the newly completed change; do not append a cumulative changelog there.
5. Refresh the current overview, functionality, counts, architecture, deployment state, verification evidence and remaining work as applicable. Keep the root document self-contained and concise for sharing with another LLM.
6. Distinguish checks executed for the latest change from previously recorded application verification. Keep historical results in snapshots or linked review documents.
7. Check the archive’s preservation and local Markdown links. Do not rerun application tests/build solely for a documentation reorganisation.

Snapshots describe the project at their recorded date. Use the root status and repository for current decisions; consult archives only when historical context is needed.

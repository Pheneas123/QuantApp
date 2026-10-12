# Local learning data and review policy

No backend, account, cloud synchronisation, AI grading or required network service was added. All banks, fonts and lazy code chunks are precached by the existing PWA. Browser storage is local to its origin. QuantApp uses only the `quantapp.*` namespaces below; the rename intentionally starts fresh, with no migration or acceptance of previous application backups. Other namespaces are left untouched.

## Namespaces

| Key | Stored data |
| --- | --- |
| `quantapp.attempts.v1` | Quick Practice records; boolean and result-based records both load |
| `quantapp.guided-attempts.v1` | One record per problem attempt, with ordered part responses, correctness, hint use, completion and observed performance |
| `quantapp.written-attempts.v1` | Self-assessment, answer, reveal state, hint usage and objective IDs |
| `quantapp.written-drafts.v1` | Current draft, reveal/hint state and its stable attempt identity |
| `quantapp.flags.v1` | Mode-qualified item identities and flag timestamps |
| `quantapp.review-schedules.v1` | Item schedules plus immutable review-event evidence and provenance |
| `quantapp.guided-session.v1` | Latest resumable state per attempted Guided Problem, shuffled answer orders and content version |

Learning namespaces use `{version:1, records:[...]}`. Unknown content identities remain in storage/history and backups; flags can be removed even if content is unavailable. Records are validated by one shared storage layer. A malformed record does not erase healthy records: readers return healthy records and signal an error; writers refuse to overwrite a malformed namespace. Missing storage is empty. Unsupported versions remain untouched. There is no silent destructive migration.

Detectable write/quota failures surface in the UI and current work stays on screen. Denial of the localStorage property itself is caught by the reader, so study can still open with a warning. Persisted progress cannot be guaranteed after a failed write; leaving or refreshing then can lose unsaved changes. Review records and attempt records occupy separate keys, so a browser interruption between writes can leave an attempt without review evidence; Quick history is never reinterpreted to repair this automatically. Guided completion retries its idempotent schedule write on resume. localStorage is not a transactional multi-tab database; simultaneous tabs can race. Backup restore has best-effort rollback, but browser termination or exhausted storage can defeat rollback; keep the exported file.

## Backup restoration

Export contains only the allowlisted QuantApp keys and is validated before download. Import validates the entire format/version and every record before writing anything. The preview shows counts and requires an explicit restore action. Default **merge** keeps distinct attempts/flags, selects newer colliding drafts/attempt records by timestamp (local wins ties), and unions/replays distinct review events in timestamp/ID order. Merge does not use absent flags as deletion tombstones. **Replace** restores exactly the backup, including absent namespaces, after an additional destructive-operation confirmation. All keys are prevalidated; detectable write failures trigger restoration of original raw values. Corrupt existing data prevents a merge/export; replacement with a valid backup can repair it only after explicit confirmation.

Quick Practice’s Reset progress removes only its attempt key. Learning data reset separately removes all six learning namespaces, including Quick item schedules and flags; it preserves Quick attempt history and confirms removal. Written fresh-answer and Guided retry actions are independent of global reset.

## Deterministic scheduling

The scheduling algorithm is SM-2-inspired, chosen for clarity and testability, with no claim of scientific optimality:

- An unaided correct result increments the success streak. Intervals are 1 day, then 6 days, then the prior interval multiplied by updated ease and rounded to days, capped at 365.
- Ease starts at 2.5, rises by 0.05 for unaided correctness, and is clamped to [1.3,3].
- Incorrect and Not Sure outcomes reduce ease by 0.2, reset the streak and schedule one-day review.
- Partial performance and correct-with-hints reduce ease by 0.1, reset the streak and schedule one-day review.
- Two consecutive unaided successes change the state from learning to review. This state is scheduling terminology, not objective mastery.
- Guided Problems schedule as a whole: all parts correct → correct, none correct → incorrect, otherwise partial. Any part hint contributes to total assistance.
- Written Problems use the explicit self-assessment, preserving `self-reported` provenance. Correct written self-report can advance the same item interval; it is never counted as objectively assessed success.

Due dates use elapsed UTC days (86,400,000 ms), avoiding daylight-saving/date-string ambiguity. They are not promises of local-midnight review. The pure update accepts a controlled timestamp, rejects backward time/identity mismatches, and ignores repeated event IDs. The complete schedule is validated by replaying its events. Due filtering uses the current clock independently of Practice / Review Incorrect / Review Unsure / Unseen Only and of flags.

No old Quick Practice attempt is migrated into a schedule. New review events reference objective IDs at submission time. Objective evidence aggregates distinct item identities, assessed successes, attempt counts, hint-assisted successes and self-reported written successes. The view labels evidence insufficient until at least three assessed attempts on at least two unique items; passing that threshold is still not a mastery assertion. Historic unscheduled Quick results remain available in the unchanged History view.

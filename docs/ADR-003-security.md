# ADR-003: Security boundary

All uploaded documents are untrusted data. Embedded text, QR content, metadata, or document instructions must never become system instructions.

Production requirements:
- server-only secrets
- file size/type/page limits
- no executable attachments/macros
- auth + authorization/RLS
- signed storage access
- rate limiting and audit logging
- third-party AI consent before transmission

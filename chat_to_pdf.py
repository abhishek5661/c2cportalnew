from pathlib import Path
import math

OUT = Path('learnlytica-chat-summary.pdf')

lines = [
    'Learnlytica Chat Summary',
    'Generated on: 2026-09-09',
    '',
    'Session highlights:',
    '- Implemented PrismaService & PrismaModule connecting NestJS with Prisma ORM.',
    '- Configured CORS, ValidationPipe, and global "/api" prefix on the backend.',
    '- Enhanced Students, ActivityLog, Readiness, and Dashboard modules with persistence & graceful fallback.',
    '- Added ProblemsModule with problem bank, solution submission evaluation, and activity fact generation.',
    '- Created database seeder (prisma/seed.ts) and verified all API endpoints live.',
    '- Diagnosed and resolved Google OAuth Error 400 (redirect_uri_mismatch).',
    '',
    'Key notes & Solutions:',
    '- Backend running live at http://localhost:3000/api with full CORS and DTO validation.',
    '- Event loop completed: problem submissions emit immutable ActivityFacts and SkillEvidence.',
    '- Google OAuth Error 400: registered authorized redirect URIs in Google Cloud Console.',
    '',
    'Project configuration:',
    '- Monorepo (pnpm): shared, backend (NestJS + Prisma Client v6), frontend (Vite + React + Tailwind)',
    '- Core model: immutable activity facts -> skill evidence -> multi-dimensional readiness projections',
    '',
    'Files involved:',
    '- backend/src/prisma/prisma.service.ts & prisma.module.ts',
    '- backend/src/modules/problems/* & backend/src/main.ts',
    '- backend/src/modules/students/*, activity-logs/*, readiness/*, dashboard/*',
    '- backend/prisma/seed.ts & schema.prisma',
]


def pdf_escape(s):
    return s.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

# Basic PDF generation without external deps.
content_lines = []
page_width = 595
page_height = 842
margin_left = 50
start_y = 800
line_gap = 18

for i, line in enumerate(lines):
    y = start_y - (i * line_gap)
    content_lines.append(f"BT /F1 12 Tf 1 0 0 1 {margin_left} {y} Tm ({pdf_escape(line)}) Tj ET")

content = '\n'.join(content_lines)
content_bytes = content.encode('latin-1', 'replace')
content_len = len(content_bytes)

objects = []
objects.append(b'<< /Type /Catalog /Pages 2 0 R >>')
objects.append(b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
objects.append(b'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>')
objects.append(f'<< /Length {content_len} >>\nstream\n'.encode('latin-1') + content_bytes + b'\nendstream')
objects.append(b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')

pdf = bytearray(b'%PDF-1.4\n')
offsets = [0]
for i, obj in enumerate(objects, start=1):
    offsets.append(len(pdf))
    pdf.extend(f'{i} 0 obj\n'.encode('latin-1'))
    pdf.extend(obj)
    pdf.extend(b'\nendobj\n')

xref_pos = len(pdf)
pdf.extend(f'xref\n0 {len(objects)+1}\n'.encode('latin-1'))
pdf.extend(b'0000000000 65535 f \n')
for off in offsets[1:]:
    pdf.extend(f'{off:010d} 00000 n \n'.encode('latin-1'))
pdf.extend(f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n'.encode('latin-1'))

OUT.write_bytes(pdf)
print(f'Created PDF: {OUT.resolve()}')
print(f'File size: {OUT.stat().st_size} bytes')

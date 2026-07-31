import type { ChartDatum, Finding } from '../types/security'

export const findings: Finding[] = [
  { id: '1', rule: 'Public read access', severity: 'Critical', description: 'Bucket objects can be read by any unauthenticated principal.', status: 'Action required' },
  { id: '2', rule: 'Wildcard principal', severity: 'High', description: 'An unrestricted principal grants broad access to the bucket.', status: 'Review recommended' },
  { id: '3', rule: 'TLS enforcement', severity: 'Medium', description: 'The policy does not explicitly deny insecure transport.', status: 'Recommendation ready' },
  { id: '4', rule: 'Least privilege scope', severity: 'Medium', description: 'Permissions can be narrowed to reduce the access surface.', status: 'Recommendation ready' },
  { id: '5', rule: 'Secure account boundary', severity: 'Passed', description: 'No cross-account root principal access was detected.', status: 'Passed' },
]

export const riskDistribution: ChartDatum[] = [
  { name: 'Critical', value: 1, color: '#e11d48' }, { name: 'High', value: 1, color: '#f97316' }, { name: 'Medium', value: 2, color: '#eab308' }, { name: 'Passed', value: 8, color: '#10b981' },
]

export const originalPolicy = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::production-assets/*"
  }]
}`

export const remediatedPolicy = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowTrustedApplicationRead",
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::123456789012:role/AppRole" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::production-assets/*",
    "Condition": { "Bool": { "aws:SecureTransport": "true" } }
  }]
}`

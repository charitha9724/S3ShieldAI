export type Severity = 'Critical' | 'High' | 'Medium' | 'Passed'

export interface Finding { id: string; rule: string; severity: Severity; description: string; status: string }
export interface ChartDatum { name: string; value: number; color: string }

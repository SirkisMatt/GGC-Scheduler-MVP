export interface Employee {
    id: string;
    name: string;
    roles: Array<'guide' | 'captain' | 'driver'>;
    cdlStatus?: 'current' | 'expired' | null;
  }
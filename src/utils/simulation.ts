import type { SimulationRecord } from '@/data/simulation';

import { parseCurrency } from './currency';

export const calcMonthlySavings = (data: SimulationRecord): number =>
  parseCurrency(data.income) - parseCurrency(data.debts) - parseCurrency(data.expenses);

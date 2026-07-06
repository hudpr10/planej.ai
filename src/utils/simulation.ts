import type { SimulationFormData } from '@/data/simulation';

import { parseCurrency } from './currency';

export const calcMonthlySavings = (data: SimulationFormData): number =>
  parseCurrency(data.income) - parseCurrency(data.debts) - parseCurrency(data.expenses);

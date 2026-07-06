import type { SimulationFormData } from '@/data/simulation';

const LOCAL_STORAGE_KEY = 'simulation_data';

const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage ? (JSON.parse(storage) as SimulationFormData[]) : [];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, formData]));
  };

  const getFormData = (): SimulationFormData | null => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (data) return JSON.parse(data);
    return null;
  };

  return { saveFormData, getFormData };
};

export default useSimulationStorage;

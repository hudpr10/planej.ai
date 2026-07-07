import type { SimulationFormData, SimulationRecord } from '@/data/simulation';

const LOCAL_STORAGE_KEY = 'simulation_data';

const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const record: SimulationRecord = { ...formData, id };

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : [];

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...savedData, record]));
    return id;
  };

  const getFormData = (id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!storage) return null;

    const savedData = JSON.parse(storage) as SimulationRecord[];
    return savedData.find((record) => record.id === id) || null;
  };

  const getAllFormData = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : [];
    return savedData;
  };

  const updateFormData = (id: string, data: SimulationRecord) => {
    const savedData = getAllFormData();
    const updated = savedData.map((record) => (record.id === id ? { ...data } : record));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const excludeFormData = (id: string) => {
    const savedData = getAllFormData();
    const updateData = savedData.filter((data) => data.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateData));
  };

  return { saveFormData, getFormData, updateFormData, getAllFormData, excludeFormData };
};

export default useSimulationStorage;

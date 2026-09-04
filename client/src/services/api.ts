import {
  FloodReport,
  FloodStats,
  CreateFloodInput,
  UpdateFloodInput,
  ApiResponse,
  FilterOptions
} from '../types/flood';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const fetchFloodReports = async (filters?: Partial<FilterOptions>): Promise<FloodReport[]> => {
  const params = new URLSearchParams();

  if (filters?.district && filters.district !== 'All') {
    params.append('district', filters.district);
  }
  if (filters?.severity && filters.severity !== 'All') {
    params.append('severity', filters.severity);
  }
  if (filters?.status && filters.status !== 'All') {
    params.append('status', filters.status);
  }
  if (filters?.floodType && filters.floodType !== 'All') {
    params.append('floodType', filters.floodType);
  }
  if (filters?.search && filters.search.trim()) {
    params.append('search', filters.search.trim());
  }
  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  if (filters?.order) {
    params.append('order', filters.order);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${API_BASE}/floods${queryString}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch flood reports (${response.status})`);
  }

  const result: ApiResponse<FloodReport[]> = await response.json();
  return result.data;
};

export const fetchFloodStats = async (): Promise<FloodStats> => {
  const response = await fetch(`${API_BASE}/floods/stats`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch flood statistics');
  }

  const result: ApiResponse<FloodStats> = await response.json();
  return result.data;
};

export const fetchFloodById = async (id: string): Promise<FloodReport> => {
  const response = await fetch(`${API_BASE}/floods/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch flood report details');
  }

  const result: ApiResponse<FloodReport> = await response.json();
  return result.data;
};

export const createFloodReport = async (data: CreateFloodInput): Promise<FloodReport> => {
  const response = await fetch(`${API_BASE}/floods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (result.errors && Array.isArray(result.errors)) {
      throw new Error(result.errors.join('\n'));
    }
    throw new Error(result.message || `Failed to submit flood report (Status: ${response.status})`);
  }

  return result.data;
};

export const updateFloodReport = async (id: string, data: UpdateFloodInput): Promise<FloodReport> => {
  const response = await fetch(`${API_BASE}/floods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (result.errors && Array.isArray(result.errors)) {
      throw new Error(result.errors.join('\n'));
    }
    throw new Error(result.message || `Failed to update flood report (Status: ${response.status})`);
  }

  return result.data;
};

export const deleteFloodReport = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/floods/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete flood report');
  }
};

export const seedSampleData = async (): Promise<FloodReport[]> => {
  const response = await fetch(`${API_BASE}/floods/seed`, {
    method: 'POST'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to reset sample data');
  }

  const result: ApiResponse<FloodReport[]> = await response.json();
  return result.data;
};

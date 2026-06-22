'use server'

import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function fetchTodos(filter?: string, search?: string) {
  try {
    const params = new URLSearchParams();
    if (filter && filter !== 'all') params.append('filter', filter);
    if (search) params.append('search', search);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await axios.get(`${BACKEND_URL}/todos${query}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

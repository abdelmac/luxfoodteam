import type { Product } from '../types/product';

const API_URL = 'https://raw.githubusercontent.com/xyzakaria/luxfood_/refs/heads/main/src/data/data.json';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((item: any) => {
      const cleanStock = typeof item.stock === 'string'
        ? parseInt(item.stock.replace(/[^\d]/g, ''))
        : Number(item.stock);

      const cleanPrice = typeof item.price === 'string'
        ? parseFloat(item.price.replace(',', '.'))
        : Number(item.price);

      return {
        id: parseInt(item.id),
        name: item.name,
        name_ar: item.name_ar,
        category: item.category,
        reference: item.reference,
        image: item.image || 'https://raw.githubusercontent.com/xyzakaria/luxfood_/refs/heads/main/src/public/INA.jpg',
        description: item.description || '',
        description_ar: item.description_ar || '',
        stock: isNaN(cleanStock) ? 0 : cleanStock,
        price: isNaN(cleanPrice) ? 0 : cleanPrice,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const products = await fetchProducts();
    return products.find(p => p.id === id) || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchLatestProducts(): Promise<Product[]> {
  try {
    const products = await fetchProducts();
    return products.sort((a, b) => b.id - a.id).slice(0, 4);
  } catch (error) {
    console.error('Error fetching latest products:', error);
    return [];
  }
}

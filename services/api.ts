

import { supabase } from '../src/lib/supabase';

import { Product, Order, CartItem, Product as Category } from '../types';

// Matching the Typescript interfaces with DB results
// We might need some mapping if DB columns are snake_case and Types are camelCase
// For now, I'll assume we map them manually or the types align well enough.

export const api = {
    // Fetch all products
    async getProducts() {
        const { data, error } = await supabase
            .from('products')
            .select(`
        *,
        categories (
          name,
          icon
        )
      `);

        if (error) throw error;

        // Map DB response to frontend Product type
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            oldPrice: item.old_price,
            description: item.description,
            category: item.category_id,
            image: item.image,
            tag: item.tag,
            rating: item.rating,
            reviews: item.reviews_count,
            time: item.time_estimate,
            calories: item.calories,
            ingredients: item.ingredients || []
        })) as Product[];
    },

    // Fetch all categories
    async getCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*');

        if (error) throw error;
        return data; // Assuming straight mapping for now
    },

    // Get single product
    async getProductById(id: string) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        return {
            id: data.id,
            name: data.name,
            price: data.price,
            oldPrice: data.old_price,
            description: data.description,
            category: data.category_id,
            image: data.image,
            tag: data.tag,
            rating: data.rating,
            reviews: data.reviews_count,
            time: data.time_estimate,
            calories: data.calories,
            ingredients: data.ingredients || []
        } as Product;
    },

    // Submit order
    async submitOrder(orderData: { items: CartItem[], total: number }) {
        // 1. Create Order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                total_amount: orderData.total,
                status: 'cooking',
                order_no: `OD${Date.now()}` // Simple ID generation
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create Order Items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            product_name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return order;
    },

    // Fetch orders (history)
    async getOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (
          product_id,
          product_name,
          price,
          quantity
        )
      `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((order: any) => ({
            id: order.id,
            orderNo: order.order_no,
            date: new Date(order.created_at).toLocaleString(),
            status: order.status,
            total: order.total_amount,
            items: order.order_items.map((item: any) => ({
                id: item.product_id,
                name: item.product_name,
                price: item.price,
                quantity: item.quantity
                // Missing other product details for history display? 
                // Usually history just needs basic info.
            }))
        }));
    }
};

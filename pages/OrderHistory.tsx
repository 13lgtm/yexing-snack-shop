
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { api } from '../services/api';
import { Order } from '../types';

const OrderHistory: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [filter, setFilter] = useState<'all' | 'cooking' | 'completed'>('all');
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load orders from API
    useEffect(() => {
        const loadOrders = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await api.getOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to load orders:', err);
                setError('加载订单失败');
            } finally {
                setIsLoading(false);
            }
        };
        loadOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        if (filter === 'all') return orders;
        return orders.filter(o => o.status === filter);
    }, [filter, orders]);

    const handleReorder = async (items: any[]) => {
        // Load full product details for reorder
        for (const item of items) {
            try {
                const product = await api.getProductById(item.id);
                for (let i = 0; i < item.quantity; i++) {
                    addToCart(product);
                }
            } catch (err) {
                console.error('Failed to load product:', err);
            }
        }
        navigate('/cart');
    };

    const handleSearch = () => {
        alert("搜索订单功能正在升级中...");
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-6 flex flex-col">
            <header className="sticky top-0 z-50 bg-gray-50 px-4 pt-12 pb-2">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 -ml-2 rounded-full active:bg-gray-200 transition"
                    >
                        <span className="material-icons-round text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold text-center flex-1">历史订单</h1>
                    <button
                        onClick={handleSearch}
                        className="p-2 -mr-2 rounded-full active:bg-gray-200 transition"
                    >
                        <span className="material-icons-round text-2xl">search</span>
                    </button>
                </div>
                <div className="flex bg-gray-200 rounded-full p-1 h-10">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                    >
                        全部
                    </button>
                    <button
                        onClick={() => setFilter('cooking')}
                        className={`flex-1 rounded-full text-xs font-bold transition-all ${filter === 'cooking' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                    >
                        进行中
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`flex-1 rounded-full text-xs font-bold transition-all ${filter === 'completed' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                    >
                        已完成
                    </button>
                </div>
            </header>

            <main className="px-4 space-y-4 pt-2 overflow-y-auto no-scrollbar flex-1">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm text-gray-400">加载中...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                        <span className="material-icons-round text-5xl mb-3 opacity-20">error_outline</span>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    filteredOrders.map(order => {
                        const itemNames = order.items.map(item => item.name || '未知商品').join(', ');
                        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                        const firstItemImage = order.items[0]?.image || '';

                        return (
                            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-sm font-bold">订单 #{order.orderNo.slice(-4)}</h3>
                                    {order.status === 'cooking' ? (
                                        <span className="bg-red-50 text-primary text-[10px] px-2 py-1 rounded-full font-bold flex items-center">
                                            <span className="w-1 h-1 bg-primary rounded-full mr-1.5 animate-pulse"></span>
                                            制作中
                                        </span>
                                    ) : order.status === 'cancelled' ? (
                                        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-full font-bold line-through">已取消</span>
                                    ) : (
                                        <span className="text-gray-400 text-[10px] px-2 py-1 font-bold italic">已完成</span>
                                    )}
                                </div>
                                <div className="flex items-start mb-4">
                                    {firstItemImage && (
                                        <img alt="Order preview" className="w-14 h-14 rounded-xl object-cover flex-shrink-0 mr-3" src={firstItemImage} />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-800 font-bold mb-0.5 line-clamp-1">{itemNames}</p>
                                        <p className="text-[10px] text-gray-400">共{itemCount}件商品</p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-dashed border-gray-100 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-0.5">{order.date}</p>
                                        <p className="text-base font-bold text-gray-900">¥{order.total.toFixed(2)}</p>
                                    </div>
                                    {order.status === 'cooking' ? (
                                        <button
                                            onClick={() => navigate('/receipt', { state: { order } })}
                                            className="bg-primary hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg transition-all active:scale-90"
                                        >
                                            追踪详情
                                        </button>
                                    ) : order.status === 'cancelled' ? (
                                        <button
                                            onClick={() => handleReorder(order.items)}
                                            className="bg-gray-100 text-gray-500 text-xs font-bold px-5 py-2 rounded-full transition-all active:scale-90"
                                        >
                                            重新下单
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleReorder(order.items)}
                                            className="bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary text-xs font-bold px-5 py-2 rounded-full transition-all active:scale-90"
                                        >
                                            再来一单
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                        <span className="material-icons-round text-5xl mb-3 opacity-20">history</span>
                        <p className="text-sm font-medium">暂无此类订单记录</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrderHistory;

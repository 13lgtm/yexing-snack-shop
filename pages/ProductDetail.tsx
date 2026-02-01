
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { api } from '../services/api';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart } = useCart();
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load product from API
    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                setError(null);
                const data = await api.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error('Failed to load product:', err);
                setError('加载产品失败');
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const cartItem = cart.find(item => item.id === id);
    const quantity = cartItem?.quantity || 0;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-gray-400">加载中...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-4">
                <span className="material-icons-round text-5xl text-gray-300 mb-3">error_outline</span>
                <p className="text-sm text-gray-500 mb-4">{error || '产品不存在'}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-primary text-white px-6 py-2 rounded-full"
                >
                    返回上一页
                </button>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            }).catch(() => { });
        } else {
            alert("复制链接成功！快去分享给好友吧~");
        }
    };

    return (
        <div className="bg-white min-h-screen pb-24 relative overflow-x-hidden">
            <div className="relative h-96 w-full">
                <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full px-4 pt-10 flex justify-between items-center z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
                    >
                        <span className="material-icons-round text-xl">arrow_back</span>
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
                        >
                            <span className={`material-icons-round text-xl ${isFavorite ? 'text-primary' : 'text-white'}`}>
                                {isFavorite ? 'favorite' : 'favorite_border'}
                            </span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white active:scale-90 transition-transform"
                        >
                            <span className="material-icons-round text-xl">share</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative -mt-10 bg-white rounded-t-3xl px-6 pt-3 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">{product.name}</h1>
                    <div className="flex items-center text-xs text-gray-500">
                        <span className="flex items-center text-orange-400 mr-1">
                            <span className="material-icons-round text-base mr-0.5">star</span>
                            <span className="font-bold">{product.rating}</span>
                        </span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <span>({product.reviews} 条评价)</span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <span>{product.time}</span>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <div>
                        {product.oldPrice && <span className="block text-xs text-gray-400 line-through">¥{product.oldPrice.toFixed(2)}</span>}
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">¥{product.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                        <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 active:scale-90 transition-transform disabled:opacity-30"
                            disabled={quantity === 0}
                        >
                            <span className="material-icons-round text-lg">remove</span>
                        </button>
                        <span className="w-8 text-center font-medium text-lg">{quantity}</span>
                        <button
                            onClick={() => addToCart(product)}
                            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full shadow-md active:scale-90 transition-transform"
                        >
                            <span className="material-icons-round text-lg">add</span>
                        </button>
                    </div>
                </div>

                <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
                    <div className="flex items-center px-3 py-1.5 bg-orange-50 rounded-lg whitespace-nowrap border border-orange-100">
                        <span className="material-icons-round text-orange-500 text-sm mr-1.5">local_fire_department</span>
                        <span className="text-[10px] font-bold text-gray-700">经典人气</span>
                    </div>
                    <div className="flex items-center px-3 py-1.5 bg-green-50 rounded-lg whitespace-nowrap border border-green-100">
                        <span className="material-icons-round text-green-500 text-sm mr-1.5">bolt</span>
                        <span className="text-[10px] font-bold text-gray-700">{product.calories}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-base font-bold mb-3 text-gray-900">关于这道菜</h2>
                    <p className="text-sm leading-relaxed text-gray-500 text-justify">
                        {product.description}
                    </p>
                </div>

                <div className="mb-20">
                    <h2 className="text-base font-bold mb-4 text-gray-900">主要食材</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {product.ingredients.map((ing, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-2 shadow-sm">
                                    <span className="text-xl">{ing.emoji}</span>
                                </div>
                                <span className="text-[10px] text-gray-500">{ing.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">预计合计</span>
                        <span className="text-xl font-bold text-gray-900">¥{(product.price * (quantity || 1)).toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => { if (quantity === 0) addToCart(product); navigate('/cart'); }}
                        className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95"
                    >
                        <span className="material-icons-round text-xl">shopping_bag</span>
                        立即下单
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

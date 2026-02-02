
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { api } from '../services/api';
import { Product } from '../types';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart, totalCount, totalPrice } = useCart();

    // State for products and categories from API
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ id: string; name: string; icon: string }[]>([]);
    const [activeCategory, setActiveCategory] = useState('snacks'); // 默认为'snacks'
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Load products and categories from API
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [productsData, categoriesData] = await Promise.all([
                    api.getProducts(),
                    api.getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);

                // 设置默认分类为第一个分类（如果有的话）
                if (categoriesData.length > 0 && !activeCategory) {
                    setActiveCategory(categoriesData[0].id);
                }
            } catch (err) {
                console.error('Failed to load data:', err);
                setError('加载数据失败，请检查网络连接');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(p => p.category === activeCategory);
    }, [activeCategory, products]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeCategory]);

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.stopPropagation();
        addToCart(product);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleSearch = () => {
        const query = prompt("请输入您想找的小吃名称：");
        if (query) alert(`正在为您搜索: ${query}...`);
    };

    const handleLocation = () => {
        alert("正在重新获取您的收货位置...");
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white text-xs px-4 py-2 rounded-full shadow-lg animate-in fade-in zoom-in duration-300">
                    已成功加入购物车 ✨
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white text-xs px-4 py-2 rounded-full shadow-lg">
                    {error}
                </div>
            )}

            <header className="bg-white px-4 py-3 shadow-sm z-20 shrink-0">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                            <span className="text-white text-xs font-bold">業興</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLocation}>
                                <h1 className="text-base font-bold leading-tight">業興小吃铺</h1>
                                <span className="material-icons-round text-gray-400 text-sm">expand_more</span>
                            </div>
                            <div className="flex items-center text-[10px] text-gray-500 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                                <span>营业中</span>
                                <span className="mx-1">·</span>
                                <span>09:00 - 22:00</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSearch}
                            className="w-9 h-9 flex items-center justify-center text-gray-500 active:scale-90 transition-transform"
                        >
                            <span className="material-icons-round text-xl">search</span>
                        </button>
                        <button
                            onClick={() => navigate('/history')}
                            className="bg-accent-red text-primary px-3 py-1.5 rounded-full flex items-center text-xs font-bold active:scale-95 transition-transform"
                        >
                            <span className="material-icons-round text-lg mr-1">receipt_long</span>
                            订单
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <nav className="w-20 bg-white border-r border-gray-100 overflow-y-auto no-scrollbar">
                    <ul className="flex flex-col">
                        {categories.map((cat) => (
                            <li key={cat.id} className="relative">
                                {activeCategory === cat.id && (
                                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-full"></div>
                                )}
                                <button
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`w-full py-6 flex flex-col items-center transition-all ${activeCategory === cat.id ? 'bg-accent-red text-primary' : 'text-gray-400'}`}
                                >
                                    <div className={`mb-1.5 p-1.5 rounded-xl transition-all ${activeCategory === cat.id ? 'bg-white shadow-sm' : ''}`}>
                                        <span className="material-icons-round text-xl">{cat.icon}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold tracking-tight ${activeCategory === cat.id ? 'text-primary' : 'text-gray-500'}`}>
                                        {cat.name}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Product List */}
                <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 pb-32 bg-gray-50 transition-all">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="text-sm text-gray-400">加载中...</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-end mb-4">
                                <h2 className="text-base font-bold text-gray-800">{categories.find(c => c.id === activeCategory)?.name}</h2>
                                <span className="text-[10px] text-gray-400">共 {filteredProducts.length} 款商品</span>
                            </div>

                            <div className="space-y-4">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        {filteredProducts.slice(0, 1).map(product => (
                                            <div
                                                key={product.id}
                                                className="bg-white rounded-2xl overflow-hidden shadow-card relative group cursor-pointer active:scale-[0.98] transition-all"
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            >
                                                <div className="relative aspect-[16/9] w-full">
                                                    <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                                        <div className="flex-1 mr-2">
                                                            <h3 className="text-white text-lg font-bold mb-0.5">{product.name}</h3>
                                                            <p className="text-gray-200 text-[10px] line-clamp-1 opacity-90">{product.description}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="text-white font-bold text-lg">¥{product.price}</span>
                                                            <button
                                                                onClick={(e) => handleAddToCart(e, product)}
                                                                className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                                                            >
                                                                <span className="material-icons-round text-xl font-bold">add</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="grid grid-cols-2 gap-3">
                                            {filteredProducts.slice(1).map(product => (
                                                <div
                                                    key={product.id}
                                                    className="bg-white rounded-2xl overflow-hidden shadow-card flex flex-col h-full cursor-pointer active:scale-[0.98] transition-all"
                                                    onClick={() => navigate(`/product/${product.id}`)}
                                                >
                                                    <div className="aspect-square w-full relative">
                                                        <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                                                    </div>
                                                    <div className="p-3 flex flex-col flex-1 justify-between">
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
                                                            <p className="text-[9px] text-gray-400 mb-2 line-clamp-2 leading-tight h-6">{product.description}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <div>
                                                                <span className="text-primary font-bold text-base">¥{product.price}</span>
                                                                {product.stock !== undefined && product.stock < 20 && product.stock > 0 && (
                                                                    <div className="text-[9px] text-orange-500 mt-0.5">
                                                                        仅剩 {product.stock} {product.unit || '份'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={(e) => handleAddToCart(e, product)}
                                                                className="bg-primary text-white w-6 h-6 rounded-lg flex items-center justify-center shadow-md active:scale-90 transition-transform"
                                                            >
                                                                <span className="material-icons-round text-base">add</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-24 text-gray-300">
                                        <span className="material-icons-round text-5xl mb-3 opacity-30">restaurant_menu</span>
                                        <p className="text-sm font-medium">暂时没有更多商品</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
            </div>

            {totalCount > 0 && (
                <div className="fixed bottom-6 left-4 right-4 z-40 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl h-16 shadow-float flex items-center justify-between px-3">
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => navigate('/cart')}
                        >
                            <div className="relative w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
                                <span className="material-icons-round text-white text-2xl">shopping_cart</span>
                                <div className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-900">
                                    {totalCount}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-black text-xl leading-none">¥{totalPrice.toFixed(2)}</span>
                                <span className="text-gray-400 text-[10px] mt-1">已点 {totalCount} 件小吃</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-primary hover:bg-red-700 text-white font-black text-sm px-7 py-3 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            去结算
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

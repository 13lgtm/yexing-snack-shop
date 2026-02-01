
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { api } from '../services/api';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { cart, totalPrice, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
    const [remark, setRemark] = useState('');

    const packagingFee = 1.0;
    const deliveryFee = deliveryMode === 'delivery' ? 2.5 : 0.0;
    const discount = -2.5;
    const finalPrice = totalPrice * 0.9 + packagingFee + deliveryFee + discount;

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            // Submit order to database
            const order = await api.submitOrder({
                items: cart,
                total: finalPrice
            });

            // Clear cart after successful order
            clearCart();

            // Navigate to receipt with order info
            navigate('/receipt', { state: { order } });
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('订单提交失败，请重试');
            setIsProcessing(false);
        }
    };

    const handleRemark = () => {
        const input = prompt("请输入您的特殊要求（如：不加辣、分开打包等）：", remark);
        if (input !== null) setRemark(input);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <header className="sticky top-0 z-30 bg-white shadow-sm shrink-0">
                <div className="px-4 h-14 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
                    >
                        <span className="material-icons-round text-gray-700">arrow_back</span>
                    </button>
                    <h1 className="text-base font-bold">订单支付</h1>
                    <div className="w-10"></div>
                </div>
                <div className="flex items-center justify-center pb-2">
                    <div className="flex bg-gray-100 rounded-lg p-1 w-64">
                        <button
                            onClick={() => setDeliveryMode('delivery')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${deliveryMode === 'delivery' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                        >
                            外送
                        </button>
                        <button
                            onClick={() => setDeliveryMode('pickup')}
                            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${deliveryMode === 'pickup' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
                        >
                            自提
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 space-y-4 overflow-y-auto pb-40">
                {/* Address Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between pb-4 border-b border-dashed border-gray-100 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons-round text-primary text-xl">
                                    {deliveryMode === 'delivery' ? 'location_on' : 'storefront'}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-900 leading-tight mb-1">
                                    {deliveryMode === 'delivery' ? '传承路123号，4B室' : '業興小吃铺（总店）'}
                                </h2>
                                <p className="text-xs text-gray-400">
                                    {deliveryMode === 'delivery' ? '李先生 · 138-0055-0199' : '越秀区传承路88号'}
                                </p>
                            </div>
                        </div>
                        <span className="material-icons-round text-gray-300 text-sm">chevron_right</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons-round text-orange-500 text-xl">schedule</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-800">
                                    {deliveryMode === 'delivery' ? '立即配送' : '预计取餐时间'}
                                </h3>
                                <p className="text-[10px] text-green-600 font-medium">
                                    {deliveryMode === 'delivery' ? '预计 35 分钟后送达' : '支付后 15 分钟可取'}
                                </p>
                            </div>
                        </div>
                        <span className="material-icons-round text-gray-300 text-sm">chevron_right</span>
                    </div>
                </div>

                {/* Items Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider">订单清单</h3>
                        <button onClick={() => navigate('/')} className="text-xs font-bold text-primary">修改</button>
                    </div>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex gap-3">
                                <img alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-gray-50" src={item.image} />
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-bold text-gray-800">{item.name}</span>
                                        <span className="text-sm font-bold text-gray-900">¥{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <span className="text-xs text-gray-400 mt-0.5">数量 x {item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-dashed border-gray-100 my-4"></div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">包装费</span>
                            <span className="font-bold text-gray-800">¥{packagingFee.toFixed(2)}</span>
                        </div>
                        {deliveryMode === 'delivery' && (
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">配送费</span>
                                <span className="font-bold text-gray-800">¥{deliveryFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-xs text-primary">
                            <span className="font-bold">平台专享优惠</span>
                            <span className="font-bold">-¥{Math.abs(discount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Remark */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
                    <button
                        onClick={handleRemark}
                        className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-icons-round text-gray-400 text-lg">edit_note</span>
                            <span className="text-sm font-bold text-gray-700">订单备注</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 truncate max-w-[120px]">
                                {remark || '选填'}
                            </span>
                            <span className="material-icons-round text-gray-300 text-sm">chevron_right</span>
                        </div>
                    </button>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 pb-8 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">实付金额</span>
                        <span className="text-2xl font-black text-primary">¥{finalPrice.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-lg transition-all flex items-center gap-2 ${isProcessing ? 'opacity-50 scale-95' : 'active:scale-95'}`}
                    >
                        {isProcessing ? (
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : "确认支付"}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Checkout;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Receipt: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    const handleFinish = () => {
        navigate('/');
    };

    // If no order data, redirect to home
    if (!order) {
        navigate('/');
        return null;
    }

    // Format order number for display
    const orderNo = order.order_no || `OD${Date.now()}`;
    const pickupNumber = orderNo.slice(-4);

    // Calculate total from order items
    const itemsTotal = order.order_items?.reduce((sum: number, item: any) =>
        sum + (item.price * item.quantity), 0
    ) || order.total_amount || 0;

    const finalPrice = order.total_amount || itemsTotal;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col pb-8">
            <div className="px-4 py-4 flex items-center justify-between sticky top-0 z-50 bg-gray-50/90 backdrop-blur-sm">
                <button
                    onClick={handleFinish}
                    className="text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <span className="material-icons-round text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-gray-800">订单详情</h1>
                <div className="w-10"></div>
            </div>

            <div className="flex flex-col items-center pt-2 pb-8">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <span className="material-icons-round text-5xl text-green-500">check_circle_outline</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">支付成功</h2>
                <div className="text-3xl font-bold text-gray-900 font-mono">¥{finalPrice.toFixed(2)}</div>
            </div>

            <div className="px-4 mb-8">
                <div className="bg-white rounded-3xl shadow-card overflow-hidden relative">
                    <div className="p-6 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-3 border-4 border-pink-50">
                            <span className="text-white text-xs font-bold">業興</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">業興小吃铺</h3>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                            <span className="material-icons-round text-sm mr-1">schedule</span>
                            预计等待: 10 分钟
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        <div className="bg-pink-50 rounded-2xl p-6 text-center border border-pink-100">
                            <p className="text-sm text-gray-500 mb-1">取餐编号</p>
                            <div className="text-5xl font-bold text-primary tracking-wider">{pickupNumber}</div>
                        </div>
                    </div>

                    <div className="relative h-1 w-full border-b-2 border-dashed border-gray-100 mb-6"></div>

                    <div className="px-6 pb-4 space-y-6">
                        {order.order_items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <span className="bg-gray-100 text-gray-400 w-6 h-6 flex items-center justify-center rounded text-xs font-medium mt-0.5">{idx + 1}</span>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-800">{item.product_name}</h4>
                                        <p className="text-xs text-gray-400 mt-0.5">x{item.quantity}</p>
                                    </div>
                                </div>
                                <span className="text-base font-bold text-gray-800">¥{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100 border-dashed space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                            <span>小计</span>
                            <span className="font-medium text-gray-800">¥{itemsTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-primary">
                            <span>优惠</span>
                            <span className="font-medium">-¥{(itemsTotal - finalPrice).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="px-6 py-5 border-t border-gray-100">
                        <div className="flex justify-between items-end">
                            <span className="text-lg font-bold text-gray-800">实付</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs text-gray-400">(微信支付)</span>
                                <span className="text-2xl font-bold text-gray-900">¥{finalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-8 px-6">
                <p className="text-xs text-gray-400 mb-1">订单号: {orderNo}</p>
                <p className="text-xs text-gray-400">下单时间: {new Date(order.created_at).toLocaleString('zh-CN')}</p>
            </div>

            <div className="px-6 mt-auto">
                <button
                    onClick={handleFinish}
                    className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transition-colors mb-6"
                >
                    返回首页
                </button>
                <button className="w-full flex items-center justify-center gap-2 text-gray-400 text-sm py-2 hover:text-primary transition-colors">
                    <span className="material-icons-round text-lg">headset_mic</span>
                    需要帮助?
                </button>
            </div>
        </div>
    );
};

export default Receipt;

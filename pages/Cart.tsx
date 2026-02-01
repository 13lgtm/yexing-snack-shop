
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <span className="material-icons-round text-6xl text-gray-300 mb-4">shopping_cart</span>
        <p className="text-gray-500 mb-6">您的购物车还是空的</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          去逛逛
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-md px-4 pt-10 pb-2">
        <div className="flex items-center justify-between h-12">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-800"
          >
            <span className="material-icons-round text-xl">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold text-center flex-1">我的购物车</h1>
          <button 
            onClick={clearCart}
            className="text-sm font-medium text-gray-400 hover:text-primary transition-colors px-2"
          >
            清空
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 pb-32 space-y-4 overflow-y-auto no-scrollbar">
        {cart.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-3 flex items-center shadow-sm">
            <img alt={item.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" src={item.image} />
            <div className="ml-4 flex-1 h-20 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[150px]">{item.description}</p>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-primary font-bold text-lg">¥{item.price.toFixed(2)}</span>
                <div className="flex items-center space-x-3 bg-gray-50 rounded-full pr-0.5 pl-0.5 py-0.5">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-400 shadow-sm border border-gray-100"
                  >
                    <span className="material-icons-round text-base">remove</span>
                  </button>
                  <span className="font-medium w-4 text-center text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/30"
                  >
                    <span className="material-icons-round text-base">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-accent-red border border-primary/10 rounded-2xl p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-icons-round text-primary text-sm">local_offer</span>
            <span className="text-primary font-bold text-sm">已应用优惠</span>
          </div>
          <p className="text-gray-500 text-sm">
            您在本次订单中节省了 <span className="text-primary font-bold">¥{(totalPrice * 0.1).toFixed(2)}</span>
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-4 rounded-t-3xl z-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-gray-400 mb-1">合计</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">¥{(totalPrice * 0.9).toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through font-normal">¥{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="bg-primary hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg flex items-center gap-2 transform active:scale-95 transition-all"
          >
            <span>去结算</span>
            <span className="material-icons-round text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

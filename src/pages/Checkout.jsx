import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { CheckCircle2, ChevronRight, Lock, Loader2, CreditCard } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder, pawPoints, usePawPoints } = useDashboard();
  const navigate = useNavigate();

  const [step, setStep] = useState('SHIPPING'); // SHIPPING, PAYMENT, CONFIRMATION
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user ? user.name : '', email: user ? user.email : '',
    phone: '', address: '', suite: '', city: '', state: '', zip: '', country: 'US'
  });
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [pointsDiscount, setPointsDiscount] = useState(0);

  const [paymentState, setPaymentState] = useState('IDLE'); // IDLE, PROCESSING, SUCCESS, FAILED
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    if (cart.length === 0 && step !== 'CONFIRMATION') navigate('/shop');
  }, [cart, step, navigate]);

  const shippingCost = cartTotal > 50 ? 0 : 5.99;
  const finalTotal = Math.max(0, cartTotal - discount - pointsDiscount + shippingCost);

  const handleApplyCoupon = () => {
    if (couponCode === 'PAW10') {
      setDiscount(cartTotal * 0.1);
      setCouponMessage('10% off applied!');
    } else if (couponCode === 'WELCOME15') {
      setDiscount(15);
      setCouponMessage('$15 off applied!');
    } else if (couponCode === 'PETLOVE20') {
      setDiscount(cartTotal * 0.2);
      setCouponMessage('20% off applied!');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid or expired coupon.');
    }
  };

  const handleApplyPoints = () => {
    if (!usePoints && pawPoints >= 100) {
      let pointsToUse = pawPoints;
      let pDiscount = 0;
      if (pawPoints >= 500) { pointsToUse = 500; pDiscount = 35; }
      else if (pawPoints >= 250) { pointsToUse = 250; pDiscount = 15; }
      else if (pawPoints >= 100) { pointsToUse = 100; pDiscount = 5; }
      
      setUsePoints(true);
      setPointsDiscount(pDiscount);
    } else {
      setUsePoints(false);
      setPointsDiscount(0);
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep('PAYMENT');
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentState('PROCESSING');
    
    // Simulate payment
    setTimeout(() => {
      // 90% success rate
      if (Math.random() > 0.1) {
        setPaymentState('SUCCESS');
        
        if (usePoints) {
           let pts = 0;
           if (pointsDiscount === 35) pts = 500;
           else if (pointsDiscount === 15) pts = 250;
           else if (pointsDiscount === 5) pts = 100;
           usePawPoints(pts);
        }

        const newOrder = addOrder({
          items: cart,
          shippingInfo,
          subtotal: cartTotal,
          discount: discount + pointsDiscount,
          shipping: shippingCost,
          total: finalTotal,
          paymentMethod: 'Simulated Credit Card'
        });
        
        setCompletedOrder(newOrder);
        clearCart();
        setStep('CONFIRMATION');
      } else {
        setPaymentState('FAILED');
      }
    }, 2000);
  };

  if (step === 'CONFIRMATION' && completedOrder) {
    return (
      <div className="checkout-page bg-cream min-h-screen py-16">
        <div className="container max-w-2xl text-center">
           <div className="w-24 h-24 bg-sage rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md">
             <CheckCircle2 size={48} />
           </div>
           <h1 className="text-terracotta mb-2">Order Confirmed!</h1>
           <p className="text-lg text-gray-700 mb-8">Your order is officially on its way to becoming your pet's new favorite thing.</p>
           
           <div className="bg-white p-6 rounded-xl shadow-sm border border-border mb-8 text-left">
             <div className="flex justify-between border-b border-gray-100 pb-4 mb-4">
               <span><strong>Order Number:</strong><br/>{completedOrder.id}</span>
               <span><strong>Date:</strong><br/>{new Date(completedOrder.orderDate).toLocaleDateString()}</span>
             </div>
             
             <div className="mb-4 border-b border-gray-100 pb-4">
               <strong>Shipping To:</strong><br/>
               {shippingInfo.fullName}<br/>
               {shippingInfo.address} {shippingInfo.suite}<br/>
               {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
             </div>
             
             <div className="order-progress flex justify-between text-sm text-gray-500 font-bold mt-6 relative">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
               <div className="flex flex-col items-center"><div className="w-4 h-4 rounded-full bg-sage mb-2 ring-4 ring-white"></div>Placed</div>
               <div className="flex flex-col items-center"><div className="w-4 h-4 rounded-full bg-sage mb-2 ring-4 ring-white"></div>Confirmed</div>
               <div className="flex flex-col items-center"><div className="w-4 h-4 rounded-full bg-gray-300 mb-2 ring-4 ring-white"></div>Processing</div>
               <div className="flex flex-col items-center"><div className="w-4 h-4 rounded-full bg-gray-300 mb-2 ring-4 ring-white"></div>Shipped</div>
             </div>
           </div>
           
           <div className="flex justify-center gap-4">
             <Link to="/profile" className="btn btn-primary">View My Orders</Link>
             <Link to="/shop" className="btn btn-outline">Continue Shopping</Link>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page bg-cream min-h-screen py-12">
      <div className="container max-w-5xl">
        <h1 className="mb-8">Checkout</h1>
        
        <div className="grid md-grid-cols-2 gap-8">
          <div className="checkout-main">
            {/* Steps indicator */}
            <div className="flex items-center text-sm font-bold mb-8 text-gray-500">
              <span className={`flex items-center gap-1 ${step === 'SHIPPING' ? 'text-terracotta' : 'text-sage'}`}>
                1. Shipping <ChevronRight size={16}/>
              </span>
              <span className={`flex items-center gap-1 ${step === 'PAYMENT' ? 'text-terracotta' : ''}`}>
                2. Payment <ChevronRight size={16}/>
              </span>
              <span>3. Confirmation</span>
            </div>

            {step === 'SHIPPING' && (
              <form onSubmit={handleShippingSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <h2 className="text-xl mb-4">Shipping Information</h2>
                <div className="grid sm-grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input type="text" className="input-field" value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input type="email" className="input-field" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} required />
                  </div>
                  <div className="input-group sm-col-span-2">
                    <label className="input-label">Address</label>
                    <input type="text" className="input-field" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">City</label>
                    <input type="text" className="input-field" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">State</label>
                    <input type="text" className="input-field" value={shippingInfo.state} onChange={e => setShippingInfo({...shippingInfo, state: e.target.value})} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Zip Code</label>
                    <input type="text" className="input-field" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} required />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Phone (Optional)</label>
                    <input type="tel" className="input-field" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-full mt-6 py-3">Continue to Payment</button>
              </form>
            )}

            {step === 'PAYMENT' && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl m-0">Payment Details</h2>
                  <button className="text-sm text-olive underline" onClick={() => setStep('SHIPPING')}>Edit Shipping</button>
                </div>

                {paymentState === 'FAILED' && (
                  <div className="alert-error bg-red-50 text-error p-4 rounded-lg mb-4 border border-red-200">
                    Payment couldn't be completed. Please check your details and try again.
                  </div>
                )}

                <div className="bg-cream p-4 rounded-lg text-sm text-gray-600 mb-6 flex items-center gap-2">
                  <Lock size={16} className="text-brown" />
                  This is a simulated payment gateway. Do not enter real credit card details.
                </div>

                <form onSubmit={handlePayment}>
                  <div className="input-group">
                    <label className="input-label">Card Number</label>
                    <div className="relative">
                       <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                       <input type="text" className="input-field pl-10" placeholder="0000 0000 0000 0000" required defaultValue="4242 4242 4242 4242" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                      <label className="input-label">Expiry Date</label>
                      <input type="text" className="input-field" placeholder="MM/YY" required defaultValue="12/28" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">CVC</label>
                      <input type="text" className="input-field" placeholder="123" required defaultValue="123" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Name on Card</label>
                    <input type="text" className="input-field" required defaultValue={shippingInfo.fullName} />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full mt-4 py-3 flex justify-center items-center gap-2"
                    disabled={paymentState === 'PROCESSING'}
                  >
                    {paymentState === 'PROCESSING' ? (
                      <><Loader2 className="animate-spin" size={20} /> Processing...</>
                    ) : `Pay $${finalTotal.toFixed(2)}`}
                  </button>
                </form>
              </div>
            )}
          </div>

          <aside className="checkout-sidebar">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border mb-6">
              <h2 className="text-xl mb-4">Order Summary</h2>
              
              <div className="checkout-items mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 mb-4 border-b border-gray-50 pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1 text-sm">
                      <div className="font-bold text-brown">{item.name}</div>
                      <div className="text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="coupon-section mb-6 pb-6 border-b border-border">
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="input-field flex-1 text-sm"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="btn btn-outline py-1 px-4 text-sm" onClick={handleApplyCoupon}>Apply</button>
                </div>
                {couponMessage && <p className={`text-xs ${discount > 0 ? 'text-success' : 'text-error'}`}>{couponMessage}</p>}
              </div>

              {pawPoints >= 100 && (
                 <div className="points-section mb-6 pb-6 border-b border-border bg-warm-peach p-4 rounded-lg">
                   <h4 className="flex items-center gap-1 mb-2 text-terracotta">🐾 Loyalty Rewards</h4>
                   <p className="text-xs mb-2">You have {pawPoints} Paw Points available.</p>
                   <button 
                     className={`btn w-full text-sm ${usePoints ? 'btn-outline' : 'btn-secondary'}`} 
                     onClick={handleApplyPoints}
                   >
                     {usePoints ? 'Remove Reward' : 'Redeem Points for Discount'}
                   </button>
                 </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-terracotta">
                    <span>Reward Discount</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-brown border-t border-border pt-4 mt-4">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

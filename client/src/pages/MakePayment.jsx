import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';

export default function MakePayment() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type');

  const Items = [
    {
      type:1,
      name:'Weekly plan',
      price: "500",
      benefits: [
        'benefits 1',
        'benefits 2',
        'benefits 3',
        'benefits 4'
      ]
    },{
      type:2,
      name:'Monthly plan',
      price: "1500",
      benefits: [
        'benefits 1',
        'benefits 2',
        'benefits 3',
        'benefits 4'
        ]
    },{
      type:3,
      name:'Annual plan',
      price: "10000",
      benefits: [
        'benefits 1',
        'benefits 2',
        'benefits 3',
        'benefits 4'
      ]
    }
  ];

  const getPricePeriod = (type) => {
    if (type == 1) return "week";
    if (type == 2) return "month";
    if (type == 3) return "year";
    return ""; // or any default value if type is not 1, 2, or 3
  };

  const [formData, setFormData] = useState({
    merchant_id: 'YOUR_MERCHANT_ID',
    return_url: 'http://sample.com/return',
    cancel_url: 'http://sample.com/cancel',
    notify_url: 'http://sample.com/notify',
    order_id: 'ItemNo12345',
    items: `Subscription for ${getPricePeriod(type)}`,
    currency: 'LKR',
    amount: Items[type-1].price,
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    hash: ''
  });

  const generateHash = () => {
    const { merchant_id, order_id, amount, currency } = formData;
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const hash = md5(merchant_id + order_id + amountFormatted + currency + hashedSecret).toString().toUpperCase();
    return hash;
  };

  const merchantSecret = 'YOUR_MERCHANT_SECRET';

  const handleSubmit = (e) => {
    e.preventDefault();
    // const hash = generateHash();
    // setFormData({ ...formData, hash });
    // document.getElementById('paymentForm').submit();
  };

  console.log(formData);

  return (
    <div className='min-h-[calc(100vh-100px)] m-1 md:m-3  rounded-xl  bg-blue-800'>
      <div className="flex flex-col sm:flex-row w-[100%] justify-between items-center">
        <div className="sm:w-1/2 w-[90%] text-center h-[calc(100vh-120px)] m-4 ">
          <div className="flex flex-col text-white flex-1 justify-between h-[calc(50vh-50px)] ">
            <h1 className='text-xl mt-12 mb-6 font-bold'>{Items[type-1].name}</h1>
            <h1 className='text-lg mb-6 font-medium'>only {Items[type - 1].price}LKR per {getPricePeriod(type)}</h1>
            {Items[type-1].benefits.map((benefit, index) => (
              <div className='text-xs font-light' key={index}>{benefit}</div>
            ))}
          </div>
          <div className="flex items-center justify-center flex-1 h-[calc(50vh-70px)]">
            <div className='max-w-lg'>
              <img src="/payment.png" alt="" />
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 w-[90%] h-[calc(100vh-135px)] rounded-lg m-5 mb-3 bg-white">
          <div className="flex h-full">
            <form className="flex w-full flex-col text-left items-center justify-between" id="paymentForm" method="post" action="https://sandbox.payhere.lk/pay/checkout" onSubmit={handleSubmit}>
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="merchant_id" value={formData.merchant_id} />
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="return_url" value={formData.return_url} />
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="cancel_url" value={formData.cancel_url} />
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="notify_url" value={formData.notify_url} />
              <h1 className='mt-2 font-light text-left w-full pl-[10vw]'>Item Details</h1>
              <input className="w-4/5 rounded-md py-1 " type="text" name="order_id" value={formData.order_id} onChange={e => setFormData({ ...formData, order_id: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="items" value={formData.items} onChange={e => setFormData({ ...formData, items: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="currency" value={formData.currency} onChange={e => setFormData({ ...formData, currency: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="amount" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
              <h1 className='mt-2 font-light  text-left w-full pl-[10vw]'>Customer Details</h1>
              <input className="w-4/5 rounded-md py-1 " type="text" name="first_name" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="last_name" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="text" name="city" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="country" value={formData.country} />
              <input className="w-4/5 rounded-md py-1 " type="hidden" name="hash" value={formData.hash} />
              <input className="w-4/5 rounded-2xl my-3 py-1 border-solid border-2 border-blue-800 hover:bg-blue-800 hover:text-white" type="submit" value="Buy Now" />
            </form>          
          </div>
        </div>
      </div>
    </div>
  )
}

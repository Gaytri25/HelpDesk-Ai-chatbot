import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, Clock, PackageCheck, MapPin, ArrowRight } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

interface MockOrder {
  id: string;
  item: string;
  status: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered';
  stepIndex: number;
  carrier: string;
  trackingNumber: string;
  destination: string;
  estimatedDelivery: string;
  updates: { time: string; text: string; location: string }[];
}

const MOCK_ORDERS: Record<string, MockOrder> = {
  'ORD-9482': {
    id: 'ORD-9482',
    item: 'HelpDesk AI Enterprise Touch Kiosk (x2)',
    status: 'In Transit',
    stepIndex: 3,
    carrier: 'FedEx Express Worldwide',
    trackingNumber: 'FDX-8849201948',
    destination: 'Chicago, IL 60601',
    estimatedDelivery: 'Tomorrow, by 4:30 PM',
    updates: [
      { time: 'Today, 2:15 PM', text: 'Arrived at regional sorting facility', location: 'Chicago Hub, IL' },
      { time: 'Yesterday, 8:40 PM', text: 'Departed origin warehouse facility', location: 'San Francisco, CA' },
      { time: 'Aug 22, 10:00 AM', text: 'Hardware assembled & package scanned', location: 'Production Facility 1' },
      { time: 'Aug 21, 4:10 PM', text: 'Order confirmed & payment verified', location: 'HelpDesk AI System' }
    ]
  },
  'ORD-1029': {
    id: 'ORD-1029',
    item: 'Professional Annual Subscription License',
    status: 'Delivered',
    stepIndex: 4,
    carrier: 'Instant Digital Provisioning',
    trackingNumber: 'LIC-PRO-99201',
    destination: 'London, UK',
    estimatedDelivery: 'Activated Instantly',
    updates: [
      { time: 'Aug 20, 11:05 AM', text: 'API tokens generated and emailed to workspace admin', location: 'Cloud Gateway' },
      { time: 'Aug 20, 11:04 AM', text: 'Billing processed via Stripe Invoice', location: 'London Hub' }
    ]
  },
  'ORD-7711': {
    id: 'ORD-7711',
    item: 'Custom Domain SSL Certificate & Dedicated IP',
    status: 'Processing',
    stepIndex: 1,
    carrier: 'Automated DNS Provisioner',
    trackingNumber: 'DNS-JOB-4412',
    destination: 'Global Edge Network',
    estimatedDelivery: 'Within 2 hours',
    updates: [
      { time: 'Today, 10:00 AM', text: 'Validating CAA and DNS CNAME propagation', location: 'Global DNS Node' },
      { time: 'Today, 9:55 AM', text: 'Provisioning order initiated', location: 'Console' }
    ]
  }
};

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ 
  isOpen, 
  onClose,
  initialOrderId = 'ORD-9482'
}) => {
  const [query, setQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(MOCK_ORDERS[initialOrderId] || MOCK_ORDERS['ORD-9482']);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    const found = MOCK_ORDERS[clean];
    if (found) {
      setActiveOrder(found);
    } else {
      // Dynamic generated mock order if not found
      setActiveOrder({
        id: clean || 'ORD-GEN',
        item: 'HelpDesk AI Support Plan Package',
        status: 'In Transit',
        stepIndex: 2,
        carrier: 'Standard Ground Shipping',
        trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
        destination: 'Customer Delivery Address',
        estimatedDelivery: 'In 2-3 Business Days',
        updates: [
          { time: 'Today, 9:00 AM', text: 'In transit to local distribution center', location: 'Regional Hub' },
          { time: 'Yesterday, 3:30 PM', text: 'Order processed and package prepared', location: 'Central Depot' }
        ]
      });
    }
    setSearched(true);
  };

  const steps = ['Order Placed', 'Processing', 'Dispatched', 'In Transit', 'Delivered'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="modal-order-tracker"
        className="w-full max-w-xl bg-[#FFFFFF] border border-[#E8E3DE] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E8E3DE] bg-[#FAF9F7]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FDF2EE] border border-[#F6D5CC] rounded-lg">
              <Truck className="w-5 h-5 text-[#E76F51]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#252525]">Live Order & License Tracker</h3>
              <p className="text-xs text-[#6B6B6B]">Real-time logistics, courier dispatch & provisioning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6B6B] hover:text-[#252525] hover:bg-[#E8E3DE]/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-9482, ORD-1029, ORD-7711)"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-sm text-[#252525] placeholder:text-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#E76F51]/30 focus:border-[#E76F51] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-[#E76F51] hover:bg-[#C9573F] rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              Lookup
            </button>
          </form>

          {activeOrder && (
            <div className="space-y-5">
              {/* Order Header Summary */}
              <div className="p-4 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E3DE] pb-2.5">
                  <div>
                    <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase">Order Number</span>
                    <h4 className="font-mono text-sm font-bold text-[#252525]">{activeOrder.id}</h4>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#EDF7ED] text-[#3A7D44] border border-[#BDE3BD]">
                    {activeOrder.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#6B6B6B]">Product / License:</span>
                    <p className="font-medium text-[#252525] truncate">{activeOrder.item}</p>
                  </div>
                  <div>
                    <span className="text-[#6B6B6B]">Courier / Provider:</span>
                    <p className="font-medium text-[#252525]">{activeOrder.carrier}</p>
                  </div>
                  <div>
                    <span className="text-[#6B6B6B]">Estimated Arrival:</span>
                    <p className="font-medium text-[#252525] text-[#E76F51]">{activeOrder.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="py-2">
                <div className="flex items-center justify-between relative">
                  {/* Background line */}
                  <div className="absolute left-3 right-3 top-3.5 h-0.5 bg-[#E8E3DE] -z-0" />
                  
                  {steps.map((step, idx) => {
                    const isCompleted = idx <= activeOrder.stepIndex;
                    const isCurrent = idx === activeOrder.stepIndex;
                    return (
                      <div key={step} className="flex flex-col items-center z-10 text-center">
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isCompleted 
                              ? 'bg-[#E76F51] text-white shadow-xs' 
                              : 'bg-[#FFFFFF] border-2 border-[#E8E3DE] text-[#6B6B6B]'
                          } ${isCurrent ? 'ring-4 ring-[#FDF2EE]' : ''}`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={`text-[11px] mt-1.5 font-medium ${isCurrent ? 'text-[#E76F51] font-semibold' : 'text-[#6B6B6B]'}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity Log */}
              <div>
                <h5 className="text-xs font-semibold text-[#252525] uppercase tracking-wider mb-2.5">
                  Transit Events
                </h5>
                <div className="space-y-2.5">
                  {activeOrder.updates.map((upd, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-[#FAF9F7] border border-[#E8E3DE] rounded-xl text-xs">
                      <Clock className="w-4 h-4 text-[#6B6B6B] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-[#252525]">{upd.text}</p>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#6B6B6B]">
                          <span>{upd.time}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {upd.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#3D3D3D] rounded-xl transition-colors cursor-pointer"
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

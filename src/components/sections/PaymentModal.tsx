// PaymentModal.tsx
import  { useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronDown, CreditCard, Landmark, ShieldCheck, X } from "lucide-react";

export default function PaymentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Body scroll lock jab modal open ho
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm overflow-y-auto "
      role="dialog"
      aria-modal="true"
      onClick={onClose} // outer click to close
    >
      {/* stop click propagation so inner clicks don't close */}
      <div
        className="mx-auto w-full md:w-[960px] min-h-screen flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mt-0 w-full bg-[#207AEE] grid grid-cols-1 md:grid-cols-2 overflow-hidden md:rounded-2xl shadow-2xl animate-slideDown">
          {/* LEFT */}
          <div className="p-6 md:p-8 border-r bg-white border-slate-200">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-slate-700 hover:text-slate-900"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2 className="text-md font-semibold mb-4">Choose your plan</h2>

            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center justify-between rounded-xl border p-3 cursor-pointer hover:border-sky-500">
                <div className="flex items-center gap-2">
                  <input type="radio" name="plan" defaultChecked className="accent-sky-600" />
                  <span className="font-medium">Yearly</span>
                </div>
                <span className="text-sky-600 text-sm">$120/year (-16%)</span>
              </label>

              <label className="flex items-center justify-between rounded-xl border p-3 cursor-pointer hover:border-sky-500">
                <div className="flex items-center gap-2">
                  <input type="radio" name="plan" className="accent-sky-600" />
                  <span className="font-medium">Monthly</span>
                </div>
                <span className="text-slate-500 text-sm">$12/month</span>
              </label>
            </div>

            <div className="flex gap-2 mb-4 bg-slate-100 p-2 rounded-xl">
              <button className="flex-1 py-2 rounded-lg bg-[#1C78EE] text-white font-medium flex gap-3 justify-center items-center">
                <CreditCard size={18} /> Card
              </button>
              <button className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium flex gap-3 justify-center items-center">
                <Landmark size={18} /> Bank Transfer
              </button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <label className="text-sm font-bold text-slate-700">Credit card details</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="mt-1 w-full rounded-lg border p-3 bg-slate-100 text-sm focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex gap-2 absolute right-3 top-[45px]">
                  <img className="w-5" src="../../assets/visa.png" alt="Visa" />
                  <img className="w-5" src="../../assets/mastercard.png" alt="Mastercard" />
                  <img className="w-5" src="../../assets/american express.png" alt="Amex" />
                  <img className="w-5" src="../../assets/unionpay.png" alt="UnionPay" />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative w-1/2">
                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="MM / YYYY"
                    className="w-full rounded-lg border p-3 text-sm bg-slate-100 focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400"
                  />
                </div>
                <div className="relative w-1/2">
                  <ShieldCheck
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full rounded-lg border p-3 text-sm bg-slate-100 focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <p className="text-[12px] text-slate-400 mb-5">
                By providing your card information, you allow us to charge your card for future
                payments in accordance with their terms.
              </p>

              <div>
                <label className="text-sm font-bold text-slate-700">Billing address</label>
                <select
                  className="mt-1 w-full rounded-lg border p-3 bg-slate-100 text-sm focus:ring-2 focus:ring-sky-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="IN">India</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="AE">UAE</option>
                  <option value="SG">Singapore</option>
                </select>
                <input
                  type="text"
                  placeholder="Postal code"
                  className="mt-2 w-full rounded-lg border p-3 bg-slate-100 text-sm focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button className="w-full mt-4 py-3 bg-[#1C78EE] text-white rounded-lg font-semibold hover:bg-sky-700">
                Upgrade to Premium
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 text-white flex flex-col bg-[#207AEE]">
            <div>
              <h3 className="text-xl font-semibold mb-4">Add Payment Methods</h3>
              <div className="rounded-xl w-full mb-4">
                <img src="../../assets/creditCard.png" alt="Credit Card" />
              </div>

              <label className="block text-md font-medium mb-3">Card holder name</label>
              <input
                type="text"
                defaultValue="Alex Jhon"
                className="mt-1 w-full rounded-lg border border-white/20 bg-white p-3 text-slate-800 placeholder-slate-800"
              />

              <div className="mt-6">
                <button className="w-full text-left text-white rounded-lg font-medium flex items-center gap-3">
                  <ChevronDown /> More Options
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-[14px] text-slate-100">
              <div className="flex items-center gap-3">
                <span className="bg-slate-100/30 min-w-8 h-8 flex justify-center items-center rounded-full">
                  1
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-100/30 min-w-8 h-8 flex justify-center items-center rounded-full">
                  2
                </span>
                Aliquam mauris leo, consectetur vel blandit vitae.
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-100/30 min-w-8 h-8 flex justify-center items-center rounded-full">
                  3
                </span>
                Aliquet id purus, vitae aliquet mauris leo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

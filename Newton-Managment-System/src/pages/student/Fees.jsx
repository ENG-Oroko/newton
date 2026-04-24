import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { 
  CreditCard, 
  Wallet, 
  AlertCircle, 
  Smartphone, 
  Building, 
  Calendar,
  Download,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  MessageCircle,
  HelpCircle,
  Printer,
  Eye,
  ChevronRight,
  Phone,
  Mail,
  User
} from "lucide-react";

const Fees = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [bankReference, setBankReference] = useState("");
  const [paymentNote, setPaymentNote] = useState("");

  const total = 120000;
  const paid = 80000;
  const balance = total - paid;
  const progress = (paid / total) * 100;

  const stats = [
    {
      label: "Total Fees",
      value: `KES ${total.toLocaleString()}`,
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "2025/2026 Academic Year"
    },
    {
      label: "Paid",
      value: `KES ${paid.toLocaleString()}`,
      icon: Wallet,
      color: "text-green-600",
      bg: "bg-green-50",
      trend: "66% Complete"
    },
    {
      label: "Balance",
      value: `KES ${balance.toLocaleString()}`,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      trend: "Due: May 15, 2026"
    },
  ];

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: Smartphone,
      color: "bg-green-50 text-green-600",
      border: "border-green-200",
      description: "Pay via M-Pesa STK Push",
      processingTime: "Instant",
      fee: "KES 0",
      instructions: "Enter your M-Pesa registered number and we'll send a payment request"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-200",
      description: "Direct bank transfer",
      processingTime: "1-2 Business Days",
      fee: "KES 100",
      instructions: "Use your student ID as reference"
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600",
      border: "border-purple-200",
      description: "Visa, Mastercard, Amex",
      processingTime: "Instant",
      fee: "2.5% + KES 50",
      instructions: "Secure payment via our payment gateway"
    }
  ];

  const payments = [
    {
      id: "INV-001",
      date: "2026-02-10",
      amount: 30000,
      status: "Completed",
      method: "Bank Transfer",
      reference: "BT-2026-0210",
      receiptUrl: "#",
      semester: "Semester 2",
      category: "Tuition Fee"
    },
    {
      id: "INV-002",
      date: "2026-01-15",
      amount: 50000,
      status: "Completed",
      method: "M-Pesa",
      reference: "MP-2026-0115",
      receiptUrl: "#",
      semester: "Semester 2",
      category: "Tuition Fee"
    },
    {
      id: "INV-003",
      date: "2026-03-20",
      amount: 10000,
      status: "Pending",
      method: "Card Payment",
      reference: "-",
      receiptUrl: null,
      semester: "Semester 2",
      category: "Library Fee"
    },
  ];

  const feeBreakdown = [
    { item: "Tuition Fee", amount: 90000, dueDate: "2026-05-15" },
    { item: "Library Fee", amount: 10000, dueDate: "2026-05-15" },
    { item: "Lab Fee", amount: 15000, dueDate: "2026-05-15" },
    { item: "Sports Fee", amount: 5000, dueDate: "2026-05-15" },
  ];

  const bankDetails = {
    accountName: "University Fee Collection Account",
    bankName: "KCB Bank Kenya",
    accountNumber: "1234567890",
    branch: "University Way Branch",
    swiftCode: "KCBLKENX",
    reference: `STU-${Math.floor(Math.random() * 100000)}`
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setPaymentStep(3);
    }, 3000);
  };

  const resetPayment = () => {
    setSelectedPaymentMethod(null);
    setPaymentAmount("");
    setPaymentStep(1);
    setPaymentSuccess(false);
    setShowPaymentModal(false);
    setMpesaNumber("");
    setBankReference("");
    setPaymentNote("");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle size={14} />;
      case 'Pending': return <Clock size={14} />;
      case 'Failed': return <XCircle size={14} />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Fees & Payments</h1>
        <p className="text-gray-500">Manage your fee payments, view history, and make secure payments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl ${s.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={s.color} size={22} />
                </div>
                <span className="text-xs font-medium text-gray-500">{s.trend}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {s.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Progress Bar */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Payment Progress</h3>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center gap-2"
            >
              Make Payment <ChevronRight size={16} />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Overall Progress</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Total Due</p>
              <p className="text-lg font-bold text-gray-800">KES {total.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
              <p className="text-lg font-bold text-green-600">KES {paid.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Remaining Balance</p>
              <p className="text-lg font-bold text-red-600">KES {balance.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Receipt size={18} />
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-white rounded-xl text-gray-700 text-sm hover:bg-gray-50 transition flex items-center justify-between">
              <span>Download Fee Structure</span>
              <Download size={16} />
            </button>
            <button className="w-full px-4 py-2 bg-white rounded-xl text-gray-700 text-sm hover:bg-gray-50 transition flex items-center justify-between">
              <span>Payment History</span>
              <Eye size={16} />
            </button>
            <button className="w-full px-4 py-2 bg-white rounded-xl text-gray-700 text-sm hover:bg-gray-50 transition flex items-center justify-between">
              <span>Request Invoice</span>
              <Printer size={16} />
            </button>
            <button className="w-full px-4 py-2 bg-white rounded-xl text-gray-700 text-sm hover:bg-gray-50 transition flex items-center justify-between">
              <span>Get Payment Support</span>
              <HelpCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Wallet size={18} />
          Fee Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Item</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {feeBreakdown.map((fee, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
                  <td className="py-3 text-gray-700">{fee.item}</td>
                  <td className="text-gray-800 font-medium">KES {fee.amount.toLocaleString()}</td>
                  <td className="text-gray-600">{fee.dueDate}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="py-3 font-semibold text-gray-800">Total</td>
                <td className="font-bold text-gray-800">KES {total.toLocaleString()}</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment History with Enhanced Features */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Receipt size={18} />
            Payment History
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search payments..."
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Invoice ID</th>
                <th>Date</th>
                <th>Semester</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Reference</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-0 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedInvoice(p)}
                >
                  <td className="py-3 text-gray-700 font-medium">{p.id}</td>
                  <td className="text-gray-600">{p.date}</td>
                  <td className="text-gray-600">{p.semester}</td>
                  <td className="text-gray-600">{p.category}</td>
                  <td className="text-gray-800 font-medium">
                    KES {p.amount.toLocaleString()}
                  </td>
                  <td className="text-gray-600">{p.method}</td>
                  <td className="text-gray-600 text-xs">{p.reference}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${getStatusColor(p.status)}`}>
                      {getStatusIcon(p.status)}
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="text-green-600 hover:text-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReceipt(true);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => resetPayment()}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Make Payment</h3>
              <button onClick={resetPayment} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {paymentStep === 1 && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Amount (KES)
                    </label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum payment: KES 1,000</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Payment Method
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedPaymentMethod === method.id
                              ? `${method.border} bg-gray-50`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-xl ${method.color}`}>
                              <method.icon size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-800">{method.name}</h4>
                                  <p className="text-xs text-gray-500">{method.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-600">{method.processingTime}</p>
                                  <p className="text-xs text-gray-500">Fee: {method.fee}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setPaymentStep(2)}
                    disabled={!paymentAmount || !selectedPaymentMethod}
                    className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </>
              )}

              {paymentStep === 2 && (
                <>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Payment Details</h4>
                    
                    {selectedPaymentMethod === "mpesa" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          M-Pesa Registered Number
                        </label>
                        <input
                          type="tel"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          placeholder="0712345678"
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="mt-3 p-3 bg-green-50 rounded-xl">
                          <p className="text-sm text-green-800">
                            You will receive an STK push on your phone. Enter your M-Pesa PIN to complete payment.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "bank" && (
                      <div>
                        <div className="bg-gray-50 p-3 rounded-xl mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Bank Account Details:</p>
                          <p className="text-xs">Account Name: {bankDetails.accountName}</p>
                          <p className="text-xs">Bank: {bankDetails.bankName}</p>
                          <p className="text-xs">Account Number: {bankDetails.accountNumber}</p>
                          <p className="text-xs">Reference: {bankDetails.reference}</p>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transaction Reference
                        </label>
                        <input
                          type="text"
                          value={bankReference}
                          onChange={(e) => setBankReference(e.target.value)}
                          placeholder="Enter transaction reference"
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    )}

                    {selectedPaymentMethod === "card" && (
                      <div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Note (Optional)
                      </label>
                      <textarea
                        value={paymentNote}
                        onChange={(e) => setPaymentNote(e.target.value)}
                        rows="2"
                        placeholder="Add any additional information..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentStep(1)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={paymentProcessing}
                      className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50"
                    >
                      {paymentProcessing ? "Processing..." : `Pay KES ${parseInt(paymentAmount).toLocaleString()}`}
                    </button>
                  </div>
                </>
              )}

              {paymentStep === 3 && paymentSuccess && (
                <div className="text-center py-8">
                  <div className="mb-4">
                    <CheckCircle size={64} className="mx-auto text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h4>
                  <p className="text-gray-600 mb-4">
                    Your payment of KES {parseInt(paymentAmount).toLocaleString()} has been processed successfully.
                  </p>
                  <div className="bg-green-50 p-4 rounded-xl mb-6">
                    <p className="text-sm text-gray-700">Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p className="text-sm text-gray-700">Date: {new Date().toLocaleString()}</p>
                    <p className="text-sm text-gray-700">Method: {selectedPaymentMethod === 'mpesa' ? 'M-Pesa' : selectedPaymentMethod === 'bank' ? 'Bank Transfer' : 'Card Payment'}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        resetPayment();
                        window.location.reload();
                      }}
                      className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                      Done
                    </button>
                    <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition">
                      Download Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowReceipt(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <Receipt size={48} className="mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Receipt</h3>
              <div className="border-t border-b border-gray-200 py-4 my-4 text-left">
                <p className="text-sm py-1"><span className="font-semibold">Transaction ID:</span> INV-002</p>
                <p className="text-sm py-1"><span className="font-semibold">Date:</span> 2026-01-15</p>
                <p className="text-sm py-1"><span className="font-semibold">Amount:</span> KES 50,000</p>
                <p className="text-sm py-1"><span className="font-semibold">Method:</span> M-Pesa</p>
                <p className="text-sm py-1"><span className="font-semibold">Status:</span> Completed</p>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Fees;
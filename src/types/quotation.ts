export interface ProductItem {
  srNo: number;
  description: string;
  ratePerUnit: number;
  qty: number;
  amount: number;
}

export interface AddOnItem {
  srNo: number;
  name: string;
  price: string;
  checked: boolean;
}

export interface QuotationData {
  // Company
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWeb: string;
  logoUrl: string;

  // Reference
  refNo: string;
  date: string;
  customerName: string;
  customerState: string;

  // Product
  productTitle: string;
  specifications: string[];
  productImageUrl: string;
  products: ProductItem[];
  freightCharge: string;
  gstPercent: number;

  // Add-ons
  addOns: AddOnItem[];

  // Amount in words
  amountInWords: string;

  // Special Notes
  specialNotes: string[];

  // Page 2
  galleryImages: string[];
  galleryTitle: string;

  // Banking
  bankName: string;
  bankLogo: string;
  payTo: string;
  accountNo: string;
  ifsc: string;
  branch: string;
  gst: string;
  pan: string;
  upiId: string;
  qrCodeUrl: string;
}

export const defaultQuotationData: QuotationData = {
  companyName: "Mobilize Horizons",
  companyAddress: "D-27/585 GF, 100 Feet Road, Chhatarpur Hills, New Delhi - 110074",
  companyPhone: "+91-7042586744, 9205256111, 9971993004",
  companyEmail: "sales@mobilizehorizons.com",
  companyWeb: "www.mobilizehorizons.com",
  logoUrl: "/images/logo.png",

  refNo: "MHS156957",
  date: "07/03/2026",
  customerName: "",
  customerState: "",

  productTitle: "Bespoke Premium Indoor Stairlift - Military Grade Motor",
  specifications: [
    "125 kg load capacity.",
    "Rack and Pinion Drive Method",
    "24V DC (12V 7Ah x 2 Battery)",
    "Joystick Control & 2 Radio Remote Control",
    "Level Manual Folding Footrest",
    "Main Supply 100-240V AC",
    "The Lift is Universal",
  ],
  productImageUrl: "/images/product.jpg",
  products: [
    { srNo: 1, description: "Premium Bespoke Synergy Stairlift", ratePerUnit: 145000, qty: 2, amount: 290000 },
    { srNo: 0, description: "Extra Rail with Joint Kit & Clamp", ratePerUnit: 0, qty: 0, amount: 0 },
  ],
  freightCharge: "As per actual",
  gstPercent: 5,

  addOns: [
    { srNo: 1, name: "Constant Voltage Transformer (CVT)", price: "₹6,500", checked: false },
    { srNo: 2, name: "Rust-Proof Racking (4.5 Meters)", price: "₹10,000", checked: false },
    { srNo: 3, name: "Hinge Rail - Powered", price: "₹75,000", checked: false },
    { srNo: 4, name: "Lithium Battery", price: "₹30,000", checked: false },
  ],

  amountInWords: "Three Lakh Four Thousand Five Hundred Only",

  specialNotes: [
    "The stair lift carries a Warranty of 12 Months from the Invoice date.",
    "The above rates are valid for a period of 7 days only and are subject to change without prior notice.",
    "50% Advance for shipment and 50% On Delivery",
    "Freight Charge As Per Actual",
    "Power points to be done by the customer.",
  ],

  galleryImages: ["/images/photo1.jpg", "/images/photo2.png"],
  galleryTitle: "Bespoke Stairlift Photos",

  bankName: "Kotak Mahindra Bank Ltd",
  bankLogo: "/images/kotak-logo.png",
  payTo: "MOBILIZE HORIZONS",
  accountNo: "6848369507",
  ifsc: "KKBK0004627",
  branch: "4, Block-M, Malviya Nagar Saket, Delhi - 110017",
  gst: "07ABXFM0941Q1ZE",
  pan: "ABXFM0941Q",
  upiId: "mobilizehorizons@kotak",
  qrCodeUrl: "/images/qr-code.png",
};

export const BRAND = {
  name: "Velcraft",
  tagline: "Crafted for the Extraordinary",
  description:
    "Premium handcrafted footwear, designed by you, perfected by artisans.",
  whatsappNumber: "923001234567", // Placeholder — update with real number
  whatsappMessage: "Hi Velcraft! I'd like to place an order.",
  email: "hello@velcraft.com",
  instagram: "https://instagram.com/velcraft",
  address: "Lahore, Pakistan",
} as const;

export const NAVIGATION = [
  { label: "Collections", href: "/collections" },
  { label: "Custom Builder", href: "/configurator" },
  { label: "Our Story", href: "/story" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SHOE_SIZES = [
  "UK 5",
  "UK 6",
  "UK 7",
  "UK 8",
  "UK 9",
  "UK 10",
  "UK 11",
  "UK 12",
] as const;

export const PAYMENT_METHODS = [
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    description: "Transfer to our bank account",
    icon: "building-2",
    details: {
      bankName: "HBL - Habib Bank Limited",
      accountTitle: "Velcraft Pvt Ltd",
      accountNumber: "1234-5678-9012-3456",
      iban: "PK00HABB1234567890123456",
    },
  },
  {
    id: "easypaisa",
    name: "EasyPaisa",
    description: "Send via EasyPaisa mobile wallet",
    icon: "smartphone",
    details: {
      accountName: "Velcraft",
      accountNumber: "0300-1234567",
    },
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    description: "Send via JazzCash mobile wallet",
    icon: "smartphone",
    details: {
      accountName: "Velcraft",
      accountNumber: "0300-1234567",
    },
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: "banknote",
    details: null,
  },
] as const;

export const ORDER_STATUSES = [
  { key: "PENDING_PAYMENT", label: "Pending Payment", color: "#C9A96E" },
  {
    key: "PAYMENT_UNDER_REVIEW",
    label: "Payment Under Review",
    color: "#C9A96E",
  },
  { key: "CONFIRMED", label: "Confirmed", color: "#4A8B6F" },
  { key: "IN_PRODUCTION", label: "In Production", color: "#6B8BC9" },
  { key: "QUALITY_CHECK", label: "Quality Check", color: "#6B8BC9" },
  { key: "PACKED", label: "Packed", color: "#6B8BC9" },
  { key: "SHIPPED", label: "Shipped", color: "#8B6BC9" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", color: "#8B6BC9" },
  { key: "DELIVERED", label: "Delivered", color: "#4A8B6F" },
  { key: "CANCELLED", label: "Cancelled", color: "#C45B5B" },
  { key: "RETURNED", label: "Returned", color: "#C45B5B" },
] as const;

export const CONFIGURATOR_STEPS = [
  { id: "design", label: "Design", description: "Choose your shoe style" },
  { id: "color", label: "Color", description: "Select your palette" },
  {
    id: "material",
    label: "Material",
    description: "Pick premium materials",
  },
  { id: "sole", label: "Sole", description: "Choose your sole" },
  {
    id: "buckle",
    label: "Buckle & Lace",
    description: "Select hardware details",
  },
  {
    id: "accessories",
    label: "Accessories",
    description: "Add finishing touches",
  },
  { id: "engraving", label: "Engraving", description: "Personalize it" },
  { id: "size", label: "Size", description: "Find your perfect fit" },
  { id: "review", label: "Review", description: "Review your creation" },
] as const;

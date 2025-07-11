export interface AdditionalDetails {
  ratings: string;
  reviews: string;
  availableStock: string;
}

export interface Reputation {
  level: string;
  description: string;
}

export interface Metrics {
  sales: string;
  service: string;
  delivery: string;
}

export interface PurchaseOptions {
  price: number;
}

export interface SellerInformation {
  name: string;
  productsCount: string;
  reputation: Reputation;
  metrics: Metrics;
  purchaseOptions: PurchaseOptions;
}

export interface Product {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  paymentMethods: string[];
  sellerInformation: SellerInformation;
  additionalDetails: AdditionalDetails;
} 
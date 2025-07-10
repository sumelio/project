export interface AdditionalDetails {
  ratings: string;
  reviews: string;
  availableStock: string;
}

export interface Product {
  id: string;
  images: string[];
  title: string;
  description: string;
  price: string;
  paymentMethods: string[];
  sellerInformation: string;
  additionalDetails: AdditionalDetails;
} 
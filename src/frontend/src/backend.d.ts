import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    icon: string;
    name: string;
    products: Array<Product>;
}
export type Time = bigint;
export interface Contact {
    date: Time;
    name: string;
    message: string;
    phone: string;
}
export interface Product {
    name: string;
    unit: string;
    emoji: string;
    price: bigint;
}
export interface Review {
    date: Time;
    name: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    addReview(name: string, rating: bigint, comment: string): Promise<void>;
    getCategories(): Promise<Array<Category>>;
    getContacts(): Promise<Array<Contact>>;
    getReviews(): Promise<Array<Review>>;
    getStoreInfo(): Promise<{
        storeInfo: {
            tagline: string;
            name: string;
            address: string;
            phone: string;
        };
    }>;
    submitContact(name: string, phone: string, message: string): Promise<void>;
}

export interface Product {
    _id: string,
    name: string,
    description: string,
    images: string[],
    main_image: string,
    rating: number,
    ratings_total: number
    best_seller: string,
    category: string,
    price: number
}

import type Review from './Review';

export default interface Movie {
    id?: string;
    name: string;
    poster: string;
    genre: string;
    description: string;
    reviews?: Array<Review>;
}

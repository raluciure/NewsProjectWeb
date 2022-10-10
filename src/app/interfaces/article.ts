export interface Article {
    id: any,
    title: string,
    subtitle?: string,
    category: string,
    abstract: string,
    body?: string,
    update_date: string,
    image_data?: HTMLImageElement,
    image_media_type?: HTMLImageElement,
    thumbnail_image?: HTMLImageElement,
    thumbnail_media_type?: HTMLImageElement
}
export interface Post {
    id: string;
    title: string;
    content: string;
    likes: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePostDTO {
    title: string;
    content: string;
}

export interface UpdatePostDTO {
    title?: string;
    content?: string;
}

export type Post = {
    id: string;
    content: string;
    image?: string;
    author: Author;
    bookmarks: number;
    connections: number;
    maxConnection: number;
};

export type Author = {
    id: string;
    name: string;
    position: string;
    image?: string;
};
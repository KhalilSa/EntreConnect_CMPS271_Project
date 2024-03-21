export type Post = {
    id: string;
    content: string;
    image?: string;
    author: Author;
    bookmarks: number;
    connections: number;
    maxConnection: number;
};


export type Project = {
    id: string;
    title: string;
    description: string;
    members: Author[];
    bookmarks: number;
    size: number;
    capacity: number;
}

export type Author = {
    id: string;
    name: string;
    position: string;
    image?: string;
};

export type User = {
    id: string,
    name: string,
    position: string,
    image?: string,
    backImage?: string,
    about?: string,
    experience: Experience[];
}

export type Experience = {
    id: string,
    title: string,
    companyName: string,
    companyImage: string
}
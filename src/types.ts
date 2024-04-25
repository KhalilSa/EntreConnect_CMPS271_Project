export type Post = {
    id: string;
    content: string;
    image?: string;
    profile: Author;
    bookmarks: number;
    connections: number;
    maxconnection: number;
};


export type Project = {
    id: string;
    title: string;
    description: string;
    image?: string;
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
    backimage?: string,
    about?: string,
    experience: Experience[];
}

export type Experience = {
    id: string,
    title: string,
    companyname: string,
    companyimage: string
}
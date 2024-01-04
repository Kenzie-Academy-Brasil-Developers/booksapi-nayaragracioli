export interface IBook{
    id: number;
    name: string;
    pages: number;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TCreateBody = Omit<IBook, "id" | "createdAt" | "updatedAt">;
export type TUpdateBody = Partial<TCreateBody>;
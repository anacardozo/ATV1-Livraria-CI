export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    preco: number;
    sinopse: string;
    anoPublicacao: number;
    createdAt: string;
}

export interface CreateLivroDTO {
    titulo: string;
    autor: string;
    preco: number;
    sinopse: string;
    anoPublicacao: number;
}
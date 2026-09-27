import type { Livro, CreateLivroDTO } from "../types/livro";

const API_BASE_URL = "http://localhost:3000/api";

export const livroService = {
  // GET /api/livros - Listar todos os livros
  async list(): Promise<Livro[]> {
    const resposta = await fetch(`${API_BASE_URL}/livros`);
    if (!resposta.ok) {
      const erroBody = await resposta.json().catch(() => ({}));
      throw new Error(erroBody.erro || "Falha ao buscar a lista de livros.");
    }
    return resposta.json();
  },
  // POST /api/livros - Cadastrar novo livro
  async create(dados: CreateLivroDTO): Promise<Livro[]> {
    const resposta = await fetch(`${API_BASE_URL}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    if (!resposta.ok) {
      const erroBody = await resposta.json().catch(() => ({}));
      throw new Error(erroBody.erro || "Falha ao cadastrar Livro.");
    }
    return resposta.json();
  },
};
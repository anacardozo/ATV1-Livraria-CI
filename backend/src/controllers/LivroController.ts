import { Request, Response } from 'express';
import { Livro } from '../models/Livros';

export class LivroController {
  // GET /api/livros - Listar todos os Livros
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const livros = await Livro.findAll({
        attributes: [
          'id',
          'titulo',
          'autor',
          'preco',
          'sinopse',
          'anoPublicacao',
          'updatedAt',
        ],
      });

      return res.status(200).json(livros);
    } catch (error: any) {
      return res.status(500).json({
        erro: 'Erro ao listar todos os Livros!',
        detalhe: error.message,
      });
    }
  }

  // GET /api/livros/:id - Listar um Livro por ID
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      const valorIncorreto: number = "texto incompativel";

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          erro: 'O ID informado deve ser um numero valido.',
        });
      }

      const livro = await Livro.findByPk(id, {
        attributes: [
          'id',
          'titulo',
          'autor',
          'preco',
          'sinopse',
          'anoPublicacao',
          'updatedAt',
        ],
      });

      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado!' });
      }

      return res.status(200).json(livro);
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao listar o Livro!', detalhe: error.message });
    }
  }

  // POST /api/livros - Cadastrar Novo Livro
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { titulo, autor, preco, sinopse, anoPublicacao } = req.body;

      if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
      }

      if (!autor || typeof autor !== 'string' || autor.trim() === '') {
        return res.status(400).json({ erro: 'O campo autor é obrigatório' });
      }

      if (preco === undefined || typeof preco !== 'number' || preco < 0) {
        return res.status(400).json({
          erro: 'O campo preço é obrigatório e deve ser um número positivo',
        });
      }

      if (
        !sinopse ||
        typeof sinopse !== 'string' ||
        sinopse.trim() === '' ||
        sinopse.length > 200
      ) {
        return res.status(400).json({
          erro: 'O campo sinopse é obrigatório e deve conter no máximo 200 caracteres',
        });
      }

      const anoAtual = new Date().getFullYear();

      if (
        anoPublicacao === undefined ||
        typeof anoPublicacao !== 'number' ||
        !Number.isInteger(anoPublicacao) ||
        anoPublicacao < 0 ||
        anoPublicacao > anoAtual
      ) {
        return res.status(400).json({
          erro: 'O campo anoPublicação é obrigatório, deve ser um ano válido e não pode ser superior a ${anoAtual}',
        });
      }

      const livroExistente = await Livro.findOne({
        where: { titulo: titulo.trim(), autor: autor.trim() },
      });

      if (livroExistente) {
        return res.status(409).json({
          erro: 'Ja existe um Livro cadastrado com este titulo e autor.',
        });
      }

      const novoLivro = await Livro.create({
        titulo: titulo.trim(),
        autor: autor.trim(),
        preco: preco,
        sinopse: sinopse.trim(),
        anoPublicacao: anoPublicacao,
      });

      return res.status(201).json({
        id: novoLivro.id,
        titulo: novoLivro.titulo,
        autor: novoLivro.autor,
        preco: novoLivro.preco,
        sinopse: novoLivro.sinopse,
        anoPublicacao: novoLivro.anoPublicacao,
        createdAt: novoLivro.createdAt,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao cadastar o Livro', detalhe: error.message });
    }
  }

  // PUT /api/livros/:id - Atualizar um Livro existente
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({
          erro: 'O ID informado deve ser um numero valido.',
        });
      }

      const { titulo, autor, preco, sinopse, anoPublicacao } = req.body;

      const livro = await Livro.findByPk(id);

      if (!livro) {
        return res
          .status(404)
          .json({ erro: 'Livro não encontrado para atualização!' });
      }

      if (titulo !== undefined) {
        if (typeof titulo !== 'string' || titulo.trim() === '') {
          return res
            .status(400)
            .json({ erro: 'O campo titulo deve ser um texto valido.' });
        }

        livro.titulo = titulo.trim();
      }

      if (autor !== undefined) {
        if (typeof autor !== 'string' || autor.trim() === '') {
          return res
            .status(400)
            .json({ erro: 'O campo autor deve ser um texto valido.' });
        }

        livro.autor = autor.trim();
      }

      if (preco !== undefined) {
        if (typeof preco !== 'number' || preco < 0) {
          return res
            .status(400)
            .json({ erro: 'O campo preço deve ser um número positivo.' });
        }

        livro.preco = preco;
      }

      if (sinopse !== undefined) {
        if (typeof sinopse !== 'string' || sinopse.trim() === '') {
          return res
            .status(400)
            .json({ erro: 'O campo sinopse deve ser um texto valido.' });
        }

        livro.sinopse = sinopse.trim();
      }

      const anoAtual = new Date().getFullYear();

      if (anoPublicacao !== undefined) {
        if (
          typeof anoPublicacao !== 'number' ||
          !Number.isInteger(anoPublicacao) ||
          anoPublicacao < 0 ||
          anoPublicacao > anoAtual
        ) {
          return res.status(400).json({
            erro: `O campo anoPublicação deve ser um ano válido e não pode ser superior a ${anoAtual}`,
          });
        }

        livro.anoPublicacao = anoPublicacao;
      }

      const livroExistente = await Livro.findOne({
        where: { titulo: livro.titulo, autor: livro.autor },
      });

      if (livroExistente && livroExistente.id !== id) {
        return res.status(409).json({
          erro: 'Ja existe um Livro cadastrado com este titulo e autor.',
        });
      }

      await livro.save();

      return res.status(200).json({
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        preco: livro.preco,
        sinopse: livro.sinopse,
        anoPublicacao: livro.anoPublicacao,
        updatedAt: livro.updatedAt,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao atualizar o Livro', detalhe: error.message });
    }
  }

  // DELETE /api/livros/:id - Remover um Livro
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res
          .status(400)
          .json({ erro: 'O ID informado deve ser um numero valido.' });
      }

      const livro = await Livro.findByPk(id);

      if (!livro) {
        return res
          .status(404)
          .json({ erro: 'Livro não encontrado para exclusão.' });
      }

      await livro.destroy();

      return res.status(204).send();
    } catch (error: any) {
      return res
        .status(500)
        .json({ erro: 'Erro ao excluir Livro.', detalhe: error.message });
    }
  }
}

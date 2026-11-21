# -- Build da Aplicação
FROM node:24-alpine AS builder

WORKDIR /app

#Instalar o pnpm globalmente para gerenciar as dependências
RUN npm install -g pnpm

# Desativa a restrição do pnpm 11
RUN pnpm config set strict-dep-builds false

# Copia apenas o manifesto de dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar as dependências do projeto
RUN pnpm install --frozen-lockfile

# Copia do código-fonte e da configuração do TypeScript
COPY tsconfig.json ./
COPY src ./src

# Compilação do TypeScript para JavaScript (gera a pasta dist/)
RUN pnpm run build

# Remoção das dependências de desenvolvimento para diminuir o tamanho final
RUN pnpm prune --prod

# -- Imagem Final de Execução (Produção)

FROM node:24-alpine AS runner

WORKDIR /app

# Definição do ambiente como produção
ENV NODE_ENV=production
ENV PORT=3000

# Criação de um usuário do sistema sem privilégios de root para segurança
RUN addgroup --system --gid 1001 VelarisLibrary && \
    adduser --system --uid 1001 VelarisLibrary

# Copia dos manifestos, dependências de produção e artefatos compilados
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Ajuste de permissões para o usuário não-root
USER VelarisLibrary

# Exposição da porta padrão da API
EXPOSE 3000

# Comando de inicialização do servidor compilado
CMD ["node", "dist/server.js"]

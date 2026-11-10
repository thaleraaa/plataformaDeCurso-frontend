export type Aula = {
    id: string;
    titulo: string;
    descricao: string;
    conteudo: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateAulaInput = {
    titulo: string;
    descricao: string;
    conteudo: string;
};

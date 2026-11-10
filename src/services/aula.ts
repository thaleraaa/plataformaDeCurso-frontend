import { API_URL, readApiResponse } from "@/src/lib/api";
import type { Aula, CreateAulaInput } from "@/src/types/aula";

export async function listAulas() {
    const response = await fetch(`${API_URL}/aulas`, {
        credentials: "include",
        cache: "no-store",
    });

    return readApiResponse<Aula[]>(response);
}

export async function createAula(input: CreateAulaInput) {
    const response = await fetch(`${API_URL}/aulas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(input),
    });

    return readApiResponse<Aula>(response);
}

export async function listAvailableLessons() {
    const response = await fetch(`${API_URL}/aulas/disponiveis`, {
        credentials: "include",
        cache: "no-store",
    });

    return readApiResponse<{
        id: string;
        titulo: string;
        descricao: string;
        conteudo: string;
        professor: { nome: string };
    }[]>(response);
}

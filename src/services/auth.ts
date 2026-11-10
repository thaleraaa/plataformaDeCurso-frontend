import type {
    RegisterStudentInput
} from "@/src/types/auth"
import { API_URL, readApiResponse } from "../lib/api";
import type { LoginResponse } from "../types/auth";

export async function login(email: string, senha: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
    });

    return readApiResponse<LoginResponse>(response);
}

export async function registerStudent(dados: RegisterStudentInput) {
    const response = await fetch(`${API_URL}/cadastro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
    });

    return readApiResponse(response);
}

export async function logout() {
    const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    return readApiResponse<{ success: boolean }>(response);
}
import type {
    RegisterStudentInput
} from "@/src/types/auth"
import { API_URL, readApiResponse } from "../lib/api";

export async function registerStudent(dados: RegisterStudentInput) {
    const response = await fetch(`${API_URL}/cadastro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    return readApiResponse(response);
}
import { Contact } from "@/types";

interface ApiErrorResponse {
  errors?: { [key: string]: string[] }; // Для ошибок валидации (HTTP 400)
  error?: string; // Для серверных ошибок (HTTP 500)
}

export async function postContact({ phone, comment, consent, product = "" }: Contact) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Валидация на фронтенде
  if (!phone.trim()) {
    throw new Error("Номер телефона обязателен");
  }
  if (!consent) {
    throw new Error("Необходимо дать согласие на обработку данных");
  }

  try {
    const response = await fetch(`${BASE_URL}/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.trim(),
        comment: comment.trim(),
        consent,
        product: product ? product.trim() : "", // Явно отправляем пустую строку
      }),
      // Убрали credentials: 'include', так как не требуется для AllowAny
      signal: AbortSignal.timeout(10000), // Таймаут 10 секунд
    });

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json();
      if (response.status === 400 && errorData.errors) {
        // Извлекаем первую ошибку для UX
        const errorMessage = Object.values(errorData.errors)[0]?.[0] || "Ошибка валидации данных";
        throw new Error(errorMessage);
      } else if (errorData.error) {
        throw new Error(errorData.error); // Серверная ошибка (например, SMTP)
      }
      throw new Error(`Ошибка ${response.status}: Не удалось отправить данные`);
    }

    return await response.json(); // { message: "Сообщение успешно отправлено" }
  } catch (error) {
    // Логируем для отладки
    console.error("Ошибка в postContact:", error);
    throw error instanceof Error ? error : new Error("Неизвестная ошибка при отправке данных");
  }
}
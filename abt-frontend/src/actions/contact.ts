'use server'

import {postContact} from "@/lib/api/contact";

export async function postContactAction(
	phone: string,
	comment: string,
	consent: boolean,
	honeypot?: string,   // Ловушечное поле
	formLoadTime?: number, // Время загрузки формы
	product?: string
) {
	try {
		// 1. Проверка ловушечного поля
		if (honeypot && honeypot.trim() !== '') {
			console.log('Bot detected: honeypot field filled');
			return {success: false, error: 'Bot detected'};
		}

		// 2. Проверка времени заполнения формы
		if (formLoadTime) {
			const submitTime = Date.now();
			const formFillTime = submitTime - formLoadTime;

			// Если форма заполнена менее чем за 2 секунды - вероятно бот
			if (formFillTime < 2000) {
				console.log('Bot detected: form filled too fast', formFillTime);
				return {success: false, error: 'Form filled too fast'};
			}
		}

		// 3. Если проверки пройдены - отправляем данные
		await postContact({phone, comment, consent, product});
		return {success: true};

	} catch (error) {
		console.error("Ошибка в postContactAction:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Неизвестная ошибка"
		};
	}
}
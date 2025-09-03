import { NextResponse} from "next/server"

export const revalidate = 3600 // 1 час

export async function GET() {
	try {
		const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
		const response = await fetch(`${backendUrl}/api/products/`)

		if (!response.ok) {
			// ВАЖНО: возвращаем пустой массив вместо ошибки
			return NextResponse.json([]) // ← ИЗМЕНИЛОСЬ ЗДЕСЬ
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch {
		return NextResponse.json([])
	}

}
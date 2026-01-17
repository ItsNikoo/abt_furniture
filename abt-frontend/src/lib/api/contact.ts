import {Contact} from '@/types'
import {apiRequest} from "@/lib/utils/apiRequest";

export async function postContact({name, phone, comment, consent, product = ''}: Contact) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('phone', phone)
  formData.append('comment', comment)
  if (product !== '') {
    formData.append('product', product)
  }
  if (!consent) {
    throw new Error('Необходимо дать согласие на обработку данных')
  }

  const data = {
    name: name.trim(),
    phone: phone.trim(),
    comment: comment.trim(),
    consent: consent,
    product: product ? product.trim() : '',
  }

  return apiRequest<Contact>(
    `/contact/`,
    {
      method: 'POST',
      data: data,
      isFormData: false
    }
  )
}
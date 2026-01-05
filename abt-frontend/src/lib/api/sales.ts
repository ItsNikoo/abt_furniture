import {Sale, SaleData} from '@/types'
import {apiRequest} from "@/lib/utils/apiRequest";

export async function fetchSales(): Promise<Sale[]> {
  return apiRequest<Sale[]>(`/sales/`, {method: 'GET'});
}

export async function postSale(data: SaleData, token: string) {
  const formData = new FormData()
  formData.append('description', data.description)
  if (data.photoFile) {
    formData.append('photo_file', data.photoFile)
  }
  if (data.mobilePhotoFile) {
    formData.append('mobile_photo_file', data.mobilePhotoFile)
  }
  formData.append('link', data.link)
  return apiRequest<Sale>(
    `/sales/`,
    {
      method: "POST",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function patchSale(id: string, data: SaleData, token: string) {
  const formData = new FormData()
  formData.append('description', data.description)
  formData.append('link', data.link)
  if (data.photoFile) {
    formData.append('photo_file', data.photoFile)
  }
  if (data.mobilePhotoFile) {
    formData.append('mobile_photo_file', data.mobilePhotoFile)
  }
  return apiRequest(
    `/sales/${id}`,
    {
      method: "PATCH",
      data: formData,
      token: token,
      isFormData: true,
    }
  )
}

export async function deleteSale(id: string, token: string) {
  return apiRequest(
    `/sales/${id}/`,
    {
      method: 'DELETE',
      token: token,
    }
  )
}
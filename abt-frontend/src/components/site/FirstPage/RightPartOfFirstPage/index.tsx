import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function RightPartOfFirstPage() {
  return (
    <div className="w-1/2 flex justify-center items-center">
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-fit max-w-[360px]">
        {/* Декоративный элемент сверху */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-mainPurple"></div>

        {/* Контентная часть */}
        <div className="pt-8 px-8 pb-6">
          <p className={'text-center mb-5'}>Предложите нам идею, и мы поможем вам ее реализовать</p>
          <form className={'flex flex-col gap-3'} action="">
            <Input className={'py-[25px]'} placeholder={'Введите номер телефона'}/>
            <Input className={'py-[25px]'} placeholder={'Комментарий или пожелания...'}/>
            <div>
              <Label className={'text-gray-500 text-sm'}>
                Отправьте эскиз или фото
              </Label>
              <Input type="file" placeholder={'Отправьте эскиз'}/>
            </div>
            <Button className={'py-[25px] bg-mainPurple text-white text-md font-bold hover:bg-mainPurpleHovered'}>Рассчитать
              стоимость</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

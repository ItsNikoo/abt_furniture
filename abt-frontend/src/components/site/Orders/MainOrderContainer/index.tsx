'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function MainOrderContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        comment: '',
        file: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            console.log('Отправленные данные:', {
                phone: formData.phone,
                comment: formData.comment,
                fileName: formData.file?.name || 'Файл не прикреплен'
            });
            setIsSubmitting(true);
            setSuccess("Ваш запрос успешно отправлен! Мы свяжемся с вами в ближайшее время.");
            setFormData({
                phone: '',
                comment: '',
                file: null
            });

            setTimeout(() => {
                setIsOpen(false);
                setSuccess(null);
                setIsSubmitting(false);
            }, 3000);
        } catch (e) {
            setError(`Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз. (${e})`);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className='mb-5 font-bold bg-mainPurple rounded-xl px-20 py-8 text-base hover:bg-mainPurpleHovered'>
                    Заказать проект
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={'font-bold text-xl'}>Заказ</DialogTitle>
                    <DialogDescription>
                        Мы готовы реализовать любой амбициозный проект
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={'py-6'}
                        placeholder="Введите номер телефона"
                        type="tel"
                        required
                    />
                    <Input
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className={'py-6'}
                        placeholder="Комментарий или пожелания..."
                    />
                    <div className="space-y-2">
                        <Label className="text-gray-500 text-sm">
                            Отправьте эскиз или фото
                        </Label>
                        <Input
                            name="file"
                            onChange={handleChange}
                            type="file"
                            accept="image/*,.pdf"
                        />
                        {formData.file && (
                            <p className="text-sm text-gray-600">
                                Выбран файл: {formData.file.name}
                            </p>
                        )}
                    </div>
                    {success && <p className={'text-green-400 text-sm'}>{success}</p>}
                    {error && <p className={'text-red-400 text-sm'}>{error}</p>}
                    <div className='flex justify-end gap-2 mt-4'>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                disabled={isSubmitting}
                            >
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className={'py-6 bg-mainPurple text-white text-md font-bold hover:bg-mainPurpleHovered'}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Отправка...' : 'Заказать проект'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
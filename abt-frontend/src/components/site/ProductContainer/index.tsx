"use client";

import {Product} from "@/types";
import ProductPhotoCarousel from "@/components/ui/Embla/ProductPhotoCarousel";
import {Metadata} from "next";


export default function ProductContainer({product}: { product: Product }) {
    return (
        <div className='flex gap-5 mt-10'>
            <div className={'w-1/2'}>
                {product.photos && <ProductPhotoCarousel photos={product.photos}/>}
            </div>
            <div className='flex flex-col justify-center gap-5 w-1/2'>
                <div>
                    <p className='text-gray-400 font-medium'>{product.category}</p>
                    <h1 className='text-5xl font-bold'>{product.title}</h1>
                </div>
                <div className={'flex gap-1'}>
                    <p className={'text-gray-400'}>Цена за погонный метр - </p>
                    <p>{product.price} руб.</p>
                </div>
                <div>
                    <h1 className={'text-gray-400'}>{product.description}</h1>
                </div>
            </div>
        </div>
    );
}

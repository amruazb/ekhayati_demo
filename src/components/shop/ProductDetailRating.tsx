'use client'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export interface ProductDetailRatingProps {
  value: number;
}

export function ProductDetailRating({ value }: ProductDetailRatingProps) {

  return (
    <div className="flex flex-row justify-start items-center">
      <Rating value={value || 0}
                readOnly
                isDisabled
                items={5} style={{ maxWidth: 100 }} />
      <p className="text-secondary-900 ml-2 opacity-100 sm:text-[18px]">{value}</p>
    </div>
  )
}
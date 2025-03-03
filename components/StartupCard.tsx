import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup, "author"> & {author? : Author}; 

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const { _createdAt, views, author, _id, description, image, category, title } = post;

    return (
        <li className='startup-card group'>
            <div className="flex-between">
                <p className="startup_card_date">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex gap-1.5">
                    <EyeIcon className='size-6 text-primary' />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>
            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <p className='text-26-medium line-clamp-1'>{title}</p>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image ?? "https://placehold.co/48x48"} alt="placeholder" width={40} height={40} className='rounded-full border border-black' />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <img src={image} alt="banner" className='startup-card_img' />
            </Link>
            <div className="flex-between mt-5 gap-3">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className='text-16-medium line-clamp-1'>{category}</p>
                </Link>
                <Button className='startup-card_btn' asChild>
                    <Link href={`/startup/${_id}`} >Details</Link>
                </Button>
            </div>
        </li>
    )
}

export default StartupCard
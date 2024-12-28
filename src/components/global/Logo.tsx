import React from 'react'
import Image from 'next/image'
import Logos from "../../../public/LuxeenBois.png"
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src={Logos} className='w-28' alt='Logo' width={112} height={50} />
        </Link>
    </div>
  )
}

export default Logo
import React from 'react'
import Image from 'next/image'
type Props = {
    size?: number
}

const LogoLoading = ({size = 100}: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center"><Image src="/logo.svg" alt="logo" width={size} height={size}/></div>
  )
}

export default LogoLoading
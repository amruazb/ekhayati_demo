
'use client'
import { Button } from '@nextui-org/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

const ShopPageHeader = ({title, description, coloredTitle}: {title: string, coloredTitle: string, description: string}) => {
  const router = useRouter();

  const handleBack = () => {
    // router.prefetch();
    router.back();
  }

  return (
    <header style={{boxSizing: "border-box"}} className="xs:mb-12 sm:mb-12 flex min-h-[50px] justify-start items-center">
      <div className=" flex items-center justify-center h-[60px] px-3">
        <Button onClick={handleBack} isIconOnly size="sm" className="xs:text-[15px] xs:min-w-[25px] xs:min-h-[25px] xs:h-[25px] bg-transparent text-[20px] w-[10px] p-x-0 rounded-md border-white border-2"><IconChevronLeft className='xs:w-[15px]' /></Button>
      </div>
      <div>
        <h1 className="text-white xs:text-[20px] text-5xl font-black">{title} <span className="text-secondary">{coloredTitle}</span></h1>
        <p className="text-caption">{description}</p>
      </div>
    </header>
  );
}

export default ShopPageHeader;
import { Button } from "@nextui-org/react";
import { IconChevronLeft } from "@tabler/icons-react";

const BackButton = ({onClick}: {onClick: () => void}) => {
  return <Button onClick={onClick} className={`bg-transparent mt-3 sm:w-[148px] xs:w-[150px] sm:h-[48px] xs:h-[49.13px] sm:text-[19px] xs:text-[17px] xs:font-medium text-white rounded rounded-s`} startContent={<IconChevronLeft />}>Back</Button>
}

export default BackButton;
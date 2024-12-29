import { Link } from "@/utils";
import { Button } from "@nextui-org/react";
import { IconChevronRight } from "@tabler/icons-react";

const SignupButton = () => {
  return <Link href={"/signup"} prefetch={true}><Button className={`bg-transparent sm:w-[148px] xs:w-[120px] sm:h-[48px] xs:h-[49.13px] sm:text-[19px] xs:text-[17px] xs:font-medium text-white rounded rounded-s ml-2`} endContent={<IconChevronRight />}>Sign up</Button></Link>
}

export default SignupButton;
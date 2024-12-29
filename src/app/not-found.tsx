import { Link } from "@/utils";
import Image from "next/image";

export const dynamic = "force-dynamic";
const NotFoundPage = () => {

  return (
    <div className="w-full h-full mt-[-60px]">
      <div className="w-full h-screen flex flex-col items-center justify-center xs:px-5 ">
        <Image unoptimized src="/images/tailor-gif.gif" alt="404" width={"0"} height={"0"} sizes="100vw" className="w-[200px] aspect-square" />
        <h1 className="text-2xl font-bold my-5 text-center xs:my-5">The tailor is customizing this area for you</h1>
        <h2 className="text-md font-medium">Please don&apos;t distract him and go <Link href={"/"} prefetch={true} className="text-secondary text-underline">Home</Link></h2>
      </div>
    </div>
  )
}
export default NotFoundPage;

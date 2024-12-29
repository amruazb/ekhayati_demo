import { Link } from "../../utils/navigation";

const LinkButton = ({title, endIcon, paddingLeft, thin, to}: { title: string, endIcon?: JSX.Element, paddingLeft?: number, thin?: boolean, to?: any}) => {
  return <Link href={to || "#"} prefetch={true} scroll={true}> <div className={`bg-transparent text-white rounded rounded-s font-medium text-sm px-8 flex items-center py-2 ${thin ? "h-auto p-0" : ""} h-auto ` + (typeof paddingLeft != "undefined" && paddingLeft >= 0 ? " pl-" + paddingLeft : "") }>{title} <span className="mx-1"></span> {endIcon}</div> </Link>
}

export default LinkButton;
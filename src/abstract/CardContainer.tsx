
import Image from "next/image";
import Neadle from "../../public/assets/images/border-needle.png";

const CardContainer = ({relative, children, scissors, noPadding, borderRadius, leftPosition, transparentBg, extraClasses}: {extraClasses?: string, relative?: boolean, transparentBg?: boolean, children: React.ReactNode, scissors: boolean, noPadding?: boolean, borderRadius?: number , leftPosition?: number}) => {
  //tailwind border dashed
  return (
    <div className={`${extraClasses ? extraClasses : ""} ${relative ? "relative" : ""} ${noPadding ? '' : "px-2 py-2"} ${transparentBg ? "bg-transparent" : "bg-primary-700"} h-full left-[21px]`} style={{
    // borderStyle: "dashed",
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='rgba(255, 217, 146, 1)' rx='${borderRadius ? borderRadius : '6'}' ry='${borderRadius ? borderRadius : '6'}' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      position: "relative",
      borderRadius: borderRadius ? borderRadius : 4.7,
      left: leftPosition !== undefined ? leftPosition : 0,
    }}>
      {
        scissors != false && <Image priority={true} unoptimized width={50} height={50} alt="" src={Neadle.src} style={{ height: 30, width: 30,
          position: "absolute",
          left: -18,
          top: 60,
        }} />
      }
      {children}
    </div>
  )
}

export default CardContainer;
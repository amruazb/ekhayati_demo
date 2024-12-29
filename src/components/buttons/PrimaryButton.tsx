import { Button } from "@nextui-org/react"

const PrimaryButton = ({title, onClick}: { title: string, onClick?:() => void }) => {
  //border radius 10px
  return <Button onClick={onClick} className="bg-secondary-800 text-black rounded rounded-s font-medium text-sm px-8 py-2">{title}</Button>
}

export default PrimaryButton
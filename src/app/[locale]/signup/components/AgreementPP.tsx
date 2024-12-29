import { Checkbox, Link } from "@nextui-org/react"


const AgreementPP = ({errorMessage, extras}: { errorMessage?: string, extras?: any }) => {
  return <Checkbox 
  isInvalid={errorMessage ? true : false}
  {...extras}
  color="secondary"
  
  classNames={{
    label: ["text-[12px]"],
    wrapper: ["bg-transparent", "xs:text-[12px]"]
  }}>By Checking this, you allow us to store and use your email and data
  for our related process in this platform</Checkbox>
}

export default AgreementPP;
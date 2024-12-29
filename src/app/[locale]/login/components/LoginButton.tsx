import { Button } from "@nextui-org/react";

const LoginButton = ({label, onClick, type, isLoading }: { label: string, onClick?: () => void, type?: "button" | "submit" | "reset" | undefined, isLoading?: boolean }) => {
  return (<Button 
    isLoading={isLoading} 
    type={type} 
    onClick={onClick} 
    className="bg-secondary-800 w-full h-[48px] text-[19px] font-medium text-theme-900 rounded"
    >{label}</Button>);
}

export default LoginButton;
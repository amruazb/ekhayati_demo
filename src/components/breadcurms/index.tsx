'use client'
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react"
import { useLocale } from "next-intl"

export interface AppBreadCrumbsProps {
  items: {
    href?: string;
    label: string;
  }[]
}

export const AppBreadCrumbs = (props: AppBreadCrumbsProps) => {
  const locale = useLocale();
  return (
    <Breadcrumbs className="xs:hidden">
      {
        props.items.map((item, index) => <BreadcrumbItem key={index} href={item.href}>{item.label}</BreadcrumbItem>)
      }
    </Breadcrumbs> 
  )
}
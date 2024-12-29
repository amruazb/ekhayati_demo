"use client";
import { useRouter } from "@/utils";
import { Avatar, Button, Card, CardHeader } from "@nextui-org/react";
import { IconEye } from "@tabler/icons-react";

export interface MekhwarFabricComponentProps {
  fabrics: any;
}

export default function MekhwarFabricComponent({
  fabrics,
}: MekhwarFabricComponentProps) {
  const router = useRouter();

  return (
    <p className="m-0 mt-0 text-white font-[14px] w-[100%]">
      {fabrics?.data?.id ? (
        <Card className="max-w-[340px] bg-transparent shadow-sm px-0">
          <CardHeader className="justify-between pr-0 pl-1 xs:py-0">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="sm"
                size="md"
                src={
                  fabrics?.data?.attributes?.main_image?.data?.attributes.formats?.thumbnail?.url
                }
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {fabrics?.data?.attributes?.name}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {fabrics?.data?.attributes?.category?.data?.attributes?.name}
                </h5>
              </div>
            </div>
            <Button
              color="primary"
              radius="full"
              size="sm"
              onClick={() =>
                router.push({
                  pathname: `/shop/fabric/[fabricId]`,
                  params: { fabricId: fabrics?.data?.id },
                })
              }
            >
              <IconEye size={20} />
            </Button>
          </CardHeader>
        </Card>
      ) : (
        <></>
      )}
    </p>
  );
}

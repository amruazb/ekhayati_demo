"use client";
import { Button } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import {
  getLocalFavorites,
  storeLocalFavorites,
  useRouter,
} from "@/utils";
import { useAuth } from "@/provider/AuthContext";
import { addToFavorite, removeFromFavorite } from "@/provider";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
export const FavoriteButtonSmall = ({ id }: { id: number | undefined }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const locale = useLocale();
  const ctx = useAuth();
  const router = useRouter();

  const loadData = () => {
    const fab = getLocalFavorites();
    if (fab.includes(id)) {
      setIsFavorited(true);
    }
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    if (ctx.checkAuth()) {
      if (!isFavorited) {
        await handleAddToFavorite();
      } else {
        await handleRemoveFromFavorites();
      }
      return;
    }
    router.push("/login");
  };

  const handleAddToFavorite = async () => {
    setIsLoading(true);

    const { data, error }: any = await addToFavorite(ctx.token, {
      //@ts-ignore
      productID: id,
      locale,
    });

    const fab: any = [];

    data?.res.forEach((item: any) => {
      fab.push(item?.mekhwar?.id);
    });

    storeLocalFavorites(fab);
    setIsFavorited(true);

    setIsLoading(false);
  };

  const handleRemoveFromFavorites = async () => {
    setIsLoading(true);

    const { data, error }: any = await removeFromFavorite(ctx.token, {
      //@ts-ignore
      productID: id,
      locale,
    });

    const fab: any = [];

    data?.res.forEach((item: any) => {
      fab.push(item?.mekhwar?.id);
    });

    storeLocalFavorites(fab);

    setIsFavorited(false);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Button
    color="secondary"
    className="bg-orange-900 min-w-0 min-h-0 h-auto px-[10px] py-[7px] rounded-[10px] text-[16px] font-medium text-secondary"
    isIconOnly
    onClick={handleClick}
    // disabled={isLoading}
    isLoading={isLoading}
  >
    {
        isFavorited ? <IconHeartFilled size={20} /> : <IconHeart size={20} />
    }
  </Button>
  );
};

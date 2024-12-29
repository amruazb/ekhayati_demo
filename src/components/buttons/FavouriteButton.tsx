/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import EmptyHeart from "../../../public/assets/images/empty-heart.png";
import FilledHeart from "../../../public/assets/images/filled-heart.png";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import {
  getLocalFavorites,
  storeLocalFavorites,
} from "@/utils";

export const FavoriteButton = ({ id }: { id: number | undefined }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const locale = useLocale();

  const loadData = () => {
    const favorites = getLocalFavorites(); // Fetch from local storage
    if (favorites.includes(id)) {
      setIsFavorited(true);
    }
  };

  const handleClick = (e: any) => {
    e.preventDefault();

    if (!isFavorited) {
      handleAddToFavorite();
    } else {
      handleRemoveFromFavorites();
    }
  };

  const handleAddToFavorite = () => {
    setIsLoading(true);

    const favorites = getLocalFavorites(); // Fetch from local storage
    if (!favorites.includes(id)) {
      favorites.push(id); // Add the new favorite item
      storeLocalFavorites(favorites); // Save to local storage
      setIsFavorited(true);
    }

    setIsLoading(false);
  };

  const handleRemoveFromFavorites = () => {
    setIsLoading(true);

    const favorites = getLocalFavorites(); // Fetch from local storage
    const updatedFavorites = favorites.filter((favId) => favId !== id); // Remove the item
    storeLocalFavorites(updatedFavorites); // Save to local storage
    setIsFavorited(false);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Button
        isIconOnly
        className="xs:hidden bg-transparent xs:w-[30px] xs:h-[30px] sm:w-[45px] sm:h-[45px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='rgba(255, 217, 146, 1)' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='14' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
        onClick={handleClick}
        isLoading={isLoading}
      >
        {isFavorited ? (
          <Image
            priority={true}
            unoptimized
            className="xs:w-[18px] xs:h-[15px] sm:w-[28px] sm:h-[22px] object-contain"
            src={FilledHeart}
            width={28}
            height={28}
            alt={""}
          />
        ) : (
          <Image
            priority={true}
            unoptimized
            className="xs:w-[18px] xs:h-[15px] sm:w-[28px] sm:h-[22px] object-contain"
            src={EmptyHeart}
            width={28}
            height={28}
            alt={""}
          />
        )}
      </Button>
    </>
  );
};

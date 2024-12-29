"use client";

import { createContext, useContext } from "react";

const ImageZoomContext = createContext<{}>({});

export const useImageZoom = () => {
    return useContext(ImageZoomContext);
}

export function ImageZoomProvider ({ children }: any) {
    return (
        <ImageZoomContext.Provider value={{}}>
            {children}
        </ImageZoomContext.Provider>
    );
}
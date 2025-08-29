import React, { useEffect, useRef, useState } from 'react';

type Props = {
    size?: number | string;
    width?: number | string;
    height?: number | string;
    iconScale?: number;
    imgSrc?: string;
    alt?: string;
};
import boxImg from "@/assets/box.webp";



const toCss = (v?: number | string) => (typeof v === 'number' ? `${v}px` : v);

const BoxfulLogoBadge: React.FC<Props> = ({
                                              size,
                                              width,
                                              height,
                                              iconScale = 0.45,
                                              imgSrc = boxImg,
                                              alt = 'Boxful Logo',
                                          }) => {
    const defaultSize = 'clamp(48px,8vw,72px)'; // <- tamaño predeterminado más pequeño
    const w = toCss(width ?? size ?? defaultSize) ?? defaultSize;
    const h = toCss(height ?? size ?? defaultSize) ?? defaultSize;

    const ref = useRef<HTMLDivElement>(null);
    const [icon, setIcon] = useState(18);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const scale = Math.min(1, Math.max(0.1, iconScale));
        const update = () => {
            const side = Math.min(el.clientWidth, el.clientHeight || el.clientWidth);
            setIcon(Math.max(16, Math.round(side * scale)));
        };
        update();
        const RO = (window as any).ResizeObserver;
        if (RO) {
            const ro = new RO(update);
            ro.observe(el);
            return () => ro.disconnect();
        }
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [iconScale, w, h]);

    return (
        <div
            ref={ref}
            className="bg-[#ff6139] p-3 rounded-lg shadow-lg cursor-pointer group grid place-items-center
                 transition-transform duration-300 ease-out hover:scale-110 hover:rotate-3 hover:shadow-2xl
                 motion-reduce:transition-none motion-reduce:transform-none"
            style={{ width: w, height: h }}
        >
            <img
                src={imgSrc}
                alt={alt}
                width={icon}
                height={icon}
                className="filter brightness-0 invert transition-transform duration-300 ease-out group-hover:rotate-12"
            />
        </div>
    );
};

export default BoxfulLogoBadge;

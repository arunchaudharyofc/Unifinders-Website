interface FigmaSectionProps {
  src: string;
  alt: string;
}

export default function FigmaSection({ src, alt }: FigmaSectionProps) {
  return (
    <section className="w-full relative flex justify-center bg-white">
      {/* Container ensures the image doesn't scale infinitely on huge ultra-wide monitors */}
      <div className="w-full relative sm:py-0 overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-[1440px] max-w-full mx-auto h-auto object-cover object-top drop-shadow-sm block"
          loading="lazy"
        />
      </div>
    </section>
  );
}

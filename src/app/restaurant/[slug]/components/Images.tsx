export default function Images({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photo{images.length > 1 ? "s" : ""}
      </h1>
      <div className="flex flex-wrap">
        {images.map((src, idx) => (
          <img
            key={idx}
            id={idx.toString()}
            className="w-56 h-44 mr-1 mb-1"
            src={src}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

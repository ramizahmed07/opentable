import Header from "@/components/Header";

export default function loading() {
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <div className="w-1/5 animate-pulse bg-slate-200 h-96 rounded m-3 cursor-pointer"></div>
        <div className="w-5/6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <div
              key={num}
              className="border-b flex pb-5 animate-pulse bg-slate-200 w-[825px] h-40 rounded m-3 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function MovieCard({ item }) {
  return (
    <div className="flex flex-col gap-2 w-[200px] md:w-[250px] text-center">
        <div className="relative w-[200px] md:w-[250px] rounded-xl overflow-hidden group cursor-pointer">
        {/* Poster */}
        <img
            src={item.backdrop}
            alt={item.title}
            className="w-full h-[120px] md:h-[150px] object-cover 
                    transition-transform duration-300 
                    group-hover:scale-105"
        />
        </div>
        <p className="font-lato text-xs md:text-sm">{item.title} ({item.year})</p>
    </div>
  );
}

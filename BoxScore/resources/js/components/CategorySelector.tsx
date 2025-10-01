import { useState } from "react";
import { CategoriesType } from "@/types";

export default function CategorySelector({ categories }: { categories: CategoriesType[] }) {
    const [selected, setSelected] = useState<number[]>([]);


    const toggleCategory = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(catId => catId !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-2">Selecciona tus categorías</h2>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
                {categories.map(cat => {
                    const isSelected = selected.includes(cat.id);
                    return (
                        <li
                            key={cat.id}
                            onClick={() => toggleCategory(cat.id)}
                            className={`cursor-pointer rounded-lg border px-4 py-3 transition 
                ${isSelected
                                    ? "bg-green-500 text-white border-green-600 shadow-lg scale-105"
                                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                                }`}
                        >
                            <p className="font-bold">{cat.category_name}</p>
                            <p className="text-sm opacity-80">{cat.category_genre}</p>
                        </li>
                    );
                })}
            </ul>

            {/* Mostrar categorías seleccionadas */}
            <div className="mt-4">
                <h3 className="text-sm text-black-500 font-medium">Seleccionadas:</h3>
                <p className="text-black-600 font-semibold">
                    {selected.length > 0
                        ? selected.map(id => categories.find(c => c.id === id)?.category_name).join(", ")
                        : "Ninguna seleccionada"}
                </p>
            </div>
        </div>
    );
}

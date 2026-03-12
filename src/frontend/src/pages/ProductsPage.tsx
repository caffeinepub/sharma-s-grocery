import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import type { Category } from "../backend.d";
import { useCategories } from "../hooks/useQueries";

const fallbackCategories: Category[] = [
  {
    name: "Fruits & Vegetables",
    icon: "🥦",
    products: [
      { name: "Tomatoes", emoji: "🍅", price: BigInt(4000), unit: "per kg" },
      { name: "Spinach", emoji: "🥬", price: BigInt(2500), unit: "per bunch" },
      { name: "Bananas", emoji: "🍌", price: BigInt(3500), unit: "per dozen" },
      { name: "Apples", emoji: "🍎", price: BigInt(18000), unit: "per kg" },
      { name: "Onions", emoji: "🧅", price: BigInt(3000), unit: "per kg" },
      { name: "Potatoes", emoji: "🥔", price: BigInt(2500), unit: "per kg" },
    ],
  },
  {
    name: "Dairy Products",
    icon: "🥛",
    products: [
      {
        name: "Full Cream Milk",
        emoji: "🥛",
        price: BigInt(7000),
        unit: "per litre",
      },
      { name: "Paneer", emoji: "🧀", price: BigInt(35000), unit: "per kg" },
      { name: "Butter", emoji: "🧈", price: BigInt(22000), unit: "per 500g" },
      {
        name: "Curd (Dahi)",
        emoji: "🍶",
        price: BigInt(6000),
        unit: "per 500ml",
      },
    ],
  },
  {
    name: "Snacks & Biscuits",
    icon: "🍪",
    products: [
      {
        name: "Parle-G Biscuits",
        emoji: "🍪",
        price: BigInt(1000),
        unit: "per pack",
      },
      {
        name: "Lays Chips",
        emoji: "🥔",
        price: BigInt(2000),
        unit: "per pack",
      },
      { name: "Kurkure", emoji: "🌽", price: BigInt(2000), unit: "per pack" },
      {
        name: "Marie Biscuits",
        emoji: "🍪",
        price: BigInt(2500),
        unit: "per pack",
      },
    ],
  },
  {
    name: "Rice, Wheat & Pulses",
    icon: "🌾",
    products: [
      {
        name: "Basmati Rice",
        emoji: "🍚",
        price: BigInt(19000),
        unit: "per 5kg",
      },
      {
        name: "Wheat Flour (Atta)",
        emoji: "🌾",
        price: BigInt(22000),
        unit: "per 10kg",
      },
      { name: "Toor Dal", emoji: "🫘", price: BigInt(16000), unit: "per kg" },
      { name: "Moong Dal", emoji: "🫘", price: BigInt(14000), unit: "per kg" },
    ],
  },
  {
    name: "Beverages",
    icon: "🧃",
    products: [
      {
        name: "Coca Cola",
        emoji: "🥤",
        price: BigInt(4000),
        unit: "per bottle",
      },
      {
        name: "Tea (Chai Patti)",
        emoji: "🍵",
        price: BigInt(25000),
        unit: "per 500g",
      },
      {
        name: "Mango Juice",
        emoji: "🧃",
        price: BigInt(8000),
        unit: "per litre",
      },
      {
        name: "Mineral Water",
        emoji: "💧",
        price: BigInt(2000),
        unit: "per bottle",
      },
    ],
  },
  {
    name: "Daily Essentials",
    icon: "🧴",
    products: [
      {
        name: "Sunflower Oil",
        emoji: "🫙",
        price: BigInt(22000),
        unit: "per litre",
      },
      { name: "Salt", emoji: "🧂", price: BigInt(1500), unit: "per kg" },
      { name: "Sugar", emoji: "🍬", price: BigInt(5000), unit: "per kg" },
      {
        name: "Mustard Oil",
        emoji: "🫙",
        price: BigInt(24000),
        unit: "per litre",
      },
    ],
  },
];

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];
const TAB_SKELETON_KEYS = ["tsk1", "tsk2", "tsk3", "tsk4", "tsk5"];

function ProductCard({
  product,
  index,
}: {
  product: { name: string; emoji: string; price: bigint; unit: string };
  index: number;
}) {
  const price = (Number(product.price) / 100).toFixed(2);
  return (
    <motion.div
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow border border-border group"
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
        {product.emoji}
      </div>
      <h3 className="font-display font-semibold text-green-800 text-sm mb-1">
        {product.name}
      </h3>
      <p className="text-muted-foreground text-xs mb-3">{product.unit}</p>
      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 font-bold border-0">
        ₹{price}
      </Badge>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { data: backendCategories, isLoading } = useCategories();
  const categories =
    backendCategories && backendCategories.length > 0
      ? backendCategories
      : fallbackCategories;
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.name === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="bg-green-800 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Our Products
          </h1>
          <p className="text-green-200 text-lg">
            Browse our wide selection of fresh, quality groceries
          </p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            type="button"
            data-ocid="products.category.tab"
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary"
            }`}
          >
            All Categories
          </button>
          {isLoading
            ? TAB_SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="w-28 h-9 rounded-full" />
              ))
            : categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  data-ocid="products.category.tab"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : (
          filtered.map((category) => (
            <div key={category.name} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="font-display text-2xl font-bold text-green-800">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.products.map((product, i) => (
                  <ProductCard key={product.name} product={product} index={i} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

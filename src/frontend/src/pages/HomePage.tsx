import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Leaf,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useReviews } from "../hooks/useQueries";

const PHONE = "426536735";

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description:
      "Explore our wide selection of fresh groceries, vegetables, fruits, and daily essentials online.",
    step: "01",
  },
  {
    icon: Phone,
    title: "Call to Order",
    description: `Simply call us at ${PHONE} to place your order. We're happy to help you pick the best items.`,
    step: "02",
  },
  {
    icon: Truck,
    title: "Fast Home Delivery",
    description:
      "Sit back and relax. We deliver your fresh groceries right to your doorstep, fast.",
    step: "03",
  },
];

const deliveryBenefits = [
  {
    icon: Zap,
    title: "Same-Day Delivery",
    desc: "Order before 6pm and get your groceries the same day.",
  },
  {
    icon: Leaf,
    title: "Always Fresh",
    desc: "We source fresh produce daily to ensure the best quality.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted for Years",
    desc: "Sharma's Grocery has been serving local families for over a decade.",
  },
  {
    icon: CheckCircle,
    title: "Affordable Prices",
    desc: "Quality groceries at prices that keep your family budget happy.",
  },
];

const FALLBACK_REVIEWS = [
  {
    name: "Priya Mehta",
    rating: BigInt(5),
    comment:
      "Amazing freshness! The vegetables arrived same day and were crisp and clean. Highly recommend Sharma's Grocery.",
    date: BigInt(0),
  },
  {
    name: "Rajesh Kumar",
    rating: BigInt(5),
    comment:
      "Been ordering for 2 years now. Never disappointed. Great prices and always on time delivery.",
    date: BigInt(0),
  },
  {
    name: "Sunita Sharma",
    rating: BigInt(4),
    comment:
      "Very convenient to just call and order. The delivery boy is always polite. Will keep ordering!",
    date: BigInt(0),
  },
];

const REVIEW_SKELETON_KEYS = ["rs1", "rs2", "rs3"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-gray-200 fill-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const { data: reviews, isLoading: reviewsLoading } = useReviews();

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        style={{ background: "oklch(0.15 0.05 145)" }}
      >
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="Fresh groceries"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/60 via-green-900/70 to-green-800/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm border border-white/30">
              🌿 Local Grocery Store · Home Delivery
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5">
              Fresh Groceries
              <span className="block text-green-300">Delivered to Your</span>
              Doorstep
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto">
              Browse our wide selection of fresh produce, dairy, snacks, and
              essentials — then call us to order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href={`tel:${PHONE}`}
                data-ocid="hero.call_button"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5" />
                Call to Order Now: {PHONE}
              </a>
              <Link
                to="/products"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/40 px-7 py-4 rounded-full text-base font-semibold hover:bg-white/30 transition-all"
              >
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl font-bold text-green-800 mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Ordering fresh groceries has never been easier
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-50 mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                  <step.icon className="w-9 h-9 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1 bg-primary text-primary-foreground text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="font-display text-xl font-bold text-green-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Benefits */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl font-bold text-green-800 mb-3">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground text-lg">
              The best of fresh groceries, delivered with care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-green-800 text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl font-bold text-green-800 mb-3">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by hundreds of local families
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviewsLoading
              ? REVIEW_SKELETON_KEYS.map((k) => (
                  <Skeleton key={k} className="h-40 rounded-2xl" />
                ))
              : displayReviews.slice(0, 6).map((review, i) => (
                  <motion.div
                    key={review.name}
                    data-ocid={`reviews.item.${i + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-green-50 rounded-2xl p-6 flex flex-col gap-3"
                  >
                    <StarRating rating={Number(review.rating)} />
                    <p className="text-foreground/80 text-sm leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    <span className="font-semibold text-green-700 text-sm">
                      — {review.name}
                    </span>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Order Fresh Groceries?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Call us now and get fresh groceries delivered to your door today!
          </p>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-green-50 transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5" />
            {PHONE}
          </a>
        </div>
      </section>
    </div>
  );
}

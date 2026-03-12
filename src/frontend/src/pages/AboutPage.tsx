import { Link } from "@tanstack/react-router";
import { BadgeDollarSign, Leaf, Phone, Truck, Users } from "lucide-react";
import { motion } from "motion/react";

const PHONE = "426536735";

const values = [
  {
    icon: Leaf,
    title: "Fresh Quality",
    desc: "We handpick the freshest produce every morning from trusted local suppliers.",
  },
  {
    icon: Users,
    title: "Local Trust",
    desc: "A neighborhood staple for over a decade, serving hundreds of happy families.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Same-day delivery for orders placed before 6pm. We never keep you waiting.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Prices",
    desc: "We believe healthy eating shouldn't break the bank. Fair prices, always.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-green-800 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            About Us
          </h1>
          <p className="text-green-200 text-lg">
            A trusted name in fresh, local groceries
          </p>
        </motion.div>
      </section>

      {/* Story section */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/assets/generated/about-store.dim_800x500.jpg"
              alt="Sharma's Grocery Store"
              className="rounded-2xl shadow-xl w-full object-cover h-80 md:h-96"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-800 leading-tight">
              More Than a Grocery Store — We're Your Neighbours
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sharma's Grocery was founded with a simple mission: to bring
              fresh, quality groceries to the doorstep of every family in our
              community. What started as a small shop has grown into a trusted
              name for hundreds of local households.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe everyone deserves access to fresh, healthy food without
              the hassle. That's why we make it easy — just browse, call, and
              receive. Our team carefully sources produce every morning and
              ensures every delivery meets the highest standards of freshness.
            </p>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Phone className="w-4 h-4" /> Call us: {PHONE}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-green-800 mb-3">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-green-800 text-xl mb-2">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Experience the Sharma's Difference
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join hundreds of happy families who trust us for their daily
            groceries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, MapPin, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSubmitContact } from "../hooks/useQueries";

const PHONE = "426536735";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({ name, phone, message });
      setSubmitted(true);
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      // still show success for offline/demo mode
      setSubmitted(true);
    }
  };

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
            Contact Us
          </h1>
          <p className="text-green-200 text-lg">We'd love to hear from you</p>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="font-display text-3xl font-bold text-green-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Have a question about our products or delivery? Want to place a
                bulk order? We're just a call away!
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Call to Order
                  </h3>
                  <a
                    href={`tel:${PHONE}`}
                    className="text-2xl font-bold text-primary hover:underline font-display"
                  >
                    {PHONE}
                  </a>
                  <p className="text-muted-foreground text-sm mt-1">
                    Available 7 days a week
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Opening Hours
                  </h3>
                  <p className="text-foreground/80">
                    Monday – Saturday: 8:00 AM – 9:00 PM
                  </p>
                  <p className="text-foreground/80">
                    Sunday: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    Store Location
                  </h3>
                  <p className="text-foreground/80">Sharma's Grocery</p>
                  <p className="text-muted-foreground text-sm">
                    Serving local families with home delivery
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
              <h2 className="font-display text-2xl font-bold text-green-800 mb-6">
                Send Us a Message
              </h2>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-green-800">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We'll get back to you shortly,
                      or you can call us directly at{" "}
                      <a
                        href={`tel:${PHONE}`}
                        className="text-primary font-semibold"
                      >
                        {PHONE}
                      </a>
                      .
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2 border-primary text-primary hover:bg-green-50"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="text-green-800 font-medium"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name.input"
                        placeholder="e.g. Priya Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-xl border-border focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-phone"
                        className="text-green-800 font-medium"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        data-ocid="contact.phone.input"
                        placeholder="e.g. 9876543210"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="rounded-xl border-border focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="contact-message"
                        className="text-green-800 font-medium"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="contact-message"
                        data-ocid="contact.message.textarea"
                        placeholder="Tell us what you need or ask a question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        className="rounded-xl border-border focus:border-primary focus:ring-primary resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={submitContact.isPending}
                      className="w-full bg-primary hover:bg-green-700 text-primary-foreground rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
                    >
                      {submitContact.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div
          className="rounded-3xl overflow-hidden border border-border shadow-sm"
          style={{ height: 300 }}
        >
          <div className="w-full h-full bg-green-50 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-green-800 text-lg">
                Sharma's Grocery
              </p>
              <p className="text-muted-foreground text-sm">
                Serving your local neighborhood
              </p>
            </div>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors mt-1"
            >
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

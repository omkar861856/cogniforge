import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion, useInView } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real app, this would send the form data to the server
    console.log(data);
    
    // Show success toast
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you soon.",
    });
    
    // Reset form
    form.reset();
    setFormSubmitted(true);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.4)",
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 md:py-32 lg:py-40 px-6 lg:px-8 bg-gradient-to-tr from-white via-orange-50 to-white overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-50 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-orange-50 opacity-50 blur-3xl"></div>
      
      {/* Animated connection lines - Neural network style */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g filter="url(#glow)" opacity="0.1">
          <motion.path 
            d="M0,200 C100,100 300,300 400,200 S700,100 800,300" 
            stroke="#f97316" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M100,100 C200,300 400,100 500,300 S700,200 900,100" 
            stroke="#fdba74" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path 
            d="M0,300 C150,200 350,400 450,250 S650,100 900,400" 
            stroke="#fed7aa" 
            strokeWidth="1" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.2 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
          />
        </g>
      </svg>
      
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-8 md:mb-12 relative inline-block"
          variants={itemVariants}
        >
          <span className="text-orange-500 ai-text-glow">CONTACT</span> US
          <motion.span 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-300"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl md:text-4xl font-bold mb-4">Let's Connect</h3>
              <p className="text-xl md:text-2xl text-gray-600">
                Ready to discuss your project? Get in touch via the form or through our direct contact details below.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center text-xl md:text-2xl group"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <motion.div
                    className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 bg-orange-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <a 
                  href="mailto:omkar861856@gmail.com" 
                  className="text-orange-500 hover:text-orange-700 transition-colors relative group-hover:ai-text-glow"
                >
                  omkar861856@gmail.com
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-300"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-xl md:text-2xl"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </motion.div>
                <span className="text-gray-700">Contact by email for phone number</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center text-xl md:text-2xl group"
                variants={itemVariants}
                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  <motion.div
                    className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 bg-orange-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <a 
                  href="https://www.linkedin.com/in/cogniforge-ai-5833b7315" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:text-orange-700 transition-colors relative group-hover:ai-text-glow"
                >
                  LinkedIn Profile
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-300"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            </motion.div>
            
            {/* Decorative floating elements */}
            <motion.div 
              className="hidden lg:block absolute top-1/3 left-10 w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 opacity-50"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="hidden lg:block absolute bottom-1/4 right-10 w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 opacity-60"
              animate={{ 
                y: [0, 30, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Name</FormLabel>
                        <FormControl>
                          <motion.div
                            whileHover={{ y: -2 }}
                            whileFocus={{ y: -2 }}
                          >
                            <Input 
                              placeholder="Your name" 
                              className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-auto transition-all duration-300" 
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xl" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Email</FormLabel>
                        <FormControl>
                          <motion.div
                            whileHover={{ y: -2 }}
                            whileFocus={{ y: -2 }}
                          >
                            <Input 
                              placeholder="you@example.com" 
                              className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-auto transition-all duration-300" 
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xl" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Message</FormLabel>
                        <FormControl>
                          <motion.div
                            whileHover={{ y: -2 }}
                            whileFocus={{ y: -2 }}
                          >
                            <Textarea 
                              placeholder="Tell us about your project..." 
                              className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300" 
                              rows={4}
                              {...field} 
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xl" />
                      </FormItem>
                    )}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    <Button 
                      type="submit" 
                      className="text-xl md:text-2xl bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all h-auto w-full overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Send Message
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          className="ml-2 w-5 h-5 opacity-70"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </motion.svg>
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1 }}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

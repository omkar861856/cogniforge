import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      description: "I'll get back to you soon.",
    });
    
    // Reset form
    form.reset();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-8 md:mb-12">
          <span className="text-indigo-600">CONTACT</span> ME
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-4">Let's Connect</h3>
              <p className="text-xl md:text-2xl text-gray-600">
                Ready to discuss your project? Get in touch via the form or through my direct contact details below.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-xl md:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:omkar861856@gmail.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  omkar861856@gmail.com
                </a>
              </div>
              
              <div className="flex items-center text-xl md:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-700">Contact by email for phone number</span>
              </div>
              
              <div className="flex items-center text-xl md:text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <a 
                  href="https://www.linkedin.com/in/cogniforge-ai-5833b7315" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-auto" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xl" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-auto" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xl" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-xl md:text-2xl font-medium text-gray-700 mb-2">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="w-full text-xl md:text-2xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xl" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="text-xl md:text-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto w-full"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

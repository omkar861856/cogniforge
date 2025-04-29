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
      description: "We'll get back to you soon.",
    });
    
    // Reset form
    form.reset();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-heading-fluid leading-tight mb-8 md:mb-12">
          Get in touch
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-2">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="w-full text-xl md:text-2xl lg:text-3xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-auto" 
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
                  <FormLabel className="block text-xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-2">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      className="w-full text-xl md:text-2xl lg:text-3xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-auto" 
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
                  <FormLabel className="block text-xl md:text-3xl lg:text-4xl font-medium text-gray-700 mb-2">Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What's on your mind?" 
                      className="w-full text-xl md:text-2xl lg:text-3xl px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
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
              className="text-xl md:text-3xl lg:text-4xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 h-auto"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

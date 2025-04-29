import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      
      // In a real application, you would save this data to a database
      // or send an email notification
      
      // Return success
      res.status(200).json({ message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "An error occurred while processing your request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

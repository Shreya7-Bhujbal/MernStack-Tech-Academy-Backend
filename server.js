const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Course = require("./models/Course");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/courses", require("./routes/courses"));
app.use("/api/enrollments", require("./routes/enrollments"));
app.use("/api/students", require("./routes/students"));
app.use("/api/contact", require("./routes/contact"));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Tech Academy API is running 🚀" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    
    // Auto-seed courses if database is empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log("\ud83c\udf31 Seeding sample courses...");
      // Drop problematic indexes if any
      try { await Course.collection.dropIndex("id_1"); } catch (e) {}
      const courses = [
        { title: "REST API Development with Node.js", description: "Build powerful RESTful APIs using Node.js and Express. Learn routing, middleware, authentication, and MongoDB integration for scalable backends.", category: "API Development", level: "Beginner", duration: "6 Weeks", price: 2999, instructor: "Rahul Sharma", rating: 4.8, studentsEnrolled: 1240, topics: ["REST principles", "Express.js", "MongoDB", "JWT Auth", "Postman"], isFeatured: true },
        { title: "GraphQL API Masterclass", description: "Master GraphQL from scratch. Build flexible, efficient APIs with queries, mutations, subscriptions, and Apollo Server for modern apps.", category: "API Development", level: "Intermediate", duration: "8 Weeks", price: 3999, instructor: "Priya Nair", rating: 4.9, studentsEnrolled: 876, topics: ["GraphQL Schema", "Resolvers", "Apollo Server", "Subscriptions", "React Apollo"], isFeatured: true },
        { title: "API Security & Authentication", description: "Secure your APIs with OAuth 2.0, JWT, API keys, rate limiting, and best practices for production-ready security in enterprise apps.", category: "Security", level: "Advanced", duration: "5 Weeks", price: 4999, instructor: "Vikram Singh", rating: 4.7, studentsEnrolled: 542, topics: ["OAuth 2.0", "JWT", "API Keys", "Rate Limiting", "HTTPS"], isFeatured: true },
        { title: "Third-Party API Integration", description: "Integrate popular APIs like Stripe, Twilio, Google Maps, and OpenAI into your web applications with hands-on projects.", category: "Integration", level: "Beginner", duration: "4 Weeks", price: 1999, instructor: "Ananya Patel", rating: 4.6, studentsEnrolled: 1540, topics: ["Stripe Payments", "Twilio SMS", "Google Maps API", "OpenAI API", "Webhooks"], isFeatured: true },
        { title: "MERN Stack Full Course", description: "Build full-stack web apps with MongoDB, Express, React, and Node.js. From zero to a fully deployed production application.", category: "Full Stack", level: "Intermediate", duration: "12 Weeks", price: 5999, instructor: "Rahul Sharma", rating: 4.9, studentsEnrolled: 2300, topics: ["MongoDB", "Express", "React", "Node.js", "Deployment"], isFeatured: true },
        { title: "Microservices & API Gateway", description: "Design and deploy microservices architecture with API Gateway, Docker, and Kubernetes for large-scale distributed systems.", category: "Architecture", level: "Advanced", duration: "10 Weeks", price: 6999, instructor: "Vikram Singh", rating: 4.8, studentsEnrolled: 430, topics: ["Microservices", "API Gateway", "Docker", "Kubernetes", "Load Balancing"], isFeatured: false },
        { title: "Postman & API Testing", description: "Master API testing using Postman. Write test scripts, automate collection runs, use Newman CLI, and integrate with CI/CD pipelines.", category: "Testing", level: "Beginner", duration: "3 Weeks", price: 999, instructor: "Ananya Patel", rating: 4.5, studentsEnrolled: 3100, topics: ["Postman Collections", "Test Scripts", "Newman", "Mock Servers", "CI Integration"], isFeatured: false },
        { title: "WebSocket & Real-Time APIs", description: "Build real-time applications with WebSockets, Socket.io, and Server-Sent Events. Create chat apps and live dashboards.", category: "Real-Time", level: "Intermediate", duration: "5 Weeks", price: 3499, instructor: "Priya Nair", rating: 4.7, studentsEnrolled: 680, topics: ["WebSockets", "Socket.io", "SSE", "Chat App", "Live Notifications"], isFeatured: false },
        { title: "FastAPI with Python", description: "Build high-performance APIs with Python and FastAPI. Learn async programming, Pydantic models, and automatic OpenAPI documentation.", category: "API Development", level: "Intermediate", duration: "6 Weeks", price: 3499, instructor: "Sneha Kulkarni", rating: 4.8, studentsEnrolled: 920, topics: ["FastAPI", "Pydantic", "Async Python", "OpenAPI", "SQLAlchemy"], isFeatured: true },
        { title: "API Rate Limiting & Caching", description: "Optimize API performance with Redis caching, rate limiting strategies, CDN integration, and response compression techniques.", category: "Security", level: "Intermediate", duration: "4 Weeks", price: 2499, instructor: "Karan Bhatia", rating: 4.6, studentsEnrolled: 710, topics: ["Redis", "Rate Limiting", "CDN", "Caching Strategies", "Performance"], isFeatured: false },
        { title: "gRPC & Protocol Buffers", description: "Learn gRPC for high-performance inter-service communication. Master Protocol Buffers, streaming, and service mesh integration.", category: "Architecture", level: "Advanced", duration: "7 Weeks", price: 5499, instructor: "Vikram Singh", rating: 4.7, studentsEnrolled: 320, topics: ["gRPC", "Protocol Buffers", "Streaming", "Service Mesh", "Load Balancing"], isFeatured: false },
        { title: "Serverless APIs with AWS Lambda", description: "Build and deploy serverless APIs using AWS Lambda, API Gateway, DynamoDB, and the Serverless Framework. Zero server management.", category: "Architecture", level: "Intermediate", duration: "5 Weeks", price: 4499, instructor: "Sneha Kulkarni", rating: 4.8, studentsEnrolled: 860, topics: ["AWS Lambda", "API Gateway", "DynamoDB", "Serverless Framework", "CloudWatch"], isFeatured: true },
      ];
      await Course.insertMany(courses);
      console.log(`\u2705 ${courses.length} courses seeded!`);
    }
    
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB Error:", err));

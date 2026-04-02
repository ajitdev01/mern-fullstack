const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { sendOTPEmail, closeTransporter } = require("./sendOTPEmail");

// ============================================================================
// EXPRESS APP SETUP
// ============================================================================

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", // Set specific origins in production
    credentials: true
}));

// Request logging middleware (optional but helpful)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================================================
// RATE LIMITING
// ============================================================================

// General rate limiter for all routes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: {
        success: false,
        error: "Too many requests. Please try again later."
    }
});

// Strict rate limiter for OTP routes
const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Only 3 OTP requests per 15 minutes
    message: {
        success: false,
        error: "Too many OTP requests. Please wait 15 minutes and try again."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(generalLimiter);

// ============================================================================
// ROUTES
// ============================================================================

/**
 * Health check endpoint
 * GET /
 */
app.get("/", (req, res) => {
    res.json({ 
        success: true,
        message: "Nodemailer OTP Service is ready!",
        timestamp: new Date().toISOString(),
        endpoints: {
            send: "POST /api/otp/send",
            verify: "POST /api/otp/verify",
            resend: "POST /api/otp/resend"
        }
    });
});

/**
 * Health check for services
 * GET /health
 */
app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

/**
 * Send OTP via email
 * POST /api/otp/send
 * Body: { email: "user@example.com" }
 */
app.post("/api/otp/send", otpLimiter, async (req, res) => {
    try {
        const { email } = req.body;
        // Validate email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email address is required"
            });
        }

        console.log(`📧 Sending OTP to: ${email}`);

        // Send OTP email
        const result = await sendOTPEmail(email, {
            expiryMinutes: 10 // 10 minute expiry
        });

        // Check if email was sent successfully
        if (!result.success) {
            console.error(`❌ Failed to send OTP to ${email}:`, result.error);
            return res.status(500).json({
                success: false,
                error: result.error || "Failed to send OTP email. Please try again."
            });
        }

        console.log(`✅ OTP sent successfully to ${email}`);
        console.log(`🔐 OTP Code: ${result.otp}`); // Remove in production!

        // 🚨 IMPORTANT: In production, store the OTP in a database or cache
        // Example with Redis:
        // await redis.setEx(`otp:${email}`, 600, result.otp);
        // 
        // Example with MongoDB:
        // await OTP.create({
        //     email,
        //     otp: result.otp,
        //     expiresAt: new Date(result.expiresAt)
        // });

        // Send success response
        // 🚫 NEVER send the actual OTP in the response (security risk)
        res.json({
            success: true,
            message: "OTP sent successfully to your email",
            email: email,
            expiresIn: result.expiresIn, // milliseconds until expiry
            expiresAt: result.expiresAt   // timestamp of expiry
        });

    } catch (error) {
        console.error("❌ Error in /api/otp/send:", error);
        res.status(500).json({
            success: false,
            error: "An unexpected error occurred while sending OTP"
        });
    }
});


app.post("/api/otp/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validate required fields
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                error: "Email and OTP are required"
            });
        }

        // Validate OTP format (must be 6 digits)
        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                success: false,
                error: "OTP must be exactly 6 digits"
            });
        }

        console.log(`🔍 Verifying OTP for: ${email}`);

      
        const storedOTP = "123456"; // Replace with database lookup
        const otpExpiry = Date.now() + 600000; // Replace with database value

        // Check if OTP exists
        if (!storedOTP) {
            return res.status(404).json({
                success: false,
                error: "OTP not found or has expired. Please request a new one."
            });
        }

        // Check if OTP has expired
        if (Date.now() > otpExpiry) {
            

            return res.status(410).json({
                success: false,
                error: "OTP has expired. Please request a new one."
            });
        }

        // Verify OTP matches
        if (otp !== storedOTP) {
            // TODO: Track failed attempts
            // Increment attempt counter
            // Lock account after 5 failed attempts

            console.log(`❌ Invalid OTP attempt for ${email}`);
            return res.status(401).json({
                success: false,
                error: "Invalid OTP. Please check and try again."
            });
        }

        // ✅ OTP verified successfully!
        console.log(`✅ OTP verified successfully for ${email}`);

        // TODO: Delete used OTP from database
        // await redis.del(`otp:${email}`);
        // await OTP.deleteOne({ email });

        // TODO: Mark user as verified in your main database
        // await User.updateOne({ email }, { emailVerified: true });

        res.json({
            success: true,
            message: "OTP verified successfully!",
            email: email
        });

    } catch (error) {
        console.error("❌ Error in /api/otp/verify:", error);
        res.status(500).json({
            success: false,
            error: "An unexpected error occurred while verifying OTP"
        });
    }
});


app.post("/api/otp/resend", otpLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email address is required"
            });
        }

        console.log(`🔄 Resending OTP to: ${email}`);

        // TODO: Delete old OTP from database
        // await redis.del(`otp:${email}`);
        // await OTP.deleteOne({ email });

        // Send new OTP
        const result = await sendOTPEmail(email, {
            expiryMinutes: 10
        });

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: "Failed to resend OTP. Please try again."
            });
        }

        console.log(`✅ OTP resent successfully to ${email}`);
        console.log(`🔐 New OTP Code: ${result.otp}`); // Remove in production!

        // TODO: Store new OTP in database
        // await redis.setEx(`otp:${email}`, 600, result.otp);

        res.json({
            success: true,
            message: "New OTP sent to your email",
            email: email,
            expiresIn: result.expiresIn
        });

    } catch (error) {
        console.error("❌ Error in /api/otp/resend:", error);
        res.status(500).json({
            success: false,
            error: "An unexpected error occurred while resending OTP"
        });
    }
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        path: req.path,
        method: req.method
    });
});

// ============================================================================
// ERROR HANDLER
// ============================================================================

app.use((error, req, res, next) => {
    console.error("❌ Unhandled error:", error);
    res.status(500).json({
        success: false,
        error: "Internal server error",
        message: process.env.NODE_ENV === "development" ? error.message : undefined
    });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log("\n" + "=".repeat(60));
    console.log("🚀 OTP Email Service Started Successfully!");
    console.log("=".repeat(60));
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📧 Email service: ${process.env.MAIL_USER}`);
    console.log("\n📡 Available endpoints:");
    console.log(`   GET  /               - Health check`);
    console.log(`   GET  /health         - Service health`);
    console.log(`   POST /api/otp/send   - Send OTP`);
    console.log(`   POST /api/otp/verify - Verify OTP`);
    console.log(`   POST /api/otp/resend - Resend OTP`);
    console.log("=".repeat(60) + "\n");
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = async () => {
    console.log("\n🛑 Received shutdown signal. Closing server gracefully...");
    
    // Stop accepting new connections
    server.close(() => {
        console.log("✅ HTTP server closed");
    });

    // Close email transporter
    await closeTransporter();

    // Close database connections here if needed
    // await mongoose.connection.close();
    // await redisClient.quit();

    console.log("✅ Graceful shutdown complete");
    process.exit(0);
};

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error("❌ Uncaught Exception:", error);
    gracefulShutdown();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    gracefulShutdown();
});

// ============================================================================
// EXPORTS
// ============================================================================

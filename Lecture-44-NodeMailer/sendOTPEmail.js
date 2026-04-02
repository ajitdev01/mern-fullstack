const nodemailer = require("nodemailer");
require("dotenv").config();

// ============================================================================
// CONFIGURATION & VALIDATION
// ============================================================================

/**
 * Validates required environment variables
 * @throws {Error} if any required env var is missing
 */
const validateEnvVars = () => {
    const required = ["HOST", "MAILPORT", "MAIL_USER", "MAIL_PASS"];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
};

// Validate on module load
validateEnvVars();

// ============================================================================
// EMAIL TRANSPORTER
// ============================================================================

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: Number(process.env.MAILPORT),
    secure: Number(process.env.MAILPORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    // Additional recommended options
    pool: true, // Use pooled connections
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
});

// Verify transporter configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email transporter configuration error:", error);
    } else {
        console.log("✅ Email server is ready to send messages");
    }
});

// ============================================================================
// OTP GENERATION
// ============================================================================

/**
 * Generates a cryptographically secure 6-digit OTP
 * @returns {string} 6-digit OTP string
 */
const generateOTP = () => {
    // Use crypto for better randomness
    const crypto = require("crypto");
    const randomBytes = crypto.randomBytes(4);
    const number = randomBytes.readUInt32BE(0);
    const otp = (number % 900000) + 100000; // Ensures 6 digits
    return otp.toString();
};

// ============================================================================
// EMAIL TEMPLATE
// ============================================================================

/**
 * Generates the HTML email template
 * @param {string} toEmail - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @returns {string} HTML email template
 */
const generateEmailTemplate = (toEmail, otp) => {
    const otpDigits = otp.split('');
    const currentYear = new Date().getFullYear();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>🔐 Brainzima | Secure Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* CSS Reset & Base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #ec4899 50%, #f59e0b 100%);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            min-height: 100vh;
            padding: 30px 20px;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .email-wrapper {
            max-width: 640px;
            margin: 0 auto;
            perspective: 1000px;
        }

        .email-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 
                0 32px 64px rgba(0, 0, 0, 0.25),
                0 16px 32px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.5);
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }

        /* Premium Header */
        .header {
            background: linear-gradient(135deg, 
                #0f172a 0%, 
                #1e293b 50%, 
                #334155 100%);
            padding: 60px 40px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, 
                #3b82f6 0%, 
                #8b5cf6 25%, 
                #ec4899 50%, 
                #f59e0b 75%, 
                #10b981 100%);
            background-size: 200% 100%;
            animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        .logo-container {
            display: inline-flex;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 100%);
            backdrop-filter: blur(10px);
            padding: 24px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 28px;
            box-shadow: 
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
        }

        .logo-container::before {
            content: '';
            position: absolute;
            inset: -2px;
            background: linear-gradient(135deg, 
                #3b82f6, 
                #8b5cf6, 
                #ec4899, 
                #f59e0b);
            border-radius: 22px;
            z-index: -1;
            opacity: 0.3;
            animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .brand-logo {
            width: 140px;
            height: auto;
            filter: brightness(1.3) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .brand-title {
            color: #ffffff;
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .brand-subtitle {
            color: #94a3b8;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            position: relative;
            display: inline-block;
            padding: 0 20px;
        }

        .brand-subtitle::before,
        .brand-subtitle::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #94a3b8, transparent);
        }

        .brand-subtitle::before {
            left: -50px;
        }

        .brand-subtitle::after {
            right: -50px;
        }

        /* Premium Content */
        .content {
            padding: 60px 50px;
            position: relative;
        }

        .greeting {
            color: #1e293b;
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
        }

        .greeting::after {
            content: '';
            display: block;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            border-radius: 2px;
            margin: 16px auto;
        }

        .intro-text {
            color: #64748b;
            font-size: 18px;
            text-align: center;
            margin-bottom: 50px;
            line-height: 1.8;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Premium OTP Display */
        .otp-section {
            position: relative;
            margin: 50px 0;
            padding: 40px;
            background: linear-gradient(135deg, 
                rgba(248, 250, 252, 0.9) 0%, 
                rgba(241, 245, 249, 0.9) 100%);
            border-radius: 24px;
            border: 2px solid #e2e8f0;
            overflow: hidden;
        }

        .otp-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, 
                #3b82f6 0%, 
                #8b5cf6 20%, 
                #ec4899 40%, 
                #f59e0b 60%, 
                #10b981 80%, 
                #3b82f6 100%);
            background-size: 200% 100%;
            animation: gradientFlow 3s linear infinite;
        }

        @keyframes gradientFlow {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        .otp-label {
            color: #475569;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 25px;
            text-align: center;
            display: block;
        }

        .otp-display {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-bottom: 30px;
        }

        .otp-digit {
            width: 80px;
            height: 100px;
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 2px solid #e2e8f0;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'JetBrains Mono', monospace;
            font-size: 48px;
            font-weight: 800;
            color: #1e293b;
            box-shadow: 
                0 10px 25px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .otp-digit::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(59, 130, 246, 0.2), 
                transparent);
            transition: left 0.5s ease;
        }

        .otp-digit.active::before {
            left: 100%;
        }

        .otp-full {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            color: #ffffff;
            padding: 28px 40px;
            border-radius: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 12px;
            text-align: center;
            margin: 0 auto;
            width: fit-content;
            box-shadow: 
                0 15px 35px rgba(15, 23, 42, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .otp-full::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
                #3b82f6, 
                #8b5cf6, 
                #ec4899, 
                #f59e0b, 
                #10b981);
            border-radius: 22px;
            z-index: -1;
            opacity: 0.5;
            filter: blur(10px);
        }

        /* Premium Alert */
        .alert-container {
            background: linear-gradient(135deg, 
                rgba(254, 226, 226, 0.9) 0%, 
                rgba(252, 165, 165, 0.9) 100%);
            border: 2px solid #f87171;
            border-radius: 20px;
            padding: 28px;
            margin: 40px 0;
            position: relative;
            overflow: hidden;
        }

        .alert-container::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 8px;
            background: linear-gradient(180deg, #dc2626 0%, #ef4444 100%);
            border-radius: 4px 0 0 4px;
        }

        .alert-content {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .alert-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
            animation: shake 2s ease-in-out infinite;
        }

        @keyframes shake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
        }

        .alert-text {
            flex: 1;
        }

        .alert-title {
            color: #991b1b;
            font-size: 18px;
            font-weight: 800;
            margin-bottom: 6px;
        }

        .alert-message {
            color: #7f1d1d;
            font-size: 15px;
            line-height: 1.6;
        }

        .timer-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: #ffffff;
            padding: 10px 24px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 800;
            margin-left: 12px;
            box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
            animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* Premium Security Section */
        .security-section {
            background: linear-gradient(135deg, 
                rgba(248, 250, 252, 0.95) 0%, 
                rgba(241, 245, 249, 0.95) 100%);
            border-radius: 24px;
            padding: 40px;
            margin: 50px 0 40px;
            border: 2px solid rgba(226, 232, 240, 0.8);
            box-shadow: 
                inset 0 4px 20px rgba(0, 0, 0, 0.05),
                0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .security-title {
            color: #1e293b;
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 28px;
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .security-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .security-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .security-card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }

        .security-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
            border-color: #3b82f6;
        }

        .card-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }

        .card-title {
            color: #1e293b;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .card-text {
            color: #475569;
            font-size: 14px;
            line-height: 1.6;
        }

        /* Premium Footer */
        .footer {
            background: linear-gradient(135deg, 
                #0f172a 0%, 
                #1e293b 50%, 
                #334155 100%);
            padding: 50px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(59, 130, 246, 0.5), 
                rgba(139, 92, 246, 0.5), 
                transparent);
        }

        .footer-logo {
            width: 100px;
            height: auto;
            margin-bottom: 24px;
            filter: brightness(1.2);
            opacity: 0.9;
        }

        .footer-contact {
            color: #cbd5e1;
            font-size: 16px;
            margin: 24px 0;
            line-height: 1.6;
        }

        .support-link {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
        }

        .support-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #60a5fa;
            transition: width 0.3s ease;
        }

        .support-link:hover::after {
            width: 100%;
        }

        .footer-links {
            display: flex;
            justify-content: center;
            gap: 32px;
            margin: 40px 0;
            padding: 40px 0;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .footer-link {
            color: #94a3b8;
            text-decoration: none;
            font-size: 14px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .footer-link:hover {
            color: #ffffff;
            transform: translateY(-2px);
        }

        .copyright {
            color: #64748b;
            font-size: 13px;
            margin-top: 32px;
            line-height: 1.6;
        }

        /* Responsive Design */
        @media only screen and (max-width: 640px) {
            body {
                padding: 20px 12px;
            }

            .header {
                padding: 40px 24px;
            }

            .content {
                padding: 40px 24px;
            }

            .greeting {
                font-size: 28px;
            }

            .intro-text {
                font-size: 16px;
            }

            .otp-digit {
                width: 60px;
                height: 80px;
                font-size: 36px;
            }

            .otp-full {
                font-size: 24px;
                letter-spacing: 8px;
                padding: 20px 30px;
            }

            .alert-content {
                flex-direction: column;
                text-align: center;
            }

            .timer-badge {
                margin-left: 0;
                margin-top: 8px;
            }

            .security-grid {
                grid-template-columns: 1fr;
            }

            .footer-links {
                flex-direction: column;
                gap: 20px;
            }
        }

        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background: rgba(15, 23, 42, 0.95);
            }

            .greeting {
                color: #f1f5f9;
            }

            .intro-text {
                color: #94a3b8;
            }

            .otp-section {
                background: rgba(30, 41, 59, 0.8);
                border-color: rgba(51, 65, 85, 0.8);
            }

            .otp-digit {
                background: rgba(15, 23, 42, 0.9);
                border-color: rgba(51, 65, 85, 0.8);
                color: #f1f5f9;
            }

            .security-section {
                background: rgba(30, 41, 59, 0.8);
                border-color: rgba(51, 65, 85, 0.8);
            }

            .security-card {
                background: rgba(15, 23, 42, 0.9);
                border-color: rgba(51, 65, 85, 0.8);
            }

            .card-title {
                color: #f1f5f9;
            }

            .card-text {
                color: #cbd5e1;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Premium Header -->
            <div class="header">
                <div class="logo-container">
                    <img src="https://brainzima.com/og-image.jpg" alt="Brainzima" class="brand-logo">
                </div>
                <h1 class="brand-title">Brainzima</h1>
                <p class="brand-subtitle">Premium Security Verification</p>
            </div>

            <!-- Premium Content -->
            <div class="content">
                <h2 class="greeting">🔐 Account Verification Required</h2>
                <p class="intro-text">
                    We've detected a secure login attempt to your Brainzima account. 
                    Please verify your identity using the one-time verification code below.
                </p>

                <!-- Premium OTP Display -->
                <div class="otp-section">
                    <span class="otp-label">Your Secure Verification Code</span>
                    <div class="otp-display">
                        ${otpDigits.map((digit, index) => 
                            `<div class="otp-digit active" data-digit="${index}">${digit}</div>`
                        ).join('')}
                    </div>
                    <div class="otp-full">
                        ${otp}
                    </div>
                </div>

                <!-- Premium Alert -->
                <div class="alert-container">
                    <div class="alert-content">
                        <div class="alert-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <div class="alert-text">
                            <div class="alert-title">⚠️ TIME-SENSITIVE SECURITY ALERT</div>
                            <div class="alert-message">
                                This verification code expires in <span class="timer-badge">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    10:00 MINUTES
                                </span><br>
                                For security purposes, this code can only be used once and will self-destruct.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Premium Security Section -->
                <div class="security-section">
                    <div class="security-title">
                        <div class="security-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        Security Protocol & Best Practices
                    </div>
                    <div class="security-grid">
                        <div class="security-card">
                            <div class="card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                </svg>
                            </div>
                            <div class="card-title">Confidential & Unique</div>
                            <div class="card-text">This code is unique to your session and should never be shared with anyone, including Brainzima support.</div>
                        </div>

                        <div class="security-card">
                            <div class="card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            </div>
                            <div class="card-title">Single Use Only</div>
                            <div class="card-text">Each verification code is single-use and will expire automatically after 10 minutes for enhanced security.</div>
                        </div>

                        <div class="security-card">
                            <div class="card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <div class="card-title">Immediate Action</div>
                            <div class="card-text">If you didn't request this code, your account may be compromised. Contact support immediately.</div>
                        </div>

                        <div class="security-card">
                            <div class="card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </div>
                            <div class="card-title">Secure Disposal</div>
                            <div class="card-text">For maximum security, delete this email after successful verification to prevent unauthorized access.</div>
                        </div>
                    </div>
                </div>

                <p class="intro-text" style="margin-top: 40px; font-style: italic; color: #3b82f6;">
                    "Security isn't a product, but a process." — Bruce Schneier
                </p>
            </div>

            <!-- Premium Footer -->
            <div class="footer">
                <img src="https://brainzima.com/og-image.jpg" alt="Brainzima" class="footer-logo">
                <p class="footer-contact">
                    This security notification was sent to <strong style="color: #ffffff;">${toEmail}</strong><br>
                    as part of Brainzima's advanced security protocol.
                </p>
                <p class="footer-contact">
                    Need immediate assistance? Contact our 24/7 Security Team:<br>
                    <a href="mailto:security@brainzima.com" class="support-link">security@brainzima.com</a>
                </p>
                
                <div class="footer-links">
                    <a href="https://brainzima.com/privacy" class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Privacy Policy
                    </a>
                    <a href="https://brainzima.com/security" class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Security Center
                    </a>
                    <a href="https://brainzima.com/support" class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Contact Support
                    </a>
                    <a href="https://brainzima.com/trust" class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Trust Center
                    </a>
                </div>

                <p class="copyright">
                    © ${currentYear} Brainzima Security Systems Inc. All rights reserved.<br>
                    <span style="font-size: 11px; color: #94a3b8;">
                        This is an automated security message. Do not reply to this email.<br>
                        Brainzima will never ask for your password or verification codes via email.
                    </span>
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
};

// ============================================================================
// SEND OTP EMAIL FUNCTION
// ============================================================================

/**
 * Sends an OTP verification email
 * @param {string} toEmail - Recipient email address
 * @param {Object} options - Additional options
 * @param {number} options.expiryMinutes - OTP expiry time in minutes (default: 10)
 * @returns {Promise<Object>} Result object with success status, OTP, and metadata
 */
const sendOTPEmail = async (toEmail, options = {}) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(toEmail)) {
        return {
            success: false,
            error: "Invalid email address format"
        };
    }

    // Configuration
    const expiryMinutes = options.expiryMinutes || 10;
    const expiryMs = expiryMinutes * 60 * 1000;

    try {
        // Generate OTP
        const otp = generateOTP();

        // Generate email template
        const htmlTemplate = generateEmailTemplate(toEmail, otp);

        // Configure email options
        const mailOptions = {
            from: {
                name: "Brainzima Security",
                address: process.env.MAIL_USER
            },
            to: toEmail,
            subject: "🔐 Your Brainzima Verification Code - Expires in 10 Minutes",
            html: htmlTemplate,
            // Add text fallback for email clients that don't support HTML
            text: `Your Brainzima verification code is: ${otp}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you didn't request this code, please ignore this email.`,
            // Email headers for better deliverability
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            }
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log(`✅ OTP email sent successfully to ${toEmail}`);
        console.log(`📧 Message ID: ${info.messageId}`);

        return {
            success: true,
            otp: otp, // Consider removing this in production for security
            messageId: info.messageId,
            expiresAt: Date.now() + expiryMs,
            expiresIn: expiryMs
        };

    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
        
        return {
            success: false,
            error: error.message,
            errorCode: error.code || 'UNKNOWN_ERROR'
        };
    }
};

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

/**
 * Closes the transporter connection pool gracefully
 */
const closeTransporter = async () => {
    try {
        transporter.close();
        console.log("✅ Email transporter closed successfully");
    } catch (error) {
        console.error("❌ Error closing transporter:", error);
    }
};

// Handle process termination
process.on('SIGTERM', closeTransporter);
process.on('SIGINT', closeTransporter);

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
    sendOTPEmail,
    generateOTP,
    closeTransporter
};
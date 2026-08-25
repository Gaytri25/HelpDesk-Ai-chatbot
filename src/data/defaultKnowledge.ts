import { KnowledgeItem, IntentType } from '../types';

export const DEFAULT_KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. Business Hours & Availability
  {
    id: 'kb-hours-1',
    question: 'What are your business hours?',
    answer: 'Our customer support team is active Monday through Friday from 8:00 AM to 8:00 PM EST, and Saturday from 9:00 AM to 5:00 PM EST. Our automated HelpDesk AI is available 24/7/365 to assist with common inquiries and order tracking.',
    category: 'Business Hours',
    intent: 'BUSINESS_HOURS',
    patterns: [
      'what are your working hours',
      'when are you open',
      'are you open today',
      'what time do you close',
      'support hours',
      'business hours',
      'opening hours',
      'are you open on weekends',
      'working time'
    ],
    keywords: ['hours', 'open', 'close', 'schedule', 'weekend', 'sunday', 'monday', 'time'],
    smartAction: {
      id: 'act-hours',
      type: 'VIEW_HOURS',
      title: 'Support Hours & Schedule',
      description: 'Check full schedule, holiday calendar, and live agent status.',
      buttonText: 'View Hours & Status'
    },
    isActive: true,
    usageCount: 42,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'kb-hours-2',
    question: 'Are you available on weekends and holidays?',
    answer: 'Yes! We offer reduced live support on Saturdays (9:00 AM - 5:00 PM EST). On Sundays and official holidays, our automated system resolves routine requests and records urgent tickets with a guaranteed 4-hour callback.',
    category: 'Business Hours',
    intent: 'BUSINESS_HOURS',
    patterns: [
      'do you work on weekends',
      'weekend support',
      'holiday hours',
      'sunday support',
      'is support open on sunday'
    ],
    keywords: ['weekend', 'holiday', 'saturday', 'sunday', 'urgent'],
    smartAction: {
      id: 'act-hours-weekend',
      type: 'VIEW_HOURS',
      title: 'Holiday Schedule',
      description: 'Review our upcoming observed holiday schedule and coverage.',
      buttonText: 'Check Holiday Schedule'
    },
    isActive: true,
    usageCount: 18,
    lastUpdated: '2026-08-18'
  },

  // 2. Contact & Human Support
  {
    id: 'kb-contact-1',
    question: 'How can I contact customer support?',
    answer: 'You can reach human support via email at support@helpdeskai.com, by calling 1-800-555-0199 (Mon-Fri 8am-8pm EST), or by submitting a ticket directly using our support form below.',
    category: 'Contact',
    intent: 'CONTACT_SUPPORT',
    patterns: [
      'contact support',
      'how to contact you',
      'talk to a human',
      'speak with an agent',
      'customer service phone number',
      'email address for support',
      'connect me with a representative',
      'live agent',
      'call center'
    ],
    keywords: ['contact', 'human', 'agent', 'phone', 'email', 'representative', 'talk', 'call', 'reach'],
    smartAction: {
      id: 'act-contact',
      type: 'OPEN_CONTACT_FORM',
      title: 'Contact Human Support',
      description: 'Open a verified support ticket or request an immediate phone callback.',
      buttonText: 'Open Contact Form'
    },
    isActive: true,
    usageCount: 89,
    lastUpdated: '2026-08-21'
  },
  {
    id: 'kb-contact-2',
    question: 'Can I request a phone callback?',
    answer: 'Yes! If you prefer speaking to an engineer or support agent on the phone, submit your phone number and preferred time slot through our contact portal.',
    category: 'Contact',
    intent: 'CONTACT_SUPPORT',
    patterns: [
      'call me back',
      'phone callback',
      'request callback',
      'schedule a call',
      'can someone call me'
    ],
    keywords: ['callback', 'phone', 'call', 'schedule', 'speak'],
    smartAction: {
      id: 'act-callback',
      type: 'SCHEDULE_CALLBACK',
      title: 'Schedule Callback',
      description: 'Choose a convenient 15-minute window for an agent to dial you.',
      buttonText: 'Schedule Phone Call'
    },
    isActive: true,
    usageCount: 14,
    lastUpdated: '2026-08-15'
  },

  // 3. Pricing & Plans
  {
    id: 'kb-pricing-1',
    question: 'What are your pricing plans?',
    answer: 'We provide three straightforward tiers: \n• Starter: $29/month (up to 1,000 monthly chats, 1 domain)\n• Professional: $79/month (up to 10,000 chats, custom knowledge training, priority SLA)\n• Enterprise: $199/month (unlimited chats, dedicated API, custom CRM integration). An annual discount of 20% applies on all plans.',
    category: 'Pricing',
    intent: 'PRICING',
    patterns: [
      'how much does it cost',
      'what is your pricing',
      'cost of subscription',
      'pricing plans',
      'how much is starter plan',
      'enterprise pricing',
      'subscription fees',
      'is it free'
    ],
    keywords: ['price', 'pricing', 'cost', 'plan', 'tier', 'subscription', 'monthly', 'annual', 'starter', 'pro', 'enterprise'],
    smartAction: {
      id: 'act-pricing',
      type: 'VIEW_PRICING',
      title: 'Interactive Pricing Calculator',
      description: 'Compare plan features, annual discounts, and calculate your volume.',
      buttonText: 'View Pricing Plans'
    },
    isActive: true,
    usageCount: 76,
    lastUpdated: '2026-08-22'
  },
  {
    id: 'kb-pricing-2',
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a 14-day full-featured free trial with no credit card required. You get complete access to all Professional tier features and our smart intent engine.',
    category: 'Pricing',
    intent: 'PRICING',
    patterns: [
      'is there a free trial',
      'free trial period',
      'can i try for free',
      'trial without credit card',
      'test before buying'
    ],
    keywords: ['trial', 'free', 'demo', 'test', 'card'],
    smartAction: {
      id: 'act-trial',
      type: 'VIEW_PRICING',
      title: 'Start 14-Day Free Trial',
      description: 'Test HelpDesk AI risk-free without entering payment information.',
      buttonText: 'Start Free Trial'
    },
    isActive: true,
    usageCount: 53,
    lastUpdated: '2026-08-19'
  },
  {
    id: 'kb-pricing-3',
    question: 'Do you offer discounts for non-profits or educational institutions?',
    answer: 'Yes, registered 501(c)(3) non-profit organizations and verified educational institutions receive a 35% recurring discount on all paid annual subscriptions.',
    category: 'Pricing',
    intent: 'PRICING',
    patterns: [
      'non profit discount',
      'education discount',
      'student discount',
      'charity pricing'
    ],
    keywords: ['nonprofit', 'education', 'discount', 'school', 'student', 'charity'],
    smartAction: {
      id: 'act-discount',
      type: 'OPEN_CONTACT_FORM',
      title: 'Apply for Non-Profit Discount',
      description: 'Submit proof of eligibility for a 35% non-profit reduction.',
      buttonText: 'Submit Proof'
    },
    isActive: true,
    usageCount: 11,
    lastUpdated: '2026-08-10'
  },

  // 4. Refunds & Returns
  {
    id: 'kb-refund-1',
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day no-questions-asked money-back guarantee. If you are not completely satisfied with your subscription or purchase, you can request a full refund within 30 days of the billing date.',
    category: 'Refunds',
    intent: 'REFUND',
    patterns: [
      'refund policy',
      'how do i get a refund',
      'i want my money back',
      'can i get a refund',
      'how can i request refund',
      'money back guarantee',
      'return policy',
      'refund please',
      'cancel and refund'
    ],
    keywords: ['refund', 'money', 'back', 'return', 'guarantee', 'cancel', 'reimburse'],
    smartAction: {
      id: 'act-refund',
      type: 'VIEW_REFUND_POLICY',
      title: 'Refund Center',
      description: 'Submit an automated refund request for eligible transactions.',
      buttonText: 'Request a Refund'
    },
    isActive: true,
    usageCount: 95,
    lastUpdated: '2026-08-23'
  },
  {
    id: 'kb-refund-2',
    question: 'How long does a refund take to process?',
    answer: 'Once approved, refunds are initiated immediately. Depending on your financial institution, the credit will appear in your bank or card statement within 3 to 5 business days.',
    category: 'Refunds',
    intent: 'REFUND',
    patterns: [
      'how long does refund take',
      'when will i get my refund',
      'refund processing time',
      'how fast is refund'
    ],
    keywords: ['refund', 'processing', 'days', 'time', 'statement', 'bank'],
    smartAction: {
      id: 'act-refund-status',
      type: 'VIEW_REFUND_POLICY',
      title: 'Check Refund Status',
      description: 'Track the status of your submitted refund application.',
      buttonText: 'Check Refund Status'
    },
    isActive: true,
    usageCount: 31,
    lastUpdated: '2026-08-17'
  },

  // 5. Payments & Billing
  {
    id: 'kb-payment-1',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and SEPA/ACH bank transfers for annual Enterprise plans.',
    category: 'Payments',
    intent: 'PAYMENT',
    patterns: [
      'payment methods',
      'what cards do you take',
      'can i pay with paypal',
      'do you accept apple pay',
      'how can i pay',
      'wire transfer payment'
    ],
    keywords: ['payment', 'pay', 'credit', 'card', 'visa', 'mastercard', 'paypal', 'apple', 'ach', 'wire'],
    smartAction: {
      id: 'act-payment',
      type: 'OPEN_ACCOUNT',
      title: 'Payment & Invoicing',
      description: 'Manage billing details, download VAT invoices, or change payment cards.',
      buttonText: 'Manage Billing'
    },
    isActive: true,
    usageCount: 54,
    lastUpdated: '2026-08-16'
  },
  {
    id: 'kb-payment-2',
    question: 'How do I download my invoices and receipts?',
    answer: 'Invoices with full tax and VAT breakdowns are automatically emailed on every billing cycle and can also be downloaded anytime under Account Settings > Invoices & Billing.',
    category: 'Payments',
    intent: 'PAYMENT',
    patterns: [
      'download invoice',
      'where is my receipt',
      'tax invoice',
      'billing statement',
      'vat receipt'
    ],
    keywords: ['invoice', 'receipt', 'tax', 'vat', 'billing', 'download'],
    smartAction: {
      id: 'act-invoice',
      type: 'OPEN_ACCOUNT',
      title: 'Invoices & Receipts',
      description: 'Download PDF tax invoices and previous statements.',
      buttonText: 'View Invoices'
    },
    isActive: true,
    usageCount: 28,
    lastUpdated: '2026-08-14'
  },
  {
    id: 'kb-payment-3',
    question: 'How can I update my billing credit card?',
    answer: 'To update your payment card, log into your dashboard, go to Account Settings > Billing Methods, click "Edit Payment Method", and save your new card details.',
    category: 'Payments',
    intent: 'PAYMENT',
    patterns: [
      'update credit card',
      'change payment method',
      'new card for billing',
      'replace expired card'
    ],
    keywords: ['card', 'update', 'change', 'expired', 'billing', 'method'],
    smartAction: {
      id: 'act-card',
      type: 'OPEN_ACCOUNT',
      title: 'Update Payment Method',
      description: 'Safely update your credit card or payment preferences.',
      buttonText: 'Update Card'
    },
    isActive: true,
    usageCount: 39,
    lastUpdated: '2026-08-12'
  },

  // 6. Orders & Status Tracking
  {
    id: 'kb-order-1',
    question: 'How do I track my order or license provisioning?',
    answer: 'You can track the status of your software license or hardware shipment by entering your Order ID (e.g., ORD-9482) in our live Order Tracker tool.',
    category: 'Orders',
    intent: 'ORDER_STATUS',
    patterns: [
      'track my order',
      'where is my order',
      'check order status',
      'order tracking',
      'track package',
      'find my order',
      'has my order shipped'
    ],
    keywords: ['order', 'track', 'status', 'tracking', 'package', 'shipped', 'where', 'number'],
    smartAction: {
      id: 'act-order',
      type: 'TRACK_ORDER',
      title: 'Live Order Tracker',
      description: 'Enter your order ID (e.g. ORD-9482) for real-time status & dispatch details.',
      buttonText: 'Track Order Now'
    },
    isActive: true,
    usageCount: 110,
    lastUpdated: '2026-08-24'
  },
  {
    id: 'kb-order-2',
    question: 'Can I modify or cancel my order after placing it?',
    answer: 'Orders can be modified or cancelled within 60 minutes of placement directly from your dashboard. After 60 minutes, our automated provisioning and dispatch begins, but you can still request a return once delivered.',
    category: 'Orders',
    intent: 'ORDER_STATUS',
    patterns: [
      'cancel my order',
      'change order details',
      'modify order',
      'cancel purchase'
    ],
    keywords: ['cancel', 'modify', 'change', 'order', 'edit'],
    smartAction: {
      id: 'act-order-cancel',
      type: 'TRACK_ORDER',
      title: 'Manage Order',
      description: 'Review active orders and submit modification requests.',
      buttonText: 'Manage Active Orders'
    },
    isActive: true,
    usageCount: 34,
    lastUpdated: '2026-08-11'
  },

  // 7. Shipping & Delivery
  {
    id: 'kb-delivery-1',
    question: 'How long does delivery take?',
    answer: 'Software subscriptions and API credentials activate instantly upon payment. For physical hardware (e.g., dedicated kiosk tablets or POS terminals), standard shipping takes 3–5 business days and Express Courier takes 1–2 business days.',
    category: 'Delivery',
    intent: 'DELIVERY',
    patterns: [
      'how long does delivery take',
      'shipping time',
      'delivery times',
      'when will it arrive',
      'estimated delivery',
      'shipping duration',
      'how fast is shipping',
      'delivery estimate'
    ],
    keywords: ['delivery', 'shipping', 'transit', 'arrive', 'fast', 'express', 'standard', 'days'],
    smartAction: {
      id: 'act-delivery',
      type: 'TRACK_ORDER',
      title: 'Shipping Estimates & Tracking',
      description: 'Check estimated arrival dates for your location and track shipments.',
      buttonText: 'Check Delivery Details'
    },
    isActive: true,
    usageCount: 88,
    lastUpdated: '2026-08-22'
  },
  {
    id: 'kb-delivery-2',
    question: 'What about express delivery options?',
    answer: 'Yes, Express Overnight shipping is available for all hardware units at checkout for an additional $15. Orders placed before 2:00 PM EST ship the same business day.',
    category: 'Delivery',
    intent: 'DELIVERY',
    patterns: [
      'what about express',
      'express shipping',
      'overnight delivery',
      'rush delivery',
      'same day dispatch',
      'faster shipping'
    ],
    keywords: ['express', 'overnight', 'faster', 'rush', 'same day', 'courier'],
    smartAction: {
      id: 'act-express',
      type: 'TRACK_ORDER',
      title: 'Express Delivery Options',
      description: 'Upgrade shipping speed or request expedited courier dispatch.',
      buttonText: 'View Express Options'
    },
    isActive: true,
    usageCount: 45,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'kb-delivery-3',
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship hardware to over 65 countries worldwide. International shipping typically takes 6–10 business days depending on customs clearance.',
    category: 'Delivery',
    intent: 'DELIVERY',
    patterns: [
      'international shipping',
      'do you ship abroad',
      'ship to uk',
      'ship to europe',
      'ship worldwide'
    ],
    keywords: ['international', 'worldwide', 'countries', 'customs', 'europe', 'canada', 'uk'],
    smartAction: {
      id: 'act-intl',
      type: 'TRACK_ORDER',
      title: 'International Rates',
      description: 'Calculate international duties, taxes, and estimated delivery dates.',
      buttonText: 'View Global Rates'
    },
    isActive: true,
    usageCount: 19,
    lastUpdated: '2026-08-09'
  },

  // 8. Account & Security
  {
    id: 'kb-account-1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, visit the login page and click "Forgot Password", or open your Account Settings > Security and select "Change Password". A secure verification link will be sent to your registered email address.',
    category: 'Account',
    intent: 'PASSWORD_RESET',
    patterns: [
      'how do i reset my password',
      'forgot password',
      'reset password',
      'change my password',
      'cant login password wrong',
      'locked out of account',
      'new password'
    ],
    keywords: ['password', 'reset', 'forgot', 'change', 'login', 'locked', 'credentials'],
    smartAction: {
      id: 'act-password',
      type: 'OPEN_RESET_PASSWORD',
      title: 'Reset Password',
      description: 'Send a one-click secure reset link to your registered email.',
      buttonText: 'Open Password Reset'
    },
    isActive: true,
    usageCount: 92,
    lastUpdated: '2026-08-23'
  },
  {
    id: 'kb-account-2',
    question: 'How do I update my account email or company name?',
    answer: 'You can update your personal email, profile name, and company profile under Account Settings > Profile. An email confirmation link is sent to verify the new address.',
    category: 'Account',
    intent: 'ACCOUNT',
    patterns: [
      'update account',
      'change my email',
      'edit profile',
      'change company name',
      'update personal details'
    ],
    keywords: ['account', 'email', 'profile', 'name', 'update', 'edit', 'settings'],
    smartAction: {
      id: 'act-account',
      type: 'OPEN_ACCOUNT',
      title: 'Account Settings',
      description: 'Edit your profile details, notifications, and team permissions.',
      buttonText: 'Open Account Settings'
    },
    isActive: true,
    usageCount: 47,
    lastUpdated: '2026-08-18'
  },
  {
    id: 'kb-account-3',
    question: 'How do I enable Two-Factor Authentication (2FA)?',
    answer: 'Enable 2FA by navigating to Account Settings > Security > Two-Factor Authentication. We support Authenticator apps (Google Authenticator, Authy) and SMS verification codes.',
    category: 'Account',
    intent: 'ACCOUNT',
    patterns: [
      'enable 2fa',
      'two factor authentication',
      'set up 2fa',
      'mfa setup',
      'security verification'
    ],
    keywords: ['2fa', 'mfa', 'two-factor', 'authentication', 'security', 'authenticator', 'authy'],
    smartAction: {
      id: 'act-2fa',
      type: 'OPEN_ACCOUNT',
      title: 'Security & 2FA',
      description: 'Protect your account with biometric or authenticator app 2FA.',
      buttonText: 'Configure 2FA'
    },
    isActive: true,
    usageCount: 22,
    lastUpdated: '2026-08-13'
  },
  {
    id: 'kb-account-4',
    question: 'How do I invite team members to my workspace?',
    answer: 'Team administrators can invite members under Account Settings > Team Members by entering their email address and assigning roles (Admin, Member, or Billing Analyst).',
    category: 'Account',
    intent: 'ACCOUNT',
    patterns: [
      'invite team member',
      'add colleague',
      'team permissions',
      'workspace members',
      'user seats'
    ],
    keywords: ['team', 'invite', 'members', 'roles', 'seats', 'colleague'],
    smartAction: {
      id: 'act-team',
      type: 'OPEN_ACCOUNT',
      title: 'Team Management',
      description: 'Add seats, manage role-based permissions, and invite colleagues.',
      buttonText: 'Manage Team'
    },
    isActive: true,
    usageCount: 17,
    lastUpdated: '2026-08-08'
  },
  {
    id: 'kb-account-5',
    question: 'How can I delete my account and data?',
    answer: 'To delete your account and request complete GDPR/CCPA data eradication, navigate to Account Settings > Privacy & Danger Zone > Delete Account. This action permanently deletes your chat logs and knowledge base within 48 hours.',
    category: 'Account',
    intent: 'ACCOUNT',
    patterns: [
      'delete my account',
      'close account',
      'erase my data',
      'gdpr delete',
      'remove account'
    ],
    keywords: ['delete', 'close', 'remove', 'erase', 'gdpr', 'danger'],
    smartAction: {
      id: 'act-delete-acc',
      type: 'OPEN_ACCOUNT',
      title: 'Privacy & Data Controls',
      description: 'Export your account data or request permanent account erasure.',
      buttonText: 'Privacy Controls'
    },
    isActive: true,
    usageCount: 13,
    lastUpdated: '2026-08-05'
  },

  // 9. Technical Support & Integration
  {
    id: 'kb-tech-1',
    question: 'How do I integrate the HelpDesk AI widget onto my website?',
    answer: 'Integrating the chatbot widget requires pasting a single line script tag `<script src="https://cdn.helpdeskai.com/widget.js" data-id="YOUR_KEY"></script>` into your HTML footer. We also provide official plugins for WordPress, Shopify, Next.js, and React.',
    category: 'Technical Support',
    intent: 'TECHNICAL_SUPPORT',
    patterns: [
      'how to install chatbot on website',
      'website integration',
      'script tag embed',
      'wordpress plugin',
      'shopify integration',
      'how to embed widget'
    ],
    keywords: ['embed', 'widget', 'integrate', 'wordpress', 'shopify', 'script', 'install', 'code'],
    smartAction: {
      id: 'act-tech-embed',
      type: 'OPEN_KB',
      title: 'Widget Installation Guide',
      description: 'Follow our step-by-step copy-paste integration guide for all frameworks.',
      buttonText: 'View Embed Guide'
    },
    isActive: true,
    usageCount: 68,
    lastUpdated: '2026-08-21'
  },
  {
    id: 'kb-tech-2',
    question: 'Why is the chatbot widget not showing on my webpage?',
    answer: 'Ensure your domain is whitelisted in your HelpDesk AI dashboard under Settings > Allowed Domains, check that ad-blockers are not blocking the widget CDN, and verify that your unique API public key is placed correctly.',
    category: 'Technical Support',
    intent: 'TECHNICAL_SUPPORT',
    patterns: [
      'widget not showing',
      'chatbot not appearing',
      'bot script error',
      'widget invisible',
      'troubleshoot widget'
    ],
    keywords: ['troubleshoot', 'not showing', 'invisible', 'error', 'whitelist', 'domain', 'blocked'],
    smartAction: {
      id: 'act-tech-trouble',
      type: 'SUBMIT_TICKET',
      title: 'Technical Support Diagnostics',
      description: 'Submit your website URL to our diagnostic tool for instant verification.',
      buttonText: 'Run Diagnostics'
    },
    isActive: true,
    usageCount: 29,
    lastUpdated: '2026-08-16'
  },
  {
    id: 'kb-tech-3',
    question: 'What browsers and mobile devices are supported?',
    answer: 'HelpDesk AI supports all modern browsers including Chrome, Safari, Edge, Firefox, and Opera on desktop, iOS, Android, and tablet devices with full touch and screen-reader accessibility.',
    category: 'Technical Support',
    intent: 'TECHNICAL_SUPPORT',
    patterns: [
      'supported browsers',
      'browser compatibility',
      'mobile support',
      'safari support',
      'ios android support'
    ],
    keywords: ['browser', 'chrome', 'safari', 'mobile', 'android', 'ios', 'compatibility'],
    smartAction: {
      id: 'act-tech-browsers',
      type: 'OPEN_KB',
      title: 'System Requirements',
      description: 'Review minimum browser versions and CDN requirements.',
      buttonText: 'View Requirements'
    },
    isActive: true,
    usageCount: 15,
    lastUpdated: '2026-08-07'
  },

  // 10. Products & Services
  {
    id: 'kb-product-1',
    question: 'What features are included in HelpDesk AI?',
    answer: 'Key features include: Intent Recognition Engine, Predefined Knowledge Retrieval, Smart Action Cards, Fallback Guardrails, Multi-channel web widget, Live Chat Handoff, Conversation Memory, Real-time Analytics, and Custom Training Sandbox.',
    category: 'Products / Services',
    intent: 'PRODUCT_INFO',
    patterns: [
      'what features do you have',
      'chatbot capabilities',
      'what can the chatbot do',
      'product overview',
      'tell me about helpdesk ai',
      'core features'
    ],
    keywords: ['features', 'capabilities', 'smart', 'intent', 'retrieval', 'analytics', 'actions', 'overview'],
    smartAction: {
      id: 'act-features',
      type: 'OPEN_KB',
      title: 'Feature Showcase',
      description: 'Explore all intelligent customer support features and automations.',
      buttonText: 'Explore Features'
    },
    isActive: true,
    usageCount: 61,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'kb-product-2',
    question: 'Can I customize the chatbot colors and brand logo?',
    answer: 'Yes! You can fully customize the widget avatar, brand logo, greeting headline, color palette, launcher icon style, position (bottom-right / bottom-left), and font styling to match your brand identity perfectly.',
    category: 'Products / Services',
    intent: 'PRODUCT_INFO',
    patterns: [
      'can i customize branding',
      'change widget colors',
      'custom logo on bot',
      'white label chatbot',
      'widget theming'
    ],
    keywords: ['customize', 'branding', 'colors', 'theme', 'logo', 'whitelabel', 'avatar'],
    smartAction: {
      id: 'act-theme',
      type: 'OPEN_ACCOUNT',
      title: 'Widget Customizer',
      description: 'Test and style your widget appearance in real time.',
      buttonText: 'Customize Widget'
    },
    isActive: true,
    usageCount: 38,
    lastUpdated: '2026-08-14'
  },

  // 11. Location & Company
  {
    id: 'kb-loc-1',
    question: 'Where is HelpDesk AI located and headquartered?',
    answer: 'HelpDesk AI is headquartered at 500 Tech Parkway, Suite 400, San Francisco, CA 94105, USA, with regional support hubs in London and Singapore.',
    category: 'General Information',
    intent: 'LOCATION',
    patterns: [
      'where are you located',
      'company address',
      'headquarters location',
      'where is your office',
      'san francisco office'
    ],
    keywords: ['located', 'address', 'headquarters', 'office', 'san francisco', 'where'],
    smartAction: {
      id: 'act-location',
      type: 'OPEN_CONTACT_FORM',
      title: 'Office Locations & Maps',
      description: 'View headquarters details and regional branch contacts.',
      buttonText: 'View Office Details'
    },
    isActive: true,
    usageCount: 20,
    lastUpdated: '2026-08-12'
  },

  // 12. Security, Privacy & Compliance
  {
    id: 'kb-policy-1',
    question: 'How do you protect customer data and privacy?',
    answer: 'All data is encrypted in transit via TLS 1.3 and at rest using AES-256 encryption. We are SOC-2 Type II certified and fully compliant with GDPR, CCPA, and HIPAA privacy frameworks. We never sell customer conversation data.',
    category: 'Policies',
    intent: 'POLICIES' as IntentType,
    patterns: [
      'is my data safe',
      'privacy policy',
      'gdpr compliance',
      'soc 2 certification',
      'data encryption',
      'security standards'
    ],
    keywords: ['security', 'privacy', 'gdpr', 'encryption', 'compliance', 'safe', 'data'],
    smartAction: {
      id: 'act-security',
      type: 'OPEN_KB',
      title: 'Trust & Security Center',
      description: 'Read our SOC-2 reports, compliance certifications, and privacy commitments.',
      buttonText: 'View Security Center'
    },
    isActive: true,
    usageCount: 41,
    lastUpdated: '2026-08-17'
  },
  {
    id: 'kb-policy-2',
    question: 'What is your Service Level Agreement (SLA)?',
    answer: 'We guarantee 99.95% uptime for all automated chatbot API endpoints. Enterprise customers benefit from a 15-minute response SLA for critical priority support tickets.',
    category: 'Policies',
    intent: 'POLICIES' as IntentType,
    patterns: [
      'what is your sla',
      'uptime guarantee',
      'service level agreement',
      'system reliability'
    ],
    keywords: ['sla', 'uptime', 'guarantee', 'reliability', 'response time'],
    smartAction: {
      id: 'act-sla',
      type: 'VIEW_HOURS',
      title: 'Live System Status',
      description: 'Check real-time system metrics, API uptime, and SLA statistics.',
      buttonText: 'Check Live Status'
    },
    isActive: true,
    usageCount: 16,
    lastUpdated: '2026-08-10'
  },

  // 13. Common Greetings & Goodbyes
  {
    id: 'kb-greet-1',
    question: 'Hello / Greetings',
    answer: 'Hello! I am HelpDesk AI, your commercial support assistant. How can I assist you with pricing, orders, account settings, refunds, or business hours today?',
    category: 'General Information',
    intent: 'GREETING',
    patterns: [
      'hello',
      'hi',
      'hey',
      'good morning',
      'good afternoon',
      'good evening',
      'greetings',
      'hi there',
      'howdy',
      'hey bot'
    ],
    keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon'],
    smartAction: {
      id: 'act-greet',
      type: 'OPEN_KB',
      title: 'Explore Knowledge Base',
      description: 'Browse popular support topics, FAQs, and self-service guides.',
      buttonText: 'Browse Knowledge Base'
    },
    isActive: true,
    usageCount: 150,
    lastUpdated: '2026-08-24'
  },
  {
    id: 'kb-bye-1',
    question: 'Goodbye / Thank you',
    answer: "You're very welcome! If you have any other questions, feel free to ask anytime. Have a wonderful day!",
    category: 'General Information',
    intent: 'GOODBYE',
    patterns: [
      'goodbye',
      'bye',
      'thank you',
      'thanks',
      'thanks a lot',
      'see you later',
      'have a nice day',
      'bye bye'
    ],
    keywords: ['bye', 'goodbye', 'thanks', 'thank', 'later', 'welcome'],
    isActive: true,
    usageCount: 84,
    lastUpdated: '2026-08-24'
  }
];

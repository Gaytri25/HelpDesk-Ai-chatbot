# HelpDesk AI – Quality Assurance & Testing Suite (30+ Test Cases)

This document contains comprehensive test cases used to validate the intent detection engine, response accuracy, Smart Action card triggers, error handling, and latency benchmarks for **HelpDesk AI**.

---

## 1. Intent Recognition & Pattern Variations

| # | User Query | Expected Intent | Target Outcome & Action | Status |
|---|------------|-----------------|-------------------------|--------|
| **TC-01** | `What are your business hours?` | `BUSINESS_HOURS` | Displays Mon-Fri 8am-8pm, Sat 9am-5pm EST + "View Live Hours" action card | ✅ PASS |
| **TC-02** | `when are you open?` | `BUSINESS_HOURS` | Matches normalized pattern, returns hours | ✅ PASS |
| **TC-03** | `are you guys open on weekends` | `BUSINESS_HOURS` | Clarifies Saturday 9am-5pm & Sunday automated 24/7 coverage | ✅ PASS |
| **TC-04** | `what time do you close on Friday` | `BUSINESS_HOURS` | States 8:00 PM EST closing time on weekdays | ✅ PASS |
| **TC-05** | `What is your refund policy?` | `REFUND` | Outlines 30-day money-back guarantee + "Submit Refund Claim" action card | ✅ PASS |
| **TC-06** | `can i get my money back` | `REFUND` | Matches variation, returns refund policy and claim modal | ✅ PASS |
| **TC-07** | `i want a return for my order` | `REFUND` | Explains 30-day window, returns instructions and return portal button | ✅ PASS |
| **TC-08** | `How do I reset my password?` | `PASSWORD_RESET` | Details recovery steps + triggers "Reset Password" security modal | ✅ PASS |
| **TC-09** | `forgot password` | `PASSWORD_RESET` | Matches shorthand query, renders password recovery card | ✅ PASS |
| **TC-10** | `locked out of my account` | `PASSWORD_RESET` | Explains unlock via recovery email + password reset card | ✅ PASS |
| **TC-11** | `How do I track my order?` | `ORDER_STATUS` | Explains tracking + triggers "Live Order & License Tracker" modal | ✅ PASS |
| **TC-12** | `where is my package ORD-9482` | `ORDER_STATUS` | Directs to order tracker modal with tracking lookup | ✅ PASS |
| **TC-13** | `check delivery status` | `ORDER_STATUS` | Explains 3-5 business day ground or instant digital delivery | ✅ PASS |
| **TC-14** | `How long does delivery take?` | `DELIVERY_TIME` | Details standard (3-5 days), express (1-2 days), digital (instant) | ✅ PASS |
| **TC-15** | `What are your pricing plans?` | `PRICING` | Details Starter ($29), Pro ($79), Enterprise ($199) + "Compare Pricing" card | ✅ PASS |
| **TC-16** | `how much does this cost per month` | `PRICING` | Outlines tier breakdown with 20% annual discount option | ✅ PASS |
| **TC-17** | `do you offer a free trial` | `PRICING` | Confirms 14-day unrestricted trial with no credit card required | ✅ PASS |
| **TC-18** | `What payment methods do you accept?` | `PAYMENT_METHODS` | Lists Visa, Mastercard, AMEX, PayPal, Wire Transfer, SEPA | ✅ PASS |
| **TC-19** | `can i pay with paypal or credit card` | `PAYMENT_METHODS` | Confirms all major credit cards and PayPal accepted | ✅ PASS |
| **TC-20** | `How can I contact support?` | `CONTACT_SUPPORT` | Details 1-800 phone, email desk, and "Create Support Ticket" card | ✅ PASS |
| **TC-21** | `talk to a human agent` | `HUMAN_AGENT` | Escalates with "Contact Customer Support" ticket modal | ✅ PASS |
| **TC-22** | `speak with a real person` | `HUMAN_AGENT` | Offers human support escalation ticket within SLA | ✅ PASS |
| **TC-23** | `How do I update my account email?` | `ACCOUNT` | Details Settings > Profile navigation steps | ✅ PASS |
| **TC-24** | `how to delete my account` | `ACCOUNT` | Outlines permanent GDPR deletion policy in Settings | ✅ PASS |
| **TC-25** | `How do I integrate your API?` | `TECHNICAL_SUPPORT` | Details REST/GraphQL endpoints, webhooks, and API keys | ✅ PASS |
| **TC-26** | `is my data secure and GDPR compliant` | `POLICIES` | Explains SOC-2 Type II, AES-256 encryption, and GDPR compliance | ✅ PASS |
| **TC-27** | `hello / hi there` | `GREETING` | Friendly professional greeting + suggested follow-up chips | ✅ PASS |
| **TC-28** | `thank you for the help` | `THANKS` | Courteous closing response + asking if more help is needed | ✅ PASS |

---

## 2. Robustness, Edge Cases & Guardrails

| # | Test Scenario | Query Example | Expected Engine Behavior | Status |
|---|---------------|---------------|--------------------------|--------|
| **TC-29** | **Typo Tolerance** | `wat r ur buisnes hourz` | Normalizes tokens and correctly classifies `BUSINESS_HOURS` | ✅ PASS |
| **TC-30** | **Punctuation Stripping** | `refund??!! please help!!` | Strips exclamation marks, correctly classifies `REFUND` | ✅ PASS |
| **TC-31** | **Out-of-Scope / Unknown Policy** | `can you make me a pizza` | Generative fallback grounds response politely refusing out-of-scope tasks | ✅ PASS |
| **TC-32** | **Hallucination Prevention** | `give me a 90% secret coupon code` | Strict system guardrail prevents inventing unauthorized discounts | ✅ PASS |
| **TC-33** | **Conversation Context Retention** | Turn 1: `What is your refund policy?` -> Turn 2: `How long does it take?` | Recognizes reference to refund timeline (3-5 business days) | ✅ PASS |
| **TC-34** | **Sub-second Latency** | `How do I reset my password?` | Sub-150ms response latency from verified in-memory repository | ✅ PASS |
| **TC-35** | **Smart Action Card Execution** | Click "Reset Password" card | Opens interactive modal, inputs email, generates security token | ✅ PASS |
| **TC-36** | **Ticket Escalation Submission** | Click "Contact Support" card | Creates ticket in store, assigns ticket number (e.g. `TCK-1004`), updates analytics | ✅ PASS |

---

## 3. UI/UX & Quality Verification

1. **Color Harmony**: Background `#FAF9F7`, Cards `#FFFFFF`, Borders `#E8E3DE`, Accent `#E76F51`, Success `#3A7D44`.
2. **Typography**: High contrast, readable sans-serif with distinct weights.
3. **Smart Action Cards**: Renders inside bot bubbles with clear action buttons.
4. **Analytics**: Real-time KPI charts, satisfaction percentage, ticket triage logs, and JSON export.
5. **Admin Training**: Live hybrid test sandbox displays detected intent, normalized tokens, and confidence score.

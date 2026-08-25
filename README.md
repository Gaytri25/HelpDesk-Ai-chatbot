# 🤖 HelpDesk AI – Customer Support Chatbot

HelpDesk AI is a simple AI-powered customer support chatbot developed to provide instant answers to common customer questions.

The chatbot uses **Natural Language Processing (NLP)** and a predefined knowledge base to understand user questions and provide relevant answers.

## 🌐 Live Demo / Output

🚀 **Live Website:**
**[Open HelpDesk AI Chatbot](YOUR-LIVE-WEB-URL)**

> Replace `YOUR-LIVE-WEB-URL` with your actual deployed website URL.

### Example

```text
https://helpdesk-ai-chatbot.onrender.com
```

### 📸 Application Output

The live application includes:

* 🏠 Home Page
* 🤖 Chatbot Interface
* 💬 Instant Chat Responses
* 🔍 Knowledge Base
* 🔗 Smart Action Cards
* 👍 User Feedback
* 👨‍💼 Admin Dashboard

---

## 📌 Problem Statement

Customers often ask the same questions about pricing, payments, refunds, delivery, accounts, and support.

Handling these repetitive questions manually takes time and increases the workload of customer support teams.

---

## 💡 Solution

HelpDesk AI provides an automated chatbot that:

* Understands common customer questions
* Identifies the user's intent
* Searches a predefined knowledge base
* Provides instant answers
* Handles different ways of asking the same question
* Gives useful actions through Smart Action Cards
* Collects feedback from users

If the chatbot does not understand a question, it safely asks the user to contact support instead of making up an answer.

---

## ✨ Features

* 🤖 AI-powered customer support chatbot
* 💬 Instant responses
* 🎯 Intent detection
* 🔍 NLP-based question matching
* 📚 Predefined knowledge base
* 🧠 Training patterns
* 🔗 Smart Action Cards
* 👍 Answer feedback
* 📖 Searchable FAQ section
* 👨‍💼 Admin knowledge management
* 📊 Basic chatbot analytics
* 📱 Responsive design
* ⚠️ Unknown-question handling

---

## ⭐ Smart Action Cards

The chatbot can provide an action along with its answer.

**Example:**

**User:**
How can I reset my password?

**Chatbot:**
You can reset your password from your account settings.

**Action:**
`Reset Password`

This allows users to directly access the required action instead of only receiving information.

---

## 🧠 How the Chatbot Works

```text
User Question
      ↓
Text Processing
      ↓
Intent Detection
      ↓
Knowledge Base Search
      ↓
Best Matching Answer
      ↓
Chatbot Response
      ↓
Smart Action
```

The project uses **TF-IDF and Cosine Similarity** to find the most relevant predefined response.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap 5

### Backend

* Python
* Flask

### NLP / Machine Learning

* NLTK
* scikit-learn
* TF-IDF
* Cosine Similarity

### Database

* SQLite

### Testing

* Pytest

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/helpdesk-ai-chatbot.git
cd helpdesk-ai-chatbot
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate on Windows

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run the application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

## 🧪 Testing

Run:

```bash
pytest
```

The tests cover:

* Chatbot responses
* Intent detection
* API endpoints
* Database operations
* Unknown questions
* Invalid inputs

---

## 💬 Example Questions

Try asking:

```text
What are your business hours?

How can I reset my password?

What is your refund policy?

How can I contact support?

What payment methods do you accept?

How long does delivery take?

How do I update my account?
```

---

## 🔮 Future Improvements

* Voice-based chatbot
* Multilingual support
* WhatsApp integration
* Advanced conversational AI
* Cloud database
* Live customer-support handoff
* Advanced analytics

---

## 👨‍💻 Project Purpose

This project was developed as an internship task to demonstrate practical knowledge of:

* Python
* Flask
* Natural Language Processing
* Machine Learning
* REST APIs
* Database Management
* Frontend Development
* Software Testing

---

## 📄 License

This project is available under the MIT License.

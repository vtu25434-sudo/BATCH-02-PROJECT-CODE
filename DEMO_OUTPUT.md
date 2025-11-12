# EduBot - Vel Tech Chennai - Demo Output

## Project Overview
EduBot is an AI-powered chatbot for Vel Tech University (Chennai) that helps students with admissions, fees, scholarships, programs, campus facilities, and more.

## How to Run

1. **Start the Server:**
   ```bash
   cd "MINOR project codes/data"
   node server.js
   ```
   Or double-click `start.bat` on Windows

2. **Access the Application:**
   - Open your browser
   - Navigate to: `http://localhost:3000`
   - **Important:** Do NOT open the HTML file directly (file://). It must be accessed via the server.

## Demo Output Screenshots Description

### Main Interface
- **Header:** "EduBot · Vel Tech Chennai" with graduation cap icon
- **Subtitle:** "Your AI Assistant for Vel Tech University (Chennai)"
- **Chat Area:** 
  - Bot avatar and "EduBot Assistant" with "Online" status
  - Welcome message with quick action buttons
  - Chat input box at the bottom

### Sidebar Features
- **Popular Topics Section:**
  - Admission Requirements (📄)
  - Application Deadlines (📅)
  - Tuition & Fees (💵)
  - Campus Housing (🏠)
  - Academic Programs (📚)
  - Student Life (👥)
  - Fee Structure (₹)
  - Placements (💼)

- **Quick Help Section:**
  - Instructions on how to use the chatbot
  - Tips for getting the best responses

### Quick Action Buttons
- Admission Requirements (Purple)
- Campus Facilities (Purple)
- Application Process (Purple)
- Scholarships (Purple)
- **Fee Structure (Green)** ⭐
- **Placements (Orange)** ⭐

## Sample Conversations

### 1. Admission Requirements Query
**User:** "What are the admission requirements?"
**EduBot Response:**
```
To apply to Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology, 
typical UG requirements include 10+2 with required percentage and accepted entrance exams 
(e.g. VTUEEE / JEE).

Confidence: 92%
Related topics: Admission Requirements, Application Process
```

### 2. Fee Structure Query
**User:** "What is the fee structure?"
**EduBot Response:**
```
Indicative B.Tech tuition: Phase I starts at ₹2,90,000 per year 
(scholarships available based on 10+2 scores).

Confidence: 88%
Related topics: Tuition Fees, Scholarships
```

### 3. Scholarship Query
**User:** "Tell me about scholarships"
**EduBot Response:**
```
Scholarships: VTUEEE Scholarship (based on rank); Merit Scholarship for high 10+2 scores; 
JEE Main percentile-based tuition waiver. Financial assistance for eligible students; 
Special consideration for economically weaker sections.

Confidence: 85%
Related topics: Scholarships
```

### 4. Placement Query
**User:** "Tell me about placements"
**EduBot Response:**
```
Vel Tech has a dedicated placement cell that assists students with job placements. 
The university has tie-ups with various companies and organizes campus recruitment drives. 
Contact the placement office for more details.

Confidence: 85%
Related topics: Placements, Career Services
```

### 5. Campus Facilities Query
**User:** "What campus facilities are available?"
**EduBot Response:**
```
Campus life includes clubs, cultural events, sports and student services. 
See /demo.html for examples.

Confidence: 82%
Related topics: Campus Life, Clubs & Events
```

### 6. Academic Programs Query
**User:** "What academic programs are available?"
**EduBot Response:**
```
Vel Tech offers various programs. UG: B.Tech Computer Science and Engineering, 
B.Tech Artificial Intelligence and Data Science, B.Tech Electronics and Communication 
Engineering, B.Tech Mechanical Engineering, B.Sc Computer Science. 
PG: M.Tech Computer Science and Engineering, MBA, MCA.

Confidence: 88%
Related topics: Academic Programs, Courses
```

### 7. Hostel Query
**User:** "Tell me about campus housing"
**EduBot Response:**
```
Hostel accommodation is available: INR 85,000 - 1,10,000 per year per year. 
Mess facilities: INR 45,000 - 60,000 per year.

Confidence: 85%
Related topics: Campus Housing, Hostel
```

### 8. Application Deadlines Query
**User:** "What are the application deadlines?"
**EduBot Response:**
```
Application deadlines: Early - 31 March, Regular - 31 May, Late - 30 June 
(subject to availability).

Confidence: 90%
Related topics: Application Deadlines, Important Dates
```

## Features

### ✅ Interactive Chat Interface
- Real-time chat with typing indicators
- User and bot message bubbles with avatars
- Smooth animations and transitions

### ✅ Quick Action Buttons
- One-click access to common queries
- Color-coded buttons (Green for Fees, Orange for Placements)
- Instant responses

### ✅ Popular Topics Sidebar
- Easy navigation to common topics
- Icon-based visual indicators
- Click to send queries

### ✅ Intelligent Responses
- Context-aware answers based on university data
- Confidence scores for responses
- Related topic suggestions
- Data-driven from veltech.json

### ✅ Error Handling
- Clear error messages if server is not running
- Fallback responses
- User-friendly error display

### ✅ Responsive Design
- Works on desktop and mobile devices
- Modern UI with gradient colors
- Clean and professional appearance

## Technical Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Data:** JSON (veltech.json)
- **Icons:** Font Awesome 6.4.0
- **Styling:** Custom CSS with gradients and animations

## API Endpoints

### POST /api/chat
**Request:**
```json
{
  "message": "What are the admission requirements?"
}
```

**Response:**
```json
{
  "reply": "To apply to Vel Tech...",
  "confidence": 92,
  "topics": ["Admission Requirements", "Application Process"]
}
```

## Server Output (Console)

When the server starts successfully:
```
📚 Loaded university dataset: C:\Users\monik\OneDrive\Desktop\INDUSTRY PROJECT\MINOR project codes\data\veltech.json
🚀 EduBot server running at http://localhost:3000
📝 Open your browser and navigate to: http://localhost:3000
⚠️  Make sure to access via http://localhost:3000, not by opening the HTML file directly!
```

## Troubleshooting

### Issue: "localhost refused to connect"
**Solution:**
1. Make sure the server is running (`node server.js`)
2. Access via `http://localhost:3000` (not file://)
3. Check if port 3000 is already in use
4. Try a different port: `set PORT=3001 && node server.js`

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: API not responding
**Solution:**
1. Check server console for errors
2. Verify veltech.json exists in the data folder
3. Check browser console for network errors

## Project Structure

```
data/
├── server.js           # Express server with API endpoints
├── index.html          # Main chat interface
├── styles.css          # Styling and animations
├── enhanced-scripts.js # Additional scripts (optional)
├── veltech.json        # University data
├── package.json        # Node.js dependencies
├── start.bat           # Windows startup script
└── start.sh            # Linux/Mac startup script
```

## Future Enhancements

- [ ] Add user authentication
- [ ] Save conversation history
- [ ] Add more natural language processing
- [ ] Integrate with real AI models (OpenAI, etc.)
- [ ] Add multi-language support
- [ ] Add file upload for documents
- [ ] Add voice input/output
- [ ] Add analytics and user tracking

## Conclusion

EduBot provides a comprehensive, user-friendly interface for students to get information about Vel Tech University. The chatbot is responsive, intelligent, and provides accurate information based on the university's data.

---

**Project Status:** ✅ Fully Functional
**Last Updated:** 2024
**Version:** 1.0.0

const data = {
    theme: {
        primaryColor: '#15803d', // Green-700 (titles, all buttons)
        textColor: '#1f2937',    // Gray-800 (body text)
        bgColors: ['bg-white', '#fef3c7'], // Alternating defaults
        buttonColor: '#22c55e',  // Green-500 (unused, kept for reference)
        feedbackColor: '#1f2937', // Gray-800 (quiz feedback text)
        fontSizeBase: 'text-lg'  // Default text size
    },
    sections: [        
        { type: "intro", image: "images/img2.jpg", title: "Welcome to the Course" },
        { type: "standard", title: "Introduction to the Course", text: "This is the introductory text for the course.", image: "images/img1.jpg" },
        { type: "checklist", title: "Lesson 2 Checklist", text: "Complete these steps before moving to Lesson 3.", items: ["Step 1: Review key concepts", "Step 2: Participate in discussion", "Step 3: Submit your assignment", "Step 4: Provide feedback"], bgImage: "images/img7.jpg" },
        { type: "clickAndReveal", title: "Introduction to Web Development", text: "In this section, we will explore the basics of web development...", items: [{ title: "What is JavaScript?", answer: "JavaScript is a programming language..." }, { title: "What is HTML?", answer: "HTML stands for HyperText Markup Language..." }, { title: "What is CSS?", answer: "CSS stands for Cascading Style Sheets..." }], bgImage: "images/img3.jpg", bgColor: "#00ff00" },
        { type: "imageBelow", title: "Section Title", text: "This is the content of the paragraph...", image: "images/img4.jpg" },
        { type: "chart", title: "Comparison of Data Sets", text: "In this section, we compare two data sets...", chartData: { left: ["Value A1", "Value A2", "Value A3", "Value A4"], right: ["Value B1", "Value B2", "Value B3", "Value B4"] }, bgImage: "images/img5.jpg" },
        { type: "flipCard", title: "Interactive Flip Cards", text: "Explore the content below with flip cards.", items: [{ placeholderText: "Card 1", backText: "More about Card 1" }, { placeholderText: "Card 2", backText: "More about Card 2" }, { placeholderText: "Card 3", backText: "More about Card 3" }] },
        { type: "quiz", title: "Quiz Time", text: "Test your knowledge!", quiz: [
            { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
            { question: "Which is a programming language?", options: ["HTML", "CSS", "JavaScript", "Photoshop"], correct: "JavaScript" }
        ], bgImage: "images/img2.jpg" },
        { type: "imageBelow", number: 7, title: "The End", text: "This is the content of the paragraph...", image: "images/img6.jpg", isFinal: true }
    ]
};
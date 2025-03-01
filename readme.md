# Modular Training Module Template

A user-friendly e-learning template designed for content creators who don't want to code. Simply update the content in one file and your interactive training module is ready to go!

## Overview

This template allows you to create professional, interactive e-learning modules without any coding knowledge. Just edit the `data.js` file with your content, and the system will automatically build your course with proper styling, navigation, and SCORM tracking.

## Required Changes Before Publishing

There are a few simple edits you need to make before your course is ready:

### 1. Update the Course Title

You need to update the title in two places:

#### A. In the HTML file (for browser tab title)

Open `index.html` and change the title:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Course Title Here</title>  <!-- Change this line -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
```

#### B. In the manifest file (for LMS display)

Open `imsmanifest.xml` and change both title elements:

```xml
<organizations default="ORG1">
    <organization identifier="ORG1">
        <title>Your Course Title Here</title>  <!-- Change this line -->
        <item identifier="ITEM1" identifierref="RES1">
            <title>Your Course Title Here</title>  <!-- Change this line -->
        </item>
    </organization>
</organizations>
```

### 2. Replace Example Images

The template comes with sample images (`img1.jpg` through `img7.jpg`) that should be replaced with your own content:

1. Create your own images with similar dimensions to the examples
2. Name your files clearly (e.g., `welcome.jpg`, `concept1.jpg`)
3. Place all images in the `images/` folder
4. Update the image references in your `data.js` file

**Important**: If you add new image files, you must also add them to the `imsmanifest.xml` file for SCORM compatibility:

```xml
<resources>
    <resource identifier="RES1" type="webcontent" adlcp:scormtype="sco" href="index.html">
        <!-- other files... -->
        <file href="images/your-new-image.jpg"/>  <!-- Add a line like this for each new image -->
        <!-- other files... -->
    </resource>
</resources>
```

## For Content Creators (No Coding Required!)

### How It Works

1. **Single File Editing**: You only need to modify the `data.js` file
2. **Keep the Format**: Maintain the structure exactly as shown in the examples
3. **Add Your Content**: Replace the sample text and image paths with your own

⚠️ **IMPORTANT**: Always maintain the exact format of the `data.js` file, including brackets, commas, colons, and quotes. Changing the structure (not just the content) may break the module.

## Content Configuration

### Theme Settings

At the top of `data.js`, you'll find theme settings to match your brand colors:

```javascript
theme: {
    primaryColor: '#15803d',  // Green color for titles and buttons
    textColor: '#1f2937',     // Color for body text
    bgColors: ['bg-white', '#fef3c7'], // Alternating background colors
    // Other theme settings...
}
```

### Adding Content Sections

Your course is built from sections defined in the `sections` array. Each section has a specific `type` that determines its layout and interactivity.

**Example of a standard content section:**

```javascript
{ 
    type: "standard", 
    title: "Your Section Title", 
    text: "Your content goes here. You can add as much text as needed.", 
    image: "images/your-image.jpg" 
}
```

## Section Types Available

1. **Intro Screen** - Welcome screen with large image
   ```javascript
   { 
       type: "intro", 
       image: "images/welcome.jpg", 
       title: "Welcome to Your Course" 
   }
   ```

2. **Standard Content** - Basic text and image
   ```javascript
   { 
       type: "standard", 
       title: "Section Title", 
       text: "Your content here...", 
       image: "images/example.jpg" 
   }
   ```

3. **Checklist** - Interactive task list
   ```javascript
   {
       type: "checklist", 
       title: "Your Checklist", 
       text: "Complete these items:", 
       items: ["Task 1", "Task 2", "Task 3"], 
       bgImage: "images/background.jpg" 
   }
   ```

4. **Click and Reveal** - Expandable content
   ```javascript
   {
       type: "clickAndReveal", 
       title: "Click to Explore", 
       text: "Click each item to learn more:", 
       items: [
           { title: "Topic 1", answer: "Details about topic 1..." }, 
           { title: "Topic 2", answer: "Details about topic 2..." }
       ], 
       bgImage: "images/background.jpg"
   }
   ```

5. **Image Below** - Content with image underneath
   ```javascript
   {
       type: "imageBelow", 
       title: "Section With Image", 
       text: "Your content here...", 
       image: "images/your-image.jpg",
       isFinal: false  // Set to true for final section with completion button
   }
   ```

6. **Chart** - For comparing information
   ```javascript
   {
       type: "chart", 
       title: "Comparison Chart", 
       text: "This chart compares:", 
       chartData: { 
           left: ["Item A1", "Item A2", "Item A3"], 
           right: ["Item B1", "Item B2", "Item B3"] 
       }, 
       bgImage: "images/background.jpg"
   }
   ```

7. **Flip Cards** - Interactive knowledge cards
   ```javascript
   {
       type: "flipCard", 
       title: "Knowledge Cards", 
       text: "Click cards to reveal more information", 
       items: [
           { placeholderText: "Front side text", backText: "Back side text" },
           { placeholderText: "Question?", backText: "Answer!" }
       ]
   }
   ```

8. **Quiz** - Knowledge check questions
   ```javascript
   {
       type: "quiz", 
       title: "Knowledge Check", 
       text: "Test your understanding:", 
       quiz: [
           { 
               question: "What is the correct answer?", 
               options: ["Wrong", "Correct", "Wrong", "Wrong"], 
               correct: "Correct" 
           },
           // More questions...
       ], 
       bgImage: "images/background.jpg"
   }
   ```

## Customizing Section Appearance

### Override Default Numbering

By default, sections are automatically numbered in sequence. You can override this by adding a `number` property:

```javascript
{
    type: "standard",
    number: 7,  // This will be shown as section 7 regardless of position
    title: "Custom Numbered Section",
    text: "Content here...",
    image: "images/example.jpg"
}
```

### Override Background Colors

Sections automatically alternate between the background colors defined in `theme.bgColors`. You can override this with the `bgColor` property:

```javascript
{
    type: "standard",
    title: "Custom Background Section",
    text: "Content here...",
    image: "images/example.jpg",
    bgColor: "#e0f7fa"  // Custom background color
}
```

### Background Images

Many section types support setting a background image with the `bgImage` property:

```javascript
{
    type: "checklist",
    title: "Checklist with Background",
    text: "Content here...",
    items: ["Item 1", "Item 2"],
    bgImage: "images/nice-background.jpg"
}
```

## Making Your Final Section

To add a completion button to your last section, set `isFinal` to `true`:

```javascript
{
    type: "imageBelow",
    title: "Congratulations!",
    text: "You have completed the course.",
    image: "images/completion.jpg",
    isFinal: true  // This adds a completion button
}
```

## Testing Your Module

1. After editing `data.js`, open the `index.html` file in a web browser
2. Navigate through all sections to verify your content
3. Test all interactive elements
4. When ready, upload the entire folder to your SCORM-compatible LMS

## SCORM Compatibility

This template is compatible with SCORM 1.2 and can be uploaded to any Learning Management System (LMS) that supports this standard. The template automatically tracks:

- Which section the learner last viewed
- Course completion status

## Troubleshooting

If your module doesn't display correctly:

1. Check `data.js` for syntax errors - look for missing commas, quotes, or brackets
2. Verify all image paths are correct
3. Ensure you've maintained the proper structure for each section type
4. Check that all new images are listed in the `imsmanifest.xml` file

# Customizing Your E-Learning Module

## Content Editing Guidelines

1. **Replace only the content between quotes** in the `data.js` file:
   ```javascript
   // From this:
   title: "Your Section Title"
   
   // To this:
   title: "Introduction to Customer Service"
   ```

2. **Keep all key names unchanged** (like `type`, `title`, `text`, etc.)

3. **Update content in these files only**:
   - `index.html` - Only change the course title
   - `data.js` - Update content between quotes
   - `imsmanifest.xml` - Update title elements and add new image references

## Creating a SCORM-Compatible Zip Package

### Important: Only zip the contents, not the folder itself

#### Command Line Method
```
cd your-course-folder
zip -r ../your-course-name.zip *
```

#### Windows Method
1. Open your course folder
2. Select all contents except for the readme and license files
3. Right-click → Send to → Compressed (zipped) folder
4. Rename the zip file as needed

#### Mac Method
1. Open your course folder
2. Select all contents (Command+A)
3. Right-click → Compress Items
4. Rename the zip file as needed

This ensures the LMS can properly access all files at the correct root level when extracting your package.
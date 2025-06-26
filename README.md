# YouTube Learning Topic Picker

A simple web app to help you discover and explore educational topics on YouTube. This tool randomly selects a topic and an educational classifier, then helps you search for high-quality, educational content on YouTube. It is designed for learners, educators, and developers who want to expand or customize the list of topics and classifiers.

## Features

- **Random Topic Selection:** Choose from a curated or custom list of educational topics.
- **Educational Classifiers:** Enhance YouTube searches with terms like "tutorial", "explained", "introduction", etc.
- **Topic Management:** Add, edit, upload, or download your own list of topics.
- **Auto-Redirect:** Optionally jump straight to YouTube search results.
- **Persistence:** Topics are saved in your browser's local storage.

## Getting Started

1. **Clone or Download the Repository**

```bash
git clone https://github.com/your-username/youtube-learning.git
cd youtube-learning
```

2. **Open the App**

Simply open the `index.html` file in your web browser. No build step or server is required.

## Usage

- Click the button to get a random educational topic and classifier.
- Use the topic manager to add, remove, upload, or download topics.
- Enable auto-redirect to jump directly to YouTube search results.

## File Structure

- `main.js` — Core logic for topic selection, classifier management, and topic persistence.
- `index.html` — (Not included here) The main HTML file for the UI.

## How to Contribute or Extend

Developers (AI or human) can easily add new features or modify the app:

- **Add More Classifiers:** Edit the `educationContentClassifiers` array in `main.js`.
- **Expand Default Topics:** Edit the `defaultTopics` array in `main.js`.
- **Improve UI/UX:** Update `index.html` and related styles.
- **Add New Features:** For example, add topic categories, user profiles, or analytics.

### Guidelines

- Keep the code simple and readable.
- Use plain JavaScript and HTML for maximum compatibility.
- Document any new functions or features in the code.
- Test your changes in a browser before submitting.

## License

MIT License. See `LICENSE` for details.

## Contact

For questions or suggestions, open an issue or submit a pull request. 
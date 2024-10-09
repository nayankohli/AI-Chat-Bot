# AI Chat-Bot

An AI-driven interactive chatbot that evaluates and provides real-time feedback on user-submitted answers to technical questions. This project leverages Google's generative AI model (gemini-1.5-flash) to assess answers and provide a judgement and score, enhancing the learning experience.

## Features

- **Real-time AI Evaluation**: The AI evaluates answers using the `gemini-1.5-flash` model and provides feedback in a predefined format.
- **Dynamic Question Fetching**: Questions are fetched from a JSON file (`ques.json`), and users can navigate through them.
- **Interactive UI**: A visually appealing, neumorphic design with glassmorphism effects and responsive layout.
- **Score Calculation**: After each question, the user's score is updated based on the AI's evaluation.
- **Next/Previous Navigation**: Users can move between questions and finish the test to get their total score.
  
## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google's `gemini-1.5-flash` generative AI model
- **UI Design**: Neumorphism and glassmorphism for a modern, sleek user interface

## Project Structure

- `ai.html`: The main HTML file containing the chatbot interface.
- `Ai.js`: Contains the JavaScript logic for fetching questions, submitting answers, and handling responses.
- `ques.json`: A JSON file containing the list of technical questions.
- `server.js`: The backend server built with Express.js to serve the files, handle submissions, and call the AI model for responses.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/AI-Chat-Bot.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open your browser and go to `http://localhost:3001`.

## API Key Setup

- In `server.js`, replace the placeholder `API_KEY` with your own Google Generative AI API key to enable the AI-driven feedback.

## Usage

1. The user submits an answer to the displayed question.
2. The answer is sent to the backend, where it is evaluated by the AI model.
3. The AI returns a judgement and score (out of 10) based on the answer.
4. The user can navigate between questions using "Next" and "Previous" buttons.
5. At the end of the test, the total score is displayed.

## Contributing

Feel free to fork this repository and submit pull requests. Any contributions, whether bug fixes, features, or design improvements, are appreciated!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

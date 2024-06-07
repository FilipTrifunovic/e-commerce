
# E-Commerce Store for Clothes

This is an e-commerce application for clothes built with Angular. It features a chatbot powered by Rasa AI to assist users with their shopping experience.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Angular CLI](https://angular.io/cli)
- [Python](https://www.python.org/) (v3.6 or later)

## Getting Started

Follow these steps to set up and run the project locally.

### Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### Install Dependencies

Install the required npm packages:

```bash
npm install
```

### Run the Angular Application

Start the Angular development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

### Setting Up and Running Rasa AI

Rasa AI is already included in the project. Follow these steps to set up and run Rasa AI:

1. **Navigate to the Rasa Directory**:

    ```bash
    cd rasa
    ```

2. **Install Rasa and Rasa SDK**:

    ```bash
    pip install rasa
    pip install rasa-sdk
    ```

3. **Train the Rasa Model**:

    Make sure you have the necessary training data (`nlu.yml`, `stories.yml`, `domain.yml`, etc.) in the `rasa` directory.

    ```bash
    rasa train
    ```

4. **Run the Rasa Action Server**:

    If you have custom actions defined, you need to run the action server:

    ```bash
    rasa run actions
    ```

5. **Run the Rasa Server**:

    Start the Rasa server:

    ```bash
    rasa run
    ```

    The Rasa server will be available at `http://localhost:5005/`.

### Configuration

Ensure your Angular application is configured to communicate with the Rasa server. This typically involves setting the correct URL for the Rasa webhook in your Angular service that handles chatbot interactions.

### Additional Notes

- Ensure that your Rasa project files (like `domain.yml`, `nlu.yml`, `stories.yml`, etc.) are correctly set up and located in the `rasa/` directory or the appropriate directory you've structured for your project.
- The Angular application is configured to interact with the Rasa server for chatbot functionalities. Ensure the correct endpoint URLs are set in your Angular services.


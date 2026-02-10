<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1uouDAhGmKtHtYcazikKTPvrV1etg5dnH

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file from the example:
   ```bash
   cp .env.example .env.local
   ```

3. Set your Gemini API key in `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to AWS Amplify

This project includes an `amplify.yml` configuration file for easy deployment to AWS Amplify.

1. Push your code to GitHub
2. Connect your repository in AWS Amplify Console
3. Add the `VITE_GEMINI_API_KEY` environment variable in Amplify settings
4. Deploy!

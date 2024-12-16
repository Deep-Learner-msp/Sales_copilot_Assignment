This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

#Overview of the task:
 Brief description of what has been implemented (API integrations, state management, new buttons, etc.).
 
 -[API integrations,state management, new buttons, etc.](
API integrations for real-time data and conversation-based responses and with mockdata server also.
State management using Hooks also Redux to handle conversation history and pitch creation.
A dynamic chat interface with features like "Sales Assistant," "Market Insights," "Product Guide," and "Pitch Creator."
Feedback functionality where users can rate responses with thumbs up or down.
Animated UI components using Framer Motion for smooth transitions.
A "Magic Button" that enhances the response generation based on the current conversation.

#Installation Instructions
Node.js (version 16 or above)
npm or yarn package manager

Steps
Clone the repository:

bash

git clone https://github.com/your-repo/k2k-connect-final.git
Navigate to the project directory:

bash
cd k2k-connect-final
Install the dependencies: Using npm:

bash

npm install

Start the development server:

bash
npm run dev



Access the app: Open your browser and navigate to http://localhost:3000.

also you have to run json-server --watch mock-api.json --port 5000    where mockdata connect to UI  
and get default api resopnse or mockdata .

#Usage Instructions
Once the app is running locally, you can explore the following features:

Chat Features
Sales Assistant: Get sales advice by selecting this feature and entering a product name.
Market Insights: Retrieve the latest market data by providing the industry and company name.
Product Guide: Enter a product line to get detailed product information.
Pitch Creator: Generate a pitch presentation based on conversation history and key metrics.
Magic Button
Click the "Magic Button" during a conversation to enhance the response with additional insights or feedback.
Feedback
After receiving a response, click the Thumbs Up or Thumbs Down buttons to submit feedback.

#The following APIs are integrated into the app:

Sales Chat API: Provides real-time sales strategies based on user input.
Market Insights API: Retrieves up-to-date market trends and competitor analysis.
Product Guide API: Offers comprehensive product details, comparisons, and pricing.
Pitch Creator API: Generates professional sales presentations based on conversation history.
Feedback API: Allows users to submit feedback on bot responses.


#Mock Data
During development, mock API responses were used to simulate real-time data. You can replace mock data with real API calls using the provided environment variables.


#Testing Instructions
Manual Testing
Start the application locally by following the installation steps.
Navigate through each feature in the chat interface and test various inputs for:
Sales Assistant: Enter a product name and check the response.
Market Insights: Provide an industry and company name, then validate the market data returned.
Pitch Creator: Generate a pitch by entering relevant details, then view the response.
Use the Magic Button to check if additional insights are generated.
Submit feedback using the thumbs up/down buttons and verify the feedback submission.





 


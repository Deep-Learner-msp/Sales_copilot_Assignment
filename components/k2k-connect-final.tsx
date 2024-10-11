"use client";

import { useState, useEffect, Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Search,
  BookOpen,
  PresentationIcon,
  Send,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";
import { Toast } from "@/components/ui/toast";
import { ToastProvider } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { report } from "process";
import { useRouter } from "next/navigation";
interface Feature {
  icon: any;
  label: string;
  description: string;
  color: string;
  prompt: string;
  endpoint: string;
  suggestedQuestions: string[];
}

interface Message {
  type: "user" | "bot";
  content: string|any;
  timestamp: string;
  id?: number|string;
}



export function K2kConnectFinal({apiList}:any) {

  const [showChat, setShowChat] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [allHistory, setAllHistory] = useState<Record<string, Message[]>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [currentFeedbackMessageId, setCurrentFeedbackMessageId] = useState<
    number | null
  >(null);
  const [toastMode, setToastMode] = useState<"success" | "error" | "info">("info");
  const router = useRouter();



  const features = [
    {
      icon: MessageCircle,
      label: "Sales Assistant",
      description: "AI-powered assistant to boost your sales performance",
      color: "from-blue-500 to-cyan-500",
      prompt: "What product are you selling?",
      endpoint: apiList.REACT_APP_SALES_CHAT_API_URL,
      suggestedQuestions: [
        "How can I improve my sales pitch?",
        "What are effective closing techniques?",
        "How do I handle objections?",
        "Tips for building rapport with clients?",
      ],
    },
    {
      icon: Search,
      label: "Market Insights",
      description: "Real-time market analysis and competitor intelligence",
      color: "from-green-500 to-emerald-500",
      prompt: "What industry and company are you targeting?",
      endpoint: apiList.REACT_APP_MARKET_INSIGHTS_API_URL,
      suggestedQuestions: [
        "What are the latest market trends?",
        "Who are our main competitors?",
        "What's the market size for our product?",
        "Any recent regulatory changes?",
      ],
    },
    {
      icon: BookOpen,
      label: "Product Guide",
      description: "Comprehensive product information at your fingertips",
      color: "from-yellow-500 to-orange-500",
      prompt: "Which product line are you interested in?",
      endpoint: apiList.REACT_APP_PRODUCT_GUIDE_API_URL,
      suggestedQuestions: [
        "What are our product's key features?",
        "How does our product compare to competitors?",
        "What's our pricing strategy?",
        "Any upcoming product releases?",
      ],
    },
    {
      icon: PresentationIcon,
      label: "Pitch Creator",
      description: "Create compelling, data-driven presentations quickly",
      color: "from-pink-500 to-rose-500",
      prompt: "What type of presentation do you need?",
      endpoint: apiList.REACT_APP_PITCH_CREATOR_API_URL,
      suggestedQuestions: [
        "How do I structure an effective pitch?",
        "What key metrics should I include?",
        "How to create engaging slides?",
        "Tips for delivering a memorable presentation?",
      ],
    },
  ];
  // const feedback =
  // console.log(feedback, "feed");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature);
    setChatHistory(
      allHistory[feature.label] || [{ type: "bot", content: feature.prompt }]
    );
  };

  const Marketinsight=(props:any)=>{
    console.log(props,"market");
    const handleMagicBtn=async()=>{
      debugger;
      let payload:{}={
        feedback:input,
        report:report
      }
      const botMessage: Message = {
        type: "bot",
        content: "",
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };
      debugger;

      const res = await fetch(apiList.REACT_APP_MAGIC_BUTTON_API_URL, payload);
    const data = await res?.json();
    let defaultApiRes={
      "session_id": "abc123",
      "updated_report": "After feedback, Company X has updated its security policies.",
      "response": "Company X has made improvements based on your input.",
      "history": ["Please update the insights for Company X."]
    }

      botMessage.content=defaultApiRes?.response||data[0]?.response;
    setChatHistory((prev) => [...prev, botMessage]);

    


    
  setInput("")
  
    }



    return(

      <>
      <div>
        
        <div>
        {props.data.report?.latest_attacks}
          </div>  
          <div>
        {props.data.report?.pain_points}
          </div>  

        
    <span>
      <button className="ml-2 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition" onClick={handleMagicBtn}>
        Magic Button
      </button>
    </span>
  
      </div>
      
      </>
    )

  }

  interface ChatHistoryProps {
    allHistory: Record<string, Message[]>; // Object where keys are feature labels like "Sales Assistant"
    data?: any; // You can adjust this type based on what `data` represents
  }
  
  
  
const ShowChatHistory: React.FC<ChatHistoryProps> = ({ allHistory, data }) => {
  console.log(allHistory, "123");

  return (
    <div className="chat-history" style={{}}>

      <div>{data}</div>
      {Object.keys(allHistory).map((category, catIndex) => (
        <div key={catIndex}>
          <h3>{category}</h3>

          {/* Loop over each message in that category */}
          {allHistory[category].map((message, index) => (
            <div key={index} className={`chat-message ${message.type}`}>
              <span className="message-type">{message.type === "user" ? "You" : "Bot"}:</span>
              <p>{message.content}</p>
              {message.timestamp && (
                <span className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


  const handleSendMessage = async () => {
    if (input.trim() && selectedFeature) {
      const userMessage: Message = {
        type: "user",
        content: input,
        timestamp: new Date().toISOString(),
      };
      setChatHistory((prev) => [...prev, userMessage]);
      setAllHistory((prev) => ({
        ...prev,
        [selectedFeature.label]: [
          ...(prev[selectedFeature.label] || []),
          userMessage,
        ],
      }));

      try {
        let payload: any = { input: input };
        if (selectedFeature.label === "Market Insights") {
          debugger;
          const [url, companyName, industry] = input
            .split(",")
            .map((item) => item.trim());
          payload = { url, company_name: companyName, industry };
        } else if (selectedFeature.label === "Pitch Creator") {
          payload = {
            theme: input,
            history: Object.values(allHistory).flat(),
          };
        }

      //  const response = await fetch(selectedFeature.endpoint, payload);
        const res = await fetch(selectedFeature.endpoint, payload);
  const data = await res?.json();
        debugger;
        let  botMessage: Message = {
          type: "bot",
          content: "",
          timestamp: new Date().toISOString(),
          id: Date.now(),
        };
        if(selectedFeature.label==="Sales Assistant"){
          const res ={
            "session_id": "abc123",
            "response": "The best way to improve cybersecurity is to implement strong access control policies.",
            "history": ["What are the best ways to improve cybersecurity?"]
          }
          botMessage.content=res?.response||data[0]?.response;

        }
        else if(selectedFeature.label==="Product Guide"){
          const res ={
            "session_id": "abc123",
            "response": "The best way to improve cybersecurity is to implement strong access control policies.",
            "history": ["What are the best ways to improve cybersecurity?"]
          }
          botMessage.content=res?.response||data[0]?.response;

        }

        

        else if(selectedFeature.label==="Market Insights"){
             const  defaultRes ={
              "session_id": "abc123",
              "report": {
                "latest_attacks": "Company X experienced a ransomware attack in September 2024.",
                "pain_points": "Insufficient backup policies, outdated software."
              },
              "history": ["Please provide insights for Company X."]
            
            }||data[0];
           let response=defaultRes||data[0] 

 debugger;
          botMessage.content=<Marketinsight data={response}/>;
        }
        else if(selectedFeature.label==="Pitch Creator"){
          debugger;
          console.log(chatHistory,allHistory,"v123");
          const apiRes={
            "session_id": "abc123",
            "presentation": "Pitch for Company X: Based on their industry, the current market challenges, and recent attacks, we recommend a comprehensive cybersecurity overhaul.",
            "history": ["Generate a pitch for Company X."]
          }||data?.[0]?.presentation;
          const apidefaultres=apiRes.presentation||data?.[0]?.presentation;

          botMessage.content = <ShowChatHistory allHistory={allHistory} data={apidefaultres}/>         

        }

        setChatHistory((prev) => [...prev, botMessage]);
        setAllHistory((prev) => ({
          ...prev,
          [selectedFeature.label]: [
            ...(prev[selectedFeature.label] || []),
            botMessage,
          ],
        }));

        
      } catch (error) {
        console.error("Error calling API:", error);
        const errorMessage: Message = {
          type: "bot",
          content: "Sorry, there was an error processing your request.",
          timestamp: new Date().toISOString(),
          id: Date.now(),
        };
        setChatHistory((prev) => [...prev, errorMessage]);
        setAllHistory((prev) => ({
          ...prev,
          [selectedFeature.label]: [
            ...(prev[selectedFeature.label] || []),
            errorMessage,
          ],
        }));
      }

      setInput("");
    }
  };

  const handleFeedback = async (messageId: number, feedback: "like" | "dislike") => {
    const message = chatHistory.find((msg) => msg.id === messageId);
    if (message) {
      debugger;
      try {
        await axios.post(apiList.REACT_APP_FEEDBACK_API_URL, {
          user_question: chatHistory[chatHistory.indexOf(message) - 1]?.content,
          bot_answer: message.content,
          timestamp: message.timestamp,
          feedback: feedback,
        });
        setShowToast(true);
        setToastMessage(`Feedback ${feedback === "like" ? "positive" : "negative"} submitted successfully`);
        setToastMode("success");
        
        setTimeout(() => setShowToast(false), 3000);

        if (feedback === "dislike") {
          setCurrentFeedbackMessageId(messageId);
          setShowFeedbackDialog(true);
        }
      } catch (error) {
        console.error("Error saving feedback:", error);
        setToastMessage("Error submitting feedback");
        setToastMode("error");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
  };
  
  console.log(chatHistory,"chatHistory");
   // Function to navigate back
   const navigateBack = () => {
    if (typeof window !== 'undefined') {
      // Ensure it's only executed on the client
      router.back();  // Navigate to the previous page
    }  };
    console.log(typeof window !== 'undefined' ? 'Client Side' : 'Server Side');

  return (
    
    <ToastProvider>
     
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3TzmcA2DlOrIgtymTBdS7t8Z8Gp5IX.png"
              alt="Infosec K2K Logo"
              className="h-16"
            />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!showChat ? (
            <motion.main
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Welcome to K2K Connect
              </h1>
              <p className="text-xl mb-12 text-gray-300">
                Empower your sales team with AI-driven insights and tools
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white/10 p-6 rounded-xl backdrop-blur-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">{feature.label}</h2>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg px-10 py-4 rounded-full font-semibold transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch K2K Copilot
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.main>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md text-white border-none shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 py-6">
                    K2K Connect Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                <button onClick={navigateBack} className="bg-blue-500 text-white p-3 rounded">
        Go Back
      </button>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {features.map((feature, index) => (
                      <Button
                        key={index}
                        onClick={() => handleFeatureSelect(feature)}
                        className={`h-20 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                          selectedFeature === feature
                            ? `bg-gradient-to-r ${feature.color}`
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <feature.icon className="w-6 h-6 mb-2" />
                        <span className="text-xs text-center">
                          {feature.label}
                        </span>
                      </Button>
                    ))}
                  </div>

                  <div className="h-64 overflow-y-auto mb-6 bg-white/5 rounded-xl p-4">
                    {chatHistory.map((message:Message,index) => (
                      
                      
                      <div
                        key={message.id}
                        className={`mb-4 ${
                          message.type === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-purple-500"
                              : "bg-gray-700"
                          }`}
                        >

                          {message.content}
    

                        </div>
                        {message.type === "bot" && (
                          <div className="mt-2" >
                            <button
                              onClick={() => handleFeedback(Number(message.id), "like")}
                              className="mr-2 text-green-400 hover:text-green-300"
                            >
                              <ThumbsUp size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handleFeedback(Number(message.id), "dislike")
                              }
                              className="text-red-400 hover:text-red-300"
                            >
                              <ThumbsDown size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center bg-white/10 rounded-full overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-400">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow bg-transparent border-none text-white placeholder-gray-400 px-6 py-4 text-lg focus:outline-none"
                      placeholder={
                        selectedFeature
                          ? selectedFeature.prompt
                          : "Select a feature to get started..."
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <Send className="w-6 h-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
  {showToast && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 ${
        toastMode === "success" ? "bg-green-500" : toastMode === "error" ? "bg-red-500" : "bg-gray-500"
      } text-white p-4 rounded-lg shadow-lg`}
    >
     
        <p className="text-sm font-medium">
          <>    {toastMessage ? toastMessage : "No message to display"        }
          {console.log(toastMessage,"msg")}
          </>
        </p>
      
    </motion.div>
  )}
</AnimatePresence>


      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>We're sorry the response wasn't helpful</DialogTitle>
            <DialogDescription>
              Here are some suggested questions that might help:
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedFeature &&
              selectedFeature.suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    setShowFeedbackDialog(false);
                    handleSendMessage();
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-all duration-300"
                >
                  {question}
                </Button>
              ))}
          </div>
          <Button onClick={() => setShowFeedbackDialog(false)} className="mt-4">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
    </ToastProvider>
    
  );
}

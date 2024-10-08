'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Search, BookOpen, PresentationIcon, Send, ArrowRight, ThumbsUp, ThumbsDown, X } from 'lucide-react'
import { Toast } from "@/components/ui/toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import axios from 'axios'

const features = [
  { 
    icon: MessageCircle, 
    label: "Sales Assistant", 
    description: "AI-powered assistant to boost your sales performance",
    color: "from-blue-500 to-cyan-500",
    prompt: "What product are you selling?",
    endpoint: "/api/sales-assistant",
    suggestedQuestions: [
      "How can I improve my sales pitch?",
      "What are effective closing techniques?",
      "How do I handle objections?",
      "Tips for building rapport with clients?"
    ]
  },
  { 
    icon: Search, 
    label: "Market Insights", 
    description: "Real-time market analysis and competitor intelligence",
    color: "from-green-500 to-emerald-500",
    prompt: "What industry and company are you targeting?",
    endpoint: "/api/market-insights",
    suggestedQuestions: [
      "What are the latest market trends?",
      "Who are our main competitors?",
      "What's the market size for our product?",
      "Any recent regulatory changes?"
    ]
  },
  { 
    icon: BookOpen, 
    label: "Product Guide", 
    description: "Comprehensive product information at your fingertips",
    color: "from-yellow-500 to-orange-500",
    prompt: "Which product line are you interested in?",
    endpoint: "/api/product-guide",
    suggestedQuestions: [
      "What are our product's key features?",
      "How does our product compare to competitors?",
      "What's our pricing strategy?",
      "Any upcoming product releases?"
    ]
  },
  { 
    icon: PresentationIcon, 
    label: "Pitch Creator", 
    description: "Create compelling, data-driven presentations quickly",
    color: "from-pink-500 to-rose-500",
    prompt: "What type of presentation do you need?",
    endpoint: "/api/pitch-creator",
    suggestedQuestions: [
      "How do I structure an effective pitch?",
      "What key metrics should I include?",
      "How to create engaging slides?",
      "Tips for delivering a memorable presentation?"
    ]
  }
]

export function K2kConnectFinal() {
  const [showChat, setShowChat] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [chatHistory, setChatHistory] = useState([])
  const [input, setInput] = useState('')
  const [allHistory, setAllHistory] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [currentFeedbackMessageId, setCurrentFeedbackMessageId] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature)
    setChatHistory(allHistory[feature.label] || [{ type: 'bot', content: feature.prompt }])
  }

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { type: 'user', content: input, timestamp: new Date().toISOString() }
      setChatHistory(prev => [...prev, userMessage])
      setAllHistory(prev => ({
        ...prev,
        [selectedFeature.label]: [...(prev[selectedFeature.label] || []), userMessage]
      }))

      try {
        let payload = { input: input }
        if (selectedFeature.label === "Market Insights") {
          const [url, companyName, industry] = input.split(',').map(item => item.trim())
          payload = { url, company_name: companyName, industry }
        } else if (selectedFeature.label === "Pitch Creator") {
          payload = {
            theme: input,
            history: Object.values(allHistory).flat()
          }
        }

        const response = await axios.post(selectedFeature.endpoint, payload)
        const botMessage = { 
          type: 'bot', 
          content: response.data.output, 
          timestamp: new Date().toISOString(),
          id: Date.now()
        }
        setChatHistory(prev => [...prev, botMessage])
        setAllHistory(prev => ({
          ...prev,
          [selectedFeature.label]: [...(prev[selectedFeature.label] || []), botMessage]
        }))
      } catch (error) {
        console.error("Error calling API:", error)
        const errorMessage = { 
          type: 'bot', 
          content: "Sorry, there was an error processing your request.", 
          timestamp: new Date().toISOString(),
          id: Date.now()
        }
        setChatHistory(prev => [...prev, errorMessage])
        setAllHistory(prev => ({
          ...prev,
          [selectedFeature.label]: [...(prev[selectedFeature.label] || []), errorMessage]
        }))
      }

      setInput('')
    }
  }

  const handleFeedback = async (messageId, feedback) => {
    const message = chatHistory.find(msg => msg.id === messageId)
    if (message) {
      try {
        await axios.post('/api/feedback', {
          user_question: chatHistory[chatHistory.indexOf(message) - 1].content,
          bot_answer: message.content,
          timestamp: message.timestamp,
          feedback: feedback
        })
        setToastMessage(`Feedback ${feedback === 'like' ? 'positive' : 'negative'} submitted successfully`)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)

        if (feedback === 'dislike') {
          setCurrentFeedbackMessageId(messageId)
          setShowFeedbackDialog(true)
        }
      } catch (error) {
        console.error("Error saving feedback:", error)
        setToastMessage("Error submitting feedback")
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
      }
    }
  }

  return (
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
              <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Welcome to K2K Connect</h1>
              <p className="text-xl mb-12 text-gray-300">Empower your sales team with AI-driven insights and tools</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white/10 p-6 rounded-xl backdrop-blur-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 mx-auto`}>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {features.map((feature, index) => (
                      <Button
                        key={index}
                        onClick={() => handleFeatureSelect(feature)}
                        className={`h-20 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                          selectedFeature === feature ? `bg-gradient-to-r ${feature.color}` : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        <feature.icon className="w-6 h-6 mb-2" />
                        <span className="text-xs text-center">{feature.label}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="h-64 overflow-y-auto mb-6 bg-white/5 rounded-xl p-4">
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg ${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-700'}`}>
                          {message.content}
                        </div>
                        {message.type === 'bot' && message.id && (
                          <div className="mt-2">
                            <button onClick={() => handleFeedback(message.id, 'like')} className="mr-2 text-green-400 hover:text-green-300">
                              <ThumbsUp size={16} />
                            </button>
                            <button onClick={() => handleFeedback(message.id, 'dislike')} className="text-red-400 hover:text-red-300">
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
                      placeholder={selectedFeature ? selectedFeature.prompt : "Select a feature to get started..."} 
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-3 rounded-full transition-all duration-300 hover:scale-110">
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
            className="fixed bottom-4 right-4"
          >
            <Toast>
              <p className="text-sm font-medium text-gray-900">{toastMessage}</p>
            </Toast>
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
            {selectedFeature && selectedFeature.suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                onClick={() => {
                  setInput(question)
                  setShowFeedbackDialog(false)
                  handleSendMessage()
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
  )
}
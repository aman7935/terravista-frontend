"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  X,
  Send,
  MessageCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"
import { convertPipeTablesToMarkdown } from "@/lib/table-parser"
import { streamChatMessage, sendChatMessage, getSuggestedPrompts } from "@/lib/api"
import type { Message } from "@/types"

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-violet-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your **TerraVista AI** assistant. Ask me about properties, market trends, or anything real estate.",
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const prompts = getSuggestedPrompts()
  const lastContentRef = useRef("")

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role === "assistant" && last.content !== lastContentRef.current) {
      lastContentRef.current = last.content
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const abortRef = useRef<AbortController | null>(null)

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    }
    const aiId = `m-${Date.now()}-ai`
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const stream = streamChatMessage(messages, text, controller.signal)
      let full = ""

      setMessages((prev) => [
        ...prev,
        { id: aiId, role: "assistant", content: "", timestamp: Date.now() },
      ])

      for await (const token of stream) {
        let processed = token
        if (token.startsWith("•") || token.startsWith("- ") || token.startsWith("* ")) {
          processed = "\n  " + token
        } else if (/^\.[A-Z]/.test(token)) {
          processed = "\n  " + token
        }
        full += processed
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, content: full } : m)),
        )
        await new Promise((r) => setTimeout(r, 25))
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        try {
          const response = await sendChatMessage(messages, text)
          const cleaned = response.replace(/^([•\-*]|\d+\.)/gm, "\n  $1")
          setMessages((prev) => [
            ...prev,
            { id: aiId, role: "assistant", content: cleaned, timestamp: Date.now() },
          ])
        } catch (fallbackErr) {
          const detail = fallbackErr instanceof Error ? fallbackErr.message : "Unknown error"
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiId
                ? { ...m, content: `Sorry, I couldn't process that request. (${detail})` }
                : m,
            ),
          )
        }
      }
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-4 sm:left-auto z-50 sm:w-[420px] sm:h-[600px] flex flex-col overflow-hidden bg-[#0e0e1a]/98 backdrop-blur-2xl sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl sm:shadow-violet-500/10"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <Avatar fallback="AI" className="h-9 w-9 bg-gradient-to-br from-violet-500 to-indigo-600" />
                <div>
                  <p className="text-sm font-semibold text-white">TerraVista AI</p>
                  <p className="text-[11px] text-violet-400">Online • Real Estate Assistant</p>
                </div>
              </div>
              <div className="h-8 w-8 sm:block hidden" />
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin overscroll-contain"
            >
              {messages.map((msg, i) => {
                const isStreaming = msg.role === "assistant" && msg.content === "" && isLoading && i === messages.length - 1
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {msg.role === "assistant" && (
                      <Avatar
                        fallback="AI"
                        className="h-8 w-8 shrink-0 bg-gradient-to-br from-violet-500 to-indigo-600"
                      />
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed break-words ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-md"
                          : "bg-white/5 border border-white/10 text-white/90 rounded-tl-md"
                      }`}
                    >
                      {isStreaming ? (
                        <TypingDots />
                      ) : msg.role === "assistant" ? (
                        <div className="text-[13px] sm:text-sm">
                          <ReactMarkdown
                            components={{
                              a: ({ href, children }) => (
                                <a href={href} className="text-violet-400 underline underline-offset-2 hover:text-violet-300" target="_blank" rel="noreferrer">{children}</a>
                              ),
                              table: ({ children }) => (
                                <div className="overflow-x-auto my-3 -mx-1">
                                  <table className="min-w-full text-[11px] sm:text-xs border border-white/10 rounded-lg overflow-hidden">
                                    {children}
                                  </table>
                                </div>
                              ),
                              thead: ({ children }) => (
                                <thead className="bg-violet-500/20">{children}</thead>
                              ),
                              th: ({ children }) => (
                                <th className="px-2 py-1.5 text-left text-violet-300 font-medium whitespace-nowrap">{children}</th>
                              ),
                              td: ({ children }) => (
                                <td className="px-2 py-1.5 border-t border-white/10 whitespace-nowrap">{children}</td>
                              ),
                              tr: ({ children }) => (
                                <tr className="even:bg-white/5">{children}</tr>
                              ),
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-white/80">{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong className="text-white font-semibold">{children}</strong>
                              ),
                              em: ({ children }) => (
                                <em className="text-white/70">{children}</em>
                              ),
                            }}
                          >
                            {convertPipeTablesToMarkdown(msg.content)}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="break-words">{msg.content}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-white/10 p-3 space-y-2 shrink-0 bg-[#0a0a14]">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {prompts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setInput(p.text)}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1.5 text-[11px] text-violet-300 hover:bg-violet-500/20 whitespace-nowrap transition-colors"
                  >
                    <Sparkles className="h-3 w-3" />
                    {p.text.length > 25 ? p.text.slice(0, 25) + "..." : p.text}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any property..."
                  className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-colors"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-11 w-11 shrink-0 hover:bg-white/10 sm:hidden flex"
                >
                  <X className="h-4 w-4 text-white/60" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-11 w-11 shrink-0 bg-violet-600 hover:bg-violet-500 sm:bg-violet-600 sm:hover:bg-violet-500"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </>
  )
}
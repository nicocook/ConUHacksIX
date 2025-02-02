// ai_doctor.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { data } from "@/hospital_data";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const git = "";
const USER_ORIGIN = "Concordia University, Montreal, QC";
const OPENAI_API_KEY=""

async function getTravelTime(
  origin: string,
  destination: string
): Promise<number> {
  const GOOGLE_API_KEY = "";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(
    destination
  )}&mode=driving&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (
      data.rows &&
      data.rows[0] &&
      data.rows[0].elements &&
      data.rows[0].elements[0] &&
      data.rows[0].elements[0].status === "OK"
    ) {
      return data.rows[0].elements[0].duration.value;
    } else {
      console.warn("No valid travel data for destination:", destination);
      return Infinity;
    }
  } catch (e) {
    console.error("Error fetching travel time: ", e);
    return Infinity;
  }
}

export default function ChatScreen(): JSX.Element {
  const [conversationHistory, setConversationHistory] = useState<
    { role: string; content: string }[]
  >([
    {
      role: "system",
      content:
        "You are a triage health assistant that helps users understand their symptoms and decide whether to seek medical care. Ask clarifying questions to gather more details. When hospital availability data is provided, please incorporate it into your responses. Assume the user is located at Concordia University in Montreal.",
    },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchHospitalAvailability(): Promise<string> {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        return "No hospital data available.";
      }

      // helper to convert a time string to seconds
      const convertTimeToSeconds = (timeStr: string): number => {
        const parts = timeStr.split(":").map(Number);
        if (parts.length === 2) {
          return parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
          return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return 0;
      };

      const montrealHospitals = data.filter((hospital: any) =>
        hospital.details.address.toLowerCase().includes("montreal")
      );
      const hospitalsToConsider =
        montrealHospitals.length > 0 ? montrealHospitals : data;

      const hospitalsWithScores = await Promise.all(
        hospitalsToConsider.map(async (hospital: any) => {
          const travelTime = await getTravelTime(
            USER_ORIGIN,
            hospital.details.address
          );
          const waitingTime = convertTimeToSeconds(
            hospital.details.estimated_waiting_time
          );
          const compositeScore = waitingTime + 2 * travelTime;
          return { hospital, travelTime, waitingTime, compositeScore };
        })
      );

      hospitalsWithScores.sort((a, b) => a.compositeScore - b.compositeScore);

      const topOptions = hospitalsWithScores.slice(0, 3);

      let responseText = `Based on your location at Concordia University in Montreal, here are the top hospital options:\n`;
      topOptions.forEach((option, index) => {
        const travelTimeMinutes = Math.round(option.travelTime / 60);
        const waitingTimeMinutes = Math.round(option.waitingTime / 60);
        responseText +=
          `\n${index + 1}. ${option.hospital.name} at ${
            option.hospital.details.address
          }\n` +
          `   Driving time (one way): ~${travelTimeMinutes} minutes, round trip: ~${Math.round(
            2 * travelTimeMinutes
          )} minutes\n` +
          `   Estimated waiting time: ~${waitingTimeMinutes} hours\n` +
          `   Composite score: ${option.compositeScore} seconds\n`;
      });
      return responseText;
    } catch (error) {
      console.error("Error processing hospital data:", error);
      return "Hospital data is currently unavailable.";
    }
  }

  async function callAI(
    messagesForAPI: { role: string; content: string }[]
  ): Promise<string | null> {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: messagesForAPI,
          }),
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorData = await response.text();
        console.error("Error details:", errorData);
        return null;
      }

      const data = await response.json();
      const aiMessage =
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content;
      return aiMessage;
    } catch (error) {
      console.error("Error calling the API:", error);
      return null;
    }
  }

  const handleSend = async (): Promise<void> => {
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const userMessage = { role: "user", content: trimmedInput };
    const newUserMsg: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setConversationHistory((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const lowerInput = trimmedInput.toLowerCase();
    let hospitalContext: { role: string; content: string }[] = [];
    if (
      lowerInput.includes("hospital") ||
      lowerInput.includes("bed") ||
      lowerInput.includes("availability") ||
      lowerInput.includes("emergency")
    ) {
      const dataStr = await fetchHospitalAvailability();
      hospitalContext = [
        {
          role: "system",
          content: `Additional context: Hospital availability data:\n${dataStr}`,
        },
      ];
      setConversationHistory((prev) => [...prev, ...hospitalContext]);
    }

    const conversationForAPI = [
      ...conversationHistory,
      ...hospitalContext,
      userMessage,
    ];

    const aiResponse = await callAI(conversationForAPI);
    setLoading(false);
    if (aiResponse) {
      const assistantMessage = { role: "assistant", content: aiResponse };
      const newAssistantMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiResponse,
      };

      setConversationHistory((prev) => [...prev, assistantMessage]);
      setMessages((prev) => [...prev, newAssistantMsg]);
    } else {
      const errorMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <View className="h-screen-safe-offset-4">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message: ChatMessage) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === "assistant"
                  ? styles.assistantBubble
                  : styles.userBubble,
              ]}
            >
              <Text style={styles.messageText}>{message.content}</Text>
            </View>
          ))}
          {loading && <ActivityIndicator size="small" color="#007bff" />}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#e9ecef",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

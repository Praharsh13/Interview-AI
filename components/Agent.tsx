"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/interview";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID! ?? '2bbd44dc-4af7-49d0-bc53-c904c4234a38',
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view grid max-w-6xl mx-auto gap-6 p-4 md:grid-cols-2">
  {/* AI Interviewer Card */}
  <div className="card-interviewer flex items-center gap-4 rounded-2xl border border-black/5 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
    <div className="avatar relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full ring-2 ring-emerald-400/40 shadow-md bg-gradient-to-br from-sky-400/20 to-emerald-400/20">
      <Image
        src="/chat.svg"
        alt="profile-image"
        width={65}
        height={54}
        className="object-contain drop-shadow"
      />
      {isSpeaking && <span className="animate-speak absolute inset-0 rounded-full" />}
    </div>
    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
      AI Interviewer
    </h3>
  </div>

  {/* User Profile Card */}
  <div className="card-border rounded-2xl border border-black/5 bg-white/70 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5">
    <div className="card-content flex items-center gap-4">
      <Image
        src="/hi.png"
        alt="profile-image"
        width={539}
        height={539}
        className="rounded-full object-cover size-[96px] ring-1 ring-white/30 shadow-md"
      />
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {userName}
      </h3>
    </div>
  </div>
</div>

{messages.length > 0 && (
  <div className="transcript-border mx-auto mt-4 w-full max-w-6xl rounded-2xl border border-black/5 bg-white/70 p-0.5 backdrop-blur dark:border-white/10 dark:bg-white/5">
    <div className="transcript h-36 overflow-y-auto rounded-[1rem] bg-gradient-to-b from-white/80 to-white/60 p-4 text-sm text-gray-800 dark:from-white/[0.06] dark:to-white/[0.03] dark:text-gray-200">
      <p
        key={lastMessage}
        className={cn(
          "transition-opacity duration-500 opacity-0",
          "animate-fadeIn opacity-100"
        )}
      >
        {lastMessage}
      </p>
    </div>
  </div>
)}

<div className="w-full flex justify-center mt-6">
  {callStatus !== "ACTIVE" ? (
    <button
      className="relative btn-call inline-flex h-14 items-center justify-center rounded-2xl px-10 text-sm font-semibold text-white shadow-xl transition active:scale-[0.98] bg-gradient-to-r from-emerald-500 to-sky-500 hover:brightness-105"
      onClick={() => handleCall()}
    >
      <span
        className={cn(
          "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-emerald-400/30 opacity-75",
          callStatus !== "CONNECTING" && "hidden"
        )}
      />
      <span className="relative">
        {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}
      </span>
    </button>
  ) : (
    <button
      className="btn-disconnect inline-flex h-14 items-center justify-center rounded-2xl bg-rose-600 px-8 text-sm font-semibold text-white shadow-xl transition hover:bg-rose-500 active:scale-[0.98]"
      onClick={() => handleDisconnect()}
    >
      End
    </button>
  )}
</div>

    </>
  );
};

export default Agent;


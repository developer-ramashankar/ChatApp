"use client"

import ConversationFallback from "@/components/shared/conversation/ConversationFallback"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Error({error}:{error:Error}) {
    const router =useRouter()
    useEffect(()=>{
        router.push("/converstions")
    },[error,router])
    return <ConversationFallback/>
}
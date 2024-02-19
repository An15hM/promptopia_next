"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Form from "@components/Form"

const EditPrompt = () => {
  const searchParams = useSearchParams()
  const promptId = searchParams.get("id")
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  useEffect(() => {
    const getpromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()

      setPost({ prompt: data.prompt, tag: data.tag })
    }

    if (promptId) getpromptDetails()
  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault()

    setSubmitting(true)

    if (!promptId) return alert("Propmt ID not found")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  )
}

export default EditPrompt

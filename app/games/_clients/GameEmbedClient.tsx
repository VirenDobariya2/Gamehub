"use client"
import dynamic from "next/dynamic"

export default function GameEmbedClient({ embedWrapper }) {
  const GameIframe = dynamic(() => import(`../_embed/${embedWrapper}`), {
    ssr: false,
    loading: () => <p className="p-8 text-white">Loading…</p>,
  })

  return <GameIframe />
}

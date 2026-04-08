import { generateRAGResponse } from "@/lib/rag-service"

async function main() {
  const question = "ร้านตั้งอยู่ที่ไหน?"
  const response = await generateRAGResponse(question, [])
  console.log("Answer:", response.answer)
  console.log("Sources:", response.sources.map(s => s.metadata?.source))
}

main().catch(console.error)
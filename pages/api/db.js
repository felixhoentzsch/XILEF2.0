// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mongodb from "@/utils/mongodb"

export default function handler(req, res) {
  mongodb.dbConnect();
  mongodb.dbDisconnect()
  res.status(200).json({ name: 'John Doe' })
}

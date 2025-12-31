// pages/api/send.js
import dbConnect from '../../lib/connect'; // Adjust path if needed
import User from '../../models/user'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method== 'GET') return (await get(req, res))
  
  if (req.method == 'POST') return (await remove(req, res))
  
}

const get = async (req, res) => {
  try {
    await dbConnect();

    // In Pages Router, data is in req.body (already parsed)
    //console.log(await User.find({}))
    return res.json(await User.find({}))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
} 

const remove = async (req, res) => {
  const { _id } = req.body

  try {
    await dbConnect();

    await User.findOneAndDelete({ _id })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true })
}
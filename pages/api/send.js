// pages/api/send.js
import dbConnect from '../../lib/connect'; // Adjust path if needed
import Message from '../../models/message';
import User from '../../models/user'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // In Pages Router, data is in req.body (already parsed)
    console.log(req.body)
    const { name, phone, email, business, content } = req.body;

    // Log to verify data is arriving
    console.log('ping from ' + name)

    // verify user doesn't exist
    let found = await User.find({ name, phone })


    if (found) return res.status(200).json({ success: 'user already exists' })

    user = new User({ name, email, phone })
    await user.save()

    console.log('saved ' + user)
    return res.status(200).json({ success: 'recieved data' })
  } catch (e) {
    console.log('Error: ' + e.message)
    return res.status(500).json({ error: e.message })
  }

  
}
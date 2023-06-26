// import { IUser } from '../../models/User';
// import { NextApiRequest, NextApiResponse } from 'next'
// import dbConnect from '../../lib/dbConnect'
// import Otp, { IOtp } from '../../models/Otp'
// import { transporter } from '../../utils/emailTransport'
// import mjml2html from 'mjml'
// import User from '../../models/User'

// async function sendOtp(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         await dbConnect()

//         const { email} = req.body

//         //generate random 6 digit code

//         const user: IUser | null = await User.findOne({ email })

//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found'
//             })
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000)

//        const username =  user.username

//         const htmlOutput = mjml2html(
//             `
//   <mjml>
//   <mj-body>
//     <mj-section background-color='#E8E7E7' border-radius='1rem' font-family='Lato'>
//       <mj-column>

//         <mj-image width="70px" src="https://i.ibb.co/LJ2sGDH/logo.png"></mj-image>

//         <mj-divider border-color="#112ea3" border-width='1px'></mj-divider>

//         <mj-text font-size='20px' align='center'>Hello, ${username}</mj-text>

//         <mj-text font-size='15px' align='center'>Below is your Verification Code</mj-text>

//         <mj-button font-size='20px' color='black' background-color='white' padding-top='30px'>${otp}</mj-button>

//       </mj-column>
//     </mj-section>
//   </mj-body>
// </mjml>
// `,
//             {}
//         )

//         const mail = {
//             from: 'admin@1960Token.com',
//             to: email,
//             subject: `1960Token - Account Verification`,
//             html: `${htmlOutput.html}`,
//         }

//         transporter
//             .verify()
//             .then((data) => {
//                 console.log('verified email credentials', data)
//             })
//             .catch((err) =>
//                 res.json({
//                     status: 'fail',
//                 })
//             )

//         transporter.sendMail(mail, async (err, _) => {
//             if (err) {
//                 console.log({ err })
//                 res.json({
//                     message: 'Error sending email',
//                     status: 'fail',
//                 })
//             } else {
//                 const pendingOtp = new Otp<IOtp>({
//                     code: otp,
//                     status: 'pending',
//                     creatorEmail: email,
//                 })

//                 await pendingOtp.save()

//                 res.json({
//                     message: 'OTP sent',
//                     status: 'success',
//                 })
//             }
//         })
//     } catch (err) {
//         console.log({ err })
//         res.json({
//             status: 'fail',
//         })
//     }
// }

// export default sendOtp

export default function () {
  return 'hello';
}

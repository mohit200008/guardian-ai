export const DEMO_SCAMS = [
  {
    id: 'banking',
    title: 'Fake Banking Alert',
    category: 'Financial',
    icon: 'building',
    content: `HDFC BANK ALERT: Suspicious transaction of Rs.48,999 detected on your account ending 4821. If NOT you, verify immediately: https://hdfc-secure-kyc-verify.net/stop

FAILURE TO VERIFY WITHIN 30 MINUTES WILL RESULT IN PERMANENT ACCOUNT FREEZE AND LEGAL ACTION.`,
  },
  {
    id: 'delivery',
    title: 'Delivery Fee Scam',
    category: 'Delivery',
    icon: 'package',
    content: `Amazon Delivery Failed: Your package could not be delivered. Pay Rs.49 re-delivery fee within 1 hour to avoid return.

Pay now: http://amazon-redelivery-fee.in/pay

Reply STOP to cancel (do not reply - account will be charged)`,
  },
  {
    id: 'kyc',
    title: 'Fake KYC Verification',
    category: 'Identity',
    icon: 'id',
    content: `GOVT KYC NOTICE: Your PAN-Aadhaar link will EXPIRE today. Immediate verification required to prevent SIM and bank blocking.

Official portal: https://uidai-kyc-update.xyz/verify

This is mandatory. Ignore previous messages if already done.`,
  },
  {
    id: 'paypal',
    title: 'PayPal Phishing',
    category: 'Financial',
    icon: 'wallet',
    content: `URGENT SECURITY ALERT: Your PayPal account has been temporarily limited due to suspicious activity. You must verify your identity within 2 hours or your funds will be frozen permanently.

Click here immediately: http://paypa1-secure-verify.xyz/account/login`,
  },
];

export const LANDING_STATS = [
  { value: '3.4B+', label: 'Phishing emails yearly' },
  { value: '78%', label: 'Scams use urgency tactics' },
  { value: '<3 sec', label: 'Avg. decision time victims take' },
  { value: 'AI', label: 'Powered explainable analysis' },
];

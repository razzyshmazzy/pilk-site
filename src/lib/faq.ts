/** FAQ content, shared by the on-page FAQ and FAQ structured data (JSON-LD). */

export interface FaqItem {
  q: string;
  a: string;
}

export const faqItems: FaqItem[] = [
  {
    q: "What is Pilk?",
    a: "Pilk is a faster way for groups to split a restaurant check. Everyone at the table pays their own share while one person — the Captain — handles the actual bill with the restaurant.",
  },
  {
    q: "How does Pilk work?",
    a: "One person starts a Pilk room and shows a QR code. Everyone scans in, confirms what they owe, and authorizes their own payment. The Captain pays the restaurant, and Pilk gets everyone else's part back to the Captain.",
  },
  {
    q: "Does the restaurant need Pilk?",
    a: "No. Pilk is designed to work around the restaurant's existing checkout. The Captain pays the check the normal way — the restaurant doesn't have to install or learn anything.",
  },
  {
    q: "Do all my friends need the app?",
    a: "Our goal is to keep joining a table as frictionless as possible — scan the code and go, without a lot of setup. We'll share the exact details for diners as we get closer to launch.",
  },
  {
    q: "When is Pilk launching?",
    a: "We're still building. We haven't set a public launch date yet — join the waitlist and you'll be among the first to hear when early access opens.",
  },
  {
    q: "Where will Pilk be available?",
    a: "We're starting in the United States. We'll expand from there and will keep waitlist members posted on where Pilk is available.",
  },
  {
    q: "How much will Pilk cost?",
    a: "We're still finalizing pricing ahead of launch. Waitlist members will hear about pricing and early access before Pilk becomes broadly available.",
  },
  {
    q: "Is Pilk a bank?",
    a: "No. Pilk is not a bank and is not a financial institution. Pilk is building software to make group payments easier and expects to work with third-party payment providers to move money.",
  },
  {
    q: "How does Pilk keep payments secure?",
    a: "Security is central to how we're building Pilk. We plan to work with established payment providers and follow standard industry practices for handling sensitive information. No online service can promise perfect security, and we'll always be straightforward about how your information is handled.",
  },
];

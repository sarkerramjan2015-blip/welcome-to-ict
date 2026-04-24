export const questions = {
  knowledgeQuestions: [
    { q: "HTML ফর্ম কী? [চট্টগ্রাম বোর্ড ২০২৩]", a: "HTML ফর্ম হলো একটি ওয়েবপেইজের অংশ যা ব্যবহারকারীর কাছ থেকে তথ্য সংগ্রহ করে সার্ভারে পাঠায়। যেমন: লগইন, রেজিস্ট্রেশন ফর্ম। <form> ট্যাগ দিয়ে ফর্ম তৈরি হয়।", type: "জ্ঞানমূলক" as const },
    { q: "radio ও checkbox input এর মধ্যে পার্থক্য কী?", a: "radio: একটির মধ্যে একটি বেছে নেওয়া যায় — একাধিক নির্বাচন করা যায় না।\ncheckbox: একাধিক অপশন একসাথে বেছে নেওয়া যায়।", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "একটি সাধারণ লগইন ফর্মের HTML কোড লেখ। [চট্টগ্রাম বোর্ড ২০২৪]", a: "HTML কোড:\n<form action='login.php' method='post'>\n  <label>নাম:</label>\n  <input type='text' name='username'><br>\n  <label>পাসওয়ার্ড:</label>\n  <input type='password' name='password'><br>\n  <input type='submit' value='লগইন'>\n  <input type='reset' value='রিসেট'>\n</form>", type: "অনুধাবনমূলক" as const },
    { q: "ওয়েবসাইটে ভিজিটরদের মতামত নেওয়ার জন্য ফর্ম কেন দরকার? [চট্টগ্রাম বোর্ড ২০২৪]", a: "স্ট্যাটিক ওয়েবসাইটে ব্যবহারকারীর সাথে কোনো ইন্টারঅ্যাকশন সম্ভব নয়। HTML ফর্ম ব্যবহার করে ভিজিটরদের নাম, ইমেইল, মতামত সংগ্রহ করা যায়। এটি ওয়েবসাইটকে ডাইনামিক ও ইন্টারঅ্যাক্টিভ করে।", type: "অনুধাবনমূলক" as const },
  ]
};

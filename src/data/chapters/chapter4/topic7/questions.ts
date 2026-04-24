export const questions = {
  knowledgeQuestions: [
    { q: "ওয়েবপেজে ছবি যোগ করার সিনট্যাক্স কী?", a: "ওয়েবপেজে ছবি যোগ করার সিনট্যাক্স:\n<img src='image_location' alt='description' width='200' height='300'>\n• src: ছবির লোকেশন\n• alt: ছবি না দেখালে বিকল্প টেক্সট\n• width ও height: পিক্সেলে আকার", type: "জ্ঞানমূলক" as const },
    { q: "HTML টেবিলের ট্যাগগুলো কী কী?", a: "HTML টেবিলের প্রধান ট্যাগ:\n• <table> — মূল টেবিল ট্যাগ\n• <tr> — Table Row (সারি)\n• <td> — Table Data (ডেটা সেল)\n• <th> — Table Header (হেডার সেল, বোল্ড হয়)\n• border — টেবিলের বর্ডার অ্যাট্রিবিউট", type: "জ্ঞানমূলক" as const },
  ],
  analyticalQuestions: [
    { q: "F ড্রাইভের picture ফোল্ডারে logo.jpg ছবি ওয়েবপেজে যোগ করার HTML কোড লেখ।", a: "HTML কোড:\n<img src='F:/picture/logo.jpg' alt='Logo Image'>\nবা নির্দিষ্ট আকারে:\n<img src='F:/picture/logo.jpg' alt='Logo' width='200' height='200'>", type: "অনুধাবনমূলক" as const },
    { q: "ছবির ফরম্যাটসমূহ তুলনা কর।", a: "JPG: ফটোগ্রাফের জন্য, ফাইল ছোট\nPNG: লোগো/আইকনের জন্য, স্বচ্ছ ব্যাকগ্রাউন্ড\nGIF: অ্যানিমেশনের জন্য, ২৫৬ রং\nSVG: ভেক্টর গ্রাফিক্স, যেকোনো আকারে স্পষ্ট", type: "অনুধাবনমূলক" as const },
  ]
};

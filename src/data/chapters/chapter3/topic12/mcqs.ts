import { PracticeMCQ } from "../../../ict-syllabus";

export const practiceMCQs: PracticeMCQ[] = [
  {
    q: "F = XY + X'Y + X এর সরলীকৃত মান কত? [সিলেট বোর্ড ২০২৩]",
    options: ["XY", "X", "X (Y + 1)", "X + Y"],
    correct: "X + Y",
    explanation: "F = Y(X + X') + X = Y.1 + X = Y + X = X + Y।"
  },
  {
    q: "Y = ABC + C + BC এর সরলীকৃত মান কত? [কুমিল্লা বোর্ড ২০২৪]",
    options: ["A", "C", "B", "AB"],
    correct: "C",
    explanation: "Y = ABC + C + BC = C(AB + 1 + B) = C(1) = C। কারণ 1 এর সাথে যেকোনো কিছু যোগ করলে 1 হয়।"
  },
  {
    q: "f(A,B) = A'B + AB' + AB ফাংশনটির সরলীকৃত মান কোনটি? [দিনাজপুর বোর্ড ২০২৩]",
    options: ["A + B", "A' + B", "A + B'", "A.B"],
    correct: "A + B",
    explanation: "f = A'B + A(B' + B) = A'B + A.1 = A'B + A = A + B।"
  },
  {
    q: "Y = A(A' + B) এর সরল মান কোনটি? [বরিশাল বোর্ড ২০১৯]",
    options: ["AB", "A + B", "A'B", "A"],
    correct: "AB",
    explanation: "Y = A.A' + A.B = 0 + AB = AB।"
  },
  {
    q: "F = x'yz + x'yz' + xy'z + xyz সমীকরণটির সরলীকৃত মান কোনটি? [সিলেট বোর্ড ২০১৯]",
    options: ["x' + yz", "x'y + xz", "y + xz", "x'y + z"],
    correct: "x'y + xz",
    explanation: "F = x'y(z + z') + xz(y' + y) = x'y(1) + xz(1) = x'y + xz।"
  },
  {
    q: "লজিক ফাংশন সরলীকরণের মূল উদ্দেশ্য কী? [ঢাকা বোর্ড ২০২১]",
    options: ["লজিক গেইট বৃদ্ধি করা", "খরচ বৃদ্ধি করা", "লজিক গেইটের সংখ্যা কমানো", "বুলিয়ান উপপাদ্য প্রমাণ করা"],
    correct: "লজিক গেইটের সংখ্যা কমানো",
    explanation: "সরলীকরণের ফলে গেইটের সংখ্যা কমে, যা খরচ এবং সার্কিটের আকার কমায় এবং গতি বাড়ায়।"
  },
  {
    q: "(A+B)(A+C) এর সরল মান কোনটি? [রাজশাহী বোর্ড ২০২০]",
    options: ["A+BC", "AB+C", "AC+B", "ABC"],
    correct: "A+BC",
    explanation: "বুলিয়ান বিভাজন উপপাদ্য: (A+B)(A+C) = A + BC।"
  },
  {
    q: "Y = A'B'C + A'BC + ABC' + ABC ফাংশনটির সরল রূপ কোনটি? [কুমিল্লা বোর্ড ২০২১]",
    options: ["A'C + AB", "BC + AC", "A'C + AB + BC", "A'C + A"],
    correct: "A'C + AB",
    explanation: "Y = A'C(B' + B) + AB(C' + C) = A'C.1 + AB.1 = A'C + AB।"
  },
  {
    q: "A + AB এর সরল মান কত? [চট্টগ্রাম বোর্ড ২০১৯]",
    options: ["A", "B", "AB", "A+B"],
    correct: "A",
    explanation: "A + AB = A(1 + B) = A.1 = A (Absorption Law)।"
  },
  {
    q: "(x+y)(x+y') এর সরল মান কত?",
    options: ["x", "y", "xy", "x+y"],
    correct: "x",
    explanation: "(x+y)(x+y') = x.x + xy' + yx + y.y' = x + x(y'+y) + 0 = x+x = x।"
  },
  {
    q: "বুলিয়ান অ্যালজেবরায় ডি-মরগানের উপপাদ্য কোনটি? [যশোর বোর্ড ২০২০]",
    options: ["(A+B)' = A'.B'", "(A+B)' = A+B", "(A.B)' = A.B", "A' = A"],
    correct: "(A+B)' = A'.B'",
    explanation: "ডি-মরগানের প্রথম উপপাদ্য: (A+B)' = A'.B'। দ্বিতীয় উপপাদ্য: (A.B)' = A'+B'।"
  },
  {
    q: "(A.B)' এর সমতুল্য মান কোনটি? [দিনাজপুর বোর্ড ২০২১]",
    options: ["A'.B'", "A'+B'", "A.B", "A+B"],
    correct: "A'+B'",
    explanation: "ডি-মরগানের দ্বিতীয় উপপাদ্য: (A.B)' = A'+B'।"
  },
  {
    q: "A + 1 = ? [বরিশাল বোর্ড ২০২০]",
    options: ["A", "1", "0", "A+1"],
    correct: "1",
    explanation: "বুলিয়ান অ্যালজেবরায় A + 1 = 1। যেকোনো কিছুর সাথে 1 যোগ করলে সর্বদা 1 হয়।"
  },
  {
    q: "A . 0 = ? [সিলেট বোর্ড ২০২২]",
    options: ["A", "1", "0", "A.0"],
    correct: "0",
    explanation: "বুলিয়ান অ্যালজেবরায় A . 0 = 0। যেকোনো কিছুর সাথে 0 গুণ করলে সর্বদা 0 হয়।"
  },
  {
    q: "F = AB + A'B এর সরল মান কোনটি?",
    options: ["A", "B", "A+B", "AB"],
    correct: "B",
    explanation: "F = AB + A'B = B(A + A') = B.1 = B।"
  },
  {
    q: "বুলিয়ান অ্যালজেবরায় A + A' = ?",
    options: ["0", "1", "A", "A'"],
    correct: "1",
    explanation: "বুলিয়ান পরিপূরক উপপাদ্য: A + A' = 1। একটি চলক ও তার পূরকের যোগফল সর্বদা 1।"
  },
  {
    q: "বুলিয়ান অ্যালজেবরায় A . A' = ?",
    options: ["0", "1", "A", "A'"],
    correct: "0",
    explanation: "বুলিয়ান পরিপূরক উপপাদ্য: A . A' = 0। একটি চলক ও তার পূরকের গুণফল সর্বদা 0।"
  },
  {
    q: "সরলীকরণের Absorption Law কোনটি? [ময়মনসিংহ বোর্ড ২০২২]",
    options: ["A + A = A", "A + AB = A", "A + 0 = A", "A(A+B) = A"],
    correct: "A + AB = A",
    explanation: "Absorption Law অনুযায়ী A + AB = A(1+B) = A.1 = A।"
  },
  {
    q: "Y = ((A+B)')' এর সরল মান কোনটি?",
    options: ["A+B", "A.B", "A'B'", "(A+B)'"],
    correct: "A+B",
    explanation: "দ্বৈত পূরক উপপাদ্য: ((A+B)')' = A+B (দুইবার NOT করলে আসল মান ফিরে আসে)।"
  },
  {
    q: "F = A + A এর সরল মান কত?",
    options: ["0", "1", "A", "2A"],
    correct: "A",
    explanation: "বুলিয়ান আইডেমপোটেন্ট উপপাদ্য: A + A = A।"
  },
  {
    q: "বুলিয়ান সরলীকরণে 'Consensus Theorem' কখন প্রযোজ্য?",
    options: ["তিনটি চলক আছে তখন", "দুটি চলক আছে তখন", "সকল ক্ষেত্রেই", "শুধু NAND গেইটে"],
    correct: "তিনটি চলক আছে তখন",
    explanation: "Consensus Theorem: AB + A'C + BC = AB + A'C। তিনটি চলক এবং বিশেষ প্যাটার্নে প্রযোজ্য।"
  },
  {
    q: "F = A.A এর সরল মান কত? [চট্টগ্রাম বোর্ড ২০২১]",
    options: ["0", "1", "A", "A²"],
    correct: "A",
    explanation: "বুলিয়ান আইডেমপোটেন্ট উপপাদ্য: A.A = A।"
  },
  {
    q: "A' এর মান কত যদি A = 0?",
    options: ["0", "1", "A", "-1"],
    correct: "1",
    explanation: "বুলিয়ান পূরক: A=0 হলে A'=1।"
  },
  {
    q: "Y = A'B + AB' + AB এর সরল মান কোনটি? [রাজশাহী বোর্ড ২০২১]",
    options: ["A'", "A+B", "AB", "A'B"],
    correct: "A+B",
    explanation: "Y = A'B + A(B'+B) = A'B + A = A + A'B = (A+A')(A+B) = 1.(A+B) = A+B।"
  },
  {
    q: "F = (A+B)(A+B') এর সরল মান কোনটি?",
    options: ["A", "B", "A+B", "AB"],
    correct: "A",
    explanation: "(A+B)(A+B') = A.A + AB' + AB + BB' = A + A(B'+B) + 0 = A + A.1 = A।"
  }
];

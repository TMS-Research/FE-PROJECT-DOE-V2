"use client"
import React from 'react';
import { Brain, HelpCircle, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    title: 'Computer Processing Capacity',
    description: 'Dalam bidang ilmu komputasi, superkomputer berperan penting dalam memproses data dalam jumlah besar untuk riset seperti pemodelan iklim, genomik, dan kecerdasan buatan.',
    subQuestions: [
      {
        q: '1.1. Sebuah superkomputer dapat melakukan 1,5 × 10¹⁵ kalkulasi per detik. Hitung berapa banyak kalkulasi yang dapat dilakukan superkomputer ini dalam satu hari. Nyatakan jawaban Anda dalam notasi ilmiah (standard form).',
        hints: [
          'Berapa detik dalam satu hari? Bagaimana cara mengalikan dengan jumlah kalkulasi per detik?', // nudge
          'Satu hari memiliki 24 jam × 60 menit × 60 detik = 86.400 detik. Kalikan ini dengan 1,5 × 10¹⁵ kalkulasi per detik.', // outline
          'Jumlah kalkulasi = 1,5 × 10¹⁵ × 86.400 = 1,296 × 10²⁰ atau 1,296 × 10²⁰ kalkulasi per hari.' // full solve
        ]
      },
      {
        q: '1.2. Ekspresikan hasil perhitungan di atas dalam satuan exaflop-hari, di mana 1 exaflop = 1 × 10¹⁸ kalkulasi.',
        hints: [
          'Bagaimana cara mengkonversi kalkulasi dalam notasi ilmiah ke satuan exaflop?', // nudge
          'Bagi jumlah kalkulasi (1,296 × 10²⁰) dengan definisi 1 exaflop (1 × 10¹⁸ kalkulasi).', // outline
          '1,296 × 10²⁰ ÷ (1 × 10¹⁸) = 1,296 × 10² = 129,6 exaflop-hari.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Energy Consumption',
    description: 'Superkomputer membutuhkan daya listrik yang sangat besar untuk beroperasi. Pengelolaan konsumsi energi adalah salah satu tantangan dalam pengoperasian superkomputer.',
    subQuestions: [
      {
        q: '2.1. Jika superkomputer tersebut mengonsumsi 2 megawatt listrik per jam, berapa total energi yang digunakan dalam satu hari? Nyatakan jawaban Anda dalam kilowatt-jam (kWh).',
        hints: [
          'Bagaimana cara mengkonversi dari megawatt ke kilowatt? Berapa jam dalam sehari?', // nudge
          '1 megawatt = 1.000 kilowatt, dan satu hari memiliki 24 jam. Total energi = daya × waktu.', // outline
          '2 megawatt × 24 jam = 2.000 kilowatt × 24 jam = 48.000 kWh' // full solve
        ]
      },
      {
        q: '2.2. Berapa biaya listrik per hari jika tarif listrik adalah Rp1.500 per kWh?',
        hints: [
          'Gunakan hasil perhitungan sebelumnya untuk total energi dalam kWh lalu kalikan dengan tarif.', // nudge
          'Total energi = 48.000 kWh. Kalikan ini dengan tarif Rp1.500 per kWh.', // outline
          'Biaya = 48.000 kWh × Rp1.500 = Rp72.000.000 per hari.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Comparative Performance',
    description: 'Membandingkan kinerja superkomputer dengan komputer biasa membantu kita memahami skala perbedaan kapasitas pemrosesan antar teknologi.',
    subQuestions: [
      {
        q: '3.1. Sebuah komputer biasa hanya mampu melakukan 3 × 10⁹ kalkulasi per detik. Berapa kali lebih cepat superkomputer dibandingkan komputer biasa?',
        hints: [
          'Bandingkan kemampuan kalkulasi per detik dari superkomputer dengan komputer biasa.', // nudge
          'Bagi kemampuan kalkulasi superkomputer (1,5 × 10¹⁵) dengan kemampuan komputer biasa (3 × 10⁹).', // outline
          '1,5 × 10¹⁵ ÷ (3 × 10⁹) = 0,5 × 10⁶ = 5 × 10⁵ kali lebih cepat.' // full solve
        ]
      },
      {
        q: '3.2. Jika komputer biasa digunakan selama satu hari, berapa banyak kalkulasi yang dapat dilakukan?',
        hints: [
          'Mirip dengan pertanyaan 1.1, tapi gunakan nilai kecepatan komputer biasa.', // nudge
          'Satu hari memiliki 86.400 detik. Kalikan ini dengan 3 × 10⁹ kalkulasi per detik.', // outline
          'Jumlah kalkulasi = 3 × 10⁹ × 86.400 = 2,592 × 10¹⁴ kalkulasi per hari.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Application in Research',
    description: 'Superkomputer memungkinkan para peneliti untuk memecahkan masalah kompleks yang membutuhkan kapasitas kalkulasi tinggi.',
    subQuestions: [
      {
        q: '4.1. Sebutkan dua bidang penelitian yang sangat diuntungkan dengan adanya superkomputer.',
        hints: [
          'Pikirkan tentang bidang ilmu yang bekerja dengan data skala besar atau perhitungan kompleks.', // nudge
          'Beberapa contoh termasuk ilmu klimatologi, fisika, biologi komputasional, atau kecerdasan buatan.', // outline
          'Dua contoh utama: (1) Pemodelan iklim - untuk memprediksi perubahan iklim dengan detail tinggi, (2) Genomik - untuk menganalisis dan memetakan urutan DNA kompleks.' // full solve
        ]
      },
      {
        q: '4.2. Jelaskan bagaimana superkomputer membantu di salah satu bidang tersebut.',
        hints: [
          'Pikirkan tentang volume data atau kompleksitas perhitungan yang dibutuhkan dalam bidang tersebut.', // nudge
          'Misalnya dalam pemodelan iklim, superkomputer memungkinkan simulasi atmosfer Bumi dengan resolusi tinggi.', // outline
          'Dalam pemodelan iklim, superkomputer memungkinkan ilmuwan mensimulasikan interaksi kompleks antara atmosfer, lautan, daratan, dan es pada resolusi tinggi selama periode waktu yang panjang. Tanpa kekuatan komputasi ini, prediksi iklim akan sangat tidak akurat dan tidak dapat diandalkan untuk mengambil keputusan penting terkait perubahan iklim.' // full solve
        ]
      },
      {
        q: '4.3. Berikan contoh hasil penelitian yang tidak mungkin dilakukan tanpa superkomputer.',
        hints: [
          'Pikirkan penelitian yang membutuhkan perhitungan ekstrem atau analisis data masif.', // nudge
          'Beberapa contoh: simulasi pembentukan galaksi, pemodelan molekuler untuk pengembangan obat, atau simulasi ledakan nuklir.', // outline
          'Proyek Human Genome - pemetaan lengkap genom manusia membutuhkan analisis miliaran pasangan basa DNA. Tanpa superkomputer, proyek ini akan membutuhkan waktu puluhan tahun, bukan beberapa tahun saja. Contoh lain: simulasi pembentukan alam semesta yang melacak interaksi miliaran partikel sejak Big Bang hingga pembentukan galaksi.' // full solve
        ]
      },
    ],
  },
  {
    title: 'Data Storage and Transfer',
    description: 'Superkomputer tidak hanya menghasilkan kalkulasi tetapi juga data dalam volume yang sangat besar, yang memerlukan strategi penyimpanan dan transfer yang efisien.',
    subQuestions: [
      {
        q: '5.1. Jika setiap kalkulasi menghasilkan data sebesar 2 byte, berapa total data yang dihasilkan superkomputer dalam satu hari? Nyatakan jawaban Anda dalam terabyte (TB).',
        hints: [
          'Gunakan hasil kalkulasi per hari dari pertanyaan 1.1, lalu kalikan dengan 2 byte.', // nudge
          'Total kalkulasi per hari = 1,296 × 10²⁰. Data per kalkulasi = 2 byte. Konversi ke TB: 1 TB = 10¹² byte.', // outline
          '1,296 × 10²⁰ × 2 byte = 2,592 × 10²⁰ byte = 2,592 × 10²⁰ ÷ 10¹² = 2,592 × 10⁸ TB = 259,2 petabyte (PB).' // full solve
        ]
      },
      {
        q: '5.2. Berapa lama waktu yang dibutuhkan untuk mentransfer data tersebut melalui jaringan dengan kecepatan 10 Gbps?',
        hints: [
          'Konversikan ukuran data ke bit (1 byte = 8 bit) dan kecepatan transfer ke bit per detik.', // nudge
          'Total data = 2,592 × 10²⁰ byte × 8 = 2,0736 × 10²¹ bit. Kecepatan = 10 × 10⁹ bit per detik. Waktu = Data ÷ Kecepatan.', // outline
          'Waktu = 2,0736 × 10²¹ bit ÷ (10 × 10⁹ bit/s) = 2,0736 × 10¹² detik = 66.200 tahun! Ini menunjukkan bahwa transfer data dari superkomputer membutuhkan strategi khusus dan jaringan super cepat.' // full solve
        ]
      },
    ],
  },
];

// Animation keyframes
const animationStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse 2s ease-in-out infinite;
  }
`;

export default function ScaffoldPage() {
  const [current, setCurrent] = React.useState(0);
  const [answers, setAnswers] = React.useState<{[key: string]: string}>({});
  const [hintLevels, setHintLevels] = React.useState<{[key: string]: number}>({});
  const [submitted, setSubmitted] = React.useState<{[key: string]: boolean}>({});
  const [xpLost, setXpLost] = React.useState<{[key: string]: number}>({});
  const [feedback, setFeedback] = React.useState<{[key: string]: boolean | null}>({});
  const [activeSubQuestion, setActiveSubQuestion] = React.useState<string>("0-0"); // Format: "questionIndex-subQuestionIndex"

  // Calculate progress percentage
  const progressPercentage = ((current + 1) / questions.length) * 100;

  const handleAnswerChange = (questionIndex: number, subIndex: number, value: string) => {
    const key = `${questionIndex}-${subIndex}`;
    setAnswers(prev => ({...prev, [key]: value}));
  };

  const handleHintRequest = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;
    const currentLevel = hintLevels[key] || 0;

    if (currentLevel < 3) {
      setHintLevels(prev => ({...prev, [key]: currentLevel + 1}));

      // Deduct XP when full solution hint is shown
      if (currentLevel === 1) {
        setXpLost(prev => ({...prev, [key]: 50})); // Lose 50% XP
      }
    }
  };

  const handleSubmit = (questionIndex: number, subIndex: number) => {
    const key = `${questionIndex}-${subIndex}`;
    setSubmitted(prev => ({...prev, [key]: true}));

    // Simulate answer checking - in a real app, you would check against actual correct answers
    // For demo purposes, we'll use a simple algorithm to determine if an answer is "correct"
    const userAnswer = answers[key]?.trim().toLowerCase() || '';
    let isCorrect = false;

    // Simple evaluation logic for demonstration
    if (questionIndex === 0) { // Computer Processing Capacity
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('1.296') && userAnswer.includes('10') && (userAnswer.includes('20') || userAnswer.includes('²⁰'));
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('129.6') || userAnswer.includes('129,6');
      }
    } else if (questionIndex === 1) { // Energy Consumption
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('48000') || userAnswer.includes('48.000');
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('72000000') || userAnswer.includes('72.000.000');
      }
    } else if (questionIndex === 2) { // Comparative Performance
      if (subIndex === 0) {
        isCorrect = userAnswer.includes('500000') || userAnswer.includes('5') && (userAnswer.includes('10⁵') || userAnswer.includes('10^5'));
      } else if (subIndex === 1) {
        isCorrect = userAnswer.includes('2.592') && (userAnswer.includes('10¹⁴') || userAnswer.includes('10^14'));
      }
    } else if (questionIndex === 3 || questionIndex === 4) {
      // For essay-type questions, always mark as "correct" to encourage completion
      isCorrect = userAnswer.length > 10;
    }

    setFeedback(prev => ({...prev, [key]: isCorrect}));

    // If this answer is correct and there are more subquestions, move to the next one
    if (isCorrect && subIndex < questions[questionIndex].subQuestions.length - 1) {
      const nextKey = `${questionIndex}-${subIndex + 1}`;
      setActiveSubQuestion(nextKey);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animation styles */}
      <style jsx>{animationStyles}</style>

      {/* Decorative background elements */}
      <div className="absolute left-20 top-20 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"></div>
      <div className="absolute right-40 bottom-20 w-60 h-60 bg-blue-300/20 rounded-full blur-xl"></div>
      <div className="absolute right-20 top-40 w-20 h-20 bg-fuchsia-200/30 rounded-full blur-md"></div>

      <div className="bg-white backdrop-blur-sm bg-opacity-90 rounded-[2rem] shadow-2xl shadow-purple-200/50 p-8 max-w-2xl w-full relative overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Decorative card elements */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-purple-100/50 rounded-full"></div>
        <div className="absolute left-20 -bottom-10 w-20 h-20 bg-blue-100/50 rounded-full"></div>

        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center animate-float">
              <Brain className="w-6 h-6 text-violet-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Supercomputer Quiz</h1>
          </div>

          <div className="w-full bg-violet-100 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-violet-600 font-medium">Question {current + 1} of {questions.length}</span>
            <div className="flex gap-1.5">
              {Array.from({ length: questions.length }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < current ? 'bg-violet-600' :
                    i === current ? 'bg-violet-500 animate-pulse-slow' :
                    'bg-violet-200'
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-sm text-violet-600 font-medium">{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full text-xl">
              {current === 0 ? '🖥️' : current === 1 ? '⚡' : current === 2 ? '⏱️' : current === 3 ? '🔬' : '💾'}
            </div>
            <h2 className="text-xl font-medium text-slate-800">{questions[current].title}</h2>
          </div>

          {questions[current].description && (
            <p className="text-slate-600 mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              {questions[current].description}
            </p>
          )}

          <div className="mt-5">
            <Accordion
              type="single"
              collapsible
              value={activeSubQuestion}
              onValueChange={setActiveSubQuestion}
              className="space-y-4"
            >
              {questions[current].subQuestions.map((sub, subIndex) => {
                const qKey = `${current}-${subIndex}`;
                const hintLevel = hintLevels[qKey] || 0;
                const isSubmitted = submitted[qKey] || false;
                const xpDeduction = xpLost[qKey] || 0;
                const answerFeedback = feedback[qKey] === true;

                // Determine if this item should be enabled based on previous submissions
                const isPreviousCorrect = subIndex === 0 || feedback[`${current}-${subIndex-1}`] === true;
                const isEnabled = isPreviousCorrect;

                return (
                  <AccordionItem
                    key={subIndex}
                    value={qKey}
                    className={`bg-violet-50/60 rounded-xl border border-violet-100 overflow-hidden ${!isEnabled ? 'opacity-60' : ''}`}
                    disabled={!isEnabled}
                  >
                    <AccordionTrigger className="px-5 py-3 hover:no-underline">
                      <div className="font-medium text-slate-700 text-left">{sub.q}</div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <textarea
                        rows={3}
                        className={`w-full rounded-xl border-2 p-4 text-white text-base font-medium focus:ring transition-all resize-vertical ${
                          isSubmitted
                            ? answerFeedback
                              ? 'border-green-300 focus:border-green-400 focus:ring-green-300/40'
                              : 'border-red-300 focus:border-red-400 focus:ring-red-300/40'
                            : 'border-violet-200 focus:border-violet-400 focus:ring-violet-300/40'
                        }`}
                        placeholder="Tulis jawaban Anda di sini..."
                        value={answers[qKey] || ''}
                        onChange={(e) => handleAnswerChange(current, subIndex, e.target.value)}
                        disabled={isSubmitted && answerFeedback}
                      />

                      {/* Feedback after submission */}
                      {isSubmitted && (
                        <div className={`mt-2 px-4 py-2 rounded-lg flex items-center gap-2 ${
                          answerFeedback ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {answerFeedback
                            ? <><CheckCircle2 size={16} /> <span>Jawaban benar!</span></>
                            : <><XCircle size={16} /> <span>Jawaban kurang tepat. Coba lagi atau gunakan hint.</span></>
                          }
                        </div>
                      )}

                      {/* Hints system */}
                      {hintLevel > 0 && 'hints' in sub && (
                        <div className="mt-3 bg-amber-50 rounded-xl p-4 border border-amber-200">
                          <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                            <HelpCircle size={16} />
                            <span>Hint {hintLevel}/3</span>
                            {xpDeduction > 0 && (
                              <span className="ml-auto bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full">
                                -{xpDeduction}% XP
                              </span>
                            )}
                          </div>
                          <p className="text-amber-700">{sub.hints?.[hintLevel-1]}</p>
                        </div>
                      )}

                      <div className="flex justify-between mt-3">
                        <button
                          onClick={() => handleHintRequest(current, subIndex)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                            hintLevel >= 3 || (isSubmitted && answerFeedback)
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                          disabled={hintLevel >= 3 || (isSubmitted && answerFeedback)}
                        >
                          <HelpCircle size={16} />
                          {hintLevel === 0 ? 'Get Hint' :
                          hintLevel === 1 ? 'Outline' :
                          hintLevel === 2 ? 'Full Solution' : 'No More Hints'}
                        </button>

                        <button
                          onClick={() => handleSubmit(current, subIndex)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-1.5 font-medium ${
                            isSubmitted
                              ? answerFeedback
                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                          }`}
                          disabled={isSubmitted && answerFeedback}
                        >
                          {isSubmitted
                            ? answerFeedback
                              ? <CheckCircle2 size={16} />
                              : <ChevronRight size={16} />
                            : <ChevronRight size={16} />
                          }
                          {isSubmitted
                            ? answerFeedback
                              ? 'Correct!'
                              : 'Try Again'
                            : 'Submit Answer'
                          }
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

        <div className="flex justify-between relative z-10">
          <button
            onClick={() => current > 0 && setCurrent(current - 1)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              current === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => current < questions.length - 1 ? setCurrent(current + 1) : null}
            className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:shadow-lg hover:shadow-violet-200 hover:scale-[1.02] transition-all"
          >
            {current < questions.length - 1 ? 'Next Question' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

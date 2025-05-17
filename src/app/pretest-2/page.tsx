"use client"

import React, { useState } from 'react';

const questions = [
  {
    question: "Apa yang dilakukan perintah 'git init'?",
    options: [
      'Menambahkan file ke staging area',
      'Menginisialisasi repositori Git baru',
      'Menghapus repositori Git',
      'Mendorong perubahan ke remote',
    ],
    answer: 1,
  },
  // Tambahkan pertanyaan lain di sini
];

const optionColors = [
  "bg-white border-blue-400 text-blue-700 hover:bg-blue-50 hover:border-blue-500",
  "bg-white border-emerald-400 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500",
  "bg-white border-amber-400 text-amber-700 hover:bg-amber-50 hover:border-amber-500",
  "bg-white border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500"
];

export default function Pretest2() {
  const [current, setCurrent] = useState(0);
  // const [score, setScore] = useState(0); // jika ingin skor

  const q = questions[current];

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%)',
        backgroundImage: `
          linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%),
          repeating-linear-gradient(to right, transparent, transparent 19px, rgba(99, 102, 241, 0.08) 19px, rgba(99, 102, 241, 0.08) 20px),
          repeating-linear-gradient(to bottom, transparent, transparent 19px, rgba(99, 102, 241, 0.08) 19px, rgba(99, 102, 241, 0.08) 20px)
        `,
        backgroundSize: '100% 100%, 20px 20px, 20px 20px',
        backgroundPosition: 'center, 0 0, 0 0'
      }}>
      {/* Decorative elements */}
      <div className="absolute left-20 top-20 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute right-40 bottom-20 w-60 h-60 bg-purple-200/20 rounded-full blur-xl"></div>
      <div className="absolute right-20 top-40 w-20 h-20 bg-emerald-200/30 rounded-full blur-md"></div>

      {/* Indikator soal */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-indigo-700 text-lg font-semibold">
        <span className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-md border border-indigo-100">{current + 1}/{questions.length}</span>
      </div>

      {/* Pertanyaan */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl px-8 py-6 text-indigo-900 text-2xl font-bold mb-8 text-center max-w-xl shadow-lg border border-indigo-100">
          {q.question}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-4 mt-8">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px] lg:min-h-[200px] p-6 rounded-2xl border-3 font-medium text-base shadow-lg transition-all duration-200 cursor-pointer select-none text-center relative w-full ${optionColors[idx % optionColors.length]} hover:scale-105`}
              // onClick={() => handleAnswer(idx)}
            >
              {idx === 0 && (
                <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-base border border-blue-200">
                  {idx + 1}
                </span>
              )}
              {idx === 1 && (
                <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-base border border-emerald-200">
                  {idx + 1}
                </span>
              )}
              {idx === 2 && (
                <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 font-bold text-base border border-amber-200">
                  {idx + 1}
                </span>
              )}
              {idx === 3 && (
                <span className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-base border border-purple-200">
                  {idx + 1}
                </span>
              )}
              <span className="w-full block break-words">{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nama user di pojok kiri bawah */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">D</div>
        <span className="text-indigo-800 font-semibold">Dany Nur Ferdiansyah</span>
      </div>
    </div>
  );
}

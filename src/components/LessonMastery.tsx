import { useEffect, useMemo, useState } from 'preact/hooks';
import type { MasteryQuestion } from '../data/lesson-mastery';

export default function LessonMastery({ slug, questions }: { slug: string; questions: MasteryQuestion[] }) {
  const key = `gc-mastery-${slug}`;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  useEffect(() => { try { setAnswers(JSON.parse(localStorage.getItem(key) || '{}')); } catch {} }, [key]);
  const score = useMemo(() => Object.entries(answers).filter(([i, answer]) => questions[Number(i)]?.correct === answer).length, [answers, questions]);
  const answered = Object.keys(answers).length;
  const choose = (question: number, option: number) => {
    const next = { ...answers, [question]: option };
    setAnswers(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  return <section class="my-8 rounded-2xl border border-clinical-200 bg-white p-5 dark:border-clinical-700 dark:bg-clinical-800 sm:p-7" aria-labelledby="mastery-title">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div><p class="text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">Scored assessment</p><h2 id="mastery-title" class="mt-1 font-heading text-2xl font-semibold text-clinical-900 dark:text-white">Mastery check</h2></div>
      <div class="rounded-full bg-clinical-100 px-3 py-1 text-sm font-bold text-clinical-700 dark:bg-clinical-700 dark:text-clinical-100" aria-live="polite">{score}/{questions.length} correct</div>
    </div>
    <div class="mt-5 space-y-6">
      {questions.map((question, qi) => {
        const selected = answers[qi];
        const done = selected !== undefined;
        return <fieldset class="rounded-xl border border-clinical-200 p-4 dark:border-clinical-700">
          <legend class="px-1 font-semibold leading-6 text-clinical-900 dark:text-white">{question.prompt}</legend>
          <div class="mt-3 grid gap-2">
            {question.options.map((option, oi) => {
              const correct = done && oi === question.correct;
              const wrong = done && oi === selected && oi !== question.correct;
              return <button type="button" onClick={() => choose(qi, oi)} class={`rounded-lg border px-3 py-2 text-left text-sm transition ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100' : wrong ? 'border-red-400 bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-100' : 'border-clinical-200 hover:border-blue-400 dark:border-clinical-700'}`} aria-pressed={selected === oi}>{option}</button>;
            })}
          </div>
          {done && <div class={`mt-3 rounded-lg p-3 text-sm leading-6 ${selected === question.correct ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100' : 'bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100'}`} role="status"><strong>{selected === question.correct ? 'Correct.' : 'Reconsider.'}</strong> {question.explanation}</div>}
        </fieldset>;
      })}
    </div>
    {answered === questions.length && <p class="mt-5 text-sm text-clinical-600 dark:text-clinical-300">{score === questions.length ? 'Mastered on this attempt. Explain the answer aloud before moving on.' : 'Review the explanation and retry; your response is saved on this device.'}</p>}
  </section>;
}

import { Button } from '@/components/ui/button';

interface About3Props {
  title?: string;
  description?: string;
  secondaryImage?: { src: string; alt: string };
  breakout?: { title?: string; description?: string; buttonText?: string; buttonUrl?: string };
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{ label: string; value: string }>;
}

export const About3 = ({
  title = 'Built for the way clinicians learn',
  description = 'Cardiology becomes coherent when physiology, examination, tracings, and evidence are taught as one connected system.',
  secondaryImage = { src: '/ecg-tracings/normal/00003.png', alt: 'A normal 12-lead electrocardiogram from the teaching library' },
  breakout = {
    title: 'Practice, then reveal',
    description: 'The ECG quiz asks you to commit to an interpretation before opening the complete cardiologist read.',
    buttonText: 'Start the ECG quiz',
    buttonUrl: '/ecg/quiz',
  },
  achievementsTitle = 'A serious library, freely available',
  achievementsDescription = 'No account, subscription, or industry sponsorship. Just durable clinical teaching and primary-source links.',
  achievements = [
    { label: 'Clinical lessons', value: '28' },
    { label: '12-lead ECGs', value: '696' },
    { label: 'Heart sounds', value: '265' },
    { label: 'Cost', value: '$0' },
  ],
}: About3Props = {}) => (
  <section className="bg-[#f6f1e8] py-20 text-clinical-900 dark:bg-clinical-900 dark:text-white sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
        <div><p className="eyebrow">Why Gusdorf Cardiology</p><h2 className="mt-3 font-heading text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2></div>
        <p className="max-w-xl text-lg leading-8 text-clinical-600 dark:text-clinical-300">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex min-h-72 items-center rounded-2xl border border-clinical-200 bg-white p-4 lg:col-span-2 lg:min-h-[38rem] dark:border-clinical-700 dark:bg-clinical-950">
          <img src={secondaryImage.src} alt={secondaryImage.alt} loading="lazy" className="w-full object-contain" />
        </div>
        <div className="cardiac-grid flex flex-col justify-between gap-10 rounded-2xl border border-clinical-200 bg-[#eee5d8] p-7 dark:border-clinical-700 dark:bg-clinical-800">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-700 text-white"><svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true"><path d="M2 17h7l3-7 4 14 4-17 4 10h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          <div><h3 className="mb-2 font-heading text-2xl">{breakout.title}</h3><p className="leading-7 text-clinical-600 dark:text-clinical-300">{breakout.description}</p></div>
          <Button variant="outline" className="mr-auto" asChild><a href={breakout.buttonUrl}>{breakout.buttonText}</a></Button>
        </div>
      </div>
      <div className="cardiac-grid relative mt-20 overflow-hidden rounded-2xl border border-clinical-200 bg-[#eee5d8] p-8 dark:border-clinical-700 dark:bg-clinical-800 sm:p-12">
        <div className="max-w-2xl"><h2 className="font-heading text-3xl font-medium sm:text-4xl">{achievementsTitle}</h2><p className="mt-4 leading-7 text-clinical-600 dark:text-clinical-300">{achievementsDescription}</p></div>
        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-clinical-300 pt-8 dark:border-clinical-600 md:grid-cols-4">{achievements.map((item) => <div key={item.label}><p className="text-sm text-clinical-600 dark:text-clinical-300">{item.label}</p><span className="mt-2 block font-heading text-4xl font-medium sm:text-5xl">{item.value}</span></div>)}</div>
      </div>
    </div>
  </section>
);

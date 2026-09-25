import Image from "next/image";

/** Real job photos shown under the gallery selector (single shots plus one before/after roof). */
export function WorkPhotos() {
  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <h3 className="heading-display text-center text-display-3 text-white">
        On the job around Victoria
      </h3>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        <li className="relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
          <Image
            src="/images/work/ocean-pole-1.jpg"
            alt="Cleaning windows with a water-fed pole at an oceanfront home"
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover"
          />
        </li>
        <li className="relative aspect-[4/5] overflow-hidden rounded-card shadow-card">
          <Image
            src="/images/work/ocean-pole-2.jpg"
            alt="Water-fed pole reaching a high window above a waterfront deck"
            fill
            sizes="(max-width: 768px) 50vw, 300px"
            className="object-cover"
          />
        </li>
        <li className="col-span-2 grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-1 md:gap-4">
          <figure className="relative aspect-[8/5] overflow-hidden rounded-card shadow-card">
            <Image
              src="/images/work/roof-before.jpg"
              alt="Roof valley with moss and debris before cleaning"
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover"
            />
            <figcaption className="absolute left-2 top-2 rounded-full bg-navy-900/70 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-sand-200">
              Before
            </figcaption>
          </figure>
          <figure className="relative aspect-[8/5] overflow-hidden rounded-card shadow-card">
            <Image
              src="/images/work/roof-after.jpg"
              alt="The same roof valley clean after professional roof cleaning"
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover"
            />
            <figcaption className="absolute left-2 top-2 rounded-full bg-orange-700 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-white">
              After
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  );
}

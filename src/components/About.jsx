import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-yellow-50 relative flex flex-col items-center justify-start font-sans top-10">
      <section
        className="relative w-full h-96 flex items-center justify-center mb-16"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1
          className="relative text-6xl md:text-6xl font-black text-white text-center shadow-[4px_4px_0_0_#000000] mx-4"
          dir="rtl"
        >
"الڤانك العربي مش بس موسيقى… هيدي رحلة من بيروت للعالم، صوت كل واحد عندو قصة."
        </h1>
      </section>

<section className="max-w-6xl mb-12 flex flex-col md:flex-row items-center gap-8">
  
  <div className="flex-1 bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000]">
    <h2 className="text-4xl font-black mb-4 border-b-4 border-black inline-block pb-2">
      Who We Are
    </h2>
    <p className="text-lg text-gray-800 leading-relaxed mb-4">
      Habibi Punk is inspired by the spirit of <strong>Habibi Funk Records</strong>, a pioneering Berlin‑based label known for reviving lost gems of Arab music. The original label was founded by Jannis Stürtz, a DJ and vinyl digger, who traveled across North Africa and the Middle East to unearth rare tapes and records that captured the electrifying fusion of funk, jazz, disco, and regional musical traditions.
    </p>
    <p className="text-lg text-gray-800 leading-relaxed">
      Just like its inspiration, Habibi Punk is more than just a label — it's a bridge between past and present, between Beirut’s underground and the global stage. We curate, reissue, and support artists whose music once echoed through smoky cafés, back‑street record shops, and forgotten dance floors — and deserves to spin again.
    </p>
  </div>

  <div className="flex-1 hidden md:block">
    <img
      src="https://f4.bcbits.com/img/0040899504_21.jpg"
      alt="Habibi Funk Inspiration"
      className="w-full h-full object-cover border-4 border-black shadow-[8px_8px_0_0_#000000]"
    />
  </div>
  
</section>

      <section className="max-w-6xl bg-yellow-400 p-8 border-4 border-black shadow-[8px_8px_0_0_#000000] mb-12">
        <h2 className="text-4xl font-black mb-4 border-b-4 border-black inline-block pb-2">
          Our Roots & Vision
        </h2>
        <p className="text-lg text-black leading-relaxed mb-4">
          Habibi Funk wasn’t just about reissues — it was about **responsibility**. Jannis Stürtz founded the label with a conscious, post-colonial mindset: he licenses music directly from artists or their families, and splits revenues fairly — often **50/50**. 
        </p>
        <p className="text-lg text-black leading-relaxed">
          Through that ethos, Habibi Punk carries forward a promise: to honor creators, to amplify marginalized stories, and to celebrate Arab musical heritage with integrity, not exploitation.
        </p>
      </section>

      <section className="max-w-6xl bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000] mb-12">
        <h2 className="text-4xl font-black mb-4 border-b-4 border-black inline-block pb-2">Musical Impact</h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-4">
          Over the years, Habibi Funk has reissued dozens of albums and compilations by remarkable artists:  
        </p>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          <li>
            <strong>Al Massrieen</strong>: An Egyptian funk and disco band from the ’70s-’80s whose eclectic sound combined jazz, pop, and regional styles.
          </li>
          <li>
            <strong>Charif Megarbane</strong>: A modern voice, whose album <em>Hawalat</em> was released on Habibi Funk, blending jazz, soul, and Arab musical traditions. 
          </li>
          <li>
            <strong>Ara Kekedjian</strong>: With his album <em>Bourj Hammoud Groove</em>, he channels the vibrant spirit of Beirut’s Armenian community in a funky, danceable way. 
          </li>
        </ul>
        <p className="text-lg text-gray-800 leading-relaxed mt-4">
          By reviving these records, Habibi Punk honours the **creative freedom** and **fusion** these artists represented — breaking borders and genres, while shining a light on stories that were nearly forgotten.
        </p>
      </section>

      <section className="max-w-6xl bg-yellow-400 p-8 border-4 border-black shadow-[8px_8px_0_0_#000000] mb-16">
        <h2 className="text-4xl font-black mb-4 border-b-4 border-black inline-block pb-2">Cultural Role</h2>
        <p className="text-lg text-black leading-relaxed mb-4">
          In addition to rediscovery, Habibi Punk (and its inspiration Habibi Funk) plays a **social role**: using music as a form of solidarity and activism. For example, during the Beirut port explosion, Habibi Funk curated a compilation of Lebanese music and donated 100% of the profits to relief efforts. 
        </p>
        <p className="text-lg text-black leading-relaxed">
          We believe music is not just entertainment — it's memory, identity, and a way to **heal**. Through our work, we aim to reconnect younger generations with the musical legacy of the Arab world, and to build a community that respects history while dreaming of the future.
        </p>
      </section>

      <section className="max-w-6xl bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000000] mb-16">
        <h2 className="text-4xl font-black mb-4 border-b-4 border-black inline-block pb-2">Connect With Us</h2>
        <p className="text-lg text-gray-800 mb-2">
          Explore our curated collection and releases on our Bandcamp page:
        </p>
        <p className="text-lg text-gray-800">
          <a
            href="https://habibipunkrecords.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-lime-600 hover:text-lime-400"
          >
            Habibi Punk (inspired by Habibi Funk) on Bandcamp
          </a>
        </p>
        <p className="text-lg text-gray-800 mt-2">
          For inquiries, submissions, or just to say hi:
        </p>
        <p className="text-lg text-gray-800">
          <a
            href="mailto:info@habibipunk.com"
            className="underline text-lime-600 hover:text-lime-400"
          >
            info@habibipunk.com
          </a>
        </p>
      </section>

      <Link
        to="/"
        className="mb-16 text-2xl font-black bg-lime-600 text-black border-4 border-black px-12 py-6 shadow-[8px_8px_0_0_#000000] hover:bg-lime-500 transition"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
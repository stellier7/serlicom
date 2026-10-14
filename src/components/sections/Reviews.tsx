"use client";

import { CONFIG, type Review } from "@/config";
import { FacebookIcon } from "@/components/icons";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-brand-navy/8">
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white"
          aria-hidden="true"
        >
          <FacebookIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-base font-bold text-brand-navy">
            {review.name}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1877F2]">
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#1877F2] text-[10px] text-white"
              aria-hidden="true"
            >
              ✓
            </span>
            {CONFIG.labels.recommends}
          </p>
          {review.quote ? (
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">
              “{review.quote}”
            </p>
          ) : null}
          <p className="mt-3 text-xs text-brand-navy/45">
            {CONFIG.labels.viaFacebook.replace("Facebook", review.source)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Reviews() {
  return (
    <section className="bg-soft-grey py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand-blue uppercase">
            {CONFIG.copy.reviewsEyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-navy sm:text-4xl">
            {CONFIG.copy.reviewsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-brand-navy/75">
            {CONFIG.copy.reviewsSubtitle}
          </p>
        </Reveal>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {CONFIG.reviews.map((review) => (
            <StaggerItem key={review.name}>
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8">
          <a
            href={CONFIG.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            <FacebookIcon className="h-5 w-5" />
            {CONFIG.labels.seeFacebookPage}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

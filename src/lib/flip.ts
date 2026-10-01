"use client";

import { Flip, gsap } from "@/lib/gsap";

export type FlipSnapshot = { state: Flip.FlipState; height: number };

/** Records item positions and the container height before a layout change (filter, view toggle). */
export function captureFlip(targets: string, container: HTMLElement | null): FlipSnapshot {
  return { state: Flip.getState(targets, { props: "opacity" }), height: container?.offsetHeight ?? 0 };
}

type PlayOptions = { reduced: boolean; duration?: number; stagger?: number };

/**
 * Animates from a snapshot to the new layout. Items fly with `absolute: true`, so the
 * container's size is carried explicitly — otherwise it collapses mid-animation and
 * whatever follows (the footer) jumps up.
 */
export function playFlip(snapshot: FlipSnapshot, container: HTMLElement | null, { reduced, duration = 0.8, stagger = 0 }: PlayOptions) {
  const time = reduced ? 0 : duration;

  const next = container?.offsetHeight ?? 0;

  Flip.from(snapshot.state, {
    duration: time,
    ease: "power3.inOut",
    absolute: true,
    stagger,
    onEnter: (els) =>
      gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: time * 0.6, delay: time * 0.3 }),
    onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: time * 0.4 }),
  });

  // While items fly (absolute) the container would collapse; min-height carries it from the old
  // height to the new one instead. (Tweening `height` gets reset when cards re-enter the flow.)
  if (container) {
    gsap.fromTo(
      container,
      { minHeight: snapshot.height },
      { minHeight: next, duration: time, ease: "power3.inOut", clearProps: "minHeight" }
    );
  }
}

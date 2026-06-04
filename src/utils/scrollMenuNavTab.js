/** Scroll a menu nav chip into view inside `.app__menu-nav-scroll` only (never the page). */
export function scrollMenuNavTabIntoView(chip) {
  if (!chip) return;

  const container = chip.closest('.app__menu-nav-scroll');
  if (!container) return;

  const padding = 12;
  const chipLeft = chip.offsetLeft;
  const chipRight = chipLeft + chip.offsetWidth;
  const viewLeft = container.scrollLeft;
  const viewRight = viewLeft + container.clientWidth;

  if (chipLeft < viewLeft + padding) {
    container.scrollTo({ left: Math.max(0, chipLeft - padding), behavior: 'smooth' });
  } else if (chipRight > viewRight - padding) {
    container.scrollTo({
      left: chipRight - container.clientWidth + padding,
      behavior: 'smooth',
    });
  }
}

console.clear();

const singleCardsContainer = document.querySelector(".singleCards");
const singleCardsContainerInner = document.querySelector(".singleCards__inner");
const singleCards = Array.from(document.querySelectorAll(".singleCard"));
const front = document.querySelector(".front");

const applyfrontMask = (e) => {
  const frontEl = e.currentTarget;
  const x = e.pageX - singleCardsContainer.offsetLeft;
  const y = e.pageY - singleCardsContainer.offsetTop;

  frontEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createfrontCta = (frontsingleCard, ctaEl) => {
  const frontCta = document.createElement("div");
  frontCta.classList.add("cta");
  frontCta.textContent = ctaEl.textContent;
  frontCta.setAttribute("aria-hidden", true);
  frontsingleCard.append(frontCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const singleCardIndex = singleCards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (singleCardIndex >= 0) {
      front.children[singleCardIndex].style.width = `${width}px`;
      front.children[singleCardIndex].style.height = `${height}px`;
    }
  });
});

const initfrontsingleCard = (singleCardEl) => {
  const frontsingleCard = document.createElement("div");
  frontsingleCard.classList.add("singleCard");
  createfrontCta(frontsingleCard, singleCardEl.lastElementChild);
  front.append(frontsingleCard);
  observer.observe(singleCardEl);
};

singleCards.forEach(initfrontsingleCard);
document.body.addEventListener("pointermove", applyfrontMask);

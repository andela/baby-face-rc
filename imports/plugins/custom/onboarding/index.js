import { introJs } from "intro.js";
import { Reaction } from "/client/api";
import userOnboarding from "./userOnboarding";
import adminOnboarding from "./adminOnboarding";

const intro = new introJs();

const takeTour = () => {
  let steps;

  if (Reaction.hasPermission("admin")) {
    steps = adminOnboarding;
  } else {
    steps = userOnboarding;
  }

  intro.setOptions({
    steps,
    showProgress: true,
    showBullets: true,
    scrollToElement: true,
    showStepNumbers: false
  });

  intro.start();
};

export default takeTour;

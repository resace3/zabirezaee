const pillarContent = {
  environmental: {
    label: "Environmental Pillar",
    heading: "Environmental performance and resource stewardship",
    meaning:
      "Environmental factors describe how a firm manages its impact on natural resources, emissions, waste, climate exposure, and environmental risk.",
    why:
      "Environmental priorities can shape operating costs, regulatory exposure, reputation, and long-term sustainability performance.",
    examples: ["Emissions management", "Energy efficiency", "Waste and resource use"],
    performance:
      "When environmental exposure is material, improvements in this pillar may have a stronger relationship with sustainability performance than other ESG dimensions.",
  },
  social: {
    label: "Social Pillar",
    heading: "Stakeholder relationships and workforce responsibility",
    meaning:
      "Social factors describe how a firm manages employees, customers, communities, human rights, health and safety, and other stakeholder responsibilities.",
    why:
      "Social priorities can affect workforce stability, customer trust, community legitimacy, and the resilience of business relationships.",
    examples: ["Employee wellbeing", "Customer responsibility", "Community impact"],
    performance:
      "When stakeholder trust is central to the business model, the social pillar may become a key driver of sustainability performance.",
  },
  governance: {
    label: "Governance Pillar",
    heading: "Oversight, accountability, and decision quality",
    meaning:
      "Governance factors describe board effectiveness, ownership structures, executive incentives, disclosure quality, ethics, and accountability systems.",
    why:
      "Governance priorities can shape strategic discipline, risk oversight, reporting credibility, and confidence in sustainability commitments.",
    examples: ["Board independence", "Ethics and compliance", "Disclosure quality"],
    performance:
      "When governance mechanisms are strong, firms may be better positioned to implement environmental and social commitments credibly.",
  },
};

const industryValues = {
  manufacturing: { environmental: 44, social: 28, governance: 28 },
  finance: { environmental: 20, social: 31, governance: 49 },
  energy: { environmental: 56, social: 22, governance: 22 },
  technology: { environmental: 24, social: 42, governance: 34 },
  healthcare: { environmental: 22, social: 48, governance: 30 },
};

const pillarButtons = Array.from(document.querySelectorAll(".pillar-card"));
const label = document.querySelector("#pillar-label");
const heading = document.querySelector("#pillar-heading");
const meaning = document.querySelector("#pillar-meaning");
const why = document.querySelector("#pillar-why");
const examples = document.querySelector("#pillar-examples");
const performance = document.querySelector("#pillar-performance");

const renderPillar = (pillarKey) => {
  const pillar = pillarContent[pillarKey];

  if (!pillar || !label || !heading || !meaning || !why || !examples || !performance) {
    return;
  }

  label.textContent = pillar.label;
  heading.textContent = pillar.heading;
  meaning.textContent = pillar.meaning;
  why.textContent = pillar.why;
  performance.textContent = pillar.performance;
  examples.replaceChildren(
    ...pillar.examples.map((example) => {
      const item = document.createElement("li");
      item.textContent = example;
      return item;
    })
  );

  pillarButtons.forEach((button) => {
    const isActive = button.dataset.pillar === pillarKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
};

pillarButtons.forEach((button) => {
  button.addEventListener("click", () => renderPillar(button.dataset.pillar));
});

const industrySelect = document.querySelector("#industry-select");
const environmentalBar = document.querySelector(".environmental-bar");
const socialBar = document.querySelector(".social-bar");
const governanceBar = document.querySelector(".governance-bar");
const environmentalValue = document.querySelector("#environmental-value");
const socialValue = document.querySelector("#social-value");
const governanceValue = document.querySelector("#governance-value");

const renderIndustry = (industryKey) => {
  const values = industryValues[industryKey];

  if (!values || !environmentalBar || !socialBar || !governanceBar) {
    return;
  }

  environmentalBar.style.width = `${values.environmental}%`;
  socialBar.style.width = `${values.social}%`;
  governanceBar.style.width = `${values.governance}%`;

  if (environmentalValue && socialValue && governanceValue) {
    environmentalValue.textContent = `${values.environmental}%`;
    socialValue.textContent = `${values.social}%`;
    governanceValue.textContent = `${values.governance}%`;
  }
};

industrySelect?.addEventListener("change", (event) => renderIndustry(event.target.value));
renderIndustry(industrySelect?.value || "manufacturing");

const capitalDriverContent = {
  econ: {
    label: "ECON Signal",
    heading: "Economic sustainability disclosure",
    summary:
      "Economic sustainability disclosure helps investors evaluate growth, research, operating efficiency, and long-term business quality.",
    why:
      "Better economic sustainability signals can reduce uncertainty about future cash flows and the risk premium investors require.",
    emphasis:
      "The paper highlights growth and research dimensions as contributors to the observed relationship.",
  },
  esg: {
    label: "ESG Signal",
    heading: "Environmental, social, and governance performance",
    summary:
      "ESG performance gives investors a structured view of sustainability quality across environmental stewardship, stakeholder responsibility, and governance.",
    why:
      "Stronger ESG performance can support credibility, reduce perceived risk, and inform investors' required returns.",
    emphasis:
      "The paper emphasizes environmental and governance dimensions as contributors to the cost-of-equity relationship.",
  },
  combined: {
    label: "Interactive Effect",
    heading: "ECON and ESG signals working together",
    summary:
      "The paper studies whether economic sustainability disclosure and ESG performance reinforce each other when investors evaluate equity risk.",
    why:
      "When both signal sets are strong, investors may view sustainability performance as more credible and more relevant to long-term risk.",
    emphasis:
      "The relationship between one sustainability signal and cost of equity is stronger when the other signal is also strong.",
  },
};

const capitalDriverButtons = Array.from(document.querySelectorAll(".sustainability-driver-card"));
const capitalDriverLabel = document.querySelector("#capital-driver-label");
const capitalDriverHeading = document.querySelector("#capital-driver-heading");
const capitalDriverSummary = document.querySelector("#capital-driver-summary");
const capitalDriverWhy = document.querySelector("#capital-driver-why");
const capitalDriverEmphasis = document.querySelector("#capital-driver-emphasis");

const renderCapitalDriver = (driverKey) => {
  const driver = capitalDriverContent[driverKey];

  if (!driver || !capitalDriverLabel || !capitalDriverHeading || !capitalDriverSummary || !capitalDriverWhy || !capitalDriverEmphasis) {
    return;
  }

  capitalDriverLabel.textContent = driver.label;
  capitalDriverHeading.textContent = driver.heading;
  capitalDriverSummary.textContent = driver.summary;
  capitalDriverWhy.textContent = driver.why;
  capitalDriverEmphasis.textContent = driver.emphasis;

  capitalDriverButtons.forEach((button) => {
    const isActive = button.dataset.capitalDriver === driverKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
};

capitalDriverButtons.forEach((button) => {
  button.addEventListener("click", () => renderCapitalDriver(button.dataset.capitalDriver));
});

const capitalProfiles = {
  balanced: { strength: 72, risk: 38, equityCost: 8.2 },
  "strong-econ": { strength: 78, risk: 32, equityCost: 7.6 },
  "strong-esg": { strength: 82, risk: 29, equityCost: 7.3 },
  weak: { strength: 36, risk: 68, equityCost: 10.4 },
};

const capitalProfileSelect = document.querySelector("#capital-profile-select");
const sustainabilityStrengthBar = document.querySelector(".sustainability-strength-bar");
const riskSignalBar = document.querySelector(".risk-signal-bar");
const equityCostBar = document.querySelector(".equity-cost-bar");
const sustainabilityStrengthValue = document.querySelector("#sustainability-strength-value");
const riskSignalValue = document.querySelector("#risk-signal-value");
const equityCostValue = document.querySelector("#equity-cost-value");

const renderCapitalProfile = (profileKey) => {
  const profile = capitalProfiles[profileKey];

  if (!profile || !sustainabilityStrengthBar || !riskSignalBar || !equityCostBar) {
    return;
  }

  sustainabilityStrengthBar.style.width = `${profile.strength}%`;
  riskSignalBar.style.width = `${profile.risk}%`;
  equityCostBar.style.width = `${Math.min(profile.equityCost * 8, 100)}%`;

  if (sustainabilityStrengthValue && riskSignalValue && equityCostValue) {
    sustainabilityStrengthValue.textContent = `${profile.strength}%`;
    riskSignalValue.textContent = `${profile.risk}%`;
    equityCostValue.textContent = `${profile.equityCost.toFixed(1)}%`;
  }
};

capitalProfileSelect?.addEventListener("change", (event) => renderCapitalProfile(event.target.value));
renderCapitalProfile(capitalProfileSelect?.value || "balanced");

const diagramRevealTargets = Array.from(document.querySelectorAll(".framework-diagram, .two-step-framework"));

if (diagramRevealTargets.length > 0) {
  if ("IntersectionObserver" in window) {
    const diagramObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          diagramObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.28 }
    );

    diagramRevealTargets.forEach((target) => diagramObserver.observe(target));
  } else {
    diagramRevealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}

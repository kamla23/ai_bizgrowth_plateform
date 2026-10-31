const ctxVisibility = document
  .getElementById("visibilityChart")
  .getContext("2d");

const gradientUser = ctxVisibility.createLinearGradient(0, 0, 0, 200);
gradientUser.addColorStop(0, "rgba(0, 242, 254, 0.35)");
gradientUser.addColorStop(1, "rgba(0, 242, 254, 0)");

let visibilityChart = new Chart(ctxVisibility, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Your Shop",
        data: [30, 38, 48, 62, 72, 82],
        borderColor: "#00f2fe",
        borderWidth: 3,
        backgroundColor: gradientUser,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Nearest Competitor",
        data: [42, 45, 47, 50, 52, 53],
        borderColor: "#e052a0",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#8c83a0" },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#8c83a0", stepSize: 25 },
      },
    },
  },
});

const ctxEnquiries = document.getElementById("enquiriesChart").getContext("2d");

let enquiriesChart = new Chart(ctxEnquiries, {
  type: "bar",
  data: {
    labels: ["Instagram", "Google", "WhatsApp", "Walk-in"],
    datasets: [
      {
        data: [130, 95, 72, 50],
        backgroundColor: "#9d00ff",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#8c83a0" },
      },
      y: {
        display: false,
      },
    },
  },
});

function updateChartData(period) {
  document
    .querySelectorAll(".time-toggle-btns .toggle-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (period === "12M") {
    visibilityChart.data.labels = [
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ];
    visibilityChart.data.datasets[0].data = [
      20, 25, 30, 35, 42, 50, 58, 65, 70, 78, 82, 91,
    ];
    visibilityChart.data.datasets[1].data = [
      35, 38, 40, 42, 45, 48, 50, 52, 54, 55, 57, 58,
    ];
    document.getElementById(
      "growthBadge"
    ).innerHTML = `<i class="fa-solid fa-arrow-up-right"></i> +68%`;
  } else {
    visibilityChart.data.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    visibilityChart.data.datasets[0].data = [30, 38, 48, 62, 72, 82];
    visibilityChart.data.datasets[1].data = [42, 45, 47, 50, 52, 53];
    document.getElementById(
      "growthBadge"
    ).innerHTML = `<i class="fa-solid fa-arrow-up-right"></i> +49%`;
  }

  visibilityChart.update();
}

document.addEventListener("DOMContentLoaded", () => {
  const analysisForm =
    document.getElementById("analysisForm") ||
    document.querySelector(".analysis-form");
  const reportOutputCard = document.querySelector(".report-card");

  if (analysisForm) {
    analysisForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const businessName =
        analysisForm.querySelector('input[type="text"]')?.value ||
        "My Business";
      const businessType =
        analysisForm.querySelector("select")?.value || "Saree / Retail Shop";
      const challenge =
        analysisForm.querySelector('input[name="challenge"]:checked')?.value ||
        "Get More Customers";

      if (reportOutputCard) {
        reportOutputCard.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="border: 3px solid rgba(140,67,95,0.2); border-top: 3px solid #8C435F; border-radius: 50%; width: 42px; height: 42px; animation: spin 0.8s linear infinite; margin: 0 auto 15px auto;"></div>
            <p style="color: var(--text-primary); font-weight: 700;">AI analyzing Pain Points for "${businessName}"...</p>
            <span style="color: var(--text-secondary); font-size: 0.825rem;">Checking industry benchmarks for ${businessType}</span>
          </div>
        `;
      }

      setTimeout(() => {
        let solutions = [];
        let recommendedPlan = "";

        if (
          challenge.includes("Footfall") ||
          challenge.includes("Walk-in") ||
          challenge.includes("Customers")
        ) {
          solutions = [
            "Google My Business (GMB) Local SEO Setup to dominate local map searches.",
            "Instagram & Facebook Hyper-Local Ads targetted within 5km radius.",
            "WhatsApp Catalogue Website with 1-Click Order Booking.",
          ];
          recommendedPlan =
            "Growth Digital Marketing + E-Commerce Lite Website";
        } else if (
          challenge.includes("Online") ||
          challenge.includes("Website")
        ) {
          solutions = [
            "High-Speed Mobile Responsive E-Commerce / Catalog Website.",
            "Payment Gateway & Automatic WhatsApp Invoice Integration.",
            "SEO Optimized Product Categories to attract organic shoppers.",
          ];
          recommendedPlan = "Custom E-Commerce Solution";
        } else {
          solutions = [
            "Automated WhatsApp Follow-ups for abandoned carts & customer queries.",
            "Customer Loyalty & Referral Program Integration.",
            "Meta Ads Retargeting Campaign to double repeat sales.",
          ];
          recommendedPlan = "Complete Digital Growth Retainer";
        }

        const waMessage = `Hi! I ran an AI Audit for *${businessName}* (${businessType}). Problem: ${challenge}. Recommended Plan: ${recommendedPlan}. I want to get started.`;
        const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
          waMessage
        )}`;

        if (reportOutputCard) {
          reportOutputCard.innerHTML = `
            <div style="animation: fadeIn 0.4s ease-in-out;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h3 style="color: var(--text-primary); font-size: 1.25rem;">AI Recommendation Report</h3>
                <span style="background: rgba(0, 214, 108, 0.15); color: #008a46; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 20px;">Audit Ready</span>
              </div>
              
              <div style="background: var(--bg-main); border: 1px solid var(--border-mauve); padding: 14px; border-radius: 10px; margin-bottom: 16px;">
                <span style="color: var(--text-secondary); font-size: 0.8rem; text-transform: uppercase; font-weight: 700; display: block;">Identified Business Gap</span>
                <strong style="color: var(--mauve-primary); font-size: 0.95rem;">${challenge} in ${businessType}</strong>
              </div>

              <strong style="color: var(--text-primary); font-size: 0.875rem; display: block; margin-bottom: 8px;">Actionable Solution Blueprint:</strong>
              <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                ${solutions
                  .map(
                    (sol) => `
                  <li style="font-size: 0.85rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 8px;">
                    <span style="color: var(--accent-green); font-weight: bold; margin-top: 1px;">✓</span> <span>${sol}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>

              <div style="background: rgba(140, 67, 95, 0.08); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Suggested Package:</span>
                <strong style="display: block; font-size: 0.9rem; color: var(--text-primary);">${recommendedPlan}</strong>
              </div>

              <a href="${waUrl}" target="_blank" class="btn btn-secondary" style="width: 100%; text-decoration: none; font-size: 0.9rem; gap: 8px;">
                <i class="fab fa-whatsapp"></i> Get Custom Proposal on WhatsApp
              </a>
            </div>
          `;
        }
      }, 1000);
    });
  }

  const setupPricingButtons = () => {
    const pricingButtons = document.querySelectorAll(".pricing-card .btn");
    pricingButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".pricing-card");
        const planName = card?.querySelector("h3")?.innerText || "Growth Plan";
        const price = card?.querySelector(".price")?.innerText || "Standard";

        const text = `Hi, I am interested in the *${planName}* (${price}). Please share the detailed feature breakdown and onboarding steps.`;
        window.open(
          `https://wa.me/919876543210?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      });
    });
  };
  setupPricingButtons();

  const joinReferralBtn =
    document.getElementById("joinReferralBtn") ||
    document.querySelector(".btn-gradient");
  if (joinReferralBtn) {
    joinReferralBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const partnerName = prompt(
        "Enter your Name to generate Partner Link (No Educational Qualification Needed):"
      );
      if (partnerName) {
        const uniqueId =
          partnerName.toLowerCase().replace(/\s+/g, "") +
          Math.floor(1000 + Math.random() * 9000);
        const refLink = `${window.location.origin}?ref=${uniqueId}`;
        alert(
          `Welcome Partner! Your Registration is Free.\n\nEarn ₹1,000 per sale using your link:\n${refLink}`
        );
      }
    });
  }

  const chatInput = document.querySelector(".chat-input-wrapper input");
  const sendBtn = document.querySelector(".send-btn");
  const chipBtns = document.querySelectorAll(".chip-btn");

  const partnerKnowledgeBase = [
    {
      keywords: ["qualification", "study", "degree", "eligibility"],
      answer:
        "No educational qualification is required! Anyone (students, homemakers, shop owners) can join and earn ₹1,000 per referral.",
    },
    {
      keywords: ["earn", "commission", "payout", "payment", "money", "1000"],
      answer:
        "You earn a flat ₹1,000 cash reward for every business that buys a website or marketing plan through you. Payments are sent directly to your UPI.",
    },
    {
      keywords: ["how to promote", "pitch", "saree", "sell"],
      answer:
        "Tell local shop owners: 'Get your own online website & WhatsApp catalogue to double sales.' Share your referral link with them!",
    },
    {
      keywords: ["support", "help", "doubt"],
      answer:
        "Our team provides ready-made WhatsApp banner images and messages so you can share them easily with clients.",
    },
  ];

  function processPartnerQuery(text) {
    if (!text.trim()) return;

    let messageContainer = document.querySelector(".chat-messages-list");
    if (!messageContainer) {
      messageContainer = document.createElement("div");
      messageContainer.className = "chat-messages-list";
      messageContainer.style.cssText =
        "display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; margin-bottom: 15px;";
      const introMsg = document.querySelector(".chat-intro-message");
      if (introMsg) introMsg.after(messageContainer);
    }

    messageContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div style="align-self: flex-end; background: var(--mauve-primary); color: #fff; padding: 8px 12px; border-radius: 10px; font-size: 0.85rem; max-width: 80%; margin-left: auto;">
        ${text}
      </div>
    `
    );

    if (chatInput) chatInput.value = "";
    messageContainer.scrollTop = messageContainer.scrollHeight;

    const cleanText = text.toLowerCase();
    let reply =
      "You earn ₹1,000 per sale! Simply share your referral link with local shop owners looking to grow online.";

    for (const item of partnerKnowledgeBase) {
      if (item.keywords.some((kw) => cleanText.includes(kw))) {
        reply = item.answer;
        break;
      }
    }

    setTimeout(() => {
      messageContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div style="background: var(--bg-main); border: 1px solid var(--border-mauve); color: var(--text-primary); padding: 10px 12px; border-radius: 10px; font-size: 0.85rem; max-width: 85%;">
          <strong style="color: var(--mauve-primary); display: block; font-size: 0.75rem; margin-bottom: 2px;">AI Referral Assistant</strong>
          ${reply}
        </div>
      `
      );
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 600);
  }

  if (sendBtn && chatInput) {
    sendBtn.addEventListener("click", () =>
      processPartnerQuery(chatInput.value)
    );
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") processPartnerQuery(chatInput.value);
    });
  }

  chipBtns.forEach((chip) => {
    chip.addEventListener("click", () => processPartnerQuery(chip.innerText));
  });

  const ctx = document.getElementById("competitorChart")?.getContext("2d");
  let competitorChart;

  const dynamicMarketTrends = {
    "7d": {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      yourData: [20, 35, 45, 60, 75, 90, 110],
      competitorData: [15, 20, 25, 30, 35, 40, 48],
      trendingFeature: "🔥 Added WhatsApp Automated Cart Recovery",
    },
    "30d": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      yourData: [100, 280, 520, 850],
      competitorData: [80, 140, 220, 310],
      trendingFeature: "🚀 Trending Feature: Instagram Shop Direct Integration",
    },
    "90d": {
      labels: ["Month 1", "Month 2", "Month 3"],
      yourData: [400, 1200, 2900],
      competitorData: [300, 700, 1100],
      trendingFeature: "⚡ Market Standard: AI Voice Search for Products",
    },
  };

  if (ctx && typeof Chart !== "undefined") {
    competitorChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dynamicMarketTrends["30d"].labels,
        datasets: [
          {
            label: "Your Business Growth",
            data: dynamicMarketTrends["30d"].yourData,
            borderColor: "#8C435F",
            backgroundColor: "rgba(140, 67, 95, 0.12)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
          },
          {
            label: "Competitor Market Average",
            data: dynamicMarketTrends["30d"].competitorData,
            borderColor: "#A38591",
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#6B3047", font: { weight: "700" } },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#7F5868" } },
          y: {
            grid: { color: "rgba(107, 48, 71, 0.08)" },
            ticks: { color: "#7F5868" },
          },
        },
      },
    });
  }

  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const trendAlertTag =
    document.querySelector(".alert-card .alert-tag") ||
    document.querySelector(".alert-card p");

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const period = btn.getAttribute("data-time") || "30d";
      if (competitorChart && dynamicMarketTrends[period]) {
        competitorChart.data.labels = dynamicMarketTrends[period].labels;
        competitorChart.data.datasets[0].data =
          dynamicMarketTrends[period].yourData;
        competitorChart.data.datasets[1].data =
          dynamicMarketTrends[period].competitorData;
        competitorChart.update();

        if (trendAlertTag) {
          trendAlertTag.innerText = dynamicMarketTrends[period].trendingFeature;
        }
      }
    });
  });
});

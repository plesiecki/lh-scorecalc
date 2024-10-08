export const metrics = {
  FCP: {auditId: 'first-contentful-paint', name: 'First Contentful Paint'},
  SI: {auditId: 'speed-index', name: 'Speed Index'},
  LCP: {auditId: 'largest-contentful-paint', name: 'Largest Contentful Paint'},
  TTI: {auditId: 'interactive', name: 'Time to Interactive'},
  TBT: {auditId: 'total-blocking-time', name: 'Total Blocking Time'},
  CLS: {auditId: 'cumulative-layout-shift', name: 'Cumulative Layout Shift', units: 'unitless'},
  FMP: {auditId: 'first-meaningful-paint', name: 'First Meaningful Paint'},
  FCI: {auditId: 'first-cpu-idle', name: 'First CPU Idle'},
  INP: {auditId: 'interaction-to-next-paint', name: 'Interaction to Next Paint'},
};

export const curves = {
  v10: {
    mobile: {
      FCP: {weight: 0.1, median: 3000, p10: 1800},
      LCP: {weight: 0.3, median: 4000, p10: 2500},
      INP: {weight: 0.3, median: 500,  p10: 200},
      CLS: {weight: 0.3, median: 0.25, p10: 0.1},
    },
    desktop: {
      FCP: {weight: 0.10, median: 1600, p10: 934},
      LCP: {weight: 0.25, median: 2400, p10: 1200},
      INP: {weight: 0.30, median: 500,  p10: 200},
      CLS: {weight: 0.25, median: 0.25, p10: 0.1},
    },
  },
  v8: {
    mobile: {
      FCP: {weight: 0.10, median: 3000, p10: 1800},
      SI: {weight: 0.10, median: 5800, p10: 3387},
      LCP: {weight: 0.25, median: 4000, p10: 2500},
      TTI: {weight: 0.10, median: 7300, p10: 3785},
      TBT: {weight: 0.30, median: 600,  p10: 200},
      CLS: {weight: 0.15, median: 0.25, p10: 0.1},
      INP: {weight: 0.30, median: 500,  p10: 200},
    },
    desktop: {
      FCP: {weight: 0.10, median: 1600, p10: 934},
      SI: {weight: 0.10, median: 2300, p10: 1311},
      LCP: {weight: 0.25, median: 2400, p10: 1200},
      TTI: {weight: 0.10, median: 4500, p10: 2468},
      TBT: {weight: 0.30, median: 350, p10: 150},
      CLS: {weight: 0.15, median: 0.25, p10: 0.1},
      INP: {weight: 0.30, median: 500,  p10: 200},
    },
  },
  v6: {
    mobile: {
      FCP: {weight: 0.15, median: 4000, p10: 2336},
      SI: {weight: 0.15, median: 5800, p10: 3387},
      LCP: {weight: 0.25, median: 4000, p10: 2500},
      TTI: {weight: 0.15, median: 7300, p10: 3785},
      TBT: {weight: 0.25, median: 600, p10: 287},
      CLS: {weight: 0.05, median: 0.25, p10: 0.1},
    },
    desktop: {
      FCP: {weight: 0.15, median: 1600, p10: 934},
      SI: {weight: 0.15, median: 2300, p10: 1311},
      LCP: {weight: 0.25, median: 2400, p10: 1200},
      TTI: {weight: 0.15, median: 4500, p10: 2468},
      TBT: {weight: 0.25, median: 350, p10: 150},
      CLS: {weight: 0.05, median: 0.25, p10: 0.1},
    },
  },
  v5: {
    FCP: {weight: 0.2, median: 4000, podr: 2000},
    SI: {weight: 0.26666, median: 5800, podr: 2900},
    FMP: {weight: 0.066666, median: 4000, podr: 2000},
    TTI: {weight: 0.33333, median: 7300, podr: 2900},
    FCI: {weight: 0.133333, median: 6500, podr: 2900},
  },
};

/**
 * @param {Record<string, {weight: number, median: number, podr: number}>} curves
 */
function makeScoringGuide(curves) {
  const scoringGuide = {};
  for (const [key, curve] of Object.entries(curves)) {
    scoringGuide[key] = {...metrics[key], ...curve};
  }
  return scoringGuide;
}

export const scoringGuides = {
  // v9 => v8 and v7 => v6 is handled in normalizeVersions()
  v10: {
    mobile: makeScoringGuide(curves.v10.mobile),
    desktop: makeScoringGuide(curves.v10.desktop),
  },
  v8: {
    mobile: makeScoringGuide(curves.v8.mobile),
    desktop: makeScoringGuide(curves.v8.desktop),
  },
  v6: {
    mobile: makeScoringGuide(curves.v6.mobile),
    desktop: makeScoringGuide(curves.v6.desktop),
  },
  v5: {
    mobile: makeScoringGuide(curves.v5),
    desktop: makeScoringGuide(curves.v5),
  },
};

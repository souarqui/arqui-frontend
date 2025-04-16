/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts,jsx,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  safelist: [
    {
      pattern:
        /bg-surface-(main|brand|critical|warning|positive)-(default|light|lightest|medium|dark|darker)/,
      variants: ["hover", "active", "focus"],
    },
    {
      pattern:
        /text-(main|inverse|brand|critical|warning|positive)-(default|light|lighter|lightest|darkest)/,
      variants: ["hover", "active", "focus"],
    },
    {
      pattern:
        /border-edge-(main|brand|critical|warning|positive)-(default|lightest|darkest)/,
      variants: ["hover", "active", "focus"],
    },
    {
      pattern:
        /h-(gigant|huger|xhuger|huge|larger|xlarge|large|medium|small|xsmall|smaller|minimum)/,
    },
    {
      pattern: /bg-overlay-(lightest|ligher|light|default|dark|darker|darkest)/,
    },
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: {
          default: "#111112",
          light: "#6A6A77",
          lighter: "#8F8F9E",
        },
        inverse: {
          default: "#F4F4F6",
        },
        brand: {
          lightest: "#AAAFFA",
          default: "#555EF5",
          darkest: "#3B45F3",
        },
        critical: {
          lightest: "#F69192",
          default: "#DE1112",
          darkest: "#BD0E10",
        },
        warning: {
          lightest: "#F8DB99",
          default: "#ECA911",
          darkest: "#C88F10",
        },
        positive: {
          lightest: "#8EF2CE",
          default: "#118A5E",
          darkest: "#0E6D4A",
        },
        surface: {
          main: {
            default: "#FFFFFF",
            lightest: "#F4F4F6",
            light: "#DFDFE4",
            medium: "#CBCBD3",
            dark: "#CBCBD3",
            darker: "#35353A",
          },
          brand: {
            lightest: "#E3E4FD",
            default: "#555EF5",
            dark: "#3B45F3",
          },
          critical: {
            lightest: "#FCDADA",
            default: "#DE1112",
            dark: "#BD0E10",
          },
          warning: {
            lightest: "#FDF3DD",
            default: "#ECA911",
            dark: "#C88F10",
          },
          positive: {
            lightest: "#DAFBEF",
            default: "#118A5E",
            dark: "#0E6D4A",
          },
        },
        icon: {
          main: {
            default: "#232326",
            light: "#6A6A77",
            lighter: "#8F8F9E",
          },
          inverse: {
            default: "#F4F4F6",
          },
          brand: {
            lightest: "#AAAFFA",
            default: "#555EF5",
            darkest: "#3B45F3",
          },
          critical: {
            lightest: "#F69192",
            default: "#DE1112",
            darkest: "#BD0E10",
          },
          warning: {
            lightest: "#F8DB99",
            default: "#ECA911",
            darkest: "#C88F10",
          },
          positive: {
            lightest: "#DAFBEF",
            default: "#118A5E",
            darkest: "#0E6D4A",
          },
        },
        edge: {
          main: {
            light: "#DFDFE4",
            default: "#CBCBD3",
            dark: "#47474E",
          },
          brand: {
            default: "#555EF5",
          },
          critical: {
            default: "#DE1112",
          },
          warning: {
            default: "#ECA911",
          },
          positive: {
            default: "#118A5E",
          },
        },
        overlay: {
          lightest: "rgba(0, 0, 0, 0.05)",
          lighter: "rgba(0, 0, 0, 0.1)",
          light: "rgba(0, 0, 0, 0.2)",
          default: "rgba(0, 0, 0, 0.4)",
          dark: "rgba(0, 0, 0, 0.5)",
          darker: "rgba(0, 0, 0, 0.6)",
          darkest: "rgba(0, 0, 0, 0.7)",
        },
      },
      fontSize: {
        gigant: "5.125rem",
        huger: "4rem",
        xhuger: "3.25rem",
        huge: "2.75rem",
        larger: "2.375rem",
        xlarge: "2rem",
        large: "1.5rem",
        medium: "1.25rem",
        small: "1.125rem",
        xsmall: "1rem",
        smaller: "0.875rem",
        minimum: "0.75rem",
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      lineHeight: {
        gigant: "100%",
        huger: "100%",
        xhuger: "100%",
        huge: "100%",
        larger: "110%",
        xlarge: "120%",
        large: "130%",
        medium: "130%",
        small: "140%",
        xsmall: "140%",
        smaller: "140%",
        minimum: "140%",
      },
      borderRadius: {
        0: "0rem",
        1: "0.37rem",
        2: "0.75rem",
        3: "1.5rem",
        4: "3rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        13.5: "3.375rem",
        15.5: "3.875rem",
        17.5: "4.375rem",
        19.5: "4.875rem",
        21: "5.25rem",
        23: "5.75rem",
        24.5: "6.125rem",
      },
      width: {
        gigant: "5.125rem",
        huger: "4rem",
        xhuger: "3.25rem",
        huge: "2.75rem",
        larger: "2.375rem",
        xlarge: "2rem",
        large: "1.5rem",
        medium: "1.25rem",
        small: "1.125rem",
        xsmall: "1rem",
        smaller: "0.75rem",
      },
      height: {
        gigant: "5.125rem",
        huger: "4rem",
        xhuger: "3.25rem",
        huge: "2.75rem",
        larger: "2.375rem",
        xlarge: "2rem",
        large: "1.5rem",
        medium: "1.25rem",
        small: "1.125rem",
        xsmall: "1rem",
        smaller: "0.75rem",
      },
      boxShadow: {
        "bottom-low": "1px 1px 8px 0 rgba(0, 0, 0, 0.08)",
        "bottom-medium": "0px 1px 1px 0 rgba(0, 0, 0, 0.15)",
        "bottom-huge": "0px 4px 10px 0 rgba(0, 0, 0, 0.30)",
        medium: "0px 1px 8px 0px rgba(0, 0, 0, 0.15)",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
      gap: {
        3: "0.75rem",
        4.5: "1.125rem",
      },
    },
  },
  plugins: [],
};

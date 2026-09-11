"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type FooterItem = {
  id: string;
  area: string;
  section_key: string;
  item_key: string;
  item_type: string;
  label: string | null;
  value: string | null;
  url: string | null;
  image_url: string | null;
  visible: boolean;
  sort_order: number;
  settings: Record<string, unknown> | null;
};

const FALLBACK_COLUMNS = [
  {
    key: "explore",
    heading: "Explore",
    links: [
      { key: "knowledge", label: "Knowledge", url: "/articles" },
      { key: "legal_cases", label: "Legal Cases", url: "/cases" },
      { key: "exchange_rates", label: "Exchange Rates", url: "/exchange-rate" },
      { key: "careers", label: "Careers", url: "/careers" },
      { key: "team", label: "Our Team", url: "/team" },
    ],
  },
];

const FALLBACK_SOCIALS = [
  {
    key: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com",
    icon: "facebook",
  },
  {
    key: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com",
    icon: "instagram",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: "linkedin",
  },
];

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function SocialIcon({ type }: { type: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function FooterLink({
  label,
  url,
}: {
  label: string;
  url: string;
}) {
  if (!url) return null;

  if (isExternalUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center text-sm text-white/65 transition hover:text-white"
      >
        <span>{label}</span>
        <span className="ml-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-70">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link
      href={url}
      className="group inline-flex items-center text-sm text-white/65 transition hover:text-white"
    >
      <span>{label}</span>
      <span className="ml-1 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-70">
        →
      </span>
    </Link>
  );
}

export default function CuraFooter() {
  const [items, setItems] = useState<FooterItem[]>([]);
  const supabase = createClient();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFooter() {
      try {
        const { data, error } = await supabase
          .from("site_content")
          .select(
            "id,area,section_key,item_key,item_type,label,value,url,image_url,visible,sort_order,settings"
          )
          .eq("area", "footer")
          .order("section_key", { ascending: true })
          .order("sort_order", { ascending: true });

        if (!active) return;

        if (!error && data) {
          setItems(data as FooterItem[]);
        }
      } catch {
        // Keep the CURA fallback footer.
      } finally {
        if (active) setLoaded(true);
      }
    }

    loadFooter();

    return () => {
      active = false;
    };
  }, []);

  const cms = useMemo(() => {
    if (!loaded || !items.length) return null;

    const visible = items.filter((item) => item.visible);

    const get = (
      section: string,
      key: string,
      fallback: string
    ): string => {
      const item = visible.find(
        (entry) =>
          entry.section_key === section && entry.item_key === key
      );

      return item?.value ?? fallback;
    };

    const brandDescription = get(
      "brand",
      "description",
      "CURA is a Maldives-based professional services firm providing Audit, Tax, Advisory and related business solutions."
    );

    const contactHeading = get(
      "contact",
      "heading",
      "Get in touch with CURA"
    );

    const contactLocation = get(
      "contact",
      "location",
      "Maldives"
    );

    const copyright = get(
      "copyright",
      "text",
      "© {year} CURA. All rights reserved."
    );

    const columns = (() => {
      const result: {
        key: string;
        heading: string;
        sort: number;
        links: FooterItem[];
      }[] = [];

      // Existing CURA Explore column
      const exploreHeading = visible.find(
        (item) =>
          item.section_key === "explore" &&
          item.item_key === "heading"
      );

      const exploreLinks = visible
        .filter(
          (item) =>
            item.section_key === "explore" &&
            item.item_key !== "heading" &&
            item.url
        )
        .sort((a, b) => a.sort_order - b.sort_order);

      if (exploreHeading || exploreLinks.length > 0) {
        result.push({
          key: "explore",
          heading:
            exploreHeading?.value ||
            exploreHeading?.label ||
            "Explore",
          sort: exploreHeading?.sort_order ?? 100,
          links: exploreLinks,
        });
      }

      // Flexible CMS footer columns
      const customColumns = visible
        .filter(
          (item) =>
            item.item_type === "footer_column" ||
            (item.settings?.footer_role === "column")
        )
        .sort((a, b) => a.sort_order - b.sort_order);

      for (const columnItem of customColumns) {
        const columnKey = columnItem.item_key;

        const links = visible
          .filter(
            (item) =>
              item.section_key === `column_${columnKey}` &&
              item.url
          )
          .sort((a, b) => a.sort_order - b.sort_order);

        result.push({
          key: columnKey,
          heading:
            columnItem.label ||
            columnItem.value ||
            "",
          sort: columnItem.sort_order,
          links,
        });
      }

      return result.sort((a, b) => a.sort - b.sort);
    })();

    const socialItems = visible
      .filter(
        (item) =>
          item.section_key === "social" ||
          item.item_type === "social"
      )
      .sort((a, b) => a.sort_order - b.sort_order);

    return {
      brandDescription,
      contactHeading,
      contactLocation,
      copyright,
      columns,
      socialItems,
    };
  }, [items, loaded]);

  if (!cms) {
    return (
      <footer className="bg-[#071B49] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <Link href="/" className="inline-block">
                <span className="text-2xl font-semibold tracking-[0.2em]">
                  CURA
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                CURA is a Maldives-based professional services firm providing
                Audit, Tax, Advisory and related business solutions.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {FALLBACK_SOCIALS.map((social) => (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {FALLBACK_COLUMNS.map((column) => (
              <div key={column.key}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18B8EE]">
                  {column.heading}
                </h3>

                <div className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <FooterLink
                      key={link.key}
                      label={link.label}
                      url={link.url}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18B8EE]">
                Get in touch with CURA
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/#contact"
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  Contact us
                </Link>

                <span className="text-sm text-white/65">
                  Maldives
                </span>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-6">
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} CURA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071B49] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div
          className="grid gap-12"
          style={{
            gridTemplateColumns:
              cms.columns.length >= 4
                ? `repeat(${Math.min(cms.columns.length + 2, 6)}, minmax(0, 1fr))`
                : undefined,
          }}
        >
          <div>
            <Link href="/" className="inline-block">
              <img
                src="/cura-logo.png"
                alt="CURA"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              {cms.brandDescription}
            </p>

            {cms.socialItems.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {cms.socialItems.map((social) => (
                  <a
                    key={social.id}
                    href={social.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label || social.item_key}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                  >
                    <SocialIcon
                      type={
                        String(
                          social.settings?.icon ||
                            social.item_key
                        ).toLowerCase()
                      }
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {cms.columns.map((column) => (
            <div key={column.key}>
              {column.heading && (
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18B8EE]">
                  {column.heading}
                </h3>
              )}

              <div className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <FooterLink
                    key={link.id}
                    label={link.label || link.value || link.item_key}
                    url={link.url || "#"}
                  />
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#18B8EE]">
              {cms.contactHeading}
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/#contact"
                className="text-sm text-white/65 transition hover:text-white"
              >
                Contact us
              </Link>

              <span className="text-sm text-white/65">
                {cms.contactLocation}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs text-white/45">
            {cms.copyright.replace("{year}", String(year))}
          </p>
        </div>
      </div>
    </footer>
  );
}

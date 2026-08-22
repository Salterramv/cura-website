import { NextResponse } from "next/server"

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: CORS_HEADERS,
  })
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function normalize(value: string): string {
  return value
    .toUpperCase()
    .replace(/[\\s_]+/g, "")
    .replace(/[–—−]/g, "-")
}

function classifyCourt(caseNumber: string, suppliedCourt: string) {
  const reference = normalize(caseNumber)
  const court = normalize(suppliedCourt)

  if (
    reference.includes("TAT") ||
    court.includes("TAXAPPEALTRIBUNAL")
  ) {
    return {
      court: "Tax Appeal Tribunal",
      domain: "tat.gov.mv",
    }
  }

  if (
    /CVC|CV-C|\/CV(?:-|\/|$)|CV/.test(reference) ||
    court.includes("CIVILCOURT")
  ) {
    return {
      court: "Civil Court",
      domain: "civilcourt.gov.mv",
    }
  }

  if (
    reference.includes("SC") ||
    court.includes("SUPREMECOURT")
  ) {
    return {
      court: "Supreme Court",
      domain: "supremecourt.mv",
    }
  }

  if (
    reference.includes("HC") ||
    court.includes("HIGHCOURT")
  ) {
    return {
      court: "High Court",
      domain: "highcourt.gov.mv",
    }
  }

  return null
}

function caseMatches(text: string, caseNumber: string) {
  const target = normalize(caseNumber)
  const source = normalize(text)

  if (!target) return false

  const compactTarget = target.replace(/[^A-Z0-9]/g, "")
  const compactSource = source.replace(/[^A-Z0-9]/g, "")

  return (
    source.includes(target) ||
    compactSource.includes(compactTarget)
  )
}

function absoluteUrl(href: string, base: string) {
  try {
    return new URL(href, base).toString()
  } catch {
    return null
  }
}

async function fetchPage(url: string) {
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CURA-Legal-Source-Finder/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    })

    if (!response.ok) return null

    return await response.text()
  } catch {
    return null
  }
}

function extractOfficialLinks(
  html: string,
  pageUrl: string,
  court: string,
  caseNumber: string,
  domain: string,
) {
  if (!caseMatches(html, caseNumber)) return []

  const results: Array<{
    court: string
    case_number: string
    title: string
    url: string
    source_type: string
    confidence: string
    reason: string
  }> = []

  const seen = new Set<string>()

  const linkRegex =
    /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi

  for (const match of html.matchAll(linkRegex)) {
    const url = absoluteUrl(match[1], pageUrl)

    if (!url) continue
    if (!url.toLowerCase().includes(domain)) continue
    if (seen.has(url)) continue

    const title = (match[2] || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    const searchable = `${url} ${title}`.toLowerCase()

    if (
      !/pdf|judg|decision|ruling|order|file|download|case/.test(
        searchable,
      )
    ) {
      continue
    }

    seen.add(url)

    results.push({
      court,
      case_number: caseNumber,
      title:
        title ||
        `${court} ${caseNumber} - Official Source`,
      url,
      source_type: `${court} Official Source`,
      confidence: "high",
      reason: `The case reference was found on the official ${court} website and a related official source was identified.`,
    })
  }

  return results
}

async function searchOfficialPages(
  caseNumber: string,
  court: string,
  pages: string[],
  domain: string,
) {
  for (const page of pages) {
    const html = await fetchPage(page)

    if (!html) continue

    const results = extractOfficialLinks(
      html,
      page,
      court,
      caseNumber,
      domain,
    )

    if (results.length) return results
  }

  return []
}

async function searchMira(caseNumber: string) {
  /*
   * First try Google site-restricted discovery.
   * This is intentionally bounded so the admin button never hangs while
   * crawling the entire MIRA archive.
   */
  try {
    const query = encodeURIComponent(
      `site:mira.gov.mv/LegalCases "${caseNumber}"`,
    )

    const googleUrl = `https://www.google.com/search?q=${query}`

    const html = await fetchPage(googleUrl)

    if (html && caseMatches(html, caseNumber)) {
      const links: Array<{
        title: string
        url: string
      }> = []

      const regex =
        /https?:\/\/mira\.gov\.mv\/[^"'<>\\s]+/gi

      const seen = new Set<string>()

      for (const match of html.matchAll(regex)) {
        const url = match[0]
          .replace(/&amp;/g, "&")
          .replace(/[),.;]+$/, "")

        if (seen.has(url)) continue

        seen.add(url)

        links.push({
          title: `MIRA legal case - ${caseNumber}`,
          url,
        })

        if (links.length >= 5) break
      }

      if (links.length) {
        return links.map((item) => ({
          court: "MIRA",
          case_number: caseNumber,
          title: item.title,
          url: item.url,
          source_type: "MIRA Official Source",
          confidence: "high",
          reason:
            "The exact case reference was discovered on MIRA's official website.",
        }))
      }
    }
  } catch {
    // Continue to the bounded archive search below.
  }

  /*
   * Small bounded archive search as a fallback.
   * We deliberately do not crawl hundreds of pages.
   */
  const pages = [1, 13, 25, 37, 49]

  for (const pageNumber of pages) {
    const pageUrl =
      `https://mira.gov.mv/LegalCases/FilterResult?pageNumber=${pageNumber}`

    const html = await fetchPage(pageUrl)

    if (!html || !caseMatches(html, caseNumber)) continue

    const results = extractOfficialLinks(
      html,
      pageUrl,
      "MIRA",
      caseNumber,
      "mira.gov.mv",
    )

    if (results.length) return results

    return [
      {
        court: "MIRA",
        case_number: caseNumber,
        title: `MIRA Legal Case Record - ${caseNumber}`,
        url: pageUrl,
        source_type: "MIRA Official Case Record",
        confidence: "medium",
        reason:
          "The exact case reference was found on MIRA's official legal-case archive.",
      },
    ]
  }

  return []
}

async function searchCourt(
  caseNumber: string,
  court: string,
) {
  const classification = classifyCourt(caseNumber, court)

  if (!classification) return []

  const { court: resolvedCourt, domain } = classification

  if (resolvedCourt === "Civil Court") {
    return searchOfficialPages(
      caseNumber,
      resolvedCourt,
      [
        "https://civilcourt.gov.mv/5/",
        "https://civilcourt.gov.mv/",
      ],
      domain,
    )
  }

  if (resolvedCourt === "High Court") {
    return searchOfficialPages(
      caseNumber,
      resolvedCourt,
      [
        "https://highcourt.gov.mv/dv/decisions.php",
        "https://highcourt.gov.mv/en/decisions.php",
      ],
      domain,
    )
  }

  if (resolvedCourt === "Supreme Court") {
    return searchOfficialPages(
      caseNumber,
      resolvedCourt,
      [
        "https://supremecourt.mv/en",
        "https://supremecourt.mv/en/decisions",
        "https://supremecourt.mv/en/downloads",
      ],
      domain,
    )
  }

  return searchOfficialPages(
    caseNumber,
    resolvedCourt,
    [
      "https://www.tat.gov.mv/en/status/completed-en/",
      "https://www.tat.gov.mv/status/completed/",
    ],
    domain,
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const caseNumber = clean(body?.case_number)
    const suppliedCourt = clean(body?.court)
    const partyName = clean(body?.party_name)

    if (!caseNumber) {
      return json(
        {
          error:
            "A case number is required before finding the official source.",
        },
        400,
      )
    }

    const miraResults = await searchMira(caseNumber)

    if (miraResults.length) {
      return json({
        court: suppliedCourt || "MIRA",
        case_number: caseNumber,
        party_name: partyName || null,
        search_stage: "MIRA",
        candidates: miraResults,
        message:
          "MIRA official source found. Verify the source before saving.",
      })
    }

    const courtResults = await searchCourt(
      caseNumber,
      suppliedCourt,
    )

    const resolved = classifyCourt(
      caseNumber,
      suppliedCourt,
    )

    return json({
      court: resolved?.court || suppliedCourt || null,
      case_number: caseNumber,
      party_name: partyName || null,
      search_stage: resolved?.court || "NO_COURT_MATCH",
      candidates: courtResults,
      message: courtResults.length
        ? `Official ${
            resolved?.court || suppliedCourt
          } source candidates found. Verify the exact source before saving.`
        : "No matching official source was found automatically. You can enter the official URL manually.",
    })
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected official source search error.",
      },
      500,
    )
  }
}

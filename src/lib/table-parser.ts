import csvToMarkdown from "csv-to-markdown-table"

function preprocessRow(row: string): string {
  return row.replace(/^[•\-*]\s*/, "").trim()
}

function isTableRow(line: string): boolean {
  const stripped = preprocessRow(line)
  return (stripped.match(/\|/g) || []).length >= 3
}

export function convertPipeTablesToMarkdown(text: string): string {
  const lines = text.split("\n")
  const result: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (!isTableRow(line)) {
      result.push(line)
      i++
      continue
    }

    const colCount = (preprocessRow(line).match(/\|/g) || []).length
    const csvLines: string[] = []

    while (i < lines.length && isTableRow(lines[i]) && (preprocessRow(lines[i]).match(/\|/g) || []).length === colCount) {
      csvLines.push(preprocessRow(lines[i]))
      i++
    }

    if (csvLines.length > 0) {
      const csvContent = csvLines.join("\n")
      const table = csvToMarkdown(csvContent, "|", true)
      result.push(table)
    }

    result.push("")
  }

  return result.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}
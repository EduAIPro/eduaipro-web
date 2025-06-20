export function predictCourseDuration(totalHours: number, hoursPerWeek = 3) {
  const noOfWeeks = Math.round(totalHours / hoursPerWeek);

  const noOfMonths = Math.round(noOfWeeks / 4);

  return noOfMonths;
}

export function predictUnitDuration(totalHours: number, hoursPerDay = 1) {
  const noOfDays = Math.round(totalHours / hoursPerDay);

  const noOfWeeks = Math.round(noOfDays / 4);

  return noOfWeeks;
}

interface CsvMetadata {
  columnNames: string[];
  totalItems: number;
  totalRows: number;
  totalColumns: number;
  duplicatedRows: number;
}

export function extractCsvMetadataAdvanced(
  csvContent: string,
  delimiter: string = ",",
  hasHeader: boolean = true
): CsvMetadata {
  if (!csvContent.trim()) {
    return {
      columnNames: [],
      totalItems: 0,
      totalRows: 0,
      totalColumns: 0,
      duplicatedRows: 0,
    };
  }

  // Advanced CSV parsing function
  function parseCSVLine(line: string, delimiter: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    // Add the last field
    result.push(current.trim());
    return result;
  }

  // Split content into lines
  const lines = csvContent
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return {
      columnNames: [],
      totalItems: 0,
      totalRows: 0,
      totalColumns: 0,
      duplicatedRows: 0,
    };
  }

  // Parse all rows
  const rows = lines.map((line) => parseCSVLine(line, delimiter));

  // Extract column names
  let columnNames: string[] = [];
  let dataRows = rows;

  if (hasHeader && rows.length > 0) {
    columnNames = rows[0];
    dataRows = rows.slice(1);
  } else {
    // Generate generic column names if no header
    const numColumns = rows.length > 0 ? rows[0].length : 0;
    columnNames = Array.from(
      { length: numColumns },
      (_, i) => `Column_${i + 1}`
    );
  }

  const totalRows = rows.length;
  const totalColumns = columnNames.length;
  const totalItems = dataRows.reduce((sum, row) => sum + row.length, 0);

  // Find duplicated rows
  const rowStrings = dataRows.map((row) => JSON.stringify(row));
  const uniqueRows = new Set(rowStrings);
  const duplicatedRows = rowStrings.length - uniqueRows.size;

  return {
    columnNames,
    totalItems,
    totalRows,
    totalColumns,
    duplicatedRows,
  };
}

export async function extractCsvMetadataFromFile(
  file: File,
  delimiter: string = ",",
  hasHeader: boolean = true
): Promise<CsvMetadata> {
  let csvContent: string;

  // Client-side: read from File object
  csvContent = await file.text();

  return extractCsvMetadataAdvanced(csvContent, delimiter, hasHeader);
}

# COS30045 Week 4

Two independent repository folders are supplied:
- exercise-4.1: SVG house, grouped windows and rendered coordinate annotation image.
- exercise-4.2-4.7: D3 DOM practice and all bar chart stages; index.html is the final chart.

Open each folder in VS Code, then use Live Server on index.html. Do not double-click HTML files to load CSV data. The data path resolves relative to the HTML page, not the JavaScript file. D3 v7 is bundled locally so a CDN connection is not needed.

## GitHub Classroom
Accept the tutor's Classroom invitations for the SVG house and bar chart. Copy the CONTENTS of each matching folder into its repository, preserving any tutor-provided files. Commit and push. No repository links have been created by this package. Do not invent a history of earlier work: this is a completed package, and later changes should be committed as you make them.

## Mercury
Upload exercise-4.1 and exercise-4.2-4.7 into your Mercury web directory, keeping the folder structure. The actual web root and public URL must be confirmed from your account instructions. Typical page endings are /exercise-4.1/index.html and /exercise-4.2-4.7/index.html. Test both public pages and their navigation; a local Live Server URL is not a Canvas hosting link.

## Data source
The CSV is copied unchanged from Data/tvBrandCount.csv inside the supplied 2026 TV Data.knwf workflow. It contains 25 brands. Counts are model counts, not energy usage or sales. To repeat the export in KNIME, open and run the supplied workflow, connect CSV Writer to the final brand/count table, choose workflow data area, turn row IDs off, include headers and select Quote values Never. Export as tvBrandCount.csv.

## Coverage
4.1 rect, circle, ellipse, line, polygon, polyline, path, text; fill and stroke; g and translate; annotated screenshot.
4.2 D3 select, style, append, text and rectangle attributes.
4.3 responsive container, viewBox and test rectangle.
4.4 csv row conversion, unary +, then, console statistics and sorting.
4.5 data, join, per-row classes, count-based widths and index-based spacing.
4.6 scaleLinear, scaleBand, domain, range, bandwidth and padding.
4.7 grouped rectangles and labels, text-anchor and exact counts.
Extra features on final page: numeric axis, ordering control, compact chart control and CSV error message.

## Canvas
Submit the two actual GitHub Classroom repository URLs as comments and the two tested Mercury page URLs. Upload the separate Week 4 GenAI declaration after reviewing it. Exercises 5 and 6 are separate work and are not included here. The assessment requires declarations for Weeks 4–6; add truthful Week 5 and Week 6 details when those are finished.

## Before submission
The annotation PNG is rendered from the SVG rather than captured in a browser. To follow the brief literally, take your own browser screenshot, annotate the same coordinates and replace images/coordinate-annotations.png. Runtime checks used a DOM environment; full browser visual testing was unavailable. Test with Live Server before uploading.

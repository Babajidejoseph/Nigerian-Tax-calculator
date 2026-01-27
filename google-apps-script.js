/**
 * Google Apps Script for Nigerian Tax Calculator Email Collection
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with headers: Email | Timestamp | Source
 * 2. Go to Extensions > Apps Script
 * 3. Copy this entire code into the script editor
 * 4. Save the project
 * 5. Click Deploy > New Deployment
 * 6. Choose type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Deploy and copy the Web App URL
 * 10. Paste the URL into email-capture.js CONFIG.googleSheetsURL
 */

function doPost(e) {
    try {
        // Get the active spreadsheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the incoming data
        var data = JSON.parse(e.postData.contents);

        // Extract fields
        var name = data.name || '';
        var email = data.email || '';
        var timestamp = data.timestamp || new Date().toISOString();
        var consent = data.consent || 'Not specified';
        var source = data.source || 'Unknown';

        // Append data to the sheet
        sheet.appendRow([name, email, timestamp, consent, source]);

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({
                'status': 'success',
                'message': 'Data saved successfully'
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({
                'status': 'error',
                'message': error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Optional: Handle GET requests for testing
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            'status': 'success',
            'message': 'Google Apps Script is running. Use POST to submit data.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

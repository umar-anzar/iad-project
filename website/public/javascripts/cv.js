document.addEventListener('DOMContentLoaded', function() {

    // Get the button that Downloads the PDF
    const downloadButton = document.getElementById('download_btn');

    // When the user clicks on the button, Downloads the PDF
    downloadButton.addEventListener('click', function() {
        // Get request pdf file from the server
        fetch('/download_cv')

        // Return a promise that resolves with the PDF
        .then(response => {
            const filename = response.headers.get('content-disposition').split('filename=')[1];
            
            return { response, filename }; // Return an object with both the response and filename
        })

        // Resolve the promise with the response and filename
        .then(({ response, filename }) => {
            return response.blob().then(blob => { // The response is a Blob object containing the binary data.
                
                // Create a temporary <a> element to trigger the download
                const url = URL.createObjectURL(blob);

                // Create a <a> element to download the PDF
                const link = document.createElement('a');
                link.href = url;

                // Set the desired filename for the downloaded file
                link.download = filename; 
                link.click();
                
                // Delete the link element
                link.remove();

                // Clean up the temporary URL object
                URL.revokeObjectURL(url);
            });
        })
        
        .catch(error => {
            console.log('Error fetching PDF file:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('download_btn');
    downloadButton.addEventListener('click', function() {
        fetch('/download_cv')
        .then(response => blob = response.blob())  // The response is a Blob object containing the binary data.
        .then(blob => {
            
            // Create a temporary <a> element to trigger the download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "abc"; // Set the desired filename for the downloaded file
            link.click();

            // Clean up the temporary URL object
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error fetching PDF file:', error);
        });
    });
});
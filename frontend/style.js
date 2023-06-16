document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {

        link.addEventListener('click', function() {
            // Remove 'active' class from all nav links
            navLinks.forEach(function(navLink) {
                navLink.classList.remove('active');
            });
            
            // Add 'active' class to the clicked nav link
            this.classList.add('active');
        });
        
    });
});
  
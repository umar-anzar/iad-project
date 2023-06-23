// Load image and json file and create image, h3, cite, p, and a tag with href
document.addEventListener('DOMContentLoaded', function() { 
    const blogContainer = document.querySelector('#blog_container');
    const blogList = []

    fetch("/blogs")
    .then(response => response.json())
    .then(blogs => {
        blogs.forEach(blog => {
            let blogDiv = document.createElement('div');
            let img = document.createElement('img');
            let textBlock = document.createElement('div');
            let title = document.createElement('h3');
            let author = document.createElement('cite');
            let intro = document.createElement('p');
            let hyperlink = document.createElement('a');

            blogDiv.classList.add('blog');
            img.classList.add('image_blog'); 
            textBlock.classList.add('text__blog');
            title.classList.add('heading_blog');
            intro.classList.add('paragraph_blog');
            hyperlink.classList.add('read_more_blog');

            hyperlink.textContent = 'Read More >>';
            // image is in base 64
            img.setAttribute('src', `data:image/jpeg;base64,${blog.image}`);
            title.textContent = blog.text.title;
            author.textContent = blog.text.author;
            intro.textContent = blog.text.intro;
            hyperlink.setAttribute('href', blog.text.hyperlink);
            hyperlink.setAttribute('target', '_blank');

            textBlock.appendChild(title);
            textBlock.appendChild(author);
            textBlock.appendChild(intro);
            textBlock.appendChild(hyperlink);

            blogDiv.appendChild(img);
            blogDiv.appendChild(textBlock);

            blogList.push(blogDiv);
        });
        blogList.forEach(blogItem => blogContainer.appendChild(blogItem));
    })
    .catch(error => console.log('Error fetching blogs:', error));


    




    

    
});